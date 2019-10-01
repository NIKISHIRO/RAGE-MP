const path = require('path');
let gm = require(path.resolve(ROOT, 'gm'));
let casino = gm.games.casino;

module.exports = {
    buyticket: (player, fullText, countTickets) => {
        casino.run(player, fullText, countTickets); // object
    }
};