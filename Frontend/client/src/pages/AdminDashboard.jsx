import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaFolderOpen } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL;



function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [fileName, setFileName] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: null,
        description: '',
        category: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");


    const token = localStorage.getItem('adminToken');
    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API_BASE}/products`);
            setProducts(res.data);
        } catch (err) {
            toast.error('Failed to fetch products');
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API_BASE}/orders`, authHeader);
            setOrders(res.data);
        } catch (err) {
            toast.error('Failed to fetch orders');
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
        setFileName(file ? file.name : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'image' && value) payload.append('image', value);
            else if (key !== 'image') payload.append(key, value);
        });

        try {
            if (editingId) {
                await axios.put(`${API_BASE}/products/${editingId}`, payload, {
                    ...authHeader,
                    headers: {
                        ...authHeader.headers,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success(' Product updated!');
            } else {
                await axios.post(`${API_BASE}/products`, payload, {
                    ...authHeader,
                    headers: {
                        ...authHeader.headers,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success(' Product added!');
            }

            setFormData({ name: '', price: '', image: null, description: '', category: '' });
            setFileName('');
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            console.error(err);
            toast.error('❌ Unauthorized or error submitting product');
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            price: product.price,
            image: null,
            description: product.description,
            category: product.category,
        });
        setFileName('');
        setEditingId(product._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE}/products/${id}`, authHeader);
            toast.success('🗑️ Product deleted!');
            fetchProducts();
        } catch (err) {
            toast.error(' Unauthorized or error deleting product');
        }
    };

    // DELETE ORDER FUNCTION
    const handleOrderDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE}/orders/${id}`, authHeader);
            toast.success('🗑️ Order deleted!');
            fetchOrders();
        } catch (err) {
            toast.error(' Error deleting order');
        }
    };

    return (

        <div className='bg-gradient-to-r from-orange-50 via-gray-200 to-gray-100'>
            <div className="p-4 sm:p-6 space-y-10 max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4 text-center">Admin Dashboard</h1>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-lg shadow-md p-5 space-y-4"
                    encType="multipart/form-data"
                >
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                        {editingId ? '✏️ Edit Product' : '➕ Add New Product'}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleInput}
                            className="border px-3 py-2 rounded w-full"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleInput}
                            className="border px-3 py-2 rounded w-full"
                            required
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleInput}
                            className="border px-3 py-2 rounded w-full"
                            required
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInput}
                            className="border px-3 py-2 rounded w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Product Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-pointer"
                            required={!editingId}
                        />
                        {fileName && (
                            <p className="text-sm mt-1 text-green-600">📁 {fileName}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
                    >
                        {editingId ? 'Update Product' : 'Add Product'}
                    </button>
                </form>




                {/* Product List */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaFolderOpen className="text-orange-600" />
                        Products
                    </h2>

                    {/*  Search Bar */}
                    <div className="mb-4">
                        <div className="relative w-full sm:w-1/2">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-black transition duration-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg
                                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                            </svg>
                        </div>
                    </div>


                    <div className="grid gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products
                            .filter((product) =>
                                product.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((product) => (
                                <div key={product._id} className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
                                    <img
                                        src={`${API_BASE.replace('/api', '')}/${product.image}`}
                                        alt={product.name}
                                        className="h-40 w-full object-cover rounded-md"
                                    />
                                    <h3 className="text-md font-bold mt-3 truncate">{product.name}</h3>
                                    <p className="text-sm text-gray-700">Rs. {product.price}</p>

                                    <div className="flex justify-between mt-3 gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>


                {/* Orders */}
                <section className="mt-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Customer Orders</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-500 text-sm">No orders yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                                    <p><strong>Name:</strong> {order.name}</p>
                                    <p><strong>Email:</strong> {order.email}</p>
                                    <p><strong>Phone:</strong> {order.phone}</p>
                                    <p><strong>Address:</strong> {order.address}</p>
                                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                    <ul className="list-disc ml-5 text-sm text-gray-700">
                                        {order.items.map((item, idx) => (
                                            <li key={idx}>
                                                {item.productId?.name || 'Unnamed'} × {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => handleOrderDelete(order._id)}
                                        className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                                    >
                                        Delete Order
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default AdminDashboard;
