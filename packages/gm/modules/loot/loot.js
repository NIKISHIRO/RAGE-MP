const rpc = require('rage-rpc');
const invAPI = require(ROOT+'/modules/inventory/invAPI');
const Player = require(ROOT+'/modules/users/player');

class Loot {
    constructor() {
        this._setup();
    }

    _setup() {
        const self = this;
        self._items = require(ROOT+'/config/items.json');
        self._spawnLoot = require(ROOT+'/config/spawnLoot.json');

        self.lootInit();
    }

    static createColshape(x, y, z, range) {
        return mp.colshapes.newSphere(x, y, z, range, 0);
    }
    static createLabel(text, position, range, labelColor) {
        let pos = {...position};
        pos.z += 1;
        return mp.labels.new(text, pos, {
            color: labelColor,
            los: false,
            font: 2,
            drawDistance: range
        });
    }

    static createBlip(sprite, position, name) {
        return mp.blips.new(sprite, position, {
                name: name,
                scale: 1,
                color: 68
        });
    }

    static creatObject(model, position, rotation) {
        return mp.objects.new(model, position, {
                rotation: rotation
        });
    }

    /** 
     * 1) Создать список в котором будет список рандомных предметов с рандомным кол-вом.
     */

     // возвращает массив объектов предметов по фильтру (FILTER) или типу (ANY);
    _getItems(filter = 'any') {
        const self = this;
        const items = self._items;

        let array = [];
        if (filter === 'any') {
            for (let key in items) {
                let item = items[key];
                item.key = key;
                array.push(items[key]);
            }
            return array; // any[{}, {}]
        } else {
            for (let key in items) {
                let item = items[key];
                if (item.type === filter) {
                    item.key = key;
                    array.push(item);
                }
            }
            return array; // by type var filter[{}, {}]
        }
    }

    // создает массив с лутом.
    _createItems() {
        const self = this;
        let spawnLoot = self._spawnLoot;

        let arrayLoot = spawnLoot.map(loot => {
            // let id = loot.id;
            let filter = loot.filter;
            let position = loot.position; // координаты точки лута
            let max = loot.max; // макс. число лута в одной точке
            // кол-во лута в 1 точке.
            let countSpawnLoot = self.randomInteger(0, max);
            let items = self.getRandomItem(countSpawnLoot, filter); // Массив опр.кол-во объектов по типу.
            // массив предметов, от которого потом берутся данные из _items.
            let arrayItems = items.map(item => {
                return {item};
            });
            return {items: arrayItems, position, filter};
        });
        return arrayLoot;
    }

    randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Number(Math.floor(rand));
    }

    // Возвращает массив объектов-предметов по филтру.
    getRandomItem(count, filter) {
        if (!count) return [];

        const self = this;
        let rCicle = (count, filter) => {
            let items = self._getItems(filter);
            let itemKeyList = [];
            for(let i = 0; i < count; i++) {
                let index = self.randomInteger(0, items.length - 1);
                itemKeyList.push(items[index]);
            }
            return itemKeyList;
        };
        return rCicle(count, filter);
    }

    getItemData(itemKey) {
        return this._items[itemKey];
    }

    hasItemsAtColshape(colshapeID) {
        let colshape = mp.colshapes.at(colshapeID);
        const items = this.getItemsAtColshape(colshape.id);
        return items.length ? true : false;
    }
    
    addItemAtColshape(colshapeID, item) {
        let colshape = mp.colshapes.at(colshapeID);
        let items = colshape.getVariable('items');
        if (!items) items = [];
        items.push({item: item});
        colshape.setVariable('items', items);
    }

    getItemsAtColshape(colshapeID) {
        let colshape = mp.colshapes.at(colshapeID);
        return colshape.getVariable('items');
    }

    setItemsAtColshape(colshapeID, items) {
        let colshape = mp.colshapes.at(colshapeID);
        colshape.setVariable('items', items);
    }
    
    getItemObject(colshapeID) {
        let colshape = mp.colshapes.at(colshapeID);
        return colshape.getVariable('itemObject');
    }

    setItemObject(colshapeID, itemObject) {
        let colshape = mp.colshapes.at(colshapeID);
        return colshape.setVariable('itemObject', itemObject);
    }

    lootInit() {
        const self = this;
        const arrayLoot = self._createItems();
        arrayLoot.forEach(loot => {
            const items = loot.items;
            // Если кол-во предметов = 0, не производить с ними операций.
            if (!items.length) return;
            const position = loot.position;
            const filter = loot.filter;
            const range = 1.5;
            const labelText = `${filter} \nLoot Bag`;
            const labelColor = [50,147,230,255];
            const objectIdArray = items.map(object => {
                let objectModel = object.item.model;
                let objectRotation = object.item.rotation;
                let blip = Loot.creatObject(objectModel, position, objectRotation)
                return blip.id;
            });
            
            const blipIdArray = items.map(object => {
                let type = object.item.type;
                let itemKey = object.item.key;
                let name = invAPI.getItemName(itemKey);
                let sprite;
                switch(type) {
                    case 'weapon_1':
                        sprite = 567;
                        break;
                    case 'weapon_2':
                        sprite = 567;
                        break;
                    case 'weapon_2':
                        sprite = 567;
                        break;
                    case 'ammo_1':
                        sprite = 549;
                        break;
                    case 'ammo_3':
                        sprite = 549;
                        break;
                    case 'medicine_1':
                        sprite = 153;
                        break;
                    case 'medicine_2':
                        sprite = 153;
                        break;
                    case 'backpack':
                        sprite = 586;
                        break;
                    default: 
                        sprite = 1;
                        break;
                }
                let blip = Loot.createBlip(sprite, position, name);
                return blip.id;
            });
            const colshape = Loot.createColshape(position.x, position.y, position.z, range);
            const label = Loot.createLabel(labelText, position, range, labelColor);
            const labelId = label.id;
            colshape.setVariable('lootShape', true);
            colshape.setVariable('playerIds', []);
            colshape.setVariable('typeLoot', 'manyObjects');
            // colshape.setVariable('itemObject', {labelId, blipIdArray, objectIdArray});
            let itemObject = {labelId, blipIdArray, objectIdArray};
            self.setItemObject(colshape.id, itemObject);
            self.setItemsAtColshape(colshape.id, items);
        });
    }

    respawn() {
        const self = this;
        mp.colshapes.forEach(colshape => {
            let lootShape = colshape.getVariable('lootShape');
            if (lootShape) {
                let itemObject = self.getItemObject(colshape.id);
                let labelId = itemObject.labelId;
                let blipIdArray = itemObject.blipIdArray;
                let objectIdArray = itemObject.objectIdArray;

                if (mp.colshapes.exists(colshape.id)) {
                    colshape.destroy();
                }
                if (mp.labels.exists(labelId)) {
                    let label = mp.labels.at(labelId);
                    label.destroy();
                }
                objectIdArray.forEach(id => {
                    if (mp.objects.exists(id)) {
                        let object = mp.objects.at(id);
                        object.destroy();
                    }
                });
                blipIdArray.forEach(id => {
                    if (mp.blips.exists(id)) {
                        let blip = mp.blips.at(id);
                        blip.destroy();
                    }
                });
            }
        });
        self.lootInit();
    }

    itemClear(player) {
        // rpc.callClient(player, 'loot:exitLootShape');
        rpc.callBrowsers(player, 'item:clear')
            .then(good => {
                console.log(`${player.name}:[itemClear]: ${good}`.green);
            })
            .catch(error => {
                console.log(`error => [itemClear], ${error}`.red);
            });
    }

    itemTakeAfterDeath(player, item) {
        const self = this;
        const plrPosition = player.position;
        const shapeId = item.shapeId
        if (!mp.colshapes.exists(shapeId)) console.log(`Колшипа с ID:${shapeId} не найдено!`.red);
        const colshape = mp.colshapes.at(shapeId);
        if (colshape.isPointWithin(plrPosition)) {
            const plr = new Player(player);
            const itemKey = item.key;
            const items = self.getItemsAtColshape(colshape.id);

            let idx = items.findIndex(loot => itemKey === loot.item.key);
            // Если предметов в колшипе нет, нужно удалить объекты и сам колшип.
            if (!plr.hasSpaceBackpack(itemKey)) return player.outputChatBox('!{red}Слотов в вашем рюкзаке слишком мало!');
            player.giveItem(itemKey, 1);
            items.splice(idx, 1);
            self.setItemsAtColshape(colshape.id, items);
            self.itemReload(colshape);
            self.invReload(player);

            if (!self.hasItemsAtColshape(colshape.id)) { 
                const itemObject = self.getItemObject(colshape.id);
                const labelId = itemObject.labelId;
                const blipId = itemObject.blipIdArray[0];
                const objectId = itemObject.objectIdArray[0];
                if (!mp.labels.exists(labelId)) console.log(`Лэйбл с ID:${labelId} не найден!`.red);
                if (!mp.blips.exists(blipId)) console.log(`Блип с ID:${blipId} не найден!`.red);
                if (!mp.objects.exists(objectId)) console.log(`Объект с ID:${objectId} не найден!`.red);
                const label = mp.labels.at(labelId);
                const blip = mp.blips.at(blipId);
                const object = mp.objects.at(objectId);
                colshape.destroy();
                label.destroy();
                blip.destroy();
                object.destroy();
                player.setVariable('currentColshapeId', null);
            }
        }
    }
    
    itemTake(player, item) {
        const self = this;
        const plrPosition = player.position;
        const shapeId = item.shapeId;
        if (!mp.colshapes.exists(shapeId)) console.log(`Колшипа с ID:${shapeId} не найдено!`.red);
        const colshape = mp.colshapes.at(shapeId);
        // Если игрок находится в пределах колшипа
        if (colshape.isPointWithin(plrPosition)) {
            const plr = new Player(player);
            const itemKey = item.key;
            const items = self.getItemsAtColshape(colshape.id);
            const itemObject = self.getItemObject(colshape.id);

            let idx = items.findIndex(loot => itemKey === loot.item.key);
            const blipId = itemObject.blipIdArray[idx];
            const objectId = itemObject.objectIdArray[idx];

            if (!mp.blips.exists(blipId)) console.log(`Блип с ID:${blipId} по индексу:${idx} не найден!`.red);
            if (!mp.objects.exists(objectId)) console.log(`Объект с ID:${objectId} по индексу:${idx} не найден!`.red);

            const blip = mp.blips.at(blipId);
            const object = mp.objects.at(objectId);
            // Не давать игроку взять вещь, если у него не хватает места.
            if (!plr.hasSpaceBackpack(itemKey)) return player.outputChatBox('!{red}Слотов в вашем рюкзаке слишком мало!');

            player.giveItem(itemKey, 1);
            blip.destroy();
            object.destroy();
            itemObject.blipIdArray.splice(idx, 1);
            itemObject.objectIdArray.splice(idx, 1);
            items.splice(idx, 1);
            self.setItemObject(colshape.id, itemObject);
            self.setItemsAtColshape(colshape.id, items);
            self.itemReload(colshape);
            self.invReload(player);
            // Если в колшипе нет предметов - удалить колшип с лейблом.
            if (!self.hasItemsAtColshape(colshape.id)) {
                const itemObject = self.getItemObject(colshape.id);
                const labelId = itemObject.labelId;
                const label = mp.labels.at(labelId);
                colshape.destroy();
                label.destroy();
                player.setVariable('currentColshapeId', null);
            }
        }
    }

    itemReload(colshape) {
        const self = this;
        const items = self.getItemsAtColshape(colshape.id);
        let itemsArray = items.map(loot => {
            const item = loot.item;
            const type = item.type;
            const itemKey = item.key;
            const name = invAPI.getItemName(item.key);
            return {type, key: itemKey, name};
        });
        const shapeId = colshape.id;
        const playerIds = colshape.getVariable('playerIds');
        playerIds.forEach(pId => {
            const player = mp.players.at(pId);
            rpc.callBrowsers(player, 'item:reload', [itemsArray, shapeId])
                .then(good => console.log(`${player.name}:[item:reload]: ${good}`.green))
                .catch(error => console.log(`[item:reload]: ${error}`.red));
        });
    }

    createOneItem(player, itemKey, position, range, labelColor, blipSprite, blipName, objModel, objRotation) {
        const self = this;
        const item = self.getItemData(itemKey);
        
        // Если игрок стоит на колшипе, получить его ID
        const currentColshapeId = player.getVariable('currentColshapeId');
        if (currentColshapeId !== null) {
            const colshape = mp.colshapes.at(currentColshapeId);
            const typeLoot = colshape.getVariable('typeLoot');
            const itemObject = self.getItemObject(colshape.id);  
            
            if (typeLoot === 'manyObjects') {
                const blip = Loot.createBlip(blipSprite, position, blipName);
                const object = Loot.creatObject(objModel, {...position, z: position.z - 1}, objRotation);
                itemObject.blipIdArray.push(blip.id);
                itemObject.objectIdArray.push(object.id);
                self.setItemObject(colshape.id, itemObject);
            }

            self.addItemAtColshape(currentColshapeId, item);
            self.itemReload(colshape);
        } else { // Если игрок не стоит на точке с лутом, создать его
            const blip = Loot.createBlip(blipSprite, position, blipName);
            const object = Loot.creatObject(objModel, {...position, z: position.z - 1}, objRotation);

            const label = Loot.createLabel('Dropped loot\n[TAB]', position, range, labelColor);
            let labelId = label.id;
            let blipIdArray = [blip.id];
            let objectIdArray = [object.id];
            let itemObject = {labelId, blipIdArray, objectIdArray};
            let colshape = Loot.createColshape(position.x, position.y, position.z, range);
            colshape.setVariable('lootShape', true);
            colshape.setVariable('playerIds', []);
            colshape.setVariable('typeLoot', 'manyObjects');
            player.setVariable('currentColshapeId', colshape.id);
            self.setItemObject(colshape.id, itemObject);
            self.addItemAtColshape(colshape.id, item);
            self.itemReload(colshape);
        }
    }

    createLootAfterDeath(player) {
        const self = this;
        const plr = new Player(player);
        const inventory = player.getInventory();
        const position = player.position;
        const range = 1.5;
        const labelColor = [50,147,230,255];
        const objRotation = {x: 0, y: 0, z: 0};

        const allWeight = plr.getAllWeight();
        let objModel;
        if (allWeight > 0) {
            objModel = 'bkr_prop_biker_case_shut';
        }
        if (allWeight > 30) {
            objModel = 'hei_prop_heist_wooden_box';
        }
        if (allWeight > 50) {
            objModel = 'imp_prop_impexp_boxwood_01';
        }

        console.log(allWeight);

        if (inventory.length) {
            const colshape = Loot.createColshape(position.x, position.y, position.z, range);
            const label = Loot.createLabel('lootAfterDeath', position, range, labelColor);
            const object = Loot.creatObject(objModel, {...position, z: position.z - 1}, objRotation);
            const blip = Loot.createBlip(1, position, 'lootAfterDeath');
            const labelId = label.id;
            const objectIdArray = [object.id];
            const blipIdArray = [blip.id];
            const itemObject = {labelId, blipIdArray, objectIdArray};
            colshape.setVariable('lootShape', true);
            colshape.setVariable('playerIds', []);
            colshape.setVariable('typeLoot', 'afterDeath');
            self.setItemObject(colshape.id, itemObject);

            inventory.forEach(invItem => {
                const itemKey = invItem.key;
                const amount = invItem.amount;
                const item = self.getItemData(itemKey);
                for (let i = 0; i < amount; i++) {
                    self.addItemAtColshape(colshape.id, item);
                }
            });
            player.setInventory([]);
            this.invReload(player);
        }
    }

    invDrop(player, id) {
        const self = this;
        const inventory = player.getInventory();
        const invItem = inventory[id];
        const itemKey = invItem.key;
        const position = player.position;
        const range = 1.5;
        const labelColor = [50,147,230,255];
        const blipSprite = 1;
        const blipName = 'DROPPED ITEM';
        const item = self.getItemData(itemKey);
        const objModel = item.model;
        const objRotation = item.rotation;
        self.createOneItem(player, itemKey, position, range, labelColor, blipSprite, blipName, objModel, objRotation);
        player.removeItem(id, 1);
        self.invReload(player);
    }

    invUse(player, id) {
        player.useItem(id);
        this.invReload(player);
    }
    
    invReload(player) {
        let inventory = player.getInventory();
        const plr = new Player(player);
        let currentSlots = plr.getBackpackSlots();
        let currentWeight = plr.getAllWeight();

        if (!inventory.length) {
            rpc.callBrowsers(player, 'inventory:reload', [null, currentSlots, currentWeight])
                .then(good => {
                    console.log(`${player.name}:[invReload]: ${good}`.green);
                })
                .catch(error => {
                    console.log(`error => [invReload], ${error}`.red);
                });
        }
        
        let items = inventory.map((item) => {
            let key = item.key;
            let amount = item.amount;
            let name = invAPI.getItemName(item.key);
            return {key, amount, name};
        });

        rpc.callBrowsers(player, 'inventory:reload', [items, currentSlots, currentWeight])
            .then(_ => {
                console.log(`${player.name}:[inventory:reload]`.green); 
            })
            .catch(error => {
                console.log(`error => [inventory:reload], ${error}`.red);
            });
    }

}

module.exports = new Loot;