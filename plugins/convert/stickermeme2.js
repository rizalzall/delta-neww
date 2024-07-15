/** 
 * Created By SuryaDev
 * Copyright 2024 MIT License
 * My WhatsApp : wa.me/6285702691440
 * My Instagram : https://instagram.com/surya_skylark05
 * YANG HAPUS WM GW ANAK ANJING
*/

const axios = require('axios');
const FormData = require('form-data')
const { fromBuffer } = require('file-type');

const webpToImage = async (buffer) => {
try {
if (!buffer) return { status: false, message: "undefined reading buffer" };
return await new Promise(async (resolve, reject) => {
const form = new FormData();
form.append("file", buffer, {
filename: Date.now() + ".webp",
contentType: "image/webp"
});
axios.post("https://api.magicstudio.com/studio/upload/file/", form, {
headers: form.getHeaders()
}).then(res => {
const url = res.data?.url;
if (!url) reject("failed while uploading image");
axios.get("https://api.magicstudio.com/studio/tools/change-format/?image_url=" + url + "&new_format=png").then(res => {
const image = res.data?.converted_image_url;
if (!image) reject("failed while converting image");
resolve({
status: true,
url: image
})
}).catch(reject)
}).catch(reject)
});
} catch (error) {
return { status: false, message: String(error) };
}
}

const UploadFileUgu = async (inputBuffer) => {
return new Promise(async (resolve, reject) => {
const form = new FormData();
const { ext } = (await fromBuffer(inputBuffer)) || {};
form.append("files[]", inputBuffer, ext);
await axios({
url: "https://uguu.se/upload.php",
method: "POST",
headers: {
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
...form.getHeaders(),
},
data: form,
})
.then((data) => {
resolve(data.data.files[0].url);
})
.catch((err) => reject(err));
});
};

const createStickerMeme = async (url, top, bottom) => {
try {
if (!url) return { status: false, message: "undefined reading url" };
return await new Promise(async(resolve, reject) => {
axios.post("https://api.memegen.link/templates/custom", {
background: url,
text: [
top,
bottom
],
font: "impact",
redirect: true
}, {
responseType: "arraybuffer"
}).then(res => {
if (!Buffer.isBuffer(res.data)) return reject("failed while creating image");
resolve({
status: true,
buffer: res.data
})
}).catch(reject)
})
} catch (error) {
return {
status: false,
message: String(error)
};
}
}

exports.run = {
usage: ['stickermeme2'],
hidden: ['smeme2'],
use: 'text atas | bawah',
category: 'convert',
async: async (m, { func, mecha, quoted, packname, author }) => {
let atas = m.text.includes('|') ? m.text.split('|')[0] ? m.text.split('|')[0] : m.text : '-'
let bawah = m.text.includes('|') ? m.text.split('|')[1] ? m.text.split('|')[1] : '' : m.text
if (!m.text) return m.reply(func.example(m.cmd, 'beliau | awikawok'))
if (m.text.length > 75) return m.reply('Textnya kepanjangan.')
if (/image\/(jpe?g|png)/.test(quoted.mime)){
mecha.sendReact(m.chat, '🕒', m.key)
let buffer = await quoted.download()
let image_url = await UploadFileUgu(buffer)
let result = await createStickerMeme(image_url, atas, bawah)
if (!result.status) return m.reply(result.message)
mecha.sendSticker(m.chat, result.buffer, m, {
packname: packname, 
author: author,
expiration: m.expiration
})
} else if (/webp/.test(quoted.mime)) {
mecha.sendReact(m.chat, '🕒', m.key)
let buffer = await quoted.download()
let image_url;
if (m.quoted.isAnimated) {
let result = await webpToImage(buffer);
if (!result.status) return m.reply(result.message);
image_url = result.url;
} else image_url = await UploadFileUgu(buffer)
let result = await createStickerMeme(image_url, atas, bawah)
if (!result.status) return m.reply(result.message)
mecha.sendSticker(m.chat, result.buffer, m, {
packname: packname, 
author: author,
expiration: m.expiration
})
} else m.reply(`Kirim/Reply gambar dengan caption ${m.cmd} text atas | text bawah`)
},
restrict: true,
limit: 5
}