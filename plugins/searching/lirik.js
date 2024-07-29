exports.run = {
usage: ['lirik'],
hidden: ['readtrack'],
use: 'parameter',
category: 'searching',
async: async (m, { func, mecha }) => {
switch (m.command) {
case 'lirik':{
if (!m.text) return m.reply(func.example(m.cmd, 'melukis senja'));
mecha.sendReact(m.chat, '🕒', m.key)
try {
let res = await func.fetchJson(`https://skizo.tech/api/musiksearch?apikey=zallzall&search=${encodeURIComponent(m.text)}`);
if (res.header.status_code && res.body.track_list.length > 0) {

let body = '```Result from:```' + ' `' + m.text + '`'
let rows = []
for (let [index, data] of res.body.track_list.entries()) {
if (!data.track_name || !data.track_id) continue
rows.push({
title: `${index + 1}. ${data.track_name}`,
id: `${m.prefix}readtrack ${data.track_id}`,
description: `- Artis : ${data.artis_name}`
})
}
let sections = [{
title: 'Hasil Pencarian',
rows: rows
}]
let buttons = [
['list', 'Click Here ', sections],
]
mecha.sendButton(m.chat, `L I R I K - S E A R C H`, body, 'select the list button below.', buttons, m, {
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
case 'readtrack':{
if (!m.text) return m.reply(func.example(m.cmd, 'https://skizo.tech/read-track?'));
mecha.sendReact(m.chat, '🕒', m.key)
try {
let data = await func.fetchJson(`https://skizo.tech/api/read-track?id=${m.text}&apikey=zallzall`) // Mengambil data dari API
        if (data.header.status_code !== 200) return m.reply('Lirik tidak ditemukan!') // Jika status tidak berhasil, balas dengan pesan error
        let result = data.body; // Mendapatkan hasil dari data
        let track = data.matcher_track.body;
        let txt = `- Title: ${track.track_name}
- Lyrics ID: ${result.lyrics_id}
- Verified: ${result.lyrics_verified ? 'Yes' : 'No'}
- Language: ${result.lyrics_language} (${result.lyrics_language_description})
- Copyright: ${result.lyrics_copyright}
- URL: ${result.backlink_url}
- Lyrics:\n\n${result.lyrics_body}` // Membuat teks yang akan dikirim
        mecha.sendMessage(m.chat, {
            text: txt
        }, { quoted: m, ephemeralExpiration: m.expiration })
} catch (err) {
console.error(err);
m.reply(func.jsonFormat(err));
}
}
break
}
},
premium: false, // Hanya member premium yang dapat mengakses fitur ini
limit: 2
}
