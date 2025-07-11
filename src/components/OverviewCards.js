import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaLinkedin, FaChartBar } from "react-icons/fa";

const OverviewCards = ({ data }) => {
  const { overview, platforms } = data;

  // Calculate total reach
  const totalReach = Object.values(platforms).reduce((sum, platform) => {
    return sum + platform.analytics.reach[platform.analytics.reach.length - 1];
  }, 0);

  const cards = [
    {
      title: "Total Followers",
      value: overview.totalFollowers,
      change: "+12.5%",
      icon: FaTwitter,
      iconClass: "twitter",
    },
    {
      title: "Total Posts",
      value: overview.totalPosts,
      change: "+8.3%",
      icon: FaInstagram,
      iconClass: "instagram",
    },
    {
      title: "Avg Engagement",
      value: `${overview.avgEngagement}%`,
      change: "+2.1%",
      icon: FaLinkedin,
      iconClass: "linkedin",
    },
    {
      title: "Total Reach",
      value: totalReach,
      change: "+15.7%",
      icon: FaChartBar,
      iconClass: "analytics",
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
    <section className="overview-section">
      <div className="overview-grid">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className="overview-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className={`card-icon ${card.iconClass}`}>
              <card.icon />
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p className="card-number">
                {typeof card.value === "number"
                  ? formatNumber(card.value)
                  : card.value}
              </p>
              <span className="card-change positive">{card.change}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OverviewCards;
