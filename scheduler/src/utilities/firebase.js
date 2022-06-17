// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPOZtf43HOf5eYIF3IR94Qk4tbmzhelCI",
  authDomain: "scheduler-db9ad.firebaseapp.com",
  databaseURL: "https://scheduler-db9ad-default-rtdb.firebaseio.com",
  projectId: "scheduler-db9ad",
  storageBucket: "scheduler-db9ad.appspot.com",
  messagingSenderId: "33252458212",
  appId: "1:33252458212:web:4d9405f5bea290bba0b6f1",
  measurementId: "G-95B4JP9QD0"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };