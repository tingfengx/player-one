/**
 * Reference Acknoledgement: 
 * this code was borrowed from Prof. Mark's StudentAPI example, posted on quercus
 */

/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */

const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PlayerOneAPI';


const mongoATLAS = "mongodb+srv://player-one:player-one@cluster0-icowb.mongodb.net/test";

mongoose.connect(mongoATLAS, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose }  // Export the active connection.
