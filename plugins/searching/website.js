exports.run = {
  usage: ['cekwebsite'],
  hidden: ['cekweb'],
  use: 'pencarian',
  category: 'searching',
  async: async (m, { func, mecha }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'https://www.xnxx.com'));
    mecha.sendReact(m.chat, '🕒', m.key);
    try {
      let res = await func.fetchJson('https://itzpire.com/tools/about-website?url=' + m.text);
      if (res.status !== 'success') {
        return m.reply('Tidak ditemukan.');
      }

      let txt = `乂  *ABOUT WEBSITE*\n\n`;
      txt += `*Judul:* ${res.data.title}\n`;
      txt += `*Penjelasan:*\n${res.data.summary}\n`;

      mecha.sendMedia(m.chat, res.data.favicon, m, {
        caption: txt,
        ephemeralExpiration: m.expiration
      });
    } catch (e) {
      console.error(e);
      m.reply(`Terjadi kesalahan saat memproses permintaan: ${e}`);
    }
  },
  premium: true,
  limit: true
}
