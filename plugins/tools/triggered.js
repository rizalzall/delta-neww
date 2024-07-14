exports.run = {
usage: ['triggered'],
hidden: ['trigger'],
use: ['reply photo'],
category: 'canvas',
async: async (m, { func, mecha, comand, mime, quoted, packname, author }) => {
if (/image\/(jpe?g|png)/.test(mime)) {
m.reply(global.mess.wait)
let media = await mecha.downloadAndSaveMediaMessage(quoted)
let media_url = (await func.telegraPh(media)).url
let trigger = `https://api.dhamzxploit.my.id/api/canvas/trigger?url=${media_url}`
mecha.sendStickerFromUrl(m.chat, trigger, m, {packname: packname, author: author})
} else m.reply(`Send or Reply photo with caption ${comand}`)
},
limit: 3
}