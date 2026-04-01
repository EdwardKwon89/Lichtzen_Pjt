"use client";

import { useState, useEffect } from "react";
import { updateAdminProfile, createAdminAccount, checkAdminAuth } from "@/app/actions/admin-auth";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, User, Lock, Save, ArrowLeft, CheckCircle2, AlertCircle, UserPlus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [currentId, setCurrentId] = useState<string | null>(null);
  
  // Profile update state
  const [newPw, setNewPw] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "success", text: "" });

  // New account state
  const [createId, setCreateId] = useState("");
  const [createPw, setCreatePw] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createMessage, setCreateMessage] = useState({ type: "success", text: "" });

  useEffect(() => {
    const fetchId = async () => {
      const id = await checkAdminAuth();
      setCurrentId(id);
    };
    fetchId();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentId || !newPw) return;

    setUpdateLoading(true);
    setUpdateMessage({ type: "success", text: "" });

    const result = await updateAdminProfile(currentId, newPw);

    if (result.success) {
      setUpdateMessage({ type: "success", text: "Your password has been updated successfully." });
      setNewPw("");
    } else {
      setUpdateMessage({ type: "error", text: result.error || "Update failed." });
    }
    setUpdateLoading(false);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createId || !createPw) return;

    setCreateLoading(true);
    setCreateMessage({ type: "success", text: "" });

    const result = await createAdminAccount(createId, createPw);

    if (result.success) {
      setCreateMessage({ type: "success", text: `Account "${createId}" created successfully.` });
      setCreateId("");
      setCreatePw("");
    } else {
      setCreateMessage({ type: "error", text: result.error || "Creation failed." });
    }
    setCreateLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex justify-between items-end pb-8 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-tighter">Admin Security</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Manage credentials and administrator accounts.</p>
        </div>
        <Link 
          href={`/${locale}/admin/inquiries`}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-500 hover:text-white transition-all border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 1: Update My Password */}
        <section className="bg-white/5 border border-white/5 rounded-[32px] p-8 backdrop-blur-xl relative overflow-hidden flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-brand-violet/10 rounded-2xl">
              <Lock className="w-6 h-6 text-brand-violet" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Change My Password</h2>
              <p className="text-xs text-slate-500 mt-1">Logged in as: <span className="text-brand-violet font-mono">{currentId}</span></p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-6 flex-1">
            <div className="space-y-3">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-violet transition-colors" />
                <input 
                  required
                  type="password"
                  placeholder="Enter new password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all"
                />
              </div>
            </div>

            <AnimatePresence>
              {updateMessage.text && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "p-4 rounded-xl flex items-center gap-3 text-xs font-bold ring-1",
                    updateMessage.type === "success" ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" : "bg-red-500/10 text-red-500 ring-red-500/20"
                  )}
                >
                  {updateMessage.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {updateMessage.text}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              disabled={updateLoading || !newPw}
              className="w-full bg-brand-violet hover:bg-brand-violet/80 disabled:opacity-20 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 mt-auto"
            >
              {updateLoading ? "Updating..." : "Update Password"}
              {!updateLoading && <Save className="w-4 h-4" />}
            </button>
          </form>
        </section>

        {/* Section 2: Create New Admin */}
        <section className="bg-white/5 border border-white/5 rounded-[32px] p-8 backdrop-blur-xl relative overflow-hidden flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-brand-cyan/10 rounded-2xl">
              <UserPlus className="w-6 h-6 text-brand-cyan" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add New Admin</h2>
              <p className="text-xs text-slate-500 mt-1">Register a new administrator account.</p>
            </div>
          </div>

          <form onSubmit={handleCreateAccount} className="space-y-6 flex-1">
            <div className="space-y-3">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">New Admin ID</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-cyan transition-colors" />
                <input 
                  required
                  type="text"
                  placeholder="e.g., edward.kwon"
                  value={createId}
                  onChange={(e) => setCreateId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">Temporary Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-cyan transition-colors" />
                <input 
                  required
                  type="password"
                  placeholder="Enter temporary password"
                  value={createPw}
                  onChange={(e) => setCreatePw(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                />
              </div>
            </div>

            <AnimatePresence>
              {createMessage.text && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "p-4 rounded-xl flex items-center gap-3 text-xs font-bold ring-1",
                    createMessage.type === "success" ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" : "bg-red-500/10 text-red-500 ring-red-500/20"
                  )}
                >
                  {createMessage.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {createMessage.text}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              disabled={createLoading || !createId || !createPw}
              className="w-full bg-white hover:bg-slate-200 disabled:opacity-20 disabled:cursor-not-allowed text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 mt-auto"
            >
              {createLoading ? "Creating..." : "Create Admin Account"}
              {!createLoading && <UserPlus className="w-4 h-4" />}
            </button>
          </form>
        </section>
      </div>

      <footer className="pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-mono text-slate-600 tracking-tighter uppercase">
            Security policy: Each administrator is only permitted to modify their own credentials.
          </p>
      </footer>
    </div>
  );
}
