import { UserAuth } from "../../context/AuthContext";
import { FeedbackForm } from "./FeedbackForm";
import { FeedbackList } from "./FeedbackList";

export const OrchidFeedback = ({ orchidId }) => {
    const { currentUser } = UserAuth();
    
    return (
      <div className="mt-8 bg-gray-50 border border-rose-200 dark:bg-gray-700 p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Feedback</h2>
        <div className="mb-6">
          <FeedbackForm orchidId={orchidId} />
        </div>
        <FeedbackList orchidId={orchidId} />
      </div>
    );
  };