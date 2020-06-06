const express = require('express');

const routes = express.Router();

const db = require('./db_Query')

const bcrypt = require('bcryptjs')

const mw = require('./middleware');

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
    //set the session for the duration of the login
    req.session.name = username;
    //finds admin with the passed in username
    const user = await db.findAdmin(username)

    //compare hashes of passwords with the specific username hash
    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ error: 'Invalid Credentials' })
    }
    else {
        res.status(200).json({ message: `Welcome, ${user.username}` })
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
//User logs out
routes.get('/logout', async (req, res) => {
    try {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    res.send("Error logging out");
                } else {
                    res.send("Good bye")
                }
            })
        } else {
            res.status(404).json({ message: 'There are no users in the database' })
        }

    } catch (err) {
        res.status(500).json({ message: "There is an error with the server" })
    }
})


module.exports = routes;