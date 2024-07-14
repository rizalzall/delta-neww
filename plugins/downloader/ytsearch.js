const yts = require('yt-search');

exports.run = {
usage: ['ytsearch'],
hidden: ['yts'],
use: 'judul lagu',
category: 'downloader',
async: async (m, { func, mecha }) => {
mecha.ytSearch = mecha.ytSearch ? mecha.ytSearch : {};
if (!m.text) return m.reply(func.example(m.cmd, 'legends never die'))
mecha.sendReact(m.chat, '🕒', m.key)
let result = await yts(m.text);
if (result.all.length == 0) return m.reply('Data empty.')
let txt = `*Y O U T U B E - S E A R C H*\n\nResult From : ${m.text}\n\nSelect the list button below.`
let listSearch = [];
for (let i of result.all) {
if (!i.author.name || !i.title || !i.url || !i.timestamp) continue
listSearch.push({
title: i.title, 
highlight_label: i?.author?.name || 'Not Know',
rows: [
{
title: 'Audio', 
id: `${m.prefix}yta ${i.url}`, 
description: `- Duration : ${i.timestamp}`
},
{
title: 'Video', 
id: `${m.prefix}ytv ${i.url}`, 
description: `- Duration : ${i.timestamp}`
}
]
})
}
let buttons = [
['list', 'Click Here ⎙', listSearch],
['url', 'YouTube', result.all[0].url],
]
mecha.sendButton(m.chat, `Y O U T U B E - S E A R C H`, `Result From : ${m.text}\n\nSelect the list button below.`, global.footer, buttons, m, {
userJid: m.sender,
expiration: m.expiration
})
},
limit: true
}