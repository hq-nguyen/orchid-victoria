import { Helmet } from 'react-helmet'
import OrchidSection from '../component/OrchidSection/OrchidSection'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Orchid Victoria</title>
        <meta name="description" content="Read the latest news and updates about orchids, including new discoveries, conservation efforts, and growing tips." />
      </Helmet>
      <OrchidSection />
    </>

  )
}

export default Home