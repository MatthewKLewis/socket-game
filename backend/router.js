//Middleware
const express = require('express');
const router = express.Router();

// Import Models
const User = require('./model/user.model')
const Room = require('./model/room.model')

router.use(express.json());

router.get('/', (req, res)=> {
    res.send('Server is up and running')
})

//POST LOGIN INFO, RETURN DATA
router.post('/user', (req, res)=> {
    console.log(req.body)

    //take the .username and .password from req.body... and query the database for a player matching the login info. If there is one, return the info to the client.
    User.findOne(
        {
            username: req.body.username,
            password: req.body.password
        }
    ).then((user)=> {
        if (user) res.json(user)
        else res.json({error: 'error'})
    })
})

// GET THE FIRST ROOM
router.get('/room', (req, res)=> {
    Room.findOne().then((user)=> {
        res.json(user)
    })
})

module.exports = router;