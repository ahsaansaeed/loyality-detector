"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LucideShieldAlert, LucideCrown, LucideArrowRight } from "lucide-react";

export default function Home() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const router = useRouter();

  const [stats, setStats] = useState({ total: 0, snakes: 0 });

  useEffect(() => {
    fetch("/api/leaderboard").then(res => res.json()).then(data => {
      if (data.success) {
        setStats({ total: data.totalParticipants, snakes: data.stats.snakesCount });
      }
    });
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rollNumber) return;
    
    // Store user info in localStorage for the quiz session
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_roll", rollNumber);
    
    router.push("/quiz");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />

      <div className="max-w-md w-full glass rounded-3xl p-8 space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4 animate-slither">
            <LucideShieldAlert className="w-12 h-12 text-emerald-500" />
            <LucideCrown className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            SE Student <span className="text-emerald-500">Loyalty</span> Test
          </h1>
          <p className="text-slate-400 text-lg">
            "Are you a <span className="text-emerald-400 font-bold">Snake 🐍</span> or a <span className="text-purple-400 font-bold">Legend 💙</span>? Let's find out..."
          </p>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Ahsaan Saeed"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white placeholder:text-slate-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Roll Number</label>
            <input
              required
              type="text"
              placeholder="e.g. 2024-SE-001"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-slate-500"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-purple-500/20"
          >
            Start Test
            <LucideArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="pt-6 border-t border-slate-800 space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 glass p-3 rounded-2xl text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tested</p>
              <p className="text-xl font-black text-white">{stats.total}</p>
            </div>
            <div className="flex-1 glass p-3 rounded-2xl text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Snakes</p>
              <p className="text-xl font-black text-emerald-500">{stats.snakes}</p>
            </div>
          </div>
          
          <Link 
            href="/leaderboard"
            className="flex items-center justify-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-medium group"
          >
            View Leaderboard
            <LucideArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <p className="text-center text-[10px] text-slate-600 pt-2 uppercase tracking-widest">
          Session 2024–2028 • Built for fun 🐍
        </p>
      </div>
    </main>
  );
}
