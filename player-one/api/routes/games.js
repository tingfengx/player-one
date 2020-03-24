"use strict";

const log = console.log;

const express = require('express');
const router = express.Router();

const { Game } = require('../models/Game')
const { LongComment } = require('../models/LongComment')
const { Comment } = require('../models/Comment')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser')

// to validate object IDs
const { ObjectID } = require('mongodb')

// root: get all games
// Expected Output: {hottestGamesForGenre: [[<5 games per Genre>]],
//                  hottestGames: [<5 hottest games>],
//                  allGames: [<all games with only name and _id>]}
router.get('/', function(req, res) {
    let allGames;
    // Find all games
    Games.find().then((games) => {
        allGames = games;
    }, (error) => {
        res.status(500).send(error) // server error
    });

    // Sort by like rate
    allGames.sort(function(a, b) {
        return b.thumbUp / (b.thumbUp + b.thumbDown) - a.thumbUp / (a.thumbUp + a.thumbDown);
    });
    let hottest5 = allGames.filter(i => i.thumbUp + i.thumbDown >= 100);
    // Ensure at least 5 elements in hottest5
    let index = 0;
    while(hottest5.length < 5){
        const thisGame = allGames[index];
        if (thisGame.thumbUp + thisGame.thumbDown < 100)
            hottest5.push(thisGame);
        index += 1;
    }

    // Sort by Genre
    allGames.sort(function(a, b) { return a.genre.localeCompare(b.genre); });
    let gamesByGenre = [];
    let lastGenre = allGames[0].genre;

    allGames.forEach(function (a){
        if (a.genre !== lastGenre){
            index += 1;
            gamesByGenre[index] = [a];
            lastGenre = a.genre;
        }
        else {
            gamesByGenre[index].push(a);
        }
    });

    let hottest5ForAllGenre = [];
    gamesByGenre.forEach(function (list){
        list.sort(function (a, b) {
            return b.thumbUp / (b.thumbUp + b.thumbDown) - a.thumbUp / (a.thumbUp + a.thumbDown);
        });
        let hottest5PerGenre = list.filter(i => i.thumbUp + i.thumbDown >= 100);
        // Ensure at least 5 elements in hottest5PerGenre
        index = 0;
        while(hottest5PerGenre.length < 5){
            const thisGame = list[index];
            if (thisGame.thumbUp + thisGame.thumbDown < 100)
                hottest5PerGenre.push(thisGame);
            index += 1;
        }
        hottest5ForAllGenre.push(hottest5PerGenre.slice(0, 5));
    });

    let allGamesOnlyNameId = [];
    for (let i = 0, len = allGames.length; i < len; i++) {
        allGamesOnlyNameId.push({_id: allGames[i]._id, gameName: allGames[i].gameName})
    }

    // Make Sure only 5 games for hottest5 and hottest5PerGenre
    res.send({hottestGamesForGenre: hottest5ForAllGenre,
        hottestGames: hottest5.slice(0, 5),
        allGames: allGamesOnlyNameId.slice(0, 5)});
});

// Game Page GET: find specific game and corresponding comments
// Expected Output: {longComments: <long Comments of this game>,
//                  shortComments: <short Comments of this game>,
//                  game: <this game object>}
router.get('/games/:game_id', function(req, res){
    const id = req.params.game_id;
    let thisGame = findGame(id);
    let {longComments, shortComments} = findComments(thisGame.gameName);

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

    const id = req.body.id;
    let thisGame = findGame(id);

    // Find (send these for debug perpose)
    let {thisLongComments, thisShortComments} = findComments(thisGame.gameName);

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

    const id = req.params.id;
    const game_id = req.params.game_id;
    const isLongComment = req.body.isLongComment;

    let thisGame = findGame(game_id);
    // Validate id
    if (!ObjectID.isValid(id)) {
        // 404 not found
        res.status(404).send();
        return;
    }

    let thisCommentModel = isLongComment ? LongComment : Comment;
    // Delete comment
    // Find it(for debug purpose)
    thisCommentModel.findById(id).then((comment) => {
        if (!comment) {
            res.status(404).send();
        }
        else{
            if (isLongComment)
                deletedLong = comment;
            else
                deletedShort = comment;
        }
    }).catch((error) => {
        // 500 Server error
        res.status(500).send();
    });
    // Delete it
    thisCommentModel.deleteOne(
        {_id: id},
        function(err) {
            if (err){
                res.send(err);
            }
        }
    );
    // Save LongComment
    thisCommentModel.save().then(
        (result) => {res.send({longComments: deletedLong,
                               shortComments: deletedShort,
                               game: thisGame})},
        (error) => {
            res.status(400).send(error);}
    );
});

// Expected req.body: {id: <Game id>,
//                     isGame: <0: game, 1: long comment, 2: short comment>,
//                     thumbUp: <number to be added to like>,
//                     thumbDown: <number to be added to dislike>,
//                     funny: <number to be added to funny>}
// Game Page PATCH: respond to a thumb up/thumb down/funny
// Expected Output: {beenPatched: <the object been liked/disliked/thought funny>,
//                  game: <this game object>}
router.patch('/games/:game_id/', function(req, res) {
    const game_id = req.params.game_id;
    const id = req.body.id;
    const isGame = req.body.isGame;
    let thisGame = findGame(game_id);
    let toBeSaved = {};

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    if (isGame === 0){
        thisGame.thumbUp += req.body.thumbUp;
        thisGame.thumbDown += req.body.thumbDown;
        toBeSaved = thisGame;
    }
    else if (isGame === 1){
        LongComment.findById(id).then((thisLongComment) => {
            if (!thisLongComment) {
                res.status(404).send();
            }
            else{
                thisLongComment.thumbUp += req.body.thumbUp;
                thisLongComment.thumbDown += req.body.thumbDown;
                thisLongComment.funny += req.body.funny;
                toBeSaved = thisLongComment;
            }
        }).catch((error) => {
            res.status(500).send();
        });
    }
    else{
        Comment.findById(id).then((thisShortComment) => {
            if (!thisShortComment) {
                res.status(404).send();
            }
            else{
                thisShortComment.thumbUp += req.body.thumbUp;
                thisShortComment.thumbDown += req.body.thumbDown;
                thisShortComment.funny += req.body.funny;
                toBeSaved = thisShortComment;
            }
        }).catch((error) => {
            res.status(500).send();
        });
    }

    toBeSaved.save().then(
        (result) => {res.send({beenPatched: result,
                               game: thisGame})},
        (error) => {res.status(400).send(error)}
    );
});


/////////////////////////////////////////////////////////////////////////////////


// Helper funciton - find the game
function findGame(game_id) {
    // Validate id
    if (!ObjectID.isValid(game_id)) {
        // 404 not found
        res.status(404).send();
        return;
    }

    // Find game
    Game.findById(game_id).then((game) => {
        if (!game) {
            // Can't find the game
            res.status(404).send();
        }
        else{
            return game;
        }
    }).catch((error) => {
        // 500 Server error
        res.status(500).send();
    });
}

function findComments(gameName){
    let longComments = [];
    let shortComments = [];
    LongComment.map((i) => {
        if (i.gameCommented === gameName)
            longComments.push(i);
    });
    Comment.map((i) => {
        if (i.gameCommented === gameName)
            shortComments.push(i);
    });
    return {longComments, shortComments};
}