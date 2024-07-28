const axios = require('axios');

const gpt4o = (query) => {
return new Promise(async(resolve, reject) => {
try {
const response = await axios.post('https://api.yanzbotz.my.id/api/ai/gpt4', {
query: query,
prompt: "Saya adalah Delta, Bot WhatsApp dengan program kecerdasan buatan AI, saya di ciptakan oleh Zall."
}, {
headers: {
'Content-Type': 'application/json'
}
})
const regex = /"answer":"([^"]*)"/g;
let match;
let result = ''
while ((match = regex.exec(response.data)) !== null) {
result += match[1]
}
resolve(result.replace(/\\n/g, '\n')
.replace(/\\/g, '')
.replace(/\*\*/g, '*')
.replace(/###/g, '>'))
} catch (error) {
reject(error)
}
})
}

exports.run = {
usage: ['gpt4'],
use: 'question',
category: 'ai',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'Kamu di ciptakan oleh siapa'))
mecha.sendReact(m.chat, '🕒', m.key)
let result = await gpt4o(m.text)
mecha.reply(m.chat, result, m, {
expiration: m.expiration
})
},
limit: true
}
