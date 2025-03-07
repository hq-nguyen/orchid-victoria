import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon, FiUser, FiMenu, FiX } from "react-icons/fi";
// import { IoLanguageOutline } from "react-icons/io5";
import { data } from "../../assets/data";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark";
    });
    // const [language, setLanguage] = useState("EN");
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const [activeItem, setActiveItem] = useState("home");
    const userMenuRef = useRef(null);

    // Store theme in localStorage
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

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleTheme = () => setIsDark(!isDark);
    // const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

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
                    <div className="hidden md:flex items-center space-x-6">
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

                        {/* login sign-up section */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowUserMenu(true)}
                            onMouseLeave={() => setShowUserMenu(false)}
                            ref={userMenuRef}
                        >
                            <div className="p-2 rounded-full hover:bg-muted dark:hover:bg-accent transition-colors">
                                <FiUser className="w-5 h-5 text-accent dark:text-muted-foreground" />
                            </div>
                            {showUserMenu && (
                                <div className="absolute right-0 mt-0 w-32 rounded-md shadow-lg bg-card dark:bg-secondary-foreground ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <Link to={'/login'} className="block px-4 py-2 text-sm text-foreground dark:text-primary-foreground hover:bg-muted hover:text-red-500 dark:hover:bg-accent w-full text-left">
                                            Login
                                        </Link>
                                        <button className="block px-4 py-2 text-sm text-foreground dark:text-primary-foreground hover:bg-muted hover:text-red-500 dark:hover:bg-accent w-full text-left">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden">
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
                            <button
                                key={item.name}
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
                            </button>
                        ))}
                        <div className="border-t border-border dark:border-accent pt-2">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center px-3 py-2 rounded-md text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent w-full"
                            >
                                {isDark ? <FiSun className="w-5 h-5 mr-2" /> : <FiMoon className="w-5 h-5 mr-2" />}
                                {isDark ? "Light Mode" : "Dark Mode"}
                            </button>
                            {/* <button
                                onClick={() => setLanguage(language === "EN" ? "VI" : "EN")}
                                className="flex items-center px-3 py-2 rounded-md text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent w-full"
                            >
                                <IoLanguageOutline className="w-5 h-5 mr-2" />
                                {language === "EN" ? "Vietnamese" : "English"}
                            </button> */}
                            <button className="flex items-center px-3 py-2 rounded-md text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent w-full">
                                Sign In
                            </button>
                            <button className="flex items-center px-3 py-2 rounded-md text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent w-full">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
