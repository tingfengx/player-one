/* User mongoose model */
const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    /**
     * The publicID = ... field for user's avatar
     */
    avatarId: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false // allow admin have no bio
    },
    /**
     * FIXME: ?should we delete this?
     */
    tags: {
        type: [String],
        required: false // allow admin have no tags
    },
    userType: {
        type: String,
        enum: ["user", "superuser", "admin"],
        required: true
    },
    registerTime: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = { User }
