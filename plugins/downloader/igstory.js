const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");

async function igStory(url) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://v3.igdownloader.app/api/ajaxSearch',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      },
      data: qs.stringify({
        recaptchaToken: '',
        q: url,
        t: 'media',
        lang: 'en'
      })
    });

    const $ = cheerio.load(response.data.data);
    const downloads = [];

    $('.download-items').each((index, element) => {
      const thumbnail = $(element).find('.download-items__thumb img').attr('src');
      const download = $(element).find('.download-items__btn a').attr('href');
      const title = $(element).find('.download-items__btn a').attr('title');

      downloads.push({
        title,
        thumbnail,
        download
      });
    });

    return downloads;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.run = {
  usage: ['instagramstory'],
  hidden: ['igstory'],
  use: 'link instagram story',
  category: 'downloader',
  async: async (m, { func, mecha, comand }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'https://www.instagram.com/'));
    if (!func.isUrl(m.args[0]) && !m.args[0].includes('instagram.com')) return m.reply(mess.error.url);
    m.reply(global.mess.wait);
    
    try {
      const res = await igStory(m.text);
      if (!res.length) throw 'Link Tidak Valid';
      let media = res[0].download;
      await mecha.sendMedia(m.chat, media, m, {
        caption: global.mess.ok,
        expiration: m.expiration
      });
    } catch (err) {
      m.reply(func.jsonFormat(err));
    }
  },
  premium: true,
  limit: 5
};