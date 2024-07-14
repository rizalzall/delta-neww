const database = new (require('../../system/database'))('database')

exports.run = {
main: async (m, { func, mecha, users, groups, setting }) => {
let sayang = ['ayang', 'sayang', 'ayank', 'sayank']
let loveyou = ['i love you', 'love you', 'lope you']
let salam = ['assalamualaikum', 'assalamu\'alaikum']
let pe = ['pe', 'p', 'pp', 'ppp']
let pagi = ['pagi', 'ohayou', 'selamat pagi', 'good morning']
let malam = ['malam', 'selamat malam', 'good night']
let halo = ['halo', 'hallo', 'hola', 'haloo'];

const sendAudio = (audio) => {
return mecha.sendMessage(m.chat, {
audio: {
url: audio
},
mimetype: 'audio/mpeg',
ptt: true
}, {quoted: m, ephemeralExpiration: m.expiration})
}

// respon ketika ada yang ucap salam
if (func.somematch(salam, m.budy?.toLowerCase()) && !m.fromMe) {
//mecha.sendMessage(m.chat, {text: 'Waalaikumsalam'}, {quoted: m, ephemeralExpiration: m.expiration})
await sendAudio('https://cdn.filestackcontent.com/FzTg0fEaTLSPnWaM7bKC')
}

// respon ketika ada yang bilang sayang
if (func.somematch(sayang, m.budy?.toLowerCase()) && !m.fromMe && (m.isPc || (m.isGc && !groups.mute))) {
if (m.sender.includes(global.owner)) {
await sendAudio('https://cdn.filestackcontent.com/NdoLW6RfSZpDjmAc08xA')
} else await sendAudio('https://cdn.filestackcontent.com/2oyCBD0TAmKlq0P9wBzx')
}

// respon ketika ada yang ketik p
if (func.somematch(pe, m.budy?.toLowerCase()) && !m.fromMe && (m.isPc || (m.isGc && !groups.mute))) {
let audio = ['https://cdn.filestackcontent.com/eVpfBqaStygEPZmtgvhQ', 'https://cdn.filestackcontent.com/97s0ibVdQyqRttCiPjaA', 'https://cdn.filestackcontent.com/ZX5yb9y3SQeeEK5TMKV3', 'https://cdn.filestackcontent.com/5AZlnRyMQe7jHNzA6smY'].random()
await sendAudio(audio)
}

// respon ketika ada yang ketik selamat pagi
if (func.somematch(pagi, m.budy?.toLowerCase()) && !m.fromMe && (m.isPc || (m.isGc && !groups.mute))) {
let audio = ['https://cdn.filestackcontent.com/IZIgCgyRrWK2ul8MIhhx', 'https://cdn.filestackcontent.com/6eZ8D3abTHeSxMBOHV9C'].random()
await sendAudio(audio)
}

// respon ketika ada yang ketik malam
if (func.somematch(malam, m.budy?.toLowerCase()) && !m.fromMe && (m.isPc || (m.isGc && !groups.mute))) {
let audio = ['https://cdn.filestackcontent.com/q5cTb52vR8u3B65c3PPM', 'https://cdn.filestackcontent.com/sKbCPFPqQG6sEXG6d0gY'].random()
await sendAudio(audio)
}

// respon ketika ada yang bilang love you
if (func.somematch(loveyou, m.budy?.toLowerCase()) && !m.fromMe && (m.isPc || (m.isGc && !groups.mute))) {
if (m.sender.includes(global.owner)) {
await sendAudio('https://cdn.filestackcontent.com/rBSs93uSS6MpW9FEJuIE')
} else await sendAudio('https://cdn.filestackcontent.com/3LtAMGXeRQiB9TGrmqB0')
}

// respon ketika ada yang bilang halo
if (func.somematch(halo, m.budy?.toLowerCase()) && !m.fromMe && (m.isPc || (m.isGc && !groups.mute))) {
let messageId = 'MECHA' + func.makeid(8).toUpperCase() + 'GPT'
return mecha.sendMessage(m.chat, {audio: {url: 'https://cdn.filestackcontent.com/jFCW1oeXR2O85DDjaIjc'}, mimetype: 'audio/mpeg', ptt: true}, {quoted: m, ephemeralExpiration: m.expiration, messageId: messageId})
//mecha.sendMessage(m.chat, {text: `Halo ${m.pushname} 👋🏻\nAda yang bisa mecha bantu?`, mentions: [m.sender]}, {quoted: m, ephemeralExpiration: m.expiration, messageId: messageId});
}

/* ANTI TOXIC KEPADA BOT BY SURYA */
if (users && !users.banned && !users.premium && !m.isOwner) {
function warning () {
users.warning += 1
let warning = users.warning
if (warning >= 3) return m.reply(`Anda melanggar *Syarat & Ketentuan* penggunaan bot dengan menggunakan kata kunci yang masuk daftar hitam, sebagai hukuman atas pelanggaran Anda diblokir dan dibanned. Untuk membuka blokir dan unbanned Anda harus membayar *Rp. 10.000,-*`).then(() => {
users.banned = true
users.expired.banned = 'PERMANENT'
mecha.updateBlockStatus(m.sender, 'block')
})
return m.reply(`乂  *W A R N I N G* \n\nAnda Mendapat Peringatan : [ ${warning} / 3 ]\n\nJika Anda mendapatkan 3 peringatan, Anda akan otomatis diblokir dan dibanned oleh system.`)
}
if (m.isGc && m.budy && (new RegExp('\\b' + setting.toxic.map(v => 'bot ' + v).join('\\b|\\b') + '\\b')).test(m.budy?.toLowerCase())) return warning()
if (m.isPc) {
let array = m.budy.toLowerCase().split(' ');
let status = func.removeDuplicateLetters(array).map(words => setting.toxic.some(badword => badword == words)).filter(state => state);
if (status.length > 0) return warning()
}
}

/* respon ketika ada yang ketik bot */
if (m.budy && m.budy.toLowerCase() === 'bot') {
if (m.isGc && groups.mute && !m.isOwner) return;
if (users && users.banned && !m.isOwner) return;
let old = new Date()
let messageId = 'MECHA' + func.makeid(8).toUpperCase() + 'GPT'
let txt = await mecha.sendMessage(m.chat, {text: 'Iyaaa'}, {quoted: m, ephemeralExpiration: m.expiration, messageId: messageId})
let prefix = (setting.multiprefix ? 'multi prefix' : `( ${func.texted('monospace', m.prefix)} )`)
let runtime = func.runtime(process.uptime())
let speed = ((new Date - old) * 1)
let arr = [
{ text: 'Apaaa', timeout: 150 },
{ text: 'Sayanggg?', timeout: 150 },
{ text: `*Prefix :* ${prefix}`, timeout: 150 },
{ text: `*Runtime :* ${runtime}`, timeout: 150 },
{ text: `*Response Speed :* ${speed}ms`, timeout: 150 }
];
for (let i = 0; i < arr.length; i++) {
await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
await mecha.relayMessage(m.chat, {
protocolMessage: {
key: txt.key,
type: 14,
editedMessage: {
conversation: arr[i].text
}
}}, {quoted: m, ephemeralExpiration: m.expiration});
}
if (speed >= 1000) {
await mecha.sendMessage(m.chat, {text: `Bot telah mengalami delay ${speed}ms, sistem me-restart bot secara otomatis.`}, {ephemeralExpiration: m.expiration}).then(async () => {
await database.save(global.db);
if (!process.send) return
process.send('reset');
});
}
}

setInterval(async () => {
let seconds = Number(process.uptime());
let menit = Math.floor(seconds / 60);
if (menit >= 180) {
await database.save(global.db);
if (!process.send) return
process.send('reset');
}
}, 5 * 1000)

/* respon ketika ada yang mengirim group invite */
if ((m.mtype === 'groupInviteMessage' || ['Undangan untuk bergabung', 'Invitation to join', 'Buka tautan ini', 'chat.whatsapp.com'].includes(m.budy)) && !setting.link.includes(m.budy) && !m.isGc && !m.fromMe && !m.isOwner) {
let invite = `Halo, sepertinya Anda ingin mengundang bot ke grup Anda.
    
◦ 15 day - Rp 10k
◦ 30 day - Rp 20k
◦ 60 day - Rp 35k
◦ 90 day - Rp 50k

Jika berminat hubungi: wa.me/${global.owner.replace(/[^0-9]/g, '')} untuk order :)`
return mecha.sendMessageModify(m.chat, invite, m, {
largeThumb: true,
thumbnail: await mecha.resize('https://telegra.ph/file/0b32e0a0bb3b81fef9838.jpg', 300, 175),
url: `https://wa.me/${global.owner.replace(/[^0-9]/g, '')}?text=sewa+bot`
})
}

}
}