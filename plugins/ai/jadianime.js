exports.run = {
usage: ['jadianime'],
hidden: ['toanime'],
use: 'reply photo',
category: 'ai',
async: async (m, { func, mecha, quoted }) => {
if (/image\/(jpe?g|png)/.test(quoted.mime)) {
m.reply(global.mess.wait)
try {
let media = await mecha.downloadAndSaveMediaMessage(m)
let anu = await func.telegraPh(media);
let foto = `https://skizo.tech/api/toanime?apikey=zallzall&url=${anu.url}`;
await mecha.sendMessage(m.chat, {image: { url: foto }, caption: global.mess.ok}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (e) {
return m.reply(String(e));
}
} else m.reply(`Kirim/Reply foto dengan caption ${m.cmd}`)
},
premium: true,
limit: 5
}
