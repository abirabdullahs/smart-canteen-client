import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChefHat, Clock, Sparkles, TrendingUp, Award, Users, Zap, Heart, ArrowRight, Star, Utensils, ShoppingCart, DollarSign, Leaf, Calendar, Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase.config';
import useCartStore from '../../store/cartStore';
import toast from 'react-hot-toast';

const AllFood = () => {
    const [featuredDishes, setFeaturedDishes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    
    const navigate = useNavigate();
    const { addToCart } = useCartStore();

    const categories = [
        { id: 'all', name: 'All Items', icon: Utensils },
        { id: 'breakfast', name: 'Breakfast', icon: Clock },
        { id: 'lunch', name: 'Lunch', icon: ChefHat },
        { id: 'snacks', name: 'Snacks', icon: Sparkles },
        { id: 'drinks', name: 'Drinks', icon: Users }
    ];

    const sortOptions = [
        { id: 'popular', name: 'Most Popular', icon: TrendingUp },
        { id: 'rating', name: 'Highest Rated', icon: Star },
        { id: 'price-low', name: 'Price: Low to High', icon: DollarSign },
        { id: 'price-high', name: 'Price: High to Low', icon: Award }
    ];

    const priceRanges = [
        { id: 'all', name: 'All Prices', min: 0, max: Infinity },
        { id: 'budget', name: 'Budget (৳0-50)', min: 0, max: 50 },
        { id: 'medium', name: 'Medium (৳51-150)', min: 51, max: 150 },
        { id: 'premium', name: 'Premium (৳151+)', min: 151, max: Infinity }
    ];

    useEffect(() => {
        async function loadData() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER}/foods`);
                setFeaturedDishes(res.data);
                setFilteredDishes(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        loadData();
    }, []);

    // Filter and sort logic
    useEffect(() => {
        let result = [...featuredDishes];

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(dish => dish.category === selectedCategory);
        }

        // Search filter
        if (searchQuery) {
            result = result.filter(dish =>
                dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dish.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Price range filter
        const selectedRange = priceRanges.find(range => range.id === priceRange);
        if (selectedRange) {
            result = result.filter(dish => {
                const priceValue = typeof dish.price === 'string' 
                    ? parseInt(dish.price.replace(/[^\d]/g, '')) 
                    : parseInt(dish.price);
                return priceValue >= selectedRange.min && priceValue <= selectedRange.max;
            });
        }

        // Sorting
        switch (sortBy) {
            case 'popular':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'price-low':
                result.sort((a, b) => {
                    const priceA = parseInt(a.price.replace('৳', ''));
                    const priceB = parseInt(b.price.replace('৳', ''));
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                result.sort((a, b) => {
                    const priceA = parseInt(a.price.replace('৳', ''));
                    const priceB = parseInt(b.price.replace('৳', ''));
                    return priceB - priceA;
                });
                break;
            default:
                break;
        }

        setFilteredDishes(result);
    }, [selectedCategory, sortBy, searchQuery, priceRange, featuredDishes]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="text-center mb-8">
                    <div className="inline-block animate-bounce mb-4">
                        <ChefHat className="w-16 h-16 text-orange-500 mx-auto" />
                    </div>
                    <h1 className="text-6xl font-black mb-4 bg-linear-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
                        Explore Our Delicious Dishes
                    </h1>
                    <p className="text-xl text-gray-300">
                        Discover authentic Bangladeshi flavors crafted with love
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                                    selectedCategory === category.id
                                        ? 'bg-linear-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/50'
                                        : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {category.name}
                            </button>
                        );
                    })}
                </div>

                {/* Sort and Filter Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 cursor-pointer"
                        >
                            {sortOptions.map(option => (
                                <option key={option.id} value={option.id} className="bg-slate-800">
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold">Price Range:</span>
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 cursor-pointer"
                        >
                            {priceRanges.map(range => (
                                <option key={range.id} value={range.id} className="bg-slate-800">
                                    {range.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="text-sm text-gray-300">
                        Showing <span className="text-orange-500 font-bold">{filteredDishes.length}</span> items
                    </div>
                </div>
            </div>

            {/* Dishes Grid */}
            <div className="max-w-7xl mx-auto">
                {filteredDishes.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-block p-8 bg-white/5 backdrop-blur-sm rounded-full mb-4">
                            <Search className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-300 mb-2">No dishes found</h3>
                        <p className="text-gray-400">Try adjusting your filters or search query</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDishes.map((dish, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/food/${dish._id}`)}
                                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl overflow-hidden hover:from-white/15 hover:to-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 border border-white/10 cursor-pointer"
                                style={{
                                    animation: 'fadeInUp 0.6s ease-out forwards',
                                    animationDelay: `${index * 0.05}s`,
                                    opacity: 0
                                }}
                            >
                                {/* Dish Image */}
                                <div className="relative h-64 overflow-hidden cursor-pointer">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                                    {/* Tag Badge */}
                                    <div className="absolute top-4 right-4 bg-linear-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                                        {dish.tag}
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/70 backdrop-blur-md px-3 py-2 rounded-full border border-yellow-400/30">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="font-bold text-sm text-yellow-400">{dish.rating}</span>
                                    </div>

                                    {/* Stock Badge */}
                                    <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/30">
                                        {dish.stock} left
                                    </div>
                                </div>

                                {/* Dish Info */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                                        {dish.name}
                                    </h3>
                                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                                        {dish.description}
                                    </p>

                                    {/* Category Badge */}
                                    <div className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-purple-500/30">
                                        <Leaf className="w-3 h-3" />
                                        {dish.category}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-gray-400 mb-1">Price</div>
                                            <span className="text-3xl font-black bg-linear-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                                                {dish.price}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!auth.currentUser) {
                                                    toast.error('Please login to add items to cart');
                                                    navigate('/login');
                                                    return;
                                                }
                                                addToCart(dish);
                                                toast.success(`${dish.name} added to cart!`);
                                            }}
                                            className="relative bg-linear-to-r from-orange-500 to-red-500 p-4 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all group-hover:scale-110 transform shadow-lg hover:shadow-orange-500/50 group">
                                            <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-slate-900">
                                                +
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl"></div>
                                
                                {/* Shine Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:animate-shine"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes shine {
                    from {
                        transform: translateX(-100%) skewX(-12deg);
                    }
                    to {
                        transform: translateX(200%) skewX(-12deg);
                    }
                }

                .animate-shine {
                    animation: shine 0.8s;
                }
            `}</style>
        </div>
    );
};

export default AllFood;