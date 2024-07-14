const { snapsave } = require('@bochilteam/scraper-sosmed')

exports.run = {
usage: ['instagram'],
hidden: ['ig'],
use: 'link instagram',
category: 'downloader',
async: async (m, { func, mecha, comand }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'https://www.instagram.com/'))
if (!func.isUrl(m.args[0]) && !m.args[0].includes('instagram.com')) return m.reply(mess.error.url)
m.reply(global.mess.wait)
await snapsave(m.text).then(async res => {
  if (!res) throw 'Link Tidak Valid'
 let media = await res[0].url;
await mecha.sendMedia(m.chat, media, m, {
caption: global.mess.ok,
expiration: m.expiration
});
}).catch((err) => m.reply(func.jsonFormat(err)))
},
limit: 1
}