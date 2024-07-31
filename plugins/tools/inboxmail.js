exports.run = {
    usage: ['inboxmail'],
    category: 'tools',
    async: async (m, { func, mecha, comand }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'U2Vzc2lvbjrbyWZthZJPiYs_B6Evcs4E'))
        let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration })
        try {
            let res = await func.fetchJson(`https://api.maher-zubair.tech/misc/get_inbox_tempmail?q=${m.text}`);
            
            if (res.status === 200 && res.result.length > 0) {
                for (let inbox of res.result[0]) {
                    let message = `📧 *Inbox Temp Mail*\n\n` +
                                  `*To:* ${inbox.toAddr}\n` +
                                  `*From:* ${inbox.fromAddr}\n` +
                                  `*Subject:* ${inbox.headerSubject || 'No Subject'}\n` +
                                  `*Message:* ${inbox.text}\n` +
                                  `*Download:* ${inbox.downloadUrl}`;

                    await mecha.sendMessage(m.chat, { text: message }, { quoted: m, ephemeralExpiration: m.expiration });
                }
            } else {
                m.reply('Tidak ada pesan yang ditemukan.');
            }
        } catch (e) {
            m.reply(`Maaf terjadi kesalahan! ${e}`);
        }
    },
    premium: false,
    limit: 3
}
