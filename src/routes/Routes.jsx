import { useRoutes } from "react-router-dom"
import Home from "../page/Home"
import MainLayout from "../layouts/MainLayout"
import OrchidDetail from "../components/OrchidDetail/OrchidDetail"
import Contact from "../page/Contact"
import SpecialOrchid from "../page/SpecialOrchid"
import NewsPage from "../page/News"
import Login from "../page/Login"
import AdminLayout from "../layouts/AdminLayout"
import AboutUs from "../page/AboutUs"
import ManageOrchid from "../page/Admin/ManageOrchid"
import ProtectedRoute from "./ProtectedRoute"
import ManageCategory from "../page/Admin/ManageCategory"
import OrchidSection from "../components/OrchidSection/OrchidSection"

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
                    path: "collections",
                    element: <OrchidSection />
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
            element: (
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    element: <ManageOrchid />
                },
                {
                    path: "categories",
                    element: <ManageCategory />
                }
            ]
        }
    ]);
    return routing;
};

export default Routes;