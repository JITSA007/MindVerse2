import React from 'react';
import Hero from '../components/Hero.jsx';
import NewsTicker from '../components/NewsTicker.jsx';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0A0F1E]"
    >
      {/* Dynamic News Ticker */}
      <NewsTicker />
      
      {/* 3D Hero Section */}
      <Hero />

      {/* Editor's Pick Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Editor's <span className="text-orange-500 underline decoration-blue-500 underline-offset-8">Pick</span>
            </h3>
            <div className="h-[1px] flex-grow bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="group relative h-80 bg-[#1E40AF]/5 border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 text-left">
                  <div className="text-orange-500 text-xs font-bold uppercase mb-2">Issue #24</div>
                  <div className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">The Digital Renaissance</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;