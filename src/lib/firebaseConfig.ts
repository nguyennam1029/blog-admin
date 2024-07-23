
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
   apiKey: "AIzaSyDDg7j76xzFsS-PRl3FDhPLtDqwbVBFKp4",
  authDomain: "blog-16f4e.firebaseapp.com",
  projectId: "blog-16f4e",
  storageBucket: "blog-16f4e.appspot.com",
  messagingSenderId: "147924567528",
  appId: "1:147924567528:web:492ecb3a0d492ab661905d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 

export { storage, uploadBytesResumable, getDownloadURL };