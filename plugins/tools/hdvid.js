const fs = require('fs');
const { exec } = require('child_process');

exports.run = {
  usage: ['hdvid'],
  hidden: ['hdvideo'],
  use: 'kirim/replay video',
  category: 'tools',
  async: async (m, { func, mecha, command, quoted }) => {
    if (/video\/(mp4|mpeg)/.test(quoted.mime)) {
      m.reply(global.mess.wait);
      try {
        const media = await mecha.downloadAndSaveMediaMessage(m);
        const output = 'output.mp4';

        exec(`ffmpeg -i ${media} -vf "unsharp=3:3:1.0,eq=brightness=0.05:contrast=1.2:saturation=1.1,hqdn3d=1.5:1.5:6:6" -vcodec libx264 -profile:v high -level 4.1 -preset slow -crf 18 -x264-params ref=4 -acodec copy -movflags +faststart ${output}`, async (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return m.reply(`Error: ${error.message}`);
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);

          await mecha.sendMessage(m.chat, { caption: `*SUCCESS*`, video: { url: output } }, { quoted: m });

          fs.unlinkSync(output);
          fs.unlinkSync(media);
        });

      } catch (e) {
        return m.reply(String(e));
      }
    } else {
      m.reply(`Kirim/Reply video dengan caption ${m.cmd}`);
    }
  },
  premium: true,
  limit: 5
};