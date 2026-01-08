import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Database } from 'lucide-react';

const TechStackBattle = ({ topic, options }) => {
  const [voted, setVoted] = useState(false);
  const [selected, setSelected] = useState(null);

  const totalVotes = options.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="bg-[#1E40AF]/5 border border-white/5 rounded-[2rem] p-8 glass-card relative overflow-hidden">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
          <Database size={20} />
        </div>
        <h3 className="text-lg font-bold leading-tight">{topic}</h3>
      </div>

      <div className="space-y-3">
        {options.map((opt, idx) => {
          const percentage = Math.round((opt.votes / totalVotes) * 100);
          return (
            <button
              key={idx}
              disabled={voted}
              onClick={() => { setVoted(true); setSelected(idx); }}
              className={`w-full relative p-4 rounded-xl border transition-all text-left group overflow-hidden ${
                selected === idx ? 'border-orange-500 bg-orange-500/10' : 'border-white/5 bg-white/5'
              }`}
            >
              {/* Dynamic Progress Bar */}
              {voted && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  className="absolute inset-y-0 left-0 bg-orange-500/10 z-0"
                />
              )}

              <div className="relative z-10 flex justify-between items-center">
                <span className={`text-sm font-mono ${selected === idx ? 'text-orange-500' : 'text-blue-200/60'}`}>
                  {voted ? `${idx}. ` : '> '}{opt.name}
                </span>
                {voted && (
                  <span className="text-[10px] font-black font-mono text-orange-500">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {voted && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-blue-500 uppercase tracking-widest flex justify-between"
        >
          <span>Cluster_Status: Syncing_Vote...</span>
          <span>Nodes_Total: {totalVotes + 1}</span>
        </motion.div>
      )}
    </div>
  );
};

export default TechStackBattle;