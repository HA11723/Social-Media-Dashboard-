import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import OverviewCards from "./components/OverviewCards";
import PlatformCards from "./components/PlatformCards";
import RecentPosts from "./components/RecentPosts";
import ScheduleModal from "./components/ScheduleModal";
import EnhancedScheduleModal from "./components/EnhancedScheduleModal";
import AuthManager from "./components/AuthManager";
import { fetchDashboardData, schedulePost } from "./services/api";
import "./App.css";

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnhancedModalOpen, setIsEnhancedModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch dashboard data on component mount
  useEffect(() => {
    loadDashboardData();

    // Update current date every minute
    const dateInterval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    // Refresh data every 5 minutes
    const dataInterval = setInterval(() => {
      loadDashboardData();
    }, 300000);

    return () => {
      clearInterval(dateInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await fetchDashboardData();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedulePost = async (postData) => {
    try {
      await schedulePost(postData);
      setIsModalOpen(false);
      // Reload data to show updated posts
      await loadDashboardData();
    } catch (err) {
      console.error("Error scheduling post:", err);
      throw err;
    }
  };

  if (loading && !dashboardData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadDashboardData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="App">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="dashboard-container"
      >
        <Header
          currentDate={currentDate}
          onScheduleClick={() => setIsEnhancedModalOpen(true)}
          onAuthClick={() => setIsAuthModalOpen(true)}
        />

        {dashboardData && (
          <>
            <OverviewCards data={dashboardData} />
            <PlatformCards data={dashboardData.platforms} />
            <RecentPosts data={dashboardData.platforms} />
          </>
        )}
      </motion.div>

      <EnhancedScheduleModal
        isOpen={isEnhancedModalOpen}
        onClose={() => setIsEnhancedModalOpen(false)}
        onSubmit={handleSchedulePost}
      />

      <AuthManager
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default App;
