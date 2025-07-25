import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import MobileMenu from './MobileMenu';
import LIGHT from './../assets/LightCardence.png';
import DARK from './../assets/DarkCardence.png';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : true;
    });
    const location = useLocation();

    const toggleTheme = () => setDarkMode(prev => !prev);

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Create Card", path: "/create" },
        { name: "My Cards", path: "/my-cards" },
    ];

    return (
        <header className="w-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white px-6 py-4 flex items-center justify-between shadow-md dark:shadow-gray-800 z-50 fixed top-0 md:px-24">
            {/* Logo */}
            <div>
                {darkMode ? (
                    <img src={LIGHT} alt="Cardence logo" className="h-10 w-auto" />
                ) : (
                    <img src={DARK} alt="Cardence logo" className="h-10 w-auto" />
                )}
            </div>

            <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`transition hover:text-blue-600 dark:hover:text-blue-400 ${location.pathname === link.path
                                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                : ''
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}

                <button
                    onClick={toggleTheme}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                    title="Toggle theme"
                >
                    {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                </button>
            </nav>

            {/* Mobile Menu Icon */}
            <button className="md:hidden" onClick={toggleMenu}>
                <FaBars size={20} />
            </button>

            {/* Mobile Menu Modal */}
            {isMobileMenuOpen && (
                <MobileMenu onClose={toggleMenu} darkMode={darkMode} toggleTheme={toggleTheme} navLinks={navLinks}/>
            )}
        </header>
    );
};

export default Header;
