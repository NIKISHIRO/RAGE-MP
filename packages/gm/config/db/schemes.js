const mongoose = require('mongoose');

let user = new mongoose.Schema({
    login: {
        type: String
    },
    password: {
        type: String
    },
    money: {
        type: Number,
        default: 100
    }
});

module.exports = {
    user
};