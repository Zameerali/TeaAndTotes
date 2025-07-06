import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import { getImageUrl } from '../utils/getImageUrl';

function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => dispatch(setCart(res.data.items)))
        .catch((err) => console.error('Error fetching cart:', err));
    }
  }, [user, token, dispatch]);

  const handleQuantityChange = async (productId, quantity) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.put(`${API_URL}/api/cart/update`, { productId, quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCart(res.data.items));
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemove = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.delete(`${API_URL}/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCart(res.data.items));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  if (!user) {
    return (
      <section className="py-16 text-center">
        <p>Please <Link to="/login" className="text-green-600">login</Link> to view your cart.</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 dark:text-green-200 mb-8 text-center drop-shadow-lg animate-fade-in tracking-tight leading-tight">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.productId} className="flex flex-col md:flex-row justify-between items-center border rounded-2xl p-4 shadow bg-white dark:bg-gray-800 border-green-100 dark:border-gray-800 animate-fade-in gap-4">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-xl border border-green-100 dark:border-gray-700 overflow-hidden">
                    <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">{item.name}</h3>
                    <p className="text-green-700 dark:text-green-300 font-medium">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded hover:bg-green-100 dark:hover:bg-green-800 transition"
                      >
                        -
                      </button>
                      <span className="font-semibold text-green-800 dark:text-green-200">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded hover:bg-green-100 dark:hover:bg-green-800 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="text-right mt-8">
              <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </p>
              <Link
                to="/checkout"
                className="mt-4 inline-block bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-green-800 transition-all font-bold text-lg tracking-wide"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;