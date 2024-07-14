exports.run = {
usage: ['hadis'],
hidden: ['hadist'],
use: 'bukhari 1',
category: 'islamic',
async: async (m, { func, mecha, comand }) => {
if (!m.args[0]) return m.reply(`Contoh: ${comand} bukhari 1\n\n*Pilihan tersedia:*\nabu-daud (1 - 4590)\nahmad (1 - 26363)\nbukhari (1 - 7008)\ndarimi (1 - 3367)\ntirmidzi (1 - 3891)\nibnu-majah (1 - 4331)\nnasai (1 - 5662)\nmalik (1 - 1594)\nmuslim (1 - 5362)`)
if (!m.args[1]) return m.reply(`Hadis yang ke berapa?\n\ncontoh:\n${comand} muslim 1`)
if (isNaN(m.args[1])) return m.reply(`Nomor harus berupa angka!\n\ncontoh:\n${comand} muslim 1`)
await func.fetchJson(`https://api.dhamzxploit.my.id/api/hadits?kitab=${m.args[0]}&nomor=${m.args[1]}`).then(async res => {
if (res.result.code !== 200) return m.reply(res.result.message)
await m.reply(`${res.result.data.name} No. ${res.result.data.contents.number}\n\n${res.result.data.contents.arab}\n\n*Artinya:* ${res.result.data.contents.id}`)
})
}
}