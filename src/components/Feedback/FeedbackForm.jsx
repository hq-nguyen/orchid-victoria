import { useState, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import StarRating from "./StarRating";
import useFeedbackStore from '../../store/feedbackStore';

export const FeedbackForm = ({ orchidId }) => {
    const { currentUser } = UserAuth();
    const {
        addNewFeedback,
        updateExistingFeedback,
        userFeedbackStatus,
        checkUserFeedbackStatus,
        feedbacks,
        loading
    } = useFeedbackStore();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (currentUser && orchidId) {
            checkUserFeedbackStatus(orchidId, currentUser.email);
        }
    }, [currentUser, orchidId, checkUserFeedbackStatus]);

    useEffect(() => {
        // If user has already given feedback, load it for editing
        if (userFeedbackStatus[orchidId] && feedbacks[orchidId]) {
            const userFeedback = feedbacks[orchidId].find(f => f.author === currentUser.email);
            if (userFeedback) {
                setRating(userFeedback.rating);
                setComment(userFeedback.comment);
            }
        }
    }, [userFeedbackStatus, orchidId, feedbacks, currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert("Please log in to provide feedback.");
            return;
        }

        const feedbackData = {
            rating,
            comment
        };

        if (userFeedbackStatus[orchidId]) {
            await updateExistingFeedback(orchidId, currentUser.email, feedbackData);
            setIsEditing(false);
        } else {
            await addNewFeedback(orchidId, feedbackData, currentUser.email);
        }
    };

    if (!currentUser) {
        return (
            <div className="p-4 bg-gray-700 rounded-lg text-center">
                <p>Please log in to provide feedback on this orchid.</p>
            </div>
        );
    }

    if (userFeedbackStatus[orchidId] && !isEditing) {
        // User has already given feedback and is not in edit mode
        const userFeedback = feedbacks[orchidId]?.find(f => f.author === currentUser.email);

        return (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Your Feedback</h3>
                <div className="mb-2">
                    <StarRating rating={userFeedback?.rating || 0} readOnly={true} />
                </div>
                <p className="mb-4">{userFeedback?.comment}</p>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 dark:bg-gray-700 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                {isEditing ? "Edit Your Feedback" : "Leave Feedback"}
            </h3>

            <div className="mb-4">
                <label className="block mb-2 text-black dark:text-white">Rating</label>
                <StarRating rating={rating} onRatingChange={setRating} />
            </div>

            <div className="mb-4 text-white dark:text-black">
                <label htmlFor="comment" className="block mb-2 dark:text-white">Comment</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded bg-white text-black"
                    rows="4"
                    required
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                disabled={loading}
            >
                {loading ? "Submitting..." : (isEditing ? "Update Feedback" : "Submit Feedback")}
            </button>

            {isEditing && (
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            )}
        </form>
    );
};
