const fetch = require('node-fetch')

async function cobalt(url) {
return new Promise(async (resolve, reject) => {
try {
const BASE_URL = "https://cobalt.tools";
const BASE_API = "https://api.cobalt.tools/api";
await fetch(BASE_API + "/json", {
method: "OPTIONS",
headers: {
"access-control-request-method": "POST",
"access-control-request-headers": "content-type",
"user-agent":
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
origin: BASE_URL,
referer: BASE_URL,
},
}).then(async (v) => {
const res = await fetch(BASE_API + "/json", {
method: "POST",
headers: {
origin: BASE_URL,
referer: BASE_URL,
"user-agent": BASE_URL,
"content-type": "application/json",
accept: "application/json",
},
body: JSON.stringify({
url: url,
filenamePattern: "basic",
}),
}).then((v) => v.json());

const stream = await fetch(res.url);
if (!stream.ok) return reject("Download Failed!");
return resolve(stream.url);
});
} catch (e) {
reject(e);
}
});
}

exports.run = {
usage: ['cobalt'],
hidden: ['download'],
use: 'link',
category: 'downloader',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'https://youtube.com/watch?v=T2Bu56uZtlM'))
await cobalt(m.text).then(result => {
mecha.sendMedia(m.chat, result, m, {
expiration: m.expiration
})
}).catch(error => m.reply(String(error)))
},
limit: true
}