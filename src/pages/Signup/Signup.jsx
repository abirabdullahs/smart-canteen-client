import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, XCircle, Utensils, Clock, Star, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from './../../config/firebase.config';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Password validation
    const validatePassword = () => {
        const { password, confirmPassword } = formData;

        if (password.length < 6) {
            return 'Password must be at least 6 characters';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return '';
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError('');

        // Validate password
        const passwordError = validatePassword();
        if (passwordError) {
            setError(passwordError);
            return;
        }

        setLoading(true);

        try {
            // Create user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // Update profile with name
            await updateProfile(userCredential.user, {
                displayName: formData.name
            });

            navigate('/');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Email already in use. Please try logging in.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email address.');
            } else {
                setError('Failed to create account. Please try again.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError('');
        setLoading(true);
        const provider = new GoogleAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            navigate('/');
        } catch (err) {
            setError('Google signup failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Password strength indicator
    const getPasswordStrength = () => {
        const password = formData.password;
        if (password.length === 0) return null;
        if (password.length < 6) return { text: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
        if (password.length < 10) return { text: 'Medium', color: 'bg-yellow-500', width: 'w-2/3' };
        return { text: 'Strong', color: 'bg-green-500', width: 'w-full' };
    };

    const passwordStrength = getPasswordStrength();
    const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Branding & Features */}
                    <div className="hidden lg:block bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
                        
                        <div className="relative z-10">
                            {/* Logo Section */}
                            <div className="mb-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6 shadow-lg">
                                    <span className="text-4xl">🍽️</span>
                                </div>
                                <h1 className="text-5xl font-bold text-white mb-4">
                                    Smart Canteen
                                </h1>
                                <p className="text-orange-100 text-lg">
                                    Your favorite meals, just a tap away!
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="space-y-6 mb-12">
                                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Utensils className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Delicious Variety</h3>
                                        <p className="text-orange-100 text-sm">Browse hundreds of meals from breakfast to dinner</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Quick Service</h3>
                                        <p className="text-orange-100 text-sm">Pre-order and skip the queue, save your time!</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Star className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Special Offers</h3>
                                        <p className="text-orange-100 text-sm">Get exclusive deals and discounts daily</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ShoppingBag className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Easy Ordering</h3>
                                        <p className="text-orange-100 text-sm">Simple checkout and multiple payment options</p>
                                    </div>
                                </div>
                            </div>

                            {/* Food Emojis */}
                            <div className="flex justify-center gap-6 text-6xl">
                                <span className="animate-bounce" style={{animationDuration: '2s'}}>🍕</span>
                                <span className="animate-bounce" style={{animationDuration: '2.3s', animationDelay: '0.2s'}}>🍔</span>
                                <span className="animate-bounce" style={{animationDuration: '2.6s', animationDelay: '0.4s'}}>🍜</span>
                                <span className="animate-bounce" style={{animationDuration: '2.9s', animationDelay: '0.6s'}}>🥗</span>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/20">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-1">500+</div>
                                    <div className="text-orange-100 text-sm">Menu Items</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-1">10K+</div>
                                    <div className="text-orange-100 text-sm">Happy Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-1">4.8★</div>
                                    <div className="text-orange-100 text-sm">Avg Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Signup Form */}
                    <div className="w-full max-w-md mx-auto">
                        {/* Mobile Logo */}
                        <div className="text-center mb-8 lg:hidden">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg">
                                <span className="text-4xl">🍽️</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Smart Canteen</h1>
                            <p className="text-gray-600">Create your account to get started</p>
                        </div>

                        {/* Signup Card */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                            {/* Decorative corner elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-100 to-transparent rounded-tr-full opacity-50"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
                                    <span className="text-2xl">✨</span>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
                                        <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleEmailSignup} className="space-y-4">
                                    {/* Name Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>
                                    </div>

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
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
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
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                                placeholder="Create a password"
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

                                        {/* Password Strength Indicator */}
                                        {passwordStrength && (
                                            <div className="mt-2">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs text-gray-600">Password Strength:</span>
                                                    <span className={`text-xs font-medium ${passwordStrength.text === 'Weak' ? 'text-red-600' :
                                                            passwordStrength.text === 'Medium' ? 'text-yellow-600' :
                                                                'text-green-600'
                                                        }`}>
                                                        {passwordStrength.text}
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className={`h-full ${passwordStrength.color} ${passwordStrength.width} transition-all duration-300`}></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                                placeholder="Confirm your password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>

                                        {/* Password Match Indicator */}
                                        {formData.confirmPassword && (
                                            <div className={`mt-2 flex items-center gap-2 text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {passwordsMatch ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Passwords match</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="w-4 h-4" />
                                                        <span>Passwords do not match</span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Sign Up Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {loading ? '🔄 Creating Account...' : '🚀 Sign Up'}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="flex items-center my-5">
                                    <div className="flex-1 border-t border-gray-300"></div>
                                    <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>

                                {/* Google Signup */}
                                <button
                                    onClick={handleGoogleSignup}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Sign Up with Google
                                </button>

                                {/* Login Link */}
                                <p className="text-center mt-5 text-gray-600">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="text-orange-600 hover:text-orange-700 font-semibold transition"
                                    >
                                        Login 🔑
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="text-center mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
                            <span>©</span> 2024 Smart Canteen. All rights reserved.
                            <span>🍽️</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;