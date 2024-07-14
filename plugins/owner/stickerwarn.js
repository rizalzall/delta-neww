exports.run = {
usage: ['addwarn', 'delwarn'],
use: 'reply sticker',
category: 'owner',
async: async (m, { func, mecha, quoted, setting }) => {
switch (command) {
case 'addwarn':
if (/image\/(webp)/.test(quoted.mime)) {
var hash = m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
if (setting.stickerwarn.includes(hash)) return m.reply(`*This sticker already in the database.*`)
setting.stickerwarn.push(hash)
m.reply('This sticker added successfully.')
} else m.reply('Reply stikernya!')
break
case 'delwarn':
if (/image\/(webp)/.test(quoted.mime)) {
var hash = m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
if (setting.stickerwarn.length < 1) return m.reply(`Sorry, you can't remove more.`)
if (!setting.stickerwarn.includes(hash)) return m.reply(`*This sticker not in database.*`)
setting.stickerwarn.splice(setting.stickerwarn.indexOf(hash), 1)
m.reply('This sticker has been removed.')
} else m.reply('Reply stikernya!')
break
}
},
owner: true
}