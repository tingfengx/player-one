/* Game mongoose model */
const mongoose = require('mongoose')

const Game = mongoose.model('Game', new mongoose.schema({
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
    // how many people interested in this game
    heat: {
        type: Number,
        default: 0,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    dislikes: {
        type: Number,
        default: 0,
        required: true
    }
}));

module.exports = { Game }
