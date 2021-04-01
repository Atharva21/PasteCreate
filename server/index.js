const express = require('express');
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors())

const accountRoute = require('./routes/account');
const pasteRoute = require('./routes/paste');

app.use('/account', accountRoute);
app.use('/paste', pasteRoute);
app.get('/:pasteUrl', pasteRoute);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(process.env.PORT);
}).catch(err => {
    console.log(err);
})