import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC1tp1xwld9rSqtRNQXMYUJynQcuPk7bVk",
  authDomain: "my-project-1554615786115.firebaseapp.com",
  projectId: "my-project-1554615786115",
  storageBucket: "my-project-1554615786115.appspot.com",
  messagingSenderId: "1030674481752",
  appId: "1:1030674481752:web:4514ceb7c80a71d06c802d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
