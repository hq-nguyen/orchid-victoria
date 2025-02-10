import { FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center ">
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    className={`${index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} w-4 h-4`}
                />
            ))}
            <span className="ml-2 text-gray-600 dark:text-white">{rating}</span>
        </div>
    );
};
StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default StarRating;