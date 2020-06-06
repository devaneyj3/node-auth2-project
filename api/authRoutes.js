const express = require('express');

const routes = express.Router();

const db = require('./db_Query')

const bcrypt = require('bcryptjs')

const mw = require('./middleware');

const jwt = require('jsonwebtoken');

const secret = require('./secrets');

// POST register a user
routes.post('/register', async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;

    await db.PostAdmin(req.body)

    res.status(201).send(req.body)
})

//GET login user
routes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //finds admin with the passed in username
    const user = await db.findAdmin(username)

    //compare hashes of passwords with the specific username hash
    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ error: 'Invalid Credentials' })
    }
    else {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome, ${user.username}`, token })
    }
})

//GET USERS WHEN LOGGED IN
routes.get('/users', mw.protected, async (req, res) => {
    try {
        const users = await db.getUsers()
        if (users) {
            res.status(200).send(users)
        } else {
            res.status(404).json({ message: 'There are no users in the database' })
        }

    } catch (err) {
        res.status(500).json({ message: "There is an error with the server" })
    }
})
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    } 
    const options = {
        expiresIn: '1hr'
    }
    return jwt.sign(payload, secret.JWTSecret, options)
}


module.exports = routes;