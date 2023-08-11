import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../components/Firebase'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setLoading(true)
            setUser(user)
            if (user) {
                navigate('/home')
            }
        })
    }, [user])

    const users = auth.currentUser

    if (users !== null && null !== users) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = users.displayName;
        const email = users.email;
        const photoURL = users.photoURL;
        const emailVerified = users.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = users.uid;
    }


    return (
        <AuthContext.Provider value={{ user, users }}>
            {children}
        </AuthContext.Provider>
    )
}

