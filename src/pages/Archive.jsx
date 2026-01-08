import React, { useState } from 'react';
import MagazineCard from '../components/MagazineCard';
import { Search, Filter } from 'lucide-react';

/**
 * PAGE: src/pages/Archive.jsx
 * This page displays the grid of all past magazine issues.
 * We have updated the import to be more flexible for the build tool.
 */
const Archive = () => {
  // Mock data - this will eventually be fetched from your Firebase Database
  const [magazines] = useState([
    { id: 1, number: 24, title: "The Digital Renaissance", readTime: "12 min", likes: 142, month: "Dec 2025" },
    { id: 2, number: 23, title: "Future of AI in Campus", readTime: "8 min", likes: 89, month: "Nov 2025" },
    { id: 3, number: 22, title: "Mental Health Matters", readTime: "15 min", likes: 210, month: "Oct 2025" },
    { id: 4, number: 21, title: "Sports & Spirit", readTime: "10 min", likes: 67, month: "Sep 2025" },
    { id: 5, number: 20, title: "The Startup Culture", readTime: "20 min", likes: 345, month: "Aug 2025" },
    { id: 6, number: 19, title: "Alumni Success Stories", readTime: "14 min", likes: 112, month: "Jul 2025" },
  ]);

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-12 pb-24 px-6 fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
              MAGAZINE <span className="text-orange-500">ARCHIVE</span>
            </h1>
            <p className="text-blue-200/40 max-w-lg leading-relaxed">
              Explore the creative journey of the CollegeDekho student community through our digital archives.
            </p>
          </div>

          {/* Search and Filter UI */}
          <div className="flex items-center gap-3 bg-[#1E40AF]/5 p-2 rounded-2xl border border-white/5 w-full md:w-auto backdrop-blur-md">
            <div className="flex-grow flex items-center gap-3 px-4">
              <Search size={18} className="text-orange-500" />
              <input 
                type="text" 
                placeholder="Search by title or issue..." 
                className="bg-transparent border-none outline-none text-sm w-full py-2 placeholder:text-blue-200/20"
              />
            </div>
            <button className="bg-orange-500 p-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* The Grid of Magazine Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {magazines.map((mag) => (
            <MagazineCard key={mag.id} issue={mag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archive;