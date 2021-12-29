const mongoose = require('mongoose');
const User = require('../models/User');

async function Query(req,res){
    try{
        const branch = req.params.branch;
        const year = req.params.year;
        const user = await User.find({
            Branch: branch,
            Year: year
        });

        res.send(
            {
                status: 1,
                data: user
            }
        ).status(200);

    }catch(err){
        console.log(err.message);

        res.status(500).send({
            message: err.message || "Some error occurred while getting Posts.",
            status: -1
        });
    }
}

module.exports = {
    Query
}