import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import { FaWhatsapp, FaStar, FaFire, FaThumbsUp, FaTags, FaGift, FaBolt, FaRocket, FaCrown, FaCartPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import SwiperCarousel from '../components/SwiperCarousel';

const API_BASE = import.meta.env.VITE_API_URL;

function Home({ searchQuery = '' }) {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${API_BASE}/products`);
                setProducts(res.data);
            } catch (err) {
                console.error('Error fetching products:', err);
                toast.error('❌ Failed to load products');
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderProducts = (items) => (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((product) => (
                <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl shadow-gray-200 hover:shadow-gray-400 border border-gray-100 transition-all duration-300 overflow-hidden h-full"
                >
                    <Link to={`/product/${product._id}`}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="space-y-1">
                            <Link to={`/product/${product._id}`}>
                                <h2 className="text-base font-semibold text-zinc-800 truncate hover:text-orange-500 transition">
                                    {product.name}
                                </h2>

                                <p className="text-orange-600 font-semibold text-sm">Rs. {product.price}</p>
                                <p className="text-xs text-zinc-500 line-clamp-1 overflow-hidden">
                                    {product.description}
                                </p>
                            </Link>
                        </div>

                        <button
                            onClick={() => {
                                addToCart(product);
                                toast.success('Added to Cart');
                            }}
                            className="mt-4 w-full bg-[#03071e] text-white py-2 rounded-md hover:bg-orange-500 transition duration-500 text-sm font-medium flex items-center justify-center gap-2"
                        >
                            <FaCartPlus /> Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const sectionTitles = [
        { title: 'Featured Products', icon: <FaStar className="inline-block text-orange-400 mr-2" /> },
        { title: 'Trending Deals', icon: <FaFire className="inline-block text-orange-400 mr-2" /> },
        { title: 'Top Picks', icon: <FaThumbsUp className="inline-block text-orange-400 mr-2" /> },
        { title: 'Hot Offers', icon: <FaTags className="inline-block text-orange-400 mr-2" /> },
        { title: 'Best Deals', icon: <FaGift className="inline-block text-orange-400 mr-2" /> },
        { title: 'Super Discounts', icon: <FaBolt className="inline-block text-orange-400 mr-2" /> },
        { title: 'Top Offers', icon: <FaRocket className="inline-block text-orange-400 mr-2" /> },
        { title: 'Mart Specials', icon: <FaCrown className="inline-block text-orange-400 mr-2" /> },
    ];

    const images = ['/mybanner1.jpg', '/mybanner15.jpg', '/mybanner11.jpg', '/mybanner14.jpg'];

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-100 via-gray-300 to-gray-200 pb-6 pt-2">
            <div className="w-full my-2">
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} loop={true} slidesPerView={1}>
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div className="p-4 md: md:py-0"> {/* adds padding on all sides */}
                                <img
                                    src={src}
                                    alt={`Banner ${index + 1}`}
                                    className="w-full h-[180px] sm:h-[280px] md:h-[400px] lg:h-[580px] object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>

            <SwiperCarousel />

            {searchQuery ? (
                <section className="p-4 sm:p-6 max-w-7xl mx-auto bg-white rounded-md mt-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-400 mb-6 bg-[#03071e] py-2">
                        Search Results
                    </h2>
                    {filteredProducts.length > 0 ? renderProducts(filteredProducts) : <p className="text-center text-zinc-700">No products found.</p>}
                </section>
            ) : (
                <>
                    {Array.from({ length: 8 }).map((_, index) => {
                        const sectionProducts = products.slice(index * 8, (index + 1) * 8);
                        return (
                            sectionProducts.length > 0 && (
                                <section key={index} className="p-4 sm:p-6 max-w-7xl mx-auto mt-6 rounded-md">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-400 mb-6 sm:mb-8 bg-[#03071e] py-2 flex justify-center items-center gap-2">
                                        {sectionTitles[index]?.icon}
                                        {sectionTitles[index]?.title}
                                    </h2>
                                    {renderProducts(sectionProducts)}
                                </section>
                            )
                        );
                    })}

                    <div className="text-center mt-10">
                        <Link to="/products" className="inline-block bg-[#03071e] text-orange-400 font-bold px-6 py-2 rounded-full hover:bg-orange-500 hover:text-gray-900 transition duration-500">
                            Show All Products
                        </Link>
                    </div>
                </>
            )}

            <a
                href="https://wa.me/92542450992"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
                title="Chat on WhatsApp"
            >
                <FaWhatsapp className="w-6 h-6" />
            </a>
        </div>
    );
}

export default Home;
