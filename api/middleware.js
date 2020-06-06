const jwt = require('jsonwebtoken');
const secret = require('./secrets');

module.exports = {
    protected
}

//make sure use is authorized
function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret.JWTSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'This is the wrong token' })
            } else {
                req.decodedJWTToken = decodedToken;
                next();
            }
        })
    }
    // if (req.session && req.session.name) {
    //     next()
    // } else {
    //     res.status(401).json({ message: 'You shall not pass' })
    // }
}