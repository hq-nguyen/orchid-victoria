
import './App.css'
import Navbar from './component/Navbar/Navbar'
import OrchidSection from './component/OrchidSection/OrchidSection'

function App() {

  return (
    <div>
      <Navbar />
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-gray-900'>
        <OrchidSection />
        {/* <OrchidPresentation /> */}
      </div>
    </div>
  )
}

export default App
