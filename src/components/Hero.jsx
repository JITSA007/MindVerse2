import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 

const Hero = () => {
  // This initializes the particle engine correctly
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    fullScreen: { enable: false },
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: ["#F97316", "#1E40AF"] }, // Brand: Orange & Blue
      links: {
        color: "#1E40AF",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1.2,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80,
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0F1E]">
      {/* 3D Particle Background Layer */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesConfig}
          className="h-full w-full"
        />
      </div>

      {/* Hero Text & Buttons */}
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold tracking-widest uppercase text-xs mb-6">
            Official Student Magazine
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
            MIND<span className="text-blue-500 italic">VERSE</span>
          </h1>
          
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Empowering the <span className="text-orange-400 font-semibold">CollegeDekho</span> community through 
            digital innovation, creativity, and student-led journalism.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-1">
              Read Latest Issue
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1">
              Explore Careers
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Mouse Icon */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 border-2 border-white/10 h-10 w-6 rounded-full flex justify-center p-1"
      >
        <div className="w-1 h-2 bg-orange-500 rounded-full" />
      </motion.div>
    </section>
  );
};

export default Hero;