const path = require('path');
let gm = require(path.resolve(ROOT, 'gm'));
let casino = gm.games.casino;
console.log(casino);

const TICKETPRICE = casino.ticketPrice;

module.exports = {
    buyticket: (player, fullText, countTickets) => {
        if(!fullText) return player.outputChatBox('/buyticket [кол-во]');
        let tickets = parseInt(countTickets);

        let money = player.getVariable('money');
        let total = parseInt(TICKETPRICE) * tickets;
        if(typeof total !== 'number' || isNaN(total)){
            return player.outputChatBox('Введите корректное число');
        }
        
        if (money < total) {
            return player.outputChatBox('У вас не достаточно средств!');
        }

        money -= total;
        player.setVariable('money', money); //player.data.money -= total;
        casino.buyTickets += tickets;

        player.outputChatBox(`Вы купили ${tickets} билетов`);

        mp.players.broadcast(`${player.name} купил: ${tickets} билетов`);
        mp.players.broadcast(`Всего куплено ${casino.buyTickets} билетов`);

        console.log(player.getVariable('money'));
    },
};
