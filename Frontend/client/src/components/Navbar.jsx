import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaShoppingCart,
    FaUserShield,
    FaBars,
    FaTimes,
    FaSearch,
} from 'react-icons/fa';
import { BiHomeAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';

const Navbar = ({ onSearch }) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('adminToken');
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isOpen);
        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.success('Logged out successfully');
        navigate('/admin/login');
        setIsOpen(false);
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Navbar */}
            <nav className="bg-[#03071e] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between ">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Pakistan Mart Logo"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md border border-orange-400"
                        />
                        <div className="flex flex-col leading-none">
                            <span className="text-base md:text-lg font-semibold text-white">
                                Pakistan Mart
                            </span>
                            <span className="text-xs text-orange-400 tracking-wide">
                                Superstore
                            </span>
                        </div>
                    </Link>

                    {/* Hamburger (Mobile) */}
                    <button onClick={() => setIsOpen(true)} className="md:hidden z-50">
                        <FaBars size={22} />
                    </button>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-8 items-center text-md font-medium relative">
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/cart', label: 'Cart' },
                            ...(isLoggedIn
                                ? [{ to: '/admin/dashboard', label: 'Admin' }]
                                : []),
                        ].map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className="relative px-3 py-2 text-white font-medium group transition-all duration-300
  before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[3px] before:bg-orange-400
  before:transition-all before:duration-300
  hover:before:w-full before:rounded-2xl"
                            >
                                {link.label}
                            </Link>

                        ))}

                        {/* Search Box (Desktop) */}
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="relative group"
                        >
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    onSearch(e.target.value);
                                }}
                                className="w-64 px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 outline-none
                           transition-all duration-300 ease-in-out
                           focus:ring-2 focus:ring-orange-400 focus:border-orange-500
                           shadow-sm group-hover:shadow-md"
                            />
                            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-400 transition duration-300" />
                        </form>

                        {/* Logout */}
                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-md text-white transition-all duration-300 shadow-sm"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 right-0 w-64 h-full bg-[#03071e] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-orange-400">Menu</h2>
                    <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
                        <FaTimes
                            size={20}
                            className="text-white hover:text-orange-400 transition"
                        />
                    </button>
                </div>

                {/* Search (Mobile) */}
                <div className="px-4 pt-4 pb-2">
                    <form onSubmit={(e) => e.preventDefault()} className="relative group">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                onSearch(e.target.value);
                            }}
                            className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 outline-none
                         transition-all duration-300 ease-in-out
                         focus:ring-2 focus:ring-orange-400 focus:border-orange-500
                         shadow-sm group-hover:shadow-md"
                        />
                        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-400 transition duration-300" />
                    </form>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-5 p-6 text-sm font-medium text-orange-300">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-orange-400 flex items-center gap-2 transition"
                    >
                        <BiHomeAlt />
                        <span>Home</span>
                    </Link>

                    <Link
                        to="/cart"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-orange-400 flex items-center gap-2 transition"
                    >
                        <FaShoppingCart />
                        <span>Cart</span>
                    </Link>

                    {isLoggedIn && (
                        <>
                            <Link
                                to="/admin/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-orange-400 flex items-center gap-2 transition"
                            >
                                <FaUserShield />
                                <span>Admin</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="mt-4 bg-orange-400 hover:bg-orange-500 px-4 py-1.5 rounded-md text-white text-left transition shadow-sm"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Navbar;
