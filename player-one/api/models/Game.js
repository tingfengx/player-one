/* Game mongoose model */
const mongoose = require('mongoose')

const Game = mongoose.model('Game', new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    gamPictures: {
        type: [String]
    },
    publisher: {
        type: String
    },
    developer: {
        type: String
    },
    introductionText: {
        type: String,
        required: true
    },
    publishTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    thumbUp: {
        type: Number,
        required: true
    },
    thumbDown: {
        type: Number,
        required: true
    },
}));

module.exports = { Game }
