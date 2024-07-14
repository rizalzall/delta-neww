exports.run = {
  usage: ['krakendl'],
  hidden: ['kdl'],
  use: 'link kraken files',
  category: 'downloader',
  premium: true,
  async: async (m, { func, mecha, comand, args }) => {
    if (!m.text) return m.reply(func.example('krakendl', 'https://www.kraken.com'));
    if (!func.isUrl(m.args[0]) && !m.args[0].includes('kraken.com')) return m.reply(mess.error.url);
    m.reply(global.mess.wait);
    try {
      let res = await func.fetchJson(`https://api.betabotz.eu.org/api/download/kraken?url=${encodeURIComponent(m.args[0])}&apikey=UZUgfL7u`);
      if (res.status && res.result.urlDownload) {
        let cap = `*Title:* ${res.result.fileName}\n*Upload Date:* ${res.result.uploadDate}\n*File Size:* ${res.result.fileSize}\n*Views:* ${res.result.views}\n*Downloads:* ${res.result.downloads}`;
        await mecha.sendMessage(m.chat, {document: {url: res.result.urlDownload}, fileName: `${res.result.fileName}`, mimetype: 'video/mp4', caption: cap}, {quoted: m, ephemeralExpiration: m.expiration})
      } else {
        m.reply(global.mess.error.api);
      }
    } catch (err) {
      console.error(err);
      m.reply(func.jsonFormat(err));
    }
  },
  limit: 5
};