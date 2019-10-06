const Player = require(ROOT+'/modules/users/player');

module.exports = {
    register: (player, fullText, login, email, password) => {
        console.time('[CommandRegister]');

        if (!fullText) return player.outputChatBox('!{red}/register [login] [email] [password]');

        login = String(login).trim();
        password = String(password).trim();
        email = String(email).trim();

        let validLogin = (login) => /^[a-zA-Z0-9_-]{3,16}$/.test(login);
        let validPassword = (password) => /^[a-zA-Z0-9_-]{6,30}$/.test(password);
        let validEmail = (email) => /.+@.+\..+/i.test(email);
        
        if (!validLogin(login) || !validPassword(password) || !validEmail(email)) {
            return player.outputChatBox('!{red} Проверьте введенные данные!');
        }

        let p = new Player(player);
        p.register(login, email, password);
        
        console.timeEnd('[CommandRegister]');
    },
    login: (player, fullText, login, password) => {
        console.time('[CommandLogin]');

        if (!fullText) return player.outputChatBox('!{red}/login [login] [password]');
        
        login = String(login).trim();
        password = String(password).trim();

        let p = new Player(player);
        p.login(login, password);

        console.timeEnd('[CommandLogin]');
    },
    save: (player, fullText) => {
        console.time('[CommandSave]');
        let p = new Player(player);
        p.save(player.name);
        console.timeEnd('[CommandSave]');
    }
};