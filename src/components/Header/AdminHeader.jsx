import { useState, useRef } from "react";
import { FiUser } from "react-icons/fi";
import { data } from "../../assets/data";
import { Link } from "react-router-dom";

const AdminHeader = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);

    return (
        <div className="bg-card  shadow-lg sticky w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section - Logo Only */}
                    <Link className="flex items-center" to={"/"}>
                        <div>
                            <img src={data.logo_brand} alt="Logo" className="h-14 rounded-md" />
                        </div>
                    </Link>

                    {/* Right Section - Avatar Toggle Only */}
                    <div className="flex items-center">
                        <div 
                            className="relative" 
                            ref={userMenuRef}
                            onMouseEnter={() => setShowUserMenu(true)}
                            onMouseLeave={() => setShowUserMenu(false)}
                        >
                            <div className="p-2 rounded-full text-black hover:bg-muted transition-colors cursor-pointer">
                                <FiUser className="w-5 h-5 text-
                                " />
                            </div>
                            
                            {showUserMenu && (
                                <div className="absolute right-0 w-40 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <div className="block px-4 py-2 text-sm text-foreground border-b border-border">
                                            Hello Admin
                                        </div>
                                        <Link 
                                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-red-500 w-full text-left"
                                            to={'/'}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;