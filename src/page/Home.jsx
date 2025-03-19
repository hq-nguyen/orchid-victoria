import { Helmet } from 'react-helmet'
import OrchidSection from '../components/OrchidSection/OrchidSection'
import useOrchidStore from '../store/OrchidStore'

const Home = () => {

  const { searchQuery } = useOrchidStore();

  return (
    <>
      <Helmet>
        <title>{searchQuery ? `Search: ${searchQuery} - ` : ''} Orchid Victoria</title>
        <meta name="description" content="Read the latest news and updates about orchids, including new discoveries, conservation efforts, and growing tips." />
      </Helmet>
      {searchQuery && (
        <div className="container mx-auto pt-4 px-4">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Search results for: <span className="text-primary dark:text-blue-500">{searchQuery}</span>
          </h2>
        </div>
      )}
      <OrchidSection />
    </>

  )
}

export default Home