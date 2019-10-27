const invAPI = require('./invAPI');

invAPI.on("itemDefined", (key, name, description) => {
    console.log(`Item defined, key: ${key} | name: ${name} | description: ${description}`);
});

invAPI.on("itemAdded", (player, key, amount, data) => {
    console.log(`${player.name} received ${amount}x ${key}.`);
});

invAPI.on("itemUsed", (player, invIdx, key, data) => {
    console.log(`${player.name} used ${key}.`);
});

invAPI.on("itemRemoved", (player, invIdx, key, amount, data) => {
    console.log(`${player.name} lost ${amount}x ${key}.`);
});

invAPI.on("itemRemovedCompletely", (player, key, data) => {
    console.log(`${player.name} no longer has ${key} (${data ? "with data" : "without data"}) in their inventory.`);
});

invAPI.on("inventoryReplaced", (player, oldInventory, newInventory) => {
    console.log(`${player.name} had their inventory replaced. (Old item count: ${oldInventory.length}, new: ${newInventory.length})`);
});

/* ADD ITEMS */
require('./items/backpack');
require('./items/medicine');
require('./items/weapons');
require('./items/ammo');