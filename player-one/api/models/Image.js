/**
 * Reference Acknowledgement:
 *      Code in this file are borrowed and modified from code
 *      posted by Prof. Mark; Credits to TA Maliha.
 *
 * Link: https://github.com/csc309-winter-2020/cloudinary-mongoose-react
 */

/* Image mongoose model */
const mongoose = require('mongoose');

// create an image schema
const imageSchema = mongoose.Schema({
    // image id on cloudinary server
    image_id: {
        type: String,
        required: true
    },
    // image url on cloudinary server
    image_url: {
        type: String,
        required: true
    },
    // what is the ise case of this?
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// create an image model using the schema
const Image = mongoose.model('Image', imageSchema);

module.exports = {Image};