let mongodb = require(ROOT+'/config/db/mongodb');
const User = mongodb.getUserModel();
const rpc = require('rage-rpc');

class Player {
    constructor(player) {
        this._setup(player);
    }

    _setup(player) {
        const self = this;
        self._player = player;
        self._items = require(ROOT+'/config/items.json');
    }

    init() {
        const self = this;
        self._player.health = 100;
        self._player.armour = 100;
        self._player.spawn(new mp.Vector3(-80, -223, 44));

        self._player.setVariable('loggedIn', false);
        self._player.setVariable('admin', 0);
        self._player.setVariable('backpack', {
            slots: 12,
            backpack: null
        });
        self._player.setVariable('currentColshapeId', null);
        // Temporary
        self._player.setClothes(parseInt(6), parseInt(5), parseInt(1), parseInt(2));
        self._player.setClothes(parseInt(4), parseInt(61), parseInt(1), parseInt(2));
        self._player.setClothes(parseInt(11), parseInt(15), parseInt(1), parseInt(2));
        self._player.setClothes(parseInt(8), parseInt(15), parseInt(1), parseInt(2));
        self._player.setClothes(parseInt(3), parseInt(29), parseInt(1), parseInt(2));

        console.log(`${self._player.name}: Инициализирован`);
    }

    getItemWeight(itemKey, amount = 1) {
        const self = this;
        return self._items[itemKey].weight * amount;
    }

    // weight all items
    getAllWeight() {
        const self = this;
        let inventory = self._player.getInventory();

        if (!inventory.length) return 0;
        
        let allWeightItems = 0;
        inventory.forEach(item => {
            let weight = self.getItemWeight(item.key, item.amount);
            allWeightItems += weight;
        });
        return allWeightItems;
    }
    
    hasSpaceBackpack(itemKey) {
        // Не давать игроку взять вещь, если у него не хватает места.
        let currentWeight = this.getAllWeight();
        let weightWithItem = this.getItemWeight(itemKey);
        let nWeight = currentWeight + weightWithItem;
        let currentBackpackSlots = this.getBackpackSlots();
        let bool = nWeight > currentBackpackSlots ? false : true;
        return bool;
    }

    getBackpackSlots() {
        return this._player.getVariable('backpack').slots;
    }

    getBackpackInfo(itemKey) {
        if (!this._items[itemKey]) return console.log(`[getBackpack]: itemKey: ${itemKey}`.red);
        if (this._items[itemKey].hasOwnProperty('type') && this._items[itemKey].type === 'backpack') {
            return this._items[itemKey];
        }
    } 

    setBackpack(itemKey) {
        if (!this._items[itemKey]) return console.log(`[setBackpack]: itemKey: ${itemKey}`.red);
        let slots = this._items[itemKey].slots;
        this._player.setVariable('backpack', {
            slots: slots,
            backpack: itemKey
        });
    }

    removeBackpack() {
        this._player.setVariable('backpack', {
            slots: 12,
            backpack: null
        });
    }

    async register(login, email, password) {
        const self = this;

        if (self._player.loggedIn) return self._player.outputChatBox('!{red} > Вы уже авторизованы!');

        try {
            let dataLogin = await User.find({login});
            let dataEmail = await User.find({email});
            
            if (dataLogin.length > 0) return self._player.outputChatBox('!{red} > Такой логин уже занят!');
            if (dataEmail.length > 0) return self._player.outputChatBox('!{red} > Такой емейл уже занят!');

            await User.insertMany([{login, email, password}]);
            
            self._player.outputChatBox('!{green} Регистрация прошла успешно.');
            self.load(login);
        } catch(e) {
            console.log(e);
        }
    }

    async login(login, password) {
        const self = this;

        if (self._player.loggedIn) return self._player.outputChatBox('!{red} > Вы уже авторизованы!');

        try {
            let dataUser = await User.find({login, password});
            if (dataUser.length > 0) {
                self.load(login) // load user data
                return self._player.outputChatBox('!{green}Вы прошли логинизацию!');
            } else {
                return self._player.outputChatBox('!{red}Неверный логин/пароль!');
            }
        } catch(e) {
            self._player.outputChatBox('!{#c0c0c0}Произошла ошибка во время авторизации.');
            return console.log(e);
        }
    }

    async load(login) {
        const self = this;
        try {
            let dataUser = await User.find({login});
            if (dataUser.length > 0) {
                let data = dataUser[0];
                
                self._player.loggedIn = true;
                self._player.name = data.login;
                self._player.health = data.health;
                self._player.armour = data.armour;
                self._player.setVariable('money', data.money);
                self._player.position = data.position;
            }
        } catch(e) {
            self._player.outputChatBox('!{#c0c0c0}Ошибка инициализации данных.');
            return console.log(e);
        }
    }

    save(login) {
        const self = this;
        let health = parseInt(self._player.health);
        let armour = parseInt(self._player.armour);
        let money = parseInt(self._player.getVariable('money'));
        let position = self._player.position;

        User.updateOne({login}, {
            health,
            armour,
            money,
            position
        }, (err, result) => {
            if (err) return console.log(err);
            console.log(result);
        });
    }
}

module.exports = Player;