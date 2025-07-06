import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/api';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);
      dispatch(login({ user: res.data.user, token: res.data.token }));
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 dark:text-green-200 mb-8 text-center drop-shadow-lg animate-fade-in tracking-tight leading-tight">Register</h2>
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-green-100 dark:border-gray-800">
          {error && <p className="text-red-600 dark:text-red-400 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:from-green-600 hover:to-green-800 transition-all text-lg tracking-wide"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-gray-800 dark:text-gray-200">
            Already have an account? <a href="/login" className="text-green-600 dark:text-green-300 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;