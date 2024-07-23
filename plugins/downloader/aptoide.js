const { 
search,
download
} = require('aptoide-scraper');

exports.run = {
usage: ['aptoide', 'aptoidedl'],
use: 'parameter',
category: 'downloader',
async: async (m, { func, mecha }) => {
switch (m.command) {
case 'aptoide':{
if (!m.text) return m.reply(func.example(m.cmd, 'pou'));
mecha.sendReact(m.chat, '🕒', m.key)
try {
let res = await search(m.text);
if (res.length > 0) {

let body = '```Result from:```' + ' `' + m.text + '`'
let rows = [];
for (let [index, data] of res.entries()) {
if (!data.name || !data.id) continue
rows.push({
title: `${index + 1}. ${data.name}`,
id: `${m.prefix}aptoidedl ${data.id}`
})
}
let sections = [{
title: 'Hasil Pencarian',
rows: rows
}]
let buttons = [
['list', 'Click Here ⎙', sections],
]
mecha.sendButton(m.chat, `A P T O I D E - S E A R C H`, body, 'select the list button below.', buttons, m, {
userJid: m.sender,
expiration: m.expiration
})
} else {
m.reply('Tidak ada hasil yang ditemukan untuk pencarian tersebut.');
}
} catch (err) {
console.error(err);
m.reply(`Terjadi Kesalahan: ${err}`)
mecha.sendReact(m.chat, '☑️', m.key)
}
}
break
case 'aptoidedl':{
if (!m.text) return m.reply(func.example(m.cmd, 'com.sas.whatswebpro'));
m.reply(global.mess.wait)
try {
let res = await download(m.args[0])
	
if (res.name && res.dllink) {
let caption = `Lastup: ${res.lastup}\nSize: ${res.size}\nPackage: ${res.package}\n\n> © Delta-BOT`;
await mecha.sendMessage(m.chat, {
document: {
url: res.dllink
},
fileName: `${res.name}.apk`,
mimetype: 'application/zip',
caption
}, {quoted: m, ephemeralExpiration: m.expiration})
} else {
m.reply('Tidak ada hasil yang ditemukan untuk aplikasi tersebut.');
}
} catch (err) {
console.error(err);
m.reply(`Terjadi Kesalahan: ${err}`)
}
}
break
}
},
premium: true, // Hanya member premium yang dapat mengakses fitur ini
limit: 5
}
