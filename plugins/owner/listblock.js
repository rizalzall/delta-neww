exports.run = {
usage: ['listblock'],
category: 'owner',
async: async (m, { func, mecha, listblock }) => {
if (listblock.length == 0) return m.reply('Empty data.')
let txt = '乂  *L I S T - B L O C K*\n\n'
txt += `Total: *${listblock.length}* blocked\n\n`
txt += listblock.map((v, i) => `${i + 1}. @${v.replace(/@.+/, '')}`).join('\n')
mecha.reply(m.chat, txt, m)
},
owner: true
}