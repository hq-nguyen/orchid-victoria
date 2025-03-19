import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { createContext, useContext, useEffect, useState } from "react";
  import { auth } from "../config/firebase"; 
  
  const AuthContext = createContext();
  
  export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const googleLogin = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        return result;
      } catch (error) {
        console.error("Google login error:", error);
        throw error;
      }
    };
    
    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Logout error:", error);
        throw error;
      }
    };
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      
      return () => {
        unsubscribe();
      };
    }, []);
    
    const value = {
      user,
      loading,
      googleLogin,
      logout,
      isAuthenticated: !!user
    };
    
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };
  
  export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("UserAuth must be used within an AuthContextProvider");
    }
    return context;
  };