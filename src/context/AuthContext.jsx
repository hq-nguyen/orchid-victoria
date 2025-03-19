import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, isUserAdmin, signInWithGoogle, signOut } from "../service/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser({
            ...user,
            isAdmin: isUserAdmin(user.email)
          });
        }
      } catch (error) {
        console.log("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async () => {
    try {
      const user = await signInWithGoogle();
      setCurrentUser({
        ...user,
        isAdmin: isUserAdmin(user.email)
      })
      return user;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateProfile = (profileData) => {
    setCurrentUser(prev => ({
      ...prev,
      ...profileData
    }));
    // In a real app, you would also update the profile in your backend
  };
  const value = {
    currentUser,
    loading,
    login,
    logout,
    updateProfile
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