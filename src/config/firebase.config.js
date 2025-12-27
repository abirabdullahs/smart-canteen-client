// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZgJoB676thYkdGTn7qsH50-kbK7XUm1c",
  authDomain: "smart-canteen-3628c.firebaseapp.com",
  projectId: "smart-canteen-3628c",
  storageBucket: "smart-canteen-3628c.firebasestorage.app",
  messagingSenderId: "548883336026",
  appId: "1:548883336026:web:a2048ec2468643ebc94163"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);