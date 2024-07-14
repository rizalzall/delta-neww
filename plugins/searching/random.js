exports.run = {
  usage: ['milf', 'douyin', 'meme', 'jeni', 'jiso', 'ryujin', 'rose', 'hijaber', 'justinaxie', 'china', 'vietnam', 'japan', 'korea', 'indonesia', 'malaysia', 'thailand'],
  category: 'random',
  async: async (m, { func, mecha, mime, quoted, makeid, command, setting }) => {
    mecha.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    try {
      let isVideo = false;
      let foto;
      let caption = global.mess.ok; // Default caption

      switch (m.command) {
        case 'china':
          foto = `https://aemt.me/china`;
          break;
        case 'vietnam':
          foto = `https://aemt.me/vietnam`;
          break;
        case 'thailand':
          foto = `https://aemt.me/thailand`;
          break;
        case 'malaysia':
          foto = `https://aemt.me/malaysia`;
          break;
        case 'korea':
          foto = `https://aemt.me/korea`;
          break;
        case 'japan':
          foto = `https://aemt.me/japan`;
          break;
        case 'indonesia':
          foto = `https://aemt.me/indonesia`;
          break;
        case 'hijaber':
          foto = `https://api.betabotz.eu.org/api/cecan/hijaber?apikey=UZUgfL7u`;
          break;
        case 'jeni':
          foto = `https://api.betabotz.eu.org/api/cecan/jeni?apikey=UZUgfL7u`;
          break;
        case 'jiso':
          foto = `https://api.betabotz.eu.org/api/cecan/jiso?apikey=UZUgfL7u`;
          break;
        case 'milf':
          foto = `https://api.koi.pics/api/anime/milf?apikey=qQmMdp4I9H`;
          break;
        case 'justinaxie':
          foto = `https://api.betabotz.eu.org/api/cecan/justinaxie?apikey=UZUgfL7u`;
          break;
        case 'ryujin':
          foto = `https://api.betabotz.eu.org/api/cecan/ryujin?apikey=UZUgfL7u`;
          break;
        case 'rose':
          foto = `https://api.betabotz.eu.org/api/cecan/rose?apikey=UZUgfL7u`;
          break;
        case 'meme':
          let memeData = await func.fetchJson('https://skizo.tech/api/randommeme?apikey=zallzall');
          foto = memeData.url;
          break;
        case 'douyin':
          let douyinData = await func.fetchJson('https://aemt.me/asupandouyin');
          foto = douyinData.url;
          isVideo = true;
          break;
        default:
          return m.reply('Perintah tidak valid. Gunakan: china atau vietnam.');
      }

      if (isVideo) {
        let button = [
['button', 'Next', m.command],
]
mecha.sendButton(m.chat, caption, header, footer, button, m, {
media: foto,
userJid: m.sender,
expiration: m.expiration
})
      } else {
        let button = [
['button', 'Next', m.command],
]
mecha.sendButton(m.chat, caption, header, footer, button, m, {
media: foto,
userJid: m.sender,
expiration: m.expiration
})
      }

      mecha.sendMessage(m.chat, { react: { text: `☑️`, key: m.key } });
    } catch (e) {
      console.error(e);
      await mecha.sendMessage(m.chat, { text: `───「 *SYSTEM ERROR* 」───\n\nTerjadi kesalahan: ${e.message}`, quoted: m, ephemeralExpiration: m.expiration });
    }
  },
  premium: false,
  limit: 5
};