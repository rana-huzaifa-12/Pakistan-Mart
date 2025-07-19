import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllProducts from './pages/AllProducts';
import CategoryProducts from './components/CategoryProducts';
import Navbar2 from './components/Navbar2';
import ScrollToTop from './components/ScrollToTop';
import Contact from './components/Contact';

import ProductDetails from './pages/ProductDetail';


// ✅ Import the Lenis hook
import { useLenis } from './hooks/useLenis';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Activate smooth scrolling
  useLenis();

  return (
    <>
      <ScrollToTop />
      <Navbar onSearch={setSearchQuery} />
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<AllProducts searchQuery={searchQuery} />} />
        <Route
          path="/category/:categoryName"
          element={<CategoryProducts searchQuery={searchQuery} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<ProductDetails />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
