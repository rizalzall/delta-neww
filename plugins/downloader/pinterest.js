exports.run = {
usage: ['pinterestdl'],
hidden: ['pindl'],
use: 'link pinterest',
category: 'downloader',
async: async (m, { func, mecha, comand }) => {
if (!m.text) return m.reply(func.example(comand, 'https://pin.it/6DCwzXFwY'))
if (!func.isUrl(m.args[0]) && !m.args[0].includes('pin.it')) return m.reply(mess.error.url)
m.reply(global.mess.wait)
let res = await func.fetchJson('https://aemt.me/download/pindl?url=' + m.text)
  if (!res) throw 'Link Tidak Valid'
await mecha.sendMessage(m.chat, {image: {url: res.result.data.image}, caption: global.mess.ok}, {quoted: m, ephemeralExpiration: m.expiration})
},
limit: 2
}