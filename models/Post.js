const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CommentSchema = require('./Schema/Comment');

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    Likes: {
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    Score: {
        type: Number,
        required: true,
    },
    TimeScore: {
        type: Number,
        required: true,
    },
    Comments: [CommentSchema],
});


module.exports = mongoose.model('Post', PostSchema);