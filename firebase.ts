// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMEorOzShA70qRkD3FLxqD04P-TD8kU1k",
    authDomain: "ts-react-netflix1230.firebaseapp.com",
    projectId: "ts-react-netflix1230",
    storageBucket: "ts-react-netflix1230.appspot.com",
    messagingSenderId: "397078373187",
    appId: "1:397078373187:web:77614fbcde5f227688c5f6",
    databaseURL: 'https://ts-react-netflix1230-default-rtdb.firebaseio.com/'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore();
const auth = getAuth();

export default app
export { db, auth }