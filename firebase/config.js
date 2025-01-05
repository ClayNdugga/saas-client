import { initializeApp, getApps } from "firebase/app";
import {getAuth } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries
//https://www.youtube.com/watch?v=LefcqnZHYeg&ab_channel=Smoljames


// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// };


const firebaseConfig = {
  apiKey: "AIzaSyD_Pp2p6MRwKv1h2NRG1XYpQlLxDeteHfo",
  authDomain: "saas-66fd4.firebaseapp.com",
  projectId: "saas-66fd4",
  storageBucket: "saas-66fd4.firebasestorage.app",
  messagingSenderId: "1078943191710",
  appId: "1:1078943191710:web:b535e1901e4efb3fc1e18f",
  measurementId: "G-5ZGHMDL7FR"
};

// Initialize Firebase
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig): getApp()
const auth = getAuth(firebaseApp)
// const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export {firebaseApp, auth} 


