import { useState, useRef } from "react";
import { data } from "../../assets/data";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { MdLogin, MdLogout } from "react-icons/md";

const AdminHeader = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);
    const auth = UserAuth();
    const navigate = useNavigate();
    const { user, logout } = auth || {};

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            setShowUserMenu(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

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
                                {user ? (
                                    <div className="flex items-center">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-6 h-6 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                                {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <MdLogin className="w-5 h-5 text-black" />
                                )}
                            </div>

                            {showUserMenu && (
                                <div className="absolute right-0 w-40 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        {user && (
                                            <>
                                                <div className="block px-4 py-2 text-sm text-foreground border-b">
                                                    {user.displayName || user.email}
                                                </div>
                                                <Link to={'/'} className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-red-500 w-full text-left">
                                                    Home
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-red-500 w-full text-left"
                                                >
                                                    <MdLogout className="mr-2" /> Logout
                                                </button>
                                            </>
                                        )}
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