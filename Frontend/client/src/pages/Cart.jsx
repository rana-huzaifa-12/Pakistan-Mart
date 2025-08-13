import React from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaHome, FaTrashAlt, FaShoppingCart } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL;

function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-50 via-gray-200 to-gray-100 text-zinc-900 px-3 sm:px-6 lg:px-10 py-6 sm:py-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-xl sm:text-4xl font-bold text-orange-500 mb-5 sm:mb-8 flex items-center gap-2 sm:gap-3">
                    <FaShoppingCart className="text-[#03071e]" />
                    Your Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="text-center text-zinc-600 text-sm sm:text-xl mt-12 sm:mt-16">
                        Your cart is currently empty..
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="space-y-3 sm:space-y-6">
                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-row items-start gap-3 sm:gap-4 bg-white shadow-sm hover:shadow-md transition-all rounded-xl p-2 sm:p-5"
                                >
                                    <img
                                        src={`${API_BASE.replace('/api', '')}/${item.image}`}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-lg shadow-sm sm:w-24 sm:h-24"
                                    />
                                    <div className="flex-1 text-left">
                                        <h2 className="text-sm sm:text-lg font-semibold truncate">{item.name}</h2>
                                        <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                                            Rs. {item.price} × {item.quantity}
                                        </p>
                                        {/* Mobile only: Remove button below price */}
                                        <div className="block sm:hidden mt-2">
                                            <button
                                                onClick={() => {
                                                    removeFromCart(item._id);
                                                    toast.success('Removed from cart');
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded-md transition flex items-center gap-1"
                                            >
                                                <FaTrashAlt className="text-xs" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    {/* Desktop only: Remove button beside */}
                                    <div className="hidden sm:block">
                                        <button
                                            onClick={() => {
                                                removeFromCart(item._id);
                                                toast.success('Removed from cart');
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md transition flex items-center gap-2"
                                        >
                                            <FaTrashAlt />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Total + Actions */}
                        <div className="mt-6 sm:mt-10  rounded-xl sm:rounded-2xl  p-4 sm:p-6">
                            <div className="text-right">
                                <h2 className="text-lg sm:text-2xl font-bold text-[#03071e]">
                                    Total: <span className="text-orange-500">Rs. {total}</span>
                                </h2>
                            </div>

                            <div className="flex flex-row justify-end gap-2 mt-4 sm:mt-6">
                                <button
                                    onClick={clearCart}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition text-xs sm:text-sm"
                                >
                                    Clear Cart
                                </button>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-md font-semibold transition text-xs sm:text-sm"
                                >
                                    Go to Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Return Home */}
                <div className="mt-6 sm:mt-10">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 sm:gap-3 bg-[#03071e] hover:bg-zinc-800 text-white px-4 py-2 sm:px-5 sm:py-4 rounded-md transition w-full sm:w-auto text-xs sm:text-sm"
                    >
                        <FaHome />
                        Return to Homepage
                    </button>
                </div>
            </div>

            {/* WhatsApp Floating */}
            <a
                href="https://wa.me/92542450992"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
                title="Chat on WhatsApp"
            >
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
        </div>
    );
}

export default Cart;
