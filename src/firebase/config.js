// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAnQ8Imd3OC313o2jz_Gs4a4hmFX_UUkMI",
   authDomain: "curso-react-d4556.firebaseapp.com",
   projectId: "curso-react-d4556",
   storageBucket: "curso-react-d4556.appspot.com",
   messagingSenderId: "791476172910",
   appId: "1:791476172910:web:329bc385dab8f06b724e7f"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp); 
export const FirebaseDB = getFirestore(FirebaseApp);