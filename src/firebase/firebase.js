import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBg9Bjms1BpU4m7k6P2g2Qg0CyP_yH92TU",
    authDomain: "selfcare-7d16a.firebaseapp.com",
    projectId: "selfcare-7d16a",
    storageBucket: "selfcare-7d16a.appspot.com",
    messagingSenderId: "855060523492",
    appId: "1:855060523492:web:7913c563bb8d83ac077ff1"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export default app;