import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { FaChartLine, FaPlus, FaGlobe } from "react-icons/fa";

const Header = ({ currentDate, onScheduleClick, onAuthClick }) => {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-content">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaChartLine />
          Social Media Dashboard
        </motion.h1>

        <div className="header-actions">
          <motion.button
            className="btn btn-secondary"
            onClick={onAuthClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaGlobe />
            Connect Accounts
          </motion.button>

          <motion.button
            className="btn btn-primary"
            onClick={onScheduleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FaPlus />
            Schedule Post
          </motion.button>

          <motion.div
            className="date-display"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {format(currentDate, "EEEE, MMMM do, yyyy h:mm a")}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
