import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';

const Footer = () => {
    return (
        <footer className="bg-[#03071e] text-gray-300 pt-12 pb-6 px-4 sm:px-8 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left">

                {/* Brand Info */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-2xl font-extrabold text-orange-400 tracking-wide mb-3">
                        Pakistan Mart
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                        Your trusted destination for paper essentials and tech products. We ensure quality, affordability, and fast delivery across Pakistan.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-semibold text-orange-400 mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-orange-400 transition duration-300">Home</Link>
                        </li>
                        <li>
                            <Link to="/products" className="hover:text-orange-400 transition duration-300">Products</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-orange-400 transition duration-300">Contact Us</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-semibold text-orange-400 mb-4">Connect with Us</h3>
                    <p className="text-sm mb-3 text-gray-400">
                        Email: <a href="mailto:pakistanmartskg@gmail.com" className="hover:text-orange-400 transition">pakistanmartskg@gmail.com</a>
                    </p>
                    <div className="flex gap-4 text-xl text-gray-400">
                        <a href="https://www.facebook.com/share/1CSZdnVhwm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition duration-300">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/pakistanpaper?igsh=MTN5Y2ducm9ldXk0cw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition duration-300">
                            <FaInstagram />
                        </a>

                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
                <p>
                    &copy; {new Date().getFullYear()} <span className="text-orange-400 font-medium">Pakistan Mart</span>. All rights reserved.
                </p>
                <p className="mt-2 flex justify-center items-center gap-1">
                    Made with <AiFillHeart className="text-orange-400 text-base" /> by <span className="text-orange-400 font-medium">Rana Huzaifa</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
