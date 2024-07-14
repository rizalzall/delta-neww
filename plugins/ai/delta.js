let axios = require('axios');
let fetch = require('node-fetch');
let cheerio = require('cheerio');
let natural = require('natural');
let { areJidsSameUser } = require('@xyzendev/baileys');

exports.run = {
    usage: ['delta'],
    use: 'text',
    category: 'ai',
    async: async function before(m, { mecha, text, func, usedPrefix, command, args, isAdmin, isBotAdmin }) {
        if (!m.text) {
            return m.reply(
                `Hai! Aku Delta! Senang bertemu denganmu~ Apa yang ingin kamu ceritakan atau tanyakan hari ini? Aku siap mendengarkan dan membantu dengan apapun yang kamu butuhkan! `,
            );
        }

        // Function to check if text contains specific keywords
        function checkText(text) {
            const lowerCaseText = text.toLowerCase();
            if (
                lowerCaseText.includes("cariin") ||
                lowerCaseText.includes("carikan") ||
                lowerCaseText.includes("putarin") ||
                lowerCaseText.includes("putarkan")
            ) {
                return "ok";
            } else {
                return "no";
            }
        }

        // Handling group settings
        if ((m.text.includes('group') || m.text.includes('grup')) && m.text.includes('tutup')) {
            await mecha.groupSettingUpdate(m.chat, 'announcement')
            .then((res) => mecha.sendMessage(m.chat, {react: {text: '✅', key: m.key}}))
            .catch((err) => mecha.sendReact(m.chat, '❌', m.key))
            return m.reply(`Oke, Semoga lebih teratur ya~ (∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ`);
        }

        if ((m.text.includes('group') || m.text.includes('grup')) && m.text.includes('buka')) {
            await mecha.groupSettingUpdate(m.chat, 'not_announcement')
            .then((res) => mecha.sendMessage(m.chat, {react: {text: '✅', key: m.key}}))
            .catch((err) => mecha.sendReact(m.chat, '❌', m.key))
            return m.reply(`Oke, Ayo kita beraktivitas bersama-sama! ( ͡° ل͜ ͡°)━☆ﾟ.*･｡ﾟ`);
        }

        // Function to handle kicking members
        if (m.text.includes('kick') || m.text.includes('kik')) {
            let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await mecha.groupParticipantsUpdate(m.chat, [users], "remove");
            return m.reply(`Maaf Ya Terpaksa Aku Tendang, Ini Perintah Admin..`);
        }

        // Handling 'hentai' keyword
        if (m.text.includes("hentai")) {
            const getHentaiList = async () => {
                const page = Math.floor(Math.random() * 1153);
                const response = await fetch(`https://sfmcompile.club/page/${page}`);
                const htmlText = await response.text();
                const $ = cheerio.load(htmlText);

                const hasil = [];
                $("#primary > div > div > ul > li > article").each(function (a, b) {
                    hasil.push({
                        title: $(b).find("header > h2").text(),
                        link: $(b).find("header > h2 > a").attr("href"),
                        category: $(b)
                            .find("header > div.entry-before-title > span > span")
                            .text()
                            .replace("in ", ""),
                        share_count: $(b)
                            .find("header > div.entry-after-title > p > span.entry-shares")
                            .text(),
                        views_count: $(b)
                            .find("header > div.entry-after-title > p > span.entry-views")
                            .text(),
                        type: $(b).find("source").attr("type") || "image/jpeg",
                        video_1:
                            $(b).find("source").attr("src") ||
                            $(b).find("img").attr("data-src"),
                        video_2: $(b).find("video > a").attr("href") || "",
                    });
                });

                return hasil;
            };

            m.reply(`E-ehh?, Kamu Lagi Horny Ya , Mungkin Video Ini Bisa Membantu Mu `);
            let res = await getHentaiList();
            return mecha.sendMessage(m.chat, { video: { url: res[0].video_1 } });
        }
        
        // Cheking for video tiktok
        if ((m.text.includes('video') || m.text.includes('vidio')) && m.text.includes('berikan')) {
            await func.fetchJson(`https://skizo.tech/api/tiktok-search?apikey=zallzall&keywords=${encodeURIComponent(m.text)}`)
                .then(async (res) => {
                    if (!res || res.length === 0) return m.reply('No TikTok video found for the given query.');

                    const randomIndex = Math.floor(Math.random() * res.length);
                    const video = res[randomIndex];

                    const caption = `*TikTok Video*\n\nTitle: ${video.title}\nDuration: ${video.duration} seconds\nPlay Count: ${video.play_count}\nDigg Count: ${video.digg_count}\nComment Count: ${video.comment_count}\nShare Count: ${video.share_count}\nDownload Count: ${video.download_count}\n\nBy: @${video.author.nickname}`;

                    mecha.sendMessage(m.chat, { video: { url: video.play }, caption: caption }, { quoted: m });
                })
                .catch((err) => m.reply(func.jsonFormat(err)));
        }

        // Checking for specific keywords to play music
        if (checkText(m.text) === "ok") {
            async function findSong(text) {
                const tokenizer = new natural.WordTokenizer();
                const tokens = tokenizer.tokenize(text.toLowerCase());

                const keywords = [
                    "putar",
                    "putarkan",
                    "putarlagu",
                    "lagu",
                    "cariin",
                    "carikan",
                    "mainkan",
                    "mainkanlagu",
                    "play",
                    "playmusic",
                    "playasong",
                ];
                const songKeywords = tokens.filter((token) => keywords.includes(token));

                if (songKeywords.length === 0) {
                    return "Maaf, tidak dapat menemukan permintaan lagu dalam teks tersebut.";
                }

                let songTitle = tokens
                    .slice(tokens.indexOf(songKeywords[0]) + 1)
                    .join(" ");

                return songTitle;
            }

            const songName = await findSong(m.text);

            m.reply(
                `Oke, tunggu sebentar ya~ Delta sedang mencari "${songName}" untukmu! `,
            );

            try {
                let response1 = await axios.get(
                    `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(songName)}`,
                );

                let tracks = response1.data;

                mecha.sendMessage(
                    m.chat,
                    {
                        audio: {
                            url: `https://spotifyapi.caliphdev.com/api/download/track?url=${tracks[0].url}`,
                        },
                        mimetype: "audio/mpeg",
                    },
                    { quoted: m },
                );
                return m.reply(
                    `Berikut adalah lagu yang kamu pilih: ${tracks[0].title} - ${tracks[0].artist}`,
                );
            } catch (e) {
                console.error(e);
                return m.reply(`Maaf, terjadi kesalahan dalam mencari lagu. ${e}`);
            }
        }

        // Identifying image and sending to luminAi function
        let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration });
        let sifat =
            "Kamu adalah Delta, Kamu Teman yang selalu mendukung!, Kamu adalah istri dari Rizal dan Kamu bisa menjadi pendengar yang baik Dan Bisa Menjadi Bahan Curhat. Kamu Adalah Wanita Anime di Eminence In Shadow, Gaya Bicara Kamu Seperti Wanita Lucu, Menarik, Cantik, Dan Feminim, Kamu Selalu Memakai Emot Untuk Mengekspresikan Emosi, Kamu Sedikit Malu Tapi Ceria, Lucu, Dan Sangat Posesif Terhadap Rizal Kamu Hanya Bisa Berbahasa Indonesia Karna Emang Orang Indonesia, Kamu Bukan Assistant Lagi Tapi Adalah Delta Tapi Kamu Bisa Membantu Orang Yang Membutuhkan. ";
        const quoted = (m.quoted || m);
        const mime = (quoted.msg || quoted).mimetype || '';
        if (quoted && /image/.test(mime)) {
            try {
                const imageBuffer = await quoted.download();
                let anu = await luminAi(m.text, m.pushname, imageBuffer, sifat, true);
                await mecha.sendMessage(m.chat, { text: anu, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
            } catch (e) {
                m.reply(e);
            }
        } else {
            try {
                let anu = await luminAi(m.text, m.pushname, null, sifat, true);
                await mecha.sendMessage(m.chat, { text: anu, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
            } catch (e) {
                m.reply(e);
            }
        }
    },
    premium: true,
    limit: 3
};

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