import { FaTag, FaPalette, FaPlay } from "react-icons/fa";
import { MdOutlineEmojiNature } from "react-icons/md";
import { FaChevronDown, FaChevronUp, FaLeaf } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import StarRating from "../../utils/StarRating";
import Ribbon from "../Ribbon/Ribbon";
import { useState, useEffect } from "react";
import OrchidCard from "../OrchidCard/OrchidCard";
import LoadingComponent from "../Loading/Loading";
import { fetchOrchidsWithCategory, fetchOrchidsWithCategories } from "../../service/api.orchid";
import { UserAuth } from "../../context/AuthContext";
import { OrchidFeedback } from "../Feedback/Feedback";

const OrchidDetail = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const { id } = useParams();
    const [orchidData, setOrchidData] = useState(null);
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [relatedOrchids, setRelatedOrchids] = useState([]);
    const { currentUser } = UserAuth();

    useEffect(() => {
        const getOrchids = async () => {
            try {
                setLoading(true);

                const currentOrchid = await fetchOrchidsWithCategory(id);
                setOrchidData(currentOrchid);

                const allOrchids = await fetchOrchidsWithCategories();
                setOrchids(allOrchids);

                // Fix: Filter related orchids by categoryId instead of category object
                if (currentOrchid && currentOrchid.categoryId) {
                    const related = allOrchids.filter(
                        orchid =>
                            // Match by categoryId (more reliable)
                            orchid.categoryId === currentOrchid.categoryId &&
                            // Ensure we don't include the current orchid
                            orchid.id.toString() !== id.toString()
                    ).slice(0, 4);
                    setRelatedOrchids(related);
                }

            } catch (error) {
                console.error('Error fetching orchid details: ', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getOrchids();
        }
    }, [id]);

    // Function to extract YouTube video ID from URL
    const getYoutubeVideoId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Show loading while data is being fetched
    if (loading) {
        return <LoadingComponent text="Loading orchid details..." />;
    }

    // Show error if orchid not found
    if (!orchidData) {
        return (
            <div className="container mx-auto p-4 text-center">
                <div className="mb-4 w-36 p-2 mb-4 bg-rose-400 hover:bg-rose-700 dark:bg-blue-400 dark:hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                    <FaArrowLeft className="inline-block" />
                    <Link to={'/'}>Back to home</Link>
                </div>
                <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
                    <h2 className="text-xl text-red-700 dark:text-red-300">Orchid not found</h2>
                    <p>The orchid you are looking for does not exist or has been removed.</p>
                </div>
            </div>
        );
    }

    // YouTube video ID
    const youtubeVideoId = getYoutubeVideoId(orchidData.video);

    return (
        <div className="container mx-auto p-4 pt-8 pb-12 max-w-7xl relative">
            <div className="mb-4 w-36 p-2 mb-4 bg-rose-400 hover:bg-rose-700 dark:bg-blue-400 dark:hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                <FaArrowLeft className="inline-block" />
                <Link to={'/'}>Back to home</Link>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-gray-900 overflow-hidden">
                {/* Image Only*/}
                <div className="lg:w-1/2">
                    <div className="relative max-h-[632px] w-full overflow-hidden">
                        <Ribbon
                            isSpecial={orchidData.special}
                            ribbonWidth="w-[240px]"
                            ribbonTop="top-[40px]"
                            ribbonLeft="-left-[52px]"
                            ribbonFontSize="text-3xl"
                        />

                        <img
                            src={orchidData.image}
                            alt={orchidData.name}
                            className="max-h-[632px] w-full object-fix object-top rounded-lg"
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1610397648930-477b8c7f0943";
                            }}
                        />
                        {/* Video Button - Fixed in the bottom right corner */}
                        {orchidData.video && (
                            <button
                                onClick={() => setShowVideoModal(true)}
                                className="absolute bottom-6 right-6 w-40 h-10 rounded-full bg-rose-600 dark:bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-rose-700 dark:hover:bg-blue-700 transition-colors z-20"
                                title="Watch Video"
                            >
                                <FaPlay className="text-xl mr-2" /> <span>Watch Video</span>
                            </button>
                        )}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground">
                        <div className="p-4 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-accent dark:text-muted-foreground flex items-center"><FaTag className="text-primary mr-4" />Category</p>
                                <p className="text-lg font-semibold dark:text-primary-foreground">
                                    {orchidData.category && typeof orchidData.category === 'object' && orchidData.category.name
                                        ? orchidData.category.name
                                        : orchidData.categoryName || "Unknown"}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-accent dark:text-muted-foreground flex items-center"> <MdOutlineEmojiNature className="text-primary mr-4" /> Natural</p>
                                <p className="text-lg font-semibold dark:text-primary-foreground">
                                    {orchidData.nature ? "Wild Orchid" : "Hybrid Orchid"}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-accent dark:text-muted-foreground flex items-center"><FaPalette className="text-primary mr-4" /> Color</p>
                                <p className="text-lg font-semibold dark:text-primary-foreground">{orchidData.color}</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-accent dark:text-muted-foreground flex items-center"><FaLeaf className="text-primary mr-4" />Special</p>
                                {orchidData.special ? (
                                    <div className="flex items-center bg-yellow-500 px-2 py-1 rounded-lg text-sm mt-2">
                                        <span className="font-medium">Rare Orchid</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center bg-green-500 px-2 py-1 rounded-lg text-sm mt-2">
                                        <span className="font-medium">Regular Orchid</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 3rd Section */}
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
                </div>
            </div>

            <span className="ml-2 text-gray-600">
                {orchidData.feedback ? `(${orchidData.feedback.length} reviews)` : '(No reviews yet)'}
            </span>
            <div className="p-6">
                <OrchidFeedback orchidId={id} />
            </div>

            {/* Related Orchids Section */}
            {relatedOrchids.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Related Orchids</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {relatedOrchids.map((orchid, index) => (
                            <OrchidCard
                                key={index}
                                id={orchid.id}
                                image={orchid.image}
                                name={orchid.name}
                                origin={orchid.origin}
                                special={orchid.special}
                                rating={orchid.rating}
                                category={orchid.category}
                                description={orchid.description}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Video Modal */}
            {showVideoModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 w-full max-w-4xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {orchidData.name} - Video
                            </h3>
                            <button
                                onClick={() => setShowVideoModal(false)}
                                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="relative pb-[56.25%] h-0 overflow-hidden">
                            {youtubeVideoId ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                                    title={`${orchidData.name} video`}
                                ></iframe>
                            ) : (
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                                    <p className="text-gray-600 dark:text-gray-300">Invalid video URL</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default OrchidDetail;