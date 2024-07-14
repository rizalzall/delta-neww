const axios = require('axios')

exports.run = {
usage: ['texttovoice'],
hidden: ['ttv'],
use: 'text',
category: 'convert',
async: async (m, { func, mecha, comand }) => {
if (!m.text) return m.reply(func.example(comand, 'halo'))
let teks = encodeURIComponent(m.text)
let { data } = await axios.get(`https://api.akuari.my.id/texttovoice/texttosound_id?query=${teks}`);
mecha.sendMessage(m.chat, { audio: await func.getBuffer(data.result), mimetype: 'audio/mp4' }, {quoted: m, ephemeralExpiration: m.expiration});
},
limit: true
}