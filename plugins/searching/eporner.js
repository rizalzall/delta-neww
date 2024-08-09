const axios = require('axios');
const cheerio = require('cheerio');

exports.run = {
  usage: ['eporner'],
  category: 'searching',
  async: async (m, { func, mecha, comand, text }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'hardcore'));
    if (m.text.startsWith('@62')) return m.reply('Stress ??');
mecha.sendReact(m.chat, '🕒', m.key)
try {
    let res = await scrapeEporner(`https://www.eporner.com/search/${encodeURIComponent(m.text)}/`);
    res = res.map((v) => `*Title:* ${v.title}\n*Views:* ${v.views}\n*Duration:* ${v.duration}\n*Rating:* ${v.rating}\n*Link:* ${v.link}`).join('\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n');
    await mecha.sendMessage(m.chat, { text: res }, { quoted: m, ephemeralExpiration: m.expiration });
} catch (err) { 
      console.error(err); 
      m.reply(`${err}`);
mecha.sendReact(m.chat, '✅', m.key)
}
  },
  limit: 3
}


const scrapeEporner = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    
    const $ = cheerio.load(data);
    const results = [];

    $('.mb').each((i, element) => {
      const title = $(element).find('.mbtit a').text().trim();
      const link = $(element).find('.mbtit a').attr('href');
      const duration = $(element).find('.mbtim').text().trim();
      const rating = $(element).find('.mbrate').text().trim();
      const views = $(element).find('.mbvie').text().trim();

      results.push({
        title,
        link: `https://www.eporner.com${link}`,
        duration,
        rating,
        views
      });
    });

    return results;

  } catch (error) {
    console.error(`Error: ${error}`);
    return [];
  }
};