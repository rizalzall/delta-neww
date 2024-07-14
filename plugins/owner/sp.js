const fs = require('fs');
const path = require('path');

exports.run = {
    usage: ['saveplugin'],
    hidden: ['sp'],
    use: 'path + reply code',
    category: 'owner',
    async: async (m, { mecha, quoted }) => {
        if (!m.text) return m.reply('Mau simpan plugin di path apa?');
        if (!m.quoted) return m.reply('Mau simpan plugin dengan command apa? Reply teks script nya!');
        
        let data;
        if (/application\/javascript/.test(quoted.mime)) {
            data = await quoted.download();
        } else {
            data = quoted.text;
        }

        const filePath = path.join(process.cwd(), 'plugins', `${m.text}.js`);
        
        try {
            fs.writeFileSync(filePath, data);

            // Clear the require cache to allow re-requiring the file
            delete require.cache[require.resolve(filePath)];
            require(filePath);

            m.reply(`Plugin berhasil disimpan dan dimuat dari ${filePath}`);
        } catch (e) {
            const errorMessage = `[ERROR] ${new Date().toISOString()} error require plugin '${filePath}'\n${e.stack}`;
            console.error(errorMessage); // log error to console
            return m.reply(errorMessage); // send error message to user
        }
    },
    owner: true
};