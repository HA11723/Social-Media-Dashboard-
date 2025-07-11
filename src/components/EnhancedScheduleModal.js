import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaImage,
  FaGlobe,
  FaClock,
} from "react-icons/fa";
import {
  postToMultiplePlatforms,
  getAuthStatus,
} from "../services/socialMediaApis";

const EnhancedScheduleModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    content: "",
    platforms: [],
    scheduledDate: "",
    media: null,
    visibility: "public",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStatus, setAuthStatus] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [postingResults, setPostingResults] = useState(null);

  // Set default date to tomorrow at 9 AM
  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      setFormData((prev) => ({
        ...prev,
        scheduledDate: tomorrow.toISOString().slice(0, 16),
      }));

      // Check authentication status
      setAuthStatus(getAuthStatus());
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPostingResults(null);

    try {
      if (formData.platforms.length === 0) {
        throw new Error("Please select at least one platform");
      }

      // Check if we're posting now or scheduling for later
      const now = new Date();
      const scheduledTime = new Date(formData.scheduledDate);
      const isImmediate = scheduledTime <= now;

      if (isImmediate) {
        // Post immediately to selected platforms
        const results = await postToMultiplePlatforms(
          formData.content,
          formData.platforms,
          formData.media
        );

        setPostingResults(results);

        if (results.errors.length === 0) {
          // All posts successful
          onClose();
          setFormData({
            content: "",
            platforms: [],
            scheduledDate: "",
            media: null,
            visibility: "public",
          });
        }
      } else {
        // Schedule for later (in production, this would save to database)
        await onSubmit({
          ...formData,
          scheduledDate: formData.scheduledDate,
          status: "scheduled",
        });
        onClose();
        setFormData({
          content: "",
          platforms: [],
          scheduledDate: "",
          media: null,
          visibility: "public",
        });
      }
    } catch (error) {
      console.error("Error posting:", error);
      setPostingResults({
        errors: [{ platform: "general", error: error.message }],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, media: file }));

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlatformToggle = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleRemoveMedia = () => {
    setFormData((prev) => ({ ...prev, media: null }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const platforms = [
    {
      key: "twitter",
      name: "Twitter",
      icon: FaTwitter,
      color: "#1da1f2",
      requiresAuth: true,
    },
    {
      key: "instagram",
      name: "Instagram",
      icon: FaInstagram,
      color: "#e4405f",
      requiresAuth: true,
      requiresMedia: true,
    },
    {
      key: "linkedin",
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "#0077b5",
      requiresAuth: true,
    },
  ];

  const getCharacterCount = () => {
    const maxLengths = {
      twitter: 280,
      instagram: 2200,
      linkedin: 3000,
    };

    const selectedPlatforms = formData.platforms;
    const minLength = Math.min(...selectedPlatforms.map((p) => maxLengths[p]));

    return {
      current: formData.content.length,
      max: minLength,
      remaining: minLength - formData.content.length,
    };
  };

  const charCount = getCharacterCount();

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
            className="modal-content enhanced-modal"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Create & Schedule Post</h2>
              <button className="close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="schedule-form enhanced-form"
            >
              {/* Platform Selection */}
              <div className="form-group">
                <label>Select Platforms</label>
                <div className="platform-selection">
                  {platforms.map((platform) => (
                    <motion.button
                      key={platform.key}
                      type="button"
                      className={`platform-option ${
                        formData.platforms.includes(platform.key)
                          ? "selected"
                          : ""
                      } ${!authStatus[platform.key] ? "disabled" : ""}`}
                      onClick={() => handlePlatformToggle(platform.key)}
                      disabled={!authStatus[platform.key]}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <platform.icon />
                      <span>{platform.name}</span>
                      {!authStatus[platform.key] && (
                        <span className="auth-required">Connect Required</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  required
                  rows="4"
                  maxLength={charCount.max}
                />
                <div className="char-count">
                  {charCount.remaining} characters remaining
                </div>
              </div>

              {/* Media Upload */}
              <div className="form-group">
                <label htmlFor="media">Media (Optional)</label>
                <div className="media-upload">
                  <input
                    type="file"
                    id="media"
                    name="media"
                    onChange={handleChange}
                    accept="image/*,video/*"
                    className="file-input"
                  />
                  <label htmlFor="media" className="file-label">
                    <FaImage />
                    <span>Choose File</span>
                  </label>
                </div>
                {previewUrl && (
                  <div className="media-preview">
                    <img src={previewUrl} alt="Preview" />
                    <button
                      type="button"
                      onClick={handleRemoveMedia}
                      className="remove-media"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>

              {/* Scheduling */}
              <div className="form-group">
                <label htmlFor="scheduledDate">Schedule Date</label>
                <div className="schedule-input">
                  <FaClock />
                  <input
                    type="datetime-local"
                    id="scheduledDate"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Visibility */}
              <div className="form-group">
                <label htmlFor="visibility">Visibility</label>
                <select
                  id="visibility"
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="connections">
                    Connections Only (LinkedIn)
                  </option>
                </select>
              </div>

              {/* Results Display */}
              {postingResults && (
                <div className="posting-results">
                  {postingResults.errors.length > 0 && (
                    <div className="errors">
                      <h4>Errors:</h4>
                      {postingResults.errors.map((error, index) => (
                        <div key={index} className="error-item">
                          <strong>{error.platform}:</strong> {error.error}
                        </div>
                      ))}
                    </div>
                  )}
                  {Object.keys(postingResults.results || {}).length > 0 && (
                    <div className="success">
                      <h4>Successfully Posted to:</h4>
                      {Object.keys(postingResults.results).map((platform) => (
                        <div key={platform} className="success-item">
                          <strong>{platform}:</strong> Post created successfully
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="form-actions">
                <motion.button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || formData.platforms.length === 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? "Posting..." : "Post Now"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedScheduleModal;
