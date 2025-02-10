import { Link } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useState } from 'react';
import QuickViewModel from '../OrchidSection/QuickViewModel'; 
import StarRating from '../../utils/StarRating';
import Ribbon from '../Ribbon/Ribbon';

const OrchidCard = ({ id, image, name, origin, isSpecial, rating, category, description }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='w-full mb-4 bg-white dark:bg-black rounded-xl shadow-xl hover:shadow-2xl transition-all transform duration-500 overflow-hidden'>
                <Ribbon isSpecial={isSpecial} />
                
                <div className='relative group'>
                    <img
                        className='w-full h-80 object-cover rounded-t-md transition-transform duration-500 cursor-pointer group-hover:scale-105'
                        src={image}
                        alt={name}
                        onClick={openModal}
                    />
                    <div
                        className='absolute bottom-1/2 top-1/2 left-0 w-full h-0 bg-black/60 text-white flex items-center justify-center text-sm font-semibold opacity-0 transition-all duration-500 group-hover:h-10 group-hover:opacity-100 cursor-pointer'
                        onClick={openModal}
                    >
                        Quick View
                    </div>
                </div>

                {/* content section */}
                <div className='p-4'>
                    <Link to={`/orchid/${id}`} className='text-base font-bold text-gray-700 dark:text-white dark:hover:text-blue-600 hover:text-red-600 duration-200
                                                          truncate w-full block overflow-hidden whitespace-nowrap'>
                        {name}
                    </Link>
                    <p className="flex items-center text-xs font-semibold text-gray-600 dark:text-white"><CiLocationOn className='mr-2' /> {origin}</p>
                    <div className="flex items-center mb-2">
                        {/* star - hardcode */}
                        <div className="flex items-center mt-2.5 mb-2">
                            <StarRating rating={rating} />
                        </div>
                    </div>

                    <Link to={`/orchid/${id}`} className='inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                        Read more
                        <FaArrowRight className='ms-2' />
                    </Link>
                </div>
            </div>

            {isModalOpen && (
                <QuickViewModel orchid={{ id, image, name, origin, category, description }} onClose={closeModal} />
            )}
        </>
    );
};

OrchidCard.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isSpecial: PropTypes.bool.isRequired,
};

export default OrchidCard;
