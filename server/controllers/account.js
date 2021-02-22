const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signUp = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    let password = req.body.password;
    bcrypt.hash(password, 10, (err, hash) => {
        if (hash === undefined) {
            console.log(err);
            return;
        }
        password = hash;
        const user = new User({
            name: name,
            email: email,
            password: password
        });
        User.find({ email: email }, (err, result) => {
            if (result.length) {
                res.status(404);
                res.send("Email is already being used by some other account");
            } else {
                user.save()
                    .then(result => {
                        res.send("Done");
                    }).catch(err => {
                        res.status = 500;
                        res.send(err);
                    });
            }
        });
    });
};

const generateAccessToken = (email) => {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: 86400 });
}

exports.signIn = (req, res) => {
    const email = req.body.email;
    let password = req.body.password;
    User.find({ email: email }, (err, result) => {
        if (result.length) {
            const dbPassword = result[0].password;
            bcrypt.compare(password, dbPassword, (err, result) => {
                if (result === true) {
                    res.json(generateAccessToken(email));
                } else {
                    res.status(400).send("Invalid credentials");
                }
            });
        } else {
            res.status(400).send("Invalid credentials");
        }
    });

};

