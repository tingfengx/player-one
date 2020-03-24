"use strict";

const log = console.log;

var express = require('express');
var router = express.Router();

const { Game } = require('../models/Game')
const { LongComment } = require('../models/LongComment')
const { Comment } = require('../models/Comment')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser')

// to validate object IDs
const { ObjectID } = require('mongodb')

// TO BE DISCUSSED WITH TEAMMATES
// // root: get all games
// router.get('/', function(req, res) {
//     Games.find().then((games) => {
//         res.send({ games })
//     }, (error) => {
//         res.status(500).send(error) // server error
//     })
// });


// Game Page GET: find specific game and corresponding comments
// Expected Output: {longComments: <long Comments of this game>,
//                  shortComments: <short Comments of this game>,
//                  game: <this game object>}
router.get('/games/:game_id', function(req, res){
    let thisGame;

    const id = req.params.game_id;
    // Validate id
    if (!ObjectID.isValid(id)) {
        // 404 not found
        res.status(404).send();
        return;
    }

    // Find game
    Game.findById(id).then((game) => {
        if (!game) {
            // Can't find the game
            res.status(404).send()
            return;
        } else {
            // Choose not wrap by another object {game} this time
            thisGame = game;
        }
    }).catch((error) => {
        // 500 Server error
        res.status(500).send()
        return;
    });

    let longComments = [];
    let shortComments = [];
    LongComment.map((i) => {
        if (i.gameCommented === thisGame.gameName)
            longComments.push(i);
    });
    Comment.map((i) => {
        if (i.gameCommented === thisGame.gameName)
            shortComments.push(i);
    });

    res.send({longComments: longComments,
            shortComments: shortComments,
            game: thisGame})
});

// Expected req.body: {id: <Game id>}
// Game Page DELETE: delete specific game and corresponding comments
// Expected Output: {longComments: [<long Comments of this game>],
//                  shortComments: [<short Comments of this game>],
//                  game: <this game object>}
router.delete('/<Game Manager Page>', function(req, res){
    let thisGame;

    const id = req.body.id;
    // Validate id
    if (!ObjectID.isValid(id)) {
        // 404 not found
        res.status(404).send();
        return;
    }

    // Find game
    Game.findById(id).then((game) => {
        if (!game) {
            // Can't find the game
            res.status(404).send()
            return;
        } else {
            // Choose not wrap by another object {game} this time
            thisGame = game;
        }
    }).catch((error) => {
        // 500 Server error
        res.status(500).send()
        return;
    });

    // Find (send these for debug perpose)
    let thisLongComments = [];
    let thisShortComments = [];
    LongComment.map((i) => {
        if (i.gameCommented === thisGame.gameName)
            thisLongComments.push(i);
    });
    Comment.map((i) => {
        if (i.gameCommented === thisGame.gameName)
            thisShortComments.push(i);
    });

    // Delete
    Game.deleteOne(
        {_id: id},
        function(err) {
            if (err)
                res.send(err);
        }
    );
    LongComment.deleteMany(
        {gameCommented: thisGame.gameName},
        function(err) {
            if (err)
                res.send(err);
        }
    );
    Comment.deleteMany(
        {gameCommented: thisGame.gameName},
        function(err) {
            if (err)
                res.send(err);
        }
    );

    // Save modified Comment, LongComment and Game
    Game.save().then(
        (result) => {},
        (error) => {res.status(400).send(error)}
    );
    LongComment.save().then(
        (result) => {},
        (error) => {res.status(400).send(error)}
    );
    Comment.save().then(
        (result) => {},
        (error) => {res.status(400).send(error)}
    );

    res.send({longComments: thisLongComments,
        shortComments: thisShortComments,
        game: thisGame})
});

// Expected req.body: {id: <Game id>,
//                     isLongComment: <true for long comment, vise versa>}
// Game Page DELETE: delete a specific comment of a game
// Expected Output: {longComment: <long Comment been deleted>,
//                  shortComment: <short Comment been deleted>,
//                  game: <this game object>}
router.delete('/games/:game_id/', function(req, res){
    let deletedLong = {};
    let deletedShort = {};
    let thisGame;

    const id = req.params.d;
    const game_id = req.params.game_id;
    const isLongComment = req.body.isLongComment;

    // Validate id
    if (!ObjectID.isValid(id)) {
        // 404 not found
        res.status(404).send();
        return;
    }
    if (!ObjectID.isValid(game_id)) {
        // 404 not found
        res.status(404).send();
        return;
    }

    // Find game to ensure
    Game.findById(game_id).then((game) => {
        if (!game) {
            // Can't find the game
            res.status(404).send()
            return;
        }
        else{
            thisGame = game;
        }
    }).catch((error) => {
        // 500 Server error
        res.status(500).send()
        return;
    });

    // Delete comment
    if (isLongComment){
        // Find it(for debug purpose)
        LongComment.findById(id).then((comment) => {
            if (!comment) {
                res.status(404).send()
                return;
            }
            else{
                deletedLong = comment;
            }
        }).catch((error) => {
            // 500 Server error
            res.status(500).send()
            return;
        });
        // Delete it
        LongComment.deleteOne(
            {_id: id},
            function(err) {
                if (err)
                    res.send(err);
            }
        );
        // Save LongComment
        LongComment.save().then(
            (result) => {},
            (error) => {res.status(400).send(error)}
        );
    }
    else{
        // Find it(for debug purpose)
        Comment.findById(id).then((comment) => {
            if (!comment) {
                res.status(404).send()
                return;
            }
            else{
                deletedShort = comment;
            }
        }).catch((error) => {
            // 500 Server error
            res.status(500).send()
            return;
        });
        // Delete it
        Comment.deleteOne(
            {_id: id},
            function(err) {
                if (err)
                    res.send(err);
            }
        );
        // Save Comment
        Comment.save().then(
            (result) => {},
            (error) => {res.status(400).send(error)}
        );
    }

    res.send({longComments: deletedLong,
        shortComments: deletedShort,
        game: thisGame})
});