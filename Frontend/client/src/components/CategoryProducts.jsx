import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CartContext } from '../context/CartContext';
import { FaCartPlus, FaWhatsapp } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL;


function CategoryProducts({ searchQuery }) {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate(); //  Hook to navigate programmatically

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const res = await axios.get(`${API_BASE}/products/category/${categoryName}`);
                setProducts(res.data);
            } catch (err) {
                toast.error('❌ Could not load category products');
            }
        };

        fetchCategoryProducts();
    }, [categoryName]);

    // Filter products by search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-100 via-gray-200 to-gray-100 px-4 py-12 relative">
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-orange-400 bg-gray-900 py-2 mb-10 uppercase tracking-wider">
                {categoryName}
            </h1>

            {filteredProducts.length === 0 ? (
                <p className="text-center text-zinc-500 text-lg">No products found.</p>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <h2 className="text-base font-semibold text-gray-800 truncate">{product.name}</h2>
                                    <p className="text-orange-600 font-bold text-sm mt-1">Rs. {product.price}</p>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">{product.description}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // ✅ Prevent card click from triggering
                                        addToCart(product);
                                        toast.success('Added to cart');
                                    }}
                                    className="mt-4 bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded text-xs flex items-center justify-center gap-2"
                                >
                                    <FaCartPlus /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Floating WhatsApp Icon */}
            <a
                href="https://wa.me/92542450992"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50 transition duration-300"
            >
                <FaWhatsapp size={24} />
            </a>
        </div>
    );
}

export default CategoryProducts;
