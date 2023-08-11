// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpWZUCpAafpRFJ3obtrtwdjpNqu4_vAuE",
    authDomain: "buzztalk-3984a.firebaseapp.com",
    projectId: "buzztalk-3984a",
    storageBucket: "buzztalk-3984a.appspot.com",
    messagingSenderId: "364191810131",
    appId: "1:364191810131:web:2f94a13bb8d50b839dbca6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
