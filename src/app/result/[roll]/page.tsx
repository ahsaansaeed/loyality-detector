"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LucideShieldAlert, 
  LucideCrown, 
  LucideShare2, 
  LucideHome, 
  LucideTrendingUp,
  LucideSkull
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Result() {
  const { roll } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/result?roll=${roll}`);
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
          if (result.data.result === "Loyal Legend 💙") {
            triggerConfetti();
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roll, router]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#7c3aed", "#10b981", "#ffffff"]
    });
  };

  const handleShare = () => {
    const text = `🐍 SE Snake Detector Result 🐍\n\nName: ${data.name}\nResult: ${data.result}\n\nSnake Score: ${data.snakeScore}/10\nLoyalty Score: ${data.loyaltyScore}/10\n\nTake the test yourself 👇\n${window.location.origin}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!data) return null;

  const isSnake = data.result === "Certified Snake 😈";

  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center relative overflow-hidden bg-[#0f172a]">
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] blur-[120px] rounded-full opacity-20 ${isSnake ? "bg-emerald-900" : "bg-purple-900"}`} />

      <div className="max-w-md w-full glass rounded-3xl p-8 space-y-8 relative z-10 border-t-4 shadow-2xl overflow-hidden" 
           style={{ borderColor: isSnake ? "#10b981" : "#7c3aed" }}>
        
        {/* Badge Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`p-6 rounded-full bg-slate-900/80 border-2 ${isSnake ? "border-emerald-500/50" : "border-purple-500/50"}`}>
              {isSnake ? (
                <LucideShieldAlert className="w-20 h-20 text-emerald-500 animate-pulse" />
              ) : (
                <LucideCrown className="w-20 h-20 text-purple-500 animate-bounce" />
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-slate-400 font-medium tracking-widest uppercase text-xs">Official Verdict</h2>
            <h1 className={`text-4xl font-black italic tracking-tighter ${isSnake ? "text-emerald-500" : "text-purple-500"}`}>
              {data.result}
            </h1>
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-slate-500 text-xs font-bold uppercase">Name</p>
              <p className="text-xl font-bold text-white leading-none">{data.name}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-slate-500 text-xs font-bold uppercase">Roll No</p>
              <p className="text-lg font-mono text-slate-300 leading-none">{data.rollNumber}</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-emerald-400">Snake Energy</span>
                <span className="text-slate-400">{data.snakeScore}/10</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" 
                  style={{ width: `${(data.snakeScore / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-purple-400">Loyalty Level</span>
                <span className="text-slate-400">{data.loyaltyScore}/10</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 shadow-[0_0_10px_#7c3aed]" 
                  style={{ width: `${(data.loyaltyScore / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Meme Message */}
        <div className="text-center bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 italic text-slate-300">
          {isSnake ? (
            <p>"Saanp nikla tu toh 🐍... Bro really chose violence every time 💀"</p>
          ) : (
            <p>"Certified Real One™ — You're the friend everyone deserves but few have 👑"</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 group"
          >
            <LucideShare2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Share
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all border border-slate-700"
          >
            <LucideHome className="w-5 h-5" />
            Restart
          </Link>
        </div>

        <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest pt-2">
          Verified Result • SE Session 2024–2028
        </p>
      </div>

      {/* Decorative Icons */}
      {isSnake ? (
        <LucideSkull className="absolute -bottom-10 -left-10 w-40 h-40 text-emerald-900/10 -rotate-12" />
      ) : (
        <LucideCrown className="absolute -bottom-10 -left-10 w-40 h-40 text-purple-900/10 -rotate-12" />
      )}
    </main>
  );
}
