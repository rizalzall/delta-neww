const fetch = require('node-fetch');

exports.run = {
  usage: ['character'],
  hidden: ['char'],
  use: 'character anime',
  category: 'ai',
  async: async (m, { func, mecha, comand }) => {
    if (!m.text) return m.reply(func.example(comand, 'Delta'));

    let wait = await mecha.sendMessage(m.chat, { text: global.mess.wait }, { quoted: m, ephemeralExpiration: m.expiration });

    try {
      let response = await fetch(`https://skizo.tech/api/cai/search?apikey=zallzall&name=${encodeURIComponent(m.text)}&token=5cc35998a78c59a19c77d4da66bf7332337306e1`);
      let data = await response.json();

      if (!data.success) {
        return m.reply("Pencarian gagal, coba lagi nanti.");
      }

      let txt = `*CHARACTER SEARCH*\n\nResult From : ${m.text}\n`;

      data.result.forEach((item) => {
        txt += `\n\n• Document ID : ${item.document_id}`;
        txt += `\n• External ID : ${item.external_id}`;
        txt += `\n• Title : ${item.title || 'No Title'}`;
        txt += `\n• Greeting : ${item.greeting}`;
        txt += `\n• Avatar File Name : ${item.avatar_file_name}`;
        txt += `\n• Visibility : ${item.visibility}`;
        txt += `\n• Participant Name : ${item.participant__name}`;
        txt += `\n• Participant Interactions : ${item.participant__num_interactions}`;
        txt += `\n• User Username : ${item.user__username}`;
        txt += `\n• Priority : ${item.priority}`;
        txt += `\n• Search Score : ${item.search_score}`;
        txt += `\n»»————————————————><————————————————««`
      });

      await mecha.sendMessage(m.chat, { text: txt, edit: wait.key }, { quoted: m, ephemeralExpiration: m.expiration });
    } catch (error) {
      console.error(error);
      m.reply("Terjadi kesalahan saat mengambil data, coba lagi nanti.");
    }
  },
  limit: true
};