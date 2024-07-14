exports.run = {
usage: ['runtime'],
hidden: ['test'],
category: 'special',
async: async (m, { func, mecha, setting, fkon }) => {
let test = `Quick Test Done! ${m.pushname}\nRuntime: ${func.runtime(process.uptime())}`
const txt = await mecha.sendMessage(m.chat, {text: 'Waiting for command'}, {quoted: fkon, ephemeralExpiration: m.expiration})
const arr = [
{ text: "《█▒▒▒▒▒▒▒▒▒▒▒▒▒》10%", timeout: 100 },
{ text: "《███▒▒▒▒▒▒▒▒▒▒▒》20%", timeout: 100 },
{ text: "《████▒▒▒▒▒▒▒▒▒▒》30%", timeout: 100 },
{ text: "《██████▒▒▒▒▒▒▒▒》40%", timeout: 100 },
{ text: "《████████▒▒▒▒▒▒》50%", timeout: 100 },
{ text: "《█████████▒▒▒▒▒》60%", timeout: 100 },
{ text: "《███████████▒▒▒》70%", timeout: 100 },
{ text: "《████████████▒▒》80%", timeout: 100 },
{ text: "《█████████████▒》90%", timeout: 100 },
{ text: "《██████████████》100%", timeout: 100 },
{ text: "ᴄᴏᴍᴘʟᴇᴛᴇ", timeout: 100 },
{ text: test, timeout: 100 }
];

for (let i = 0; i < arr.length; i++) {
await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
await mecha.relayMessage(m.chat, {
protocolMessage: {
key: txt.key,
type: 14,
editedMessage: {
conversation: arr[i].text
}
}
}, {quoted: fkon, ephemeralExpiration: m.expiration});
}
}
}