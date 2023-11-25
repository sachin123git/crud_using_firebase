
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDGClkGHyjvpKaRQPLnUrG8N88ssmu_sd0",
  authDomain: "country-state-city-crud.firebaseapp.com",
  databaseURL: "https://country-state-city-crud-default-rtdb.firebaseio.com",
  projectId: "country-state-city-crud",
  storageBucket: "country-state-city-crud.appspot.com",
  messagingSenderId: "425452981190",
  appId: "1:425452981190:web:9f42e2a37dd427870480c7",
  measurementId: "G-P02DTWLBQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getAuth(app);
