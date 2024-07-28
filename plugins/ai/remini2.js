exports.run = {
usage: ['remini2'],
hidden: ['rm2'],
use: 'reply photo',
category: 'ai',
async: async (m, { func, mecha, mime, quoted, makeid, comand, setting }) => {
if (/image\/(jpe?g|png)/.test(mime)) {
m.reply(global.mess.wait)
try {
let media = await mecha.downloadAndSaveMediaMessage(m)
let anu = await func.telegraPh(media);
let foto = `https://skizo.tech/api/remini?apikey=zallzall&url=${anu.url}`;
await mecha.sendMessage(m.chat, {image: { url: foto }, caption: global.mess.ok}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (e) {
return m.reply(global.mess.error.api);
}
} else m.reply(`Kirim/Reply foto dengan caption ${m.cmd}`)
},
premium: false,
limit: false
}
