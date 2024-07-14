/*
* Nama Pengembang: Jabal Surya
* Kontak Whatsapp: wa.me/62882003321562
* Kontak Telegram: t.me/surya_skylark
* Akun Instagram: surya_skylark05
* Catatan: tolong laporkan kepada saya jika anda menemukan ada yang menjual script ini tanpa seizin saya.
*/

const toMs = require('ms');
const { jidNormalizedUser } = baileys;

module.exports = (mecha, update) => {
try {
const msg = update.messages[update.messages.length - 1];
if (msg.key && msg.key.remoteJid === 'status@broadcast') return
const calender = new Date().toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })
const isNumber = x => typeof x === 'number' && !isNaN(x)
const from = msg.key.remoteJid;
const sender = msg.key.fromMe ? jidNormalizedUser(mecha.user.id) : (msg.key.participant || msg.key.remoteJid)
const pushname = msg.pushName || '-'

// DATABASE USER
if (sender.endsWith('@s.whatsapp.net')) {
let users = global.db.users[sender]
if (typeof users !== 'object') global.db.users[sender] = {}
if (users) {
if (!('jid' in users)) users.jid = sender
if (!('register' in users)) users.register = false
if (!('name' in users)) users.name = pushname
if (!('gender' in users)) users.gender = ''
if (!isNumber(users.age)) users.age = 0
if (!('date' in users)) users.date = calender
if (!isNumber(users.limit)) users.limit = 15
if (!isNumber(users.balance)) users.balance = 10000
if (!isNumber(users.afk)) users.afk = 0
if (!('alasan' in users)) users.alasan = ''
if (!('afkObj' in users)) users.afkObj = {}
if (!('premium' in users)) users.premium = false
if (!('banned' in users)) users.banned = false
if (!isNumber(users.warning)) users.warning = 0
if (!('pasangan' in users)) users.pasangan = { id: '', time: 0 }
if (!('expired' in users)) users.expired = { user: Date.now() + toMs('7d'), premium: 0, banned: 0 }
if (!('game' in users)) users.game = { tictactoe: 0, suit: 0, petakbom: 0, tebaklagu: 0, tebakheroml: 0, tebaklogo: 0, tebakgambar: 0, tebakkalimat: 0, tebakkata: 0, tebaklirik: 0, tebakkimia: 0, tebakbendera: 0, tebakanime: 0, kuis: 0, siapakahaku: 0, asahotak: 0, susunkata: 0, caklontong: 0, family100: 0, math: 0, casino: 0 }
if (!isNumber(users.lastunreg)) users.lastunreg = 0
if (!isNumber(users.exp)) users.exp = 0
if (!isNumber(users.level)) users.level = 0
if (!('role' in users)) users.role = 'Bronze'
} else {
global.db.users[sender] = {
jid: sender,
register: false,
name: pushname,
gender: '',
age: 0,
date: calender,
limit: 15,
balance: 10000,
afk: 0,
alasan: '',
afkObj: {},
premium: false,
banned: false,
warning: 0,
pasangan: { id: '', time: 0 },
expired: { user: Date.now() + toMs('7d'), premium: 0, banned: 0 },
game: { tictactoe: 0, suit: 0, petakbom: 0, tebaklagu: 0, tebakheroml: 0, tebaklogo: 0, tebakgambar: 0, tebakkalimat: 0, tebakkata: 0, tebaklirik: 0, tebakkimia: 0, tebakbendera: 0, tebakanime: 0, kuis: 0, siapakahaku: 0, asahotak: 0, susunkata: 0, caklontong: 0, family100: 0, math: 0, casino: 0 },
lastunreg: 0,
exp: 0,
level: 0,
role: 'Bronze',
}
}
}

// DATABASE GROUP
if (from.endsWith('@g.us')) {
let groups = global.db.groups[from]
if (typeof groups !== 'object') global.db.groups[from] = {}
if (groups) {
if (!('jid' in groups)) groups.jid = from
if (!('name' in groups)) groups.name = '-'
if (!('tekswelcome' in groups)) groups.tekswelcome = global.tekswelcome
if (!('teksleft' in groups)) groups.teksleft = global.teksleft
if (!('welcome' in groups)) groups.welcome = true
if (!('left' in groups)) groups.left = false
if (!('detect' in groups)) groups.detect = false
if (!('mute' in groups)) groups.mute = false
if (!('antitoxic' in groups)) groups.antitoxic = false
if (!('antilink' in groups)) groups.antilink = true
if (!('antivirtex' in groups)) groups.antivirtex = true
if (!('antibot' in groups)) groups.antibot = false
if (!('antiviewonce' in groups)) groups.antiviewonce = false
if (!('antihidetag' in groups)) groups.antihidetag = false
if (!('antidelete' in groups)) groups.antidelete = false
if (!('antiedited' in groups)) groups.antiedited = false
if (!isNumber(groups.expired)) groups.expired = Date.now() + toMs('7d')
if (!('sewa' in groups)) groups.sewa = { status: false, expired: 0 }
if (!('absen' in groups)) groups.absen = {};
if (!('list' in groups)) groups.list = [];
if (!('blacklist' in groups)) groups.blacklist = [];
if (!('member' in groups)) groups.member = [];
} else {
global.db.groups[from] = {
jid: from,
name: '-', 
tekswelcome: global.tekswelcome,
teksleft: global.teksleft,
welcome: true,
left: false,
detect: false,
mute: false, 
antitoxic: false, 
antilink: true, 
antivirtex: true,
antibot: false,
antiviewonce: false,
antihidetag: false,
antidelete: false,
antiedited: false,
expired: Date.now() + toMs('7d'),
sewa: { status: false, expired: 0 },
absen: {},
list: [],
blacklist: [],
member: []
}
}
}

// DATABASE SETTING
let settings = global.db.setting
if (typeof settings !== 'object') global.db.setting = {}
if (settings) {
if (!('typefile' in settings)) settings.typefile = 'document'
if (!('prefix' in settings)) settings.prefix = '.'
if (!('multiprefix' in settings)) settings.multiprefix = false
if (!('online' in settings)) settings.online = true
if (!('verify' in settings)) settings.verify = false
if (!('self' in settings)) settings.self = false
if (!('maintenance' in settings)) settings.maintenance = false
if (!('gconly' in settings)) settings.gconly = false
if (!('autosticker' in settings)) settings.autosticker = false
if (!('autoread' in settings)) settings.autoread = true
if (!('autoblockcmd' in settings)) settings.autoblockcmd = false
if (!('anticall' in settings)) settings.anticall = true
if (!('antispam' in settings)) settings.antispam = true
if (!('fakereply' in settings)) settings.fakereply = true
if (!('autolevelup' in settings)) settings.autolevelup = true
if (!('owner' in settings)) settings.owner = [...global.devs]
if (!('packname' in settings)) settings.packname = 'ᴄʀᴇᴀᴛᴇ ʙʏ ᴍᴇᴄʜᴀ ʙᴏᴛ\n\nᴄʀᴇᴀᴛᴇᴅ ᴀᴛ :\n+week, +date\n+time WIB\n\nsewa bot?\n+62 882-0033-21562'
if (!('author' in settings)) settings.author = ' \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
if (!('cover' in settings)) settings.cover = 'https://telegra.ph/file/66ea637e36d49f218e4d1.jpg'
if (!('link' in settings)) settings.link = 'https://whatsapp.com/channel/0029VaU3j0z2ER6liR0MY601'
if (!isNumber(settings.gamewaktu)) settings.gamewaktu = 60
if (!isNumber(settings.bmin)) settings.bmin = 1000
if (!isNumber(settings.bmax)) settings.bmax = 3000
if (!isNumber(settings.timer)) settings.timer = 1800000
if (!isNumber(settings.limit)) settings.limit = 15
if (!isNumber(settings.hargalimit)) settings.hargalimit = 1000
if (!isNumber(settings.lastreset)) settings.lastreset = Date.now()
if (!isNumber(settings.ctoxic)) settings.ctoxic = 15
if (!('toxic' in settings)) settings.toxic = ['ajg', 'anjink', 'anjg', 'anjk', 'anjim', 'anjing', 'anjrot', 'anying', 'asw', 'autis', 'babi', 'bacod', 'bacot', 'bagong', 'bajingan', 'bangsad', 'bangsat', 'bastard', 'bego', 'bgsd', 'biadab', 'biadap', 'bitch', 'bngst', 'bodoh', 'bokep', 'cocote', 'coli', 'colmek', 'comli', 'dajjal', 'dancok', 'dongo', 'fuck', 'goblog', 'goblok', 'guoblog', 'guoblok', 'henceut', 'idiot', 'jancok', 'jembut', 'jingan', 'kafir', 'kanjut', 'keparat', 'kntl', 'kontol', 'lonte', 'meki', 'memek', 'ngentod', 'ngentot', 'ngewe', 'ngocok', 'ngtd', 'njeng', 'njing', 'njinx', 'pantek', 'pantek', 'peler', 'pepek', 'pler', 'pucek', 'puki', 'pukimak', 'setan', 'silit', 'telaso', 'tempek', 'tete', 'titit', 'toket', 'tolol', 'tomlol']
if (!('blockcmd' in settings)) settings.blockcmd = [];
} else {
global.db.setting = {
typefile: 'document',
prefix: '.',
multiprefix: false,
online: true,
verify: true,
self: false,
maintenance: false,
gconly: false,
autosticker: false,
autoread: true,
autoblockcmd: false,
anticall: true,
antispam: true,
fakereply: true,
autolevelup: true,
owner: [...global.devs],
packname: 'ᴄʀᴇᴀᴛᴇ ʙʏ ᴍᴇᴄʜᴀ ʙᴏᴛ\n\nᴄʀᴇᴀᴛᴇᴅ ᴀᴛ :\n+week, +date\n+time WIB\n\nsewa bot?\n+62 882-0033-21562',
author: ' \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
cover: 'https://telegra.ph/file/66ea637e36d49f218e4d1.jpg',
link: 'https://whatsapp.com/channel/0029VaU3j0z2ER6liR0MY601',
gamewaktu: 60,
bmin: 1000,
bmax: 3000,
timer: 1800000,
limit: 15,
hargalimit: 1000,
lastreset: Date.now(),
ctoxic: 15,
toxic: ['ajg', 'anjink', 'anjg', 'anjk', 'anjim', 'anjing', 'anjrot', 'anying', 'asw', 'autis', 'babi', 'bacod', 'bacot', 'bagong', 'bajingan', 'bangsad', 'bangsat', 'bastard', 'bego', 'bgsd', 'biadab', 'biadap', 'bitch', 'bngst', 'bodoh', 'bokep', 'cocote', 'coli', 'colmek', 'comli', 'dajjal', 'dancok', 'dongo', 'fuck', 'goblog', 'goblok', 'guoblog', 'guoblok', 'henceut', 'idiot', 'jancok', 'jembut', 'jingan', 'kafir', 'kanjut', 'keparat', 'kntl', 'kontol', 'lonte', 'meki', 'memek', 'ngentod', 'ngentot', 'ngewe', 'ngocok', 'ngtd', 'njeng', 'njing', 'njinx', 'pantek', 'pantek', 'peler', 'pepek', 'pler', 'pucek', 'puki', 'pukimak', 'setan', 'silit', 'telaso', 'tempek', 'tete', 'titit', 'toket', 'tolol', 'tomlol'],
blockcmd: []
}
}

} catch (e) {
console.error(e);
}
}

global.reloadFile(__filename)