class Ticket {
    constructor() {
        this.buyTickets = 0;
        this.ticketPrice = 1000;
        this.players = [];
        this.startGame = null;
        this.timerID = null;
    }

    getWinner() {
        let maxPlayerIndex = this.players.length - 1;
        let winnerNumber = this.randomInteger(0, maxPlayerIndex);
        let winnerPlayer = this.players[winnerNumber];
        let winnerName = winnerPlayer.name;

        if (this.startGame === null) {
            this.startGame = 1;
            this.timerID = setInterval( () => {
                console.log('timer googogogogo');
                this.startGame++;
                if (this.startGame === 10) {
                    let winPrice = this.buyTickets * this.ticketPrice;
                    player.setVariable('money', parseInt(winPrice + currentMoney));
                    mp.players.broadcast(`ПОБЕДИЛ ${winnerName}`);
                    
                    clearInterval(timerID);
                    this.players = [];
                    this.startGame = null;
                    this.buyTickets = 0;
                }
            }, 1000);
        }
    }

    randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    buyTicket(player, count) {
        player.outputChatBox(`Вы купили ${this.tickets} билетов`);
        mp.players.broadcast(`${player.name} купил: ${this.tickets} билетов`);
        mp.players.broadcast(`Всего куплено ${this.buyTickets} билетов`);

        for(let i = 1; i <= count; i++) {
            this.players.push(player);
            console.log(i);
        }
    }

    run(player, fullText, countTickets){
        if(!fullText) return player.outputChatBox('/buyticket [кол-во]');
        this.tickets = parseInt(countTickets);

        let currentMoney = player.getVariable('money');
        let total = parseInt(this.ticketPrice) * this.tickets;
        if(typeof total !== 'number' || isNaN(total)){
            return player.outputChatBox('Введите корректное число');
        }
        
        if (currentMoney < total) {
            return player.outputChatBox('У вас не достаточно средств!');
        }

        currentMoney -= total;
        player.setVariable('money', currentMoney); 
        this.buyTickets += this.tickets;
        
        this.buyTicket(player, this.tickets);
        this.getWinner();
        
        console.log(`money: ${player.getVariable('money')}`);
    }
}

module.exports = new Ticket;