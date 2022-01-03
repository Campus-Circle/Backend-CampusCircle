const express = require('express');
const app = express()

var cors = require('cors')

app.use(express.json())
app.use(cors())
const mongoose = require('mongoose');
require('dotenv').config()

const Auth = require('./Auth/auth');
const Post = require('./Feed/Post');
const Feed = require('./Feed/Feed');
const Find = require('./UserFind/Find');
mongoose.connect(`${process.env.DB_URI}`);


const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/validate',Auth.Validate,(req,res) => res.send({status: 1}) );

// Feed
app.get('/feed/new/:id', Auth.Validate, Feed.ShowNew);
app.get('/feed/hot/:id', Auth.Validate, Feed.ShowHot);

// Post
app.post('/post/add', Auth.Validate, Post.AddPost);
app.post('/post/dislike', Auth.Validate, Post.DislikePost);
app.post('/post/like', Auth.Validate, Post.LikePost);

// Find Users
app.get('/find/:branch/:year',Auth.Validate,Find.Query);

// Auth
app.post('/auth/signup', Auth.SignUp);
app.post('/auth/login', Auth.Login);

app.listen(PORT,(req,res) => {
    console.log(`Listening index.js on Port ${PORT}`);
})


