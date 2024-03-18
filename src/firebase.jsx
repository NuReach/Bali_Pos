// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC010tE2IKhIe8X4AiNRNv4zhkvmVMUdIM",
  authDomain: "bali-mart.firebaseapp.com",
  projectId: "bali-mart",
  storageBucket: "bali-mart.appspot.com",
  messagingSenderId: "1006543759271",
  appId: "1:1006543759271:web:e00492e05ce80ce7b7b882",
  measurementId: "G-9D3NG1016Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);