exports.run = {
  usage: ['waifusearch'],
  hidden: ['waifus'],
  use: 'text',
  category: 'searching',
  premium: true,
  async: async (m, { func, mecha, comand }) => {
    if (!m.text) return m.reply(func.example(comand, 'long hair'))
    m.reply(global.mess.wait)
    let data = await func.fetchJson('https://api.neoxr.eu/api/waifudiff?q=' + encodeURIComponent(m.text))
    if (!data.status || !data.data.url) return m.reply('Tidak ditemukan.')
    let result = data.data.url;
    let caption = `Hasil dari *${m.text}*\n\nImage Size: ${data.data.image_size}\nSteps: ${data.data.steps}\nSampler: ${data.data.sampler}\nPrompt: ${data.data.prompt}`;
    mecha.sendMessage(m.chat, { image: { url: result }, caption: caption }, { quoted: m });
  },
  restrict: true,
  limit: 5
}
