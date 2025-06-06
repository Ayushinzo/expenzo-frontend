// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQfgGoC8robkNQk0oV8tDZORtyB6lAZmE",
    authDomain: "first-app-746f8.firebaseapp.com",
    projectId: "first-app-746f8",
    storageBucket: "first-app-746f8.firebasestorage.app",
    messagingSenderId: "901333494462",
    appId: "1:901333494462:web:34fdf0a1afbbda45b24cef",
    measurementId: "G-Q8GND3KEYX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
