const axios = require('axios');

// STALKER IG
const stalkIG = async (username) => {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://skizo.tech/api/igstalk?apikey=zallzall&user=${encodeURIComponent(username)}`)
            .then((response) => {
                const data = response.data;
                if (data.username) {
                    resolve({
                        status: 200,
                        creator: 'skizo.tech',
                        userInfo: {
                            username: data.username,
                            fullname: data.fullname,
                            photo_profile: data.photo_profile,
                            posts: data.posts,
                            followers: data.followers,
                            following: data.following,
                            bio: data.bio
                        }
                    });
                } else {
                    resolve({
                        status: 404,
                        creator: 'skizo.tech',
                        msg: data.message || 'User not found'
                    });
                }
            })
            .catch((err) => {
                resolve({
                    status: 500,
                    creator: 'skizo.tech',
                    msg: err.message || 'Internal Server Error'
                });
            });
    });
}

exports.run = {
    usage: ['igstalk'],
    hidden: ['stalkIG'],
    use: 'username',
    category: 'searching',
    async: async (m, { func, mecha, comand }) => {
        if (!m.text) return m.reply(func.example(comand, 'Derydnta'));
        await stalkIG(m.text).then(data => {
            if (data.status === 404) {
                return mecha.sendMessage(m.chat, data.msg, { quoted: m });
            } else if (data.status === 500) {
                return mecha.sendMessage(m.chat, 'Internal Server Error', { quoted: m });
            } else {
                const userInfo = data.userInfo;

                let caption = `*STALKER INSTAGRAM*\n\n`;
                caption += `◦ Username: ${userInfo.username}\n`;
                caption += `◦ Full Name: ${userInfo.fullname}\n`;
                caption += `◦ Bio: ${userInfo.bio}\n`;
                caption += `◦ Posts: ${userInfo.posts}\n`;
                caption += `◦ Followers: ${userInfo.followers}\n`;
                caption += `◦ Following: ${userInfo.following}\n\n`;

                mecha.sendMessage(m.chat, {
                    text: caption,
                    contextInfo: {
                        externalAdReply: {
                            title: "𝙎𝙩𝙖𝙡𝙠𝙞𝙣𝙜 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢",
                            body: "Powered by",
                            thumbnailUrl: userInfo.photo_profile,
                            sourceUrl: "https://instagram.com",
                            mediaType: 1,
                            showAdAttribution: true,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: m });
            }
        });
    },
    limit: true
}