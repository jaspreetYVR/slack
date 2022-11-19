// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDDcMoD6M6AporyLm3eFGTI1Nn2F85Reo",
    authDomain: "slack-a8e9f.firebaseapp.com",
    projectId: "slack-a8e9f",
    storageBucket: "slack-a8e9f.appspot.com",
    messagingSenderId: "962156047718",
    appId: "1:962156047718:web:e86d9bb2daf25d1295aca7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider }