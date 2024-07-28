const axios = require('axios');

exports.run = {
    usage: ['simi'],
    hidden: ['simih'],
    use: 'question',
    category: 'ai',
    async: async (m, { func, mecha }) => {
        if (!m.text) return m.reply(func.example(m.cmd, 'halo'));
        await mecha.sendReact(m.chat, '🕒', m.key);
        let messageId = 'BAE5' + func.makeid(8).toUpperCase() + 'SIMI';
        let sessionId = m.sender;
        try {
            let response = await chatWithElxyz(m.text, sessionId);
            await mecha.sendMessage(m.chat, { text: `${response}` }, { quoted: m, ephemeralExpiration: m.expiration, messageId: messageId });
            await mecha.sendReact(m.chat, '✅', m.key);
        } catch (e) {
            console.error("Error during chat process:", e);
            m.reply(`${e}`)
        }
    },
    main: async (m, { func, mecha }) => {
        if (m.budy && m.quoted && m.quoted.fromMe && m.quoted.id.endsWith('SIMI') && !m.isPrefix) {
            await mecha.sendReact(m.chat, '🕒', m.key);
            let messageId = 'BAE5' + func.makeid(8).toUpperCase() + 'SIMI';
            let sessionId = m.sender;
            try {
                let response = await chatWithElxyz(m.budy, sessionId);
                await mecha.sendMessage(m.chat, { text: `${response}` }, { quoted: m, ephemeralExpiration: m.expiration, messageId: messageId });
                global.db.users[m.sender].limit -= 1;
                await mecha.sendReact(m.chat, '✅', m.key);
            } catch (e) {
                console.error("Error during chat process:", e);
                m.reply(`${e}`)
            }
        }
    },
    limit: true
};

async function chatWithElxyz(prompt, sessionId) {
    let postData = {
        prompt: prompt,
        sessionId: sessionId,
        character: `Kamu adalah Desi, kamu bukanlah ai atau chat bot, kamu adalah anak remaja sma, kamu memiliki sifat kasar dan toxic, kadang kamu suka menggoda orang, kamu kalau ngobrol menggunakan bahasa gaul anak Indonesia seperti lu untuk kamu dan gw untuk aku.`
    };

    try {
        let response = await axios({
            url: "https://elxyz.me/api/chat",
            method: 'POST',
            data: new URLSearchParams(Object.entries(postData)),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.data.answer;
    } catch (error) {
        console.error("Error during chat request:", error);
        return "An error occurred during the chat process.";
    }
}
