const jwt = require('jsonwebtoken');
exports.authenticateRequest = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        res.status(401).json("Unauthorized user");
    }
    try {
        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        res.status(400).json('Invalid token ');
    }
}

exports.softAuthenticate = (req, res, next) => {
    let authorization = undefined;
    if ('authorization' in req.headers) {
        authorization = req.headers['authorization'];
    }
    try {
        if (authorization) {
            const token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.userData = decoded;
        } else {
            req.userData = undefined;
        }
        next();
    } catch (err) {
        next();
    }
};