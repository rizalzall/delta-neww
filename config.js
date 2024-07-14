/* module */
const fs = require('fs'), chalk = require('chalk'), path = require('path'), moment = require('moment-timezone'), idwa = '@s.whatsapp.net';

/* setting owner & bot */
global.version = require('@whiskeysockets/baileys/package.json').version;
global.baileys = require('@whiskeysockets/baileys');
global.owner = '6281333154367' + idwa // ubah jadi nomor lu
global.ownerName = '𝙿𝚎𝚗𝚍𝚎𝚔𝚊𝚛'
global.botName = 'Delta-BOT'
global.fake = 'Copyright © 2024 Delta-BOT'
global.header = `© Delta-BOT v${require('./package.json').version} (Beta)`
global.footer = 'ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ 𝙿𝚎𝚗𝚍𝚎𝚔𝚊𝚛' 
global.cooldown = 3 // jeda command tiap detik
global.max_ram = 8 // GB
global.blocks = ['91', '92', '212']; // blacklist nomor dengan kode negara tersebut
global.prefixes = /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i // gausah di ganti
// ini adalah audio yang ada di menu, bisa di ganti path juga, contoh: './media/menu.mp3'
global.audioUrl = './media/tmp.mp3' 
// ini adalah qris yang ada di plugins harga dan donate
global.qrisUrl = 'https://telegra.ph/file/918f03c67027e1fd7a3c1.jpg'
// ini adalah browser baileys
global.browser = ['Ubuntu', 'Chrome', '20.0.04']

/* setting pairing code */
global.pairing = {
status: true, // ubah false jika ingin menggunakan qr
number: '6282322133457' // ganti jadi nomor bot lu
}

/* set welcome default */
global.tekswelcome = 'Hello, +user Thank you for joining the group +group\n\nPlease intro first :\nName :\nAge :\nHome town :'
global.teksleft = 'Goodbye +user'
/* setting apikey */
global.quoteApi = 'https://bot.lyo.su/quote/generate'

/* setting message */
global.mess = {
wait: 'Processed . . .',
ok: 'Successfully.',
limit: 'Anda mencapai limit dan akan disetel ulang pada pukul 00.00\n\nUntuk mendapatkan limit unlimited, tingkatkan ke paket premium.',
premium: 'This feature only for premium user.',
jadibot: 'This feature only for jadibot user.',
owner: 'This feature is only for owners.',
group: 'This feature will only work in groups.',
private: 'Use this feature in private chat.',
admin: 'This feature only for group admin.',
botAdmin: 'This feature will work when I become an admin',
wrong: 'Wrong format!',
error: {
url: 'URL is Invalid!', 
api: 'Sorry an error occurred!'
},
block: {
owner: `This feature is being blocked by owner!`,
system: `This feature is being blocked by system because an error occurred!`
},
query: 'Enter search text',
search: 'Searching . . .',
scrap: 'Scrapping . . .',
wrongFormat: 'Incorrect format, please look at the menu again',
}

/* menghapus cache setelah update */
global.reloadFile = (file) => {
file = require.resolve(file)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright.bold('[ UPDATE ]'), chalk.whiteBright(moment(Date.now()).format('DD/MM/YY HH:mm:ss')), chalk.cyan.bold('➠ ' + path.basename(file)))
delete require.cache[file]
require(file)
})
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright("[ UPDATE ]"), chalk.whiteBright(`${__filename}`) )
delete require.cache[file]
require(file)
})