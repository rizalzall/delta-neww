exports.run = {
usage: ['dalle'],
hidden: ['draw'],
use: 'text',
category: 'ai',
async: async (m, { func, mecha, comand }) => {
if (!m.text) return m.reply(func.example(comand, 'Wooden house on snow mountain'))
m.reply(global.mess.wait)
let res = await func.fetchJson('https://skizo.tech/api/dalle3?apikey=zallzall&prompt=' + m.text)
  if (!res) throw 'Link Tidak Valid'
await mecha.sendMessage(m.chat, {image: {url: res.url}, caption: global.mess.ok}, {quoted: m, ephemeralExpiration: m.expiration})
},
limit: 2,
premium: true
}