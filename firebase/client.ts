// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCLW00EkaOh3pXElFURBFcb8MDHV7Sbgc4",
    authDomain: "prepwise-327a9.firebaseapp.com",
    projectId: "prepwise-327a9",
    storageBucket: "prepwise-327a9.firebasestorage.app",
    messagingSenderId: "927204831822",
    appId: "1:927204831822:web:f92f9dfeaabac8c187c91f",
    measurementId: "G-PZVPFPS4C0"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);