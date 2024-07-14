const axios = require('axios')

exports.run = {
usage: ['fakemedia'],
hidden: ['fm'],
use: 'text2 | text2',
category: 'convert',
async: async (m, { func, mecha, packname, author }) => {
const [text1, text2] = m.text.split('|');
if (!(text1 && !text2)) return m.reply(func.example(m.cmd, 'Assalamualaikum | Waalaikumsalam'))
if (m.text.length > 50) return m.reply('Max 50 character!')
if (!m.quoted) return m.reply(`Reply chat target dengan caption ${m.cmd} teks target | teks kamu`)
mecha.sendReact(m.chat, '🕒', m.key)
let nom = await mecha.getName(m.quoted.sender).replace(/[^0-9]/g, '')
let name = isNaN(nom) ? global.db.users[m.quoted.sender].name : mecha.getName(m.quoted.sender)
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
from: {
id: 5,
name: m.pushname,
photo: {
url: await mecha.profilePictureUrl(m.quoted ? m.quoted.sender : m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png')
}
},
text: text2,
replyMessage: {
name: name,
text: text1
}
}]
}
const res = await axios.post(global.quoteApi, obj, {headers: {'Content-Type': 'application/json'}})
const buffer = Buffer.from(res.data.result.image, 'base64')
mecha.sendSticker(m.chat, buffer, m, {
packname: packname, 
author: author, 
expiration: m.expiration
})
},
restrict: true,
limit: 5
}