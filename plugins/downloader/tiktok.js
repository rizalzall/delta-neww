const axios = require('axios');
const baileys = require('@whiskeysockets/baileys');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;

exports.run = {
  usage: ['tiktok'],
  hidden: ['tiktokslide', 'tiktokdl', 'tiktokmp3', 'tiktokwm', 'tiktokhd'],
  use: 'link tiktok',
  category: 'downloader',
  async: async (m, { func, mecha }) => {
  switch (m.command) {
  case 'tiktok':{
      if (!m.text) return m.reply(func.example(m.cmd, 'https://vt.tiktok.com'));
      mecha.sendReact(m.chat, '⏱️', m.key)
      try {
      let res = await func.fetchJson('https://skizo.tech/api/tiktok?apikey=zallzall&url=' + m.text)
      if (res.code !== 0) return m.reply(mess.error.api)
      let body = '```Result from:```' + ' `' + m.text + '`'
      let sections = [];
      sections.push({
        title: res.data.title,
        rows: [
              {
                title: '🔊 Audio',
                id: `${m.prefix}tiktokmp3 ${m.text}`,
                description: `🎵 Duration: ${res.data.music_info.duration}s`
              },
              {
                title: '📹 Video No Watermark',
                id: `${m.prefix}tiktokdl ${m.text}`,
                description: `⏳ Duration: ${res.data.duration}s\n📦 Size: ${res.data.size}`
              },
              {
                title: '💧 Video With Watermark',
                id: `${m.prefix}tiktokwm ${m.text}`,
                description: `⏳ Duration: ${res.data.duration}s\n📦 Size: ${res.data.wm_size}`
              },
              {
                title: '🖼️ HD Quality',
                id: `${m.prefix}tiktokhd ${m.text}`,
                description: `⏳ Duration: ${res.data.duration}s\n📦 Size: ${res.data.hd_size}`
              },
              {
                title: '📽️ Slide',
                id: `${m.prefix}tiktokslide ${m.text}`
              }
            ]
          });
      let buttons = [
        ['list', 'Click Here ⎙', sections],
        ['url', 'TikTok', m.text],
      ]
      mecha.sendButton(m.chat, `T I K T O K - D O W N L O A D E R`, `Result From : ${m.text}\n\nSelect the list button below.`, global.footer, buttons, m, {
        userJid: m.sender,
        expiration: m.expiration
      })
} catch (err) {
      console.error(err);
      m.reply(`Terjadj kesalahan ${err}`);
      }
    }
    break
case 'tiktokdl':{
if (!m.text) return m.reply(func.example(m.cmd, 'https://vt.tiktok.com'));
            if (!func.isUrl(m.args[0]) && !m.args[0].includes('vt.tiktok.com')) return m.reply(mess.error.url);
            m.reply(global.mess.wait)
            try {
            let res = await func.fetchJson('https://skizo.tech/api/tiktok?apikey=zallzall&url=' + m.text)
            if (res.code !== 0) return m.reply(mess.error.api)
            let {
              id,
              title,
              play_count,
              digg_count,
              comment_count,
              share_count,
              download_count,
              collect_count,
              music_info,
              author
            } = res.data;
            let caption = `*ID:* ${id}\n*Judul:* ${title}\n*Play:* ${play_count}\n*Digg:* ${digg_count}\n*Komentar:* ${comment_count}\n*Share:* ${share_count}\n*Download:* ${download_count}\n*Collect:* ${collect_count}\n\n*Musik:* ${music_info.title} - ${music_info.author}\n\n *Author:* ${author.nickname}`;
            await mecha.sendMessage(m.chat, {
              video: {
                url: res.data.play
              },
              mimetype: 'video/mp4'
            }, { quoted: m, ephemeralExpiration: m.expiration })
} catch (err) {
      console.error(err);
      m.reply(`Terjadj kesalahan ${err}`);
    }
  }
break
case 'tiktokmp3':{
if (!m.text) return m.reply(func.example(m.cmd, 'https://vt.tiktok.com'));
            if (!func.isUrl(m.args[0]) && !m.args[0].includes('vt.tiktok.com')) return m.reply(mess.error.url);
            m.reply(global.mess.wait)
            try {
            let res = await func.fetchJson('https://skizo.tech/api/tiktok?apikey=zallzall&url=' + m.text)
            if (res.code !== 0) return m.reply(mess.error.api)
            await mecha.sendMessage(m.chat, {
              audio: {
                url: res.data.music
              },
              mimetype: 'audio/mpeg'
            }, { quoted: m, ephemeralExpiration: m.expiration })
} catch (err) {
      console.error(err);
      m.reply(`Terjadi kesalahan ${err}`);
    }
  }
break
case 'tiktokhd':{
if (!m.text) return m.reply(func.example(m.cmd, 'https://vt.tiktok.com/ZSLsa9np7/'))
if (!func.isUrl(m.args[0]) && !m.args[0].includes('tiktok.com')) return m.reply(mess.error.url)
m.reply(global.mess.wait)
try {
let res = await func.fetchJson('https://skizo.tech/api/tiktok?apikey=zallzall&url=' + m.text)
if (!res.code === 0) return m.reply(mess.error.api)
        let {
        id,
        title,
        play,
        wmplay,
        hdplay,
        music_info,
        play_count,
        digg_count,
        comment_count,
        share_count,
        download_count,
        collect_count,
        author
    } = res.data;
await mecha.sendMessage(m.chat, {video: {url: hdplay}, mimetype: 'video/mp4'}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (err) {
      console.error(err);
      m.reply(`Terjadi kesalahan ${err}`);
    }
  }
break
case 'tiktokslide':{
    if (!m.text) return m.reply(func.example(m.cmd, 'https://www.tiktok.com/'));
    
    await m.reply('*Processing...*');

    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({
        image: { url }
      }, {
        upload: mecha.waUploadToServer
      });
      return imageMessage;
    }

    let push = [];
    try {
      let { data } = await axios.get(`https://api.betabotz.eu.org/api/download/ttslide?url=${encodeURIComponent(m.text)}&apikey=UZUgfL7u`);
      if (data.status && data.result && data.result.images.length > 0) {
        let images = data.result.images;
        let i = 1;

        for (let img of images) {
          push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: `Slide ke - ${i++}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '乂 T I K - T O K - S L I D E'
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
              title: '',
              hasMediaAttachment: true,
              imageMessage: await createImage(img)
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "Source 🔍",
                    url: m.text,
                    merchant_url: m.text
                  })
                }
              ]
            })
          });
        }

        const bot = generateWAMessageFromContent(m.chat, {
          viewOnceMessage: {
            message: {
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: `Hasil Download: ${data.result.title}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: '乂 T I K - T O K - S L I D E'
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  hasMediaAttachment: false
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards: [...push]
                })
              })
            }
          }
        }, { quoted: m });

        await mecha.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
          await mecha.sendMessage(m.chat, {
              audio: {
                url: data.result.audio
              },
              mimetype: 'audio/mpeg'
            }, { quoted: m, ephemeralExpiration: m.expiration })
      } else {
        m.reply('Tidak dapat menemukan slide gambar.');
      }
    } catch (e) {
      console.error(e);
      m.reply(`Maaf terjadi kesalahan! ${e}`);
    }
  }
break
case 'tiktokwm':{
            if (!m.text) return m.reply(func.example(m.cmd, 'https://vt.tiktok.com'));
            if (!func.isUrl(m.args[0]) && !m.args[0].includes('vt.tiktok.com')) return m.reply(mess.error.url);
            m.reply(global.mess.wait)
            try {
            let res = await func.fetchJson('https://skizo.tech/api/tiktok?apikey=zallzall&url=' + m.text)
            if (res.code !== 0) return m.reply(mess.error.api)
            let {
              id,
              title,
              play_count,
              digg_count,
              comment_count,
              share_count,
              download_count,
              collect_count,
              music_info,
              author
            } = res.data;
            let caption = `*ID:* ${id}\n*Judul:* ${title}\n*Play:* ${play_count}\n*Digg:* ${digg_count}\n*Komentar:* ${comment_count}\n*Share:* ${share_count}\n*Download:* ${download_count}\n*Collect:* ${collect_count}\n\n*Musik:* ${music_info.title} - ${music_info.author}\n\n *Author:* ${author.nickname}`;
            await mecha.sendMessage(m.chat, {
              video: {
                url: res.data.wmplay
              },
              mimetype: 'video/mp4'
            }, { quoted: m, ephemeralExpiration: m.expiration })
} catch (err) {
      console.error(err);
      m.reply(global.mess.error.api);
    }
  }
  break
}
},
premium: false, // Hanya member premium yang dapat mengakses fitur ini
limit: true
                       }
