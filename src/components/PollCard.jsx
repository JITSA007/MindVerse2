import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, CheckCircle2 } from 'lucide-react';

const PollCard = ({ question, options, totalVotes }) => {
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleVote = (index) => {
    setSelected(index);
    setVoted(true);
  };

  return (
    <div className="bg-[#1E40AF]/5 border border-white/5 rounded-[2rem] p-8 glass-card">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-xl font-bold leading-tight max-w-[80%]">{question}</h3>
        <Vote className="text-orange-500" size={24} />
      </div>

      <div className="space-y-3 mb-8">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={voted}
            onClick={() => handleVote(index)}
            className={`w-full relative group p-4 rounded-xl border transition-all text-left overflow-hidden ${
              selected === index 
                ? 'border-orange-500 bg-orange-500/10' 
                : 'border-white/5 bg-white/5 hover:border-white/20'
            }`}
          >
            {/* Progress Bar (Visible after voting) */}
            {voted && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${index === selected ? '65%' : '15%'}` }}
                className="absolute inset-y-0 left-0 bg-blue-500/10 z-0"
              />
            )}
            
            <div className="relative z-10 flex justify-between items-center">
              <span className={`font-medium ${selected === index ? 'text-orange-500' : 'text-blue-200/60'}`}>
                {option}
              </span>
              {voted && (
                <span className="text-xs font-bold text-blue-400">
                  {index === selected ? '65%' : '15%'}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-blue-200/20">
        <span>{totalVotes + (voted ? 1 : 0)} Total Votes</span>
        {voted && (
          <span className="flex items-center gap-1 text-orange-500">
            <CheckCircle2 size={12} /> Vote Recorded
          </span>
        )}
      </div>
    </div>
  );
};

export default PollCard;