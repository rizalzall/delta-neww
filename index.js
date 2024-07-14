/*
* Nama Pengembang: Jabal Surya
* Kontak Whatsapp: wa.me/62882003321562
* Kontak Telegram: t.me/surya_skylark
* Akun Instagram: surya_skylark05
* Catatan: tolong laporkan kepada saya jika anda menemukan ada yang menjual script ini tanpa seizin saya.
*/

const { spawn } = require('child_process');
const path = require('path');
const cfonts = require('cfonts')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const unhandledRejections = new Map()
process.on('unhandledRejection', (reason, promise) => {
unhandledRejections.set(promise, reason)
console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
process.on('rejectionHandled', (promise) => {
unhandledRejections.delete(promise)
})
process.on('Something went wrong', function(err) {
console.log('Caught exception: ', err)
})

function start() {
let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)]
let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
.on('message', data => {
if (data == 'reset') {
console.log('Restarting...')
p.kill()
delete p
}
})
.on('exit', code => {
console.error('Exited with code:', code)
start()
})
}

cfonts.say('MECHA BOT', {
font: 'tiny',
align: 'center',
colors: ['system']
}), start()