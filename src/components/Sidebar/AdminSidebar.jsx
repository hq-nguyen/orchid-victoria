import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdCategory, MdLocalFlorist } from "react-icons/md";

const AdminSidebar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const navigationItems = [
        // {
        //     title: "Dashboard",
        //     path: "/admin/dashboard",
        //     icon: <MdDashboard className="w-5 h-5" />
        // },
        {
            title: "Orchids",
            path: "/admin",
            icon: <MdLocalFlorist className="w-5 h-5" />
        },
        {
            title: "Categories",
            path: "/admin/categories",
            icon: <MdCategory className="w-5 h-5" />
        }
    ];

    return (
        <div 
            className={`bg-card shadow-md h-screen transition-all duration-300 ${
                collapsed ? "w-16" : "w-64"
            } sticky left-0 top-16 z-40`}
        >
            <div className="flex justify-end p-2">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                    {collapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    )}
                </button>
            </div>

            <nav className="mt-4">
                <ul>
                    {navigationItems.map((item) => (
                        <li key={item.path} className="mb-2">
                            <Link
                                to={item.path}
                                className={`flex items-center px-4 py-3 transition-colors ${
                                    location.pathname === item.path
                                        ? "bg-primary/10 text-primary border-r-4 border-primary"
                                        : "text-foreground hover:bg-muted"
                                }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {!collapsed && <span>{item.title}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;