import { useRoutes } from "react-router-dom"
import Home from "../page/Home"
import MainLayout from "../layouts/MainLayout"
import OrchidDetail from "../component/OrchidDetail/OrchidDetail"
import Contact from "../page/Contact"
import SpecialOrchid from "../page/SpecialOrchid"
import NewsPage from "../page/News"
import Login from "../page/Login"
import AdminLayout from "../layouts/AdminLayout"
import AboutUs from "../page/AboutUs"
import ManageOrchid from "../page/Admin/ManageOrchid"

const Routes = () => {
    const routing = useRoutes([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <Home />   
                },
                {
                    path: "orchid/:id",
                    element: <OrchidDetail />
                },
                {
                    path: "contact",
                    element: <Contact />
                },
                {
                    path: "special",
                    element: <SpecialOrchid />
                },
                {
                    path: "news",
                    element: <NewsPage />
                },
                {
                    path: "about-us",
                    element: <AboutUs />
                },
                {
                    path: "login",
                    element: <Login />
                }
            ]
        },
        {
            path: "admin",
            element: <AdminLayout />,
            children:[
                {
                    index: true,
                    element: <ManageOrchid/>
                }
            ]
        }
    ]);
    return routing;
};

export default Routes;