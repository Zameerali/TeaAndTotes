import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-green-800 via-green-700 to-green-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white dark:text-white py-4 mt-8 shadow-inner rounded-t-2xl animate-fade-in transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-base text-center mb-2 font-semibold drop-shadow">&copy; 2025 Tea and Totes. All rights reserved.</p>
        <div className="flex flex-row gap-6 justify-center items-center">
          <Link to="/about" className="hover:underline underline-offset-4 hover:text-green-200 dark:hover:text-green-300 font-bold transition-colors">About</Link>
          <Link to="/contact" className="hover:underline underline-offset-4 hover:text-green-200 dark:hover:text-green-300 font-bold transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;