const fetch = require('node-fetch');

let sadpodcast = ['sadpodcast1', 'sadpodcast2', 'sadpodcast3', 'sadpodcast4', 'sadpodcast5', 'sadpodcast6', 'sadpodcast7', 'sadpodcast8', 'sadpodcast9', 'sadpodcast10', 'sadpodcast11', 'sadpodcast12', 'sadpodcast13', 'sadpodcast14', 'sadpodcast15', 'sadpodcast16']

exports.run = {
usage: ['sadpodcast', ...sadpodcast],
category: 'sadpodcast',
async: async (m, { func, mecha, setting }) => {
if (m.command === 'sadpodcast') {
let rows = [];
for (let key of sadpodcast) {
rows.push({
title: `${func.ucword(key)}`,
id: `${m.prefix + key}`
})
}
let sections = [{
title: `Sad Podcast ( ${sadpodcast.length} Audio )`, 
//highlight_label: 'Populer Sadpodcast',
rows: rows
}]
let buttons = [
['list', 'Click Here ⎙', sections]
]
return mecha.sendButton(m.chat, 'S A D - P O D C A S T', 'select the list button below.', global.footer, buttons, m, {
userJid: m.sender,
expiration: m.expiration
})
}
let sadpodcastUrl = `https://raw.githubusercontent.com/Jabalsurya2105/database/master/sadpodcast/${m.command.replace(/[^0-9]/g, '')}.mp3`
if (m.text.toLowerCase() === 'cover') {
mecha.sendReact(m.chat, '🕒', m.key)
mecha.sendMessage(m.chat, {audio: {url: sadpodcastUrl}, mimetype: 'audio/mpeg', ptt: false, 
contextInfo: {
externalAdReply: {
mediaUrl: 'https://instagram.com/surya_skylark05', 
mediaType: 2, 
title: '  ⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻  ', 
body: '  ━━━━⬤──────────  ', 
description: 'Now Playing...',
mediaType: 2, 
sourceUrl: 'https://instagram.com/surya_skylark05',
thumbnail: await (await fetch(setting.cover)).buffer(), 
renderLargerThumbnail: true
}
}
}, {quoted: m, ephemeralExpiration: m.expiration})
} else mecha.sendMessage(m.chat, {audio: {url: sadpodcastUrl}, mimetype: 'audio/mpeg', ptt: false}, {quoted: m, ephemeralExpiration: m.expiration})
},
limit: true
}