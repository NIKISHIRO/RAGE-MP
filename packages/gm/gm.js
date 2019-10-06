let settings = require('./config/settings');

function timer(){
    ++minute;
    if(minute>=60){
        hour++;
        minute=0;
    }
    if(hour == 24){
        hour=0;
        minute=0;
    }
    mp.world.time.minute = minute;
    mp.world.time.hour = hour;
}

let hour = settings.time.h;
let minute = settings.time.m;
setInterval(timer, 1000);

module.exports = {
    games: {
        casino: require('./modules/games/casino')
    }
};
