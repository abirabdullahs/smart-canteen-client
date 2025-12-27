import React, { useState, useEffect } from 'react';
import { ChefHat, Clock, Sparkles, TrendingUp, Award, Users, Zap, Heart, ArrowRight, Star, Utensils, ShoppingCart, DollarSign, Leaf, Calendar } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
    const [scrollY, setScrollY] = useState(0);
    const [featuredDishes, setFeaturedDishes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);




    useEffect(() => {
        async function loadData() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER}/foods`);
                setFeaturedDishes(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        loadData();
    }, []);

    // const filteredDishes = activeTab === 'all'
    //     ? featuredDishes
    //     : featuredDishes.filter(dish => dish.category === activeTab);

    const testimonials = [
        { name: 'Raihan Ahmed', role: 'Student', text: 'Best canteen experience ever! Quick service and amazing taste.', rating: 5 },
        { name: 'Nusrat Jahan', role: 'Faculty', text: 'Healthy options and great variety. Love the digital ordering system.', rating: 5 },
        { name: 'Fahim Islam', role: 'Staff', text: 'Fresh ingredients and reasonable prices. Highly recommended!', rating: 4 },
    ];

    const stats = [
        { icon: Users, value: '5000+', label: 'Happy Customers' },
        { icon: Utensils, value: '200+', label: 'Menu Items' },
        { icon: Award, value: '50+', label: 'Awards Won' },
        { icon: Clock, value: '15 min', label: 'Avg. Wait Time' },
    ];

    const features = [
        { icon: Zap, title: 'Lightning Fast', desc: 'Order in seconds, eat in minutes', color: 'from-yellow-400 to-orange-500' },
        { icon: Leaf, title: 'Fresh Daily', desc: 'Farm-to-table ingredients', color: 'from-green-400 to-emerald-500' },
        { icon: DollarSign, title: 'Budget Friendly', desc: 'Quality meals, fair prices', color: 'from-blue-400 to-cyan-500' },
        { icon: Heart, title: 'Made with Love', desc: 'Every dish tells a story', color: 'from-pink-400 to-rose-500' },
    ];

    const weeklySpecials = [
        { day: 'Monday', dish: 'Butter Chicken Combo', discount: '20%' },
        { day: 'Wednesday', dish: 'Seafood Platter', discount: '15%' },
        { day: 'Friday', dish: 'BBQ Night Special', discount: '25%' },
    ];

    return (
        <div className="bg-[#0f0f0f] text-white overflow-hidden">
            {/* Hero Section - Diagonal Split Design */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-yellow-600/20"></div>
                <div
                    className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=1200&fit=crop')`,
                        clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
                        transform: `translateX(${scrollY * 0.1}px)`
                    }}
                ></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6 animate-fade-in">
                            <ChefHat className="w-12 h-12 text-orange-500" />
                            <span className="text-orange-500 font-bold text-xl tracking-wider">SMART CANTEEN</span>
                        </div>

                        <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none animate-slide-up" style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            textShadow: '4px 4px 0px rgba(251, 146, 60, 0.3)'
                        }}>
                            EAT
                            <span className="block text-orange-500">SMART</span>
                            <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-600">
                                LIVE BETTER
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl animate-fade-in-delay leading-relaxed" style={{
                            fontFamily: '"Outfit", sans-serif',
                            animationDelay: '0.2s'
                        }}>
                            Experience the future of campus dining. Order ahead, skip the line, and enjoy freshly prepared meals made just for you.
                        </p>

                        <div className="flex flex-wrap gap-4 animate-fade-in-delay" style={{ animationDelay: '0.4s' }}>
                            <button
                                onClick={() => navigate('/allfoods')}
                                className="group relative px-8 py-4 bg-orange-600 font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    ORDER NOW
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            </button>

                            <button
                                onClick={() => navigate('/allfoods')}
                                className="px-8 py-4 border-2 border-white font-bold text-lg hover:bg-white hover:text-black transition-all"
                            >
                                VIEW MENU
                            </button>
                        </div>

                        {/* Floating Stats */}
                        <div className="mt-12 flex flex-wrap gap-6 animate-fade-in-delay" style={{ animationDelay: '0.6s' }}>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="font-bold">4.8 Rating</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Users className="w-5 h-5 text-orange-400" />
                                <span className="font-bold">5000+ Students</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Zap className="w-5 h-5 text-blue-400" />
                                <span className="font-bold">15 Min Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-10 left-10 w-32 h-32 border-4 border-orange-500 rounded-full animate-pulse-slow"></div>
                <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-yellow-500/20 rounded-lg rotate-45 animate-float"></div>
            </section>

            {/* Features Grid Section */}
            <section className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent"></div>

                <div className="container mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                            Why Choose <span className="text-orange-500">Us?</span>
                        </h2>
                        <p className="text-xl text-gray-400">Four pillars of excellence</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-105"
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>

                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu Preview Section with Tabs */}
            <section className="py-24 px-6 bg-gradient-to-b from-transparent to-orange-950/20">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                            Today's <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-500">Specials</span>
                        </h2>
                        <p className="text-xl text-gray-400">Handpicked dishes crafted by our chefs</p>
                    </div>


                    {/* Dishes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredDishes.slice(0, 6).map((dish, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/food/${dish._id}`)}
                                className="group relative bg-white/5 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer"
                                style={{
                                    animation: 'fadeInUp 0.6s ease-out forwards',
                                    animationDelay: `${index * 0.1}s`,
                                    opacity: 0
                                }}
                            >
                                {/* Dish Image */}
                                <div className="relative h-64 overflow-hidden cursor-pointer">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                                        onClick={() => navigate(`/food/${dish._id}`)}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                    {/* Tag Badge */}
                                    <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 text-sm font-bold">
                                        {dish.tag}
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="font-bold text-sm">{dish.rating}</span>
                                    </div>
                                </div>

                                {/* Dish Info */}
                                <div className="p-6 cursor-pointer" onClick={() => navigate(`/food/${dish._id}`)}>
                                    <h3 className="text-2xl font-bold mb-2">{dish.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-black text-orange-500">{dish.price}</span>
                                        
                                    </div>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/allfoods">
                            <button className="px-10 py-4 bg-linear-to-r from-orange-600 to-yellow-600 font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105">
                                EXPLORE FULL MENU
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Counter Section */}
            <section className="py-24 px-6 bg-linear-to-r from-orange-600 to-yellow-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4">
                                    <stat.icon className="w-16 h-16 text-white" />
                                </div>
                                <div className="text-5xl md:text-6xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-xl text-white/90 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Weekly Specials Section */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                            Weekly <span className="text-orange-500">Specials</span>
                        </h2>
                        <p className="text-xl text-gray-400">Don't miss out on amazing deals</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {weeklySpecials.map((special, index) => (
                            <div
                                key={index}
                                className="relative p-8 bg-gradient-to-br from-orange-600/20 to-yellow-600/20 border-2 border-orange-500/30 hover:border-orange-500 transition-all group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Calendar className="w-8 h-8 text-orange-500" />
                                        <span className="text-2xl font-bold text-orange-500">{special.day}</span>
                                    </div>

                                    <h3 className="text-3xl font-black mb-4">{special.dish}</h3>

                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-orange-500">{special.discount}</span>
                                        <span className="text-2xl text-gray-400">OFF</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-orange-950/20 to-transparent">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                            How It <span className="text-orange-500">Works</span>
                        </h2>
                        <p className="text-xl text-gray-400">Simple steps to deliciousness</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Browse Menu', desc: 'Explore our diverse collection of delicious meals', icon: Utensils },
                            { step: '02', title: 'Place Order', desc: 'Select your favorites and customize as you like', icon: ShoppingCart },
                            { step: '03', title: 'Quick Prep', desc: 'Our chefs prepare your meal fresh and fast', icon: ChefHat },
                            { step: '04', title: 'Enjoy Food', desc: 'Pick up or get it delivered to your table', icon: Heart },
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                {/* Connecting Line */}
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-linear-to-r from-orange-500 to-transparent"></div>
                                )}

                                <div className="relative bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-orange-500/50 transition-all group">
                                    <div className="text-6xl font-black text-orange-500/20 mb-4">{item.step}</div>

                                    <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                            What People <span className="text-orange-500">Say</span>
                        </h2>
                        <p className="text-xl text-gray-400">Real reviews from real customers</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/50 transition-all group"
                            >
                                {/* Quote Mark */}
                                <div className="text-8xl font-bold text-orange-500/20 leading-none mb-4">"</div>

                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-lg text-gray-300 mb-6">{testimonial.text}</p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center font-bold text-xl">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-yellow-500/5 transition-all pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* App Download Section */}
            <section className="py-24 px-6 bg-linear-to-r from-orange-600 to-yellow-600">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1">
                            <h2 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                                Download Our App
                            </h2>
                            <p className="text-2xl text-white/90 mb-8">
                                Get exclusive deals and order even faster with our mobile app
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-black text-white font-bold flex items-center gap-3 hover:bg-gray-900 transition-all hover:scale-105">
                                    <div className="text-3xl">📱</div>
                                    <div className="text-left">
                                        <div className="text-xs">Download on the</div>
                                        <div className="text-lg">App Store</div>
                                    </div>
                                </button>

                                <button className="px-8 py-4 bg-black text-white font-bold flex items-center gap-3 hover:bg-gray-900 transition-all hover:scale-105">
                                    <div className="text-3xl">🤖</div>
                                    <div className="text-left">
                                        <div className="text-xs">Get it on</div>
                                        <div className="text-lg">Google Play</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center">
                            <div className="relative">
                                <div className="w-64 h-64 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-0 transition-transform">
                                    <span className="text-6xl">📱</span>
                                </div>
                                <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-400 rounded-full blur-3xl animate-pulse-slow"></div>
                                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse-slow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter/CTA Section */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="relative p-12 md:p-20 bg-gradient-to-br from-orange-600/30 to-yellow-600/30 border-2 border-orange-500/30 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                        <div className="relative z-10 max-w-3xl mx-auto text-center">
                            <Sparkles className="w-16 h-16 text-orange-500 mx-auto mb-6" />

                            <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                                Stay Updated with <span className="text-orange-500">Latest Offers</span>
                            </h2>

                            <p className="text-xl text-gray-300 mb-8">
                                Subscribe to our newsletter and never miss out on exclusive deals and new menu items
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                                <input
                                    type="email"
                                    id="newsletter-email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                                />
                                <button
                                    className="px-8 py-4 bg-orange-600 font-bold hover:bg-orange-500 transition-all hover:scale-105 whitespace-nowrap"
                                    onClick={() => {
                                        const emailInput = document.getElementById('newsletter-email');
                                        const email = emailInput.value.trim();

                                        if (!email) {
                                            Swal.fire({
                                                title: "Email Required",
                                                text: "Please enter your email address",
                                                icon: "warning",
                                                draggable: true
                                            });
                                            return;
                                        }

                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        if (!emailRegex.test(email)) {
                                            Swal.fire({
                                                title: "Invalid Email",
                                                text: "Please enter a valid email address",
                                                icon: "error",
                                                draggable: true
                                            });
                                            return;
                                        }

                                        Swal.fire({
                                            title: "Subscribed",
                                            icon: "success",
                                            draggable: true
                                        });

                                        emailInput.value = '';
                                    }}
                                >
                                    SUBSCRIBE NOW
                                </button>
                            </div>

                            <p className="text-sm text-gray-400 mt-4">
                                Join 5000+ food lovers already subscribed
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS for Animations */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&family=Outfit:wght@400;500;600;700&display=swap');
        
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        * {
          font-family: 'Outfit', sans-serif;
        }
      `}</style>
        </div>
    );
};

export default Home;