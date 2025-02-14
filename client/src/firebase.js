import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "farmwise-186c8.firebaseapp.com",
  projectId: "farmwise-186c8",
  storageBucket: "farmwise-186c8.appspot.com",
  messagingSenderId: "263368984554",
  appId: "1:263368984554:web:0903eaa525d4ef848b1493"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
