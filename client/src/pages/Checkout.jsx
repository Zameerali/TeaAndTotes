import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/api';
import { clearCart } from '../redux/cartSlice';
import { useDropzone } from 'react-dropzone';

function Checkout() {
  const { cart } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: user?.name || '', contactNumber: user?.contactNumber || '', address: '' });
  const [receipt, setReceipt] = useState(null);
  const [errors, setErrors] = useState({});

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setReceipt(acceptedFiles[0]);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!receipt) newErrors.receipt = 'Payment receipt is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('items', JSON.stringify(cart));
      formDataToSend.append('total', cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
      formDataToSend.append('shippingAddress', formData.address);
      formDataToSend.append('receipt', receipt);
      formDataToSend.append('contactNumber', formData.contactNumber);

      await axios.post(`${API_URL}/api/orders`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(clearCart());
      alert('Order placed successfully!');
      navigate('/profile');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order');
    }
  };

  if (!user) {
    return (
      <section className="py-16 text-center">
        <p>Please <a href="/login" className="text-green-600">login</a> to proceed with checkout.</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 dark:text-green-200 mb-8 text-center drop-shadow-lg animate-fade-in tracking-tight leading-tight">Checkout</h2>
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-green-100 dark:border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Enter your contact number"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Enter your address"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">Payment Receipt</label>
              <div {...getRootProps()} className="border-2 border-dashed border-green-300 dark:border-green-700 p-4 text-center cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-green-50 dark:hover:bg-green-900 transition">
                <input {...getInputProps()} />
                <p className="text-gray-500 dark:text-gray-400">{receipt ? receipt.name : 'Drag & drop or click to upload receipt'}</p>
              </div>
              {errors.receipt && <p className="text-red-600 text-sm mt-1">{errors.receipt}</p>}
            </div>
            <div className="text-right mt-6">
              <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                Total: PKR {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </p>
              <button
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:from-green-600 hover:to-green-800 transition-all text-lg tracking-wide"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Checkout;