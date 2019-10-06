let mongodb, gm, commands, events;
try {
    mongodb = require('./config/db/mongodb');
    gm = require('./gm');
    commands = require('./commands');
    events = require('./events');
} catch (e) {
    console.log(e);
}

global.ROOT = __dirname;