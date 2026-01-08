import React, { useState } from 'react';
import { Trophy, HelpCircle, Check, X } from 'lucide-react';

const TriviaCard = ({ category, question, options, correctIndex }) => {
  const [answer, setAnswer] = useState(null);

  return (
    <div className="bg-[#1E40AF]/5 border border-white/5 rounded-[2rem] p-8 glass-card relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Trophy size={80} />
      </div>

      <div className="mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-8 leading-tight relative z-10">
        <HelpCircle className="inline-block mr-2 text-orange-500" size={24} />
        {question}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 relative z-10">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={answer !== null}
            onClick={() => setAnswer(index)}
            className={`p-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-between ${
              answer === null 
                ? 'border-white/5 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 text-blue-200/60' 
                : index === correctIndex 
                  ? 'border-green-500 bg-green-500/10 text-green-400' 
                  : index === answer 
                    ? 'border-red-500 bg-red-500/10 text-red-400' 
                    : 'border-white/5 bg-white/5 opacity-40'
            }`}
          >
            {option}
            {answer !== null && index === correctIndex && <Check size={16} />}
            {answer !== null && index === answer && index !== correctIndex && <X size={16} />}
          </button>
        ))}
      </div>

      {answer !== null && (
        <div className={`mt-6 text-sm font-bold text-center ${answer === correctIndex ? 'text-green-400' : 'text-red-400'}`}>
          {answer === correctIndex ? "Correct! You've earned 50 points!" : "Almost! Better luck next week."}
        </div>
      )}
    </div>
  );
};

export default TriviaCard;