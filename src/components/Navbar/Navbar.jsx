import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../config/firebase.config';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

const Navbar = ({ isLoggedIn, isAdmin, cartCount, balance, canteenOpen, user }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully!');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout');
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md transition-all duration-300 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="bg-orange-500 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-linear-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                            BUET Eats
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-700 hover:text-orange-500'}`}>Home</Link>
                        <Link to="/allfoods" className={`font-medium transition-colors ${isActive('/allfoods') ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-700 hover:text-orange-500'}`}>Menu</Link>
                        {isLoggedIn && (
                            <Link to="/orders" className={`font-medium transition-colors relative ${isActive('/orders') ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-700 hover:text-orange-500'}`}>
                                My Orders
                                <span className="absolute -top-1 -right-4 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                            </Link>
                        )}
                        {isAdmin && (
                            <Link to="/admin-dashboard" className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${isActive('/admin-dashboard') ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                Canteen Panel
                            </Link>
                        )}
                    </div>

                    {/* Smart Features & Auth */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Live Status */}
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full border border-gray-200">
                            <span className={`h-2 w-2 rounded-full ${canteenOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                {canteenOpen ? 'Open' : 'Closed'}
                            </span>
                        </div>

                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                {/* Balance Badge */}
                                <div className="text-right">
                                    <p className="text-[10px] uppercase text-gray-500 font-bold leading-none">Balance</p>
                                    <p className="text-sm font-bold text-gray-800">৳ {balance}</p>
                                </div>

                                {/* Cart */}
                                <Link to="/cart" className="relative p-2 text-gray-600 hover:bg-orange-50 rounded-full transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    {cartCount > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                {/* Profile */}
                                <Link to="/profile" className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-white font-bold">
                                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || '👤'}
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-600 hover:shadow-lg hover:shadow-red-200 transition-all"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 transition-all">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <div className={`h-2 w-2 rounded-full ${canteenOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 animate-fade-in-down">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        <Link to="/" className={`block text-lg font-semibold ${isActive('/') ? 'text-orange-600 border-l-4 border-orange-600 pl-2' : 'text-gray-800'}`}>Home</Link>
                        <Link to="/allfoods" className={`block text-lg font-semibold ${isActive('/allfoods') ? 'text-orange-600 border-l-4 border-orange-600 pl-2' : 'text-gray-800'}`}>Menu</Link>
                        {isLoggedIn && (
                            <>
                                <Link to="/orders" className={`block text-lg font-semibold ${isActive('/orders') ? 'text-orange-600 border-l-4 border-orange-600 pl-2' : 'text-gray-800'}`}>My Orders</Link>
                                <Link to="/cart" className={`block text-lg font-semibold ${isActive('/cart') ? 'text-orange-600 border-l-4 border-orange-600 pl-2' : 'text-gray-800'}`}>Cart</Link>
                            </>
                        )}
                        <div className="pt-4 border-t border-gray-100">
                            {isLoggedIn ? (
                                <>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-500">Wallet Balance</span>
                                        <span className="font-bold text-orange-600 text-xl">৳ {balance}</span>
                                    </div>
                                    <Link to="/profile" className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold block text-center hover:bg-orange-600 transition-all mb-3">
                                        👤 View Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all"
                                    >
                                        🚪 Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold block text-center hover:bg-orange-600 transition-all">
                                    🔐 Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;