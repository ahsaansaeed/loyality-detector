"use client";

import { useState, useEffect } from "react";
import { LucideTrash2, LucideLock, LucideUsers, LucideDownload } from "lucide-react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin?password=${password}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        setIsAuthorized(true);
      } else {
        alert("Wrong Password!");
      }
    } catch (err) {
      alert("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    try {
      const res = await fetch(`/api/admin?password=${password}&id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setData(data.filter(user => user._id !== id));
      }
    } catch (err) {
      alert("Error deleting entry");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
        <div className="max-w-md w-full glass p-8 rounded-3xl space-y-6 text-center">
          <LucideLock className="w-16 h-16 text-emerald-500 mx-auto" />
          <h1 className="text-3xl font-black text-white">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all"
            >
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <LucideUsers className="text-emerald-500" />
            Control Panel
          </h1>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Total Entries</p>
            <p className="text-3xl font-black text-white">{data.length}</p>
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden border border-slate-800 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <th className="p-4 border-b border-slate-800">Student Name</th>
                <th className="p-4 border-b border-slate-800">Roll Number</th>
                <th className="p-4 border-b border-slate-800 text-center">Snake Score</th>
                <th className="p-4 border-b border-slate-800 text-center">Loyalty Score</th>
                <th className="p-4 border-b border-slate-800">Verdict</th>
                <th className="p-4 border-b border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {data.map((user) => (
                <tr key={user._id} className="hover:bg-slate-800/30 border-b border-slate-800/50 last:border-0 transition-colors">
                  <td className="p-4 font-bold text-white">{user.name}</td>
                  <td className="p-4 font-mono text-xs">{user.rollNumber}</td>
                  <td className="p-4 text-center font-black text-emerald-500">{user.snakeScore}</td>
                  <td className="p-4 text-center font-black text-purple-500">{user.loyaltyScore}</td>
                  <td className="p-4">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${user.result.includes('Snake') ? 'bg-emerald-900/30 text-emerald-400' : 'bg-purple-900/30 text-purple-400'}`}>
                      {user.result}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                      title="Delete Entry"
                    >
                      <LucideTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="p-20 text-center text-slate-500">
              No entries found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
