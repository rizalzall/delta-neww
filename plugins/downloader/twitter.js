const axios = require('axios');

exports.run = {
    usage: ['twitter'],
    hidden: ['twtdl', 'twt'],
    use: 'link twitter',
    category: 'downloader',
    async: async (m, { func, mecha, comand }) => {
        if (!m.text) return m.reply(func.example(comand, 'https://twitter.com/username/status/1234567890123456789'));
        if (!func.isUrl(m.args[0]) && !m.args[0].includes('twitter.com')) return m.reply(mess.error.url);
        m.reply(global.mess.wait);

        try {
            const res = await axios.get('https://skizo.tech/api/twitter', {
                params: {
                    apikey: 'zallzall',
                    url: m.text
                }
            });

            if (!res.data.found) return m.reply(mess.error.api);

            const {
                media,
                date,
                likes,
                replies,
                retweets,
                authorName,
                authorUsername
            } = res.data;

            const video = media.find(m => m.type === 'video');
            if (!video) return m.reply('Tidak ada video yang ditemukan di tweet ini.');

            const cap = `▶️ *T W I T T E R* ▶️\n\n*Author:* ${authorName} (@${authorUsername})\n*Likes:* ${likes}\n*Replies:* ${replies}\n*Retweets:* ${retweets}\n*Date:* ${date}`;
            await mecha.sendMessage(m.chat, { video: { url: video.url }, caption: cap, mimetype: 'video/mp4' }, { quoted: m, ephemeralExpiration: m.expiration });
        } catch (error) {
            console.error(error);
            m.reply('Terjadi kesalahan saat mengambil video Twitter. Silakan coba lagi nanti.');
        }
    },
    limit: 3
}