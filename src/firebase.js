// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUJSaWI1rTln1bCoUKW7zfY-23C-FeIbQ",
  authDomain: "react-project-01-ad6a1.firebaseapp.com",
  projectId: "react-project-01-ad6a1",
  storageBucket: "react-project-01-ad6a1.appspot.com",
  messagingSenderId: "770456852548",
  appId: "1:770456852548:web:69251c43230460e2b1c411",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
