const fs = require('fs');
const path = require('path');

let p = path.resolve(__dirname, 'evnts');

fs.readdir(p, (err, files) => {
    if (err) return console.log('Ошибка подключения файла '+ __dirname);

    try {
        for(file of files) {
            let events = require(path.resolve(p, file));
            for(event in events) {
                mp.events.add(event, events[event]);
            }
        }
    } catch(e) {
        console.log(e);
    }
});