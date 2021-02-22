const Paste = require('../models/paste');
exports.getMyPastes = (req, res) => {
    Paste.find({ email: email }, (err, result) => {
        res.send(result);
    });
};

exports.storePaste = (req, res) => {

};