exports.run = {
usage: ['autolevelup'],
hidden: ['autolevel'],
use: 'on / off',
category: 'games',
async: async (m, { func, mecha, users, comand }) => {
if (m.args[0] === 'on'){
if (users.autolevelup) return m.reply(`This feature is already active`)
users.autolevelup = true
m.reply('Fitur auto level up telah di aktifkan')
} else if (m.args[0] === 'off'){
if (!users.autolevelup) return m.reply(`This feature is already non-active`)
users.autolevelup = false
m.reply('Fitur auto level up telah di matikan')
} else m.reply(func.example(comand, 'on / off'))
},
group: true
}