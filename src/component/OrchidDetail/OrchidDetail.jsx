import { useState, useEffect } from "react";
import { FaHeart, FaChevronDown, FaChevronUp, FaLeaf } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { orchids } from '../../assets/data'; // Import the orchid data
import StarRating from "../../utils/StarRating";

const OrchidDetail = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { id } = useParams(); // Get the orchid ID from the URL

    const [orchidData, setOrchidData] = useState(null);

    useEffect(() => {
        // Find the orchid in the data that matches the ID from the URL
        const foundOrchid = orchids.find((orchid) => orchid.Id === id);
        setOrchidData(foundOrchid);
    }, [id]);

    if (!orchidData) {
        return <div>Loading...</div>; // Or display an error message
    }

    return (
        <div className="container mx-auto p-4 pt-8 pb-12 max-w-7xl">
            <div className="mb-4 w-36 p-2 mb-4 bg-rose-400 hover:bg-rose-700 dark:bg-blue-400 dark:hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                <FaArrowLeft className="inline-block" />
                <Link to={'/'}>Back to home</Link>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-gray-900  overflow-hidden">
                {/* Image Only*/}
                <div className="lg:w-1/2">
                    <div className="relative max-h-[632px] w-full overflow-hidden">
                        <img
                            src={orchidData.image}
                            alt={orchidData.name}
                            className="max-h-[632px] w-full object-fix object-top rounded-lg"
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1610397648930-477b8c7f0943";
                            }}
                        />
                    </div>
                </div>


                {/* Information */}
                <div className="lg:w-1/2 p-6 flex flex-col gap-6">
                    {/* 1st Section*/}
                    <div className="">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{orchidData.name}</h1>
                        <div className="flex items-center justify-between text-gray-500 dark:text-gray-200">
                            <div className="flex items-center gap-2">
                                <MdLocationOn className="text-rose-500" />
                                <span>{orchidData.origin}</span>
                            </div>
                            <StarRating rating={orchidData.rating} />
                        </div>
                    </div>
                    <hr />

                    {/* 2nd Section */}
                    <div className="grid grid-cols-2 gap-4 text-black">
                        <div className="p-3 bg-gray-50 dark:bg-blue-50 rounded-lg">
                            <p className="text-gray-600">Category</p>
                            <p className="font-semibold">{orchidData.category}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-blue-50 rounded-lg">
                            <p className="text-gray-600">Natural</p>
                            <p className="font-semibold">{orchidData.isNatural ? "Yes" : "No"}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-blue-50 rounded-lg">
                            <p className="text-gray-600">Color</p>
                            <p className="font-semibold">{orchidData.color}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-blue-50 rounded-lg">
                            <p className="text-gray-600">Reviewers</p>
                            <p className="font-semibold">{orchidData.reviews}</p>
                        </div>
                    </div>

                    {/* 3st Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Description</h2>
                        <div className={`relative ${!isExpanded ? "max-h-12" : "max-h-full"} overflow-hidden transition-all duration-300`}>
                            <p className="text-gray-700 dark:text-white">{orchidData.description}</p>
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-2 flex items-center gap-2 text-rose-600 dark:text-blue-600 hover:text-rose-700 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    Show Less <FaChevronUp />
                                </>
                            ) : (
                                <>
                                    Read More <FaChevronDown />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Love Elements */}
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-200 dark:bg-blue-200 hover:bg-rose-600 transition-colors"
                        >
                            <FaHeart className={isLiked ? "text-rose-500" : "text-gray-400"} />
                            <span className="text-black">{orchidData.numberOfLike + (isLiked ? 1 : 0)}</span>
                        </button>

                        {orchidData.isSpecial && (
                            <div className="flex items-center gap-2 text-white-600 bg-yellow-600 px-2 py-2 rounded-lg">
                                <FaLeaf />
                                <span className="font-medium">Special Orchid</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrchidDetail;
