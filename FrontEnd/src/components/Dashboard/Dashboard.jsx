import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  visible: { 
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Dashboard = ({ internData, loading }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-50 dark:bg-gray-900 p-4">
      <div 
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl mt-8 space-y-6"
      >
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-white">
            Intern Dashboard
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <motion.div 
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : internData ? (
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="p-6 bg-slate-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold text-blue-900 dark:text-white mb-4">Intern Profile</h2>
              <div className="space-y-2">
                <p className="text-lg text-blue-900 dark:text-white flex justify-between items-center">
                  <span className="font-medium">Name:</span>
                  <span>{internData.name}</span>
                </p>
                <p className="text-lg text-blue-900 dark:text-white flex justify-between items-center">
                  <span className="font-medium">Referral Code:</span>
                  <span className="bg-blue-100 dark:bg-blue-200 px-3 py-1 rounded-full text-blue-900">
                    {internData.referralCode}
                  </span>
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="p-6 bg-slate-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold text-blue-900 dark:text-white mb-2">Total Donations</h2>
              <p 
                className="text-4xl font-extrabold text-orange-500">
                ${internData.donationsRaised.toLocaleString()}
              </p>
            </motion.div>

            <motion.div 
              className="p-6 bg-slate-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold text-blue-900 dark:text-white mb-4">Rewards</h2>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  <span className="text-blue-900 dark:text-white">Level 1: Badge Unlocked!</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                  <span className="text-blue-900 dark:text-white">Level 2: Special Shoutout!</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                  <span className="text-blue-900 dark:text-white">Level 3: Exclusive Swag!</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        ) : (
          <div className="text-center text-red-500 py-4 bg-red-50 rounded-lg">
            Failed to load data. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;