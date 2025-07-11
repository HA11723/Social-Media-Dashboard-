import React from "react";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import PlatformChart from "./PlatformChart";

const PlatformCards = ({ data }) => {
  const platforms = [
    {
      key: "twitter",
      name: "Twitter",
      icon: FaTwitter,
      color: "#1da1f2",
      data: data.twitter,
    },
    {
      key: "instagram",
      name: "Instagram",
      icon: FaInstagram,
      color: "#e4405f",
      data: data.instagram,
    },
    {
      key: "linkedin",
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "#0077b5",
      data: data.linkedin,
    },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <section className="platforms-section">
      {platforms.map((platform, index) => (
        <motion.div
          key={platform.key}
          className="platform-card"
          data-platform={platform.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -3 }}
        >
          <div className="platform-header">
            <div className="platform-info">
              <div className="platform-icon">
                <platform.icon />
              </div>
              <h3>{platform.name}</h3>
            </div>
            <div className="platform-stats">
              <span className="stat">
                <FaUsers />
                {formatNumber(platform.data.followers)}
              </span>
              <span className="stat">
                <FaChartLine />
                {platform.data.engagement}%
              </span>
            </div>
          </div>
          <div className="platform-content">
            <PlatformChart
              data={platform.data.analytics}
              color={platform.color}
              platformName={platform.name}
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default PlatformCards;
