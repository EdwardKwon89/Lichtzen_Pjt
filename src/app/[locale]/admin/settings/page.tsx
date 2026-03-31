"use client";

import { useState } from "react";
import { updateAdminProfile } from "@/app/actions/admin-auth";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, User, Lock, Save, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [newId, setNewId] = useState("");
  const [newPw, setNewPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "success", text: "" });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId || !newPw) return;

    setLoading(true);
    setMessage({ type: "success", text: "" });

    const result = await updateAdminProfile(newId, newPw);

    if (result.success) {
      setMessage({ type: "success", text: "Administrator profile updated successfully." });
      setNewId("");
      setNewPw("");
    } else {
      setMessage({ type: "error", text: result.error || "Update failed." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex justify-between items-end pb-8 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-tighter">Security Settings</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Configure your administrator identity and security keys.</p>
        </div>
        <Link 
          href={`/${locale}/admin/inquiries`}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-500 hover:text-white transition-all border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </header>

      <section className="bg-white/5 border border-white/5 rounded-[32px] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-32 h-32 text-brand-cyan" />
        </div>

        <form onSubmit={handleUpdate} className="space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">New Administrator ID</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-cyan transition-colors" />
                <input 
                  required
                  type="text"
                  placeholder="Enter new login ID"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">New Security Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-violet transition-colors" />
                <input 
                  required
                  type="password"
                  placeholder="Enter new security key"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all"
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {message.text && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "p-4 rounded-xl flex items-center gap-3 text-xs font-bold ring-1",
                  message.type === "success" ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" : "bg-red-500/10 text-red-500 ring-red-500/20"
                )}
              >
                {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            disabled={loading || !newId || !newPw}
            className="w-full bg-white hover:bg-slate-200 disabled:opacity-20 disabled:cursor-not-allowed text-black font-extrabold py-5 rounded-2xl transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 group"
          >
            {loading ? "Syncing..." : "Update Security Credentials"}
            {!loading && <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-mono text-slate-600 tracking-tighter uppercase">
              Caution: Profile update will invalidate existing session keys .
            </p>
        </div>
      </section>
    </div>
  );
}
