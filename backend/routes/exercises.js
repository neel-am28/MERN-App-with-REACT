const router = require('express').Router()

const Exercise = require('../models/exercise.model')

// @route: localhost:5000/exercises
// @desc: get all exercises
router.get('/', (req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ', err))
})

// @route: localhost:5000/exercises/add
// @desc: add an exercise
router.post('/add', (req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({ username, description, duration, date })

    newExercise.save()
        .then(() => res.json('exercise added successfully'))
        .catch(err => res.status(400).json('Error: ', err))
})

// @route: localhost:5000/exercises/:id
// @desc: get an exercise by its id
router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ', err))
})

// @route: localhost:5000/exercises/:id
// @desc: delete an exercise by its id
router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('exercise deleted successfully!'))
        .catch(err => res.status(400).json('Error: ', err))
})

// @route: localhost:5000/exercises/update/:id
// @desc: update an exercise by its id
router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('exercise updated successfully!'))
                .catch(err => res.status(400).json('Error: ', err));
        })
        .catch(err => res.status(400).json('Error: ', err));
})

module.exports = router