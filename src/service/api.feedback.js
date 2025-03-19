import { fetchOrchidById, updateOrchid } from "./api.orchid";

export const addFeedback = async (orchidId, feedbackData) => {
  const orchid = await fetchOrchidById(orchidId);
  
  // Initialize feedback array if it doesn't exist
  const updatedFeedback = [...(orchid.feedback || []), {
    ...feedbackData,
    date: new Date().toISOString()
  }];
  
  // Calculate new average rating
  const totalRating = updatedFeedback.reduce((sum, feedback) => sum + feedback.rating, 0);
  const newRating = Math.round((totalRating / updatedFeedback.length) * 10) / 10;
  
  return updateOrchid(orchidId, {
    ...orchid,
    feedback: updatedFeedback,
    rating: newRating
  });
};

// Update existing feedback
export const updateFeedback = async (orchidId, authorEmail, feedbackData) => {
  const orchid = await fetchOrchidById(orchidId);
  
  if (!orchid.feedback) {
    throw new Error('Feedback not found');
  }
  
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
  
  // Recalculate average rating
  const totalRating = updatedFeedback.reduce((sum, feedback) => sum + feedback.rating, 0);
  const newRating = Math.round((totalRating / updatedFeedback.length) * 10) / 10;
  
  return updateOrchid(orchidId, {
    ...orchid,
    feedback: updatedFeedback,
    rating: newRating
  });
};

// Delete feedback
export const deleteFeedback = async (orchidId, authorEmail) => {
  const orchid = await fetchOrchidById(orchidId);
  
  if (!orchid.feedback || orchid.feedback.length === 0) {
    throw new Error('No feedback to delete');
  }
  
  const updatedFeedback = orchid.feedback.filter(f => f.author !== authorEmail);
  
  // Recalculate average rating or set to 0 if no feedback left
  let newRating = 0;
  if (updatedFeedback.length > 0) {
    const totalRating = updatedFeedback.reduce((sum, feedback) => sum + feedback.rating, 0);
    newRating = Math.round((totalRating / updatedFeedback.length) * 10) / 10;
  }
  
  return updateOrchid(orchidId, {
    ...orchid,
    feedback: updatedFeedback,
    rating: newRating
  });
};

// Check if user has already provided feedback for an orchid
export const hasUserProvidedFeedback = async (orchidId, userEmail) => {
  const orchid = await fetchOrchidById(orchidId);
  return orchid.feedback?.some(f => f.author === userEmail) || false;
};

// Get a specific user's feedback for an orchid
export const getUserFeedback = async (orchidId, userEmail) => {
  const orchid = await fetchOrchidById(orchidId);
  return orchid.feedback?.find(f => f.author === userEmail) || null;
};