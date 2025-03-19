import { Outlet } from "react-router-dom"
import AdminHeader from "../components/Header/AdminHeader"
import AdminSidebar from "../components/Sidebar/AdminSidebar"

const AdminLayout = () => {

    return (
        <div className="min-h-screen bg-background">
            <AdminHeader />
            <div className="flex">
                <AdminSidebar />
                <div className="flex-1 p-6 md:p-8 lg:p-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
