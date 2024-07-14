exports.run = {
usage: ['self', 'public', 'online', 'offline'],
category: 'owner',
async: async (m, { func, mecha, setting }) => {
if (m.command === 'self') {
if (setting.self) return m.reply('Already in self mode.')
setting.self = true
m.reply('Successfully changed to self')
} else if (m.command === 'public') {
if (!setting.self) return m.reply('Already in public mode.')
setting.self = false
m.reply('Successfully changed to public')
} else if (m.command === 'online') {
if (setting.online) return m.reply('Already in online mode.')
setting.online = true
m.reply('Successfully changed to online')
} else if (m.command === 'offline') {
if (!setting.online) return m.reply('Already in offline mode.')
setting.online = false
m.reply('Successfully changed to offline')
}
},
owner: true
}