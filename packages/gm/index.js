require('colors');

global.ROOT = __dirname;

try {    
    require('./modules/inventory');
    require('./modules/loot');
    require('./config/db/mongodb');
    require('./gm');
    require('./commands');
    require('./events');
} catch (e) {
    console.log(e);
}

mp.objects.new(mp.joaat('de_dust2'), [43.00481414794922, 54.695125579833984, 374.40283203125],
{
	rotation: 15,
    alpha: 255,
    dimension: 0
});