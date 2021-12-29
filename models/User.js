const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    Branch: {
        type: String,
    },
    Year: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
    likedPosts: {
        type: [String],
        default: [],
    }
});

userSchema.ComparePassworrd = (currentpassword) => {
    bcrypt.compare(currentpassword, this.password, (err, isMatch) => {
        if(err) throw err;
        return isMatch;
    });
}

module.exports = mongoose.model('Auth', userSchema);