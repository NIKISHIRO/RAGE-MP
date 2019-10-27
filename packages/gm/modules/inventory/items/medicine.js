const invAPI = require('../invAPI');

invAPI.addItem("medicine_bandage", "Бинт", "Восстанавливает 25ХП.", (player, invId, itemKey, data) => {
    player.outputChatBox(`Вы взяли в руки: N:${invAPI.getItemName(itemKey)} IK:${itemKey}`);
    player.health = 25;
    player.removeItem(invId);
});

invAPI.addItem("medicine_medkit", "Аптечка", "Восстанавливает 100ХП.", (player, invId, itemKey, data) => {
    player.outputChatBox(`Вы взяли в руки: N:${invAPI.getItemName(itemKey)} IK:${itemKey}`);
    player.health = 100;
    player.removeItem(invId);
});