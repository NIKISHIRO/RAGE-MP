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
        console.log(`maxPlayerIndex: ${maxPlayerIndex}`);

        let winnerNumber = this.randomInteger(0, maxPlayerIndex);
        console.log(`winnerNumber ${winnerNumber}`);
        
        let winnerPlayer = this.players[winnerNumber];
        console.log(`winnerPlayer ${winnerPlayer}`);
        
        let winnerName = winnerPlayer.name;
        console.log(`winnerName ${winnerName}`);

        if (this.startGame === null) {
            this.startGame = 1;
            this.timerID = setInterval( () => {
                this.startGame++;
                if (this.startGame === 10) {
                    let winPrice = this.buyTickets * this.ticketPrice;
                    let money = winnerPlayer.getVariable('money');
                    winnerPlayer.setVariable('money', parseInt(winPrice + money));
                    mp.players.broadcast(`ПОБЕДИЛ ${winnerName}`);

                    this.players = [];
                    this.startGame = null;
                    this.buyTickets = 0;
                    clearInterval(this.timerID);
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
        this.getWinner(currentMoney);
        
        console.log(`money: ${player.getVariable('money')}`);
    }
}

module.exports = new Ticket;