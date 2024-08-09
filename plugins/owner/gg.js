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

// Fungsi untuk mendapatkan branch default dari repository
async function getDefaultBranch() {
    const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

    const response = await fetch(githubApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.default_branch;
    } else {
        const error = await response.json();
        throw new Error(`Gagal mengambil branch default: ${error.message}`);
    }
}

// Fungsi untuk mendapatkan semua file path di dalam direktori plugins saja
async function getAllPluginsFilePaths() {
    const defaultBranch = await getDefaultBranch();
    const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${defaultBranch}?recursive=1`;

    const response = await fetch(githubApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        const pluginsFilePaths = data.tree
            .filter(item => item.type === 'blob' && item.path.startsWith('plugins/'))
            .map(item => item.path);
        return pluginsFilePaths;
    } else {
        const error = await response.json();
        throw new Error(`Gagal mengambil daftar file: ${error.message}`);
    }
}

// Integrasi dengan sistem bot/command handler
exports.run = {
    usage: ['gg'],
    use: 'path',
    category: 'owner',
    async: async (m, { mecha }) => {
        const filePath = m.text.trim();

        try {
            if (filePath) {
                // Jika file path diberikan, ambil konten file tersebut
                const content = await getFileFromGitHub(`plugins/${filePath}.js`);
                m.reply(`${content}`);
            } else {
                // Jika tidak ada file path yang diberikan, tampilkan semua file path di direktori plugins
                const pluginsFilePaths = await getAllPluginsFilePaths();
                m.reply(`ini daftar semua file di direktori plugins:\n\n${pluginsFilePaths.join('\n')}`);
            }
        } catch (error) {
            m.reply(error.message);
        }
    },
    owner: true
};