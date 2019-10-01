require('colors');
const mongoose = require('mongoose');
const schemes = require('./schemes');

class MongoDB {
    constructor() {
        this._connected = false;
        this._run();
    }

    _run() {
        const self = this;
        mongoose.connect('mongodb://localhost/RageDayZ', {useNewUrlParser: true, useUnifiedTopology: true});
        self._db = mongoose.connection;
        self._db.on('error', console.error.bind(console, 'connection error:'));
        self._db.once('open', function() {
            self._connected = true;
            console.log(`[MongoDB]: connected to the server`.green);
        });

        self._userModel = mongoose.model('User', schemes.user);
    }

    getUserModel() {
        return self._userModel;
    }
}

module.exports = new MongoDB;