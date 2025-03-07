import { Outlet } from "react-router-dom"
import Header from "../component/Header/Header"
import Footer from "../component/Footer/Footer"

function MainLayout() {
    return (
        <div>
            <Header />
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-gray-900">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout