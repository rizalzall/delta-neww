const levelup = require('../../lib/canvas.js')

// Cooldown XP diperoleh untuk mencegah spam
const xpGain = new Set()
const isGained = (userId) => {
return !!xpGain.has(userId)
}

const addCooldown = (userId) => {
xpGain.add(userId)
setTimeout(() => {
return xpGain.delete(userId)
}, 30000) // Setiap menit
}

exports.run = {
main: async (m, { mecha, groups, setting }) => {
let user = global.db.users[m.sender];
if (typeof user === 'undefined') return
if (!m.isPrefix && user.register && setting.autolevelup && !groups.mute && !isGained(m.sender) && (user.level < 1000) && !m.fromMe) {
let currentLevel = user.level;
addCooldown(m.sender);
let amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 20);
let requiredXp = 10 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100;
user.exp += amountXp;
if (requiredXp <= user.exp) {
user.level += 1;
let userLevel = user.level;
let name = m.pushname;
let txt = `Selamat 🥳, anda telah naik level!\n\n*Level Up : ${currentLevel} -> ${userLevel}*\n_semakin sering berinteraksi dengan bot semakin tinggi level kamu_`
try {
let img = await levelup(`🥳 ${name.replaceAll('\n', '')} naik level`, userLevel)
await mecha.sendMedia(m.chat, img, m, { caption: txt, expiration: m.expiration })
} catch (e) {
console.error(e);
await mecha.sendMessage(m.chat, {text: txt}, {quoted: m, ephemeralExpiration: m.expiration})
}
}
}
},
group: true
}