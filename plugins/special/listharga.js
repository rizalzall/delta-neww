exports.run = {
usage: ['listharga', 'sewabot', 'buyprem'],
category: 'special',
async: async (m, { mecha, setting, command }) => {
let value = m.args[0]?.toLowerCase();
let caption;
if (value === 'premium' || command === 'buyprem') {
caption =  `*LIST HARGA PREMIUM*

*Paket P1*
- Rp5.000 / 7 Day
- Perpanjang Rp2.500
- Unlock Feature Premium
- 1.000.000 Balance
- 1.000 Limit

*Paket P2*
- Rp10.000 / 15 Day
- Perpanjang Rp5.000
- Unlock Feature Premium
- 10.000.000 Balance
- 2.000 Limit

*Paket P3*
- Rp20.000 / 30 Day
- Perpanjang Rp10.000
- Unlock Feature Premium
- 100.000.000 Balance
- 3.000 Limit

*Paket P4*
- Rp50.000 / 90 Day
- Perpanjang Rp25.000
- Unlock Feature Premium
- 500.000.000 Balance
- 5.000 Limit

*PAYMENT*
• Dana : 081333154367
• Ovo : 081333154367
• Gopay : 081333154367
• Pulsa : 081333154367
• QRIS (All Payment)

*INFORMATION*
1. Melakukan pembelian artinya anda setuju dengan segala kebijakan kami.
2. Semua pembelian bergaransi.
3. Tidak puas dengan layanan kami? Kami kembalikan uang Anda 100% dalam jangka waktu 1 jam setelah pembelian.
4. Jika bot mengalami kendala atau perbaikan hingga 24 jam atau lebih, kami berikan kompensasi berupa penambahan waktu sewa.
5. Perpanjangan hanya berlaku jika masa aktif tersisa kurang dari 3 hari.

Berminat? Hubungi :
wa.me/6281333154367`
} else if (value === 'sewa' || command === 'sewabot') {
caption = `*LIST HARGA SEWA BOT*

*Paket S1*
- Rp10.000 / Group
- Perpanjang Rp5000
- Masa aktif 15 Hari

*Paket S2*
- Rp20.000 / Group
- Perpanjang Rp15.000
- Masa aktif 1 Bulan

*Paket S3*
- Rp30.000 / Group
- Perpanjang Rp25.000
- Masa aktif 2 Bulan

*Paket S4*
- Rp50.000 / Group
- Perpanjang Rp45.000
- Masa aktif 5 Bulan

*KEUNTUNGAN*
- Fast respon
- Bot on 24 jam
- Antilink (auto kick yg kirim link)
- Antivirtex (auto kick yg kirim virtex)
- Welcome (menyambut member baru)
- Games
- Menfess
- Downloader
- Ai (artificial intelligence)
- Dan masih banyak lagi

*PAYMENT*
• Dana : 081333154367
• Ovo : 081333154367
• Gopay : 081333154367
• Pulsa : 081333154367
• QRIS (All Payment)

*INFORMATION*
1. Melakukan pembelian artinya anda setuju dengan segala kebijakan kami.
2. Semua pembelian bergaransi.
3. Tidak puas dengan layanan kami? Kami kembalikan uang Anda 100% dalam jangka waktu 1 jam setelah pembelian.
4. Jika bot mengalami kendala atau perbaikan hingga 24 jam atau lebih, kami berikan kompensasi berupa penambahan waktu sewa.
5. Perpanjangan hanya berlaku jika masa aktif tersisa kurang dari 3 hari.

Berminat? Hubungi :
wa.me/6281333154367`
} else {
caption = `Format salah!

ketik *${m.prefix}listharga premium* untuk menampilkan list harga premium.
ketik *${m.prefix}listharga sewa* untuk menampilkan list harga sewabot.`
return mecha.sendteks(m.chat, caption, m)
}
mecha.sendMessage(m.chat, {image: {url: 'https://telegra.ph/file/c093fc0ec54794cbe71bc.jpg'}, caption: caption}, {quoted: m, ephemeralExpiration: m.expiration});
/*mecha.sendMessageModify(m.chat, caption, m, {
thumbUrl: setting.cover, 
largeThumb: true,
ads: true
})*/
}
}