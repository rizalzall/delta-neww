const yts = require('yt-search');
const fg = require('api-dylux');

exports.run = {
  usage: ['ytaudio'],
  hidden: ['yta', 'ytmp3'],
  use: 'link youtube',
  category: 'downloader',
  async: async (m, { func, mecha, mess }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'https://youtu.be/1fOBgosDo7s?si=fjD7OLAqD7wrzSSU'));
    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(m.text)) return m.reply(mess.error.url);

    mecha.ytaudio = mecha.ytaudio ? mecha.ytaudio : {};
    if (m.text in mecha.ytaudio) return m.reply("Harap tunggu, masih ada tugas yang belum terselesaikan.");
    mecha.ytaudio[m.text] = true;
    mecha.sendReact(m.chat, '🕒', m.key);

    try {
      const videoId = m.text.match(/(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/)[1];
      const videoInfo = await yts({ videoId });

      if (!videoInfo) return m.reply('Tidak dapat menemukan informasi video.');

      let data = videoInfo;
      let txt = `🎶 *YOUTUBE DOWNLOADER MP3*\n`;
      txt += `\n🎵 *Title:* ${data.title}`;
      txt += `\n📦 *Size:* Tidak tersedia`;
      txt += `\n⏳ *Duration:* ${data.timestamp}`;
      txt += `\n👁️ *Views:* ${data.views}`;
      txt += `\n📺 *Channel:* ${data.author.name}`;
      txt += `\n📅 *Upload Date:* Tidak tersedia`;
      mecha.reply(m.chat, txt, m);

      let music = await fg.yta(m.text);
      if (!music.dl_url) return m.reply(mess.error.api);

      await mecha.sendMessage(m.chat, {
        audio: { url: music.dl_url },
        mimetype: 'audio/mpeg'
      }, {
        quoted: m,
        ephemeralExpiration: m.expiration
      });
      mecha.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    } catch (err) {
      mecha.reply(m.chat, "Error ytaudio: " + err, m);
    } finally {
      delete mecha.ytaudio[m.text];
    }
  },
  limit: 3
};
