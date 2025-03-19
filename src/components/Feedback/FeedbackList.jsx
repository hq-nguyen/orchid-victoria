import { useEffect } from "react";
import StarRating from "./StarRating";
import { UserAuth } from "../../context/AuthContext";
import useFeedbackStore from "../../store/feedbackStore";

export const FeedbackList = ({ orchidId }) => {
    const { feedbacks, loadFeedbacks, loading } = useFeedbackStore();
    const { currentUser } = UserAuth();
    
    useEffect(() => {
      if (orchidId) {
        loadFeedbacks(orchidId);
      }
    }, [orchidId, loadFeedbacks]);
    
    if (loading) {
      return <div className="text-center py-4">Loading feedbacks...</div>;
    }
    
    const orchidFeedbacks = feedbacks[orchidId] || [];
    
    if (orchidFeedbacks.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          No feedback yet for this orchid.
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Customer Feedbacks</h3>
        
        {orchidFeedbacks.map((feedback, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <StarRating rating={feedback.rating} readOnly={true} />
                <span className="ml-2 text-gray-600">
                  {new Date(feedback.date).toLocaleDateString()}
                </span>
              </div>
              <div className="font-semibold">{feedback.author}</div>
            </div>
            <p>{feedback.comment}</p>
          </div>
        ))}
      </div>
    );
  };