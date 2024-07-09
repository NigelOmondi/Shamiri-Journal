import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiX9o6m9b6PutJHrUBjoUhAcq5tm7pLcA",
  authDomain: "smart-journal-68d56.firebaseapp.com",
  projectId: "smart-journal-68d56",
  storageBucket: "smart-journal-68d56.appspot.com",
  messagingSenderId: "875630599065",
  appId: "1:875630599065:web:ef98369db411be33329108",
  measurementId: "G-GFC9XP45RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export default app;