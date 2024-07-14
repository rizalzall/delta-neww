exports.run = {
usage: ['stickermeme'],
hidden: ['smeme'],
use: 'text atas | bawah',
category: 'convert',
async: async (m, { func, mecha, quoted, packname, author }) => {
let atas = m.text.includes('|') ? m.text.split('|')[0] ? m.text.split('|')[0] : m.text : '-'
let bawah = m.text.includes('|') ? m.text.split('|')[1] ? m.text.split('|')[1] : '' : m.text
if (!m.text) return m.reply(func.example(m.cmd, 'beliau | awikawok'))
if (m.text.length > 75) return m.reply('Textnya kepanjangan.')
if (/image\/(jpe?g|png)/.test(quoted.mime)){
mecha.sendReact(m.chat, '🕒', m.key)
let media = await mecha.downloadAndSaveMediaMessage(m)
let anu = await func.UploadFileUgu(media)
let meme_url = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${anu.url}`
mecha.sendSticker(m.chat, meme_url, m, {
packname: packname, 
author: author,
expiration: m.expiration
})
} else if (/webp/.test(quoted.mime)) {
if (m.quoted.isAnimated) return m.reply('Not support gif stickers.')
mecha.sendReact(m.chat, '🕒', m.key)
let media = await mecha.downloadAndSaveMediaMessage(m)
let anu = await func.UploadFileUgu(media)
let meme_url = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${anu.url}`
mecha.sendSticker(m.chat, meme_url, m, {
packname: packname, 
author: author,
expiration: m.expiration
})
} else m.reply(`Kirim/Reply gambar dengan caption ${m.cmd} text atas | text bawah`)
},
restrict: true,
limit: 5
}