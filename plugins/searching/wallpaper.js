exports.run = {
  usage: ['motor', 'boneka-chucky', 'anjing', 'kucing', 'cogan', 'cogan2', 'cecan','cecan2', 'kartun', 'kpop', 'justina', 'cyberspace', 'mountain', 'progaming', 'gaming', 'teknologi', 'tatasurya', 'aesthetic','islami', 'katakata', 'pubg', 'hacker', 'wallhp', 'wallhp2', 'mobil'],
  category: 'wallpaper',
  async: async (m, { func, mecha, mime, quoted, makeid, command, setting }) => {
    mecha.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
    try {
      let foto;
      switch (command) {
        case 'cyberspace':
          foto = `https://api.betabotz.eu.org/api/wallpaper/cyberspace?apikey=UZUgfL7u`;
          break;
        case 'mountain':
          foto = `https://api.betabotz.eu.org/api/wallpaper/mountain?apikey=UZUgfL7u`;
          break;
         case 'progaming':
          foto = `https://api.betabotz.eu.org/api/wallpaper/programing?apikey=UZUgfL7u`;
          break;
         case 'gaming':
          foto = `https://api.betabotz.eu.org/api/wallpaper/gaming?apikey=UZUgfL7u`;
          break;
         case 'teknologi':
          foto = `https://api.betabotz.eu.org/api/wallpaper/teknologi?apikey=UZUgfL7u`;
          break;
         case 'tatasurya':
          foto = `https://api.betabotz.eu.org/api/wallpaper/tatasurya?apikey=UZUgfL7u`;
          break;
         case 'aesthetic':
          foto = `https://api.betabotz.eu.org/api/wallpaper/aesthetic?apikey=UZUgfL7u`;
          break;
         case 'islami':
          foto = `https://api.betabotz.eu.org/api/wallpaper/islami?apikey=UZUgfL7u`;
          break;
         case 'katakata':
          foto = `https://api.betabotz.eu.org/api/wallpaper/katakata?apikey=UZUgfL7u`;
          break;
         case 'pubg':
          foto = `https://api.betabotz.eu.org/api/wallpaper/pubg?apikey=UZUgfL7u`;
          break;
         case 'hacker':
          foto = `https://api.betabotz.eu.org/api/wallpaper/hacker?apikey=UZUgfL7u`;
          break;
         case 'wallhp':
          foto = `https://api.betabotz.eu.org/api/wallpaper/wallhp?apikey=UZUgfL7u`;
          break;
         case 'wallhp2':
          foto = `https://api.betabotz.eu.org/api/wallpaper/wallhp2?apikey=UZUgfL7u`;
          break;
         case 'mobil':
          foto = `https://api.betabotz.eu.org/api/wallpaper/mobil?apikey=UZUgfL7u`;
          break;
         case 'motor':
          foto = `https://api.betabotz.eu.org/api/wallpaper/motor?apikey=UZUgfL7u`;
          break;
         case 'boneka-chucky':
          foto = `https://api.betabotz.eu.org/api/wallpaper/boneka-chucky?apikey=UZUgfL7u`;
          break;
         case 'anjing':
          foto = `https://api.betabotz.eu.org/api/wallpaper/anjing?apikey=UZUgfL7u`;
          break;
         case 'kucing':
          foto = `https://api.betabotz.eu.org/api/wallpaper/kucing?apikey=UZUgfL7u`;
          break;
         case 'cogan':
          foto = `https://api.betabotz.eu.org/api/wallpaper/cogan?apikey=UZUgfL7u`;
          break;
         case 'cogan2':
          foto = `https://api.betabotz.eu.org/api/wallpaper/cogan2?apikey=UZUgfL7u`;
          break;
         case 'cecan':
          foto = `https://api.betabotz.eu.org/api/wallpaper/cecan?apikey=UZUgfL7u`;
          break;
         case 'cecan2':
          foto = `https://api.betabotz.eu.org/api/wallpaper/cecan2?apikey=UZUgfL7u`;
          break;
         case 'kartun':
          foto = `https://api.betabotz.eu.org/api/wallpaper/kartun?apikey=UZUgfL7u`;
          break;
         case 'kpop':
          foto = `https://api.betabotz.eu.org/api/wallpaper/kpop?apikey=UZUgfL7u`;
          break;
         case 'justina':
          foto = `https://api.betabotz.eu.org/api/wallpaper/justina?apikey=UZUgfL7u`;
          break;
        default:
          return m.reply('Perintah tidak valid. Gunakan: china atau vietnam.');
      }
      await mecha.sendFile(m.chat, foto, '', global.mess.ok, m, { quoted: m });
      mecha.sendMessage(m.chat, { react: { text: `☑️`, key: m.key }});
    } catch (e) {
      console.error(e);
      await mecha.sendMessage(m.chat, { text: `───「 *SYSTEM ERROR* 」───\n\nTerjadi kesalahan: ${e.message}`, quoted: m });
    }
  },
  premium: false,
  limit: 5
};