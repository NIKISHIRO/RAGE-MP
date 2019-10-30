const fs = require('fs');
const path = require('path');
const rpc = require('rage-rpc');

const invAPI = require(ROOT+'/modules/inventory/invAPI');
const loot = require(ROOT+'/modules/loot/loot');

module.exports = {
    pos: (player, fullText) => {
        player.outputChatBox(`!{red}X:[${player.position.x}] !{white}Y:[${player.position.y}] !{orange}Z:[${player.position.z}]`);
    },
    money: (player) => {
        player.outputChatBox(String(player.getVariable('money')));
        console.log(player.getVariable('money'));
    },
    player: (player) => {
        console.log(player);
    },
    inv: (player) => {
        const inventory = player.getInventory();
        if (inventory.length === 0) return player.outputChatBox('Инвентарь пуст.');
        inventory.forEach( (item, id) => {
            return player.outputChatBox(`${id} | ${invAPI.getItemName(item.key)} | ${item.amount}`);
        } );
    },
    k: (player) => {
        player.health = 0;
    },
    respawn: (player) => {
        loot.respawn();
    },
    ddct: (player) => player.spawn(new mp.Vector3(32.554656982421875, -0.644313395023346, 377.95849609375)),
    ddt: (player) => player.spawn(new mp.Vector3(48, 80, 372)),
    gw: (player, _, weaponHash, ammo) => {
        player.giveWeapon(mp.joaat(weaponHash), Number(ammo))
    }
};