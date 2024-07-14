const moment = require('moment-timezone'),
fetch = require('node-fetch');

exports.run = {
usage: ['bcuser', 'bcprem', 'bcpc', 'bcgc', 'bcsewa'],
use: 'text',
category: 'owner',
async: async (m, { func, mecha, store, setting, quoted }) => {
switch (m.command) {
case 'bcuser':{
if (!m.text) return m.reply(func.example(m.cmd, 'minimal mandi'))
let data = Object.values(global.db.users).filter(v => v.register && !v.banned).map(v => v.jid)
await m.reply(`Otw broadcast ke ${data.length} User`)
let txt = m.text.replace('@owner', `@${global.owner.split('@')[0]}`)
for (let jid of data) {
await func.delay(1500)
mecha.sendMessageModify(jid, txt, null, {
title: 'System Notification', 
body: global.header, 
thumbnail: await (await fetch(setting.cover)).buffer(),
expiration: 86400
})
}
m.reply(`Sukses broadcast ke ${data.length} User`)
}
break
case 'bcprem':{
if (!m.text) return m.reply(func.example(m.prefix + m.command, 'minimal mandi'))
let data = Object.values(global.db.users).filter(v => v.register && v.premium && !v.banned).map(v => v.jid)
await m.reply(`Otw broadcast ke ${data.length} User`)
let txt = m.text.replace('@owner', `@${global.owner.split('@')[0]}`)
for (let jid of data) {
await func.delay(1500)
mecha.sendMessageModify(jid, txt, null, {
title: 'System Notification', 
body: global.header, 
thumbnail: await (await fetch(setting.cover)).buffer(),
expiration: 86400
})
}
m.reply(`Sukses broadcast ke ${data.length} Premium Users`)
}
break
case 'bcpc':{
if (!m.text) return m.reply(func.example(m.prefix + m.command, 'minimal mandi'))
let data = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
let txt = m.text.replace('@owner', `@${global.owner.split('@')[0]}`)
m.reply(`Mengirim broadcast ke ${data.length} Chat\nWaktu Selesai ${data.length * 1.5} detik`)
for (let jid of data) {
await func.delay(1500)
mecha.sendMessageModify(jid, txt, null, {
title: 'System Notification', 
body: global.header, 
thumbnail: await (await fetch(setting.cover)).buffer(),
expiration: 86400
})
}
m.reply(`Sukses mengirim broadcast ke ${data.length} Users`)
}
break
case 'bcgc':{
let getGroups = await mecha.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let data = groups.map(v => v.id)
let txt = m.text.replace('@owner', `@${global.owner.split('@')[0]}`)
let mentions = [...mecha.ments(txt), ...Object.values(global.db.users).filter(v => v.register && !v.banned).map(v => v.jid)]
m.reply(`Mengirim broadcast ke ${data.length} group chat, waktu selesai ${data.length * 1.5} detik`)
if (/image\/(webp)/.test(quoted.mime)) {
for (let jid of data) {
await func.delay(1500)
let media = await quoted.download()
await mecha.sendMessage(jid, {sticker: media, mentions: mentions}, {quoted: null, ephemeralExpiration: 86400})
}
mecha.reply(m.chat, `Successfully send broadcast message to ${data.length} groups`, m)
} else if (/video|image\/(jpe?g|png)/.test(quoted.mime)) {
for (let jid of data) {
await func.delay(1500)
let media = await quoted.download()
await mecha.sendMedia(jid, media, null, {
caption: txt ? '乂  *B R O A D C A S T*\n\n' + txt : '',
mentions: mentions, 
expiration: 86400
})
}
mecha.reply(m.chat, `Successfully send broadcast message to ${data.length} groups`, m)
} else if (/audio/.test(quoted.mime)) {
for (let jid of data) {
await func.delay(1500)
let media = await quoted.download()
await mecha.sendMedia(jid, media, null, {
ptt: quoted.ptt,
mentions: mentions, 
expiration: 86400
})
}
mecha.reply(m.chat, `Successfully send broadcast message to ${data.length} groups`, m)
} else {
if (!m.text) return m.reply(func.example(m.prefix + m.command, 'minimal mandi'))
for (let jid of data) {
await func.delay(1500)
await mecha.sendMessageModify(jid, txt, null, {
title: 'B R O A D C A S T', 
body: global.header, 
thumbnail: await (await fetch('https://telegra.ph/file/aa76cce9a61dc6f91f55a.jpg')).buffer(),
largeThumb: true,
mentions: mentions, 
expiration: 86400
})
}
mecha.reply(m.chat, `Successfully send broadcast message to ${data.length} groups`, m)
}
}
break
case 'bcsewa':{
let data = Object.values(global.db.groups).filter(v => v.sewa.status).map(x => x.jid)
let txt = m.text.replace('@owner', `@${global.owner.split('@')[0]}`)
let mentions = [...mecha.ments(txt), ...Object.values(global.db.users).filter(v => !v.banned).map(v => v.jid)]
m.reply(`Mengirim broadcast ke ${data.length} group chat, waktu selesai ${data.length * 1.5} detik`)
if (/image\/(webp)/.test(quoted.mime)) {
for (let jid of data) {
await func.delay(1500)
let media = await quoted.download()
await mecha.sendMessage(jid, {sticker: media, mentions: mentions}, {quoted: null, ephemeralExpiration: 86400})
}
mecha.reply(m.chat, `Successfully send broadcast message to ${data.length} groups`, m)
} else if (/video|image\/(jpe?g|png)/.test(quoted.mime)) {
for (let jid of data) {
await func.delay(1500)
let media = await quoted.download()
await mecha.sendMedia(jid, media, null, {
caption: txt ? '乂  *B R O A D C A S T*\n\n' + txt : '',
mentions: mentions, 
expiration: 86400
})
}
mecha.reply(m.chat, `Successfully send broadcast message to ${data.length} groups`, m)
} else if (/audio/.test(quoted.mime)) {
for (let jid of data) {
await func.delay(1500)
let media = await quoted.download()
await mecha.sendMedia(jid, media, null, {
ptt: quoted.ptt,
mentions: mentions, 
expiration: 86400
})
}
mecha.reply(m.chat, `Successfully send broadcast message to ${data.length} groups`, m)
} else {
if (!m.text) return m.reply(func.example(m.prefix + m.command, 'minimal mandi'))
for (let jid of data) {
await func.delay(1500)
await mecha.sendMessageModify(jid, txt, null, {
title: 'B R O A D C A S T', 
body: global.header, 
thumbnail: await (await fetch('https://telegra.ph/file/aa76cce9a61dc6f91f55a.jpg')).buffer(),
largeThumb: true,
mentions: mentions, 
expiration: 86400
})
}
mecha.reply(m.chat, `Successfully sent broadcast message to ${data.length} groups`, m)
}
}
break
}
},
owner: true
}