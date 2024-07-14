exports.run = {
  usage: ['epsanime'],
  hidden: ['epsme'],
  use: 'link episode',
  category: 'searching',
  async: async (m, { func, mecha, comand }) => {
    if (!m.text) return m.reply(func.example(comand, 'https://skizo.tech/api/v1/episode/knjnn-episode-20-sub-indo'));
    
    let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration });

    try {
      let res = await func.fetchJson(`${m.text}`);
      if (res.title && res.list_episode) {
        let txt = `*Detail Anime:*\n\n`;
        txt += `Mirror Embed 2 Quality: ${res.mirror_embed2.quality}\n`;
        for (let stream of res.mirror_embed2.straming) {
          txt += `- Driver: ${stream.driver}\n  Link: ${stream.link}\n`;
        }
        txt += `\nMirror Embed 3 Quality: ${res.mirror_embed3.quality}\n`;
        for (let stream of res.mirror_embed3.straming) {
          txt += `- Driver: ${stream.driver}\n  Link: ${stream.link}\n`;
        }
        txt += `\nQuality:\n`;
        txt += `- Low Quality: ${res.quality.low_quality.quality}\n  Size: ${res.quality.low_quality.size}\n`;
        for (let link of res.quality.low_quality.download_links) {
          txt += `  - Host: ${link.host}\n     Link: ${link.link}\n`;
        }
        txt += `\n- Medium Quality: ${res.quality.medium_quality.quality}\n  Size: ${res.quality.medium_quality.size}\n`;
        for (let link of res.quality.medium_quality.download_links) {
          txt += `  - Host: ${link.host}\n     Link: ${link.link}\n`;
        }
        txt += `\n- High Quality: ${res.quality.high_quality.quality}\n  Size: ${res.quality.high_quality.size}\n`;
        for (let link of res.quality.high_quality.download_links) {
          txt += `  - Host: ${link.host}\n     Link: ${link.link}\n`;
        }

        await mecha.sendMessage(m.chat, { text: txt, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
      } else {
        m.reply('Anime tidak ditemukan.');
      }
    } catch (err) {
      console.error(err);
      m.reply(global.mess.error.api);
    }
  },
  limit: true
};