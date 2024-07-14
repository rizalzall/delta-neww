exports.run = {
usage: ['petpet', 'darkness', 'facepalm', 'invert', 'pixelate', 'triggered2'],
category: 'canvas',
use: 'reply photo',
async: async (m, { func, mecha, quoted, setting }) => {
if (/image\/(jpe?g|png)/.test(quoted.mime)) {
mecha.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });
try {
let media = await mecha.downloadAndSaveMediaMessage(m);
let anu = await func.UploadFileUgu(media);
let foto;
if (m.command === 'petpet') {
foto = `https://api.erdwpe.com/api/maker/pet?url=${anu.url}`;
} else if (m.command === 'darkness') {
foto = `https://api.erdwpe.com/api/maker/darkness?url=${anu.url}&no=50`;
} else if (m.command === 'triggered2') {
foto = `https://api.erdwpe.com/api/maker/triggered?url=${anu.url}`;
} else if (m.command === 'facepalm') {
foto = `https://api.erdwpe.com/api/maker/facepalm?url=${anu.url}`;
} else if (m.command === 'invert') {
foto = `https://api.erdwpe.com/api/maker/invert?url=${anu.url}`;
} else if (m.command === 'pixelate') {
foto = `https://api.erdwpe.com/api/maker/pixelate?url=${anu.url}`;
} else {
return m.reply('Perintah tidak valid.');
}

await mecha.sendMedia(m.chat, foto, m, {
caption: global.mess.ok, 
expiration: m.expiration
});
mecha.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
} catch (e) {
console.error(e);
await mecha.sendMessage(m.chat, { text: `───「 *SYSTEM ERROR* 」───\n\nTerjadi kesalahan: ${e.message}`, quoted: m });
}
} else {
m.reply('Mohon kirim gambar dengan format jpg atau png.');
}
},
premium: false,
limit: 2
};