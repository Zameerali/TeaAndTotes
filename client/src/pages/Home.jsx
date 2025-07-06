import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/products?featured=true`)
      .then((res) => setFeaturedProducts(res.data))
      .catch((err) => console.error('Error fetching featured products:', err));
  }, []);

  return (
    <section className="bg-transparent py-16 md:py-24 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-7xl mx-auto text-center rounded-3xl shadow-2xl p-8 md:p-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-green-100 dark:border-gray-800 animate-fade-in transition-colors duration-300">
        <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 drop-shadow-lg animate-fade-in">Welcome to <span className="text-green-600 dark:text-green-300">Tea and Totes</span></h2>
        <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-medium animate-fade-in">Eco-friendly, stylish totes for every adventure! <span className="text-green-500 dark:text-green-200">Empowering women, saving the planet.</span></p>
        <a href="/products" className="bg-green-600 dark:bg-green-700 text-white px-10 py-4 rounded-full shadow-lg hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-300 font-bold text-lg tracking-wide animate-fade-in">Shop Now</a>
        <div className="mt-16">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100 animate-fade-in">Featured Totes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full animate-fade-in">
            {featuredProducts.map((product) => (
              <div className="flex justify-center" key={product._id}>
                <ProductCard product={product} large />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;