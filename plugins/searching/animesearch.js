exports.run = {
  usage: ['animesearch'],
  use: 'judul anime',
  category: 'searching',
  async: async (m, { func, mecha, command }) => {
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
  },
  limit: 2
};