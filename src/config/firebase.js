// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration for storage (first Firebase project)
const storageFirebaseConfig = {
  apiKey: import.meta.env.VITE_STORAGE_API_KEY,
  authDomain: import.meta.env.VITE_STORAGE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_STORAGE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_STORAGE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_STORAGE_APP_ID,
  measurementId: import.meta.env.VITE_STORAGE_MEASUREMENT_ID,
};

const authFirebaseConfig = {
  apiKey: import.meta.env.VITE_AUTH_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_AUTH_PROJECT_ID,
  storageBucket: import.meta.env.VITE_AUTH_BUCKET,
  messagingSenderId: import.meta.env.VITE_AUTH_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_AUTH_APP_ID,
  measurementId: import.meta.env.VITE_AUTH_MEASUREMENT_ID,
};
const storageApp = initializeApp(storageFirebaseConfig, "STORAGE_APP");
const authApp = initializeApp(authFirebaseConfig, "AUTH_APP");

// Get services from each app
export const storage = getStorage(storageApp);
export const auth = getAuth(authApp);
export const provider = new GoogleAuthProvider();

// Optional: Configure additional provider settings
provider.setCustomParameters({
  prompt: 'select_account'
});

// Get analytics from auth app
export const analytics = getAnalytics(authApp);

// Export both apps if needed elsewhere
export { storageApp, authApp };