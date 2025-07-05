import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../redux/cartSlice';
import axios from 'axios';

function ProductCard({ product, large }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post('/api/cart/add', {
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

  return (
    <div className={`border rounded-2xl p-4 shadow-xl hover:shadow-2xl transition transform hover:scale-105 bg-white dark:bg-gray-800 flex flex-col h-full animate-fade-in border-green-100 dark:border-gray-800 ${large ? 'max-w-md w-full md:max-w-lg md:p-8' : ''}`}>
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image ? `/api/images/${product.image}` : '/default-tote.jpg'}
          alt={product.name}
          className={`w-full ${large ? 'h-72' : 'h-48'} object-cover rounded-xl mb-2 transition-all duration-300 border-2 border-green-100 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900`}
        />
        <h3 className="text-xl font-bold mt-2 text-green-900 dark:text-green-100 line-clamp-1">{product.name}</h3>
        <p className="text-green-700 dark:text-green-300 text-lg font-semibold">${product.price}</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className={`mt-auto bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-800 transition font-medium w-full shadow-sm border border-green-200 dark:border-green-800 ${large ? 'text-lg' : ''}`}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;