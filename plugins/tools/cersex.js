exports.run = {
  usage: ['cersex'],
  category: 'cerpen',
  async: async (m, { func, mecha, command }) => {
    m.reply(global.mess.wait)
    try {
      let res = await func.fetchJson(`https://api.betabotz.eu.org/api/webzone/cersex?apikey=UZUgfL7u`)
      if (!res.status) return m.reply(global.mess.error.api)
      
      let cap = `◦ *Title:* ${res.result.title}
◦ *Tanggal:* ${res.result.tanggal}\n
${res.result.cerita}`;

      mecha.sendMessageModify(m.chat, cap, m, {
        title: '乂  C E R S E X  乂',
        body: '',
        thumbnail: await func.fetchBuffer(res.result.thumb),
        largeThumb: true
      });
    } catch (error) {
      m.reply(global.mess.error.api)
    }
  },
  premium: true,
  limit: 3
}