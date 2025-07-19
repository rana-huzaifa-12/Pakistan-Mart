import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptop, FaRegFileAlt, FaShoppingBag } from 'react-icons/fa';

const Navbar2 = () => {
    return (
        <nav className="w-full bg-gray-800 shadow-md py-2 px-4 sm:px-6 md:px-12 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-1 sm:gap-3">
                <Link
                    to="/category/Paper Products"
                    className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-medium text-orange-900 bg-white hover:bg-orange-100 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-md transition duration-300"
                >
                    <FaRegFileAlt className="text-orange-600 text-[12px] sm:text-base" />
                    Paper Products
                </Link>

                <Link
                    to="/category/Tech Products"
                    className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-medium text-orange-900 bg-white hover:bg-orange-100 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-md transition duration-300"
                >
                    <FaLaptop className="text-orange-600 text-[12px] sm:text-base" />
                    Tech Products
                </Link>

                <Link
                    to="/products"
                    className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-medium text-orange-900 bg-white hover:bg-orange-100 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-md transition duration-300"
                >
                    <FaShoppingBag className="text-orange-600 text-[12px] sm:text-base" />
                    All Products
                </Link>
            </div>
        </nav>
    );
};

export default Navbar2;
