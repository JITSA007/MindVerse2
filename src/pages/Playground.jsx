import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Bug, Zap, Loader2, AlertCircle, database } from 'lucide-react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import TechStackBattle from '../components/TechStackBattle';
import DebugArena from '../components/DebugArena';

/**
 * PAGE: src/pages/Playground.jsx (The Dev Arena)
 * Updated with robust environment detection and local fallbacks.
 */

// Global Variable Handling with Fallbacks
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const Playground = () => {
  const [challenges, setChallenges] = useState([]);
  const [battles, setBattles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Mock Data for Local Development or Restricted Environments
  const mockChallenges = [{
    id: 'local-1',
    language: 'JavaScript',
    hint: 'Check the operator on line 3.',
    snippet: 'function isEven(n) {\n  // Logical bug below\n  if (n % 2 = 0) {\n    return true;\n  }\n  return false;\n}',
    correctLine: 3
  }];

  const mockBattles = [{
    id: 'local-battle-1',
    topic: 'Preferred State Management for Large React Apps?',
    options: [
      { name: 'Redux Toolkit', votes: 120 },
      { name: 'Zustand', votes: 150 },
      { name: 'React Context', votes: 80 },
      { name: 'Signals', votes: 45 }
    ]
  }];

  useEffect(() => {
    if (!firebaseConfig) {
      // Use mock data if no Firebase config is present
      setChallenges(mockChallenges);
      setBattles(mockBattles);
      setLoading(false);
      return;
    }

    // Initialize Firebase
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth Error:", err);
        // Fallback to mocks on auth failure
        setChallenges(mockChallenges);
        setBattles(mockBattles);
        setLoading(false);
      }
    };

    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !firebaseConfig) return;

    const db = getFirestore(getApp());

    // Sync Bug Squash
    const unsubC = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'challenges'), 
      s => setChallenges(s.docs.length > 0 ? s.docs.map(d => ({id: d.id, ...d.data()})) : mockChallenges),
      e => { console.error(e); setChallenges(mockChallenges); }
    );
    
    // Sync Stack Battles
    const unsubB = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'battles'), 
      s => {
        setBattles(s.docs.length > 0 ? s.docs.map(d => ({id: d.id, ...d.data()})) : mockBattles);
        setLoading(false);
      },
      e => { console.error(e); setBattles(mockBattles); setLoading(false); }
    );

    return () => { unsubC(); unsubB(); };
  }, [user]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-12 pb-24 px-6 fade-in font-mono">
      <div className="max-w-7xl mx-auto">
        {!firebaseConfig && (
          <div className="mb-8 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-center gap-3 text-blue-400 text-[10px] uppercase tracking-widest">
            <AlertCircle size={14} />
            <span>Local Sandbox Mode: Running with pre-loaded dev challenges</span>
          </div>
        )}

        <header className="mb-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4 text-orange-500">
              <Terminal size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">System.initialize("Dev_Arena")</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
              DEV <span className="text-orange-500">ARENA</span>
            </h1>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tech Stack Battles */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Zap className="text-orange-500" size={24} />
              <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400">Stack_Overflow_Battle</h2>
            </div>
            <div className="space-y-8">
              {battles.map(battle => (
                <TechStackBattle key={battle.id} topic={battle.topic} options={battle.options} />
              ))}
            </div>
          </section>

          {/* Debug Arena */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Bug className="text-blue-500" size={24} />
              <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400">Bug_Squash_v1.0</h2>
            </div>
            <div className="space-y-12">
              {challenges.map(challenge => (
                <DebugArena 
                  key={challenge.id} 
                  language={challenge.language} 
                  snippet={challenge.snippet} 
                  hint={challenge.hint} 
                  correctLine={parseInt(challenge.correctLine)} 
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Playground;