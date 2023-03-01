import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtxVoE-vED7ooD72QYMUSqjJM08_xAlpg",
  authDomain: "reactjs-course-86d8c.firebaseapp.com",
  projectId: "reactjs-course-86d8c",
  storageBucket: "reactjs-course-86d8c.appspot.com",
  messagingSenderId: "514659015677",
  appId: "1:514659015677:web:0597669aa24ec99c661794",
  measurementId: "G-3PEF37BQDZ",
};

const firebaseApp = initializeApp(firebaseConfig);

const database = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { database, auth };

