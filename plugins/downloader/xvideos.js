const fg = require('api-dylux');

exports.run = {
usage: ['xvideos', 'xvideosdl'],
use: 'parameter',
category: 'downloader',
async: async (m, { func, mecha }) => {
switch (m.command) {
case 'xvideos':{
if (!m.text) return m.reply(func.example('xvideos', 'japanese'));
mecha.sendReact(m.chat, '🕒', m.key)
try {
let data = await fg.xvideosSearch(m.text);
if (data.length > 0) {
let body = '```Result from:```' + ' `' + m.text + '`'
let rows = []
for (let [index, item] of data.entries()) {
if (!item.title || !item.url) continue
rows.push({
title: `${index + 1}. ${item.title}`,
id: `${m.prefix}xvideosdl ${item.url}`
})
}
let sections = [{
title: 'PILIH XVIDEOS DIBAWAH',
rows: rows
}]
let buttons = [
['list', 'Click Here ⎙', sections],
]
mecha.sendButton(m.chat, `X V I D E O S - S E A R C H`, body, 'select the list button below.', buttons, m, {
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
case 'xvideosdl':{
if (!m.text) return m.reply(func.example(m.cmd, 'https://www.xvideos.com'));
if (!func.isUrl(m.args[0]) && !m.args[0].includes('xvideos.com')) return m.reply(mess.error.url);
mecha.sendReact(m.chat, '🕒', m.key)
try {
let res = await fg.xvideosdl(m.args[0]);
if (res.title && res.url_dl) {
let caption = `*Title:* ${res.title}\n*Views:* ${res.views}\n*Votes:* ${res.vote}\n*Likes:* ${res.likes}\n*Dislikes:* ${res.deslikes}\n*Size:* ${res.size}\n\n> © Delta-BOT`;
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
