const Player = require(ROOT+'/modules/users/player');

module.exports = {
    playerJoin: player => {
        console.log(`${player.name} зашел на сервер.`);
        let p = new Player(player);
        p.init();
    },
    playerDeath: (player, reason, killer) => {
        player.spawn(new mp.Vector3(111, 111, 111));
    }
};