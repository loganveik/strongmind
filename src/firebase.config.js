import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAfmRuXjxEDn6v0Vb0eF-LrfSYYXBIH21s",
    authDomain: "strongmind-f4ad7.firebaseapp.com",
    projectId: "strongmind-f4ad7",
    storageBucket: "strongmind-f4ad7.appspot.com",
    messagingSenderId: "760900132820",
    appId: "1:760900132820:web:a1466b59d985b1eb018041"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };