import { createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase";

export const Context = createContext(null)

export function ContextProvider({ children  }) {

    let auth = getAuth(app)

    let userEmail;

    onAuthStateChanged(auth, (user)=>{
        if (user){
            userEmail = user.email
        }
    })

    let value = {
        email: userEmail
    }
    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>
    )
}