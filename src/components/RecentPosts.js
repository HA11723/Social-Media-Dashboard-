import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHeart,
  FaRetweet,
  FaComment,
} from "react-icons/fa";

const RecentPosts = ({ data }) => {
  // Combine all recent posts
  const allPosts = [];

  // Add Twitter posts
  data.twitter.recentPosts.forEach((post) => {
    allPosts.push({
      ...post,
      platform: "twitter",
      platformName: "Twitter",
      platformIcon: FaTwitter,
    });
  });

  // Add Instagram posts
  data.instagram.recentPosts.forEach((post) => {
    allPosts.push({
      ...post,
      platform: "instagram",
      platformName: "Instagram",
      platformIcon: FaInstagram,
    });
  });

  // Add LinkedIn posts
  data.linkedin.recentPosts.forEach((post) => {
    allPosts.push({
      ...post,
      platform: "linkedin",
      platformName: "LinkedIn",
      platformIcon: FaLinkedin,
    });
  });

  // Sort by date (most recent first)
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <section className="recent-posts-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Recent Posts
      </motion.h2>

      <div className="posts-grid">
        {allPosts.map((post, index) => (
          <motion.div
            key={`${post.platform}-${post.id}`}
            className="post-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="post-header">
              <span className={`post-platform ${post.platform}`}>
                <post.platformIcon />
                {post.platformName}
              </span>
              <span className="post-date">
                {format(new Date(post.date), "MMM d, yyyy")}
              </span>
            </div>

            <div className="post-content">{post.content}</div>

            <div className="post-stats">
              <span className="post-stat">
                <FaHeart />
                {formatNumber(post.likes)}
              </span>

              {post.platform === "twitter" && (
                <span className="post-stat">
                  <FaRetweet />
                  {formatNumber(post.retweets)}
                </span>
              )}

              <span className="post-stat">
                <FaComment />
                {formatNumber(post.comments)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
