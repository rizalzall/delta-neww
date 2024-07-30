const axios = require('axios');

async function goFileDl(url) {
    const headers = {
        "User-Agent": 'Mozilla/5.0 (Linux; Android 6.0; HTC One M9 Build/MRA58K) AppleWebKit/534.26 (KHTML, like Gecko) Chrome/51.0.2561.232 Mobile Safari/536.0',
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "/",
        "Connection": "keep-alive"
    };

    try {
        const { data: { data: { token } } } = await axios.post("https://api.gofile.io/accounts", {}, { headers });
        const contentId = url.match(/\/d\/([^\/]*)/)[1];
        const { data: { data: { children, childrenIds } } } = await axios.get(`https://api.gofile.io/contents/${contentId}?wt=4fd6sg89d7s6&cache=true`, {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        });

        const fileID = childrenIds[0];
        const fileData = children[fileID];

        const relevantKeys = ['name', 'type', 'createTime', 'size', 'downloadCount', 'mimetype', 'servers', 'link'];
        const data = Object.fromEntries(relevantKeys.map(key => [key, fileData[key]]));

        return {
            author: 'shannz',
            auth: token,
            data
        };
    } catch (error) {
        return {
            status: false,
            error: String(error)
        };
    }
}

exports.run = {
    usage: ['gofile'],
    hidden: ['gfdl'],
    use: 'link gofile',
    category: 'downloader',
    async: async (m, { func, mecha, comand }) => {
        if (!m.text) return m.reply(func.example(m.cmd, 'https://gofile.io/'));
        if (!func.isUrl(m.args[0]) && !m.args[0].includes('gofile.io')) return m.reply(mess.error.url);
        mecha.sendReact(m.chat, '🕒', m.key);
        
        await goFileDl(m.text).then(async res => {
            if (!res) throw 'Link Tidak Valid';
            let media = res.data.link;
            let caption = `
                Name: ${res.data.name}
                Type: ${res.data.type}
                Created At: ${new Date(res.data.createTime * 1000).toLocaleString()}
                Size: ${(res.data.size / (1024 * 1024)).toFixed(2)} MB
                Download Count: ${res.data.downloadCount}
                Mimetype: ${res.data.mimetype}
            `;
            await mecha.sendMedia(m.chat, media, m, {
                caption: caption,
                expiration: m.expiration
            });
        }).catch((err) => m.reply(func.jsonFormat(err)));

        mecha.sendReact(m.chat, '☑️', m.key);
    },
    limit: 5
};
