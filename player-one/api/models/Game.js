/* Game mongoose model */
const mongoose = require('mongoose');

const Game = mongoose.model('Game', new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    gamePictures: {
        type: [{type: String}]
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
    releaseDate: {
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
    likedUsers: {
        type: [{type: String}],
        default: [],
        required: false
    },
    dislikedUsers: {
        type: [{type: String}],
        default: [],
        required: false
    },
}));

module.exports = { Game }
