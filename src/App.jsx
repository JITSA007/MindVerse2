import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SoftLock from './components/SoftLock';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Jobs from './pages/Jobs'; 
import Login from './pages/Login'; 
import Playground from './pages/Playground';
import Admin from './pages/Admin'; // New Admin Dashboard

/**
 * MAIN APP: src/App.jsx
 * This central module manages navigation and global elements.
 */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0F1E] text-white selection:bg-orange-500/30 font-sans">
        <CustomCursor />
        <SoftLock />
        <Navbar />
        
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/jobs" element={<Jobs />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/admin" element={<Admin />} /> {/* Admin Route */}
          </Routes>
        </main>

        <button className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg z-50 hover:scale-110 transition-transform flex items-center justify-center shadow-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
        </button>
      </div>
    </Router>
  );
}