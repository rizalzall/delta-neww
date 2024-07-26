const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function webpToVideo(bufferImage) {
  return new Promise((resolve, reject) => {
    try {
      let pathFile = "./sampah/" + ~~(Math.random() * 1000000 + 1) + ".webp";
      fs.writeFileSync(pathFile, bufferImage);
      exec(`convert ${pathFile} ${pathFile}.gif`, (error) => {
        if (error) return reject(error);
        exec(`ffmpeg -i ${pathFile}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${pathFile}.mp4`, (error) => {
          if (error) return reject(error);
          if (!fs.existsSync(pathFile + ".gif") || !fs.existsSync(pathFile + ".mp4")) {
            reject("Failed convert file!");
            fs.unlinkSync(pathFile);
            return;
          }
          let videoBuffer = fs.readFileSync(pathFile + ".mp4");
          fs.unlinkSync(pathFile);
          fs.unlinkSync(pathFile + ".gif");
          fs.unlinkSync(pathFile + ".mp4");
          resolve(videoBuffer);
        });
      });
    } catch (e) {
      reject(e);
    }
  });
}

exports.run = {
  usage: ['tovideo'],
  hidden: ['tomp4'],
  use: 'reply sticker',
  category: 'convert',
  async: async (m, { func, mecha, quoted }) => {
    try {
      if (!global.support.convert && !global.support.magick && !global.support.gm) {
        return m.reply('This feature does not work because imagemagick is not installed.');
      }
      if (/webp/.test(quoted.mime)) {
        m.reply(global.mess.wait);
        let media = await quoted.download();
        let videoBuffer = await webpToVideo(media);
        await mecha.sendMessage(m.chat, { video: videoBuffer, caption: 'Convert Webp To Video' }, { quoted: m, ephemeralExpiration: m.expiration });
      } else {
        m.reply(`Reply sticker nya dengan caption ${m.cmd}`);
      }
    } catch (error) {
      console.error(error);
      m.reply(`Terjadi Kesalahan: ${error}`);
    }
  },
  limit: 5
};
