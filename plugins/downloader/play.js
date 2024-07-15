const yts = require('yt-search');
const fetch = require('node-fetch');
const fg = require('api-dylux');

exports.run = {
  usage: ['play'],
  use: 'judul lagu',
  category: 'downloader',
  async: async (m, { func, mecha, downloadMp3 }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'melukis senja'));

    mecha.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    let search = await yts(m.text);
    if (search.all.length === 0) return m.reply(global.mess.error.api);

    let data = search.all.filter((v) => v.type === 'video');
    if (data.length === 0) return m.reply(global.mess.error.api);

    let res = data[0] || data[1];
    if (!res) return m.reply(global.mess.error.api);

    let txt = `乂  *Y O U T U B E  P L A Y*\n`;
    txt += `\n◦ ID : ${res.videoId}`;
    txt += `\n◦ Title : ${res.title}`;
    txt += `\n◦ Views : ${res.views}`;
    txt += `\n◦ Duration : ${res.timestamp}`;
    txt += `\n◦ Upload : ${res.ago}`;
    txt += `\n◦ Channel : ${res.author.name}`;
    txt += `\n◦ URL Channel : ${res.author.url}`;
    txt += `\n◦ URL Video : ${res.url}`;
    txt += `\n◦ Description : ${res.description}`;
    txt += `\n\nPlease wait, the audio file is being sent...`;

    let thumbnailBuffer = await fetch(res.thumbnail).then((res) => res.buffer());

    mecha.sendMessageModify(m.chat, txt, m, {
      title: 'YOUTUBE PLAY',
      body: global.header,
      thumbnail: thumbnailBuffer,
      largeThumb: true,
      expiration: m.expiration
    });

    let music = await fg.yta(res.url);
    if (!music.dl_url) return m.reply(global.mess.error.api);

    await mecha.sendMessage(m.chat, {
      audio: { url: music.dl_url },
      mimetype: 'audio/mpeg'
    }, {
      quoted: m,
      ephemeralExpiration: m.expiration
    });

    mecha.sendMessage(m.chat, { react: { text: `☑️`, key: m.key } });
  },
  premium: false,
  limit: 5
};