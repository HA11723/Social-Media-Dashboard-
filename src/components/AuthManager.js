import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCheck,
  FaTimes,
  FaLink,
} from "react-icons/fa";
import { getAuthStatus, clearAuth } from "../services/socialMediaApis";
import { realAuth, isAuthenticated, logout } from "../services/realAuth";

const AuthManager = ({ isOpen, onClose }) => {
  const [authStatus, setAuthStatus] = useState({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionResult, setConnectionResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setAuthStatus(getAuthStatus());
    }
  }, [isOpen]);

  const platforms = [
    {
      key: "twitter",
      name: "Twitter",
      icon: FaTwitter,
      color: "#1da1f2",
      description: "Share tweets and track engagement",
    },
    {
      key: "instagram",
      name: "Instagram",
      icon: FaInstagram,
      color: "#e4405f",
      description: "Post photos and stories",
    },
    {
      key: "linkedin",
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "#0077b5",
      description: "Share professional content",
    },
  ];

  const handleConnect = async (platform) => {
    setIsConnecting(true);
    setConnectionResult(null);

    try {
      // In production, this would redirect to OAuth flow
      // For demo purposes, we'll simulate the connection
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful connection
      setConnectionResult({
        platform,
        success: true,
        message: `Successfully connected to ${platform}`,
      });

      // Update auth status
      setAuthStatus((prev) => ({ ...prev, [platform]: true }));
    } catch (error) {
      setConnectionResult({
        platform,
        success: false,
        message: `Failed to connect to ${platform}: ${error.message}`,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async (platform) => {
    try {
      clearAuth(platform);
      setAuthStatus((prev) => ({ ...prev, [platform]: false }));
      setConnectionResult({
        platform,
        success: true,
        message: `Disconnected from ${platform}`,
      });
    } catch (error) {
      setConnectionResult({
        platform,
        success: false,
        message: `Failed to disconnect from ${platform}`,
      });
    }
  };

  const getOAuthUrl = (platform) => {
    const urls = {
      twitter: "https://twitter.com/i/oauth2/authorize",
      instagram: "https://api.instagram.com/oauth/authorize",
      linkedin: "https://www.linkedin.com/oauth/v2/authorization",
    };
    return urls[platform];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content auth-modal"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Connect Social Media Accounts</h2>
              <button className="close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="auth-content">
              <p className="auth-description">
                Connect your social media accounts to enable posting and
                analytics.
              </p>

              <div className="platforms-grid">
                {platforms.map((platform) => (
                  <motion.div
                    key={platform.key}
                    className={`platform-card ${
                      authStatus[platform.key] ? "connected" : "disconnected"
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    <div className="platform-header">
                      <div
                        className="platform-icon"
                        style={{ color: platform.color }}
                      >
                        <platform.icon />
                      </div>
                      <div className="platform-info">
                        <h3>{platform.name}</h3>
                        <p>{platform.description}</p>
                      </div>
                      <div className="connection-status">
                        {authStatus[platform.key] ? (
                          <FaCheck className="connected-icon" />
                        ) : (
                          <FaTimes className="disconnected-icon" />
                        )}
                      </div>
                    </div>

                    <div className="platform-actions">
                      {authStatus[platform.key] ? (
                        <motion.button
                          className="btn btn-secondary disconnect-btn"
                          onClick={() => handleDisconnect(platform.key)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Disconnect
                        </motion.button>
                      ) : (
                        <motion.button
                          className="btn btn-primary connect-btn"
                          onClick={() => handleConnect(platform.key)}
                          disabled={isConnecting}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isConnecting ? (
                            <>
                              <div className="loading-spinner"></div>
                              Connecting...
                            </>
                          ) : (
                            <>
                              <FaLink />
                              Connect
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {connectionResult && (
                <motion.div
                  className={`connection-result ${
                    connectionResult.success ? "success" : "error"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="result-icon">
                    {connectionResult.success ? <FaCheck /> : <FaTimes />}
                  </div>
                  <div className="result-message">
                    {connectionResult.message}
                  </div>
                </motion.div>
              )}

              <div className="auth-footer">
                <p className="auth-note">
                  <strong>Note:</strong> In production, this would use OAuth 2.0
                  flows for secure authentication. Currently using simulated
                  connections for demonstration.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthManager;
