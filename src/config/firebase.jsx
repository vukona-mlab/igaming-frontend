// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  inMemoryPersistence,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const initAuth = async () => {

  await setPersistence(auth, inMemoryPersistence);
}
initAuth()
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const messaging = getMessaging(app)
// Add logout function
const handleLogout = async () => {
  try {
    await signOut(auth);
    // Clear all authentication-related items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("role");
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
};
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BLISWaaajm3rDfzJUtWAkC7ZyN1UoL6owRUEGuJ3h4je6qtUj3L5MCbkYlzhyYjlFobpEoR10OcaAnFGrJLCT1A"
      });
      console.log("FCM token:", token);
      if (token) {
        localStorage.setItem("rig-dev-token", token)
        const deviceToken = localStorage.getItem("rig-dev-token")
        console.log({ deviceToken });
      }


    } else {
      console.log("Notification permission not granted");
    }
  } catch (err) {
    console.error("Error getting notification permission", err);
  }
};


export { auth, db, storage, googleProvider, handleLogout, messaging };
