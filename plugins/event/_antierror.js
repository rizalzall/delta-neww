exports.run = {
main: async (m, { func, mecha }) => {
/* FUNCTION ANTI ERROR BY SURYA */
if (/limit|balance|profile|profil|me|test|toplevel|listsewa/.test(m.command)) {
Object.values(global.db.users).filter(v => v.balance > 999999999999999999).map(v => v.balance = 999999999999999999)
Object.values(global.db.users).filter(v => v.limit > 1000000000000000).map(v => v.limit = 1000000000000000)
Object.values(global.db.users).filter(v => v.balance < 0).map(v => v.balance = 0)
Object.values(global.db.users).filter(v => v.limit < 0).map(v => v.limit = 0)
Object.values(global.db.users).filter(v => v.balance == null).map(v => v.balance = 0)
Object.values(global.db.users).filter(v => v.limit == null).map(v => v.limit = 0)
Object.values(global.db.users).filter(v => v.limit > 1000 && !v.premium).map(v => v.limit = 1000)
Object.values(global.db.users).filter(v => v.balance > 100000000 && !v.premium).map(v => v.balance = 100000000)
Object.values(global.db.groups).filter(v => v.sewa.expired == NaN).map(x => x.sewa.expired = 0)

let roles = {
'Bronze V': 0, 'Bronze IV': 5, 'Bronze III': 10, 'Bronze II': 15, 'Bronze I': 20, 
'Silver V': 25, 'Silver IV': 30, 'Silver III': 35, 'Silver II': 40, 'Silver I': 45, 
'Elite V': 50, 'Elite IV': 55, 'Elite III': 60, 'Elite II': 65, 'Elite I': 70, 
'Master V': 75, 'Master IV': 80, 'Master III': 85, 'Master II': 90, 'Master I': 95, 
'Grand Master V': 100, 'Grand Master IV': 110, 'Grand Master III': 120, 'Grand Master II': 130, 'Grand Master I': 140, 
'Epic V': 150, 'Epic IV': 160, 'Epic III': 170, 'Epic II': 180, 'Epic I': 190, 
'Legend V': 200, 'Legend IV': 250, 'Legend III': 300, 'Legend II': 350, 'Legend I': 400, 
'Mythic V': 450, 'Mythic IV': 500, 'Mythic III': 550, 'Mythic II': 600, 'Mythic I': 650, 
'Mythical Honor': 700, 'Mythical Honor': 800, 'Mythical Immortal': 1000
}
for (let user of Object.values(global.db.users)) {
let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([_, minLevel]) => user.level >= minLevel) || Object.entries(roles)[0])[0]
user.role = role
}
}
}
}