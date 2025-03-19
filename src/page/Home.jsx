import { Helmet } from 'react-helmet';
import OrchidSection from '../components/OrchidSection/OrchidSection';
import useOrchidStore from '../store/OrchidStore';
import Hero from '../components/Hero/Hero';
import OrchidsShowcase from '../components/OrchidSection/OrchidsShowcase';
import CategorySection from '../components/Category/CategorySection';
import AboutUsSection from '../components/AboutUs/AboutSection';

const Home = () => {
  const { searchQuery } = useOrchidStore();

  return (
    <>
      <Helmet>
        <title>{searchQuery ? `Search: ${searchQuery} - ` : ''} Orchid Victoria</title>
        <meta name="description" content="Read the latest news and updates about orchids, including new discoveries, conservation efforts, and growing tips." />
      </Helmet>
      <div className='py-8'>
        <Hero />
        <OrchidsShowcase />
        <CategorySection />
        <AboutUsSection />

      </div>
      {/* <OrchidSection /> */}
    </>
  );
};


export default Home;
