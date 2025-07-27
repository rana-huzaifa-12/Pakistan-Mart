import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('adminToken', res.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6 lg:px-8"
            style={{ backgroundImage: "url('/login1.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

            {/* Glassy Form */}
            <form
                onSubmit={handleLogin}
                className="relative z-10 backdrop-blur-md bg-white/10 border border-white/50 shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md space-y-5 sm:space-y-6"
            >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-orange-500">
                    Admin Login
                </h2>

                {/* Email */}
                <div className="space-y-1 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-white">Email</label>
                    <div className="relative">
                        <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 text-sm sm:text-base" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-1 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-white">Password</label>
                    <div className="relative">
                        <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 text-sm sm:text-base" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <p className="text-xs sm:text-sm text-red-200 bg-red-500/20 px-3 py-2 rounded-md">
                        {error}
                    </p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base py-2 rounded-lg font-semibold transition-all duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
