const axios = require('axios');
const fetch = require('node-fetch');
const { format } = require('util');

exports.run = {
  usage: ['get'],
  use: 'url',
  category: 'owner',
  async: async (m, { func, mecha }) => {
    try {
      if (m.quoted || m.text) {
        let url = m.quoted ? m.quoted.text : m.text ? m.text : '';
        if (!/^https?:\/\//.test(url)) return m.reply('Masukkan link dengan awalan dengan http:// atau https://');
        
        let _url = new URL(url);
        let res = await fetch(_url.href);
        
        if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
          throw new Error(`Content-Length: ${res.headers.get('content-length')}`);
        }

        if (!/text|json/.test(res.headers.get('content-type'))) {
          return mecha.sendMedia(m.chat, _url, m, { caption: url, fileName: 'file', ephemeralExpiration: m.expiration });
        }

        let txt = await res.buffer();

        try {
          txt = format(JSON.parse(txt.toString()));
        } catch (e) {
          txt = txt.toString();
        } finally {
          m.reply(txt.slice(0, 65536));
        }
      } else {
        m.reply('Masukkan url nya!');
      }
    } catch (error) {
      m.reply(`Terjadi kesalahan: ${error.message}`);
    }
  },
  owner: true
};
