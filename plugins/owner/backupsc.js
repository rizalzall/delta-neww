const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

exports.run = {
usage: ['backupsc'],
hidden: ['backupme'],
category: 'owner',
async: async (m, { func, mecha }) => {
if ([global.owner, ...global.devs].includes(m.sender)) {
mecha.sendReact(m.chat, '', m.key)
try {
let backupName = `backup_${new Date().toISOString().replace(/:/g, '-')}.zip`
let output = fs.createWriteStream(backupName);
let archive = archiver('zip', { zlib: { level: 9 } });
archive.pipe(output);
archive.on('warning', function (err) {
if (err.code === 'ENOENT') {
console.warn(err);
} else {
throw err;
}
});
archive.glob('**/*', {
cwd: process.cwd(),
ignore: ['node_modules/**/*', 'sampah/**/*', 'core/**', '.cache/**', '.config/**', '.npm/**', '.pm2/**', backupName]
});
await archive.finalize()
let caption = `Berikut adalah file backup kode bot:\nNama file: ${backupName}\nUkuran file: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`
await mecha.sendMessage(global.owner, {
document: {
url: `./${backupName}`
},
caption: caption,
mimetype: 'application/zip', 
fileName: backupName
}, {quoted: m, ephemeralExpiration: m.expiration})
.then(_ => fs.unlinkSync(backupName));
} catch (error) {
console.error(error)
m.reply('Terjadi kesalahan saat membuat backup :\n\n' + String(error));
}
}
}
}