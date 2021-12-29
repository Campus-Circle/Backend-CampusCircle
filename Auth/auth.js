const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

async function SignUp(req,res) {
    try{
    const user = new User({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        name: req.body.name,
        Branch: req.body.branch,
        Year: req.body.year,
    });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send({
        token : token,
        status : 1
    });    

    }catch(err){
        
        console.log(err.message);

        res.status(500).send({
            message: err.message || "Some error occurred while creating the User.",
            status: -1
        });
    }
}

async function Login(req,res){
    try{
        const credentials = {
            email: req.body.email,
            password: req.body.password
        }

        const user = await User.findOne({email: credentials.email});

        if(!user){
            return res.status(401).send({
                message: "Invalid Credentials",
                status: -1
            });
        }else{
            const isMatch = await bcrypt.compare(credentials.password, user.password);
            if(!isMatch){
                return res.status(401).send({
                    message: "Invalid Password",
                    status: -1
                });
            }else{
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
                res.header('auth-token', token).send({
                    token : token,
                    status : 1,
                    user: user._doc
                });
            }
        }
    }catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while logging in.",
            status: -1
        });   
    }
}

async function Validate(req,res,next){
    

    try{
        console.log(req.headers);
        if(req.headers.authorization === undefined){
            return res.status(403).send({
                message: "Unauthorized",
                status: -1
            });
        }
        const bearer = req.headers.authorization.split(' ')[1];
        jwt.verify(bearer, process.env.TOKEN_SECRET, (err, authData) => {
            if(err){
                res.status(403).send({
                    message: "Forbidden",
                    status: -1
                });
            }else{
                User.findOne({_id: authData._id}, (err, user) => {
                    if(err) throw err;
                    if(!user){
                        res.status(403).send({
                            message: "Forbidden",
                            status: -1
                        });
                    }else{
                        res.locals.user = user._doc;
                        next()
                    }
                })
            }
        })
    }catch(err){
        res.status(4003).send({
            message: err.message || "Some error occurred while validating the token.",
            status: -1
        });
    }
}



module.exports = {
    SignUp,
    Login,
    Validate
}

/*
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWM0MjAxYTQ2ZGMzMjlkMzFiOWZiMTQiLCJpYXQiOjE2NDAyNDMyMjZ9.BVB3YDadVncW_7Sea_cK8hS8nsiZPUGGJ-puw8twL5g",
  "status": 1
}
*/