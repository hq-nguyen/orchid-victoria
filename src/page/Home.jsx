import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import OrchidSection from '../components/OrchidSection/OrchidSection';
import useOrchidStore from '../store/OrchidStore';

const Home = () => {
  const location = useLocation();
  const { searchQuery } = useOrchidStore();

  return (
    <>
      <Helmet>
        <title>{searchQuery ? `Search: ${searchQuery} - ` : ''} Orchid Victoria</title>
        <meta name="description" content="Read the latest news and updates about orchids, including new discoveries, conservation efforts, and growing tips." />
      </Helmet>
      <OrchidSection />
    </>
  );
};


export default Home;
