const axios = require('axios')

exports.run = {
usage: ['fumi'],
hidden: ['fumiai'],
use: 'question',
category: 'ai',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'halo'))

async function fumi (message) {
const res = await axios.post('https://ai.fumifumi.xyz/api/post/ajax', { query: message })
return res.data.data.result
}

const { key } = await mecha.sendMessage(m.chat, {text: global.mess.ok}, {quoted: m, ephemeralExpiration: m.expiration})
try {
var jawab = await fumi(m.text)
await mecha.sendMessage(m.chat, {text: jawab, edit: key}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (err) {
console.error(err)
return await mecha.sendMessage(m.chat, {text: 'Terjadi kesalahan dalam menjawab pertanyaan', edit: key}, {quoted: m, ephemeralExpiration: m.expiration})
}
},
limit: true
}
