import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Home from './page/Home';
import OrchidDetail from './component/OrchidDetail/OrchidDetail';
import Contact from './page/Contact';
import Footer from './component/Footer/Footer';
import ScrollTop from './component/ScrollTop/ScrollTop';
import SpecialOrchid from './page/SpecialOrchid';
import AboutUs from './page/AboutUs';
import NewsPage from './page/News';
import AdminLayout from './layouts/AdminLayout';

function App() {
    return (
        <>
            <ScrollTop />
            <Navbar />
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-gray-900">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/orchid/:id" element={<OrchidDetail />} />
                    <Route path="/special" element={<SpecialOrchid />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/admin" element={<AdminLayout />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
