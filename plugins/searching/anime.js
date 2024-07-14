exports.run = {
  usage: [
    'akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chitanda', 'chitoge', 'deidara', 'doraemon', 'elaina', 'emilia', 'erza', 'gremory', 'hestia', 'hinata', 'inori', 'itachi', 'isuzu', 'itori', 'kaga', 'kagura', 'kakasih', 'kaori', 'kaneki', 'kosaki', 'kotori', 'kuriyama', 'kuroha', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'natsukawa', 'neko2', 'nekohime', 'nezuko', 'nishimiya', 'onepiece', 'pokemon', 'rem', 'rize', 'sagiri', 'sakura', 'sasuke', 'shina', 'shinka', 'shizuka', 'shota', 'tomori', 'toukachan', 'tsunade', 'yatogami', 'yuki'
  ],
  category: 'anime',
  async: async (m, { mecha, text, func, command }) => {
    switch (m.command) {
      case 'akira':
      case 'akiyama':
      case 'anna':
      case 'asuna':
      case 'ayuzawa':
      case 'boruto':
      case 'chitanda':
      case 'chitoge':
      case 'deidara':
      case 'doraemon':
      case 'elaina':
      case 'emilia':
      case 'erza':
      case 'ogremory':
      case 'hestia':
      case 'hinata':
      case 'inori':
      case 'itachi':
      case 'isuzu':
      case 'itori':
      case 'kaga':
      case 'kagura':
      case 'kakasih':
      case 'kaori':
      case 'kaneki':
      case 'kosaki':
      case 'kotori':
      case 'kuriyama':
      case 'kuroha':
      case 'kurumi':
      case 'madara':
      case 'mikasa':
      case 'miku':
      case 'minato':
      case 'naruto':
      case 'natsukawa':
      case 'neko2':
      case 'nekohime':
      case 'nezuko':
      case 'nishimiya':
      case 'onepiece':
      case 'pokemon':
      case 'rem':
      case 'rize':
      case 'sagiri':
      case 'sakura':
      case 'sasuke':
      case 'shina':
      case 'shinka':
      case 'shizuka':
      case 'shota':
      case 'tomori':
      case 'toukachan':
      case 'tsunade':
      case 'yatogami':
      case 'yuki':
        let res = await func.fetchJson(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/${m.command}.json`);
        let cita = res[Math.floor(Math.random() * res.length)];
        mecha.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
        let button = [
['button', 'Next', m.command],
]
mecha.sendButton(m.chat, 'Done', header, footer, button, m, {
media: cita,
userJid: m.sender,
expiration: m.expiration
})
        mecha.sendMessage(m.chat, { react: { text: `☑️`, key: m.key }});
        break;
      default:
        mecha.sendMessage(m.chat, global.mess.norepo)
    }
  }
};