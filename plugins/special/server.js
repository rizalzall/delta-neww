const os = require('os'),
fetch = require('node-fetch');

exports.run = {
usage: ['server'],
category: 'special',
async: async (m, { func, mecha, setting }) => {
let server = await func.fetchJson('http://ip-api.com/json')
delete server.status
let caption = `乂  *S E R V E R*\n\n`
caption += `┌  ◦  OS : ${os.type()} (${os.arch()} / ${os.release()})\n`
caption += `│  ◦  Ram : ${func.formatSize(process.memoryUsage().rss)} / ${func.formatSize(os.totalmem())}\n`
for (let key in server) caption += `│  ◦  ${func.ucword(key)} : ${server[key]}\n`
caption += `│  ◦  Uptime : ${func.toTime(os.uptime * 1000)}\n`
caption += `└  ◦  Processor : ${process.platform == 'linux' ? os.cpus()[0].model : '-'}\n\n`
mecha.sendMessageModify(m.chat, caption, m, {
title: global.header,
body: global.footer,
thumbnail: await (await fetch(setting.cover)).buffer(),
largeThumb: true, 
expiration: m.expiration
})
}
}