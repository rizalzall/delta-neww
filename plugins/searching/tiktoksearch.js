exports.run = {
    usage: ['tiktoksearch'],
    hidden: ['ttsearch'],
    use: 'query',
    category: 'searching',
    async: async (m, { func, mecha, comand }) => {
        if (!m.text) return m.reply(func.example(comand, 'query'));
        
        m.reply(global.mess.wait);
        
        await func.fetchJson(`https://skizo.tech/api/tiktok-search?apikey=zallzall&keywords=${encodeURIComponent(m.text)}`)
            .then(async (res) => {
                if (!res || res.length === 0) return m.reply('No TikTok video found for the given query.');
                
                const randomIndex = Math.floor(Math.random() * res.length);
                const video = res[randomIndex]; // Select a random video from the search results

                const caption = `*TikTok Video*\n\nTitle: ${video.title}\nDuration: ${video.duration} seconds\nPlay Count: ${video.play_count}\nDigg Count: ${video.digg_count}\nComment Count: ${video.comment_count}\nShare Count: ${video.share_count}\nDownload Count: ${video.download_count}\n\nBy: @${video.author.nickname}`;

                mecha.sendMessage(m.chat, { video: { url: video.play }, caption: caption }, { quoted: m });
            })
            .catch((err) => m.reply(func.jsonFormat(err)));
    },
    premium: true,
    limit: true
}