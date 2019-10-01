const mongoose = require('mongoose');

let user = new mongoose.Schema({
    login: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    money: {
        type: Number,
        default: 100
    }
});

module.exports = {
    user
};