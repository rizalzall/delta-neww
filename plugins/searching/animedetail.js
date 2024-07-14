exports.run = {
  usage: ['animedetail'],
  hidden: ['animedtl'],
  use: 'link animesearch',
  category: 'searching',
  async: async (m, { func, mecha, comand }) => {
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
      m.reply(global.mess.error.api);
    }
  },
  premium: true,
  limit: true
};
