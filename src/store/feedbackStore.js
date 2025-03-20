import { create } from 'zustand';
import { 
  addFeedback, 
  updateFeedback, 
  deleteFeedback, 
  hasUserProvidedFeedback 
} from '../service/api.feedback';
import { fetchOrchidById } from '../service/api.orchid';

const useFeedbackStore = create((set, get) => ({
  feedbacks: {},
  loading: false,
  error: null,
  userFeedbackStatus: {}, // Tracks if a user has provided feedback for specific orchids

  // Load feedbacks for a specific orchid
  loadFeedbacks: async (orchidId) => {
    set({ loading: true, error: null });
    try {
      const orchid = await fetchOrchidById(orchidId);
      set(state => ({
        feedbacks: {
          ...state.feedbacks,
          [orchidId]: orchid.feedback || []
        },
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add new feedback
  addNewFeedback: async (orchidId, feedbackData, userEmail) => {
    set({ loading: true, error: null });
    try {
      await addFeedback(orchidId, {
        ...feedbackData,
        author: userEmail
      });
      
      // Update the local store
      await get().loadFeedbacks(orchidId);
      
      // Update user feedback status
      set(state => ({
        userFeedbackStatus: {
          ...state.userFeedbackStatus,
          [orchidId]: true
        },
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update existing feedback
  updateExistingFeedback: async (orchidId, userEmail, feedbackData) => {
    set({ loading: true, error: null });
    try {
      await updateFeedback(orchidId, userEmail, feedbackData);
      
      // Update the local store
      await get().loadFeedbacks(orchidId);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete feedback
  removeUserFeedback: async (orchidId, userEmail) => {
    set({ loading: true, error: null });
    try {
      await deleteFeedback(orchidId, userEmail);
      
      // Update the local store
      await get().loadFeedbacks(orchidId);
      
      // Update user feedback status
      set(state => ({
        userFeedbackStatus: {
          ...state.userFeedbackStatus,
          [orchidId]: false
        },
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Check if the user has already provided feedback
  checkUserFeedbackStatus: async (orchidId, userEmail) => {
    if (!userEmail) return; // Only check if user is logged in
    
    set({ loading: true });
    try {
      const hasProvided = await hasUserProvidedFeedback(orchidId, userEmail);
      set(state => ({
        userFeedbackStatus: {
          ...state.userFeedbackStatus,
          [orchidId]: hasProvided
        },
        loading: false
      }));
      return hasProvided;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  }
}));

export default useFeedbackStore;