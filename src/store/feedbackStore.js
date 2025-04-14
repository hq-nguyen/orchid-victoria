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
  userFeedbackStatus: {},

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

  addNewFeedback: async (orchidId, feedbackData, userEmail) => {
    set({ loading: true, error: null });
    try {
      await addFeedback(orchidId, {
        ...feedbackData,
        author: userEmail
      });
      
      await get().loadFeedbacks(orchidId);
      
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

  updateExistingFeedback: async (orchidId, userEmail, feedbackData) => {
    set({ loading: true, error: null });
    try {
      await updateFeedback(orchidId, userEmail, feedbackData);
      
      await get().loadFeedbacks(orchidId);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  removeUserFeedback: async (orchidId, userEmail) => {
    set({ loading: true, error: null });
    try {
      await deleteFeedback(orchidId, userEmail);
      await get().loadFeedbacks(orchidId);
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
  checkUserFeedbackStatus: async (orchidId, userEmail) => {
    if (!userEmail) return; 
    
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