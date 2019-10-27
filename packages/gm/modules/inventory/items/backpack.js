const invAPI = require('../invAPI');
const Player = require(ROOT+'/modules/users/player');

invAPI.addItem("backpack_coyote", "Coyote backpack", "36 слотов.", (player, invId, itemKey, data) => {
    player.outputChatBox(`Вы взяли в руки: N:${invAPI.getItemName(itemKey)} IK:${itemKey}`);
    changeBackpack(player, itemKey, {
        clothes: [5, 10, 1, 2]
    });
});

invAPI.addItem("backpack_tourist", "Tourist backpack", "50 слотов.", (player, invId, itemKey, data) => {
    player.outputChatBox(`Вы взяли в руки: N:${invAPI.getItemName(itemKey)} IK:${itemKey}`);
    changeBackpack(player, itemKey, {
        clothes: [5, 10, 2, 2]
    });
});

function changeBackpack(player, itemKey, data) {
    let plr = new Player(player);
    let currentAllWeight = plr.getAllWeight();
    let newBackpack = plr.getBackpackInfo(itemKey);
    let newBackpackSlots = newBackpack.slots;

    console.log(`[getBackpackInfo]`);
    console.log(plr.getBackpackInfo(itemKey));
    console.log(`'[currentAllWeight]': ${currentAllWeight}`.green);

    if (newBackpackSlots < currentAllWeight) return player.outputChatBox('!{red}У этого рюкзака слишком мало слотов!');
    
    let componentNumber = data.clothes[0];
    let drawableNumber = data.clothes[1];
    let textureNumber = data.clothes[2];
    let paletteNumber = data.clothes[3];
    player.setClothes(componentNumber, drawableNumber, textureNumber, paletteNumber);  
    plr.setBackpack(itemKey); 
}