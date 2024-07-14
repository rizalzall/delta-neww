exports.run = {
    usage: ['hutao'],
    use: 'text',
    category: 'ai',
    async: async (m, { func, mecha, comand }) => {
    if (!m.text) return m.reply(func.example(comand, 'halo'))
        let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration })
        try {
            let res = await func.fetchJson(`https://skizo.tech/api/cai/chat?apikey=zallzall&characterId=U3dJdreV9rrvUiAnILMauI-oNH838a8E_kEYfOFPalE&text=${encodeURIComponent(m.text)}&sessionId=sBmKxUdGFaXUWVqNJbOff1TVaN7OD9rQlPMHnF5zvjI&token=5cc35998a78c59a19c77d4da66bf7332337306e1`)
            await mecha.sendMessage(m.chat, { text: `${res.result.text}`, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
        } catch (e) {
            m.reply('Maaf terjadi kesalahan!');
        }
    },
    premium: true,
    limit: 5
}