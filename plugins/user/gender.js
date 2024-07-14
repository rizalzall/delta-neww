exports.run = {
usage: ['gender'],
use: 'L / P',
category: 'user',
async: async (m, { func, mecha }) => {
if (global.db.users[m.sender].gender !== '') return m.reply('Kamu sudah memiliki gender!')
if (m.args[0] === 'P') {
global.db.users[m.sender].gender = 'Perempuan'
m.reply('Kamu telah memilih kelamin *Perempuan* dan tidak akan bisa diubah lagi.')
} else if (m.args[0] === 'L') {
global.db.users[m.sender].gender = 'Laki-laki'
m.reply('Kamu telah memilih kelamin *Laki-laki* dan tidak akan bisa diubah lagi.')
} else m.reply(`Mohon masukkan keyword dengan benar!\nContoh: ${m.prefix}gender L\n\n${m.prefix}gender L untuk Laki-laki\n${m.prefix}gender P untuk Perempuan`)
}
}