const axios = require('axios')

exports.run = {
usage: ['fakemedia2'],
hidden: ['fm2'],
use: 'text',
category: 'convert',
async: async (m, { func, mecha, quoted, packname, author }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'surya sayang wulan'))
if (m.text.length > 50) return m.reply('Max 50 character!')
if (/image\/(jpe?g|png)/.test(quoted.mime)) {
mecha.sendReact(m.chat, '🕒', m.key)
let media = await mecha.downloadAndSaveMediaMessage(m)
let url = (await func.telegraPh(media)).url
const obj = {
type: "quote",
format: "png",
backgroundColor: "#CCFFFF",
width: 512,
height: 768,
scale: 2,
messages: [{
entities: [],
avatar: true,
media: {
url: url
},
from: {
id: 5,
name: m.pushname,
photo: {
url: await mecha.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png')
}
},
text: m.text,
replyMessage: {}
}]
}
let res = await axios.post(global.quoteApi, obj, {
headers: {'Content-Type': 'application/json'}
})
const buffer = Buffer.from(res.data.result.image, 'base64')
mecha.sendSticker(m.chat, buffer, m, {
packname: packname, 
author: author, 
expiration: m.expiration
})
} else m.reply(`Kirim/Reply gambar dengan caption ${m.cmd} text`)
},
restrict: true,
limit: 5
}