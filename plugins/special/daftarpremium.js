exports.run = {
usage: ['daftarpremium'],
hidden: ['daftarprem'],
category: 'special',
async: async (m, { func, mecha }) => {
let body = 'Jika kamu ingin menjadi Pengguna Premium, kamu cukup membayar Rp5.000 untuk 1 minggu, Rp10.000 untuk 15 hari, Rp20.000 untuk 1 bulan dan Rp.30.000 untuk 2 bulan.\nPembayaran bisa melalui Pulsa/Dana/Ovo/Gopay/QRIS (All Payment)'
let txt = 'Jika berminat silahkan klik tombol dibawah'
let button = [
['button', 'Buy Premium', `${m.prefix}buyprem`]
]
mecha.sendButton(m.chat, '', body, txt, button, m, {
userJid: m.sender,
expiration: m.expiration
})
}
}