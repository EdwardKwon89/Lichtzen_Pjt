"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import { Mail, Clock, CheckCircle2, AlertCircle as AlertIcon, BarChart3, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  subValue: string;
  color: string;
}

function StatCard({ icon: Icon, label, value, subValue, color }: StatCardProps) {
  return (
    <div className="bg-white/5 border border-white/5 p-6 rounded-2xl group hover:bg-white/[0.08] transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <TrendingUp className="w-4 h-4 text-brand-cyan opacity-50" />
      </div>
      <div>
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">{label}</p>
        <h3 className="text-3xl font-heading font-bold text-white mt-1 tracking-tighter">{value}</h3>
        <p className="text-slate-400 text-[10px] mt-2 font-medium">{subValue}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, unread: 0, responded: 0, today: 0 });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
        let querySnapshot;
        try {
          querySnapshot = await getDocs(q);
        } catch (sortError: any) {
          console.warn("Index fallback:", sortError);
          const fallbackQ = query(collection(db, "inquiries"));
          querySnapshot = await getDocs(fallbackQ);
          setError("INDEX_MISSING: 정렬 없이 표시 중입니다.");
        }

        const allInquiries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const unreadCount = allInquiries.filter((i: any) => i.status === "waiting" || i.status === "unread").length;
        const respondedCount = allInquiries.filter((i: any) => i.status === "responded").length;

        setStats({
          total: allInquiries.length,
          unread: unreadCount,
          responded: respondedCount,
          today: allInquiries.filter((i: any) => {
            const created = i.createdAt?.toDate ? i.createdAt.toDate() : new Date(i.createdAt);
            const today = new Date();
            return created.toDateString() === today.toDateString();
          }).length,
        });
        setRecentInquiries(allInquiries.slice(0, 4));
      } catch (err: any) {
        console.error("Dashboard Fetch Error:", err);
        setError("데이터 로딩 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="pb-4 border-b border-white/5 relative">
        <h1 className="text-4xl font-heading font-bold text-white tracking-tighter">
          Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan">Overview</span>
        </h1>
        <p className="text-slate-500 text-sm mt-2 font-medium tracking-tight">Real-time business insights and customer interaction monitoring.</p>
        
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs animate-pulse">
            <AlertIcon className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </header>

      {loading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-brand-cyan/20 border-t-brand-cyan rounded-full animate-spin" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Mail} 
          label="Total Inquiries" 
          value={stats.total} 
          subValue="All-time requests stored" 
          color="text-brand-cyan" 
        />
        <StatCard 
          icon={AlertIcon} 
          label="Unread Records" 
          value={stats.unread} 
          subValue="Requires immediate attention" 
          color="text-brand-violet" 
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Resolved Case" 
          value={stats.responded} 
          subValue="Successfully processed" 
          color="text-green-400" 
        />
        <StatCard 
          icon={BarChart3} 
          label="Lead Quality" 
          value="High" 
          subValue="Based on business domains" 
          color="text-brand-cyan" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-violet" /> Recent Inquiries
            </h2>
            <Link href="/admin/inquiries" className="text-brand-cyan text-xs font-mono uppercase tracking-widest hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentInquiries.map((inquiry) => (
              <Link 
                key={inquiry.id} 
                href={`/admin/inquiries?id=${inquiry.id}`}
                className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-violet/20 flex items-center justify-center text-brand-violet font-bold">
                    {inquiry.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-bold text-sm tracking-tight">{inquiry.name}</h4>
                      <span className="text-slate-600 text-xs font-serif leading-none">/</span>
                      <p className="text-brand-cyan font-bold text-xs truncate max-w-[150px]">{inquiry.title}</p>
                    </div>
                    <p className="text-slate-500 text-[10px] font-mono mt-0.5">{inquiry.topic}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div className="hidden md:block">
                    <p className="text-slate-400 text-[10px] mb-1">
                      {inquiry.createdAt?.toDate ? inquiry.createdAt.toDate().toLocaleDateString() : "Pending"}
                    </p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${inquiry.status === "unread" || inquiry.status === "waiting" ? "bg-brand-violet/20 text-brand-violet border border-brand-violet/30" : "bg-green-400/20 text-green-400 border border-green-400/30"}`}>
                      {inquiry.status === "unread" || inquiry.status === "waiting" ? "waiting" : "responded"}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-brand-cyan transition-colors" />
                </div>
              </Link>
            ))}
            {recentInquiries.length === 0 && !loading && (
              <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl">
                <p className="text-slate-500 text-sm">최근 문의 내역이 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-brand-violet/10 border border-brand-violet/20 p-8 rounded-3xl flex flex-col justify-between items-start aspect-square relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-heading font-bold text-white mb-4 tracking-tighter leading-tight">Expert <br />Technical Support</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Need assistance with UV/IR configurations? Our lab experts are ready to help.</p>
            <button className="px-6 py-3 bg-brand-violet text-white font-bold rounded-xl hover:brightness-110 transition-all text-sm">Contact Support</button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}
