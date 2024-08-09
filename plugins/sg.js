const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Token GitHub dan informasi repository
const GITHUB_TOKEN = '[TOKEN_REMOVED]'; // Ganti dengan token GitHub Anda
const REPO_OWNER = 'rizalzall';
const REPO_NAME = 'delta-neww';

// Fungsi untuk mengupload file ke GitHub
async function uploadFileToGitHub(filePath, content) {
    const base64Content = Buffer.from(content).toString('base64');

    const fileName = path.basename(filePath);
    const TARGET_PATH = `plugins/${fileName}`;
    const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_PATH}`;

    const response = await fetch(githubApiUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Menambahkan plugin baru via API',
            content: base64Content,
        }),
    });

    if (response.ok) {
        return 'File berhasil diupload ke GitHub';
    } else {
        const error = await response.json();
        throw new Error(`Gagal mengupload file: ${error.message}`);
    }
}

exports.run = {
    usage: ['sg'],
    use: 'path + reply code',
    category: 'owner',
    async: async (m, { mecha, quoted }) => {
        if (!m.text) return m.reply('Mau simpan plugin di path apa?');
        if (!m.quoted) return m.reply('Mau simpan plugin dengan command apa? Reply teks script-nya!');

        const filePath = m.text.trim();
        const content = m.quoted.text.trim();

        if (!content) return m.reply('Konten file kosong!');

        // Hapus informasi sensitif dari konten jika diperlukan
        const sanitizedContent = content.replace(/ghp_[a-zA-Z0-9]+/, '[TOKEN_REMOVED]');

        try {
            const result = await uploadFileToGitHub(filePath, sanitizedContent);
            m.reply(result);
        } catch (error) {
            m.reply(error.message);
        }
    },
    owner: true
};