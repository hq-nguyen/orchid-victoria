import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        };
    } catch (error) {
        console.error("Google login error:", error);
        throw error;
    }

}

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        return true;
    } catch (error) {
        console.error("Error signing out", error);
        throw error;
    }
};


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            if (user) {
                resolve({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            } else {
                resolve(null);
            }
        }, reject);
    });
};

export const isUserAdmin = (email) => {
    const adminEmails = ['kettek9812@gmail.com']; 
    return adminEmails.includes(email);
};