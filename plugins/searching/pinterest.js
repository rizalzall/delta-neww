const axios = require('axios');
const baileys = require('@whiskeysockets/baileys');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;

exports.run = {
  usage: ['pinterest'],
  hidden: ['pin'],
  use: 'text',
  category: 'searching',
  async: async (m, { mecha, text, func, usedPrefix, command }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'nakano miku'));
    if (m.text.startsWith('@62')) return m.reply('Stress ??');
    await m.reply('*Processing...*');

    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({
        image: { url }
      }, {
        upload: mecha.waUploadToServer
      });
      return imageMessage;
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    let push = [];
    let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(m.text)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(m.text)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    let res = data.resource_response.data.results.map(v => v.images.orig.url);

    shuffleArray(res);
    let ult = res.splice(0, 5);
    let i = 1;

    for (let lucuy of ult) {
      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `Image ke - ${i++}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: footer
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: await createImage(lucuy)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Source 🔍",
                url: `https://www.pinterest.com/search/pins/?rs=typed&q=${encodeURIComponent(m.text)}`,
                merchant_url: `https://www.pinterest.com/search/pins/?rs=typed&q=${encodeURIComponent(m.text)}`
              })
            }
          ]
        })
      });
    }

    const bot = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `Hasil Searching: ${m.text}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '乂 P I N T - S L I D E'
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
  },
  restrict: true,
  limit: 3
};