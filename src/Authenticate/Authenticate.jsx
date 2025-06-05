import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase';

function Authenticate({ children }) {
    let auth = getAuth(app)
    let navigate = useNavigate()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in.
            console.log("User is logged in:", user.uid);
        } else {
            // No user is signed in.
            console.log("User is not logged in.");
            navigate("/auth/sign-in")
        }
    });
    return (
        <>
            {children}
        </>
    )
}

export default Authenticate
