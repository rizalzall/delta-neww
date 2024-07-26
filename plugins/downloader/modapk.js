exports.run = {
usage: ['modsearch'],
hidden: ['modapk'],
use: 'parameter',
category: 'downloader',
async: async (m, { func, mecha }) => {
switch (m.command) {
case 'modsearch':{
if (!m.text) return m.reply(func.example('modsearch', 'pou'));
mecha.sendReact(m.chat, '⏱️', m.key)
try {
let res = await func.fetchJson(`https://api.neoxr.eu/api/an1?q=${encodeURIComponent(m.text)}`);
if (res.status && res.data.length > 0) {

let body = '```Result from:```' + ' `' + m.text + '`'
let rows = []
for (let [index, data] of res.data.entries()) {
if (!data.name || !data.url) continue
rows.push({
title: `${index + 1}. ${data.name}`,
id: `${m.prefix}modapk ${data.url}`,
description: `- Developer : ${data.developer}\n- Rating : ${data.rating}`
})
}
let sections = [{
title: 'Hasil Pencarian',
rows: rows
}]
let buttons = [
['list', 'Click Here ⎙', sections],
]
mecha.sendButton(m.chat, `M O D - S E A R C H`, body, 'select the list button below.', buttons, m, {
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
case 'modapk':{
if (!m.text) return m.reply(func.example(m.cmd, 'https://an1.com'));
if (!func.isUrl(m.args[0]) && !m.args[0].includes('an1.com/')) return m.reply(mess.error.url);
m.reply(global.mess.wait)
try {
let res = await func.fetchJson(`https://api.neoxr.eu/api/an1-get?url=${m.args[0]}`)
	
if (res.data.name && res.data.url) {
let caption = `Version: ${res.data.version}\nSize: ${res.data.size}\nRating: ${res.data.rating}\nPublished: ${res.data.published}\nInstalled: ${res.data.installed}\nRated: ${res.data.rated}\n\nDescription: ${res.data.description}\n\n© Delta-BOT`;
await mecha.sendMessage(m.chat, {
document: {
url: res.data.url
},
fileName: `${res.data.name}.apk`,
mimetype: 'application/vnd.android.package-archive',
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
