import { useEffect, useState } from 'react';
import { fetchOrchids } from '../../service/api.orchid';
import OrchidCard from '../OrchidCard/OrchidCard';
import LoadingComponent from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import AOS from 'aos';

const OrchidSection = () => {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [orchidsPerPage] = useState(16);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // Change from false to true
      mirror: false, // Change from true to false
    });

    const getOrchids = async () => {
      try {
        const response = await fetchOrchids();
        setOrchids(response);
      } catch (error) {
        console.error('Error fetching orchids: ', error);
      } finally {
        setLoading(false);
      }
    };
    getOrchids();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [currentPage]);

  const indexOfLastOrchid = currentPage * orchidsPerPage;
  const indexOfFirstOrchid = indexOfLastOrchid - orchidsPerPage;
  const currentOrchids = orchids.slice(indexOfFirstOrchid, indexOfLastOrchid);
  const totalPages = Math.ceil(orchids.length / orchidsPerPage);

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

  return (
    <div id="orchid-section">
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 py-16'>
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