exports.run = {
  usage: ['animesearch'],
  hidden: ['animedetail', 'epsanime'],
  use: 'judul anime',
  category: 'searching',
  async: async (m, { func, mecha, command }) => {
  	switch (m.command) {
case 'animesearch':{
    if (!m.text) return m.reply(func.example(m.cmd, 'kageno'));
    mecha.sendReact(m.chat, `⏱️`, m.key )
    try {
      let res = await func.fetchJson(`https://skizo.tech/api/v1/search/${encodeURIComponent(m.text)}`);
      if (res.status && res.search.length > 0) {
      	let body = '```Result from:```' + ' `' + m.text + '`'
      let rows = []
        for (let [index, result] of res.search.entries()) {
        	if (!result.title || !result.endpoint || !result.status) continue
        rows.push({
        	title: `${index + 1}. ${result.title}`,
id: `${m.prefix}animedetail ${result.endpoint}`,
description: `- Status : ${result.status}\n- Ranting : ${result.rating}`
})
}
let sections = [{
title: 'PILIH ANIME DIBAWAH',
rows: rows
}]
let buttons = [
['list', 'Click Here ⎙', sections],
]
mecha.sendButton(m.chat, `A N I M E - S E A R C H`, body, 'select the list button below.', buttons, m, {
userJid: m.sender,
expiration: m.expiration
})
        mecha.sendMessage(m.chat, { react: { text: `☑️`, key: m.key } });
      } else {
        m.reply('Hasil pencarian tidak ditemukan.');
      }
    } catch (err) {
      console.error(err);
      m.reply(global.mess.error.api);
    }
  }
  break
  case 'animedetail':{
  	    if (!m.text) return m.reply(func.example(m.cmd, 'https://skizo.tech/api/v1/detail/kage-ni-naritakute-sub-indo'));
    mecha.sendReact(m.chat, `⏱️`, m.key )
    try {
      let res = await func.fetchJson(`${m.text}`);
      if (res.status && res.episode_list.length > 0) {
      	let body = '```© Delta-BOT```'
        let rows = []
        for (let [index, result] of res.episode_list.entries()) {
        	if (!result.episode_title || !result.episode_endpoint || !result.episode_date) continue
        rows.push({
        	title: `${index + 1}. ${result.episode_title}`,
id: `${m.prefix}epsanime ${result.episode_endpoint}`,
description: `- Date : ${result.episode_date}`
})
}
let sections = [{
title: 'PILIH EPISODE DIBAWAH',
rows: rows
}]
        let anime = res.anime_detail;
        let txt = `*Detail Anime:*\n\n`;
        txt += `Title: ${anime.title}\n`;
        txt += `Detail:\n${anime.detail.join('\n')}\n\n`;
        txt += `Sinopsis:\n${anime.sinopsis.join('\n')}\n`;

        let buttons = [
['list', 'Click Here ⎙', sections],
]
mecha.sendButton(m.chat, txt, body, 'select the list button below.', buttons, m, {
media: res.anime_detail.thumb,
userJid: m.sender,
expiration: m.expiration
})
      } else {
        m.reply('Anime tidak ditemukan.');
      }
    } catch (err) {
      console.error(err);
      m.reply(`Terjadi kesalahan: ${err}`);
    }
  }
  break
  case 'epsanime':{
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
      m.reply(`Terjadi kesalahan: ${err}`);
    }
  }
  break
}
},
premium: true, // Hanya member premium yang dapat mengakses fitur ini
limit: 5
}
