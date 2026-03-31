"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/actions/admin-auth";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginAdmin(id, pw);

      if (result.success) {
        // 클라이언트 캐시 데드락을 방지하기 위해 강제 새로고침 리다이렉트 사용
        window.location.href = `/${locale}/admin/inquiries`;
      } else {
        setError(result.error || "ID 또는 비밀번호가 틀렸습니다.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Login client error:", err);
      setError("로그인 처리 중 예상치 못한 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-violet/10 via-transparent to-brand-cyan/10 opacity-30 pointer-events-none" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-brand-violet rounded-full blur-[120px]" 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-2xl">
            <ShieldCheck className="w-8 h-8 text-brand-cyan" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-tighter">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-3 font-medium">Lichtzen Management Intelligence System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-cyan transition-colors" />
            <input 
              required
              type="text"
              placeholder="Administrator ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-violet transition-colors" />
            <input 
              required
              type="password"
              placeholder="Security Key"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet/50 transition-all placeholder:text-slate-600"
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-bold"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </motion.div>
          )}

          <button 
            disabled={loading}
            className="w-full bg-white hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/5"
          >
            {loading ? "Authenticating..." : "Authorize Access"}
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] font-mono text-slate-600 tracking-widest uppercase">
          &copy; 2026 Lichtzen Home . All Rights Reserved .
        </p>
      </motion.div>
    </div>
  );
}
