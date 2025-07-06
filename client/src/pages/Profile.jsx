import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';

function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error('Error fetching orders:', err));
    }
  }, [user, token]);

  if (!user) {
    return (
      <section className="py-16 text-center">
        <p>Please <a href="/login" className="text-green-600">login</a> to view your profile.</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-900 dark:text-white">Your Profile</h2>
          <p className="text-lg mb-4 text-gray-900 dark:text-gray-100 font-semibold"><strong>Name:</strong> {user.name}</p>
          <p className="text-lg mb-8 text-gray-900 dark:text-gray-100 font-semibold"><strong>Email:</strong> {user.email}</p>
          <h3 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-200">Order History</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No orders yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4 shadow border border-green-100 dark:border-gray-800">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <span className="font-semibold text-green-800 dark:text-green-200">Order #{order._id.slice(-6)}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{order.status}</span>
                  </div>
                  <div className="mb-2 text-green-700 dark:text-green-300 font-medium">Total: PKR {order.total.toFixed(2)}</div>
                  {order.receipt && typeof order.receipt === 'string' && (
                    <div className="mb-2">
                      <span className="font-semibold">Receipt:</span> <a href={`/api/images/${order.receipt}`} target="_blank" rel="noopener noreferrer" className="text-green-600 underline">View Receipt</a>
                    </div>
                  )}
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

export default Profile;