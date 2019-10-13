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
            .then(() => {
                this._connected = true;
                console.log('MongoDB connected'.green);
            })
            .catch(error => {
                console.log(`[MongoDM]: Error '${error.name}'.`.red);
            });
        self._userModel = mongoose.model('User', schemes.user); 
        self._adminModel = mongoose.model('Admin', schemes.admin);
        self._teleportModel = mongoose.model('Teleport', schemes.teleport);
    }

    getUserModel() {
        return this._userModel;
    }

    getAdminModel() {
        return this._adminModel;
    }

    getTeleportModel() {
        return this._teleportModel;
    }
}

module.exports = new MongoDB;