/**
  * Made by MannR
  * ini wm njirr jan didelete
  * https://whatsapp.com/channel/0029VaGqCO6I1rcjc9hisJ3U
**/
const fs = require("fs");

exports.run = {
  usage: ['getfile'],
  category: 'owner',
  async: async (m, { text, mecha, func, usedPrefix, command }) => {
    if (!m.text) return m.reply(func.example(m.cmd, 'simple.js'));

    const filePath = `./${m.text}`;

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return m.reply(`File ${m.text} tidak ditemukan di direktori ./`);
    }

    try {
      const fileContent = fs.readFileSync(filePath).toString();
      m.reply(fileContent);
    } catch (err) {
      m.reply(func.jsonFormat(err));
    }
  },
  owner: true,
  limit: false
};