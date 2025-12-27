import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from './../../config/firebase.config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if(user)navigate('/');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        const provider = new GoogleAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            if(user)navigate('/');
        } catch (err) {
            setError('Google login failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Food Icons - Floating Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce" style={{animationDuration: '3s'}}>🍕</div>
                <div className="absolute top-32 right-20 text-5xl opacity-10 animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}>🍔</div>
                <div className="absolute bottom-20 left-16 text-6xl opacity-10 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1s'}}>🍜</div>
                <div className="absolute bottom-32 right-24 text-5xl opacity-10 animate-bounce" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}>🥗</div>
                <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-bounce" style={{animationDuration: '3.2s', animationDelay: '0.8s'}}>🍰</div>
                <div className="absolute top-1/3 right-1/3 text-5xl opacity-10 animate-bounce" style={{animationDuration: '3.8s', animationDelay: '1.2s'}}>🥤</div>
                <div className="absolute bottom-1/4 right-1/4 text-4xl opacity-10 animate-bounce" style={{animationDuration: '3.3s', animationDelay: '0.3s'}}>🍱</div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo/Header Section */}
                <div className="text-center mb-8">
                    <div className="relative inline-block mb-4">
                        {/* Main Logo */}
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl relative">
                            <span className="text-5xl">🍽️</span>
                            {/* Small floating food icons around logo */}
                            <span className="absolute -top-2 -right-2 text-2xl animate-pulse">🍕</span>
                            <span className="absolute -bottom-2 -left-2 text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>🍔</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Smart Canteen</h1>
                    <p className="text-gray-600 flex items-center justify-center gap-2">
                        <span>🌟</span>
                        Welcome back! Please login to continue
                        <span>🌟</span>
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-100 to-transparent rounded-tr-full opacity-50"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                            <span className="text-2xl">🔐</span>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                                <span>⚠️</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleEmailLogin} className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <button
                                    type="button"
                                    className="text-sm text-orange-600 hover:text-orange-700 font-medium transition"
                                >
                                    Forgot Password? 🔑
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? '🔄 Logging in...' : '🚀 Login'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Google Login */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center mt-6 text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-orange-600 hover:text-orange-700 font-semibold transition"
                            >
                                Sign Up ✨
                            </button>
                        </p>

                        {/* Admin Login Link */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigate('/admin-login')}
                                className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center gap-1 mx-auto transition"
                            >
                                <span>👨‍💼</span>
                                Admin Login
                            </button>
                        </div>
                    </div>
                </div>

                {/* Food Icons Row */}
                <div className="flex justify-center items-center gap-4 mt-6 text-3xl">
                    <span className="animate-bounce" style={{animationDuration: '2s'}}>🍕</span>
                    <span className="animate-bounce" style={{animationDuration: '2.2s', animationDelay: '0.2s'}}>🍔</span>
                    <span className="animate-bounce" style={{animationDuration: '2.4s', animationDelay: '0.4s'}}>🍜</span>
                    <span className="animate-bounce" style={{animationDuration: '2.6s', animationDelay: '0.6s'}}>🥗</span>
                    <span className="animate-bounce" style={{animationDuration: '2.8s', animationDelay: '0.8s'}}>🍰</span>
                </div>

                {/* Footer */}
                <p className="text-center mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
                    <span>©</span> 2024 Smart Canteen. All rights reserved.
                    <span>🍽️</span>
                </p>
            </div>
        </div>
    );
};

export default Login;