const { File } = require('megajs');
const { fileTypeFromBuffer } = require('file-type');

exports.run = {
  usage: ['mega'],
  hidden: ['mgdl'],
  use: 'link mega',
  category: 'downloader',
  async: async (m, { func, mecha, command }) => {
    if (!m.text) {
      return m.reply(func.example(m.cmd, 'link'));
    }
    try {
    let file;
      file = File.fromURL(m.text);
    m.reply(global.mess.wait);
      await file.loadAttributes();
      const data = await file.downloadBuffer();
      
      await mecha.sendMedia(m.chat, data, m, { fileName: file.name })
      await mecha.sendReact(m.chat, '✅', m.key);
    } catch (e) {
      console.error('Download Error:', e);
      m.reply('Internal Error: ' + e.message);
    }
  },
  premium: true,
  limit: 3
};
