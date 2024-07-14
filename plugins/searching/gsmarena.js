exports.run = {
usage: ['gsmsearch'],
hidden: ['gsmdetail'],
use: 'query',
category: 'searching',
async: async (m, { func, mecha }) => {
switch (m.command) {
case 'gsmsearch':{
if (!m.text) return m.reply(func.example(m.cmd, 'Redmi 9'));
mecha.sendReact(m.chat, '⏱️', m.key)
try {
let res = await func.fetchJson(`https://skizo.tech/api/gsmsearch?apikey=zallzall&search=${encodeURIComponent(m.text)}`);
if (res.status && res.data.length > 0) {

let body = '```Result from:```' + ' `' + m.text + '`'
let rows = []
for (let [index, data] of res.data.entries()) {
if (!data.judul || !data.link) continue
rows.push({
title: `${index + 1}. ${data.judul}`,
id: `${m.prefix}gsmdetail ${data.link}`
})
}
let sections = [{
title: 'Hasil Pencarian',
rows: rows
}]
let buttons = [
['list', 'Click Here ⎙', sections],
]
mecha.sendButton(m.chat, `G S M - S E A R C H`, body, 'select the list button below.', buttons, m, {
userJid: m.sender,
expiration: m.expiration
})
} else {
m.reply('Tidak ada hasil yang ditemukan untuk pencarian tersebut.');
}
} catch (err) {
console.error(err);
m.reply(`Terjadi kesalahan: ${err}`);
}
}
break
case 'gsmdetail': {
    if (!m.text) return m.reply(func.example(m.cmd, 'https://m.gsmarena.com/'));
    mecha.sendReact(m.chat, '🔍', m.key);
    try {
        let data = await func.fetchJson(`https://skizo.tech/api/gsmdetails?url=${encodeURIComponent(m.text)}&apikey=zallzall`);
        
        if (!data) return m.reply('Data tidak ditemukan!'); // Jika data tidak ditemukan, balas dengan pesan error
        
        // Fungsi untuk membentuk string dari objek JSON
        const formatData = (obj) => {
            return Object.entries(obj).map(([key, value]) => {
                let formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return `- ${formattedKey}: ${value}`;
            }).join('\n');
        };
        
        // Mengirim pesan dengan informasi dari API
        mecha.sendMessage(m.chat, {
            text: formatData(data)
        }, { quoted: m, ephemeralExpiration: m.expiration });
    } catch (err) {
        console.error(err);
        m.reply(func.jsonFormat(err));
    }
}
break;
}
},
premium: false, // Hanya member premium yang dapat mengakses fitur ini
limit: 2
}