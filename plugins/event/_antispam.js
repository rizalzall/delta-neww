let database = {};

// Message filter
const usedCommandRecently = new Set()

/**
 * Check is number filtered.
 * @param {String} from 
 * @returns {Boolean}
 */
const isFiltered = (from) => {
return !!usedCommandRecently.has(from)
}

/**
 * Add number to filter.
 * @param {String} from 
 */
const addFilter = (from) => {
usedCommandRecently.add(from)
setTimeout(() => {
return usedCommandRecently.delete(from)
}, global.cooldown * 1000) // 5 seconds delay, I don't recommend below that.
}

const addSpam = (jid) => {
let position = false
Object.keys(database).forEach((i) => {
if (database[i].id === jid) {
position = i
}
})
if (position !== false) {
database[position].spam += 1
} else {
database[jid] = {
id: jid,
spam: 1,
expired: Date.now() + 300000
}
}
}

exports.run = {
main: async (m, { mecha, setting, isPrem }) => {
/* FUNCTION ANTI SPAM COMMAND BY SURYA */
setInterval(() => {
let position = null
Object.keys(database).forEach((i) => {
if (Date.now() >= database[i].expired) {
position = i
}
})
if (position !== null) {
mecha.sendMessage(global.owner, {text: `Spam command expired: @${database[position].id.split('@')[0]}`}, {quoted: m, ephemeralExpiration: m.expiration})
delete database[position]
}
}, 1000)

async function spamcommand(){
if (typeof database[m.sender] == 'undefined') await addSpam(m.sender)
let user = database[m.sender]
if (user.spam < 5) {
user.spam += 1
mecha.sendMessage(m.chat, {text: `System detects you are spamming, please cooldown for *${global.cooldown} seconds*.`}, {quoted: m, ephemeralExpiration: m.expiration})
} else {
delete database[m.sender]
return mecha.sendMessage(m.chat, {text: `You were temporarily banned for ${((setting.timer / 1000) / 60)} minutes cause you over spam.`}, {quoted: m, ephemeralExpiration: m.expiration}).then(() => {
global.db.users[m.sender].banned = true;
global.db.users[m.sender].expired.banned = Date.now() + setting.timer;
})
}
}

if (setting.antispam && m.budy && m.isPrefix && isFiltered(m.sender)) return spamcommand()
if (setting.antispam && m.budy && m.isPrefix && !m.isOwner && !isPrem) addFilter(m.sender)
}
}