let mongodb = require(ROOT+'/config/db/mongodb');
let auth = require(ROOT+'/modules/auth');

let User = mongodb.getUserModel();

//console.log(user);

module.exports = {
    register: (player, fullText, username) => {
        auth.register(player, fullText, username);
    },
    login: () => {
        
    },
    save: () => {

    }, 
};