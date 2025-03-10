import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { createContext, useContext, useEffect, useState } from "react";
  import { auth } from "../config/firebase"; // Update this path to match your project structure
  
  const AuthContext = createContext();
  
  export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // login function
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
    
    // logout function
    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Logout error:", error);
        throw error;
      }
    };
    
    // Check if user is authenticated 
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      
      // Cleanup subscription on unmount
      return () => {
        unsubscribe();
      };
    }, []);
    
    // Provide auth context values
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
  
  // Custom hook to use auth context
  export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("UserAuth must be used within an AuthContextProvider");
    }
    return context;
  };