exports.run = {
usage: ['removebg2'],
hidden: ['rbg2'],
use: 'reply photo',
category: 'ai',
async: async (m, { func, mecha, quoted }) => {
if (/image\/(jpe?g|png)/.test(quoted.mime)) {
mecha.sendReact(m.chat, '🕒', m.key)
let media = await mecha.downloadAndSaveMediaMessage(m)
let anu = await func.UploadFileUgu(media);
await func.fetchJson(`https://aemt.me/removebg?url=${anu.url}`).then(async res => {
if (!res.url.status) return m.reply(global.mess.error.api)
await mecha.sendMessage(m.chat, {image: {url: res.url.result}, caption: global.mess.ok}, {quoted: m, ephemeralExpiration: m.expiration})
})
} else m.reply(`Kirim/Reply gambar dengan caption ${m.cmd}`)
},
premium: true,
limit: 3
}