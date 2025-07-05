import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { useState } from 'react';

function Navbar() {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-green-100/80 via-white/80 to-green-50/80 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 backdrop-blur-md border-b border-green-200 dark:border-gray-800 text-green-900 dark:text-green-100 p-4 sticky top-0 z-20 shadow-md animate-fade-in transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight flex-shrink-0 mr-2 md:mr-6 hover:opacity-80 transition-opacity duration-200 drop-shadow-lg">Tea and Totes</Link>
        {/* Menu button for mobile */}
        <div className="flex items-center md:hidden ml-auto">
          <button
            className="p-2 rounded hover:bg-green-200 dark:hover:bg-gray-800 focus:outline-none border border-green-200 dark:border-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Nav links */}
        <div className={`flex-col md:flex md:flex-row md:space-x-8 md:static absolute top-16 left-0 w-full bg-white/95 dark:bg-gray-900/95 md:bg-transparent transition-all duration-300 z-20 ${menuOpen ? 'flex' : 'hidden'} md:flex md:items-center md:justify-end ml-auto border-b md:border-0 border-green-100 dark:border-gray-800 rounded-b-2xl md:rounded-none shadow-md md:shadow-none`}> 
          <Link to="/" className="hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors px-4 py-2 md:p-0">Home</Link>
          <Link to="/products" className="hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors px-4 py-2 md:p-0">Products</Link>
          <Link to="/cart" className="hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors px-4 py-2 md:p-0">Cart ({cart.length})</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors px-4 py-2 md:p-0">Profile</Link>
              <button onClick={handleLogout} className="hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors px-4 py-2 md:p-0 text-left w-full md:w-auto">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors px-4 py-2 md:p-0">Login</Link>
          )}
          {user && (user.isAdmin || user.role === 'admin') && (
            <Link to="/admin" className="hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors px-4 py-2 md:p-0">Admin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;