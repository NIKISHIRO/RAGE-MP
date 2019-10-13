const Player = require(ROOT+'/modules/users/player');
const Admin = require(ROOT+'/modules/users/admin');

module.exports = {
    alogin: async (player, fulltext, login, code) => {
        if (!fulltext) return player.outputChatBox('/alogin [login] [code]');
        admin = new Admin(player);
        admin.alogin(login, code);
    },
    save: async (player, fullText) => {
        console.time('[CommandSave]');
        let p = new Player(player);
        await p.save(player.name);
        console.timeEnd('[CommandSave]');
    }
};