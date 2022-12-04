// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHVE8qr86cwpV8BZbvJpkYzk4nmZdq1Io",
  authDomain: "yonah-microblogging-itc.firebaseapp.com",
  projectId: "yonah-microblogging-itc",
  storageBucket: "yonah-microblogging-itc.appspot.com",
  messagingSenderId: "392930829836",
  appId: "1:392930829836:web:fe2a9f9f2ad8b13e56b029",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
