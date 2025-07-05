import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function ContactInfo() {
  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col gap-6 mt-8">
      <h2 className="text-2xl font-bold mb-2 text-green-800 dark:text-green-200">Contact Information</h2>
      <div className="flex items-center gap-4">
        <FaEnvelope className="text-blue-400 w-6 h-6" />
        <a href="mailto:zameeralimustafa@gmail.com" className="text-lg text-green-900 dark:text-green-100 hover:underline">zameeralimustafa@gmail.com</a>
      </div>
      <div className="flex items-center gap-4">
        <FaInstagram className="text-pink-500 w-6 h-6" />
        <a href="https://www.instagram.com/tea_and_totes" target="_blank" rel="noopener noreferrer" className="text-lg text-green-900 dark:text-green-100 hover:underline">@tea_and_totes</a>
      </div>
      <div className="flex items-center gap-4">
        <FaWhatsapp className="text-green-500 w-6 h-6" />
        <a href="https://wa.me/923221640284" target="_blank" rel="noopener noreferrer" className="text-lg text-green-900 dark:text-green-100 hover:underline">+92 322 1640284</a>
      </div>
    </div>
  );
}

export default ContactInfo;
