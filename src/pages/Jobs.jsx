import React, { useState } from 'react';
import JobCard from '../components/JobCard.jsx';
import { Search, MapPin, Briefcase } from 'lucide-react';

/**
 * PAGE: src/pages/Jobs.jsx
 * This page acts as the Career Board for students.
 * We have updated the import to JobCard.jsx to ensure the system finds the file.
 */
const Jobs = () => {
  // Mock data - this will eventually be dynamic from Firebase
  const [jobListings] = useState([
    { id: 1, role: "UI/UX Design Intern", company: "CollegeDekho Tech", type: "Internship", location: "Remote", postedDate: "2 days ago" },
    { id: 2, role: "Content Strategy Lead", company: "MindVerse Media", type: "Full-Time", location: "New Delhi", postedDate: "5 days ago" },
    { id: 3, role: "Junior Web Developer", company: "EduSphere", type: "Full-Time", location: "Bangalore", postedDate: "1 week ago" },
    { id: 4, role: "Marketing Intern", company: "Creative Souls", type: "Internship", location: "Mumbai", postedDate: "3 days ago" },
  ]);

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-12 pb-24 px-6 fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Career <span className="text-orange-500">Board</span>
          </h1>
          <p className="text-blue-200/40 max-w-xl leading-relaxed">
            Curated opportunities specifically for the CollegeDekho student community. Build your career with industry leaders.
          </p>
        </div>

        {/* Search and Filter UI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="md:col-span-2 bg-white/5 rounded-2xl border border-white/5 flex items-center px-4 hover:border-orange-500/30 transition-colors">
            <Search size={18} className="text-orange-500 mr-3" />
            <input 
              type="text" 
              placeholder="Search roles or companies..." 
              className="bg-transparent border-none outline-none py-4 text-sm w-full text-white placeholder:text-blue-200/20" 
            />
          </div>
          
          <div className="bg-white/5 rounded-2xl border border-white/5 flex items-center px-4">
            <MapPin size={18} className="text-blue-500 mr-3" />
            <select className="bg-transparent border-none outline-none py-4 text-sm w-full text-blue-200/60 cursor-pointer">
              <option className="bg-[#0A0F1E]">All Locations</option>
              <option className="bg-[#0A0F1E]">Remote</option>
              <option className="bg-[#0A0F1E]">On-Campus</option>
            </select>
          </div>
          
          <div className="bg-white/5 rounded-2xl border border-white/5 flex items-center px-4">
            <Briefcase size={18} className="text-blue-500 mr-3" />
            <select className="bg-transparent border-none outline-none py-4 text-sm w-full text-blue-200/60 cursor-pointer">
              <option className="bg-[#0A0F1E]">All Types</option>
              <option className="bg-[#0A0F1E]">Internship</option>
              <option className="bg-[#0A0F1E]">Full-Time</option>
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobListings.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;