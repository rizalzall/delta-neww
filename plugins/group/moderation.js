exports.run = {
usage: ['welcome', 'left', 'detect', 'antitoxic', 'antilink', 'antivirtex', 'antibot', 'antiluar', 'antiviewonce', 'antihidetag', 'antidelete', 'antiedited', 'automatically'],
use: 'on / off',
category: 'admin tools',
async: async (m, { func, mecha, groups }) => {
let setting = global.db.groups[m.chat]
if (!m.isBotAdmin && /antitoxic|antilink|antivirtex|antibot|antiluar|antihidetag|automatically/.test(m.command)) return m.reply(global.mess.botAdmin)
if (!m.args || !m.args[0]) return m.reply(`*Current status* : ${setting[m.command] ? 'active' : 'non-active'}\n\n${func.example(m.cmd, 'on / off')}`)
let option = m.args[0].toLowerCase()
let optionList = ['on', 'off'];
if (!optionList.includes(option)) return m.reply(`${func.example(m.cmd, 'on / off')}`)
let status = option === 'on' ? true : false;
if (setting[m.command] == status) return mecha.reply(m.chat, `${func.ucword(m.command)} has been ${option == 'on' ? 'activated' : 'inactivated'} previously.`, m)
setting[m.command] = status
mecha.reply(m.chat, `${func.ucword(m.command)} has been ${option == 'on' ? 'activated' : 'inactivated'} successfully.`, m)
},
admin: true,
group: true
}