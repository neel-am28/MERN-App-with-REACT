import React, { useState } from 'react'
import axios from 'axios'

function CreateUser() {
    const [user, setUser] = useState({ username: '' })
    const [userError, setUserError] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        if (!user) return
        axios.post('http://localhost:5000/users/add', user)
            .then(response => {
                if (response.data.error !== '') {
                    setUserError(response.data.error)
                    setUser({ username: user.username })
                }
                if (response.data.success !== '') {
                    setUserError('')
                    setUser({ username: '' })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create new user</h2>
            <div className="form-group">
                <label>Username: </label>
                <input type="text" className="form-control" onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username} />
                {{ userError } && <p style={{ color: 'red', fontSize: '12px' }}>{userError}</p>}
            </div>

            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
        </form>
    )
}

export default CreateUser
