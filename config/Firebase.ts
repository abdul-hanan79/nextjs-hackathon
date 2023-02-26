import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAvJEKmuG-19ll5AfmAOol4bBRbPcDheqg",
    authDomain: "event-planner-applicatio-5205c.firebaseapp.com",
    projectId: "event-planner-applicatio-5205c",
    storageBucket: "event-planner-applicatio-5205c.appspot.com",
    messagingSenderId: "984269891489",
    appId: "1:984269891489:web:1777985772c714c8650de0",
    measurementId: "G-QZ3K6TKXK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged }
// file > storage > get download url -> firestore db