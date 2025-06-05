import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";
import app from "../firebase/firebase.js";
import axios from 'axios';

let auth = getAuth(app)

async function SignInWithGoogle(navigate) {
    try {
        const googleProvider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, googleProvider)
        if (result){
            navigate('/user/dashboard')
        }
    } catch (error) {
        console.log(error)
    }
}

export { SignInWithGoogle }