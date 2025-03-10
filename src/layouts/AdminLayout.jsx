import { Outlet } from "react-router-dom"
import AdminHeader from "../component/Header/AdminHeader"

const AdminLayout = () => {

    return (
        <div>
            <AdminHeader />
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout
