"use client";

import { useEffect, useState, Suspense } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Send, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addInquiryMessage } from "@/app/actions/inquiry";
import Link from "next/link";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  topic: string;
  status: "unread" | "responded" | "waiting";
  messages: any[];
  createdAt: any;
  userId?: string;
  message?: string;
}

function InquiriesContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const targetId = searchParams.get("id");
  const locale = params.locale as string;

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Inquiry[];
      setInquiries(data);
      setLoading(false);

      if (targetId && !selectedInquiry) {
        const target = data.find(item => item.id === targetId);
        if (target) setSelectedInquiry(target);
      }
    }, (err: any) => {
      console.warn("Firestore Index Fallback:", err);
      const fallbackQ = query(collection(db, "inquiries"));
      onSnapshot(fallbackQ, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Inquiry[];
        setInquiries(data);
        setLoading(false);
        setError("INDEX_MISSING: 실시간 정렬이 지원되지 않습니다.");
        
        if (targetId && !selectedInquiry) {
          const target = data.find(item => item.id === targetId);
          if (target) setSelectedInquiry(target);
        }
      });
    });

    return () => unsubscribe();
  }, [targetId, selectedInquiry]);

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedInquiry) return;
    
    setSending(true);
    try {
      const result = await addInquiryMessage(selectedInquiry.id, replyText, "admin");
      
      const newMessage = {
        role: "admin",
        content: replyText,
        createdAt: { toDate: () => new Date() }
      };
      
      setSelectedInquiry(prev => prev ? {
        ...prev,
        status: "responded",
        messages: [...(prev.messages || []), newMessage]
      } : null);
      
      setReplyText("");
    } catch (err) {
      console.error("Reply error:", err);
    } finally {
      setSending(false);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === "all" || 
      (filterStatus === "waiting" && (inquiry.status === "waiting" || inquiry.status === "unread" || !inquiry.status)) ||
      (filterStatus === "responded" && inquiry.status === "responded");
      
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-tighter">
            Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan">Inquiries</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage and respond to all customer technical requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search inquiries..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-brand-violet/50 outline-none transition-all w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === "all" ? "bg-white/10 text-white" : "text-slate-500 hover:text-white"}`}
            >
              ALL
            </button>
            <button 
              onClick={() => setFilterStatus("waiting")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === "waiting" ? "bg-brand-violet/20 text-brand-violet" : "text-slate-500 hover:text-white"}`}
            >
              WAITING
            </button>
            <button 
              onClick={() => setFilterStatus("responded")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === "responded" ? "bg-green-400/20 text-green-400" : "text-slate-500 hover:text-white"}`}
            >
              RESPONDED
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center gap-3 text-yellow-500 text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        <div className="w-1/3 flex flex-col bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4" /> Inquiry List
            </h3>
            <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-lg">
              {filteredInquiries.length} FOUND
            </span>
          </div>
          <div className="flex-1 overflow-y-auto inquiry-list-scroll p-2 space-y-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-8 h-8 border-3 border-brand-violet/20 border-t-brand-violet rounded-full animate-spin" />
                <p className="text-slate-500 text-xs font-mono">Synchronizing Data...</p>
              </div>
            ) : filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiry) => (
                <div 
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedInquiry?.id === inquiry.id ? "bg-brand-violet/10 border-brand-violet/30" : "bg-transparent border-transparent hover:bg-white/5"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-bold text-sm truncate max-w-[150px]">{inquiry.name}</h4>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest ${inquiry.status === "responded" ? "bg-green-400/20 text-green-400" : "bg-brand-violet/20 text-brand-violet"}`}>
                      {inquiry.status === "responded" ? "responded" : "waiting"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs font-medium mb-1 truncate">{inquiry.topic}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-slate-600 text-[10px] uppercase font-mono">
                      {inquiry.createdAt?.toDate ? inquiry.createdAt.toDate().toLocaleDateString() : "PENDING"}
                    </p>
                    <ChevronRight className={`w-4 h-4 transition-all ${selectedInquiry?.id === inquiry.id ? "text-brand-violet translate-x-1" : "text-white/10"}`} />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-600">
                <Mail className="w-8 h-8 mb-4 opacity-20" />
                <p className="text-sm">문의 내역이 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white/5 border border-white/5 rounded-3xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            {selectedInquiry ? (
              <motion.div 
                key={selectedInquiry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <div className="p-4 border-b border-white/5 bg-white/[0.02] flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-violet/20 flex items-center justify-center text-brand-violet shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-bold text-base truncate">{selectedInquiry.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                        <p className="text-slate-500 text-[10px] flex items-center gap-1.5">
                          <Mail className="w-3 h-3" /> {selectedInquiry.email}
                        </p>
                        {selectedInquiry.phone && (
                          <p className="text-slate-500 text-[10px] flex items-center gap-1.5 border-l border-white/10 pl-3">
                            <Phone className="w-3 h-3" /> {selectedInquiry.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all border border-white/5">
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all border border-white/5">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {[...(selectedInquiry.messages || [])].reverse().map((msg: any, i: number, arr: any[]) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "admin" ? "flex-row-reverse" : ""}`}>
                      <div className="flex-1 max-w-[95%]">
                        <div className={`flex items-center gap-2 mb-1.5 ${msg.role === "admin" ? "flex-row-reverse" : ""}`}>
                          <span className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-md ${msg.role === "admin" ? "bg-brand-cyan/20 text-brand-cyan" : "bg-white/5 text-slate-500"}`}>
                            {msg.role === "admin" ? "Lichtzen Admin" : (i === arr.length - 1 ? "Original Inquiry" : "User Response")}
                          </span>
                          <span className="text-[9px] font-mono text-slate-600">
                             {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : ""}
                          </span>
                        </div>
                        <div className={`px-4 py-2.5 rounded-2xl border ${msg.role === "admin" ? "bg-brand-cyan/10 border-brand-cyan/20 rounded-tr-none" : "bg-white/5 border-white/5 rounded-tl-none"}`}>
                          {i === arr.length - 1 && msg.role !== "admin" && (
                            <h4 className="text-brand-cyan font-bold mb-2 text-xs flex items-center gap-2">
                              <Filter className="w-3 h-3" /> {selectedInquiry.topic}
                            </h4>
                          )}
                          <p className={`text-xs leading-relaxed ${msg.role === "admin" ? "text-slate-200 font-medium" : "text-slate-300"}`}>
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-white/[0.02] border-t border-white/5">
                  <div className="relative group">
                    <textarea 
                      placeholder="Type your response here..."
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-brand-violet/30 outline-none transition-all resize-none pr-12 group-focus-within:bg-white/[0.08]"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button 
                      onClick={handleSendReply}
                      className="absolute bottom-4 right-4 p-3 bg-brand-violet hover:bg-brand-violet/80 text-white rounded-xl transition-all shadow-lg hover:shadow-brand-violet/20 disabled:opacity-50"
                      disabled={sending || !replyText.trim()}
                    >
                      {sending ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-slate-600 text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> Auto-save is active
                    </p>
                    <Link href={`/${locale}/admin/users/${selectedInquiry.userId || ""}`} className="text-brand-violet text-[10px] font-bold uppercase tracking-widest hover:underline">
                      View User Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 bg-white/[0.01]">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <MessageSquare className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-white font-bold opacity-50">Select an inquiry to view details</h3>
                <p className="text-xs mt-2 font-mono tracking-tighter opacity-30">Waiting for interaction...</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function AdminInquiriesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="w-10 h-10 border-4 border-brand-violet/20 border-t-brand-violet rounded-full animate-spin" />
      </div>
    }>
      <InquiriesContent />
    </Suspense>
  );
}
