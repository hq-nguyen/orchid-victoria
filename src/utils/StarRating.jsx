import { FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';

const StarRating = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const decimalPart = rating % 1;

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                if (index < filledStars) {
                    // Full star
                    return (
                        <FaStar
                            key={index}
                            className="text-rose-500 w-4 h-4"
                        />
                    );
                } else if (index === filledStars && decimalPart > 0) {
                    // Phân số cho star
                    const percentage = decimalPart * 100;
                    return (
                        <div key={index} className="relative">
                            <FaStar className="text-gray-300 w-4 h-4" />
                            <div
                                className="absolute left-0 top-0 overflow-hidden"
                                style={{ width: `${percentage}%` }}
                            >
                                <FaStar className="text-rose-500 w-4 h-4" />
                            </div>
                        </div>
                    );
                } else {
                    // Empty star
                    return (
                        <FaStar
                            key={index}
                            className="text-gray-300 w-4 h-4"
                        />
                    );
                }
            })}
            <span className="ml-2 text-gray-600 dark:text-white">{rating}</span>
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default StarRating;
