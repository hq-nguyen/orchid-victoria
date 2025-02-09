import PropTypes from 'prop-types';
import { orchids } from '../../assets/data';
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useState } from 'react';
import QuickViewModel from './QuickViewModel'; // Import the modal component

function OrchidPresentation() {
    const [selectedOrchid, setSelectedOrchid] = useState(null);

    const openModal = (orchid) => {
        setSelectedOrchid(orchid);
    };

    const closeModal = () => {
        setSelectedOrchid(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 py-16">
                {orchids.map((orchid) => (
                    <div className="w-full mb-4 bg-white dark:bg-black rounded-xl shadow-xl hover:shadow-2xl transition-all transform duration-500 overflow-hidden" key={orchid.Id}>
                        <div className="relative group">
                            <img
                                className="w-full h-80 object-cover rounded-t-md transition-transform duration-500 cursor-pointer group-hover:scale-105"
                                src={orchid.image}
                                alt={orchid.name}
                                onClick={() => openModal(orchid)}
                            />
                            <div
                                className="absolute bottom-1/2 top-1/2 left-0 w-full h-0 bg-black/60 text-white flex items-center justify-center text-sm font-semibold opacity-0 transition-all duration-500 group-hover:h-10 group-hover:opacity-100 cursor-pointer"
                                onClick={() => openModal(orchid)}
                            >
                                Quick View
                            </div>
                        </div>

                        <div className="mt-2 p-4">
                            <a href='' className="text-base font-bold text-gray-700 dark:text-white hover:text-red-600 duration-200">{orchid.name}</a>
                            <p className="flex items-center text-xs font-semibold text-gray-600 dark:text-white"><CiLocationOn className='mr-2' /> {orchid.origin}</p>
                            <div className="flex items-center mt-2.5 mb-5">
                                {/* star - hardcode */}
                                <div className="flex items-center mt-2.5 mb-2">
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                        <svg className="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-3 h-3 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                                </div>
                            </div>

                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <FaArrowRight className="ms-2" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Render the modal conditionally */}
            {selectedOrchid && (
                <QuickViewModel orchid={selectedOrchid} onClose={closeModal} />
            )}
        </>
    );
}

OrchidPresentation.propTypes = {
    orchid: PropTypes.shape({
        Id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        origin: PropTypes.string.isRequired,
    }),
};

export default OrchidPresentation;
