exports.run = {
    usage: ['filter'],
    use: 'reply photo',
    category: 'ai',
    async: async (m, { func, mecha, mime, quoted, makeid, comand, setting }) => {
        if (/image\/(jpe?g|png)/.test(mime)) {
            const availableFilters = [
                "anime_2d", "yearbook", "romance_comic", "only_goth", "anime_custom",
                "realistic_custom", "horror_night", "superhero_comic", "watercolor",
                "starry_girl", "maid_dressing", "vintage_newspaper", "cartoon_3d",
                "egyptian_pharaoh", "doodle", "pirate_tale", "dead_festival",
                "pretty_soldier", "pixelart", "dark_gothic", "school_days",
                "marimo_ronin", "christmas_anime", "biohazard", "random_style",
                "bizarre_journey", "santa_costume", "fire_fist", "2d_anime"
            ];

            const filter = m.text.split(' ')[1];
            if (!availableFilters.includes(filter)) {
                return m.reply(`Filter tidak ditemukan. Daftar filter yang tersedia:\n${availableFilters.join(', ')}`);
            }

            m.reply(global.mess.wait);
            try {
                let media = await mecha.downloadAndSaveMediaMessage(quoted, makeid);
                let anu = await func.UploadFileUgu(media);
                let foto = `https://skizo.tech/api/mirror?apikey=zallzall&url=${anu.url}&filter=${filter}`;
                let response = await func.fetchJson(foto);
                let imageUrl = response.generated_image_addresses[0];
                await mecha.sendMessage(m.chat, { image: { url: imageUrl }, caption: global.mess.ok }, { quoted: m, ephemeralExpiration: m.expiration });
            } catch (e) {
        console.error(e);
        throw `Terjadi kesalahan: ${e}`;
    }
        } else {
            m.reply(`Kirim/Reply foto dengan caption ${comand} <nama_filter>.\nFilter yang tersedia:\n${availableFilters.join(', ')}`);
        }
    },
    premium: true,
    limit: 5
};