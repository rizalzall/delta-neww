/*
* Nama Pengembang: Jabal Surya
* Kontak Whatsapp: wa.me/62882003321562
* Kontak Telegram: t.me/surya_skylark
* Akun Instagram: surya_skylark05
* Catatan: tolong laporkan kepada saya jika anda menemukan ada yang menjual script ini tanpa seizin saya.
*/

require('../config');
const toMs = require('ms');
const fetch = require('node-fetch');
const func = require('../functions');

module.exports = async (mecha, data) => {
if (global.db.setting.maintenance) return;
if (typeof global.db.groups[data.id] == 'undefined') return;
let from = data.id;
let groups = global.db.groups[from]
let participants = data.participants
let meta = await (await mecha.groupMetadata(from)) || {};
let groupName = meta.subject || ''
let groupDesc = meta.desc || ''
let ppk = 'https://telegra.ph/file/ea7ef3f59921d1821a0d1.jpg'
let bot = mecha.user.id ? mecha.user.id.split(':')[0] + '@s.whatsapp.net' : mecha.user.jid;
let expiration = 86400;

if (!participants.includes(bot)) {
try {
for (let jid of participants) {
/* add member to database member */
if (!groups.member.find(v => v.jid == jid)) groups.member.push({
jid: jid, 
lastseen: Date.now(),
toxic: 0,
chat: 0
})
if (data.action === 'add') {
if (jid === bot) return;
/* localonly to remove new member when the number not from indonesia */
if (groups && groups.antiluar && !sender.startsWith('62')) {
mecha.reply(from, func.texted('bold', `Sorry @${sender.split('@')[0]}, this group is only for indonesian people and you will removed automatically.`), { expiration: expiration })
mecha.updateBlockStatus(sender, 'block')
return await func.delay(2000).then(() => mecha.groupParticipantsUpdate(from, [sender], 'remove'))
}
/* blacklist user from this group */
if (groups && groups.blacklist.some((x) => x === jid) && !groups.detect) {
mecha.reply(from, func.texted('bold', `Sorry @${jid.split('@')[0]}, you have been blacklisted from this group.`), { expiration: expiration })
return await func.delay(2000).then(() => mecha.groupParticipantsUpdate(from, [jid], 'remove'))
}
/* send message with modify welcome to group */
if (groups.welcome) {
let pic = await mecha.profilePictureUrl(jid, 'image').catch(_ => ppk)
let teks_welcome = groups.tekswelcome;
let text = (teks_welcome.replace('+user', `@${jid.split('@')[0]}`).replace('+group', groupName).replace('+desc', groupDesc))
mecha.sendMessageModify(from, text, null, {
ads: true,
title: 'Welcome Message',
body: global.fake,
thumbnail: await fetch(pic).then(data => data.buffer()),
largeThumb: !pic.includes(ppk),
expiration: expiration
})
}
} else if (data.action === 'remove') {
if (jid === bot) return
/* send message with modify leave to group */
if (groups.left) {
let pic = await mecha.profilePictureUrl(jid, 'image').catch(_ => ppk)
let teks_left = groups.teksleft;
let text = (teks_left.replace('+user', `@${jid.split('@')[0]}`).replace('+group', groupName).replace('+desc', groupDesc))
mecha.sendMessageModify(from, text, null, {
ads: true,
title: 'Leave Message',
body: global.fake,
thumbnail: await fetch(pic).then(data => data.buffer()),
largeThumb: !pic.includes(ppk),
expiration: expiration
})
}
}
/* mencegah data member menjadi duplikat */
let uniqueJids = new Set();
let result = groups.member.filter(v => {
if (!uniqueJids.has(v.jid)) {
uniqueJids.add(v.jid);
return true;
}
return false;
});
groups.member = result;
}
} catch (err) {
console.log(err)
return mecha.sendMessage(global.owner, {text: func.jsonFormat(err)})
}
}
}

global.reloadFile(__filename)