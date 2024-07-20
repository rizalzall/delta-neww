const fg = require('api-dylux');

exports.run = {
usage: ['facebook'],
hidden: ['fbdl'],
use: 'link facebook',
category: 'downloader',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(`Masukkan URL!\n\nContoh: *${m.cmd} https://www.facebook.com/watch/?v=1393572814172251*`)
if (!m.args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return m.reply(global.mess.error.url)
if (m.args[0].includes('https://l.facebook.com/l.php?u=')) return m.reply(global.mess.error.url)
mecha.sendReact(m.chat, '🕒', m.key)
await fg.fbdl(m.args[0]).then(async res => {
let txt = res.title ? res.title : global.mess.ok
await mecha.sendMedia(m.chat, res.videoUrl, m, { caption: txt, expiration: m.expiration });
})
  mecha.sendReact(m.chat, '☑️', m.key)
},
premium: false,
limit: 2
}
