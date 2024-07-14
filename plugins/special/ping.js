const { performance } = require('perf_hooks');
const os = require('os');

exports.run = {
usage: ['ping'],
category: 'special',
async: async (m, { func, mecha }) => {
const old = performance.now();
const ram = (os.totalmem() / Math.pow(1024, 3)).toFixed(2) + " GB";
const free_ram = (os.freemem() / Math.pow(1024, 3)).toFixed(2) + " GB";
const serverInfo = `Server Information

- ${os.cpus().length} CPU: ${os.cpus()[0]?.model ?? 'Tidak diketahui'}

- Uptime: ${Math.floor(os.uptime() / 86400)} days
- Ram: ${free_ram}/${ram}
- Speed: ${(performance.now() - old).toFixed(5)} ms`
mecha.reply(m.chat, func.texted('monospace', serverInfo), m)
}
}