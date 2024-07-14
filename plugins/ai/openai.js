exports.run = {
usage: ['openai'],
hidden: ['ai', 'gpt'],
use: 'text',
category: 'ai',
async: async (m, { func, mecha, comand }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'apa itu coding'))
let wait = await mecha.sendMessage(m.chat, {text: global.mess.wait}, {quoted: m, ephemeralExpiration: m.expiration})
try {
let res = await func.fetchJson(`https://itzpire.com/ai/gpt?model=gpt-4-0613&q=${m.text}`)
if (!res.status) return await mecha.sendMessage(m.chat, {text: global.mess.error.api, edit: wait.key }, {quoted: m, ephemeralExpiration: m.expiration});
await mecha.sendMessage(m.chat, {text: `${res.data.response}`, edit: wait.key }, {quoted: m, ephemeralExpiration: m.expiration});
} catch (e) {
m.reply(`Maaf terjadi kesalahan! ${e}`);
}
},
limit: 3
}