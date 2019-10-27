let mongodb = require(ROOT+'/config/db/mongodb');
const AdminModel = mongodb.getAdminModel();

class Admin {
    constructor(player) {
        this._setup(player);
    }

    _setup(player) {
        const self = this;
        self._player = player;
    }

    checkAdmin(level) {
        const self = this;   
        console.log(self._player.getVariable('admin'));
        if (self._player.getVariable('admin') >= level) return true;
        self._player.outputChatBox('У вас не хватает прав!');
        return false;
    }
    
    async alogin(login, code) {
        const self = this; 
        login = String(login);
        code = String(code);

        const result = await AdminModel.find({login, code}, (err) => {
            if (err) return console.log(err);
        });
        
        if (result.length > 0) {
            const data = result[0];
            self._player.outputChatBox(`!{green} Вы вошли как администратор ${data.level} уровня`);
            self._player.admin = data.level;
        } else {
            self._player.outputChatBox('!{red} У вас не хватает прав!');
        }
    }
}

module.exports = Admin;