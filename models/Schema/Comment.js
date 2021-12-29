const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

module.exports = CommentSchema;
