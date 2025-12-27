import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, DollarSign, Users, ShoppingBag } from 'lucide-react';
import Swal from 'sweetalert2'

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '', image: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Check admin login status
    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');
        if (!isAdminLoggedIn) {
            navigate('/admin-login');
        }
    }, [navigate]);

    // Fetch products from MongoDB backend
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/foods`);
            setProducts(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.price || !newProduct.category || newProduct.stock === '') {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setError('');
            setSuccess('');

            const productData = {
                name: newProduct.name,
                price: parseFloat(newProduct.price),
                category: newProduct.category,
                stock: parseInt(newProduct.stock),
                image: newProduct.image
            };

            if (editingId) {
                await axios.put(`${import.meta.env.VITE_SERVER}/foods/${editingId}`, productData);
                setSuccess('Product updated successfully!');
            } else {
                await axios.post(`${import.meta.env.VITE_SERVER}/foods`, productData);
                setSuccess('Product added successfully!');
            }

            setNewProduct({ name: '', price: '', category: '', stock: '', image: '' });
            setEditingId(null);
            setShowAddProduct(false);
            fetchProducts();
        } catch (err) {
            console.error('Error saving product:', err);
            setError('Failed to save product: ' + err.message);
        }
    };

    const handleEditProduct = (product) => {
        setEditingId(product._id);
        setNewProduct({
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock,
            image: product.image || ''
        });
        setShowAddProduct(true);
    };

    const handleDeleteProduct = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (!result.isConfirmed) return;

        try {
            setError('');
            await axios.delete(`${import.meta.env.VITE_SERVER}/foods/${id}`);
            setSuccess('Product deleted successfully!');
            fetchProducts();

            Swal.fire({
                title: "Deleted!",
                text: "Product has been deleted.",
                icon: "success"
            });

        } catch (err) {
            console.error('Error deleting product:', err);
            setError('Failed to delete product: ' + err.message);
        }
    };


    const handleCancel = () => {
        setShowAddProduct(false);
        setEditingId(null);
        setNewProduct({ name: '', price: '', category: '', stock: '', image: '' });
    };

    // Calculate total revenue
    const totalRevenue = products.reduce((sum, product) => {
        return sum + (product.price * product.stock);
    }, 0);

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminEmail');
        navigate('/admin-login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Loading State */}
            {loading && (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4 animate-pulse">
                            <span className="text-2xl">⏳</span>
                        </div>
                        <p className="text-gray-600 font-medium">Loading products...</p>
                    </div>
                </div>
            )}

            {!loading && (
                <>
                    {/* Navbar */}
                    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-20">
                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-500 p-2 rounded-lg">
                                        <span className="text-2xl">👨‍💼</span>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Total Revenue */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Total Inventory Value</p>
                                        <p className="text-3xl font-bold text-gray-800 mt-2">$ 50000+</p>
                                    </div>
                                    <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
                                </div>
                            </div>

                            {/* Total Products Quantity */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Total Stock Units</p>
                                        <p className="text-3xl font-bold text-gray-800 mt-2">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
                                    </div>
                                    <Users className="w-12 h-12 text-blue-500 opacity-20" />
                                </div>
                            </div>

                            {/* Total Product Types */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Total Product Types</p>
                                        <p className="text-3xl font-bold text-gray-800 mt-2">{products.length}</p>
                                    </div>
                                    <ShoppingBag className="w-12 h-12 text-orange-500 opacity-20" />
                                </div>
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Products Management</h2>
                                <button
                                    onClick={() => setShowAddProduct(!showAddProduct)}
                                    className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Product
                                </button>
                            </div>

                            {/* Add Product Form */}
                            {showAddProduct && (
                                <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Product Name"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Category"
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Stock"
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            value={newProduct.image}
                                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={handleAddProduct}
                                            className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                                        >
                                            {editingId ? 'Update Product' : 'Save Product'}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                    {success}
                                </div>
                            )}

                            {/* Products Table */}
                            {products.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Product</th>
                                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Category</th>
                                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Price</th>
                                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Stock</th>
                                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <React.Fragment key={product._id}>
                                                    {/* Desktop Table Row - Hidden on mobile */}
                                                    <tr className="hidden md:table-row border-b border-gray-200 hover:bg-gray-50">
                                                        <td className="px-6 py-4 text-gray-800 font-medium">{product.name}</td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                                {product.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-800 font-semibold">৳ {product.price}</td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            <span className={`px-3 py-1 rounded-full text-sm ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                {product.stock} pcs
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleEditProduct(product)}
                                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                                >
                                                                    <Edit2 className="w-5 h-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteProduct(product._id)}
                                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    {/* Mobile Card View - Visible only on mobile */}
                                                    <tr className="md:hidden">
                                                        <td colSpan="5" className="p-0">
                                                            <div className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition">
                                                                {/* Product Name & Category */}
                                                                <div className="mb-3">
                                                                    <h3 className="text-gray-800 font-semibold text-lg mb-2">{product.name}</h3>
                                                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs inline-block">
                                                                        {product.category}
                                                                    </span>
                                                                </div>

                                                                {/* Price & Stock */}
                                                                <div className="flex items-center justify-between mb-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-gray-500 text-sm">Price:</span>
                                                                        <span className="text-gray-800 font-bold text-lg">৳ {product.price}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-gray-500 text-sm">Stock:</span>
                                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                            {product.stock} pcs
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Action Buttons */}
                                                                <div className="flex gap-3">
                                                                    <button
                                                                        onClick={() => handleEditProduct(product)}
                                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                                                                    >
                                                                        <Edit2 className="w-4 h-4" />
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteProduct(product._id)}
                                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 font-medium">No products found. Add your first product!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;