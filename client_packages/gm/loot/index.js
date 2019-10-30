// const rpc = require('./gm/modules/npm/rage-rpc.min.js');

// let playerLocal = mp.players.local;
// playerLocal.lootEnter = false;

// mp.keys.bind(69, true, function() {
//     if (playerLocal.lootEnter) {
//         takeItem();
//     }
// });

// rpc.register('loot:enterLootShape', (data) => {
//     playerLocal.lootEnter = true;
//     mp.gui.chat.push('loot:enterLootShape = true');
// });

// rpc.register('loot:exitLootShape', (data) => {
//     playerLocal.lootEnter = false;
//     mp.gui.chat.push('loot:exitLootShape = false');
// });

// function StopTaskPlayAnim(timeout){
//     playerLocal.taskPlayAnim("anim@am_hold_up@male", "shoplift_mid",  16.0, 1, -1,  49, 1.0, false, false, false);
//     setTimeout(function() {
//         playerLocal.stopAnimTask("anim@am_hold_up@male", "shoplift_mid", 1);
//     }, timeout);
// }

// function takeItem() {  
//     mp.game.streaming.requestAnimDict("anim@am_hold_up@male");
//     StopTaskPlayAnim(1000);
// }