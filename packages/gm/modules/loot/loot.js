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

    randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Number(Math.floor(rand));
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
                    case 'weapon':
                        sprite = 567;
                        break;
                    case 'ammo':
                        sprite = 549;
                        break;
                    case 'medicine':
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
            colshape.setVariable('itemObject', {labelId, blipIdArray, objectIdArray});
            colshape.setVariable('items', items);
            colshape.setVariable('playerIds', []);
        });
    }

    respawn() {
        const self = this;
        mp.colshapes.forEach(colshape => {
            let lootShape = colshape.getVariable('lootShape');
            if (lootShape) {
                let itemObject = colshape.getVariable('itemObject');
                let blipIdArray = itemObject.blipIdArray;
                let objectIdArray = itemObject.objectIdArray;
                objectIdArray.forEach(id => {
                    if (mp.objects.exists(id)) {
                        let object = mp.objects.at(id);
                        object.destroy();
                    }
                });
                blipIdArray.forEach(id => {
                    if (mp.blips.exists(id)) {
                        let object = mp.blips.at(id);
                        object.destroy();
                    }
                });
            }
        });
        self.lootInit();
    }

    itemClear(player) {
        rpc.callClient(player, 'loot:exitLootShape');
        rpc.callBrowsers(player, 'item:clear');
    }

    itemTake(player, item) {
        const self = this;
        const shapeId = item.shapeId;
        const itemKey = item.key;
        const colshape = mp.colshapes.at(shapeId);
        const plrPosition = player.position;
        // Если игрок находится в пределах колшипа
        if (colshape.isPointWithin(plrPosition)) {
            const items = colshape.getVariable('items');
            const itemObject = colshape.getVariable('itemObject');
            let idx = items.findIndex(loot => itemKey === loot.item.key);
            const blipId = itemObject.blipIdArray[idx];
            const objectId = itemObject.objectIdArray[idx];
            const blip = mp.blips.at(blipId);
            const object = mp.objects.at(objectId);

            blip.destroy();
            object.destroy();

            itemObject.blipIdArray.splice(idx, 1);
            itemObject.objectIdArray.splice(idx, 1);
            items.splice(idx, 1);
            colshape.setVariable('itemObject', itemObject);
            colshape.setVariable('items', items);

            player.giveItem(itemKey, 1);
            self.itemReload(colshape);
            self.invReload(player);
            // Если в колшипе нет предметов - удалить колшип с лейблом.
            if (!this.hasColshapeItems(colshape)) {
                const itemObject = colshape.getVariable('itemObject');
                const labelId = itemObject.labelId;
                const label = mp.labels.at(labelId);
                colshape.destroy();
                label.destroy();
                player.setVariable('currentColshapeId', null);
            }
        }
    }

    hasColshapeItems(colshape) {
        const items = colshape.getVariable('items');
        return items.length ? true : false;
    }

    itemReload(colshape) {
        const items = colshape.getVariable('items');
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
            rpc.callClient(player, 'loot:enterLootShape');
            rpc.callBrowsers(player, 'item:reload', [itemsArray, shapeId]);
        });
    }

    createOneLoot(player, itemKey, position, range, labelColor, blipSprite, blipName) {
        const self = this;
        const item = self.getItemData(itemKey);
        const objModel = item.model;
        const objRotation = item.rotation;
        const blip = Loot.createBlip(blipSprite, position, blipName);
        const object = Loot.creatObject(objModel, position, objRotation);
        // Если игрок стоит на колшипе, получить его ID
        const currentColshapeId = player.getVariable('currentColshapeId');
        let colshape;
        if (currentColshapeId !== null) {
            colshape = mp.colshapes.at(currentColshapeId);
            const itemObject = colshape.getVariable('itemObject');           
            const items = colshape.getVariable('items');
            itemObject.blipIdArray.push(blip.id);
            itemObject.objectIdArray.push(object.id);
            colshape.setVariable('itemObject', itemObject);
            items.push({item: item});
            colshape.setVariable('items', items);
            self.itemReload(colshape);
        } else {
            const items = [{item: item}];
            const label = Loot.createLabel('labelText', position, range, labelColor);
            let labelId = label.id;
            let blipIdArray = [blip.id];
            let objectIdArray = [object.id];
            colshape = Loot.createColshape(position.x, position.y, position.z, range);
            colshape.setVariable('lootShape', true);
            colshape.setVariable('playerIds', []);
            player.setVariable('currentColshapeId', colshape.id);
            colshape.setVariable('itemObject', {labelId, blipIdArray, objectIdArray});
            colshape.setVariable('items', items);
            self.itemReload(colshape);
        }
    }

    invDrop(player, id) {
        const self = this;
        const inventory = player.getInventory();
        const invItem = inventory[id];
        const itemKey = invItem.key;
        const position = player.position;
        const range = 1.5;
        const labelColor = [255, 255, 1, 1];
        const blipSprite = 1;
        const blipName = 'DROPPED ITEM';
        self.createOneLoot(player, itemKey, position, range, labelColor, blipSprite, blipName);
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

        if (!inventory.length) return rpc.callBrowsers(player, 'inventory:reload', [null, currentSlots, currentWeight]);
        
        let items = inventory.map((item) => {
            let key = item.key;
            let amount = item.amount;
            let name = invAPI.getItemName(item.key);
            return {key, amount, name};
        });

        rpc.callBrowsers(player, 'inventory:reload', [items, currentSlots, currentWeight])
            .then(_ => {
                console.log(`inventory:reload`); 
            })
            .catch(error => {
                console.log(`error => [inventory:reload], ${error}`.red);
            });
    }

}

module.exports = new Loot;