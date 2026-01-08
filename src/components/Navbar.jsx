import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Gamepad2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A0F1E]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black tracking-tighter">
          <span className="text-orange-500">MIND</span>
          <span className="text-blue-400">VERSE</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium text-xs uppercase tracking-widest">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link to="/archive" className="hover:text-orange-500 transition-colors">Archives</Link>
          <Link to="/jobs" className="hover:text-orange-500 transition-colors">Careers</Link>
          <Link to="/playground" className="hover:text-orange-500 transition-colors flex items-center gap-2">
            <Gamepad2 size={14} className="text-orange-500" /> Playground
          </Link>
          <Link to="/login" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 text-white">
            Join Us
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0A0F1E] border-b border-white/5 p-6 flex flex-col gap-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest">Home</Link>
          <Link to="/archive" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest">Archives</Link>
          <Link to="/jobs" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest">Careers</Link>
          <Link to="/playground" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest text-orange-500">Playground</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="bg-orange-500 text-center py-3 rounded-xl font-bold uppercase tracking-widest">Join Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;