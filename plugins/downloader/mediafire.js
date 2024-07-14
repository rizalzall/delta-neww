exports.run = {
  usage: ['mediafire'],
  hidden: ['mfire', 'mfdl'],
  use: 'link mediafire',
  category: 'downloader',
  async: async (m, { func, mecha, comand }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'https://www.mediafire.com/file/a61862y1tgvfiim/ZackBotMans+(+Versi+1.0.1+).zip/file'))
    if (!func.isUrl(m.args[0]) && !m.args[0].includes('mediafire.com')) return m.reply(global.mess.error.url)
    await mecha.sendReact(m.chat, '🕒', m.key);
    try {
      let res = await func.fetchJson(`https://itzpire.com/download/mediafire?url=${m.text}`)
      let caption = `▦  *MEDIAFIRE DOWNLOADER*\n\n▦ File Name: ${res.data.title}\n▦ File Size: ${res.data.size}`
      await mecha.sendMedia(m.chat, res.data.url, m, { caption: caption, fileName: res.data.title })
     await mecha.sendReact(m.chat, '✅', m.key);
    } catch (error) {
      console.error(error)
      m.reply(`Terjadi Kesalahan: ${error}`)
    }
  },
  limit: 5
}