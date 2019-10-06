const mongoose = require('mongoose');

let user = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        default: 100,
    },
    health: {
        type: Number,
        default: 100
    },
    armour: {
        type: Number,
        default: 100
    },
    position: {
        type: Object,
        default: {
            x: 666,
            y: 666,
            z: 666
        }
    },
});

module.exports = {
    user
};