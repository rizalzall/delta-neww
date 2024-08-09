const fetch = require('node-fetch');

// Token GitHub dan informasi repository
const GITHUB_TOKEN = '[TOKEN_REMOVED]'; // Ganti dengan token GitHub Anda
const REPO_OWNER = 'rizalzall';
const REPO_NAME = 'delta-neww';

// Fungsi untuk mengambil konten file dari GitHub
async function getFileFromGitHub(filePath) {
    const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;

    const response = await fetch(githubApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        const fileContent = Buffer.from(data.content, 'base64').toString('utf-8');
        return fileContent;
    } else if (response.status === 404) {
        throw new Error(`File tidak ditemukan: ${filePath}`);
    } else {
        const error = await response.json();
        throw new Error(`Gagal mengambil file: ${error.message}`);
    }
}

// Integrasi dengan sistem bot/command handler
exports.run = {
    usage: ['gg'],
    use: 'path',
    category: 'owner',
    async: async (m, { mecha }) => {
        if (!m.text) return m.reply('Mau ambil plugin di path apa?');

        const filePath = `plugins/${m.text.trim()}.js`;

        try {
            const content = await getFileFromGitHub(filePath);
            m.reply(`${content}`);
        } catch (error) {
            m.reply(error.message);
        }
    },
    owner: true
};