// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiv-JC5yj087Nvyq2Psek3BBNacwifyWM",
  authDomain: "eko-nlp.firebaseapp.com",
  projectId: "eko-nlp",
  storageBucket: "eko-nlp.appspot.com",
  messagingSenderId: "1012689262774",
  appId: "1:1012689262774:web:586dade8a5d9c85f79ee17",
  measurementId: "G-MLBKFT7SMB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
