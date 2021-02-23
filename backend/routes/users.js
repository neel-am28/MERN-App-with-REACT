const router = require('express').Router()

// require model file
const User = require('../models/user.model')

// @route: localhost:5000/users
// @desc: get all users
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ', err))
})

// @route: localhost:5000/users/add
// @desc: add a user
router.post('/add', (req, res) => {
    const username = req.body.username
    User.findOne({ username: username })
        .then((user) => {
            if (user) {
                return res.json({ error: 'That username already exists', success: '' })
            } else {
                const newUser = new User({ username })
                newUser.save()
                    .then(() => res.json({ success: 'user added successfully', error: '' }))
                    .catch(err => res.status(400).json('Error: ', err))
            }
        })
        .catch(err => res.status(400).json('Error: ', err))

})

module.exports = router