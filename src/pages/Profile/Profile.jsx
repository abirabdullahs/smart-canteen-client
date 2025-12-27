import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase.config';
import { signOut, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { Mail, Phone, MapPin, Wallet, LogOut, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({
        displayName: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const data = {
                    displayName: user.displayName || 'User',
                    email: user.email,
                    phone: user.phoneNumber || '',
                    address: '',
                    balance: 500
                };

                setUserData(data);
                setEditData({
                    displayName: data.displayName,
                    phone: data.phone,
                    address: data.address
                });
                setLoading(false);
            } else {
                toast.error('Please login first');
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSaveProfile = async () => {
        try {
            // Update display name in auth (persisted in Firebase Auth)
            if (auth.currentUser && editData.displayName !== auth.currentUser.displayName) {
                await updateProfile(auth.currentUser, {
                    displayName: editData.displayName
                });
            }

            // Since Firestore is not used in this project, only update local state
            setUserData({
                ...userData,
                displayName: editData.displayName,
                phone: editData.phone,
                address: editData.address
            });

            setEditing(false);
            toast.success('Profile updated');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Failed to logout');
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4 animate-pulse">
                        <span className="text-2xl">🍽️</span>
                    </div>
                    <p className="text-gray-600 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 font-medium">Profile not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-5xl shadow-lg">
                                {userData.displayName?.charAt(0) || '👤'}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{userData.displayName}</h1>
                                <p className="text-gray-500">{userData.email || auth.currentUser?.email}</p>
                                <p className="text-sm text-gray-400 mt-2">Smart Canteen Member</p>
                            </div>
                        </div>
                    </div>

                    {/* Balance Card */}
                    <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
                        <p className="text-sm font-semibold uppercase tracking-wider opacity-90">Current Balance</p>
                        <div className="flex items-end gap-3 mt-2">
                            <span className="text-5xl font-bold">৳ 500</span>
                            <Wallet className="w-8 h-8 opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-semibold"
                            >
                                <Edit2 size={18} />
                                Edit
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={editData.displayName}
                                    onChange={(e) => setEditData({ ...editData, displayName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                                    placeholder="Enter your name"
                                />
                            ) : (
                                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                    <Edit2 className="w-5 h-5 text-gray-400" />
                                    {userData.displayName}
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                <Mail className="w-5 h-5 text-gray-400" />
                                {userData.email || auth.currentUser?.email}
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            {editing ? (
                                <input
                                    type="tel"
                                    value={editData.phone}
                                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                                    placeholder="Enter your phone number"
                                />
                            ) : (
                                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    {userData.phone || 'Not provided'}
                                </div>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            {editing ? (
                                <textarea
                                    value={editData.address}
                                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                                    placeholder="Enter your address"
                                    rows="3"
                                />
                            ) : (
                                <div className="flex gap-3 px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                                    <span>{userData.address || 'Not provided'}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                        {editing ? (
                            <>
                                <button
                                    onClick={handleSaveProfile}
                                    className="flex items-center justify-center gap-2 flex-1 bg-linear-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditing(false)}
                                    className="flex items-center justify-center gap-2 flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                    Cancel
                                </button>
                            </>
                        ) : null}
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full mt-8 flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
