import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import ProductCard from '../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/products${category ? `?category=${category}` : ''}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, [category]);

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 min-h-[80vh]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-900 dark:text-white">Our Totes</h2>
        <div className="flex justify-center mb-8">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow"
          >
            <option value="">All Categories</option>
            <option value="Eco">Customised</option>
            <option value="Canvas">Canvas</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;