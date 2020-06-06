
module.exports = {
    protected
}

//make sure use is authorized
function protected(req, res, next) {
    if (req.session && req.session.name) {
        next()
    } else {
        res.status(401).json({ message: 'You shall not pass' })
    }
}