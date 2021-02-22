const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require('mongoose');

require('dotenv').config();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

const accountRoute = require('./routes/account');

app.use('/account', accountRoute);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(process.env.PORT);
}).catch(err => {
    console.log(err);
})