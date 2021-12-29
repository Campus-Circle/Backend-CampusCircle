const mongoose = require('mongoose');
const Auth = require('./Auth/auth');
mongoose.connect('mongodb://localhost:27017/test');


Auth.Login().then(() => {
    console.log('done');
}).catch((err) => {
    console.log(err);
});