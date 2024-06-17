
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB7vpXCunpiy8HB-xgWzTl9N_SeelpKODw",
  authDomain: "db-firebase-4faba.firebaseapp.com",
  projectId: "db-firebase-4faba",
  storageBucket: "db-firebase-4faba.appspot.com",
  messagingSenderId: "89013722391",
  appId: "1:89013722391:web:491210a3afc04845eceb52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 

export { storage, uploadBytesResumable, getDownloadURL };