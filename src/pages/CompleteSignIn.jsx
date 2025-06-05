import React, { useEffect, useState } from "react";
import app from '../firebase/firebase';
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAuth
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function CompleteSignIn() {
  const [message, setMessage] = useState("Verifying link...");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let auth = getAuth(app)
  async function finishSignIn() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        email = window.prompt("Please provide your email for confirmation:");
      }

      try {
        const result = await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem("emailForSignIn");
        setMessage(`✅ Signed in as ${result.user.email}`);
        setLoading(false);

        // Optional: Redirect to protected page after sign-in
        setTimeout(() => {
          navigate("/user/dashboard"); // or another route
        }, 2000);
      } catch (error) {
        console.error("Sign-in error", error);
        setMessage(`❌ Error signing in: ${error.message}`);
        setLoading(false);
      }
    } else {
      setMessage("⚠️ Invalid or expired sign-in link.");
      setLoading(false);
    }
  }
  useEffect(() => {
    finishSignIn()
  }, [])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Completing Sign-In
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <p className={`text-center text-lg ${message.includes('✅') ? 'text-green-600' :
              message.includes('❌') ? 'text-red-600' :
                'text-yellow-600'
            }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default CompleteSignIn