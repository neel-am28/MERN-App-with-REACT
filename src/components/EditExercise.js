import React, { useState, useEffect } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import ExercisesList from './ExercisesList'
import { useHistory } from 'react-router-dom';


function EditExercise() {
    const history = useHistory();
    const params = useParams()
    const [isEdited, setIsEdited] = useState(false)
    const [exercise, setExercise] = useState(
        {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
        })

    useEffect(() => {
        async function getExercise() {
            try {
                const response = await axios.get(`http://localhost:5000/exercises/${params.id}`)
                setExercise({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            } catch (err) {
                console.log(err);
            }
        }
        getExercise()
        return () => {
            setIsEdited(false)
        }
    }, [params.id])

    async function handleSubmit(e) {
        const updateExercise = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }

        try {
            e.preventDefault()
            const response = await axios.post(`http://localhost:5000/exercises/update/${params.id}`, updateExercise)
            const data = await response.data
            if (data) {
                history.push("/");
                setIsEdited(true)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {isEdited === true && <ExercisesList />}
            {isEdited === false && <form onSubmit={handleSubmit}>
                <h3>Edit User Exercise Log</h3>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" value={exercise.username} className="form-control" readOnly />
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
                    <input type="submit" value="Update" className="btn btn-primary" />
                </div>
            </form>}
        </div>
    )
}

export default EditExercise
