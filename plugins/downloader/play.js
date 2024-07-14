const yts = require('yt-search'),
fetch = require('node-fetch');

exports.run = {
usage: ['play'],
use: 'judul lagu',
category: 'downloader',
async: async (m, { func, mecha, downloadMp3 }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'melukis senja'))
mecha.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
let search = await yts(m.text)
if (search.all.length == 0) return m.reply(global.mess.error.api)
let data = await search.all.filter((v) => v.type == 'video')
try {
var res = data[0]
} catch {
var res = data[1]
}
let txt = `乂  *Y O U T U B E  P L A Y*\n`
txt += `\n◦ ID : ${res.videoId}`
txt += `\n◦ Title : ${res.title}`
txt += `\n◦ Views : ${res.views}`
txt += `\n◦ Duration : ${res.timestamp}`
txt += `\n◦ Upload : ${res.ago}`
txt += `\n◦ Channel : ${res.author.name}`
txt += `\n◦ URL Channel : ${res.author.url}`
txt += `\n◦ URL Video : ${res.url}`
txt += `\n◦ Description : ${res.description}`
txt += `\n\nPlease wait, the audio file is being sent...`
mecha.sendMessageModify(m.chat, txt, m, {
title: 'YOUTUBE PLAY',
body: global.header, 
thumbnail: await (await fetch(res.thumbnail)).buffer(),
largeThumb: true, 
expiration: m.expiration
}).then(async (key) => await downloadMp3(res.url))
mecha.sendMessage(m.chat, { react: { text: `☑️`, key: m.key }});
},
premium: false,
limit: 5
}