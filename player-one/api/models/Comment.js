/* Short Comment mongoose model */
const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', {
    commenter: {
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
     * LongComments are array of strings, since there are paragraphs
     * here the comment is just a string. 
     */
    commentBody: {
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
    }
})

module.exports = { Comment }
