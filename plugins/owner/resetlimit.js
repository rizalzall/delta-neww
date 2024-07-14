exports.run = {
usage: ['resetlimit'],
category: 'owner',
async: async (m, { mecha, setting }) => {
setting.lastreset = Date.now();
Object.values(global.db.users).filter((v) => v.limit < setting.limit && !v.premium).map((x) => x.limit = setting.limit);
Object.values(global.db.users).filter(v => v.premium).map(v => v.limit = 99999);
m.reply(`Sukses reset limit ${Object.keys(global.db.users).length} users!`);
},
owner: true
}