const Player = require(ROOT+'/modules/users/player');

module.exports = {
    playerJoin: player => {
        console.log(`${player.name} зашел на сервер.`);
        let p = new Player(player);
        p.init();
    },
    playerDeath: player => {
        player.spawn(new mp.Vector3(-80, -223, 44));
    }
};