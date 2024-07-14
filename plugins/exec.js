const fs = require('fs'),
chalk = require('chalk'),
util = require('util'),
path = require('path'),
crypto = require('crypto'),
moment = require('moment-timezone'),
phonenumber = require('awesome-phonenumber'),
b = global.baileys,
toMs = require('ms'),
ytdl = require('ytdl-core'),
axios = require('axios'),
cheerio = require('cheerio'),
request = require('request'),
ms = require('parse-ms'),
fetch = require('node-fetch');
const { exec } = require('child_process');

exports.run = {
main: async (m, { func, mecha, plugins, update, store, users, groups, setting, week, time, calender, listblock, isBlock, packname, author, isBanned, isPrem, quoted, mime, froms, fpayment, fkon, errorMessage, downloadMp3 }) => {
if (m.budy) {
// EVAL & EXEC CODE
if (m.command === '>') {
if (!m.text) return
try {
let evaled = await eval(m.text)
if (typeof evaled !== 'string') evaled = util.inspect(evaled)
mecha.sendMessage(m.chat, {text: util.format(evaled)}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (e) {
mecha.sendMessage(m.chat, {text: util.format(e)}, {quoted: m, ephemeralExpiration: m.expiration})
}
} else if (m.command === '>_') {
if (!m.text) return
try {
const evaling = await eval(`;(async () => { ${m.text} })();`);
return mecha.sendMessage(m.chat, {text: util.format(evaling)}, {quoted: m, ephemeralExpiration: m.expiration});
} catch (e) {
return mecha.sendMessage(m.chat, {text: util.format(e)}, {quoted: m, ephemeralExpiration: m.expiration});
}
} else if (m.command === '=>') {
if (!m.text) return 
try {
let evaled = await eval(`(async () => { return ${m.text} })()`)
mecha.sendMessage(m.chat, {text: util.format(evaled)}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (e) {
mecha.sendMessage(m.chat, {text: util.format(e)}, {quoted: m, ephemeralExpiration: m.expiration})
}
} else if (m.command === '$') {
if (!m.text) return
mecha.sendReact(m.chat, '🕒', m.key)
exec(m.text, (err, stdout) => {
if (err) return mecha.sendMessage(m.chat, {text: err.toString()}, {quoted: m, ephemeralExpiration: m.expiration})
if (stdout) return mecha.sendMessage(m.chat, {text: util.format(stdout)}, {quoted: m, ephemeralExpiration: m.expiration})
})
}
}
},
owner: true
}

function get(jid) {
if (jid.endsWith('@g.us')) {
return global.db.groups[jid]
} else {
jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
return global.db.users[jid]
}
};