const axios = require('axios');

exports.run = {
usage: ['bingimg'],
hidden: ['bingcreate'],
use: 'text',
category: 'ai',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(`Masukan Query Text`)
m.reply(global.mess.wait)
let old = new Date()
let response = await axios.get(`https://aemt.me/bingimg?text=${m.text}`)
let result = response.data.result
mecha.sendMessage(m.chat, {image: {url: result}, caption: `Fetching ${((new Date - old) * 1)} ms` }, {quoted: m, ephemeralExpiration: m.expiration})
},
limit: 5
}