exports.run = {
usage: ['buylimit'],
use: 'jumlah',
category: 'games',
async: async (m, { func, mecha, setting, isPrem }) => {
if (!m.text) return m.reply(`Masukkan jumlahnya!\nContoh: ${m.cmd} 1`)
if (isNaN(m.args[0])) return m.reply(`Jumlah harus berupa angka!\nContoh: ${m.cmd} 1`)
let harga = isPrem ? 500 : ((global.db.users[m.sender].balance >= 1000000) ? 1500 : setting.hargalimit)
let total = Number(parseInt(m.args[0]) * harga) 
if (global.db.users[m.sender].balance < total) return m.reply(`Balance kamu tidak mencukupi untuk pembelian ini!`)
global.db.users[m.sender].limit += parseInt(m.args[0])
global.db.users[m.sender].balance -= total
m.reply(`Sukses membeli *${m.args[0]}* limit dengan harga *$${func.formatNumber(total)}* balance`)
}
}