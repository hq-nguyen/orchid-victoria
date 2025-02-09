import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiUser, FiMenu, FiX } from "react-icons/fi";
import { IoLanguageOutline } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const menuItems = ["home", "special", "news", "about", "contact"];

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setIsDark(!isDark);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const toggleLangMenu = () => setShowLangMenu(!showLangMenu);

  return (
    <nav className="bg-card dark:bg-secondary-foreground shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
              alt="Logo"
              className="h-8 w-8 rounded-md"
            />
            <span className="ml-2 text-xl font-bold text-foreground dark:text-primary-foreground">BrandName</span>
          </div>

          {/* Center Section - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveItem(item)}
                className={`text-accent hover:text-primary dark:text-muted-foreground dark:hover:text-primary-foreground capitalize relative group ${
                  activeItem === item ? "text-primary dark:text-primary-foreground" : ""
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-primary-foreground transition-all duration-300 group-hover:w-full ${
                    activeItem === item ? "w-full" : ""
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted dark:hover:bg-accent transition-colors"
            >
              {isDark ? <FiSun className="w-5 h-5 text-primary-foreground" /> : <FiMoon className="w-5 h-5 text-foreground" />}
            </button>

            <div className="relative">
              <button
                onClick={toggleLangMenu}
                className="flex items-center space-x-1 text-accent hover:text-primary dark:text-muted-foreground dark:hover:text-primary-foreground"
              >
                <IoLanguageOutline className="w-5 h-5" />
                <span>{language}</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card dark:bg-secondary-foreground ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setLanguage("EN");
                        toggleLangMenu();
                      }}
                      className="block px-4 py-2 text-sm text-foreground dark:text-primary-foreground hover:bg-muted dark:hover:bg-accent w-full text-left"
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("VI");
                        toggleLangMenu();
                      }}
                      className="block px-4 py-2 text-sm text-foreground dark:text-primary-foreground hover:bg-muted dark:hover:bg-accent w-full text-left"
                    >
                      Vietnamese
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="p-2 rounded-full hover:bg-muted dark:hover:bg-accent transition-colors"
              >
                <FiUser className="w-5 h-5 text-accent dark:text-muted-foreground" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card dark:bg-secondary-foreground ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button className="block px-4 py-2 text-sm text-foreground dark:text-primary-foreground hover:bg-muted dark:hover:bg-accent w-full text-left">
                      Sign In
                    </button>
                    <button className="block px-4 py-2 text-sm text-foreground dark:text-primary-foreground hover:bg-muted dark:hover:bg-accent w-full text-left">
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
        <div className="md:hidden bg-card dark:bg-secondary-foreground">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveItem(item);
                  setIsOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base w-full text-left capitalize ${
                  activeItem === item
                    ? "bg-primary text-primary-foreground"
                    : "text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent"
                }`}
              >
                {item}
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
              <button
                onClick={() => setLanguage(language === "EN" ? "VI" : "EN")}
                className="flex items-center px-3 py-2 rounded-md text-accent hover:bg-muted dark:text-muted-foreground dark:hover:bg-accent w-full"
              >
                <IoLanguageOutline className="w-5 h-5 mr-2" />
                {language === "EN" ? "Vietnamese" : "English"}
              </button>
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
    </nav>
  );
};

export default Navbar;