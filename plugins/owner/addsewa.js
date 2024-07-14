const toMs = require('ms')

exports.run = {
usage: ['addsewa'],
use: 'link group + waktu',
category: 'owner',
async: async (m, { func, mecha, errorMessage }) => {
if (m.isPc){
let [url, time] = m.args;
if (!(url && time)) return m.reply(func.example(m.cmd, 'https://chat.whatsapp.com/codeInvite 15d'))
try {
let link = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
let [_, code] = url.match(link) || []
if (!code) return m.reply('No invite url detected.');
let res = await mecha.groupQueryInvite(code)
if (!res) return m.reply(func.jsonFormat(res))
let groups = global.db.groups[res.id];
if (typeof groups == 'undefined') global.db.groups[res.id] = {}
if (groups) {
if (!('jid' in groups)) groups.jid = res.id
if (!('sewa' in groups)) groups.sewa = { status: false, notice: false, expired: 0 }
}
if (groups.sewa.status) return m.reply('Grup tersebut sudah ada di list sewa!')
groups.sewa.expired = time ? Date.now() + toMs(time) : 'PERMANENT'
groups.sewa.status = true
groups.sewa.notice = true
m.reply(`Successfully added rent to this group for ${time}`)
} catch (e) {
let err = String(e)
if (err.includes('not-authorized')) return m.reply('Masukkan bot kedalam grup tersebut terlebih dahulu.')
return errorMessage(e)
}
} else if (m.isGc){
if (!m.text) return m.reply(`Masukkan durasi sewa!\nContoh: ${m.prefix + m.command} 15d`)
let groups = global.db.groups[m.chat];
if (groups.sewa.status) return m.reply('Grup ini sudah ada di list sewa!')
groups.sewa.expired = m.args[0] ? Date.now() + toMs(m.args[0]) : 'PERMANENT'
groups.sewa.status = true
groups.sewa.notice = true
m.reply(`Successfully added rent to this group for ${m.args[0]}`)
}
},
owner: true
}