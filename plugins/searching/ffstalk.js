const axios = require('axios');

// STALKER FF
const stalkff = async(id) => {
return new Promise(async (resolve, reject) => {
axios.post('https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
new URLSearchParams(
Object.entries({
productId: '3',
itemId: '353',
catalogId: '376',
paymentId: '2037',
gameId: id,
product_ref: 'REG',
product_ref_denom: 'AE',
})
),
{
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
Referer: 'https://www.duniagames.co.id/',
Accept: 'application/json',
},
}
)
.then((response) => {
resolve({
status: 200,
creator: 'Surya',
id: id,
nickname: response.data.data.gameDetail.userName
})
})
.catch((err) => {
resolve({
status: 404,
creator: 'Surya',
msg: 'User Id Not Found'
})
})
})
}

exports.run = {
usage: ['ffstalk'],
hidden: ['stalkff'],
use: 'id free fire',
category: 'searching',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(func.example(m.cmd, '382948365'))
await stalkff(Number(m.args[0])).then(data => {
if (data.status == 404) return m.reply('Error ID tidak ditemukan\nSilahkan kirim ID yang valid!')
let txt = '乂  *STALKER FREE FIRE*\n'
txt += `\n◦  *ID:* ${m.args[0]}`
txt += `\n◦  *Username:* ${data.nickname}`
m.reply(txt)
})
},
limit: true
}