const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

async function AddPost(req, res) {
  try {
    const currentTIme = new Date()/1000;
    const UnixTime = new Date('1/1/1970')/1000;

    const score = (currentTIme - UnixTime)/45000;

    const PostData = {
      userId: res.locals.user._id,
      title: req.body.title,
      description: req.body.description,
      Likes: 0,
      createdAt: new Date(),
      Score: score,
      TimeScore: score,
    };
    const post = new Post(PostData);
    await post.save();
    res.send({
        status: 1,
        message: "Post Added Successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Post.",
      status: -1,
    });
  }
}

async function LikePost(req,res) {
  try {
    const post = await Post.findById(req.body.id);
    console.log(post);
    post.Likes += 1;
    post.Score = Math.log10(post.Likes) + post.TimeScore;
    await post.save();
    res.send({
      status: 1,
      message: "Post Liked Successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message || "Some error occurred while Liking the Post.",
      status: -1,
    });
  }
}

module.exports = {
  AddPost,
  LikePost
};
