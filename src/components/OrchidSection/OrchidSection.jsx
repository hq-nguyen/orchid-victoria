// import OrchidPresentation from './OrchidPresentation'
import { useEffect } from 'react';
// import { orchids } from '../../assets/data'
import { fetchOrchids } from '../../service/api.orchid';
import OrchidCard from '../OrchidCard/OrchidCard'
import { useState } from 'react';
import LoadingComponent from '../Loading/Loading';

const OrchidSection = () => {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrchids = async () => {
      try {
        const response = await fetchOrchids();
        setOrchids(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orchids: ', error);
      } finally {
        setLoading(false);
      };
    };
    getOrchids();
  }, []);

  if (loading) {
    return <LoadingComponent text="Loading orchids..." />;
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 py-16'>
      {orchids.map((orchid, index) => (
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
  )
}

export default OrchidSection