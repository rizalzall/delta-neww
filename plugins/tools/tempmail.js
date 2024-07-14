exports.run = {
    usage: ['tempmail'],
    category: 'tools',
    async: async (m, { func, mecha, comand }) => {
        let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration })
        try {
            let res = await func.fetchJson(`https://api.maher-zubair.tech/misc/tempmail`)
            await mecha.sendMessage(m.chat, { text: `${res.result.text}`, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
        } catch (e) {
            m.reply(`Maaf terjadi kesalahan! ${e}`);
        }
    },
    premium: true,
    limit: 5
}