import React, { useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { 
  ShieldCheck, Bug, Zap, Plus, Trash2, Play, 
  Terminal as TerminalIcon, Trophy, Megaphone, 
  Briefcase, MapPin, Loader2, Send, LayoutDashboard,
  Code2, Activity, AlertTriangle
} from 'lucide-react';

/**
 * PAGE: src/pages/Admin.jsx
 * Admin dashboard for managing Dev Arena content, News Tickers, and Job Listings.
 */

// 1. MANUAL CONFIGURATION (Fill this to remove restricted mode)
const LOCAL_CONFIG = {
  apiKey: "", // Paste your Firebase API Key here
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// 2. Safe extraction of environment variables
const getEnvConfig = () => {
  try {
    // Priority 1: Environment Injection
    if (typeof __firebase_config !== 'undefined' && __firebase_config) {
      return JSON.parse(__firebase_config);
    }
    // Priority 2: Manual Config (if API key is present)
    if (LOCAL_CONFIG.apiKey) {
      return LOCAL_CONFIG;
    }
  } catch (e) {
    console.error("Failed to parse firebase config", e);
  }
  return null;
};

const firebaseConfig = getEnvConfig();
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [challenges, setChallenges] = useState([]);
  const [battles, setBattles] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [bugForm, setBugForm] = useState({ language: 'JavaScript', snippet: '', hint: '', correctLine: '' });
  const [battleForm, setBattleForm] = useState({ topic: '', options: '' });
  const [newsForm, setNewsForm] = useState({ text: '' });
  const [jobForm, setJobForm] = useState({ role: '', company: '', type: 'Internship', location: 'Remote' });
  
  const [sandboxCode, setSandboxCode] = useState('console.log("Kernel Check: Online");');
  const [terminalOutput, setTerminalOutput] = useState([]);

  const hasConfig = firebaseConfig && firebaseConfig.apiKey;

  useEffect(() => {
    if (!hasConfig) {
      setLoading(false);
      return;
    }

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
        console.error("Auth failed", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [hasConfig]);

  useEffect(() => {
    if (!user || !hasConfig) return;
    const db = getFirestore(getApp());

    const unsubC = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'challenges'), 
      s => setChallenges(s.docs.map(d => ({id: d.id, ...d.data()}))),
      e => console.error("Firestore Error:", e)
    );

    const unsubB = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'battles'), 
      s => setBattles(s.docs.map(d => ({id: d.id, ...d.data()}))),
      e => console.error("Firestore Error:", e)
    );

    const unsubN = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'ticker'), 
      s => setNewsItems(s.docs.map(d => ({id: d.id, ...d.data()}))),
      e => console.error("Firestore Error:", e)
    );

    const unsubJ = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'jobs'), 
      s => setJobs(s.docs.map(d => ({id: d.id, ...d.data()}))),
      e => console.error("Firestore Error:", e)
    );

    const unsubL = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'leaderboard'), 
      s => {
        const data = s.docs.map(d => ({id: d.id, ...d.data()}));
        setLeaderboard(data.sort((a, b) => b.xp - a.xp));
        setLoading(false);
      },
      e => console.error("Firestore Error:", e)
    );

    return () => { unsubC(); unsubB(); unsubN(); unsubJ(); unsubL(); };
  }, [user, hasConfig]);

  const handlePush = async (col, data, setForm, initialForm) => {
    if (!user || !hasConfig) return;
    const db = getFirestore(getApp());
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', col), data);
    setForm(initialForm);
  };

  const deleteItem = async (col, id) => {
    if (!user || !hasConfig) return;
    const db = getFirestore(getApp());
    await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', col, id));
  };

  const runSandbox = () => {
    const logs = [];
    const customConsole = { log: (...args) => logs.push({ type: 'log', text: args.join(' ') }) };
    try {
      new Function('console', sandboxCode)(customConsole);
    } catch (err) {
      logs.push({ type: 'error', text: err.message });
    }
    setTerminalOutput(logs);
  };

  const tabs = [
    { id: 'overview', label: 'System Overview', icon: LayoutDashboard },
    { id: 'news', label: 'News Ticker', icon: Megaphone },
    { id: 'arena', label: 'Dev Arena', icon: Code2 },
    { id: 'careers', label: 'Careers', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-12 pb-24 px-6 font-mono selection:bg-orange-500/30 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3 uppercase">
              <ShieldCheck className="text-orange-500" /> Admin_Panel
            </h1>
            <p className="text-[10px] text-blue-200/20 uppercase tracking-[0.3em] mt-2">
              Status: {!hasConfig ? 'Offline_Mode' : user ? 'Connected_to_Node' : 'Authenticating...'}
            </p>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/5 text-[10px] text-blue-400">
            SECURE_SHELL: {appId.substring(0, 12)}...
          </div>
        </header>

        {/* Global Warning for Missing Config */}
        {!hasConfig && (
          <div className="mb-8 bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl flex items-center gap-4 text-orange-500 animate-pulse">
            <AlertTriangle size={32} />
            <div>
              <h3 className="font-bold uppercase tracking-tighter">Environment Configuration Missing</h3>
              <p className="text-[10px] opacity-70 uppercase tracking-widest">
                To enable real-time sync, paste your Firebase keys in the <code className="text-white bg-white/10 px-1 rounded">LOCAL_CONFIG</code> object at the top of this file.
              </p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 p-1.5 bg-white/5 rounded-2xl w-fit border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${
                activeTab === tab.id 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                  : 'text-blue-200/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="fade-in">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400 uppercase tracking-widest">
                    <Activity size={20} /> System_Activity
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                      <span className="text-[10px] uppercase text-blue-200/20 block mb-2">Deployed_Bugs</span>
                      <span className="text-3xl font-black text-orange-500">{challenges.length}</span>
                    </div>
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                      <span className="text-[10px] uppercase text-blue-200/20 block mb-2">Active_Jobs</span>
                      <span className="text-3xl font-black text-blue-500">{jobs.length}</span>
                    </div>
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                      <span className="text-[10px] uppercase text-blue-200/20 block mb-2">Leaderboard_Total</span>
                      <span className="text-3xl font-black text-green-500">{leaderboard.length}</span>
                    </div>
                  </div>
                </section>
                
                <section className="bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                      <TerminalIcon size={14} /> Sandbox_v1.0
                    </span>
                    <button onClick={runSandbox} className="bg-green-500/20 text-green-400 px-4 py-1 rounded-md text-[10px] font-bold hover:bg-green-500/30">Run_Test</button>
                  </div>
                  <textarea 
                    className="w-full h-40 bg-transparent p-6 text-sm font-mono text-blue-100 outline-none resize-none" 
                    value={sandboxCode} 
                    onChange={(e) => setSandboxCode(e.target.value)} 
                    spellCheck="false" 
                  />
                  {terminalOutput.length > 0 && (
                    <div className="bg-black/80 p-6 border-t border-white/5 max-h-40 overflow-y-auto font-mono text-[9px]">
                      {terminalOutput.map((log, i) => (
                        <div key={i} className={log.type === 'error' ? 'text-red-400' : 'text-green-400'}>{"> "}{log.text}</div>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              <section className="bg-[#1E40AF]/5 border border-white/5 rounded-3xl p-6">
                <h2 className="text-sm font-bold mb-6 flex items-center gap-2 text-orange-500 uppercase tracking-widest">
                  <Trophy size={16} /> Leaderboard
                </h2>
                <div className="space-y-3">
                  {leaderboard.slice(0, 10).map((player, idx) => (
                    <div key={player.id} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 group">
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] font-mono text-blue-200/20">#{idx + 1}</span>
                        <span className="text-[10px] font-bold truncate max-w-[100px]">{player.username || 'Anon'}</span>
                      </div>
                      <span className="text-[10px] font-mono text-orange-500">{player.xp} XP</span>
                    </div>
                  ))}
                  {leaderboard.length === 0 && <p className="text-[10px] text-blue-200/20 italic text-center py-4 uppercase">Waiting for sync...</p>}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="max-w-3xl space-y-8">
              <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400 uppercase tracking-widest">
                  <Megaphone size={20} /> News_Ticker_Editor
                </h2>
                <form 
                  onSubmit={(e) => { e.preventDefault(); handlePush('ticker', newsForm, setNewsForm, { text: '' }); }} 
                  className="flex gap-4 mb-8"
                >
                  <input 
                    className="flex-grow bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:border-orange-500 outline-none transition-all" 
                    placeholder="New announcement..." 
                    value={newsForm.text} 
                    onChange={e => setNewsForm({ text: e.target.value })} 
                  />
                  <button disabled={!user} className="bg-orange-500 px-8 rounded-xl font-bold text-xs uppercase hover:bg-orange-600 shadow-lg shadow-orange-500/20 disabled:opacity-30 transition-all">Broadcast</button>
                </form>
                
                <h3 className="text-[10px] uppercase text-blue-200/20 mb-4 tracking-widest">Active_Broadcasts</h3>
                <div className="space-y-2">
                  {newsItems.map(item => (
                    <div key={item.id} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                      <span className="text-sm text-blue-200/80">{item.text}</span>
                      <button onClick={() => deleteItem('ticker', item.id)} className="text-red-500/40 hover:text-red-500 transition-colors p-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {newsItems.length === 0 && <p className="text-[10px] text-blue-200/20 italic py-4 uppercase">No active items</p>}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'arena' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-blue-400 uppercase">
                  <Bug size={18} /> Bug_Squash_Deployment
                </h2>
                <form onSubmit={(e) => { e.preventDefault(); handlePush('challenges', bugForm, setBugForm, { language: 'JavaScript', snippet: '', hint: '', correctLine: '' }); }} className="space-y-4">
                  <input className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:border-orange-500 outline-none" placeholder="Language (e.g. Python)" value={bugForm.language} onChange={e => setBugForm({...bugForm, language: e.target.value})} />
                  <textarea className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs h-32 font-mono focus:border-orange-500 outline-none" placeholder="Insert buggy code snippet..." value={bugForm.snippet} onChange={e => setBugForm({...bugForm, snippet: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs outline-none" placeholder="Hint" value={bugForm.hint} onChange={e => setBugForm({...bugForm, hint: e.target.value})} />
                    <input className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs outline-none" placeholder="Target Line #" type="number" value={bugForm.correctLine} onChange={e => setBugForm({...bugForm, correctLine: e.target.value})} />
                  </div>
                  <button disabled={!user} className="w-full bg-blue-600 py-4 rounded-xl font-bold text-xs uppercase shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all disabled:opacity-30">Push_To_Arena</button>
                </form>
              </section>

              <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-orange-500 uppercase">
                  <Zap size={18} /> Tech_Stack_Battle
                </h2>
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  const options = battleForm.options.split(',').map(o => ({ name: o.trim(), votes: 0 }));
                  handlePush('battles', { topic: battleForm.topic, options }, setBattleForm, { topic: '', options: '' });
                }} className="space-y-4">
                  <input className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:border-orange-500 outline-none" placeholder="Debate Topic?" value={battleForm.topic} onChange={e => setBattleForm({...battleForm, topic: e.target.value})} />
                  <textarea className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs h-32 focus:border-orange-500 outline-none" placeholder="Options (e.g. Java, Python, C++)" value={battleForm.options} onChange={e => setBattleForm({...battleForm, options: e.target.value})} />
                  <button disabled={!user} className="w-full bg-orange-500 py-4 rounded-xl font-bold text-xs uppercase shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all disabled:opacity-30">Initiate_Battle</button>
                </form>
              </section>
            </div>
          )}

          {activeTab === 'careers' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400 uppercase tracking-widest">
                    <Briefcase size={20} /> Career_Manager
                  </h2>
                  <form onSubmit={(e) => { 
                    e.preventDefault(); 
                    handlePush('jobs', { ...jobForm, postedDate: 'Just Now' }, setJobForm, { role: '', company: '', type: 'Internship', location: 'Remote' }); 
                  }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs focus:border-orange-500 outline-none" placeholder="Role Title" value={jobForm.role} onChange={e => setJobForm({...jobForm, role: e.target.value})} />
                    <input className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs focus:border-orange-500 outline-none" placeholder="Company Name" value={jobForm.company} onChange={e => setJobForm({...jobForm, company: e.target.value})} />
                    <select className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-blue-200 outline-none" value={jobForm.type} onChange={e => setJobForm({...jobForm, type: e.target.value})}>
                      <option>Internship</option>
                      <option>Full-Time</option>
                      <option>Freelance</option>
                    </select>
                    <input className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs focus:border-orange-500 outline-none" placeholder="Location" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} />
                    <button disabled={!user} className="md:col-span-2 bg-blue-600 py-4 rounded-xl font-bold text-xs uppercase hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all disabled:opacity-30">Post Opportunity</button>
                  </form>
                </section>
              </div>

              <section className="bg-white/5 p-6 rounded-3xl border border-white/5 overflow-hidden">
                <h3 className="text-[10px] font-black uppercase text-blue-400 mb-6 tracking-[0.2em]">Active_Listings</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                      <div className="max-w-[150px]">
                        <p className="text-[10px] font-bold truncate">{job.role}</p>
                        <p className="text-[8px] opacity-40 uppercase tracking-widest">{job.company}</p>
                      </div>
                      <button onClick={() => deleteItem('jobs', job.id)} className="text-red-500/40 hover:text-red-500 transition-colors p-2">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {jobs.length === 0 && <p className="text-[10px] text-blue-200/20 italic py-4 uppercase">No active listings</p>}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;