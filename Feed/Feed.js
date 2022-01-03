const mongoose = require('mongoose');

const Post = require('../models/Post');

async function ShowNew(req,res){
    try{
        let post = await Post.find({},null,{sort:{createdAt:-1},skip:10*(req.params.id-1),offset:2});

        post = post.map((item) => {
            const isLiked = item.likes.includes(res.locals.user._id);
            return {
                ...item._doc,
                isLiked: isLiked
            };
        });


        res.send(
            {
                status: 1,
                data: post
            }
        ).status(200);

    }catch(err){
        console.log(err);

        res.status(500).send({
            message: err.message || "Some error occurred while getting Posts.",
            status: -1
        });
    }
}

async function ShowHot(req,res){
    try{
        let post = await Post.find({},null,{sort:{Score:-1},limit:10,offset:10*req.params.id});

        post = post.map((item) => {
            const isLiked = item.likes.includes(res.locals.user._id);
            return {
                ...item._doc,
                isLiked: isLiked
            };
        });

        res.send(
            {
                status: 1,
                data: post
            }
        ).status(200);
    }catch(err){

        console.log(err);

        res.status(500).send({
            message: err.message || "Some error occurred while getting Posts.",
            status: -1
        })
    }
}


module.exports = {
    ShowNew,
    ShowHot
};