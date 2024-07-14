const toMs = require('ms');

exports.run = {
main: async (m, { func, mecha }) => {
/* FUNCTION EXPIRED USER BY SURYA */
if (typeof global.db.users[m.sender] !== 'undefined') {
global.db.users[m.sender].expired.user = (global.db.users[m.sender].premium ? Date.now() + toMs('90d') : Date.now() + toMs('7d'))
setInterval(() => {
let position = null
Object.keys(global.db.users).forEach((i) => {
if (global.db.users[i].banned == false && global.db.users[i].expired.user != 0 && Date.now() >= global.db.users[i].expired.user) {
position = i
}
})
if (position !== null) {
console.log(`Expired User: ${global.db.users[position].name}`)
delete global.db.users[position];
}
}, 1000)
}

/* FUNCTION EXPIRED GROUP BY SURYA */
if (typeof global.db.groups[m.chat] !== 'undefined') {
global.db.groups[m.chat].expired = Date.now() + toMs('7d')
setInterval(() => {
let position = null
Object.keys(global.db.groups).forEach((i) => {
if (global.db.groups[i].expired != 0 && Date.now() >= global.db.groups[i].expired) {
position = i
}
})
if (position !== null) {
console.log(`Expired Group: ${global.db.groups[position].name}`)
delete global.db.groups[position];
}
}, 1000)
}

/* FUNCTION EXPIRED PREMIUM BY SURYA */
if (typeof global.db.users[m.sender] !== 'undefined') {
let interval = setInterval(() => {
let position = null
Object.keys(global.db.users).forEach((i) => {
if (global.db.users[i].premium && global.db.users[i].expired.premium != 0 && Date.now() >= global.db.users[i].expired.premium) {
position = i
}
})
if (position !== null) {
clearInterval(interval)
mecha.sendMessage(position, {text: `Your premium package has expired, thank you for buying and using our service`}, {ephemeralExpiration: m.expiration})
global.db.users[position].expired.premium = 0;
global.db.users[position].premium = false;
global.db.users[position].limit = 15;
}
}, 1000)
}

/* FUNCTION EXPIRED BANNED BY SURYA */
if (typeof global.db.users[m.sender] !== 'undefined') {
let interval = setInterval(() => {
let position = null
Object.keys(global.db.users).forEach((i) => {
if (global.db.users[i].banned && global.db.users[i].expired.banned != 0 && Date.now() >= global.db.users[i].expired.banned) {
position = i
}
})
if (position !== null) {
clearInterval(interval)
mecha.sendMessage(position, {text: `Banned berakhir, Jangan melanggar rules agar tidak dibanned lagi.`}, {ephemeralExpiration: m.expiration})
global.db.users[position].expired.banned = 0;
global.db.users[position].banned = false;
}
}, 1000)
}

/* FUNCTION EXPIRED SEWA BY SURYA */
if (typeof global.db.groups[m.chat] !== 'undefined') {
let interval = setInterval(async () => {
let position = null
Object.keys(global.db.groups).forEach((i) => {
if (global.db.groups[i].sewa.status && global.db.groups[i].sewa.expired != 0 && Date.now() >= global.db.groups[i].sewa.expired) {
position = i
}
})
if (position !== null) {
clearInterval(interval)
if (mecha.isgroup(position)) mecha.sendMessage(position, {text: 'Bot time has expired and will leave from this group, thank you.', mentions: m.members.map(v => v.id)}, {ephemeralExpiration: m.expiration}).then(() => mecha.groupLeave(position))
global.db.groups[position].sewa.expired = 0;
global.db.groups[position].sewa.status = false;
}
}, 1000)
}

}
}