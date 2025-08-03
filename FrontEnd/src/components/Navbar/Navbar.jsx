import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkThemeContext } from '../../context/DarkThemeContext';

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

const Navbar = ({ isLoggedIn, onLogout }) => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <motion.nav 
      className="bg-white dark:bg-[#121212] shadow-lg p-4 flex items-center justify-between"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center space-x-2">
        <motion.div 
          className="px-2 py-1"
          variants={itemVariants}
        >
          <span className="text-xl font-bold text-blue-900 dark:text-white">She Can Foundation</span>
        </motion.div>
      </div>

      <motion.div 
        className="flex items-center space-x-6" 
        variants={itemVariants}
      >
        {isLoggedIn ? (
          <motion.button
            onClick={handleLogout}
            className="text-lg font-medium text-blue-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        ) : null}

        <a 
          href="https://shecanfoundation.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-lg font-medium text-blue-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
        >
          About Us
        </a>

        <motion.button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-blue-900 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 12a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-4-9a1 1 0 011 1v1a1 1 0 11-2 0V6a1 1 0 011-1zm8 8a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM6 6a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm8 2a1 1 0 011 1v1a1 1 0 11-2 0V9a1 1 0 011-1zM6 14a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm15 0a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1z" />
              <path fillRule="evenodd" d="M10 3a7 7 0 100 14A7 7 0 0010 3zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.593A7.502 7.502 0 0110.5 4a7.49 7.49 0 016.793 4.293 1.002 1.002 0 111.914-.586 9.502 9.502 0 00-8.59-5.707 9.502 9.502 0 00-8.793 11.293 1.002 1.002 0 11-1.914.586 11.502 11.502 0 011.59-1.914 11.502 11.502 0 018.793 5.707 1.002 1.002 0 11-.586 1.914 13.502 13.502 0 00-11.293-1.59 1.002 1.002 0 11-.586-1.914A11.502 11.502 0 0117.293 13.593z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;