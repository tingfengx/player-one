"use strict";

const log = console.log;

const express = require('express');
const router = express.Router();

const { ObjectID } = require('mongodb')

// import models
const { User } = require('../models/User')
const { Game } = require('../models/Game')
const { LongComment } = require('../models/LongComment')
const { Comment } = require('../models/Comment')


// authorizer
const userChecker = (req, res, next) => {
  const userId = req.cookies.userId
  console.log(userId)
  if (!userId) {
    res.status(401).send("Unauthorized")
  } else {
    User.findOne({ _id: userId }).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        req.user = user
        next()
      }
    }).catch((error) => {
      res.status(401).send("Unauthorized")
    })
  }
};


// authorizer for admin-only api
const adminChecker = (req, res, next) => {
  const userId = req.cookies.userId

  if (!userId) {
    res.status(401).send("Unauthorized")
  } else {
    User.findOne({ _id: userId }).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        if (user.userType !== 'admin') {
          return Promise.reject()
        } else {
          req.user = user
          next()
        }
      }
    }).catch((error) => {
      res.status(401).send("Unauthorized")
    })
  }
};


// list all users
router.get('/', adminChecker, function (req, res) {
  User.find().then((users) => {
    res.send({ users })
  }, (error) => {
    res.status(500).send(error)
  })
});


// add a user: sign up
router.post('/', function (req, res) {
  // create a new user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    userType: req.body.userType
  })

  // save the user
  user.save().then((user) => {
    res.send(user)
  }, (error) => {
    res.status(400).send(error)
  })
});


// get user by userId
router.get('/:userId', userChecker, function (req, res) {
  const userId = req.params.userId

  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send()
		return;
  }
  
  // get user
  User.findOne({ _id: userId }).then((user) => {
    if (!user) {
      res.status(404).send()
    } else {
      res.send(user)
    }
  }).catch((error) => {
    res.status(404).send()
  })
});


// delete user by username
router.delete('/:userId', adminChecker, function (req, res) {
  const userId = req.params.userId

  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send()
		return;
  }

  //delete user
  User.findOneAndDelete({ _id: userId }).then((user) => {
    if (!user) {
      res.status(404).send()
    } else {
      res.send(user)
    }
  }).catch((error) => {
    res.status(404).send()
  })
});


// update user password
router.patch('/:userId/password', userChecker, function (req, res) {
  const userId = req.params.userId
  const password = req.body.password
  const authenticatedUser = req.user

  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send()
		return;
  }

  // check if caller is user himself/herself or admin
  if (!req.user) {
    res.status(401).send('Unauthorized')
    return
  } else {
    if (authenticatedUser._id != userId && authenticatedUser.userType !== 'admin') {
      res.status(401).send('Unauthorized')
      return
    }
  }

  //update password
  User.findOneAndUpdate({ _id: userId }, {
    $set: {
      password: password
    }
  }, {
    new: true
  }).then(
    (user) => {
      if (!user) {
        res.status(404).send()
      } else {
        res.send(user)
      }
    }
  ).catch((error) => {
    res.status(400).send()
  })
});


// update user avatarId
router.patch('/:userId/avatar', userChecker, function (req, res) {
  const userId = req.params.userId
  const avatarId = req.body.avatarId
  const authenticatedUser = req.user

  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send()
		return;
  }

  // check if caller is user himself/herself
  if (!req.user) {
    res.status(401).send('Unauthorized')
    return
  } else {
    if (authenticatedUser._id != userId) {
      res.status(401).send('Unauthorized')
      return
    }
  }

  // update avatarId
  User.findOneAndUpdate({ _id: userId }, {
    $set: {
      avatarId: avatarId
    }
  }, {
    new: true
  }).then(
    (user) => {
      if (!user) {
        res.status(404).send()
      } else {
        res.send(user)
      }
    }
  ).catch((error) => {
    res.status(400).send()
  })
});


// update user bio
router.patch('/:userId/bio', userChecker, function (req, res) {
  const userId = req.params.userId
  const bio = req.body.bio
  const authenticatedUser = req.user

  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send()
		return;
  }

  // check if caller is user himself/herself
  if (!req.user) {
    res.status(401).send('Unauthorized')
    return
  } else {
    if (authenticatedUser._id != userId) {
      res.status(401).send('Unauthorized')
      return
    }
  }

  // update bio
  User.findOneAndUpdate({ _id: userId }, {
    $set: {
      bio: bio
    }
  }, {
    new: true
  }).then(
    (user) => {
      if (!user) {
        res.status(404).send()
      } else {
        res.send(user)
      }
    }
  ).catch((error) => {
    res.status(400).send()
  })
});


// update user tags
router.patch('/:userId/tags', userChecker, function (req, res) {
  const userId = req.params.userId
  const tags = req.body.tags
  const authenticatedUser = req.user

  // check if userId is valid
	if (!ObjectID.isValid(userId)) {
		res.status(404).send()
		return;
  }

  // check if caller is user himself/herself
  if (!req.user) {
    res.status(401).send('Unauthorized')
    return
  } else {
    if (authenticatedUser._id != userId) {
      res.status(401).send('Unauthorized')
      return
    }
  }

  // update tags
  User.findOneAndUpdate({ _id: userId }, {
    $set: {
      tags: tags
    }
  }, {
    new: true
  }).then(
    (user) => {
      if (!user) {
        res.status(404).send()
      } else {
        res.send(user)
      }
    }
  ).catch((error) => {
    res.status(400).send()
  })
});


// sign in: set cookie
router.post('/login', function (req, res) {
  const username = req.body.username
  const password = req.body.password

  User.findByUsernamePassword(username, password).then((user) => {
    if (!user) {
      res.status(400).send()
    } else {
      res.cookie('userId', user._id.toString(), { expires: new Date(Date.now() + 900000), httpOnly: true})
      res.cookie('username', user.username, { expires: new Date(Date.now() + 900000), httpOnly: true})
      res.cookie('userType', user.userType, { expires: new Date(Date.now() + 900000), httpOnly: true})
      res.send(user)
    }
  }).catch((error) => {
    res.status(400).send()
  })
});


// sign out
// can directly clear cookie in frontend
// router.get('/logout', function (req, res) {
// });


module.exports = router;
