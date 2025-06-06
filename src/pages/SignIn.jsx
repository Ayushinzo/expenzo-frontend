import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import app from '../firebase/firebase.js';
import { SignInWithGoogle } from '../services/LoginWithGoogle.jsx'

function SignIn() {
  let auth = getAuth(app)
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const actionCodeSettings = {
    url: `${import.meta.env.VITE_FRONTEND_URL}/complete-signIn`,
    handleCodeInApp: true,
  };

  async function sendEmail(e) {
    e.preventDefault()
    try {
      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          // Save email locally to finish sign-in later
          window.localStorage.setItem('emailForSignIn', email);
          alert("Email link sent! Check your inbox.");
        })
        .catch((error) => {
          alert("Error sending email link");
        });
    } catch (error) {
      alert("Error sending email link");
    }
  }
  return (
    <div className="rounded-md p-8 text-white w-[400px] shadow-2xl backdrop-blur-md bg-black border border-white/20">
      <h2 className='text-2xl text-center font-bold'>Sign In</h2>
      <div className="flex flex-col gap-4 mt-6">
        <button onClick={() => SignInWithGoogle(navigate)} className="flex items-center justify-center gap-2 bg-transparent p-2 rounded-full cursor-pointer border">
          <img src="/google.svg" alt="Google" className="w-6 h-6" />
          Sign in with Google
        </button>
      </div>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <form onSubmit={sendEmail} className='w-full' action="" method="get">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            required
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
              }
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" size='large' className="bg-blue-500 text-white rounded-full hover:bg-blue-600" variant="contained">Sign In</Button>
        </Box>
      </form>
    </div >
  )
}

export default SignIn
