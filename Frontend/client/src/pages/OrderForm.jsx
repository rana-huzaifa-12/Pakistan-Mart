import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function OrderForm() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, address } = formData;
        if (!name || !email || !phone || !address) {
            toast.error('All fields are required');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/orders', {
                ...formData,
                items: cart,
                total,
            });

            clearCart();
            toast.success('✅ Order placed successfully!');
            navigate('/');
        } catch (err) {
            toast.error('❌ Failed to place order');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#a73e2c] mb-6 text-center">
                    📝 Place Your Order
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-700 font-medium mb-1 block">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. John Doe"
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 font-medium mb-1 block">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="e.g. john@example.com"
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 font-medium mb-1 block">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="e.g. 03001234567"
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 font-medium mb-1 block">Home Address</label>
                        <textarea
                            name="address"
                            placeholder="Your complete address"
                            rows="3"
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="text-gray-600 text-sm mt-2">
                        🛒 <strong>{cart.length}</strong> item(s) | 💰 <strong>Total: Rs. {total}</strong>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#a73e2c] hover:bg-[#922f1d] text-white font-medium py-2 rounded transition duration-300"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OrderForm;
