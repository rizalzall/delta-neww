/*
* Nama Pengembang: Jabal Surya
* Kontak Whatsapp: wa.me/62882003321562
* Kontak Telegram: t.me/surya_skylark
* Akun Instagram: surya_skylark05
* Catatan: tolong laporkan kepada saya jika anda menemukan ada yang menjual script ini tanpa seizin saya.
*/

const fs = require('fs');
const path = require('path');
const stable = require('json-stable-stringify');

let Database = class Database {
data = {}
file = path.join(process.cwd(), 'database', 'database.json')

read = async () => {
let database
if (fs.existsSync(this.file)) {
database = JSON.parse(fs.readFileSync(this.file))
} else {
fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
database = this.data
}

return database;
}

save = async data => {
this.data = data ? data : global.db;
let dirname = path.dirname(this.file)
if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true })
fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
fs.writeFileSync(`./database/database.bak`, stable(this.data))
return this.file
}
}

module.exports = Database