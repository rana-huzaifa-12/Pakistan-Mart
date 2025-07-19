import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import { FaShoppingBag, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ import Link

function AllProducts({ searchQuery }) {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
            toast.error('❌ Could not load products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-50 via-gray-200 to-gray-100 py-8 px-3 sm:px-5">
            <div className="w-full">
                <img
                    src="/mybanner1.jpg"
                    alt="Promotional Banner"
                    className="w-full h-auto object-cover rounded-lg shadow-lg mb-8 md:mb-16"
                />
            </div>

            {/* Title */}
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                <FaShoppingBag /> All Products
            </h1>
            <p className="text-center text-zinc-500 mb-10 text-sm sm:text-base">
                Explore our complete range of handpicked items just for you.
            </p>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
                <p className="text-center text-zinc-400">No products found.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-2xl shadow group hover:shadow-xl transition duration-300 flex flex-col"
                        >
                            {/* Link wraps only the image and top content, not the button */}
                            <Link to={`/product/${product._id}`} className="block">
                                {/* Image */}
                                <div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden rounded">
                                    <img
                                        src={`http://localhost:5000/${product.image}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Details */}
                                <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                                    <div className="space-y-1 mb-2">
                                        <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                                            {product.name}
                                        </h2>
                                        <p className="text-orange-600 font-bold text-xs sm:text-sm">
                                            Rs. {product.price}
                                        </p>
                                        <p className="text-xs text-gray-600 line-clamp-1">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* Add to Cart Button (outside Link) */}
                            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        toast.success('Added to cart');
                                    }}
                                    className="mt-auto w-full bg-orange-500 hover:bg-gray-900 text-white text-xs sm:text-sm font-medium py-2 rounded transition duration-500"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ✅ Floating WhatsApp Button */}
            <a
                href="https://wa.me/92542450992"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition duration-300"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp size={24} />
            </a>
        </div>
    );
}

export default AllProducts;
