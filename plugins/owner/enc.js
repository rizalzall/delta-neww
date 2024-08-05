const axios = require('axios');

exports.run = {
  usage: ['enc'],
  use: 'kode',
  category: 'owner',
  async: async (m, { func, mecha, command }) => {
    if (!m.quoted || !m.quoted.text) {
      return m.reply('Harap balas pesan yang berisi teks untuk dienkripsi.');
    }

    const requestData = {
      difficulty: 'medium', // low, medium, high
      content: m.quoted.text, // code
    };

    try {
      let response = (await axios.post('https://suryadev.vercel.app/api/obfus', requestData)).data.result;
      
      m.reply(response);
      await mecha.sendReact(m.chat, '✅', m.key);
    } catch (e) {
      console.error('Error:', e);
      m.reply('Internal Error: ' + e.message);
    }
  },
  owner: true,
  limit: 3
};
