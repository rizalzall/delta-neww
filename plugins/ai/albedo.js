const axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

async function luminAi(teks, pengguna = null, gambarBuffer = null, prompt = null, modePencarianWeb = false) {
    try {
        const data = { content: teks };
        if (pengguna !== null) data.user = pengguna;
        if (prompt !== null) data.prompt = prompt;
        if (gambarBuffer !== null) data.imageBuffer = gambarBuffer;
        data.webSearchMode = modePencarianWeb;

        const { data: res } = await axios.post("https://luminai.siputzx.my.id/", data);
        return res.result;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        throw error;
    }
}

async function downloadFile(url, outputPath) {
    try {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFileSync(outputPath, buffer);
    } catch (error) {
        console.error('Terjadi kesalahan saat mengunduh file:', error);
        throw error;
    }
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

async function searchAndDownloadYouTube(query, outputPath) {
    try {
        const searchResult = await ytSearch(query);
        if (!searchResult.videos.length) throw new Error('Video tidak ditemukan');

        const video = searchResult.videos[0];
        const videoStream = ytdl(video.url, { filter: 'audioandvideo', quality: 'highestvideo' });

        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(outputPath);
            videoStream.pipe(writeStream);
            videoStream.on('end', resolve);
            videoStream.on('error', reject);
        });
    } catch (error) {
        console.error('Terjadi kesalahan saat mencari atau mengunduh video YouTube:', error);
        throw error;
    }
}

exports.run = {
    usage: ['albedo'],
    use: 'text',
    category: 'ai',
    async: async (m, { func, mecha, comand }) => {
        const text = m.text;
        const quoted = (m.quoted || m);
        const mime = (quoted.msg || quoted).mimetype || '';

        if (!text) return m.reply("mau nanya apa?");
        
        let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration });
        let logic = "Albedo Overlord";
        try {
            let res;
            if (quoted && /image/.test(mime)) {
                const imageBuffer = await quoted.download();
                res = await luminAi(text, m.pushname, imageBuffer, logic, true);
            } else {
                res = await luminAi(text, m.pushname, null, logic, true);
            }

            if (!res) return await mecha.sendMessage(m.chat, { text: global.mess.error.api, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });

            const audioUrlMatch = res.match(/https:\/\/[^\s]+\.mp3/);
            const tiktokUrlMatch = res.match(/https:\/\/www\.tiktok\.com\/[^\s)]+/);
            const igUrlMatch = res.match(/https:\/\/www\.instagram\.com\/[^\s)]+/);
            const spotifyUrlMatch = res.match(/https:\/\/open\.spotify\.com\/track\/[^\s)]+/);
            const youtubeMatch = res.match(/https:\/\/www\.youtube\.com\/[^\s)]+/);
            const youtubeSearchMatch = res.match(/youtube search (.+)/i);

            let errorOccurred = false;

            if (audioUrlMatch) {
                const audioUrl = audioUrlMatch[0];
                try {
                    await mecha.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg', fileName: 'audio.mp3', edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
                } catch (err) {
                    console.error('Terjadi kesalahan pada audio URL:', err);
                    errorOccurred = true;
                }
            } else if (tiktokUrlMatch) {
                const tiktokUrl = tiktokUrlMatch[0];
                try {
                    let tiktokRes = await func.fetchJson('https://skizo.tech/api/tiktok?apikey=zallzall&url=' + tiktokUrl);
                    await mecha.sendMessage(m.chat, { document: { url: tiktokRes.data.music }, fileName: `${tiktokRes.data.title}.mp3`, mimetype: 'audio/mpeg', caption: res }, { quoted: m, ephemeralExpiration: m.expiration });
                } catch (err) {
                    console.error('Terjadi kesalahan pada TikTok URL:', err);
                    errorOccurred = true;
                }
            } else if (spotifyUrlMatch) {
                const spotifyUrl = spotifyUrlMatch[0];
                try {
                    let spotifyRes = await func.fetchJson('https://itzpire.com/download/aio?url=' + spotifyUrl);
                    await mecha.sendMessage(m.chat, { document: { url: spotifyRes.data.download }, fileName: `${spotifyRes.data.title}.mp3`, mimetype: 'audio/mpeg', caption: res }, { quoted: m, ephemeralExpiration: m.expiration });
                } catch (err) {
                    console.error('Terjadi kesalahan pada Spotify URL:', err);
                    errorOccurred = true;
                }
            } else if (igUrlMatch) {
                const igUrl = igUrlMatch[0];
                if (isValidUrl(igUrl)) {
                    try {
                        let igRes = await func.fetchJson('https://skizo.tech/api/instagram?apikey=zallzall&url=' + igUrl);
                        if (!igRes || igRes.length === 0) throw 'Link Tidak Valid';
                        const mediaUrl = igRes[0].url;
                        await mecha.sendMedia(m.chat, mediaUrl, m, { caption: res, expiration: m.expiration });
                    } catch (err) {
                        console.error('Terjadi kesalahan pada Instagram URL:', err);
                        errorOccurred = true;
                    }
                } else {
                    m.reply('URL Instagram tidak valid');
                }
            } else if (youtubeMatch) {
                const youtubeUrl = youtubeMatch[0];
                const outputPath = `./downloads/${Date.now()}.mp4`;
                try {
                    await downloadFile(youtubeUrl, outputPath);
                    await mecha.sendMessage(m.chat, { video: { url: outputPath }, mimetype: 'video/mp4', caption: res }, { quoted: m, ephemeralExpiration: m.expiration });
                    fs.unlinkSync(outputPath); // Delete the file after sending
                } catch (err) {
                    console.error('Terjadi kesalahan pada YouTube URL:', err);
                    errorOccurred = true;
                }
            } else if (youtubeSearchMatch) {
                const query = youtubeSearchMatch[1];
                const outputPath = `./downloads/${Date.now()}.mp4`;
                try {
                    await searchAndDownloadYouTube(query, outputPath);
                    await mecha.sendMessage(m.chat, { video: { url: outputPath }, mimetype: 'video/mp4', caption: res }, { quoted: m, ephemeralExpiration: m.expiration });
                    fs.unlinkSync(outputPath); // Delete the file after sending
                } catch (err) {
                    console.error('Terjadi kesalahan saat mencari atau mengunduh video YouTube:', err);
                    errorOccurred = true;
                }
            } else {
                errorOccurred = true;
            }

            if (errorOccurred) {
                await mecha.sendMessage(m.chat, { text: res, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
            }
        } catch (e) {
            console.error('Terjadi kesalahan:', e);
            await mecha.sendMessage(m.chat, { text: func.jsonFormat(e), edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
        }
    },
    premium: true,
    limit: 3
};