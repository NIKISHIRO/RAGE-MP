const fs = require('fs');
const path = require('path');
const rpc = require('rage-rpc');

const invAPI = require(ROOT+'/modules/inventory/invAPI');
const loot = require(ROOT+'/modules/loot/loot');

module.exports = {
    pos: (player, fullText) => {
        player.outputChatBox(JSON.stringify(player.position));
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
    }
};