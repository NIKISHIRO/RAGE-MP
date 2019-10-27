const invAPI = require('../invAPI');

invAPI.addItem("ammo_pumpshotgun", "Shotgun Shell", "Патроны для 'Shotgun'", (player, invId, itemKey, data) => {
    player.outputChatBox(`Вы взяли в руки: N:${invAPI.getItemName(itemKey)} IK:${itemKey}`);

    player.setWeaponAmmo(mp.joaat('weapon_pumpshotgun'), parseInt(10));
    //player.removeItem(invId, 1);
});

invAPI.addItem("ammo_ak47", "Ak-47 ammo", "Патроны для 'ak-47'", (player, invId, itemKey, data) => {
    player.outputChatBox(`Вы взяли в руки: N:${invAPI.getItemName(itemKey)} IK:${itemKey}`);

    player.setWeaponAmmo(mp.joaat('weapon_assaultrifle'), parseInt(30));
    //player.removeItem(invId, 1);
});