// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration for storage (first Firebase project)
const storageFirebaseConfig = {
  apiKey: "AIzaSyAc-g3kLguUfx8X2zOgNHF5onE_QcOoaf0",
  authDomain: "heso-hrm.firebaseapp.com",
  projectId: "heso-hrm",
  storageBucket: "heso-hrm.firebasestorage.app",
  messagingSenderId: "243212199762",
  appId: "1:243212199762:web:a5ddddcd9236e525547c8b",
  measurementId: "G-HGJZP0NJ77",
};

// Firebase configuration for authentication (second Firebase project)
const authFirebaseConfig = {
  apiKey: "AIzaSyDyjg7HKYc3X2w2LHSGLrs_zQH4_mvmGdo",
  authDomain: "orchid-victoria.firebaseapp.com",
  projectId: "orchid-victoria",
  storageBucket: "orchid-victoria.firebasestorage.app",
  messagingSenderId: "765225214288",
  appId: "1:765225214288:web:e056639b10f9afa3000c55",
  measurementId: "G-JCQNSS166S"
};

// Initialize Firebase apps with different names
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