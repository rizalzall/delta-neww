// *SHARE PLUGINS*

const axios = require('axios');

exports.run = {
usage: ['useadrenaline'],
hidden: ['uae'],
use: 'text',
category: 'ai',
async: async (m, { func, mecha, errorMessage }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'kapan malaysia merdeka, dan berikan penjelasannya'))
mecha.sendReact(m.chat, '🕒', m.key)
try {
let messageId = 'BAE5' + func.makeid(9).toUpperCase() + 'UAE'
let response = await useadrenaline(m.budy)
mecha.sendMessage(m.chat, {text: `${response}`}, {quoted: m, ephemeralExpiration: m.expiration, messageId: messageId});
} catch (error) {
mecha.sendReact(m.chat, '❌', m.key)
return errorMessage(error)
}
},
main: async (m, { func, mecha, errorMessage }) => {
if (m.budy && m.quoted && m.quoted.fromMe && m.quoted.id.endsWith('UAE') && !m.isPrefix) {
mecha.sendReact(m.chat, '🕒', m.key)
try {
let messageId = 'BAE5' + func.makeid(9).toUpperCase() + 'UAE'
let response = await useadrenaline(m.budy)
mecha.sendMessage(m.chat, {text: `${response}`}, {quoted: m, ephemeralExpiration: m.expiration, messageId: messageId});
global.db.users[m.sender].limit -= 1
} catch (error) {
mecha.sendReact(m.chat, '❌', m.key)
return errorMessage(error)
}
}
},
limit: true
}

const axiosInstance = axios.create({
baseURL: 'https://gke-prod-api.useadrenaline.com/',
headers: {
'Accept': 'application/json, text/plain, */*',
'Content-Type': 'application/json',
'x-instance': 'adrenaline'
}
});

/*
 * Scraper By QanyPaw
 * Forbidden to sell and delete my wm
*/

async function useadrenaline(question) {
try {
const data = {
title: question,
body: "",
snippets: [],
is_rush_enabled: false,
is_public: false,
files: []
};
const { data: postResponseData } = await axiosInstance.post('question', data);
const { data: threadResponseData } = await axiosInstance.get(`thread/${postResponseData.question_id}?page=1&per_page=10`);
let jobStatus = 'IN_PROGRESS';
let dataHasil = null;
while (jobStatus === 'IN_PROGRESS') {
const { data: answersResponseData } = await axiosInstance.get(`question/${threadResponseData.list[0].question.id}/answers`);
jobStatus = answersResponseData[0].job_status;
dataHasil = answersResponseData[0].content;

if (jobStatus === 'IN_PROGRESS') {
console.log('Job is still in progress...');
await new Promise(resolve => setTimeout(resolve, 1000));
}
}
return dataHasil;
} catch (error) {
console.error(error);
throw error;
}
}