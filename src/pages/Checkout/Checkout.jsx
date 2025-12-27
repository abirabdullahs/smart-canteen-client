import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase.config';
import useCartStore from '../../store/cartStore';
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cart, getTotal, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: ''
    });

    // Helper function to convert price to number
    const getPriceValue = (price) => {
        if (typeof price === 'number') return price;
        if (typeof price === 'string') {
            return parseInt(price.replace(/[^\d]/g, '')) || 0;
        }
        return 0;
    };

    useEffect(() => {
        if (auth.currentUser) {
            setFormData(prev => ({
                ...prev,
                fullName: auth.currentUser.displayName || '',
                email: auth.currentUser.email || ''
            }));
        } else {
            toast.error('Please login first');
            navigate('/login');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error('Payment system not loaded');
            return;
        }

        if (cart.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        if (!auth.currentUser) {
            toast.error('Please login to complete payment');
            navigate('/login');
            return;
        }

        // Validate form
        if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() ||
            !formData.address.trim() || !formData.city.trim() || !formData.zipCode.trim()) {
            toast.error('Please fill all fields completely');
            return;
        }

        setLoading(true);

        try {
            // Create payment intent
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/create-payment-intent`, {
                amount: Math.round((parseFloat(getTotal()) + 50) * 100), // Convert to cents
                userId: auth.currentUser.uid,
                items: cart,
                shippingAddress: formData
            });

            const { clientSecret } = response.data;

            // Confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        address: {
                            line1: formData.address,
                            city: formData.city,
                            postal_code: formData.zipCode
                        }
                    }
                }
            });

            if (result.error) {
                toast.error(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                // Save order to database
                await axios.post(`${import.meta.env.VITE_SERVER}/api/orders`, {
                    userId: auth.currentUser.uid,
                    items: cart,
                    totalAmount: parseFloat(getTotal()) + 50,
                    shippingAddress: formData,
                    paymentId: result.paymentIntent.id,
                    paymentStatus: 'completed',
                    orderStatus: 'pending',
                    createdAt: new Date()
                });

                clearCart();
                toast.success('Payment successful! Order placed.');
                navigate('/orders');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error.response?.data?.message || 'Payment failed');
        } finally {
            setLoading(false);
        }
    };

    const total = (parseFloat(getTotal()) + 50).toFixed(2);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Shipping Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">ZIP Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                                        />
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="mt-8 pt-8 border-t">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mb-4">
                                        <CardElement
                                            options={{
                                                hidePostalCode: false,
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#32325d',
                                                    },
                                                    invalid: {
                                                        color: '#9e2146',
                                                    },
                                                },
                                            }}
                                        />

                                    </div>

                                    <p className="text-sm text-gray-600 mb-4">
                                        💳 <strong>Test Card Numbers (Sandbox):</strong><br />
                                        Visa: 4242 4242 4242 4242<br />
                                        Mastercard: 5555 5555 5555 4444<br />
                                        Expiry: Any future date (MM/YY)<br />
                                        CVC: Any 3 digits
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={!stripe || loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition"
                                    >
                                        {loading ? 'Processing...' : 'Complete Purchase'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex justify-between text-sm">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-gray-600">x {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-gray-900">
                                            Tk {(getPriceValue(item.price) * (item.quantity || 1)).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium text-gray-900">Tk {getTotal()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery</span>
                                    <span className="font-medium text-gray-900">Tk 50.00</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="font-bold text-lg text-blue-600">Tk {total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
