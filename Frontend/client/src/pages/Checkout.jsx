import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    FaWhatsapp,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaShoppingCart,
    FaCashRegister
} from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL;

function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: '',
    });

    const [loading, setLoading] = useState(false);

    const baseTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryCharge = (form.paymentMethod && form.paymentMethod !== 'Cash on Delivery') ? 300 : 0;
    const total = baseTotal + deliveryCharge;

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePlaceOrder = async () => {
        const { name, email, phone, address, paymentMethod } = form;

        if (!name || !email || !phone || !address || !paymentMethod) {
            toast.error('Please fill all fields');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${API_BASE}/orders`, {
                ...form,
                items: cart,
                total,
            });

            toast.success('Order placed successfully!');
            clearCart();
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
                <FaShoppingCart className="text-4xl text-[#a73e2c] mb-3" />
                <h1 className="text-2xl font-bold text-[#a73e2c] mb-2">Your Cart is Empty</h1>
                <p className="text-gray-600">Go back and add some products to continue checkout.</p>
                <a
                    href="https://wa.me/92542450992"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
                    title="Chat on WhatsApp"
                >
                    <FaWhatsapp className="w-6 h-6" />
                </a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 py-12 px-4 flex justify-center">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <FaCashRegister className="text-[#a73e2c] text-2xl" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#a73e2c]">Checkout</h2>
                </div>

                <div className="space-y-5">
                    {/* Form Fields */}
                    <div className="flex items-center gap-3">
                        <FaUser className="text-[#a73e2c]" />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-[#a73e2c]" />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <FaPhone className="text-[#a73e2c]" />
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="mt-2 text-[#a73e2c]" />
                        <textarea
                            name="address"
                            rows="3"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Delivery Address"
                            className="w-full border rounded px-4 py-2 resize-none"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <FaMoneyBillWave className="text-[#a73e2c]" />
                        <select
                            name="paymentMethod"
                            value={form.paymentMethod}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-2"
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                            <option value="EasyPaisa">EasyPaisa</option>
                            <option value="Nayapay">Nayapay</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>

                    {/* Payment Instructions */}
                    {form.paymentMethod && (
                        <div className="bg-orange-50 border border-dashed border-orange-300 rounded-lg p-4 text-sm text-gray-800 space-y-1">
                            {form.paymentMethod === 'Cash on Delivery' && (
                                <>
                                    <p className="text-red-600 font-semibold">Important:</p>
                                    <p>Delivery charges of <strong>Rs. 300</strong> must be sent in advance.</p>
                                    <p>Send to: <strong>0307-6200531</strong> (FAROOQ SATTAR)</p>
                                </>
                            )}
                            {(form.paymentMethod === 'EasyPaisa' || form.paymentMethod === 'Nayapay') && (
                                <>
                                    <p>Send Rs. {total} to <strong>0307-6200531</strong></p>
                                    <p>Name: <strong>Farooq Sattar</strong></p>
                                </>
                            )}
                            {form.paymentMethod === 'Bank Transfer' && (
                                <>
                                    <p>Transfer Rs. {total} to:</p>
                                    <p>IBAN: <strong>PK07UNIL0109000313197464</strong> (UBL)</p>
                                    <p>Name: <strong>Farooq Sattar</strong></p>
                                </>
                            )}
                            <p className="text-green-700 pt-2">
                                Send screenshot on WhatsApp:&nbsp;
                                <a
                                    href="https://wa.me/92542450992"
                                    className="underline text-green-600"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    0542450992
                                </a>
                            </p>
                        </div>
                    )}

                    {/* Summary */}
                    <div className="pt-4 text-right text-[#a73e2c] text-sm sm:text-base space-y-1">
                        <p>Subtotal: Rs. {baseTotal}</p>
                        {deliveryCharge > 0 && <p>Delivery Charges: Rs. {deliveryCharge}</p>}
                        <p className="text-lg font-semibold">Total: Rs. {total}</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#a73e2c] hover:bg-[#922f1d]'
                            } text-white py-3 rounded-md font-semibold text-lg transition-all duration-300`}
                    >
                        <FaCashRegister className="text-white" />
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>

                {/* WhatsApp Button */}
                <a
                    href="https://wa.me/92542450992"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
                    title="Chat on WhatsApp"
                >
                    <FaWhatsapp className="w-6 h-6" />
                </a>
            </div>
        </div>
    );
}

export default Checkout;
