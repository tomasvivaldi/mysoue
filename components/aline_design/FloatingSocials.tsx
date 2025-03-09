// /components/FloatingSocials.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiLine } from "react-icons/si";

const FloatingSocials: React.FC = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 flex flex-col space-y-3 z-50"
    >
      {/* Instagram */}
      <motion.a
        href="https://www.instagram.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 bg-white rounded-full hover:shadow-md transition border-b border-primary shadow-md"
      >
        <FaInstagram className="w-6 h-6 text-pink-500" />
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 bg-white rounded-full hover:shadow-md transition border-b border-primary shadow-md"
      >
        <FaWhatsapp className="w-6 h-6 text-green-500" />
      </motion.a>

      {/* LINE */}
      <motion.a
        href="https://line.me/ti/p/yourLineID"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 bg-white rounded-full hover:shadow-md transition border-b border-primary shadow-md"
      >
        <SiLine className="w-6 h-6 text-green-600" />
      </motion.a>
    </motion.div>
  );
};

export default FloatingSocials;