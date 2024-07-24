exports.run = {
usage: ['cekdevice'],
hidden: ['getdevice'],
use: 'reply chat target',
category: 'tools',
async: async (m, { func, mecha }) => {
if (!m.quoted) return m.reply('balas pesan target.')
let id = m.quoted.id
await m.reply(getDevice(id))
}
}

function getDevice (id) {
const device = id.length > 21 ? 'Android' : id.substring(0, 2) === '3A' ? 'IOS' : 'WhatsApp Web'
return device;
}
