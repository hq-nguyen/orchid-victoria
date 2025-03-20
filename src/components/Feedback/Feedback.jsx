import { useState, useEffect } from "react";
import StarRating from "../../utils/StarRating";
import { UserAuth } from "../../context/AuthContext";
import { FaRegUser, FaRegCalendarAlt, FaStar, FaRegCommentDots } from "react-icons/fa";
import { format } from "date-fns";
import useFeedbackStore from "../../store/feedbackStore";

export const OrchidFeedback = ({ orchidId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { currentUser } = UserAuth();

  const {
    feedbacks,
    loading,
    userFeedbackStatus,
    loadFeedbacks,
    addNewFeedback,
    updateExistingFeedback,
    removeUserFeedback,
    checkUserFeedbackStatus
  } = useFeedbackStore();

  // Get feedback items for this orchid
  const feedbackItems = feedbacks[orchidId] || [];
  console.log(feedbackItems);
  

  // Check if user has already provided feedback
  const hasUserFeedback = userFeedbackStatus[orchidId];

  // Load feedbacks when component mounts or orchidId changes
  useEffect(() => {
    loadFeedbacks(orchidId);

    if (currentUser) {
      checkUserFeedbackStatus(orchidId, currentUser.email);
    }
  }, [orchidId, currentUser, loadFeedbacks, checkUserFeedbackStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setError("Please login to submit feedback");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a comment");
      return;
    }

    setError("");

    try {
      const feedbackData = {
        rating,
        comment,
        date: new Date().toISOString(),
      };

      await addNewFeedback(orchidId, feedbackData, currentUser.email);

      setSuccess(true);
      setRating(0);
      setComment("");
      setShowFeedbackForm(false);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to submit feedback. Please try again.");
      console.error("Error submitting feedback:", err);
    }
  };

  const handleUpdateFeedback = async () => {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a comment");
      return;
    }

    try {
      const feedbackData = {
        rating,
        comment,
        date: new Date().toISOString(),
      };

      await updateExistingFeedback(orchidId, currentUser.email, feedbackData);

      setSuccess(true);
      setShowFeedbackForm(false);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to update feedback. Please try again.");
      console.error("Error updating feedback:", err);
    }
  };

  const handleDeleteFeedback = async () => {
    try {
      await removeUserFeedback(orchidId, currentUser.email);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to delete feedback. Please try again.");
      console.error("Error deleting feedback:", err);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return "Invalid date";
    }
  };

  const getAverageRating = () => {
    if (!feedbackItems || feedbackItems.length === 0) return 0;
    const sum = feedbackItems.reduce((acc, item) => acc + item.rating, 0);
    return (sum / feedbackItems.length).toFixed(1);
  };

  // Find user's existing feedback if any
  const userFeedback = currentUser && feedbackItems.find(item => item.author === currentUser.email);

  // Pre-populate form if user has existing feedback
  useEffect(() => {
    if (userFeedback && showFeedbackForm) {
      setRating(userFeedback.rating);
      setComment(userFeedback.comment);
    }
  }, [userFeedback, showFeedbackForm]);

  return (
    <div className="feedback-section my-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaRegCommentDots className="mr-2 text-rose-500 dark:text-blue-400" />
            Customer Reviews
          </h2>
          {currentUser && !showFeedbackForm && (
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="px-4 py-2 bg-rose-500 dark:bg-blue-500 text-white rounded-lg hover:bg-rose-600 dark:hover:bg-blue-600 transition-colors"
            >
              {hasUserFeedback ? "Edit Your Review" : "Write a Review"}
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">Loading reviews...</p>
          </div>
        ) : feedbackItems.length > 0 ? (
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{getAverageRating()}</span>
                <span className="text-yellow-500 text-2xl ml-1">★</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Based on {feedbackItems.length} review{feedbackItems.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="space-y-6">
              {feedbackItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <FaRegUser className="text-gray-500 dark:text-gray-300" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {item.author}
                          {currentUser && item.author === currentUser.email && (
                            <span className="ml-2 text-sm text-rose-500 dark:text-blue-400">(You)</span>
                          )}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <FaRegCalendarAlt />
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <StarRating rating={item.rating} />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">{item.comment}</p>

                  {currentUser && item.author === currentUser.email && !showFeedbackForm && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setShowFeedbackForm(true)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDeleteFeedback}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No reviews yet. Be the first to leave a review!</p>
          </div>
        )}

        {!currentUser && feedbackItems.length === 0 && (
          <div className="text-center mt-4">
            <p className="text-gray-500 dark:text-gray-400">Please log in to leave a review.</p>
          </div>
        )}

        {currentUser && showFeedbackForm && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">
                {hasUserFeedback ? "Edit Your Review" : "Write a Review"}
              </h3>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                        }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 dark:text-gray-200 mb-2">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 text-gray-700 dark:text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-blue-500 bg-white dark:bg-gray-800"
                  placeholder="Share your thoughts about this orchid..."
                ></textarea>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && (
                <p className="text-green-500 mb-4">Your review has been {hasUserFeedback ? "updated" : "submitted"} successfully!</p>
              )}

              <div className="flex justify-end gap-2">
                {hasUserFeedback && (
                  <button
                    type="button"
                    onClick={handleDeleteFeedback}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete Review
                  </button>
                )}
                <button
                  type="button"
                  onClick={hasUserFeedback ? handleUpdateFeedback : handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-rose-500 dark:bg-blue-500 text-white rounded-lg hover:bg-rose-600 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? "Submitting..." : hasUserFeedback ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};