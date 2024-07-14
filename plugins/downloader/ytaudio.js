const { ytmp3, ytmp4 } = require('../../lib/youtube');

exports.run = {
usage: ['ytaudio'],
hidden: ['yta', 'ytmp3'],
use: 'link youtube',
category: 'downloader',
async: async (m, { func, mecha, downloadMp3 }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'https://youtu.be/1fOBgosDo7s?si=fjD7OLAqD7wrzSSU'))
if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(m.args[0])) return m.reply(mess.error.url)
mecha.ytaudio = mecha.ytaudio ? mecha.ytaudio : {};
if (m.args[0] in mecha.ytaudio) return m.reply("Harap tunggu, masih ada tugas yang belum terselesaikan.");
mecha.ytaudio[m.args[0]] = true;
mecha.sendReact(m.chat, '🕒', m.key)
try {
await ytmp3(m.args[0]).then(async (data) => {
let txt = `乂  *YOUTUBE DOWNLOADER MP3*\n`
txt += `\n◦  *Title:* ${data.title}`
txt += `\n◦  *Size:* ${data.size}`
txt += `\n◦  *Duration:* ${data.duration}`
txt += `\n◦  *Views:* ${data.views}${data.likes ? '\n◦  *Likes:* ' + data.likes : ''}${data.dislike ? '\n◦  *Dislike:* ' + data.dislike : ''}`
txt += `\n◦  *Channel:* ${data.channel}`
txt += `\n◦  *Upload Date:* ${data.uploadDate}`
mecha.reply(m.chat, txt, m)
await downloadMp3(m.args[0]).then(() => delete mecha.ytaudio[m.args[0]])
})
} catch (err) {
delete mecha.ytaudio[m.args[0]];
m.reply(global.mess.error.api)
mecha.reply(global.owner, "Error ytaudio : " + err, m);
}
},
limit: 3
}