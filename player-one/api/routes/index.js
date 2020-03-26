/**
 * Legacy Note: 
 * 
 *    *** This file is not in use ***
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(express.static(__dirname + "../../client/build"));

// All routes other than above will go to index.html
router.get("*", (req, res) => {
    res.sendFile(__dirname + "../../client/build/index.html");
});

module.exports = router;
