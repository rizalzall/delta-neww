exports.run = {
    usage: ['tempmail'],
    category: 'tools',
    async: async (m, { func, mecha, comand }) => {
        let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration });
        try {
            let res = await func.fetchJson(`https://api.maher-zubair.tech/misc/tempmail`);
            if (res.status === 200 && res.result) {
                let email = res.result[0];
                let session = res.result[1];
                let expiration = res.result[2];
                let message = `Email Sementara: ${email}\nSession ID: ${session}\nKadaluarsa: ${expiration}`;
                await mecha.sendMessage(m.chat, { text: message, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
            } else {
                m.reply(`Maaf, tidak dapat mengambil email sementara.`);
            }
        } catch (e) {
            m.reply(`Maaf terjadi kesalahan! ${e}`);
        }
    },
    premium: false,
    limit: true
}
