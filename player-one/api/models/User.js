/* User mongoose model */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        minlength: 4,
        required: true
    },
    /**
     * The publicID = ... field for user's avatar
     */
    avatarId: {
        type: String,
        default: "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585790658/user_account/default-avatar_itqie5.png",
        required: false
    },
    bio: {
        type: String,
        default: "Love to share my favorite games with you!",
        required: false // allow admin have no bio
    },
    /**
     * FIXME: ?should we delete this?
     */
    profileTags: {
        type: [{type: String}],
        required: false // allow admin have no tags
    },
    gameTags: {
        type: [{type: String}],
        required: false // allow admin have no tags
    },
    likedGames: {
        type: [{type: String}],
        required: false
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

// hash password when creating a new user
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// hash password when updating password
UserSchema.pre("findOneAndUpdate", function(next) {
    const password = this.getUpdate().$set.password;
    if (!password) {
        return next();
    }
    try {
        bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				this.getUpdate().$set.password = hash;
				next()
			})
		})
        // const salt = Bcrypt.genSaltSync();
        // const hash = Bcrypt.hashSync(password, salt);
        // this.getUpdate().$set.password = hash;
        // next();
    } catch (error) {
        return next(error);
    }
});


// get user by username and password when login
UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }
