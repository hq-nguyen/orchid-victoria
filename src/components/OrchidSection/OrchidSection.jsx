import { useEffect, useState } from 'react';
import OrchidCard from '../OrchidCard/OrchidCard';
import LoadingComponent from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import AOS from 'aos';
import useOrchidStore from '../../store/OrchidStore';
import { useLocation } from 'react-router-dom';
import FilterBar from '../Sidebar/FilterBar';

const OrchidSection = () => {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [orchidsPerPage] = useState(16);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const { filteredOrchids, fetchOrchids, searchOrchidsAction, searchQuery } = useOrchidStore();
    const location = useLocation();

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            mirror: false,
        });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    useEffect(() => {
        // Extract query parameter from URL
        const query = new URLSearchParams(location.search).get("q") || "";
        if (query) {
            searchOrchidsAction(query);
        } else {
            fetchOrchids();
        }
        setLoading(false);
    }, [location.search, fetchOrchids, searchOrchidsAction]);

    const indexOfLastOrchid = currentPage * orchidsPerPage;
    const indexOfFirstOrchid = indexOfLastOrchid - orchidsPerPage;
    const currentOrchids = filteredOrchids.slice(indexOfFirstOrchid, indexOfLastOrchid);
    const totalPages = Math.ceil(filteredOrchids.length / orchidsPerPage);

    const getAnimationType = (index) => {
        const animations = ['zoom-in'];
        return animations[index % animations.length];
    };

    const getDelay = (index) => {
        return (index % 4) * 100; 
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const toggleMobileFilters = () => {
        setMobileFiltersOpen(!mobileFiltersOpen);
    };

    if (loading) {
        return <LoadingComponent text="Loading orchids..." />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Mobile filter toggle */}
            <div className="lg:hidden flex justify-between items-center mb-4">
                <button 
                    className="flex items-center text-accent"
                    onClick={toggleMobileFilters}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
                </button>
                <div className="text-sm">
                    {filteredOrchids.length} results
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                {/* Filter sidebar - hidden on mobile unless toggled */}
                <div className={`lg:w-1/5 lg:pr-8 lg:block ${mobileFiltersOpen ? 'block' : 'hidden'} mb-6 lg:mb-0`}>
                    <FilterBar />
                </div>

                {/* Main content */}
                <div className="lg:w-4/5">
                    {filteredOrchids.length === 0 && searchQuery ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <h3 className="text-xl font-medium mb-2">No results found</h3>
                            <p className="text-accent">Try different search terms or filters</p>
                        </div>
                    ) : (
                        <>
                            {/* Results count - visible only on desktop */}
                            <div className="hidden lg:flex justify-between items-center mb-4">
                                <div className="text-sm">
                                    Showing {indexOfFirstOrchid + 1}-{Math.min(indexOfLastOrchid, filteredOrchids.length)} of {filteredOrchids.length} orchids
                                </div>
                            </div>

                            {/* Orchid grid */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {currentOrchids.map((orchid, index) => (
                                    <div
                                        key={orchid.id || index}
                                        data-aos={getAnimationType(index)}
                                        data-aos-delay={getDelay(index)}
                                        data-aos-duration="800"
                                    >
                                        <OrchidCard
                                            id={orchid.id}
                                            image={orchid.image}
                                            name={orchid.name}
                                            origin={orchid.origin}
                                            special={orchid.special}
                                            rating={orchid.rating}
                                            category={orchid.category}
                                            description={orchid.description}
                                            price={orchid.price}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-8">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrchidSection;