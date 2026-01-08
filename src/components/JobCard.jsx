import React from 'react';
import { Briefcase, MapPin, ExternalLink, Calendar } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="group bg-[#1E40AF]/5 border border-white/5 p-6 rounded-2xl hover:border-orange-500/50 transition-all duration-500 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/5 blur-3xl group-hover:bg-orange-500/10 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-600/20 p-3 rounded-xl border border-blue-500/20 text-blue-400 group-hover:text-orange-500 transition-colors">
            <Briefcase size={24} />
          </div>
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
            job.type === 'Internship' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-400'
          }`}>
            {job.type}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">
          {job.role}
        </h3>
        <p className="text-blue-200/60 font-medium mb-4">{job.company}</p>

        <div className="space-y-2 mb-6 text-sm text-blue-200/40">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-orange-500" />
            {job.location}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-orange-500" />
            Posted {job.postedDate}
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all border border-white/5 hover:border-orange-500 group-hover:shadow-lg group-hover:shadow-orange-500/20">
          View Details
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;