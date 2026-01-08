import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone } from 'lucide-react';

const NewsTicker = () => {
  // Mock data - eventually this will come from your Firebase Admin Panel
  const newsItems = [
    "🚀 MindVerse 2.0 is now live!",
    "📅 Upcoming Tech Fest: February 15th",
    "📝 Winter Internship applications are open",
    "🏆 Congratulations to the Hackathon winners!",
  ];

  return (
    <div className="bg-blue-900/40 border-y border-orange-500/20 py-2 overflow-hidden flex items-center">
      {/* Label */}
      <div className="bg-orange-500 text-white px-4 py-1 font-bold text-sm uppercase tracking-wider flex items-center gap-2 z-10 whitespace-nowrap">
        <Megaphone size={16} />
        Breaking News
      </div>

      {/* Marquee Animation */}
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-12 px-12 text-blue-100 font-medium"
        >
          {/* We duplicate items to create a seamless loop */}
          {[...newsItems, ...newsItems].map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="text-orange-400">•</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsTicker;