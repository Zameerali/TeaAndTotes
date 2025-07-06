import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../redux/cartSlice';
import API_URL from '../utils/api';
import { getImageUrl } from '../utils/getImageUrl';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/cart/add`, {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCart(res.data.items));
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <section className="py-16 bg-white dark:bg-gray-900 min-h-[80vh]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        <img src={getImageUrl(product.image)} alt={product.name} className="w-full md:w-1/2 h-96 object-cover rounded bg-gray-100 dark:bg-gray-800" />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-green-900 dark:text-white">{product.name}</h2>
          <p className="text-gray-600 dark:text-gray-200 mb-4">PKR {product.price}</p>
          <p className="text-gray-700 dark:text-gray-100 mb-6">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 dark:hover:bg-green-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;