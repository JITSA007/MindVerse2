import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * COMPONENT: src/components/SoftLock.jsx
 * This is a "Soft-Lock" modal that appears after a set delay (e.g., 30 seconds).
 * It encourages users to sign up without blocking their experience entirely.
 */
const SoftLock = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has already dismissed this during their session
    const dismissed = sessionStorage.getItem('mindverse_softlock_dismissed');
    if (dismissed) return;

    // Set a timer for 30 seconds (30000 milliseconds)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasDismissed(true);
    sessionStorage.setItem('mindverse_softlock_dismissed', 'true');
  };

  const handleJoin = () => {
    setIsVisible(false);
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-[#0A0F1E]/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#1E40AF]/10 border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden glass-card"
          >
            {/* Background Glows */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full" />

            {/* Close Button */}
            <button 
              onClick={handleDismiss}
              className="absolute top-6 right-6 p-2 text-blue-200/40 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-orange-500/20">
                <Sparkles className="text-orange-500" size={32} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                Love the <span className="text-orange-500">MindVerse</span> experience?
              </h2>
              
              <p className="text-blue-200/60 mb-8 text-lg">
                Join our student community to save your favorite magazine issues, 
                apply for jobs, and participate in exclusive campus polls.
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleJoin}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group"
                >
                  Join the Community
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={handleDismiss}
                  className="text-blue-400 font-semibold py-2 hover:text-blue-300 transition-colors text-sm"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SoftLock;