import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-12 bg-[#0A0F1E] fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#1E40AF]/5 border border-white/5 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        {/* Glow Accents */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />

        <div className="relative z-10 text-center mb-8">
          <h2 className="text-3xl font-black tracking-tighter mb-2">
            {isLogin ? 'WELCOME ' : 'JOIN '} 
            <span className="text-orange-500">BACK</span>
          </h2>
          <p className="text-blue-200/40 text-sm">
            {isLogin ? 'Enter your credentials to access MindVerse' : 'Create your student profile to join the community'}
          </p>
        </div>

        <form className="space-y-4 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-blue-400 ml-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-blue-200/20" size={18} />
              <input 
                type="email" 
                placeholder="name@college.edu" 
                className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-orange-500/50 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-blue-400 ml-1">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-blue-200/20" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-orange-500/50 outline-none transition-all"
              />
            </div>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-6">
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-200/40 text-sm hover:text-orange-500 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;