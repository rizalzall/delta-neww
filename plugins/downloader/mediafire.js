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
      let res = await fetch('https://apisku.biz.id/api/downloader/mediafire', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'api_key': 'free',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: m.text })
      }).then(response => response.json());

      if (!res.status) throw 'Link Tidak Valid';

      let fileInfo = res.data[0];
      let caption = `▦  *MEDIAFIRE DOWNLOADER*\n\n▦ File Name: ${fileInfo.nama}\n▦ File Size: ${fileInfo.size}`;
      await mecha.sendMedia(m.chat, fileInfo.link, m, { caption: caption, fileName: fileInfo.nama });
      await mecha.sendReact(m.chat, '✅', m.key);
    } catch (error) {
      console.error(error);
      m.reply(`Terjadi Kesalahan: ${error}`);
    }
  },
  limit: 5
};
