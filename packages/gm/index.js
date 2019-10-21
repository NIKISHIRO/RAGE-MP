global.ROOT = __dirname;

try {    
    require('colors');
    require('./modules/inventory');
    require('./modules/loot');
    require('./config/db/mongodb');
    require('./gm');
    require('./commands');
    require('./events');
} catch (e) {
    console.log(e);
}