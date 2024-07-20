exports.run = {
    usage: ['capcut'],
    hidden: ['cc', 'ccdl'],
    use: 'link capcut',
    category: 'downloader',
    async: async (m, { func, mecha, comand }) => {
        if (!m.text) return m.reply(func.example(m.cmd, 'https://www.capcut.com/'))
        if (!func.isUrl(m.args[0]) && !m.args[0].includes('capcut.com')) return m.reply(mess.error.url)
        mecha.sendReact(m.chat, '🕒', m.key)
        let res = await func.fetchJson('https://aemt.me/download/capcut?url=' + m.text)
        if (!res.code === 0) return m.reply(mess.error.api)
        let {
        description,
        title,
        digunakan,
        video_ori,
        cover,
        author_profile
    } = res.result;
let cap = `▶️ *C A P C U T* ▶️\n\n*Judul:* ${title}\n*Digunakan:* ${digunakan}\n*Deskripsi:* ${description}\n*Cover:* ${cover}\n*Profile:* ${author_profile}`;
        await mecha.sendMessage(m.chat, { video: { url: video_ori }, caption: cap, mimetype: 'video/mp4' }, { quoted: m, ephemeralExpiration: m.expiration })
    mecha.sendReact(m.chat, '☑️', m.key)
    },
    limit: true
}
