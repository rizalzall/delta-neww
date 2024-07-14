const { downloadContentFromMessage } = global.baileys

exports.run = {
usage: ['readviewonce'],
hidden: ['rvo'],
use: 'reply viewonce',
category: 'convert',
async: async (m, { mecha }) => {
if (!m.quoted?.msg?.viewOnce) return m.reply('Reply view once message to use this command.')
let type = Object.keys(m.quoted.message)[0]
let quotedType = m.quoted.message[type]
let media = await downloadContentFromMessage(quotedType, type == 'imageMessage' ? 'image' : 'video')
let buffer = Buffer.from([])
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])
}
if (/video/.test(type)) {
await mecha.sendMessage(m.chat, {video: buffer, caption: quotedType.caption || '' })
} else if (/image/.test(type)) {
await mecha.sendMessage(m.chat, {image: buffer, caption: quotedType.caption || '' })
}
},
limit: true,
}