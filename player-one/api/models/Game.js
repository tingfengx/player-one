/* Game mongoose model */
const mongoose = require('mongoose')

const Game = mongoose.model('Game', {
    gameNname: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        // default: 1
    },
    gamPictures: {
        type: [String]
    },
    publisher: {
        type: String
    },
    maker: {
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
    }
})

module.exports = { Game }
