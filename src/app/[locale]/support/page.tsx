"use client";

import { useState, useEffect } from "react";
import { submitInquiry, verifyInquiryPassword, getInquiry, updateInquiry } from "@/app/actions/inquiry";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Shield, MessageSquare, ShieldCheck, X, ArrowRight, CheckCircle2, User, Phone, Tag, Type, Plus, ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

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

  // View State (Replaced viewMode with Modals)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Data States
  const [inquiries, setInquiries] = useState<InquirySummary[]>([]);
  const [loading, setLoading] = useState(true);
  
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
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        title: doc.data().title || "No Title",
        topic: doc.data().topic,
        status: doc.data().status,
        createdAt: doc.data().createdAt,
      })) as InquirySummary[];
      setInquiries(data);
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
    const result = await updateInquiry(editingData.id, {
      title: editingData.title,
      topic: editingData.topic,
      phone: editingData.phone,
      message: editingData.message
    });
    if (result.success) {
      alert("Updated successfully.");
      setIsEditing(false); // Back to view mode
      // Refresh editingData with updated message
      setEditingData(prev => ({
        ...prev,
        messages: prev.messages.map((msg, i) => i === 0 ? { ...msg, content: editingData.message } : msg)
      }));
    } else {
      alert(result.error);
    }
    setIsUpdating(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-[1200px] mx-auto flex flex-col gap-10">
      <header className="text-center">
        <h1 className="text-5xl font-heading font-bold text-white tracking-tighter mb-4">Lichtzen Support .</h1>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">전용 기술 지원과 공정 상담을 위해 내용을 작성해 주세요. 모든 정보는 보안 비밀번호로 암호화되어 안전하게 관리됩니다.</p>
      </header>

      {/* Main Container */}
      <div className="relative">
        <div className="space-y-6">
          <div className="flex justify-between items-end pb-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" />
              <h2 className="text-lg font-bold text-white tracking-tight">Recent Inquiries</h2>
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              <Plus className="w-4 h-4" /> New Inquiry
            </button>
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center bg-white/5 rounded-3xl border border-white/5">
              <div className="w-6 h-6 border-b-2 border-brand-cyan rounded-full animate-spin" />
            </div>
          ) : inquiries.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center bg-white/[0.02] rounded-3xl border border-dashed border-white/10 opacity-50">
               <MessageSquare className="w-10 h-10 mb-4 text-slate-700" />
               <p className="text-slate-500 text-sm">No inquiries yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5 overflow-hidden">
              {inquiries.map((inquiry) => (
                <motion.div 
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.06)" }}
                  onClick={() => {
                    setSelectedId(inquiry.id);
                    setInquiryPassword("");
                    setVerifyError("");
                  }}
                  className="p-5 pl-7 bg-white/[0.03] border border-white/5 hover:border-white/20 rounded-2xl cursor-pointer transition-all flex justify-between items-center group relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-violet opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold py-0.5 px-2 bg-brand-violet/10 text-brand-violet rounded-md border border-brand-violet/20">{inquiry.topic}</span>
                      <span className="text-slate-700 font-serif text-[10px]">/</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{inquiry.name}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors truncate">{inquiry.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-6 shrink-0">
                     <div className="flex flex-col items-end">
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-tight mb-1 ${
                          inquiry.status === "responded" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-brand-violet/10 text-brand-violet border border-brand-violet/10"
                        }`}>
                          {inquiry.status}
                        </span>
                     </div>
                     <ArrowRight className="w-4 h-4 text-slate-800 group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Inquiry Pop-Up Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCreateModalOpen(false)} className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed inset-x-6 top-10 bottom-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[800px] bg-slate-950 border border-white/10 rounded-[40px] shadow-3xl z-[201] p-1 overflow-hidden flex flex-col">
              <div className="px-10 pt-10 pb-6 flex justify-between items-start shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
                  <h2 className="text-2xl font-bold text-white">New Inquiry</h2>
                </div>
                <button onClick={() => setIsCreateModalOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-10 pb-10 space-y-6 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-1">
                      <User className="w-4 h-4 text-brand-violet" /> Requester Name
                    </label>
                    <input required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all placeholder:text-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-1">
                      <Mail className="w-4 h-4 text-brand-cyan" /> Email Address
                    </label>
                    <input required type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 transition-all placeholder:text-slate-700" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-1">
                      <Phone className="w-4 h-4 text-brand-cyan" /> Phone Number
                    </label>
                    <input placeholder="010-0000-0000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 transition-all placeholder:text-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-1">
                      <Shield className="w-4 h-4 text-brand-violet" /> Verification Password (4 digits)
                    </label>
                    <input required type="password" maxLength={4} pattern="[0-9]*" inputMode="numeric" placeholder="····" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all placeholder:text-slate-700 tracking-widest font-mono" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-1">
                      <Tag className="w-4 h-4 text-brand-violet" /> Category
                    </label>
                    <select value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all appearance-none cursor-pointer">
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Quotation">Request Quote</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-1">
                      <Type className="w-4 h-4 text-brand-violet" /> Inquiry Title
                    </label>
                    <input required placeholder="Subject of your inquiry" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all placeholder:text-slate-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 pl-1">
                    <MessageSquare className="w-4 h-4 text-brand-cyan" /> Detailed Message
                  </label>
                  <textarea required rows={8} placeholder="Explain your requirements..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 transition-all resize-none font-sans leading-relaxed placeholder:text-slate-700" />
                </div>

                <button disabled={isSubmitting} className="w-full bg-white hover:bg-slate-200 text-black font-extrabold py-4.5 rounded-xl transition-all flex items-center justify-center gap-2 group text-xs tracking-widest uppercase active:scale-95 shadow-xl shadow-brand-cyan/5">
                  {isSubmitting ? "Processing..." : "Submit Inquiry"}
                  {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-slate-900 border border-white/10 rounded-[40px] shadow-3xl overflow-hidden z-[101] p-10">
              <div className="text-center mb-8">
                <ShieldCheck className="w-12 h-12 text-brand-violet mx-auto mb-5" />
                <h3 className="text-xl font-bold text-white tracking-tight">Security Verification</h3>
                <p className="text-slate-500 text-xs mt-2 font-medium">Please enter your 4-digit security password.</p>
              </div>
              <form onSubmit={handleVerify} className="space-y-4">
                <input required type="password" placeholder="····" autoFocus value={inquiryPassword} onChange={(e) => setInquiryPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-center text-2xl tracking-[1em] focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all" />
                {verifyError && <p className="text-red-500 text-[10px] font-bold text-center mt-2">{verifyError}</p>}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button type="button" onClick={() => setSelectedId(null)} className="py-3 text-slate-500 font-bold hover:text-white transition-colors text-xs uppercase tracking-widest">Cancel</button>
                  <button disabled={verifying} className="bg-white text-black font-extrabold py-3 rounded-xl hover:bg-slate-200 transition-all text-xs uppercase tracking-widest leading-none flex items-center justify-center">
                    {verifying ? "..." : "Verify"}
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="fixed inset-0 bg-black/95 z-[200]" />
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-x-6 top-10 bottom-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[700px] bg-slate-950 border border-white/10 rounded-[40px] shadow-3xl z-[201] p-1 overflow-hidden flex flex-col">
              <div className="px-10 pt-10 pb-6 flex justify-between items-start shrink-0">
                <div>
                   <h2 className="text-2xl font-bold text-white mb-1">{isEditing ? "Edit Inquiry" : "Inquiry Details"}</h2>
                   <p className="text-slate-500 text-[11px] uppercase tracking-widest font-mono">Inquiry Management</p>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-violet/20 text-brand-violet text-[10px] font-bold rounded-lg border border-brand-violet/30 hover:bg-brand-violet/30 transition-colors">
                      Edit
                    </button>
                  )}
                  <button onClick={() => setIsDetailModalOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-10 pb-10 space-y-8 custom-scrollbar">
                {/* Conversation History */}
                <div className="space-y-6">
                  {editingData.messages.map((msg: any, index: number) => (
                    <div key={index} className={`flex flex-col ${msg.role === "admin" ? "items-start" : "items-end"}`}>
                      <div className="flex items-center gap-2 mb-2">
                         <span className={`text-[10px] font-bold uppercase tracking-widest ${msg.role === "admin" ? "text-brand-cyan" : "text-brand-violet"}`}>
                            {msg.role === "admin" ? "Admin Response" : "Original Inquiry"}
                         </span>
                         <span className="text-slate-700 text-[10px]">/</span>
                         <span className="text-slate-500 text-[10px] font-mono">
                            {new Date(msg.createdAt?.seconds * 1000 || Date.now()).toLocaleString()}
                         </span>
                      </div>
                      
                      {isEditing && msg.role === "user" && index === 0 ? (
                        <div className="w-full space-y-6 bg-white/[0.02] p-6 rounded-3xl border border-white/5">
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 pl-1">Inquiry Title</label>
                            <input required value={editingData.title} onChange={(e) => setEditingData({...editingData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 pl-1">Category</label>
                              <select value={editingData.topic} onChange={(e) => setEditingData({...editingData, topic: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all appearance-none">
                                <option value="Product Inquiry">Product Inquiry</option>
                                <option value="Technical Support">Technical Support</option>
                                <option value="Quotation">Request Quote</option>
                                <option value="Others">Others</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 pl-1">Phone Number</label>
                              <input value={editingData.phone} onChange={(e) => setEditingData({...editingData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 pl-1">Inquiry Message</label>
                            <textarea required rows={8} value={editingData.message} onChange={(e) => setEditingData({...editingData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all resize-none font-sans leading-relaxed" />
                          </div>

                          <div className="flex gap-4">
                            <button onClick={() => setIsEditing(false)} className="flex-1 py-4 text-slate-500 font-bold hover:text-white transition-colors text-[10px] uppercase tracking-widest">Cancel</button>
                            <button onClick={(e) => handleUpdate(e as any)} disabled={isUpdating} className="flex-[2] bg-brand-violet text-white font-extrabold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase shadow-xl shadow-brand-violet/20">
                              {isUpdating ? "Saving..." : "Save Changes"}
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={`p-6 rounded-3xl text-sm leading-relaxed max-w-[90%] ${
                          msg.role === "admin" ? "bg-brand-cyan/5 border border-brand-cyan/20 text-brand-cyan/90 border-l-4 border-l-brand-cyan" : "bg-white/5 border border-white/10 text-slate-300"
                        }`}>
                          {msg.role === "admin" && (
                            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-brand-cyan/10">
                              <ShieldCheck className="w-4 h-4" />
                              <span className="font-bold text-[10px] uppercase tracking-tighter">Official Response</span>
                            </div>
                          )}
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      )}
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
