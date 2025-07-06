import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import API_URL from '../utils/api';
import { getImageUrl } from '../utils/getImageUrl';

function AdminDashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    featured: false,
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
      setError('');
    },
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    axios.get(`${API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));

    axios.get(`${API_URL}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, [user, token, navigate]);

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({ ...newProduct, [name]: type === 'checkbox' ? checked : value });
    setError('');
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please upload an image');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('description', newProduct.description);
      formData.append('category', newProduct.category);
      formData.append('featured', newProduct.featured);
      formData.append('image', image);

      const res = await axios.post(`${API_URL}/api/admin/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProducts([...products, res.data]);
      setNewProduct({ name: '', price: '', description: '', category: '', featured: false });
      setImage(null);
      setError('');
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.response?.data?.details || 'Failed to add product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.response?.data?.details || 'Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      const res = await axios.put(`${API_URL}/api/admin/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.map((o) => (o._id === id ? res.data : o)));
    } catch (err) {
      console.error('Error updating order status:', err);
      setError(err.response?.data?.details || 'Failed to update order');
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        
        {/* Add Product Form */}
        <div className="max-w-lg mx-auto mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-green-100 dark:border-gray-800">
          <h3 className="text-2xl font-semibold mb-6 text-green-800 dark:text-green-200 text-center">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleProductChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Product name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleProductChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Price"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleProductChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Product description"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
              <div {...getRootProps()} className="border-2 border-dashed border-green-300 dark:border-green-700 p-4 text-center cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-green-50 dark:hover:bg-green-900 transition">
                <input {...getInputProps()} />
                <p className="text-gray-500 dark:text-gray-400">{image ? image.name : 'Drag & drop or click to upload image'}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleProductChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              >
                <option value="">Select Category</option>
                <option value="Eco">Eco</option>
                <option value="Canvas">Canvas</option>
                <option value="Leather">Leather</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={newProduct.featured}
                onChange={handleProductChange}
                className="accent-green-600 w-5 h-5 rounded focus:ring-green-400"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Product</label>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:from-green-600 hover:to-green-800 transition-all text-lg tracking-wide mt-2"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Manage Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="border rounded-2xl p-4 shadow-xl hover:shadow-2xl transition transform hover:scale-105 bg-white dark:bg-gray-800 flex flex-col h-full animate-fade-in border-green-100 dark:border-gray-800">
                <img src={getImageUrl(product.image)} alt={product.name} className="w-full aspect-square object-contain rounded-xl mb-2 transition-all duration-300 border-2 border-green-100 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 h-48" />
                <h4 className="text-xl font-bold mt-2 text-green-900 dark:text-green-100 line-clamp-1">{product.name}</h4>
                <p className="text-green-700 dark:text-green-300 text-lg font-semibold mb-2">PKR {product.price}</p>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="mt-auto bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order List */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Manage Orders</h3>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800 animate-fade-in border-green-100 dark:border-gray-800">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <span className="font-semibold text-green-800 dark:text-green-200">Order #{order._id.slice(-6)}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{order.userId.name} ({order.userId.email})</span>
                  </div>
                  <div className="mb-2 text-green-700 dark:text-green-300 font-medium">Total: PKR {order.total.toFixed(2)}</div>
                  {order.receipt && (
                    <div className="mb-2">
                      <span className="font-semibold">Receipt:</span>{' '}
                      <a
                        href={`/api/images/${typeof order.receipt === 'object' && order.receipt !== null ? order.receipt._id || order.receipt.id : order.receipt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline"
                      >
                        View Receipt
                      </a>
                    </div>
                  )}
                  <div className="mb-2">
                    <span className="font-semibold">Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                      className="ml-2 px-3 py-1 rounded-lg border border-green-200 dark:border-green-700 bg-gray-50 dark:bg-gray-900 text-green-800 dark:text-green-200 font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <div>
                    <span className="font-semibold">Items:</span>
                    <ul className="list-disc pl-6 mt-1 text-sm">
                      {order.items.map((item) => (
                        <li key={item._id}>{item.name} (x{item.quantity}) - PKR {item.price}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;