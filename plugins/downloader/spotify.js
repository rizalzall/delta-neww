const fetch = require('node-fetch');

exports.run = {
  usage: ['spotify', 'spotifydl'],
  use: 'parameter',
  category: 'downloader',
  async: async (m, { func, mecha }) => {
    switch (m.command) {
      case 'spotify': {
        if (!m.text) return m.reply(func.example(m.cmd, 'Al-waqiah'));
        mecha.sendReact(m.chat, '⏱️', m.key);
        try {
          let res = await searchSpotifyTracks(m.text);
          if (res.length > 0) {
            let body = '```Result from:```' + ' `' + m.text + '`';
            let rows = [];
            for (let [index, data] of res.entries()) {
              if (!data.name || !data.external_urls.spotify) continue;
              rows.push({
                title: `${index + 1}. ${data.name}`,
                id: `${m.prefix}spotifydl ${data.external_urls.spotify}`,
                description: `- Artist: ${data.artists.map(artist => artist.name).join(', ')}\n- Release: ${data.album.release_date}`
              });
            }
            let sections = [{
              title: 'Hasil Pencarian',
              rows: rows
            }];
            let buttons = [
              ['list', 'Click Here ⎙', sections],
            ];
            await mecha.sendButton(m.chat, ` S P O T I F Y - S E A R C H`, body, 'select the list button below.', buttons, m, {
              userJid: m.sender,
              expiration: m.expiration
            });
          } else {
            m.reply('No results found.');
          }
        } catch (err) {
          console.error(err);
          m.reply(global.mess.error.api);
        }
        mecha.sendReact(m.chat, '☑️', m.key);
        break;
      }
      case 'spotifydl': {
        if (!m.text) return m.reply(func.example(m.cmd, 'https://open.spotify.com/track'));
        if (!func.isUrl(m.args[0]) || !m.args[0].includes('https://open.spotify.com/track')) return m.reply(global.mess.error.url);
        mecha.sendReact(m.chat, '⏱️', m.key);
        try {
          let res = await func.fetchJson(`https://itzpire.com/download/spotify?url=${m.args[0]}`);
          if (res.data.title && res.data.download) {
            let caption = `*Title* : ${res.data.title}\n*Artist* : ${res.data.artist}\n*Type* : ${res.data.type}\n*Duration* : ${res.data.duration}\n\n© Delta-BOT`;
            await mecha.sendMessageModify(m.chat, caption, m, {
              title: 'SPOTIFY PLAY',
              body: global.header,
              thumbnail: await (await fetch(res.data.image)).buffer(),
              largeThumb: true,
              expiration: m.expiration
            });
            await mecha.sendMessage(m.chat, {
              audio: {
                url: res.data.download
              },
              mimetype: 'audio/mpeg'
            }, { quoted: m, ephemeralExpiration: m.expiration });
          } else {
            m.reply(global.mess.error.api);
          }
        } catch (err) {
          console.error(err);
          m.reply(func.jsonFormat(err));
        }
        mecha.sendReact(m.chat, '☑️', m.key);
        break;
      }
    }
  },
  premium: true, // Hanya member premium yang dapat mengakses fitur ini
  limit: 5
};

async function searchSpotifyTracks(query) {
  const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }
    const data = await response.json();
    return data.access_token;
  };

  const accessToken = await getToken();
  const offset = 0;
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error('Failed to search Spotify tracks');
  }
  const data = await response.json();
  return data.tracks.items;
              }
