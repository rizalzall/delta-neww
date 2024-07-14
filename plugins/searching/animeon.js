exports.run = {
  usage: ['animeon'],
  use: 'nomor',
  category: 'searching',
  async: async (m, { func, mecha, command }) => {
  if (!m.text) return m.reply(func.example(m.cmd, '1'));
    mecha.sendReact(m.chat, `⏱️`, m.key )

    try {
      let res = await func.fetchJson(`https://skizo.tech/api/v1/ongoing/${m.text}`);
if (res.status && res.ongoing.length > 0) {
        let body = '```Result from:```' + ' `' + m.text + '`'
        let rows = []
        for (let [index, result] of res.ongoing.entries()) {
        	if (!result.title || !result.endpoint) continue
        rows.push({
title: `${index + 1}. ${result.title}`,
id: `${m.prefix}animedetail ${result.endpoint}`,
description: `- Updated On : ${result.updated_on}`
})
}
let sections = [{
title: 'PILIH ANIME DIBAWAH',
rows: rows
}]
let buttons = [
['list', 'Click Here ⎙', sections],
]
mecha.sendButton(m.chat, `A N I M E - O N G O I N G`, body, 'select the list button below.', buttons, m, {
userJid: m.sender,
expiration: m.expiration
})
        mecha.sendReact(m.chat, `☑️`, m.key )
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