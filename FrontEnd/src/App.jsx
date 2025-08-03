import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkThemeContextProvider } from './context/DarkThemeContext';

import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignupPage from './components/Signup/SignupPage';
import Dashboard from './components/Dashboard/Dashboard';
import Leaderboard from './components/Leaderboard/Leaderboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchDashboardData = async () => {
    const response = await fetch('/api/dashboard');
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    return await response.json();
  };

  const fetchLeaderboardData = async () => {
    const response = await fetch('/api/leaderboard');
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard data');
    }
    return await response.json();
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      Promise.all([
        fetchDashboardData(),
        fetchLeaderboardData(),
      ]).then(([dashboardData, leaderboardData]) => {
        setInternData(dashboardData);
        setLeaderboardData(leaderboardData);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <DarkThemeContextProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 overflow-x-hidden">
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route
                path="/login"
                element={
                  !isLoggedIn ? (
                    isSignupMode ? (
                      <SignupPage
                        onSignupSuccess={() => setIsSignupMode(false)}
                        onNavigateToLogin={() => setIsSignupMode(false)}
                      />
                    ) : (
                      <Login
                        onLoginSuccess={handleLoginSuccess}
                        onNavigateToSignup={() => setIsSignupMode(true)}
                      />
                    )
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                }
              />

              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? (
                    <Dashboard
                      loading={loading}
                      internData={internData}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/leaderboard"
                element={
                  isLoggedIn ? (
                    <Leaderboard
                      loading={loading}
                      leaderboardData={leaderboardData}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DarkThemeContextProvider>
  );
}

export default App;