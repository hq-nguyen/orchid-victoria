import { useState, useEffect, useRef, use } from "react";
import { FiSun, FiMoon, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { MdLogin, MdLogout } from "react-icons/md";
import { data } from "../../assets/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import useOrchidStore from "../../store/OrchidStore";
import LoadingComponent from "../Loading/Loading";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark";
    });
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const [activeItem, setActiveItem] = useState("home");
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    // Get auth context
    const auth = UserAuth();
    const { user, googleLogin, logout } = auth || {};
    // Get orchid state
    const { loading, setSearchQuery } = useOrchidStore();
    const [searchText, setSearchText] = useState('');
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(searchText);
        navigate('/');
    }


    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    useEffect(() => {
        const path = location.pathname;
        if (path === "/") {
            setActiveItem("home");
        } else if (path === "/about-us") {
            setActiveItem("about");
        } else if (path === "/news") {
            setActiveItem("news");
        } else if (path === "/special") {
            setActiveItem("special");
        } else if (path === "/contact") {
            setActiveItem("contact");
        } else {
            setActiveItem("");
        }
    }, [location]);

    const menuItems = [
        { name: "home", path: "/" },
        { name: "special", path: "/special" },
        { name: "news", path: "/news" },
        { name: "about", path: "/about-us" },
        { name: "contact", path: "/contact" },
    ];

    const handleLogin = async () => {
        try {
            await googleLogin();
            navigate('/admin');
            setShowUserMenu(false);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            setShowUserMenu(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleTheme = () => setIsDark(!isDark);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading) {
        <LoadingComponent text="Waiting for searching..." />;
    }

    return (
        <div className="bg-card dark:bg-secondary-foreground shadow-lg sticky w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section */}
                    <Link className="flex items-center" to={"/"}>
                        <div>
                            <img src={data.logo_brand} alt="Logo" className="h-14 rounded-md" />
                        </div>
                    </Link>

                    {/* Center Section - Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`text-accent hover:text-primary dark:text-muted-foreground dark:hover:text-primary-foreground capitalize relative group ${activeItem === item.name ? "text-primary dark:text-primary-foreground" : ""
                                    }`}
                            >
                                {item.name}
                                <span
                                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-primary-foreground transition-all duration-300 group-hover:w-full ${activeItem === item.name ? "w-full" : ""
                                        }`}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center space-x-2">
                        {/* search bar */}
                        <div className="hidden md:block flex-grow mx-8">
                            <form onSubmit={handleSearchSubmit} className="relative text-black dark:text-white">
                                <input
                                    type="text"
                                    placeholder="Search name orchids..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="w-full py-1.5 pl-3 pr-10 rounded-md border border-border dark:border-accent bg-background dark:bg-accent/30 focus:outline-none focus:ring-2 dark:focus:ring-blue-600 focus:ring-primary"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-0 mr-2 mt-2 text-accent hover:text-primary dark:text-primary-foreground"
                                >
                                    <FiSearch />
                                </button>
                            </form>
                        </div>
                        {/* theme */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-muted dark:hover:bg-accent transition-colors"
                        >
                            {isDark ? (
                                <FiSun className="w-5 h-5 text-primary-foreground" />
                            ) : (
                                <FiMoon className="w-5 h-5 text-foreground" />
                            )}
                        </button>

                        {/* Login/User menu section */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowUserMenu(true)}
                            onMouseLeave={() => setShowUserMenu(false)}
                            ref={userMenuRef}
                        >
                            <div className="p-2 rounded-full hover:bg-muted dark:hover:bg-accent transition-colors cursor-pointer">
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
                                    <MdLogin className="w-5 h-5 text-black dark:text-white" />
                                )}
                            </div>
                            {showUserMenu && (
                                <div className="absolute right-0 mt-0 w-40 rounded-md shadow-lg bg-card dark:bg-secondary-foreground ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1">
                                        {user ? (
                                            <>
                                                <div className="block px-4 py-2 text-sm text-foreground dark:text-primary-foreground border-b">
                                                    {user.displayName || user.email}
                                                </div>
                                                <Link to={'/admin'} className="block px-4 py-2 text-sm text-foreground dark:text-primary-foreground hover:bg-muted hover:text-red-500 dark:hover:bg-accent w-full text-left">
                                                    Dashboard
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center px-4 py-2 text-sm text-foreground dark:text-primary-foreground hover:bg-muted hover:text-red-500 dark:hover:bg-accent w-full text-left"
                                                >
                                                    <MdLogout className="mr-2" /> Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleLogin}
                                                    className="block px-4 py-2 text-sm text-foreground dark:text-primary-foreground hover:bg-muted hover:text-red-500 dark:hover:bg-accent w-full text-left">
                                                    Login with Google
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        {/* <div className="px-2 py-3">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search orchids..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="w-full py-1.5 pl-3 pr-10 rounded-md border border-border dark:border-accent bg-background dark:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-0 mr-2 mt-2 text-accent hover:text-primary dark:text-primary-foreground"
                                >
                                    <FiSearch />
                                </button>
                            </form>
                        </div> */}

                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-accent hover:text-primary dark:text-muted-foreground dark:hover:text-primary-foreground"
                        >
                            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-card dark:bg-secondary-foreground w-60">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => {
                                    setActiveItem(item.name);
                                    setIsOpen(false);
                                }}
                                className={`block px-3 py-2 rounded-md text-base w-full text-left capitalize ${activeItem === item.name
                                    ? "bg-primary text-primary-foreground"
                                    : "text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="border-t border-border dark:border-accent pt-2">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center px-3 py-2 rounded-md text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent w-full"
                            >
                                {isDark ? <FiSun className="w-5 h-5 mr-2" /> : <FiMoon className="w-5 h-5 mr-2" />}
                                {isDark ? "Light Mode" : "Dark Mode"}
                            </button>

                            {user ? (
                                <>
                                    <Link
                                        to="/admin"
                                        className="flex items-center px-3 py-2 rounded-md text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent w-full"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="flex items-center px-3 py-2 rounded-md text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent w-full"
                                    >
                                        <MdLogout className="w-5 h-5 mr-2" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleLogin();
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center px-3 py-2 rounded-md text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent w-full"
                                >
                                    <MdLogin className="w-5 h-5 mr-2" />
                                    Login with Google
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;