const { areJidsSameUser } = global.baileys;

exports.run = {
usage: ['listpesan'],
hidden: ['listchat'],
category: 'group',
async: async (m, { func, mecha, groups }) => {
let data = groups.member.filter((v) => v.chat !== undefined && global.db.users[v.jid] !== undefined && v.chat > 0)
if (data.length == 0) return m.reply('Empty data.')
let listchat = data.sort((a, b) => b.chat - a.chat)
let member = listchat.map(v => v.jid);
let totalpesan = 0;
for (let x of listchat) totalpesan += x.chat;
let txt = `乂  *L I S T - P E S A N*\n`
txt += `\nGroup : ${m.groupName}`
txt += `\nTotal peserta : *${data.length}* peserta`
txt += `\nTotal pesan : *${func.rupiah(totalpesan)}* pesan\n`
txt += `\nKamu Top ${member.indexOf(m.sender) + 1} Chat dari ${m.members.length} Peserta\n`
txt += listchat.map((v, i) => `${i + 1}. ${(m.members.some(x => areJidsSameUser(v.jid, x.id)) ? (global.db.users[v.jid]?.name || mecha.getName(v.jid)).replaceAll('\n', '\t') : '@' + v.jid?.split('@')[0])} ~> ${v.chat} chat`).join('\n')
m.reply(txt)
},
group: true
}