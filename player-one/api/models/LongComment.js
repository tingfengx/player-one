/* Long Comment mongoose model */
const mongoose = require('mongoose')

const LongComment = mongoose.model('LongComment', new mongoose.Schema({
    commenter: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    },
    gameCommented: {
        type: String,
        required: true
    },
    /**
     * Short comments are just strings, long comments allow 
     * paragraphs, and hence is an array of strings. 
     */
    commentBody: {
        type: [String],
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
    funny: {
        type: Number,
        required: true
    }
}))

module.exports = { LongComment }
