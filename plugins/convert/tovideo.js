const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { fromBuffer } = require('file-type');

function toMedia(bufferIn, func, isAnimated) {
return new Promise(async (resolve, reject) => {
let extension = (await fromBuffer(bufferIn)).ext
// if (!/webp/i.test(extension)) return reject("Hanya bisa webp")
let png = path.join(process.cwd(), 'sampah', func.filename('png'))
let webp = path.join(process.cwd(), 'sampah', func.filename('webp'))
let mp4 = path.join(process.cwd(), 'sampah', func.filename('mp4'))
let gif = path.join(process.cwd(), 'sampah', func.filename('gif'))
await fs.writeFileSync(webp, bufferIn)
if (isAnimated) {
await exec(`convert ${webp} ${gif}`, async (err) => {
if (err) {
await fs.unlinkSync(webp)
return reject(err);
}
await exec(`ffmpeg -i ${gif} -pix_fmt yuv420p -c:v libx264 -movflags +faststart -filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2' ${mp4}`, async (err) => {
if (err) {
await fs.unlinkSync(webp)
await fs.unlinkSync(gif)
return reject(err);
}
let buff = await fs.readFileSync(mp4);
await fs.unlinkSync(webp);
await fs.unlinkSync(gif);
await fs.unlinkSync(mp4);
resolve({ buffer: buff, isVideo: true });
});
});
} else if (!isAnimated) {
await exec(`ffmpeg -i ${webp} ${png}`, async (err) => {
if (err) {
await fs.unlinkSync(webp)
return reject(err)
}
let buff = await fs.readFileSync(png);
await fs.unlinkSync(webp);
await fs.unlinkSync(png);
resolve({ buffer: buff, isVideo: false });
});
}
})
}

exports.run = {
usage: ['tovideo'],
hidden: ['tomp4'],
use: 'reply sticker',
category: 'convert',
async: async (m, { func, mecha, quoted }) => {
if (!global.support.convert && !global.support.magick && !global.support.gm) return m.reply('This feature does not work because imagemagick is not installed.')
if (/webp/.test(quoted.mime)){
m.reply(global.mess.wait)
let media = await quoted.download()
let conv = await toMedia(media, func, quoted.isAnimated);
await mecha.sendMessage(m.chat, {video: conv.buffer, caption: 'Convert Webp To Video'}, {quoted: m, ephemeralExpiration: m.expiration})
} else m.reply(`Reply sticker nya dengan caption ${m.cmd}`)
},
limit: true
}