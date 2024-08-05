const fetch = require('node-fetch');

exports.run = {
usage: ['limit'],
hidden: ['ceklimit', 'balance'],
use: 'mention or reply',
category: 'user',
async: async (m, { func, mecha, setting, froms, isPrem }) => {
if (m.quoted || m.text) {
if (!froms) return m.reply('Invalid number.')
if (typeof global.db.users[froms] == 'undefined') return m.reply('User data not found.')
let text = `Limit ${global.db.users[froms].name}`
let isPrim = global.db.users[froms].premium
mecha.sendMessageModify(m.chat, text, m, {
title: `Status: ${isPrim ? 'Premium' : 'Gratisan'}\nLimit: ${global.db.users[froms].limit}/${isPrim ? 99999 : setting.limit}`,
body: `Balance: $${func.rupiah(global.db.users[froms].balance)}`,
thumbnail: await (await fetch(await mecha.profilePictureUrl(froms, 'image').catch(_ => setting.cover))).buffer(),
url: setting.link, 
expiration: m.expiration
})
} else mecha.sendMessageModify(m.chat, `• Limit ${m.pushname}`, m, {
title: `Status: ${m.isOwner ? 'Owner' : isPrem ? 'Premium' : 'Gratisan'}\n• Limit: ${global.db.users[m.sender].limit}/${isPrem ? 99999 : setting.limit}`,
body: `Balance: $${func.rupiah(global.db.users[m.sender].balance)}`,
thumbnail: await (await fetch(await mecha.profilePictureUrl(m.sender, 'image').catch(_ => setting.cover))).buffer(),
url: setting.link, 
expiration: m.expiration
})
}
}
