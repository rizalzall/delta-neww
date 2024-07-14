exports.run = {
usage: ['owner'],
hidden: ['creator', 'developer', 'dev'],
category: 'special',
async: async (m, { func, mecha }) => {
mecha.sendkontakV2(m.chat, 'SuryaDev.', [
['SuryaDev.', '62882003321562', ''], 
[global.ownerName, global.owner.split('@')[0], '']
], m)
}
}