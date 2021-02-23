import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function ExercisesList() {
    const [exercises, setExercises] = useState([])

    async function getExercises() {
        try {
            const exercises = await axios.get('http://localhost:5000/exercises/')
            setExercises(exercises.data)
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        getExercises()
    }, [])

    async function deleteExercise(id) {
        try {
            const deleted = await axios.delete(`http://localhost:5000/exercises/${id}`)
            if (deleted) {
                setExercises(exercises.filter(exercise => exercise._id !== id))
            }
        } catch (err) {
            console.log(err);
        }
    }

    function exerciseList() {
        return exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />;
        })
    }
    function Exercise({ exercise, deleteExercise }) {
        return (

            <tr>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{exercise.date.substring(0, 10)}</td>
                <td>
                    <Link to={`/edit/${exercise._id}`} className="btn btn-sm btn-warning mr-1">edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => { deleteExercise(exercise._id) }}>delete</button>
                </td>
            </tr>
        )
    }
    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList
