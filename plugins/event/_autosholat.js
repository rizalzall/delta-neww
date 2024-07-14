exports.run = {
main: async (m, { func, mecha, fkon }) => {
mecha.autosholat = mecha.autosholat ? mecha.autosholat : {};
let who = m.sender;
let name = await mecha.getName(who);
let id = m.chat;
if (id in mecha.autosholat) {
return false;
}
// jadwal sholat wilayah jakarta dan sekitarnya
let jadwalSholat = {
Subuh: '04:40',
Dhuhur: '12:00',
Ashar: '15:11',
Maghrib: '18:03',
Isya: '19:12',
};
let date = new Date(new Date().toLocaleString('en-US', {
timeZone: 'Asia/Jakarta'
}));
let hours = date.getHours();
let minutes = date.getMinutes();
let timeNow = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
if (timeNow === waktu) {
let txt = `Hai kak ${name},\nWaktu *${sholat}* telah tiba, ambilah air wudhu dan segeralah shalat.\n\n*${waktu}*\n_untuk wilayah Jakarta dan sekitarnya..._`;
mecha.autosholat[id] = [
await mecha.reply(m.chat, txt, fkon),
setTimeout(() => {
delete mecha.autosholat[id];
}, 60000)
];
}
}
}
}