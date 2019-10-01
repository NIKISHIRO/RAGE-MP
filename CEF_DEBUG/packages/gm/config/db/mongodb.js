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
        mongoose.connect('mongodb://localhost/RageDayZ', {useNewUrlParser: true, useUnifiedTopology: true})
            .then(result => {
                console.log('MongoDB connected');
            })
            .catch(error => {
                console.log(`[MongoDM]: Error '${error.name}'.`.red);
            });
        self._userModel = mongoose.model('User', schemes.user);
    }

    getUserModel() {
        return this._userModel;
    }
}

module.exports = new MongoDB;