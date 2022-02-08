// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdHhNUW0RwB6XlnRveZZb-NT210BHZgtw",
    authDomain: "wish-list-33527.firebaseapp.com",
    projectId: "wish-list-33527",
    storageBucket: "wish-list-33527.appspot.com",
    messagingSenderId: "278936974459",
    appId: "1:278936974459:web:34dce6cfd989a99dafdede"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };