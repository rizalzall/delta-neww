const { File } = require('megajs');
const { fileTypeFromBuffer } = require('file-type');

exports.run = {
  usage: ['mega'],
  hidden: ['megadl'],
  use: 'link mega',
  category: 'downloader',
  async: async (m, { func, mecha, command }) => {
    if (!m.text) {
      return m.reply(func.example(m.cmd, 'link'));
    }

    let file;
      file = File.fromURL(m.text);

    m.reply(global.mess.wait);

    try {
      await file.loadAttributes();
      const data = await file.downloadBuffer();
      
      await mecha.sendMessage(m.chat, { document: data, fileName: file.name, mimetype: 'video/mp4' }, { quoted: m });
      mecha.sendMessage(m.chat, { react: { text: `☑️`, key: m.key } });
    } catch (e) {
      console.error('Download Error:', e);
      m.reply('Internal Error: ' + e.message);
    }
  },
  premium: true,
  limit: 3
};