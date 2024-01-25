
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGEENDER_ID,
  // appId:import.meta.env.VITE_APP_ID,
  apiKey: "AIzaSyA8KRmGFgQ8VPLjVCSWOmQ2E2dduiYx1FM",
  authDomain: "mern-ecommerce-2024-dbb38.firebaseapp.com",
  projectId: "mern-ecommerce-2024-dbb38",
  storageBucket: "mern-ecommerce-2024-dbb38.appspot.com",
  messagingSenderId: "923411140338",
  appId: "1:923411140338:web:f7519a926053d36d1e0a6b"
};

export const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);