import { FaTag, FaPalette, FaUsers } from "react-icons/fa";
import { MdOutlineEmojiNature } from "react-icons/md";
import { FaHeart, FaChevronDown, FaChevronUp, FaLeaf } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import StarRating from "../../utils/StarRating";
import Ribbon from "../Ribbon/Ribbon";
import { useState, useEffect } from "react";
import OrchidCard from "../OrchidCard/OrchidCard";
import LoadingComponent from "../Loading/Loading";
import { fetchOrchids, fetchOrchidById } from "../../service/api.orchid";

const OrchidDetail = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { id } = useParams();
    const [orchidData, setOrchidData] = useState(null);
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [relatedOrchids, setRelatedOrchids] = useState([]);

    useEffect(() => {
        const getOrchids = async () => {
            try {
                setLoading(true);
                
                // First, fetch the specific orchid using the dedicated API
                const currentOrchid = await fetchOrchidById(id);
                setOrchidData(currentOrchid);
                
                // Then fetch all orchids for related items
                const allOrchids = await fetchOrchids();
                setOrchids(allOrchids);
                
                // Filter related orchids by category
                if (currentOrchid && currentOrchid.category) {
                    const related = allOrchids.filter(
                        orchid => orchid.category === currentOrchid.category 
                                 && orchid.id.toString() !== id.toString()
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
                    <p>The orchid you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
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
                                <p className="text-lg font-semibold dark:text-primary-foreground">{orchidData.category}</p>
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

            {/* Related Orchids Section */}
            {relatedOrchids.length > 0 && (
                <div className="mt-8">
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
        </div>
    );
};

export default OrchidDetail;