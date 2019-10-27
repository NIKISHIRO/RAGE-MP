const invAPI = require('../invAPI');

invAPI.addItem("weapon_shotgun", "Shotgun", "Оружие ближней дистанции.", (player, invId, itemKey, data) => {
    player.outputChatBox(`Вы взяли в руки: N:${invAPI.getItemName(itemKey)} IK:${itemKey}`);
    player.giveWeapon(mp.joaat('weapon_pumpshotgun'), 0);
});

invAPI.addItem("weapon_ak47", "Ak-47", "Оружие дальней дистанции.", (player, invId, itemKey, data) => {
    player.outputChatBox(`Вы взяли в руки: N:${invAPI.getItemName(itemKey)} IK:${itemKey}`);
    player.giveWeapon(mp.joaat('weapon_assaultrifle'), 0);
});

invAPI.addItem("weapon_sawedOffShotgun", "Sawed-Off Shotgun", "Оружие ближней дистанции.", (player, invId, itemKey, data) => {
    player.outputChatBox(`Вы взяли в руки: N:${invAPI.getItemName(itemKey)} IK:${itemKey}`);
    player.giveWeapon(mp.joaat('weapon_sawnoffshotgun'), 0);
});