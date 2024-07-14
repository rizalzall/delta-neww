exports.run = {
  usage: ['bdsm', 'hentai', 'gangbang', 'hentaivideo', 'yuri', 'boobs', 'pussy', 'cosplay', 'blowjob', 'cum', 'neko'],
  category: 'nsfw',
  async: async (m, { func, mecha }) => {
    try {
      mecha.sendReact(m.chat, `⏱️`, m.key); // Mengirim indikator loading

      let mediaUrl;
      let caption = global.mess.ok;

      switch (m.command) {
        case 'hentaivideo':
          mediaUrl = `https://api.fgmods.xyz/api/nsfw-nime/hentai-mp4?apikey=Mv8aIpBr`;
          break;
        case 'bdsm':
          mediaUrl = `https://api.betabotz.eu.org/api/nsfw/bdsm?apikey=UZUgfL7u`;
          break;
        case 'gangbang':
          mediaUrl = `https://api.betabotz.eu.org/api/nsfw/gangbang?apikey=UZUgfL7u`;
          break;
        case 'yuri':
          mediaUrl = `https://api.fgmods.xyz/api/nsfw-nime/yuri?apikey=Mv8aIpBr`;
          break;
        case 'boobs':
          mediaUrl = `https://api.fgmods.xyz/api/nsfw/boobs?apikey=Mv8aIpBr`;
          break;
        case 'pussy':
          mediaUrl = `https://api.fgmods.xyz/api/nsfw/pussy?apikey=Mv8aIpBr`;
          break;
        case 'cosplay':
          mediaUrl = `https://api.fgmods.xyz/api/nsfw/cosplay?apikey=Mv8aIpBr`;
          break;
        case 'blowjob':
          mediaUrl = `https://api.fgmods.xyz/api/nsfw-nime/blowjob?apikey=Mv8aIpBr`;
          break;
        case 'cum':
          mediaUrl = `https://api.fgmods.xyz/api/nsfw-nime/cum?apikey=Mv8aIpBr`;
          break;
        case 'neko':
          mediaUrl = `https://api.fgmods.xyz/api/nsfw-nime/xneko?apikey=Mv8aIpBr`;
          break;
        case 'hentai':
          mediaUrl = `https://skizo.tech/api/nsfw?apikey=zallzall&image=waifu`;
          break;
        default:
          return m.reply('Perintah tidak valid. Gunakan: bdsm, hentai, gangbang, hentaivideo, yuri, boobs, pussy, cosplay, blowjob, cum, neko.');
      }

      // Menyiapkan data untuk tombol
      let button = [['button', 'Next', m.command]];
      
      // Mengirim pesan dengan tombol
      mecha.sendButton(m.chat, caption, header, footer, button, m, {
        media: mediaUrl,
        userJid: m.sender,
        expiration: m.expiration
      });

      mecha.sendReact(m.chat, `☑️`, m.key); // Mengirim indikator selesai
    } catch (e) {
      console.error(e);
      await mecha.sendMessage(m.chat, { text: `Terjadi kesalahan: ${e.message}`, quoted: m });
    }
  },
  premium: true,
  limit: 5
};