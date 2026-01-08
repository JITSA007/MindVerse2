import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, CheckCircle2, AlertCircle } from 'lucide-react';

const DebugArena = ({ language, snippet, hint, correctLine }) => {
  const [selectedLine, setSelectedLine] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, success, error

  const handleSquash = () => {
    if (selectedLine === correctLine) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#0A0F1E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* IDE Header */}
      <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="text-[10px] font-mono text-blue-200/30 flex items-center gap-2">
          <Code2 size={12} /> {language.toLowerCase()}_challenge.js
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-6 font-mono text-sm">
        <div className="space-y-1 mb-6">
          {snippet.split('\n').map((line, idx) => (
            <div 
              key={idx}
              onClick={() => status === 'idle' && setSelectedLine(idx + 1)}
              className={`flex gap-6 cursor-pointer group rounded px-2 transition-colors ${
                selectedLine === idx + 1 ? 'bg-orange-500/20' : 'hover:bg-white/5'
              }`}
            >
              <span className="text-blue-200/20 w-4 text-right select-none">{idx + 1}</span>
              <span className={`whitespace-pre ${selectedLine === idx + 1 ? 'text-orange-400' : 'text-blue-100/80'}`}>
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Console / Interaction */}
        <div className="mt-8 flex flex-col gap-4">
          {status === 'idle' ? (
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-blue-200/40 italic flex items-center gap-2">
                <AlertCircle size={12} /> {hint}
              </p>
              <button 
                onClick={handleSquash}
                disabled={!selectedLine}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
              >
                <Play size={12} /> Run_Tests
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border flex items-center gap-4 ${
                status === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
              {status === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <div className="text-xs">
                <p className="font-bold uppercase tracking-widest mb-1">
                  {status === 'success' ? 'Tests Passed!' : 'Runtime Error'}
                </p>
                <p className="opacity-60">
                  {status === 'success' 
                    ? 'Bug squashed. You earned 100 XP.' 
                    : 'The logic is still broken at line ' + selectedLine + '. Try again.'}
                </p>
              </div>
              {status === 'error' && (
                <button 
                  onClick={() => { setStatus('idle'); setSelectedLine(null); }}
                  className="ml-auto text-[10px] font-bold underline"
                >
                  Retry
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugArena;