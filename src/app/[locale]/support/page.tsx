"use client";

import { useState, useEffect } from "react";
import { submitInquiry, verifyInquiryPassword, getInquiry, updateInquiry } from "@/app/actions/inquiry";
import { serializeInquiryData } from "@/lib/firebaseUtils";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Shield, MessageSquare, ShieldCheck, X, ArrowRight, CheckCircle2, User, Phone, Tag, Type, Plus, ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

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

interface InquirySummary {
  id: string;
  name: string;
  title: string;
  topic: string;
  status: "unread" | "responded" | "waiting";
  createdAt: Timestamp;
}

export default function SupportPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("Support");

  // View State (Replaced viewMode with Modals)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Data States
  const [inquiries, setInquiries] = useState<InquirySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Submit Form State
  const [formData, setFormData] = useState({ 
    name: "", email: "", phone: "", title: "", topic: "Product Inquiry", message: "", password: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit/Verify States
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inquiryPassword, setInquiryPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [editingData, setEditingData] = useState<{
    id: string; title: string; topic: string; phone: string; message: string; messages: any[]
  }>({
    id: "", title: "", topic: "", phone: "", message: "", messages: []
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => serializeInquiryData({
        id: doc.id,
        ...doc.data()
      })) as InquirySummary[];
      setInquiries(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitInquiry(formData);
    if (result.success) {
      alert("Inquiry submitted successfully.");
      setFormData({ name: "", email: "", phone: "", title: "", topic: "Product Inquiry", message: "", password: "" });
      setIsCreateModalOpen(false);
    } else {
      alert(result.error);
    }
    setIsSubmitting(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setVerifyError("");
    const result = await verifyInquiryPassword(selectedId!, inquiryPassword.trim());
    if (result.success) {
      // Fetch full inquiry data for viewing
      const res = await getInquiry(selectedId!);
      if (res.success && res.data) {
        setEditingData({
          id: res.data.id,
          title: res.data.title,
          topic: res.data.topic,
          phone: res.data.phone || "",
          message: res.data.messages[0]?.content || "",
          messages: res.data.messages || []
        });
        setIsEditing(false); // Start in View-only mode
        setIsDetailModalOpen(true);
        setSelectedId(null); // Close password modal
      } else {
        setVerifyError(res.error || "Failed to load inquiry data.");
      }
    } else {
      setVerifyError(result.error || "Incorrect password.");
    }
    setVerifying(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const result = await updateInquiry(editingData.id, {
        title: editingData.title,
        topic: editingData.topic,
        phone: editingData.phone,
        message: editingData.message,
      });

      if (result.success && result.newMessage) {
        // 즉시 로컬 상태 갱신하여 화면 반영
        setEditingData(prev => ({
          ...prev,
          messages: [...prev.messages, result.newMessage]
        }));
        setIsEditing(false);
      } else {
        alert(result.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(inquiries.length / pageSize);
  const pagedInquiries = inquiries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset page when pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  return (
    <div className="bg-skin-base min-h-screen pt-32 pb-24 text-skin-foreground transition-colors duration-500 max-w-[1200px] mx-auto flex flex-col gap-10">
      <header className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-heading font-bold text-skin-foreground tracking-tighter mb-4 uppercase"
        >
          {t("title")} .
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-sm max-w-2xl mx-auto font-light"
        >
          {t("desc")}
        </motion.p>
      </header>

      {/* Main Container */}
      <div className="relative px-6">
        <div className="space-y-6">
          <div className="flex justify-between items-end pb-4 border-b border-white/5">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--brand-accent-rgb),0.5)]" />
                <h2 className="text-lg font-bold text-skin-foreground tracking-tight uppercase">Recent Inquiries</h2>
              </div>
              
              <div className="flex items-center gap-2 bg-skin-card p-1.5 rounded-2xl border border-white/10 ml-4 shadow-sm">
                <select 
                  value={pageSize} 
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="bg-transparent text-skin-foreground/70 text-[10px] font-bold px-3 py-1 outline-none cursor-pointer uppercase tracking-widest"
                >
                  <option value={10} className="bg-skin-card">10 Rows</option>
                  <option value={20} className="bg-skin-card">20 Rows</option>
                  <option value={30} className="bg-skin-card">30 Rows</option>
                </select>
              </div>
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs font-bold rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-brand-cyan/10 uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" /> {t("submit")}
            </button>
          </div>

          {loading ? (
            <div className="h-96 flex items-center justify-center bg-skin-card rounded-[40px] border border-white/5 shadow-2xl">
              <div className="w-8 h-8 border-t-2 border-brand-cyan rounded-full animate-spin" />
            </div>
          ) : inquiries.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center bg-skin-card rounded-[40px] border border-dashed border-white/10 opacity-50 shadow-inner">
               <MessageSquare className="w-12 h-12 mb-6 text-slate-700" />
               <p className="text-slate-500 text-sm font-medium">No inquiries yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 overflow-hidden pt-4">
              {pagedInquiries.map((inquiry) => (
                <motion.div 
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.03)" }}
                  onClick={() => {
                    setSelectedId(inquiry.id);
                    setInquiryPassword("");
                    setVerifyError("");
                  }}
                  className="p-7 px-10 bg-skin-card border border-white/5 hover:border-brand-violet/30 rounded-[32px] cursor-pointer transition-all flex justify-between items-center group relative overflow-hidden shadow-lg"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-violet opacity-0 group-hover:opacity-100 transition-all" />
                  <div className="flex-1 min-w-0 pr-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold py-1 px-3 bg-brand-violet/10 text-brand-violet rounded-full border border-brand-violet/20 uppercase tracking-widest">{inquiry.topic}</span>
                      <span className="text-slate-700 font-serif text-sm">/</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">{inquiry.name}</span>
                    </div>
                    <h3 className="text-lg font-bold text-skin-foreground group-hover:text-brand-cyan transition-colors truncate tracking-tight">{inquiry.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-8 shrink-0">
                     <div className="flex flex-col items-end">
                        <span className={`px-4 py-1.5 text-[10px] font-extrabold rounded-full uppercase tracking-widest shadow-sm ${
                          inquiry.status === "responded" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-brand-violet/10 text-brand-violet border border-brand-violet/10"
                        }`}>
                          {inquiry.status === "responded" ? t("status.responded") : t("status.waiting")}
                        </span>
                     </div>
                     <ArrowRight className="w-5 h-5 text-slate-800 group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}

              {/* Pagination Navigation */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-4">
                  <button 
                    disabled={currentPage === 1}
                    onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => prev - 1); }}
                    className="px-6 py-3 bg-skin-card border border-white/10 rounded-2xl text-skin-foreground/70 text-[10px] font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 hover:text-white transition-all uppercase tracking-widest shadow-md"
                  >
                    Prev
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                      <button
                        key={num}
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(num); }}
                        className={cn(
                          "w-10 h-10 rounded-2xl text-[10px] font-extrabold transition-all shadow-sm",
                          currentPage === num ? "bg-brand-violet text-white shadow-brand-violet/30" : "text-slate-500 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => prev + 1); }}
                    className="px-6 py-3 bg-skin-card border border-white/10 rounded-2xl text-skin-foreground/70 text-[10px] font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 hover:text-white transition-all uppercase tracking-widest shadow-md"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* New Inquiry Pop-Up Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCreateModalOpen(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed inset-x-6 top-10 bottom-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[800px] bg-skin-card border border-white/10 rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.5)] z-[201] p-1 overflow-hidden flex flex-col">
              <div className="px-12 pt-12 pb-8 flex justify-between items-start shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-cyan rounded-full animate-pulse shadow-[0_0_12px_rgba(var(--brand-accent-rgb),0.6)]" />
                  <h2 className="text-3xl font-heading font-bold text-white tracking-tighter uppercase">{t("formTitle")}</h2>
                </div>
                <button onClick={() => setIsCreateModalOpen(false)} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all active:scale-90">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-12 pb-12 space-y-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-2">
                      <User className="w-4 h-4 text-brand-violet" /> {t("name")}
                    </label>
                    <input required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all placeholder:text-slate-800 font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-2">
                      <Mail className="w-4 h-4 text-brand-cyan" /> {t("email")}
                    </label>
                    <input required type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 transition-all placeholder:text-slate-800 font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-2">
                      <Phone className="w-4 h-4 text-brand-cyan" /> {t("phone")}
                    </label>
                    <input placeholder="010-0000-0000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 transition-all placeholder:text-slate-800 font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-2">
                      <Shield className="w-4 h-4 text-brand-violet" /> {t("password")}
                    </label>
                    <input required type="password" maxLength={4} pattern="[0-9]*" inputMode="numeric" placeholder="····" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all placeholder:text-slate-800 tracking-[0.5em] font-mono text-center text-lg" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-1 space-y-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-2">
                      <Tag className="w-4 h-4 text-brand-violet" /> {t("topic")}
                    </label>
                    <div className="relative">
                      <select value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all appearance-none cursor-pointer font-bold uppercase tracking-tighter">
                        <option value="Product Inquiry" className="bg-skin-card">Inquiry</option>
                        <option value="Technical Support" className="bg-skin-card">Support</option>
                        <option value="Quotation" className="bg-skin-card">Quote</option>
                        <option value="Others" className="bg-skin-card">Others</option>
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-2">
                      <Type className="w-4 h-4 text-brand-violet" /> {t("titleField")}
                    </label>
                    <input required placeholder="Subject of your inquiry" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all placeholder:text-slate-800 font-medium" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-2">
                    <MessageSquare className="w-4 h-4 text-brand-cyan" /> {t("message")}
                  </label>
                  <textarea required rows={7} placeholder="Explain your requirements..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-[32px] px-8 py-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 transition-all resize-none font-sans leading-relaxed placeholder:text-slate-800 font-light" />
                </div>

                <button disabled={isSubmitting} className="w-full bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-heading font-black py-6 rounded-2xl transition-all flex items-center justify-center gap-3 group text-xs tracking-widest uppercase active:scale-[0.98] shadow-2xl shadow-brand-cyan/20">
                  {isSubmitting ? "..." : t("submit")}
                  {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Password Modal */}
      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100]" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-skin-card border border-white/10 rounded-[48px] shadow-3xl overflow-hidden z-[101] p-12">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-brand-violet/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-violet/20 shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.2)]">
                  <ShieldCheck className="w-10 h-10 text-brand-violet" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white tracking-tight uppercase">Security Key</h3>
                <p className="text-slate-500 text-[10px] mt-2 font-mono uppercase tracking-widest font-bold">4-Digit Access Code Required</p>
              </div>
              <form onSubmit={handleVerify} className="space-y-6">
                <input required type="password" placeholder="····" autoFocus value={inquiryPassword} onChange={(e) => setInquiryPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white text-center text-3xl tracking-[1em] focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all shadow-inner font-mono pl-[1.5em]" />
                {verifyError && <p className="text-red-500 text-[10px] font-black text-center mt-2 uppercase tracking-tight">{verifyError}</p>}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button type="button" onClick={() => setSelectedId(null)} className="py-4 text-slate-500 font-bold hover:text-white transition-colors text-[10px] uppercase tracking-widest">Abort</button>
                  <button disabled={verifying} className="bg-white text-black font-heading font-black py-4 rounded-2xl hover:bg-slate-200 transition-all text-[10px] uppercase tracking-widest leading-none flex items-center justify-center shadow-lg active:scale-95">
                    {verifying ? "..." : "Access"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Detail / Edit Pop-Up Modal */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.98 }} className="fixed inset-x-6 top-10 bottom-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[750px] bg-skin-card border border-white/10 rounded-[48px] shadow-[0_0_120px_rgba(0,0,0,0.6)] z-[201] p-1 overflow-hidden flex flex-col">
              <div className="px-12 pt-12 pb-8 flex justify-between items-start shrink-0 border-b border-white/5">
                <div>
                   <h2 className="text-3xl font-heading font-bold text-white mb-2 tracking-tighter uppercase">{isEditing ? t("detail.editDocument") : "Support Ticket"}</h2>
                   <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${editingData.messages.some(m => m.role === 'admin') ? 'bg-emerald-500' : 'bg-brand-violet'} animate-pulse`} />
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-mono font-bold">ID: {editingData.id.slice(0, 8)}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                  {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-6 py-2.5 bg-brand-violet text-white text-[10px] font-black rounded-xl border border-brand-violet/30 hover:opacity-90 transition-all uppercase tracking-widest shadow-lg shadow-brand-violet/10">
                      {t("detail.editDocument")}
                    </button>
                  )}
                  <button onClick={() => setIsDetailModalOpen(false)} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all active:scale-90">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-12 pb-12 space-y-10 mt-8 custom-scrollbar">
                {/* Edit Form (Fixed at top when editing) */}
                <AnimatePresence mode="wait">
                  {isEditing && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="w-full space-y-8 bg-white/[0.03] p-10 rounded-[32px] border border-white/10 mb-10 overflow-hidden shadow-inner"
                    >
                      <div className="space-y-3">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 pl-2">Inquiry Title</label>
                        <input required value={editingData.title} onChange={(e) => setEditingData({...editingData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all font-bold" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 pl-2">Category</label>
                          <select value={editingData.topic} onChange={(e) => setEditingData({...editingData, topic: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all appearance-none font-bold uppercase tracking-tighter">
                            <option value="Product Inquiry" className="bg-skin-card">Product Inquiry</option>
                            <option value="Technical Support" className="bg-skin-card">Technical Support</option>
                            <option value="Quotation" className="bg-skin-card">Quotation</option>
                            <option value="Others" className="bg-skin-card">Others</option>
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 pl-2">Phone Number</label>
                          <input value={editingData.phone} onChange={(e) => setEditingData({...editingData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all font-mono" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 pl-2">Original Message</label>
                        <textarea required rows={7} value={editingData.message} onChange={(e) => setEditingData({...editingData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-[28px] px-8 py-6 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all resize-none font-sans leading-relaxed font-light" />
                      </div>

                      <div className="flex gap-6 pt-4">
                        <button onClick={() => setIsEditing(false)} className="flex-1 py-4 text-slate-500 font-bold hover:text-white transition-colors text-[10px] uppercase tracking-widest">Discard</button>
                        <button onClick={(e) => handleUpdate(e as any)} disabled={isUpdating} className="flex-[2] bg-white text-black font-heading font-black py-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-3 text-[10px] tracking-widest uppercase shadow-xl shadow-white/5 active:scale-95">
                          {isUpdating ? "..." : t("detail.saveChanges")}
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Conversation History */}
                <div className="space-y-10">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-slate-600 text-center flex items-center gap-4 before:flex-1 before:h-px before:bg-white/5 after:flex-1 after:h-px after:bg-white/5">Protocol History</h4>
                  {[...(editingData.messages || [])].reverse().map((msg: any, index: number, arr: any[]) => (
                    <div key={index} className={`flex flex-col ${msg.role === "admin" ? "items-end" : "items-start"}`}>
                      <div className={`flex items-center gap-3 mb-4 ${msg.role === "admin" ? "flex-row-reverse" : ""}`}>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-black text-[10px] shadow-sm ${
                           msg.role === "admin" ? "bg-brand-cyan/20 border-brand-cyan/30 text-brand-cyan" : "bg-brand-violet/20 border-brand-violet/30 text-brand-violet"
                         }`}>
                            {msg.role === "admin" ? "A" : "U"}
                         </div>
                         <div className={`flex flex-col ${msg.role === "admin" ? "items-end" : "items-start"}`}>
                            <span className={`text-[9px] font-black uppercase tracking-tighter ${msg.role === "admin" ? "text-brand-cyan" : "text-brand-violet"}`}>
                               {msg.role === "admin" ? "Official Lichtzen Response" : (index === arr.length - 1 ? "Origin Message" : "Client Follow-up")}
                            </span>
                            <span className="text-slate-700 text-[9px] font-mono font-bold">
                               {msg.createdAt?.seconds 
                                 ? new Date(msg.createdAt.seconds * 1000).toLocaleString() 
                                 : (typeof msg.createdAt === 'string' ? new Date(msg.createdAt).toLocaleString() : 
                                   (msg.createdAt instanceof Date ? msg.createdAt.toLocaleString() : new Date().toLocaleString()))}
                            </span>
                         </div>
                      </div>
                      
                      <div className={`px-10 py-7 rounded-[32px] text-sm leading-relaxed w-full shadow-2xl relative group ${
                        msg.role === "admin" ? "bg-gradient-to-br from-brand-cyan/10 to-transparent border border-brand-cyan/20 text-brand-cyan/90" : "bg-white/[0.02] border border-white/5 text-slate-400"
                      }`}>
                        {msg.role === "admin" && (
                          <div className="absolute top-0 right-10 -translate-y-1/2 px-4 py-1.5 bg-brand-cyan text-brand-navy text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                            Verified
                          </div>
                        )}
                        <p className="whitespace-pre-wrap font-light italic">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
