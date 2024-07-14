exports.run = {
  usage: ['ocr'],
  use: 'reply photo',
  category: 'convert',
  async: async (m, { func, mecha, quoted, mime }) => {
    if (/image|video/.test(mime)) {
      let wait = await mecha.sendMessage(m.chat, {text: mess.wait}, {quoted: m, ephemeralExpiration: m.expiration});
      let media = await mecha.downloadAndSaveMediaMessage(quoted);
      let anu = await func.telegraPh(media);
      let res = await func.fetchJson(`https://api.ocr.space/parse/imageurl?apikey=helloworld&url=${anu.url}`);
      
      // Periksa apakah ParsedResults ada dan tidak kosong
      if (res.ParsedResults && res.ParsedResults.length > 0) {
        let parsedText = res.ParsedResults[0].ParsedText; // Akses ParsedText dari elemen pertama array
        await mecha.sendMessage(m.chat, {text: parsedText, edit: wait.key }, {quoted: m, ephemeralExpiration: m.expiration});
      } else {
        m.reply('Failed to extract text from the image.');
      }
    } else {
      m.reply('Media is not supported.');
    }
  },
  limit: true
}