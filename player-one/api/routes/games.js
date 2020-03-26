"use strict";

const log = console.log;

const express = require('express');
const router = express.Router();

const { Game } = require('../models/Game')
const { LongComment } = require('../models/LongComment')
const { Comment } = require('../models/Comment')

// implement DELETE

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser')

// to validate object IDs
const { ObjectID } = require('mongodb')

// Expected Input req.body: {<game object properties>}
// root: add a game
// Expected Output: <added game object>
router.post('/addGame', function(req, res) {
    const body = req.body;
    const game = new Game({
        gameName: body.gameName,
        gamPictures: body.gamPictures,
        publisher: body.publisher,
        developer: body.developer,
        introductionText: body.introductionText,
        releaseDate: body.releaseDate,
        genre: body.genre,
        thumbUp: body.thumbUp,
        thumbDown: body.thumbDown
    });
    game.save().then((result) => {
        res.send(result)
    }, (error) => {
        // 400 for bad request
        res.status(400).send(error)
    })
});

// Expected Input req.body: {isLong: Null if not LongComment
//                          <comment object properties>}
// root: add a comment
// Expected Output: <added comment object>
router.post('/addComment', function(req, res) {
    const body = req.body;
    const isLong = req.body.isLong;
    let comment;
    log(body.commentBody);
    log(isLong);
    log(typeof body.commentBody);
    if (isLong) {
        comment = new LongComment({
            title: body.title,
            commenter: body.commenter,
            time: body.time,
            gameCommented: body.gameCommented,
            commentBody: body.commentBody,
            thumbUp: body.thumbUp,
            thumbDown: body.thumbDown,
            funny: body.funny,
        });
    }
    else{
        comment = new Comment({
            commenter: body.commenter,
            time: body.time,
            gameCommented: body.gameCommented,
            commentBody: body.commentBody,
            thumbUp: body.thumbUp,
            thumbDown: body.thumbDown,
            funny: body.funny,
        });
    }
    comment.save().then((result) => {
        log(result)
        res.send(result)
    }, (error) => {
        // 400 for bad request
        res.status(400).send(error)
    })

});

// root: get all games
// Expected Output: {hottestGamesForGenre: [[<5 games per Genre>]],
//                  hottestGames: [<5 hottest games>],
//                  allGames: [<all games with only name and _id>]}
router.get('/', async function(req, res) {
    // Find all games
    let allGames = await Game.find().then((games) => {return games;},
        (error) =>
    {
        res.status(500).send(error) // server error
    });
    if (!allGames)
        allGames = [];
    if (allGames.length >= 2)
        // Sort by like rate
        allGames.sort(function(a, b) {
            return b.thumbUp / (b.thumbUp + b.thumbDown) - a.thumbUp / (a.thumbUp + a.thumbDown);
        });
    let hottest5 = allGames.filter(i => i.thumbUp + i.thumbDown >= 100);
    if (!hottest5)
        hottest5 = [];
    // Ensure at least 5 elements in hottest5
    let index = 0;
    while(hottest5.length < 5 && hottest5.length > index){
        const thisGame = allGames[index];
        if (thisGame.thumbUp + thisGame.thumbDown < 100)
            hottest5.push(thisGame);
        index += 1;
    }

    // Sort by Genre
    allGames.sort(function(a, b) { return a.genre.localeCompare(b.genre); });
    let gamesByGenre = [];
    let lastGenre = allGames[0].genre;

    index = 0;
    allGames.forEach(function (a){
        if (a.genre !== lastGenre){
            index += 1;
            gamesByGenre.push([]);
            gamesByGenre[index].push(a);
            lastGenre = a.genre;
        }
        else {
            if (!gamesByGenre[index])
                gamesByGenre.push([]);
            gamesByGenre[index].push(a);
        }
    });

    let hottest5ForAllGenre = [];
    gamesByGenre.forEach(function (list){
        if (list.length > 1)
            list.sort(function (a, b) {
                return b.thumbUp / (b.thumbUp + b.thumbDown) - a.thumbUp / (a.thumbUp + a.thumbDown);
            });
        let hottest5PerGenre = list.filter((i) => i.thumbUp + i.thumbDown >= 100);

        if (!hottest5PerGenre)
            hottest5PerGenre = [];
        // Ensure at least 5 elements in hottest5PerGenre
        index = 0;
        while(hottest5PerGenre.length < 5 && index < list.length){
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
        allGames: allGamesOnlyNameId});
});

// Game Page GET: find specific game and corresponding comments
// Expected Output: {longComments: <long Comments of this game>,
//                  shortComments: <short Comments of this game>,
//                  game: <this game object>}
router.get('/:game_id', async function(req, res){
    const id = req.params.game_id;
    let thisGame = await findGame(res, id);
    if (!thisGame){
        res.status(404).send('Game Not Found')
        return;
    }

    let {longComments, shortComments} = await findComments(res, thisGame.gameName);

    res.send({longComments: longComments,
            shortComments: shortComments,
            game: thisGame})
});

// Expected req.body: {id: <Game id>}
// Game Page DELETE: delete specific game and corresponding comments
// Expected Output: {longComments: [<long Comments of this game>],
//                  shortComments: [<short Comments of this game>],
//                  game: <this game object>}
router.delete('/:game_id', async function(req, res){

    const id = req.params.game_id;
    let thisGame = await findGame(res, id);

    if (!thisGame){
        res.status(404).send('Game Not Found');
        return;
    }
    // Find (send these for debug perpose)
    let {thisLongComments, thisShortComments} = await findComments(res, thisGame.gameName);

    // Delete
    await Game.deleteOne(
        {_id: id},
        function(err) {
            if (err)
                res.send(err);
        }
    );
    await LongComment.deleteMany(
        {gameCommented: thisGame.gameName},
        function (err) {
            if (err)
                res.send(err);
        }
    );
    await Comment.deleteMany(
        {gameCommented: thisGame.gameName},
        function (err) {
            if (err)
                res.send(err);
        }
    );
    //
    // // Save modified Comment, LongComment and Game
    // Game.save().then(
    //     (result) => {},
    //     (error) => {res.status(400).send(error)}
    // );
    // LongComment.save().then(
    //     (result) => {},
    //     (error) => {res.status(400).send(error)}
    // );
    // Comment.save().then(
    //     (result) => {},
    //     (error) => {res.status(400).send(error)}
    // );

    res.send({longComments: thisLongComments,
        shortComments: thisShortComments,
        game: thisGame})
});

// Expected req.body: {isLong: <null if short comment>}
// Game Page DELETE: delete a specific comment of a game
// Expected Output: {Comment: <Comment been deleted>}
router.delete('/comments/:comm_id', async function(req, res){

    const id = req.params.comm_id;
    const isLongComment = req.body.isLong;

    if (!ObjectID.isValid(id)) {
        // 404 not found
        res.status(404).send("Not A Valid Comment");
        return;
    }

    const thisCommentModel = isLongComment ? LongComment : Comment;
    // Delete comment
    // Find it(for debug purpose)
    const deleted = await thisCommentModel.findById(id).then((comment) => {
        if (!comment) {
            res.status(404).send("Comment Not Found");
        }
        else{
            return comment;
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

    res.send(deleted);
});

// Expected req.body: {isLong : <null if not long comment>,
//          (OPTIONAL) newCommentBody: string,
//                     thumbUp: <number to be like>,
//                     thumbDown: <number to be dislike>,
//                     funny: <number to be funny>}
// Game Page PATCH: respond to a thumb up/thumb down/funny
// Expected Output: <the object been liked/disliked/thought funny>
router.patch('/comments/:comm_id/', function(req, res) {
    const id = req.params.comm_id;
    const isLong = req.body.isLong;
    const newCommentBody = req.body.newCommentBody;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    if (isLong && newCommentBody){
        res.status(400).send("Long comment's content cannot be modified!");
        return;
    }

    const thisModel = isLong ? LongComment : Comment;
    thisModel.findById(id).then((thisComment) => {
        if (!thisComment) {
            res.status(404).send('Comment Not Found');
            return;
        }
        else{
            if (newCommentBody){
                thisComment.commentBody = newCommentBody;
                thisComment.thumbUp = 0;
                thisComment.thumbDown = 0;
                thisComment.funny = 0;
            }
            else{
                thisComment.thumbUp = req.body.thumbUp;
                thisComment.thumbDown = req.body.thumbDown;
                thisComment.funny = req.body.funny;
            }
            thisComment.save().then(
                (result) => {res.send(result)},
                (error) => {res.status(400).send(error)}
            );
        }
    }).catch((error) => {
        res.status(500).send();
    });

});

// Expected req.body: <new game object>
// Game Page PATCH: respond to a thumb up/thumb down/funny
// Expected Output: <Game object after modification>
router.patch('/:game_id/', async function(req, res) {
    const game_id = req.params.game_id;
    const newGame = req.body;
    let thisGame = await findGame(res, game_id);
    if (!thisGame){
        res.status(404).send("Game Not Found");
        return;
    }

    // Validate id
    if (!ObjectID.isValid(game_id)) {
        res.status(404).send();
        return;
    }

    thisGame.gamePictures = newGame.gamePictures;
    thisGame.gameName = newGame.gameName;
    thisGame.publisher = newGame.publisher;
    thisGame.developer = newGame.developer;
    thisGame.releaseDate = newGame.releaseDate;
    thisGame.genre = newGame.genre;
    thisGame.thumbUp = newGame.thumbUp;
    thisGame.thumbDown = newGame.thumbDown;

    thisGame.save().then(
        (result) => {res.send(thisGame)},
        (error) => {res.status(400).send(error)}
    );
});


/////////////////////////////////////////////////////////////////////////////////


// Helper funciton - find the game
async function findGame(res, game_id) {
    // Validate id
    if (!ObjectID.isValid(game_id)) {
        // 404 not found
        res.status(404).send();
    }

    // Find game
    const game = await Game.find({
        _id: game_id
    }, function(err){
        if(err){
            res.send(err)
        }
    });

    return game[0];
}

async function findComments(res, gameName){

    const longComments = await LongComment.find({
        gameCommented: gameName
    }, function(err){
        if(err)
            res.send(err)
    });
    const shortComments = await Comment.find({
        gameCommented: gameName
    }, function(err){
        if(err)
            res.send(err)
    });
    log(longComments, shortComments)
    return {longComments, shortComments};
}

module.exports = router;