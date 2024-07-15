const { G4F } = require("g4f");
const g4f = new G4F();

exports.run = {
usage: ['gpt4'],
hidden: ['g4f'],
use: 'question',
category: 'ai',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'apakah kamu gpt4?'))
mecha.sendReact(m.chat, '🕒', m.key)
try {
const options = [{ model: "gpt-4" }];
const messages = [
{ role: "system", content: "kamu Adalah Delta, Bot WhatsApp dengan program kecerdasan buatan AI (artificial intelligence). jawab setiap pertanyaan dengan jawaban yang edukatif." },
{ role: "user", content: m.text },
];
let response = await g4f.chatCompletion(messages, options);
mecha.reply(m.chat, response, m, {
expiration: m.expiration
});
} catch (error) {
console.error(error);
return mecha.reply(m.chat, String(error), m)
}
},
limit: true
}
