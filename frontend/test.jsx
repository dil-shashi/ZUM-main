import React, { useRef, useState, useEffect } from 'react'
import './style.css'

const App = () => {
    const [loading, setLoading] = useState(false)
    const [usersList, setUsersList] = useState([])

    const fetchUsers = () => {
        setLoading(true)
        setTimeout(() => {
            setUsersList([...usersList,
            {
                name: `user ${usersList.length + 1}`,
                age: Math.floor(Math.random() * 50)
            }])
            setLoading(false)
        }, 2000)
    }

    return (
        <>
            <button className="btn" onClick={fetchUsers} disabled={loading}>{loading ? "fetching users" : "refresh Users"}</button>
            {!loading && usersList.length > 0 ?
                <table>
                    <tr><th>name</th><th>age</th></tr>
                    {usersList.map(user => (
                        <tr><th>{user.name}</th><th>{user.age}</th></tr>
                    ))}
                </table>
                : <h5>No users found</h5>}
        </>

    )
}


export default App