const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 0
    }
});

const user = new mongoose.Schema({
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

let teleport = new mongoose.Schema({
    point: {
        type: String,
    },
    cords: {
        type: Object,
    }
});

module.exports = {
    user,
    admin,
    teleport
};