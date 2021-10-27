import firebase from 'firebase'
require('firebase/auth')


const firebaseConfig = {
  apiKey: "AIzaSyAPje1TfhIGfktXoVJSjQyN4lzA-hwfZPQ",
  authDomain: "brand-f7fbe.firebaseapp.com",
  projectId: "brand-f7fbe",
  storageBucket: "brand-f7fbe.appspot.com",
  messagingSenderId: "521382684419",
  appId: "1:521382684419:web:57ccaf05552da596d12b36"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
