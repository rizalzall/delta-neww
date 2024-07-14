exports.run = {
    usage: ['gemini'],
    use: 'text',
    category: 'ai',
    async: async (m, { func, mecha, comand, quoted }) => {
        if (!m.text) return m.reply(func.example(comand, 'halo'));

        let url_img = '';
        if (quoted && /image\/(jpe?g|png)/.test(quoted.mime)) {
            try {
                let media = await mecha.downloadAndSaveMediaMessage(quoted);
                let anu = await func.UploadFileUgu(media);
                url_img = anu.url ? `&url_img=${encodeURIComponent(anu.url)}` : '';
            } catch (e) {
                return m.reply(`Maaf terjadi kesalahan saat mengunggah gambar! ${e}`);
            }
        }

        let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration });

        try {
            let res = await func.fetchJson(`https://skizo.tech/api/gemini?apikey=zallzall&text=${encodeURIComponent(m.text)}&conversationID=c_354fbcb94bdd1ec6&responseID=r_831cf2615a676025&choiceID=rc_8bc9a9adde3b79a3&_reqID=zallzall&cookie=g.a000kghTng0oLS5f4Wf1JTUoJF-FbkEM462T7idNhUdNGYSQTW6ZXAkbRVD3AtEgQWoW4CAwUAACgYKARcSARMSFQHGX2Mi1l2DY7Z7F9xkVKt5WAqpvRoVAUF8yKpuRHniaanIalRcgh1ELGi70076${url_img}`);

            await mecha.sendMessage(m.chat, { text: `${res.content}`, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
        } catch (e) {
            m.reply(`Maaf terjadi kesalahan! ${e}`);
        }
    },
    premium: true,
    limit: 5
};
