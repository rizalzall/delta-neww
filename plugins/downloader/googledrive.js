const fetch = require('node-fetch')
const { sizeFormatter } = require('human-readable')
let formatSize = sizeFormatter({
	std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
})

exports.run = {
usage: ['googledrive'],
hidden: ['gdrive'],
use: 'link google drive',
category: 'downloader',
async: async (m, { func, mecha, setting }) => {
if (!m.text) return m.reply('Masukkan link google drive yang ingin di download.')
if (!func.isUrl(m.args[0]) && !m.args[0].includes('drive.google.com')) return m.reply(global.mess.error.url)
let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration });
GDriveDl(m.args[0]).then(async (res) => {
		if (!res) throw res
await mecha.sendMessage(m.chat, { text: JSON.stringify(res, null, 2), edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
await mecha.sendMedia(m.chat, res.downloadUrl, m, { caption: global.mess.ok, fileName: res.fileName })
}).catch((e) => m.reply('Bot tidak memiliki akses ke GoogleDrive tersebut.'))
},
limit: 5
}

async function GDriveDl(url) {
	let id
	if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL'
	id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
	if (!id) throw 'ID Not Found'
	let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
		method: 'post',
		headers: {
			'accept-encoding': 'gzip, deflate, br',
			'content-length': 0,
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'origin': 'https://drive.google.com',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
			'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
			'x-drive-first-party': 'DriveWebUi',
			'x-json-requested': 'true' 
		}
	})
	let { fileName, sizeBytes, downloadUrl } =  JSON.parse((await res.text()).slice(4))
	if (!downloadUrl) throw 'Link Download Limit!'
	let data = await fetch(downloadUrl)
	if (data.status !== 200) throw data.statusText
	return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
}
