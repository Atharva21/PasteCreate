const Paste = require('../models/paste');
const utils = require('../utils/utils');
exports.getMyPastes = (req, res) => {
    Paste.find({ email: req.userData.email }, (err, result) => {
        res.send(result);
    });
};

exports.storePaste = (req, res) => {
    // generating url string
    const urlString = utils.randomString(7);
    Paste.find({ url: urlString }, (err, result) => {
        if (result.length === 0) {
            console.log('Logging request body', req.body);
            const { title, data: pasteData } = req.body
            if (pasteData.length > 5000 || title.length > 500) {
                res.status(400).send("Exceeded text limit");
            }
            let private = true, email = undefined
            if (req.userData) {
                email = req.userData.email
            }
            if (!('private' in req.body)) {
                private = false;
            }
            const paste = new Paste({
                title: title,
                adddate: Date.now(),
                email: email,
                data: pasteData,
                url: urlString,
                private: private
            });
            paste.save()
                .then(result => {
                    res.send(`${process.env.DOMAIN}/${urlString}`);
                }).catch(err => {
                    res.status(500).send("Some error saving paste " + err);
                });
        } else {
            storePaste(req, res);
        }
    });
};

exports.deletePaste = (req, res) => {
    Paste.find({ _id: req.body.id }, (err, result) => {
        if (result.length && result[0].email === req.userData.email) {
            Paste.deleteOne({ _id: req.body.id }, (err) => {
                if (err) {
                    res.status(500).send("Some error deleting your paste");
                } else {
                    res.send("Delete operation successful");
                }
            });
        } else {
            res.status(403).send("Unauthorized");
        }
    });

};

exports.getPasteFromUrl = (req, res) => {
    Paste.find({ url: req.params.pasteUrl }, (err, result) => {
        console.log(result);
        console.log(req.userData);
        if (err) {
            res.send(500);
        } else if (result.length > 0 && result[0].private === true && req.userData && req.userData.email === result[0].email) {
            res.json(result);
        } else if (result.length > 0 && result[0].private === false) {
            res.json(result);
        } else {
            res.status(404).send("Not found");
        }
    });
};