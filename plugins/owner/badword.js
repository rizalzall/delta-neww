exports.run = {
usage: ['addbadword', 'delbadword'],
use: 'badword',
category: 'owner',
async: async (m, { func, mecha, setting }) => {
switch (m.command) {
case 'addbadword':
if (!m.text) return m.reply(func.example(m.cmd, 'kontol'))
if (setting.toxic.includes(m.text)) return m.reply(`*'${m.text}' already in the database.*`)
setting.toxic.push(m.text.toLowerCase())
m.reply(`*'${m.text}' added successfully!*`)
break
case 'delbadword':
if (!m.text) return m.reply(func.example(m.prefix + m.command, 'kontol'))
if (setting.toxic.length < 2) return m.reply(`Sorry, you can't remove more.`)
if (!setting.toxic.includes(m.text)) return m.reply(`*'${m.text}' not in database.*`)
setting.toxic.splice(setting.toxic.indexOf(m.text), 1)
m.reply(`*'${m.text}' has been removed.*`)
break
}
},
owner: true
}