"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  LucideTrophy, 
  LucideShieldAlert, 
  LucideCrown, 
  LucideHome, 
  LucideUsers,
  LucideArrowLeft
} from "lucide-react";

export default function Leaderboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const result = await response.json();
        if (result.success) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-[#0f172a]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-2">
              <LucideArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-black text-white flex items-center gap-3">
              <LucideTrophy className="text-yellow-500" />
              Batch Leaderboard
            </h1>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="glass px-6 py-3 rounded-2xl text-center">
              <p className="text-xs text-slate-400 uppercase font-bold">Students</p>
              <p className="text-2xl font-black text-white">{data?.totalParticipants}</p>
            </div>
            <div className="glass px-6 py-3 rounded-2xl text-center">
              <p className="text-xs text-slate-400 uppercase font-bold">Snakes 🐍</p>
              <p className="text-2xl font-black text-emerald-500">{data?.stats.snakesCount}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Loyals */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xl px-2">
              <LucideCrown className="w-6 h-6" />
              Top Legends 💙
            </div>
            <div className="glass rounded-3xl overflow-hidden border border-purple-500/20">
              {data?.topLoyals.map((user: any, index: number) => (
                <div 
                  key={user.rollNumber}
                  className={`flex items-center justify-between p-4 border-b border-slate-800 last:border-0 ${index === 0 ? "bg-purple-500/10" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index < 3 ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-100">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{user.rollNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-purple-400">{user.loyaltyScore}</p>
                    <p className="text-[8px] text-slate-600 uppercase font-bold">Pts</p>
                  </div>
                </div>
              ))}
              {data?.topLoyals.length === 0 && (
                <div className="p-8 text-center text-slate-500">No legends found yet...</div>
              )}
            </div>
          </div>

          {/* Top Snakes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl px-2">
              <LucideShieldAlert className="w-6 h-6" />
              Top Snakes 🐍
            </div>
            <div className="glass rounded-3xl overflow-hidden border border-emerald-500/20">
              {data?.topSnakes.map((user: any, index: number) => (
                <div 
                  key={user.rollNumber}
                  className={`flex items-center justify-between p-4 border-b border-slate-800 last:border-0 ${index === 0 ? "bg-emerald-500/10" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index < 3 ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-100">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{user.rollNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-emerald-400">{user.snakeScore}</p>
                    <p className="text-[8px] text-slate-600 uppercase font-bold">Pts</p>
                  </div>
                </div>
              ))}
              {data?.topSnakes.length === 0 && (
                <div className="p-8 text-center text-slate-500">No snakes detected yet...</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-slate-600 text-xs py-4">
          Updated in real-time • Session 2024–2028
        </p>
      </div>
    </main>
  );
}
