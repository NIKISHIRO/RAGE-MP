const fs = require('fs');
const path = require('path');

let p = path.resolve(__dirname, 'cmds');
fs.readdir(p, (err, files) => {
    if (err) return console.log('Ошибка подключения в файле: '+ __filename);

    try {
        for(file of files) {
            let command = require(path.resolve(p, file));
            for(cmd in command) {
                mp.events.addCommand(cmd, command[cmd]); 
            }
        }
    } catch (e) {
        return console.log(e);
    }
});