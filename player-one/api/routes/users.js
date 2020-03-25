const express = require('express');
const router = express.Router();

const { ObjectID } = require('mongodb')

// import models
const { User } = require('../models/User')
const { Game } = require('../models/Game')
const { LongComment } = require('../models/LongComment')
const { Comment } = require('../models/Comment')


// list all users
router.get('/', function(req, res) {
  User.find().then((users) => {
    res.send({ users })
  }, (error) => {
    res.status(500).send(error)
  })
});


// add a user
router.post('/', function(req, res) {
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

module.exports = router;
