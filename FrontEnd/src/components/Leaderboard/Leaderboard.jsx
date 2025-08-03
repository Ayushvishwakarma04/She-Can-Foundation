import React, { useState } from 'react';
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

const Leaderboard = ({ leaderboardData, loading }) => {
  const [timeFilter, setTimeFilter] = useState('all');
  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">Leaderboard</h1>
          <div className="flex gap-2">
            {['all', 'week', 'month'].map((period) => (
              <motion.button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  timeFilter === period
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-600 text-blue-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <motion.div 
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <motion.div 
            className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-4">
              {leaderboardData.length > 0 ? (
                leaderboardData.map((item) => (
                  <motion.div 
                    key={item.rank}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ x: 10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        item.rank === 1 ? 'bg-orange-500' :
                        item.rank === 2 ? 'bg-blue-400' :
                        item.rank === 3 ? 'bg-orange-300' : 'bg-gray-200 dark:bg-gray-500'
                      } text-white font-bold text-lg shadow-md`}>
                        {item.rank}
                      </span>
                      <div>
                        <span className="font-medium text-blue-900 dark:text-white">{item.name}</span>
                        <span className={`ml-2 text-sm ${
                          item.change && item.change.startsWith('+') ? 'text-orange-500' :
                          item.change && item.change.startsWith('-') ? 'text-red-500' : 'text-gray-400'
                        }`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-500 font-semibold text-lg">
                        ${item.donations.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No leaderboard data available.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;