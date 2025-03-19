import { useEffect, useState } from 'react';
import OrchidCard from '../OrchidCard/OrchidCard';
import LoadingComponent from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import AOS from 'aos';
import useOrchidStore from '../../store/OrchidStore';

const OrchidSection = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [orchidsPerPage] = useState(16);

  const { filteredOrchids, fetchOrchids, searchQuery } = useOrchidStore();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // Change from false to true
      mirror: false, // Change from true to false
    });
    try {
      fetchOrchids();
      setLoading(false);
    } catch (error) {
      console.error('Error loading orchids:', error);
    } finally {
      setLoading(false);
    };


  }, [fetchOrchids]);

  useEffect(() => {
    AOS.refresh();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastOrchid = currentPage * orchidsPerPage;
  const indexOfFirstOrchid = indexOfLastOrchid - orchidsPerPage;
  const currentOrchids = filteredOrchids.slice(indexOfFirstOrchid, indexOfLastOrchid);
  const totalPages = Math.ceil(filteredOrchids.length / orchidsPerPage);

  const getAnimationType = (index) => {
    const animations = ['zoom-in'];
    return animations[index % animations.length];
  };

  // Stagger delay based on index
  const getDelay = (index) => {
    return (index % 4) * 100; // 0, 100, 200, 300ms delays in each row
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return <LoadingComponent text="Loading orchids..." />;
  }

  if (filteredOrchids.length === 0 && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h3 className="text-xl font-medium mb-2">No results found</h3>
        <p className="text-accent">Try a different search term</p>
      </div>
    );
  }

  return (
    <div id="orchid-section">
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-16 pt-4'>
        {currentOrchids.map((orchid, index) => (
          <div
            key={index}
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
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default OrchidSection;