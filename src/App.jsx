
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar/Navbar'
import Home from './page/Home'
import OrchidDetail from './component/OrchidDetail/OrchidDetail'
import Contact from './page/Contact'
import Footer from './component/Footer/Footer'

function App() {

  return (
    <>
      <Navbar />
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-gray-900'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orchid/:id" element={<OrchidDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
