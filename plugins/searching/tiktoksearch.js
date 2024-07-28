exports.run = {
  usage: ['tiktoks'],
  hidden: ['gettt'],
  use: 'query',
  category: 'searching',
  async: async (m, { func, mecha }) => {
    switch (m.command) {
      case 'tiktoks': {
        if (!m.text) return m.reply(func.example(m.cmd, 'tobrut'));
        mecha.sendReact(m.chat, '🕒', m.key);
        try {
          let res = await func.fetchJson(`https://skizo.tech/api/tiktok-search?apikey=zallzall&keywords=${encodeURIComponent(m.text)}`);
          if (res && res.length > 0) {
            let body = '```Result from:```' + ' `' + m.text + '`';
            let rows = [];
            for (let [index, data] of res.entries()) {
              if (!data.title || !data.play) continue;
              rows.push({
                title: `${index + 1}. ${data.title}`,
                id: `${m.prefix}gettt ${data.play}`
              });
            }
            let sections = [{
              title: 'Hasil Pencarian',
              rows: rows
            }];
            let buttons = [
['list', 'Click Here ⎙', sections],
]
mecha.sendButton(m.chat, `T I K T O K - S E A R C H`, body, 'select the list button below.', buttons, m, {
userJid: m.sender,
expiration: m.expiration
})
          } else {
            m.reply('Tidak ada hasil yang ditemukan.');
          }
        } catch (err) {
          console.error(err);
          m.reply(`${err}`);
        }
      }
      break;

      case 'gettt': {
        if (!m.text) return m.reply(func.example(m.cmd, 'tobrut'));
        mecha.sendReact(m.chat, '🕒', m.key);
        try {
          let url = m.text;
          await mecha.sendMedia(m.chat, url, m, { fileName: 'tiktok_video' });
        } catch (err) {
          console.error(err);
          m.reply(`${err}`);
          mecha.sendReact(m.chat, '✅', m.key);
}
}
break
}
},
premium: true, // Hanya member premium yang dapat mengakses fitur ini
limit: 5
}
