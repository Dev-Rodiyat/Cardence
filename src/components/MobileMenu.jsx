import { FaSun, FaMoon, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = ({ onClose, darkMode, toggleTheme, navLinks }) => {
    const location = useLocation();

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-end">
            <div className="w-64 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Menu</span>
                    <button onClick={onClose} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                        <FaTimes size={20} />
                    </button>
                </div>

                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={onClose}
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
                    className="mt-4 flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                    {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
        </div>
    );
};

export default MobileMenu;
