const { ytmp3 } = require('../../lib/youtube');
const fg = require('api-dylux');

exports.run = {
  usage: ['ytvideo'],
  hidden: ['ytv', 'ytmp4'],
  use: 'link youtube',
  category: 'downloader',
  async: async (m, { func, mecha, mess }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'https://youtu.be/1fOBgosDo7s?si=fjD7OLAqD7wrzSSU'));
    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(m.text)) return m.reply(mess.error.url);

    mecha.ytvideo = mecha.ytvideo ? mecha.ytvideo : {};
    if (m.text in mecha.ytvideo) return m.reply("Harap tunggu, masih ada tugas yang belum terselesaikan.");
    mecha.ytvideo[m.text] = true;
    mecha.sendReact(m.chat, '🕒', m.key);

    try {
      let data = await ytmp3(m.text);
      let txt = `🎶 *YOUTUBE DOWNLOADER MP3*\n`;
      txt += `\n🎵 *Title:* ${data.title}`;
      txt += `\n📦 *Size:* ${data.size}`;
      txt += `\n⏳ *Duration:* ${data.duration}`;
      txt += `\n👁️ *Views:* ${data.views}${data.likes ? '\n👍 *Likes:* ' + data.likes : ''}${data.dislike ? '\n👎 *Dislike:* ' + data.dislike : ''}`;
      txt += `\n📺 *Channel:* ${data.channel}`;
      txt += `\n📅 *Upload Date:* ${data.uploadDate}`;

      let music = await fg.ytv(m.text);
      if (!music.dl_url) return m.reply(mess.error.api);

      await mecha.sendMessage(m.chat, {
        video: { url: music.dl_url },
        caption: txt,
        mimetype: 'video/mp4'
      }, {
        quoted: m,
        ephemeralExpiration: m.expiration
      });
      mecha.sendMessage(m.chat, { react: { text: `☑️`, key: m.key } });
    } catch (err) {
      mecha.reply(m.chat, "Error ytvideo: " + err, m);
    } finally {
      delete mecha.ytvideo[m.text];
    }
  },
  limit: 3
};
