import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import { FaShoppingCart } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL;

export default function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${API_BASE}/products/${productId}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Unable to load product details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            toast.success(`${product.name} added to cart!`);
        }
    };

    const goToCart = () => {
        navigate('/cart');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh] px-4 text-center">
                <p className="text-orange-400 text-lg animate-pulse">Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex items-center justify-center h-[60vh] px-4 text-center">
                <p className="text-red-500 text-lg">{error || "Product not found."}</p>
            </div>
        );
    }

    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">

                {/* Image */}
                <div className="flex justify-center items-center bg-gray-50 p-5">
                    <img
                        src={`${API_BASE.replace('/api', '')}/${product.image}`}
                        alt={product.name}
                        className="rounded-xl w-full max-w-sm object-cover transition-transform duration-300 hover:scale-105 shadow-md"
                    />
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-center space-y-4 text-base leading-relaxed">
                    <h1 className="text-2xl sm:text-3xl font-bold text-orange-400">{product.name}</h1>
                    <p className="text-gray-700 text-justify">{product.description}</p>

                    <div className="pt-2">
                        <span className="font-medium text-gray-800">Category:</span>{' '}
                        <span className="text-gray-600">{product.category}</span>
                    </div>

                    <div className="text-xl font-semibold text-orange-600 pt-1">
                        Rs {product.price}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-orange-500 hover:bg-gray-500 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-500 shadow-md flex items-center justify-center gap-2"
                        >
                            <FaShoppingCart /> Add to Cart
                        </button>

                        <button
                            onClick={goToCart}
                            className="flex-1 bg-gray-800 hover:bg-orange-500 text-orange-400 hover:text-white font-semibold py-2 px-5 rounded-lg transition-all duration-500 shadow-md flex items-center justify-center gap-2"
                        >
                            <FaShoppingCart /> Go to Cart
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
}
