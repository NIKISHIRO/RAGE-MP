let mongodb = require('./config/db/mongodb');
let gm = require('./gm');
let commands = require('./commands');
let events = require('./events');

global.ROOT = __dirname;



mongodb.getUserModel()
    .find({money:100})
    .then(result => console.log(result));