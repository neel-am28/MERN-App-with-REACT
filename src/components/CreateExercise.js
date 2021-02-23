import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import ExercisesList from './ExercisesList'

function CreateExercise() {
    const [userAdded, setUserAdded] = useState(false)
    const [exercise, setExercise] = useState(
        {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        })
    async function getUsers() {
        try {
            const users = await axios.get('http://localhost:5000/users/')
            if (users.data.length > 0) {
                setExercise({
                    users: users.data.map(user => user.username),
                    username: users.data[0].username,
                    description: '',
                    date: new Date(),
                    duration: 0
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newExercise = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }
        axios.post('http://localhost:5000/exercises/add', newExercise)
            .then(response => {
                setUserAdded(true)
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            {userAdded === true && <ExercisesList />}
            {userAdded === false &&
                <div>
                    <h3>Create New Exercise Log</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <select
                                required
                                className="form-control"
                                value={exercise.username}
                                onChange={(e) => setExercise({ ...exercise, username: e.target.value })}>
                                {
                                    exercise.users.map(function (user) {
                                        return <option key={user} value={user}>{user}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text" required className="form-control" onChange={(e) => setExercise({ ...exercise, description: e.target.value })} value={exercise.description} />
                        </div>
                        <div className="form-group">
                            <label>Duration (in minutes): </label>
                            <input type="text" className="form-control" onChange={(e) => setExercise({ ...exercise, duration: e.target.value })} value={exercise.duration} />
                        </div>
                        <div className="form-group">
                            <label>Date: </label>
                            <div>
                                <DatePicker onChange={(date) => setExercise({ ...exercise, date })} selected={exercise.date} />
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                        </div>
                    </form>
                </div>}
        </div>
    )
}

export default CreateExercise
