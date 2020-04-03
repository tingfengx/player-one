"use strict";

const log = console.log;

const express = require('express');
const router = express.Router();

const {Game} = require('../models/Game');
const {LongComment} = require('../models/LongComment');
const {Comment} = require('../models/Comment');
const {User} = require('../models/User');

// implement DELETE

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');

// to validate object IDs
const {ObjectID} = require('mongodb');


// Expected Input req.body: {<game object properties>}
// root: add a game
// Expected Output: <added game object>
router.post('/addGame', function (req, res) {
    const body = req.body;
    console.log(body);
    let game;
    try {
        game = new Game({
            gameName: body.gameName,
            gamePictures: body.gamePictures,
            publisher: body.publisher,
            developer: body.developer,
            introductionText: body.introductionText,
            releaseDate: body.releaseDate,
            genre: body.genre,
            thumbUp: body.thumbUp,
            thumbDown: body.thumbDown,
        });
        game.save().then((result) => {
            res.send(result)
        }, (error) => {
            // 400 for bad request
            res.status(400).send(error)
        })
    } catch (err) {
        res.status(400).send(err);
    }
});


// Expected Input req.body: {isLong: Null if not LongComment
//                          <comment object properties>}
// root: add a comment
// Expected Output: <added comment object>
router.post('/addComment', function (req, res) {
    const body = req.body;
    const isLong = req.body.isLong;
    let comment;
    log(body.commentBody);
    try {
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
        } else {
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
    } catch (err) {
        res.status(400).send(err);
    }
    comment.save().then((result) => {
        log(result);
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
router.get('/', async function (req, res) {
    // Find all games
    let allGames = await Game.find().then((games) => {
            return games;
        },
        (error) => {
            res.status(500).send(error) // server error
        });
    if (!allGames)
        allGames = [];
    if (allGames.length >= 2)
        // Sort by like rate
        allGames.sort(function (a, b) {
            const a_total = a.thumbUp + a.thumbDown;
            const b_total = b.thumbUp + b.thumbDown;
            if (a_total === 0)
                return 1;
            if (b_total === 0)
                return -1;
            return b.thumbUp / b_total - a.thumbUp / a_total;
        });
    let hottest5 = allGames.filter(i => i.thumbUp + i.thumbDown >= 100);
    if (!hottest5)
        hottest5 = [];
    // Ensure at least 5 elements in hottest5
    let index = 0;
    while (hottest5.length < 5 && allGames.length > index) {
        const thisGame = allGames[index];
        if (thisGame.thumbUp + thisGame.thumbDown < 100)
            hottest5.push(thisGame);
        index += 1;
    }

    // Sort by Genre
    allGames.sort(function (a, b) {
        return a.genre.localeCompare(b.genre);
    });
    let gamesByGenre = [];
    let lastGenre = allGames[0].genre;

    index = 0;
    allGames.forEach(function (a) {
        if (a.genre !== lastGenre) {
            index += 1;
            gamesByGenre.push([]);
            gamesByGenre[index].push(a);
            lastGenre = a.genre;
        } else {
            if (!gamesByGenre[index])
                gamesByGenre.push([]);
            gamesByGenre[index].push(a);
        }
    });

    let hottest5ForAllGenre = [];
    gamesByGenre.forEach(function (list) {
        if (list.length > 1)
            list.sort(function (a, b) {
                const a_total = a.thumbUp + a.thumbDown;
                const b_total = b.thumbUp + b.thumbDown;
                if (a_total === 0)
                    return 1;
                if (b_total === 0)
                    return -1;
                return b.thumbUp / b_total - a.thumbUp / a_total;
            });
        let hottest5PerGenre = list.filter((i) => i.thumbUp + i.thumbDown >= 100);

        if (!hottest5PerGenre)
            hottest5PerGenre = [];
        // Ensure at least 5 elements in hottest5PerGenre
        index = 0;
        while (hottest5PerGenre.length < 5 && index < list.length) {
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
    res.send({
        hottestGamesForGenre: hottest5ForAllGenre,
        hottestGames: hottest5.slice(0, 5),
        allGames: allGamesOnlyNameId
    });
});

// Game Page GET: find specific game and corresponding comments
// Expected Output: {longComments: <long Comments of this game>,
//                  shortComments: <short Comments of this game>,
//                  game: <this game object>}
router.get('/:game_id', async function (req, res) {
    const id = req.params.game_id;
    let thisGame = await findGame(res, id);
    if (!thisGame) {
        res.status(404).send('Game Not Found');
        return;
    }

    let {longComments, shortComments} = await findComments(res, id);

    res.status(200).send({
        longComments: longComments,
        shortComments: shortComments,
        game: thisGame
    })
});

// Expected req.body: {id: <Game id>}
// Game Page DELETE: delete specific game and corresponding comments
// Expected Output: {longComments: [<long Comments of this game>],
//                  shortComments: [<short Comments of this game>],
//                  game: <this game object>}
router.delete('/:game_id', async function (req, res) {

    const id = req.params.game_id;
    let thisGame = await findGame(res, id);
    const thisUserIds = thisGame.likedUsers;

    if (!thisGame) {
        res.status(404).send('Game Not Found');
        return;
    }
    // Find (send these for debug perpose)
    let {thisLongComments, thisShortComments} = await findComments(res, id);

    // Delete
    await Game.deleteOne(
        {_id: id},
        function (err) {
            if (err)
                res.status(500).send(err);
        }
    );
    await LongComment.deleteMany(
        {gameCommented: id},
        function (err) {
            if (err)
                res.status(500).send(err);
        }
    );
    await Comment.deleteMany(
        {gameCommented: id},
        function (err) {
            if (err)
                res.status(500).send(err);
        }
    );

    // Find users and delete the game
    const thisUsers = await User.find({
        '_id': {$in: thisUserIds}
    }, function (err) {
        if (err)
            res.send(err)
    });
    log(thisUsers);
    thisUsers.map((user) => {
        for (let i = 0; i < user.likedGames.length; i++){
            if (user.likedGames[i] === id)
                user.likedGames.splice(i, 1);
        }
        user.save().then(
            (result) => {
                res.send(result)
            },
            (error) => {
                res.status(400).send(error)
            }
        );
    });

    res.send({
        longComments: thisLongComments,
        shortComments: thisShortComments,
        game: thisGame
    })
});

// Expected req.body: {isLong: <null if short comment>}
// Game Page DELETE: delete a specific comment of a game
// Expected Output: {Comment: <Comment been deleted>}
router.delete('/comments/:comm_id', async function (req, res) {

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
        } else {
            return comment;
        }
    }).catch((error) => {
        // 500 Server error
        res.status(500).send(error);
    });
    // Delete it
    thisCommentModel.deleteOne(
        {_id: id},
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );

    res.send(deleted);
});

// Expected req.body: {username: <username>
//                     isLong : <null if not long comment>,
//          (OPTIONAL) newCommentBody: string,
//                     thumbUp: <number to be like>,
//                     thumbDown: <number to be dislike>,
//                     funny: <number to be funny>}
// Game Page PATCH: respond to a thumb up/thumb down/funny
// Expected Output: <the object been liked/disliked/thought funny>
router.patch('/comments/:comm_id/', async function (req, res) {
    const id = req.params.comm_id;
    const isLong = req.body.isLong;
    const newCommentBody = req.body.newCommentBody;
    const username = req.body.username;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    if (isLong && newCommentBody) {
        res.status(400).send("Long comment's content cannot be modified!");
        return;
    }

    let thisUser = await User.findOne({
        username: username
    }, function (err) {
        if (err) {
            res.send(err)
        }
    });

    const thisModel = isLong ? LongComment : Comment;
    thisModel.findById(id).then((thisComment) => {
        if (!thisComment) {
            res.status(404).send('Comment Not Found');
        } else {
            try {
                if (newCommentBody) {
                    thisComment.commentBody = newCommentBody;
                    thisComment.likedUsers = [];
                    thisComment.dislikedUsers = [];
                    thisComment.thumbUp = 0;
                    thisComment.thumbDown = 0;
                    thisComment.funny = 0;
                } else {
                    // Update who likes/dislikes the game
                    if (thisComment.thumbUp < req.body.thumbUp && username !== 'admin')
                    {
                        if (thisComment.likedUsers.includes(thisUser._id)){
                            res.send(thisComment);
                            return;
                        }
                        thisComment.likedUsers.push(thisUser._id);
                        // remove from dislikedUsers
                        for (let i = 0; i < thisComment.dislikedUsers.length; i++){
                            if (thisComment.dislikedUsers[i] === thisUser._id.toString()){
                                req.body.thumbDown -= 1;
                                thisComment.dislikedUsers.splice(i, 1);
                            }
                        }
                    }
                    else if (thisComment.thumbDown < req.body.thumbDown && username !== 'admin') {
                        if (thisComment.dislikedUsers.includes(thisUser._id)){
                            res.send(thisComment);
                            return;
                        }
                        thisComment.dislikedUsers.push(thisUser._id);
                        // remove from likedUsers
                        for (let i = 0; i < thisComment.likedUsers.length; i++) {
                            if (thisComment.likedUsers[i] === thisUser._id.toString()) {
                                req.body.thumbUp -= 1;
                                thisComment.likedUsers.splice(i, 1);
                            }
                        }
                    }
                    thisComment.thumbUp = req.body.thumbUp;
                    thisComment.thumbDown = req.body.thumbDown;
                    thisComment.funny = req.body.funny;
                }
            } catch (err) {
                res.status(400).send(err);
            }
            thisComment.save().then(
                (result) => {
                    res.send(thisComment)
                },
                (error) => {
                    res.status(400).send(error)
                }
            );
        }
    }).catch((error) => {
        // Server error
        res.status(500).send(error);
    });

});

// Expected req.body: {username: <username>, game: <new game object>}
// Game Page PATCH: respond to a thumb up/thumb down/funny
// Expected Output: <Game object after modification>
router.patch('/:game_id/', async function (req, res) {
    const game_id = req.params.game_id;
    const newGame = req.body.game;
    const username = req.body.username;
    let thisGame = await findGame(res, game_id);
    if (!thisGame) {
        res.status(404).send("Game Not Found");
        return;
    }

    let thisUser = await User.findOne({
        username: username
    }, function (err) {
        if (err) {
            res.send(err)
        }
        }
    );

    // User only need liked games
    if (thisGame.thumbUp < newGame.thumbUp && thisUser.username !== 'admin')
    {
        // check if already liked
        if (thisGame.likedUsers.includes(thisUser._id)){
            res.send(thisGame);
            return;
        }
        thisGame.likedUsers.push(thisUser._id);
        thisUser.likedGames.push(game_id);
        thisUser.save().then(
            (result) => {},
            (error) => {
                res.status(400).send(error)
            }
        ).catch(e => log(e));
        // remove from dislikedUsers
        for (let i = 0; i < thisGame.dislikedUsers.length; i++){
            if (thisGame.dislikedUsers[i] === thisUser._id.toString()){
                log("find it!")
                newGame.thumbDown -= 1;
                thisGame.dislikedUsers.splice(i, 1);
                log(thisGame.dislikedUsers)
            }
        }
    }
    else if (thisGame.thumbDown < newGame.thumbDown && thisUser.username !== 'admin')
    {
        if (thisGame.dislikedUsers.includes(thisUser._id))
        {
            res.send(thisGame);
            return;
        }
        thisGame.dislikedUsers.push(thisUser._id);
        // remove from likedUsers
        for (let i = 0; i < thisGame.likedUsers.length; i++){
            if (thisGame.likedUsers[i] === thisUser._id.toString()){
                log("find it!")
                newGame.thumbUp -= 1;
                thisGame.likedUsers.splice(i, 1);
                log(thisGame.likedUsers)
            }
        }
    }

    try {
        thisGame.gamePictures = newGame.gamePictures;
        thisGame.gameName = newGame.gameName;
        thisGame.publisher = newGame.publisher;
        thisGame.developer = newGame.developer;
        thisGame.releaseDate = newGame.releaseDate;
        thisGame.genre = newGame.genre;
        thisGame.thumbUp = newGame.thumbUp;
        thisGame.thumbDown = newGame.thumbDown;
    } catch (err) {
        res.status(400).send(err);
        return;
    }

    thisGame.save().then(
        (result) => {
            res.send(thisGame)
        },
        (error) => {
            res.status(400).send(error)
        }
    );
});


// Expected Input: user_id
// GET: get all comments the specified user commented
router.get('/comments/byUser/:user_id', async function (req, res) {
    const user_id = req.params.user_id;
    const user = await User.findById(user_id).then((user) => {
        if (!user) {
            res.status(404).send("User Not Found");
        } else {
            return user;
        }
    });
    const username = user.username;
    const {longComments, shortComments} = await findCommentsByUser(res, username);
    res.send({longComments, shortComments})
});


/////////////////////////////////////////////////////////////////////////////////


// Helper funciton - find the game
async function findGame(res, game_id) {
    // Validate id
    if (!ObjectID.isValid(game_id)) {
        // 404 not found
        res.status(404).send("Invalid id");
        return;
    }

    // Find game
    const game = await Game.find({
        _id: game_id
    }, function (err) {
        if (err) {
            res.send(err)
            return;
        }
    });

    return game[0];
}

async function findComments(res, game_id) {

    const longComments = await LongComment.find({
        gameCommented: game_id
    }, function (err) {
        if (err)
            res.send(err)
    });
    const shortComments = await Comment.find({
        gameCommented: game_id
    }, function (err) {
        if (err)
            res.send(err)
    });
    log(longComments, shortComments);
    return {longComments, shortComments};
}

async function findCommentsByUser(res, username) {

    const longComments = await LongComment.find({
        commenter: username
    }, function (err) {
        if (err)
            res.send(err)
    });
    const shortComments = await Comment.find({
        commenter: username
    }, function (err) {
        if (err)
            res.send(err)
    });
    log(longComments, shortComments);
    return {longComments, shortComments};
}

module.exports = router;
