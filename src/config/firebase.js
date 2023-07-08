import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv5psvWFmJLpyaYySmjENwdVqj_Y-DNuY",
  authDomain: "fir-practice-522ce.firebaseapp.com",
  projectId: "fir-practice-522ce",
  storageBucket: "fir-practice-522ce.appspot.com",
  messagingSenderId: "369372984408",
  appId: "1:369372984408:web:b9cf312b86d7a0fe7d062d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

export { db, auth };
