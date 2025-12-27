import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from './../../config/firebase.config';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
            setEmail('');
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setError('No account found with this email address.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email address. Please check and try again.');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many attempts. Please try again later.');
            } else {
                setError('Failed to send reset email. Please try again.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Food Icons - Floating Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce" style={{animationDuration: '3s'}}>🔑</div>
                <div className="absolute top-32 right-20 text-5xl opacity-10 animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}>🍔</div>
                <div className="absolute bottom-20 left-16 text-6xl opacity-10 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1s'}}>📧</div>
                <div className="absolute bottom-32 right-24 text-5xl opacity-10 animate-bounce" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}>🍕</div>
                <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-bounce" style={{animationDuration: '3.2s', animationDelay: '0.8s'}}>🔐</div>
                <div className="absolute top-1/3 right-1/3 text-5xl opacity-10 animate-bounce" style={{animationDuration: '3.8s', animationDelay: '1.2s'}}>🍜</div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Login</span>
                </button>

                {/* Logo/Header Section */}
                <div className="text-center mb-8">
                    <div className="relative inline-block mb-4">
                        {/* Main Logo */}
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl relative">
                            <span className="text-5xl">🔑</span>
                            {/* Small floating icons around logo */}
                            <span className="absolute -top-2 -right-2 text-2xl animate-pulse">📧</span>
                            <span className="absolute -bottom-2 -left-2 text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>🔐</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
                    <p className="text-gray-600 max-w-sm mx-auto">
                        Don't worry! Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* Reset Password Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-100 to-transparent rounded-tr-full opacity-50"></div>
                    
                    <div className="relative z-10">
                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-4 rounded-lg mb-6 flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold mb-1">Reset Email Sent! 📬</p>
                                    <p className="text-sm">Check your inbox for the password reset link. Don't forget to check your spam folder!</p>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-4 rounded-lg mb-6 flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold mb-1">Oops! Something went wrong</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        )}

                        {!success ? (
                            <>
                                <div className="flex items-center gap-2 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                                    <span className="text-2xl">🔐</span>
                                </div>

                                <form onSubmit={handleResetPassword} className="space-y-6">
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
                                                placeholder="Enter your email address"
                                                required
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">
                                            💡 Enter the email you used to create your account
                                        </p>
                                    </div>

                                    {/* Send Reset Link Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {loading ? '📤 Sending Reset Link...' : '📧 Send Reset Link'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Check Your Email!</h3>
                                <p className="text-gray-600 mb-6">
                                    We've sent a password reset link to your email. Click the link to create a new password.
                                </p>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    🔙 Back to Login
                                </button>
                            </div>
                        )}

                        {/* Divider */}
                        {!success && (
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>
                        )}

                        {/* Additional Actions */}
                        {!success && (
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-300 hover:border-gray-400 transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    🔐 Try Logging In
                                </button>
                                
                                <p className="text-center text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="text-orange-600 hover:text-orange-700 font-semibold transition"
                                    >
                                        Sign Up ✨
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <span>💡</span>
                        Need Help?
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Check your spam or junk folder</li>
                        <li>• Make sure you entered the correct email</li>
                        <li>• The reset link expires after 1 hour</li>
                        <li>• Contact support if you still need help</li>
                    </ul>
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

export default ForgotPassword;