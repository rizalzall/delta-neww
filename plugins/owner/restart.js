const database = new (require('../../system/database'))('database')

exports.run = {
usage: ['restart'],
category: 'owner',
async: async (m, { func, mecha }) => {
await mecha.sendMessage(m.chat, {text: func.texted('monospace', 'Restarting...')}, {quoted: m, ephemeralExpiration: m.expiration}).then(async () => {
await database.save(global.db);
process.send('reset');
})
},
owner: true
}