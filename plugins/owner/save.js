const fs = require('fs')
const path = require('path')

exports.run = {
usage: ['save'],
hidden: ['sv'], 
use: 'reply code',
category: 'owner',
async: async (m, { func, mecha, comand }) => {
if (!m.text) return m.reply(func.example(comand, 'handler + reply code'))
if (!m.quoted) return m.reply('Reply text scriptnya!');
if (m.text == 'handler') {
await fs.writeFileSync('./handler.js', m.quoted.text);
await m.reply('Successfully update handler.js');
} else if (m.text == 'main') {
await fs.writeFileSync('./main.js', m.quoted.text);
await m.reply('Successfully update main.js');
} else if (m.text == 'config') {
await fs.writeFileSync('./config.js', m.quoted.text);
await m.reply('Successfully update config.js');
} else if (m.text == 'functions') {
await fs.writeFileSync('./functions.js', m.quoted.text);
await m.reply('Successfully update functions.js');
} else if (m.text == 'simple') {
await fs.writeFileSync('./system/simple.js', m.quoted.text);
await m.reply('Successfully update simple.js');
} else m.reply('Format invalid!')
},
owner: true
}