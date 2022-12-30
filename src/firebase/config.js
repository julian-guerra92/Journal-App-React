// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
   VITE_APIKEY,
   VITE_AUTHDOMAIN,
   VITE_PROJECTID,
   VITE_STORAGEBUCKET,
   VITE_MESSAGINGSENDERID,
   VITE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
/*
Dev/Prod
const firebaseConfig = {
   apiKey: "AIzaSyAnQ8Imd3OC313o2jz_Gs4a4hmFX_UUkMI",
   authDomain: "curso-react-d45s56.firebaseapp.com",
   projectId: "curso-react-d4556",
   storageBucket: "curso-react-d4556.appspot.cosm",
   messagingSenderId: "791476172910",
   appId: "1:791476172910:web:329bc385dab8f06b724e7f"
};

Testing (instancia de firebase dedicada al testing)
const firebaseConfig = {
   apiKey: "AIzaSyBmHOcd5kZA75z3NA1ozFrpB12o1wE5L-w",
   authDomain: "curso-react-test-aa3fe.firebaseapp.com",
   projectId: "curso-react-test-aa3fe",
   storageBucket: "curso-react-test-aa3fe.appspot.com",
   messagingSenderId: "719696828279",
   appId: "1:719696828279:web:e8c57277f3ba0f821a7372"
 };
 */

const firebaseConfig = {
   apiKey: VITE_APIKEY,
   authDomain: VITE_AUTHDOMAIN,
   projectId: VITE_PROJECTID,
   storageBucket: VITE_STORAGEBUCKET,
   messagingSenderId: VITE_MESSAGINGSENDERID,
   appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);