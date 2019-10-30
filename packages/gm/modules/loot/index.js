const rpc = require('rage-rpc');
const Player = require(ROOT+'/modules/users/player');
const invAPI = require(ROOT+'/modules/inventory/invAPI');
const loot = require('./loot');

// Игрок встал на колшип с лутом.
mp.events.add('playerEnterColshape', (player, colshape) => {
    const lootShape = colshape.getVariable('lootShape');
    if (lootShape) {
        player.outputChatBox('Ты встал на lootShape');
        // установить игроку ид колшипа на котором он стоит
        player.setVariable('currentColshapeId', colshape.id);
        let playerIds = colshape.getVariable('playerIds');
        if (Array.isArray(playerIds)) {
            playerIds.push(player.id);
            colshape.setVariable('playerIds', playerIds);
        }
        loot.itemReload(colshape);
    }
});

// Игрок вышел из колшипа с лутом.
mp.events.add('playerExitColshape', (player, colshape) => {
    const lootShape = colshape.getVariable('lootShape');
    if (lootShape) {
        player.outputChatBox('Ты вышел на lootShape');
        player.setVariable('currentColshapeId', null);
        loot.itemClear(player);
        let playerIds = colshape.getVariable('playerIds');
        if (Array.isArray(playerIds)) {
            const idx = playerIds.findIndex(pId => player.id === pId);
            playerIds.splice(idx, 1);
            colshape.setVariable('playerIds', playerIds);
        }
    }
});

mp.events.add('playerDeath', (player) => {
    player.outputChatBox('Ты погиб.');
    /* Когда игрок умерает, нужно 
        1) скопировать инвентарь 
        2) взять ITEMKEY всех вещей.
        3) Создать колшип на месте смерти игрока и засунуть туда все вещи по ITEMKEY. */
        loot.createLootAfterDeath(player);
});

// Игрок взял предмет из колшипа через интерфейс.
rpc.register('item:take', (data, info) => {
    const player = info.player;

    const shapeId = data.shapeId;
    const colshape = mp.colshapes.at(shapeId);
    const typeLoot = colshape.getVariable('typeLoot'); // respawn, afterDeath

    console.log('typeLoot: ', typeLoot);

    if (typeLoot === 'manyObjects') {
        loot.itemTake(player, data);
    }
    if (typeLoot === 'afterDeath') {
        loot.itemTakeAfterDeath(player, data);
    }
})

rpc.register('inventory:useItem', (id, info) => {
    const player = info.player;
    loot.invUse(player, id);
});

rpc.register('inventory:dropItem', (id, info) => {
    const player = info.player;
    loot.invDrop(player, id);
});