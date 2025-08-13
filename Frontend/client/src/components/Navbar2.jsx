import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptop, FaRegFileAlt, FaShoppingBag } from 'react-icons/fa';

const Navbar2 = () => {
    return (
        <nav className="w-full bg-gray-800 shadow-md py-2 px-4 sm:px-6 md:px-12 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex flex-nowrap justify-center gap-3">
                <Link
                    to="/category/Paper Products"
                    className="flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-sm font-semibold text-orange-900 bg-white hover:bg-orange-100 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md transition duration-300 whitespace-nowrap max-[400px]:text-[10px] max-[400px]:gap-1 max-[400px]:px-2 max-[400px]:py-0.5"
                >
                    <FaRegFileAlt className="text-orange-600 text-[14px] sm:text-base max-[400px]:text-[12px]" />
                    Paper Products
                </Link>

                <Link
                    to="/category/Tech Products"
                    className="flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-sm font-semibold text-orange-900 bg-white hover:bg-orange-100 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md transition duration-300 whitespace-nowrap max-[400px]:text-[10px] max-[400px]:gap-1 max-[400px]:px-2 max-[400px]:py-0.5"
                >
                    <FaLaptop className="text-orange-600 text-[14px] sm:text-base max-[400px]:text-[12px]" />
                    Tech Products
                </Link>

                <Link
                    to="/products"
                    className="flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-sm font-semibold text-orange-900 bg-white hover:bg-orange-100 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md transition duration-300 whitespace-nowrap max-[400px]:text-[10px] max-[400px]:gap-1 max-[400px]:px-2 max-[400px]:py-0.5"
                >
                    <FaShoppingBag className="text-orange-600 text-[14px] sm:text-base max-[400px]:text-[12px]" />
                    All Products
                </Link>
            </div>
        </nav>
    );
};

export default Navbar2;
