exports.run = {
usage: ['stag'],
use: 'mention or reply',
category: 'convert',
async: async (m, { func, mecha, setting, froms, packname, author }) => {
if (m.quoted || m.text) {
if ([global.owner, ...setting.owner].includes(froms) && !m.isOwner) return m.reply('Access denied.')
mecha.sendReact(m.chat, '🕒', m.key)
let data = await mecha.profilePictureUrl(froms, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png')
mecha.sendStickerFromUrl(m.chat, await func.getBuffer(data), m, {
packname: packname, 
author: author,
expiration: m.expiration
})
} else m.reply('Mention or Reply chat target.')
},
limit: true
}