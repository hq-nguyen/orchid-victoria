import { fetchOrchidById, updateOrchid } from "./api.orchid";

export const addFeedback = async (orchidId, feedbackData) => {
    const orchid = await fetchOrchidById(orchidId);
    const updatedFeedback = [...(orchid.feedback || []), {
      ...feedbackData,
      date: new Date().toISOString()
    }];
    
    return updateOrchid(orchidId, {
      ...orchid,
      feedback: updatedFeedback
    });
  };
  
  export const updateFeedback = async (orchidId, authorEmail, feedbackData) => {
    const orchid = await fetchOrchidById(orchidId);
    const feedbackIndex = orchid.feedback.findIndex(f => f.author === authorEmail);
    
    if (feedbackIndex === -1) {
      throw new Error('Feedback not found');
    }
    
    const updatedFeedback = [...orchid.feedback];
    updatedFeedback[feedbackIndex] = {
      ...updatedFeedback[feedbackIndex],
      ...feedbackData,
      date: new Date().toISOString()
    };
    
    return updateOrchid(orchidId, {
      ...orchid,
      feedback: updatedFeedback
    });
  };
  
  export const deleteFeedback = async (orchidId, authorEmail) => {
    const orchid = await fetchOrchidById(orchidId);
    const updatedFeedback = orchid.feedback.filter(f => f.author !== authorEmail);
    
    return updateOrchid(orchidId, {
      ...orchid,
      feedback: updatedFeedback
    });
  };
  
  // Check if user has already provided feedback for an orchid
  export const hasUserProvidedFeedback = async (orchidId, userEmail) => {
    const orchid = await fetchOrchidById(orchidId);
    return orchid.feedback?.some(f => f.author === userEmail) || false;
  };