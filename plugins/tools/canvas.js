exports.run = {
usage: ['wanted', 'wasted', 'trash', 'circle', 'jail', 'rainbow', 'beautiful', 'blur', 'burn', 'brightness'],
use: ['reply photo'],
category: 'canvas',
async: async (m, { func, mecha, command, mime, quoted }) => {
if (/image\/(jpe?g|png)/.test(mime)) {
m.reply(global.mess.wait)
let media = await mecha.downloadAndSaveMediaMessage(quoted)
let media_url = (await func.telegraPh(media)).url
let canvas
if (/wanted/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/wanted?url=${media_url}`
if (/wasted/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/wasted?url=${media_url}`
if (/trash/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/trash?url=${media_url}`
if (/circle/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/circle?url=${media_url}`
if (/jail/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/jail?url=${media_url}`
if (/rainbow/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/rainbow?url=${media_url}`
if (/beautiful/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/beautiful?url=${media_url}`
if (/blur/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/blur?url=${media_url}`
if (/burn/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/burn?url=${media_url}`
if (/brightness/.test(command)) canvas = `https://api.dhamzxploit.my.id/api/canvas/brightness?url=${media_url}`
mecha.sendMessage(m.chat, {image: {url: canvas}, caption: mess.ok}, {quoted: m, ephemeralExpiration: m.expiration})
} else m.reply(`Send or Reply photo with caption ${m.prefix + command}`)
},
limit: 3
}