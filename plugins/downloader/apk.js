exports.run = {
  usage: ['apk', 'apkdl'],
  use: 'nama aplikasi',
  category: 'downloader',
  async: async (m, { func, mecha }) => {
    switch (m.command) {
      case 'apk': {
        if (!m.text) return m.reply(func.example(m.cmd, 'pou'));
        mecha.sendReact(m.chat, '🕒', m.key)
        try {
          let res = await func.fetchJson(`https://api.maher-zubair.tech/search/apk?q=${encodeURIComponent(m.text)}`);
          if (res.status && res.result.length > 0) {
            let body = '```Result from:```' + ' `' + m.text + '`';
            let rows = [];
            for (let [index, data] of res.result.entries()) {
              if (!data.name || !data.id) continue;
              rows.push({
                title: `${index + 1}. ${data.name}`,
                id: `${m.prefix}apkdl ${data.id}`
              });
            }
            let sections = [{
              title: 'Hasil Pencarian',
              rows: rows
            }];
            let buttons = [
              ['list', 'Click Here ⎙', sections],
            ];
            mecha.sendButton(m.chat, `A P K - S E A R C H`, body, 'select the list button below.', buttons, m, {
              userJid: m.sender,
              expiration: m.expiration
            });
          } else {
            m.reply('Tidak ada hasil yang ditemukan.');
          }
        } catch (err) {
          console.error(err);
          m.reply(global.mess.error.api);
          mecha.sendReact(m.chat, '☑️', m.key)
        }
      }
      break;
      
      case 'apkdl': {
        if (!m.text) return m.reply(func.example(m.cmd, 'com.miniclip.eightballpool'));
        mecha.sendReact(m.chat, '🕒', m.key)
        try {
          let res = await func.fetchJson(`https://api.maher-zubair.tech/download/apk?id=${m.args[0]}`);
          
          if (res.result.name && res.status) {
            let caption = `Package: ${res.result.package}\nSize: ${res.result.size}\nPublished: ${res.result.lastup}\n\n© Delta-BOT`;
            await mecha.sendMedia(m.chat, res.result.dllink, m, { caption: caption, fileName: `${res.result.name}.apk` });
          } else {
            m.reply(global.mess.error.api);
          }
        } catch (err) {
          console.error(err);
          m.reply(func.jsonFormat(err));
          mecha.sendReact(m.chat, '☑️', m.key)
        }
      }
      break;
    }
  },
  premium: true, // Hanya member premium yang dapat mengakses fitur ini
  limit: 5
}
