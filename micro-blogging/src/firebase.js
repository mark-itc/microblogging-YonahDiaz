import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHVE8qr86cwpV8BZbvJpkYzk4nmZdq1Io",
  authDomain: "yonah-microblogging-itc.firebaseapp.com",
  projectId: "yonah-microblogging-itc",
  storageBucket: "yonah-microblogging-itc.appspot.com",
  messagingSenderId: "392930829836",
  appId: "1:392930829836:web:fe2a9f9f2ad8b13e56b029",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
