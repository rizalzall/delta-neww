exports.run = {
main: async (m, { func, mecha, groups, setting, isPrem }) => {
if (m.budy && groups.antitoxic && !m.isAdmin && !isPrem && !m.isPrefix) {
let txt = func.pickRandom([
'عَنْ أَبِي الدَّرْدَاءِ، أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: إِنَّ اللَّهَ لَيُبْغِضُ الفَاحِشَ البَذِيءَ\n\nDari Abu Ad-Darda’ radhiallahu ‘anhu bahwasanya Rasulullah ﷺ bersabda, “Sungguh Allah benci dengan orang yang lisannya kotor dan kasar.”', 
'لَا يُحِبُّ اللَّهُ الْجَهْرَ بِالسُّوءِ مِنَ الْقَوْلِ إِلَّا مَنْ ظُلِمَ ۚ وَكَانَ اللَّهُ سَمِيعًا عَلِيمًا\nArtinya :\nAllah tidak menyukai ucapan buruk di depan umum kecuali oleh orang yang tertindas, Dan Allah Maha Mendengar lagi Maha Mengetahui. (QS. An-Nisa : 148)', 
'Allah tidak menyukai ucapan buruk, (yang diucapkan) dengan terus terang kecuali oleh orang yang dianiaya. Allah adalah Maha Mendengar lagi Maha Mengetahui.'
])
let member = groups.member.find(v => v.jid == m.sender);
// memisahkan kata dalam kalimat
let array = m.budy.toLowerCase().split(' ');
// memfilter kata kasar pada array kata
let status = func.removeDuplicateLetters(array).map(words => setting.toxic.some(badword => badword == words)).filter(state => state);

if (status.length > 0) {
member.toxic += 1
if (member.toxic >= setting.ctoxic) return mecha.sendteks(m.chat, `乂  *A N T I  T O X I C*\n\n*Toxic : (${member.toxic}/${setting.ctoxic}), selamat tinggal ~~*`, m).then(async () => {
await mecha.groupParticipantsUpdate(m.chat, [m.sender], 'remove').then(async () => {
await mecha.sendMessage(m.chat, {
delete: {
remoteJid: m.chat, 
fromMe: false, 
id: m.key.id, 
participant: m.sender
}
});
});
});
return await mecha.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.sender}})
.then(() => {
mecha.sendMessage(m.chat, {
text: txt, 
contextInfo: {
externalAdReply: {
title: `ᴊᴀɴɢᴀɴ ᴛᴏxɪᴄ (${member.toxic}/${setting.ctoxic})`, 
body: '𝑎𝑏𝑎𝑖𝑘𝑎𝑛 𝑗𝑖𝑘𝑎 𝑘𝑎𝑚𝑢 𝑛𝑜𝑛 𝑚𝑢𝑠𝑙𝑖𝑚.', 
mediaType: 1, 
previewType: 'PHOTO', 
thumbnailUrl: setting.cover, 
sourceUrl: null
}
}
}, {quoted: m, ephemeralExpiration: m.expiration})
})
}
}
},
group: true,
botAdmin: true
}