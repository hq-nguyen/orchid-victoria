import { create } from 'zustand';
import { signInWithGoogle, signOut, isUserAdmin } from '../services/auth';

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,
  
  initialize: async () => {
    try {
      // Check if user is already logged in (e.g., from localStorage or Firebase auth)
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        set({ user: { ...user, isAdmin: isUserAdmin(user.email) }, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  login: async () => {
    try {
      set({ loading: true, error: null });
      const user = await signInWithGoogle();
      const userWithRole = { ...user, isAdmin: isUserAdmin(user.email) };
      localStorage.setItem('user', JSON.stringify(userWithRole));
      set({ user: userWithRole, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  logout: async () => {
    try {
      await signOut();
      localStorage.removeItem('user');
      set({ user: null });
    } catch (error) {
      set({ error: error.message });
    }
  },
  
  updateProfile: (profileData) => {
    set((state) => {
      const updatedUser = { ...state.user, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  }
}));

export default useAuthStore;