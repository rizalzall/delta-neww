const fg = require('api-dylux');

exports.run = {
usage: ['xnxx'],
hidden: ['xnxxdl'],
use: 'parameter',
category: 'downloader',
async: async (m, { func, mecha }) => {
switch (m.command) {
case 'xnxx':{
if (!m.text) return m.reply(func.example('xnxx', 'japanese'));
mecha.sendReact(m.chat, '🕒', m.key)
try {
let data = await fg.xnxxSearch(m.text);
if (data.status && data.result.length > 0) {
let body = '```Result from:```' + ' `' + m.text + '`'
let rows = []
for (let [index, result] of data.result.entries()) {
if (!result.title || !result.link) continue
rows.push({
title: `${index + 1}. ${result.title}`,
id: `${m.prefix}xnxxdl ${result.link}`
})
}
let sections = [{
title: 'PILIH XNXX DIBAWAH',
rows: rows
}]
let buttons = [
['list', 'Click Here ⎙', sections],
]
mecha.sendButton(m.chat, `X N X X - S E A R C H`, body, 'select the list button below.', buttons, m, {
userJid: m.sender,
expiration: m.expiration
})
} else {
m.reply('Tidak ada hasil yang ditemukan untuk pencarian tersebut.');
}
} catch (err) {
console.error(err);
m.reply(global.mess.error.api);
}
}
break
case 'xnxxdl':{
if (!m.text) return m.reply(func.example(m.cmd, 'https://www.xnxx.com'));
if (!func.isUrl(m.args[0]) && !m.args[0].includes('xnxx.com')) return m.reply(mess.error.url);
m.reply(global.mess.wait)
try {
let res = await fg.xnxxdl(m.args[0]);
if (res.title && res.url_dl) {
let caption = `*Title:* ${res.title}\n*Duration:* ${res.duration}\n*Quality:* ${res.quality}\n*Size:* ${res.size}\n\n> © Delta-BOT`;
await mecha.sendMessage(m.chat, {
video: {
url: res.url_dl
},
mimetype: 'video/mp4',
caption
}, {quoted: m, ephemeralExpiration: m.expiration})
} else {
m.reply(global.mess.error.api);
}
} catch (err) {
console.error(err);
m.reply(func.jsonFormat(err));
}
}
break
}
},
premium: true, // Hanya member premium yang dapat mengakses fitur ini
limit: 5
}
