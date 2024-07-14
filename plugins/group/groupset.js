exports.run = {
usage: ['groupset'],
hidden: ['grup', 'gc'],
use: 'open / close',
category: 'group',
async: async (m, { func, mecha }) => {
if (m.args[0] === 'close'){
await mecha.groupSettingUpdate(m.chat, 'announcement')
.then((res) => mecha.sendMessage(m.chat, {react: {text: '✅', key: m.key}}))
.catch((err) => mecha.sendReact(m.chat, '❌', m.key))
} else if (m.args[0] === 'open'){
await mecha.groupSettingUpdate(m.chat, 'not_announcement')
.then((res) => mecha.sendMessage(m.chat, {react: {text: '✅', key: m.key}}))
.catch((err) => mecha.sendReact(m.chat, '❌', m.key))
} else m.reply(func.example(m.cmd, 'open / close'))
},
group: true,
admin: true,
botAdmin: true
}