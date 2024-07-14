exports.run = {
usage: ['tourl', 'tourl2'],
use: 'reply photo',
category: 'convert',
async: async (m, { func, mecha, quoted }) => {
if (m.command === 'tourl') {
if (/image|video/.test(quoted.mime)) {
let wait = await mecha.sendMessage(m.chat, {text: mess.wait}, {quoted: m, ephemeralExpiration: m.expiration})
let media = await mecha.downloadAndSaveMediaMessage(m)
let anu = await func.telegraPh(media)
await mecha.sendMessage(m.chat, {text: anu.url, edit: wait.key}, {quoted: m, ephemeralExpiration: m.expiration});
} else if (/audio|webp/.test(quoted.mime)) {
let wait = await mecha.sendMessage(m.chat, {text: mess.wait}, {quoted: m, ephemeralExpiration: m.expiration})
let media = await mecha.downloadAndSaveMediaMessage(m)
let anu = await func.UploadFileUgu(media)
await mecha.sendMessage(m.chat, {text: anu.url, edit: wait.key }, {quoted: m, ephemeralExpiration: m.expiration});
} else m.reply('Invalid media!')
} else if (m.command === 'tourl2') {
if (/image|video/.test(quoted.mime)) {
let media = await quoted.download()
await func.uploadImage(media).then(res => {
m.reply(res.data.url)
})
} else m.reply(`Input gambar atau video!`)
}
},
limit: true
}