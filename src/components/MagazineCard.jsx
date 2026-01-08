import React from 'react';
import { Tilt } from 'react-tilt';
import { Heart, BookOpen, Clock } from 'lucide-react';

/**
 * COMPONENT: src/components/MagazineCard.jsx
 * This is the individual 3D card for each magazine issue.
 * It uses 'react-tilt' for the movement effect.
 */
const MagazineCard = ({ issue }) => {
  // 3D Tilt Configuration
  const tiltOptions = {
    reverse: false,
    max: 15,
    perspective: 1000,
    scale: 1.05,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <Tilt options={tiltOptions}>
      <div className="group relative bg-[#1E40AF]/5 border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 shadow-xl cursor-pointer">
        {/* Magazine Cover Image / Placeholder */}
        <div className="aspect-[3/4] bg-gradient-to-br from-blue-900/60 to-black flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <BookOpen size={48} className="text-white/20 group-hover:text-orange-500/30 transition-colors" />
          
          {/* Issue Number Badge */}
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-tighter shadow-lg">
            Issue #{issue.number}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 bg-[#0A0F1E]/40 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
            {issue.title}
          </h3>
          
          <div className="flex items-center justify-between text-blue-200/40 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-orange-500/50" /> {issue.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Heart size={14} className="group-hover:text-red-500 transition-colors" /> {issue.likes}
              </span>
            </div>
            <span className="font-bold uppercase tracking-[0.2em] text-[8px] text-blue-500">
              {issue.month}
            </span>
          </div>
        </div>

        {/* Hover Read Overlay */}
        <div className="absolute inset-0 bg-[#0A0F1E]/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-12 h-1 bg-orange-500 mb-4 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
          <button className="bg-orange-500 text-white font-bold px-8 py-3 rounded-xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-orange-600 active:scale-95">
            View Digital Edition
          </button>
        </div>
      </div>
    </Tilt>
  );
};

export default MagazineCard;