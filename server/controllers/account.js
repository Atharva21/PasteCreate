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
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: 2629746 });
}

exports.signIn = (req, res) => {
    const email = req.body.email;
    let password = req.body.password;
    User.find({ email: email }, (err, result) => {
        if (err) {
            res.status(500).send("Server error");
        }
        if (result.length) {
            const dbPassword = result[0].password;
            bcrypt.compare(password, dbPassword, (err, passwordsMatch) => {
                if (passwordsMatch === true) {
                    res.json({ 'token': generateAccessToken(email), id: result[0]._id, name: result[0].name });
                } else {
                    res.status(403).send("Invalid credentials");
                }
            });
        } else {
            res.status(403).send("Invalid credentials");
        }
    });
};

exports.isLoggedIn = (req, res) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        res.sendStatus(401)
    }
    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded)
            res.sendStatus(200)
        else
            res.sendStatus(401)
    } catch (err) {
        res.sendStatus(401)
    }
};

