"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { addInquiryMessage, updateInquiry, Message } from "@/app/actions/inquiry";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, ShieldCheck, Clock, MessageSquare, ArrowLeft, CheckCircle2, Edit3, Save, X, Phone, Tag, Type, Mail } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InquiryData {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  topic: string;
  status: string;
  messages: Message[];
  createdAt: Timestamp;
}

export default function SupportDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const locale = params.locale as string;

  const [inquiry, setInquiry] = useState<InquiryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", topic: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, "inquiries", id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setInquiry({ ...data, id: docSnap.id } as InquiryData);
        setEditForm({ 
          title: data.title || "No Title", 
          topic: data.topic, 
          phone: data.phone || "", 
          message: data.messages?.[0]?.content || "" 
        });
      } else {
        router.push(`/${locale}/support`);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id, locale, router]);

  const handleUpdate = async () => {
    if (!inquiry || isSubmitting) return;
    setIsSubmitting(true);
    const result = await updateInquiry(id, editForm);
    if (result.success) {
      setIsEditing(false);
      alert("정보가 성공적으로 수정되었습니다.");
    } else {
      alert(result.error);
    }
    setIsSubmitting(false);
  };

  const handleSendFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const result = await addInquiryMessage(id, newMessage, "user");
    if (result.success) setNewMessage("");
    setIsSubmitting(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-10 h-10 border-4 border-brand-violet/20 border-t-brand-violet rounded-full animate-spin" />
    </div>
  );

  if (!inquiry) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto flex flex-col gap-8">
      
      {/* 1. Header & Quick Actions */}
      <header className="flex justify-between items-center shrink-0">
        <Link 
          href={`/${locale}/support`}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-all text-xs font-bold tracking-widest uppercase group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to List
        </Link>
        <div className="flex items-center gap-3">
          <span className={cn(
            "px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border",
            inquiry.status === "responded" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-brand-violet/10 text-brand-violet border-brand-violet/20"
          )}>
            STATUS: {inquiry.status}
          </span>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-bold transition-all border border-white/10"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Document
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-[10px] font-bold transition-all border border-red-500/20"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-1.5 bg-brand-cyan text-black font-bold rounded-lg text-[10px] transition-all"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 2. Side Panel - Meta Information */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-brand-cyan/20 rounded-2xl flex items-center justify-center text-brand-cyan">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest leading-tight">Verification Key . {inquiry.id.slice(0, 12)}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-bold text-brand-violet uppercase">Principal</label>
                <p className="text-sm font-bold text-white flex items-center gap-2"><User className="w-3.5 h-3.5 opacity-40" /> {inquiry.name}</p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-bold text-brand-violet uppercase">Communication</label>
                <p className="text-xs font-medium text-slate-400 flex items-center gap-2"><Mail className="w-3.5 h-3.5 opacity-40" /> {inquiry.email}</p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-bold text-brand-violet uppercase">Direct Contact</label>
                {isEditing ? (
                  <input 
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    placeholder="010-0000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-brand-cyan"
                  />
                ) : (
                  <p className="text-xs font-medium text-slate-400 flex items-center gap-2"><Phone className="w-3.5 h-3.5 opacity-40" /> {inquiry.phone || "Not provided"}</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600">
                <Clock className="w-3 h-3" /> Submitted: {inquiry.createdAt?.toDate().toLocaleString()}
              </div>
            </div>
          </div>
        </aside>

        {/* 3. Main Content - Formal Document View/Edit */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <motion.div 
            layout
            className="p-8 bg-white/[0.03] border border-white/5 rounded-[40px] shadow-3xl text-left"
          >
            {isEditing ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-brand-cyan flex items-center gap-2 uppercase tracking-widest"><Tag className="w-3.5 h-3.5" /> Category Selection</label>
                  <select 
                    value={editForm.topic}
                    onChange={(e) => setEditForm({...editForm, topic: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-brand-cyan outline-none transition-all"
                  >
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Quotation">Request Quote</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-brand-cyan flex items-center gap-2 uppercase tracking-widest"><Type className="w-3.5 h-3.5" /> Document Title</label>
                  <input 
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:border-brand-cyan outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-brand-cyan flex items-center gap-2 uppercase tracking-widest"><MessageSquare className="w-3.5 h-3.5" /> Detailed Technical Requirements</label>
                  <textarea 
                    rows={15}
                    value={editForm.message}
                    onChange={(e) => setEditForm({...editForm, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm leading-relaxed text-slate-300 focus:border-brand-cyan outline-none transition-all resize-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-extrabold text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full uppercase tracking-tighter">{inquiry.topic}</span>
                  <h1 className="text-4xl font-heading font-bold text-white tracking-tighter leading-tight pt-2">{inquiry.title}</h1>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="text-slate-300 text-base leading-[1.8] font-light whitespace-pre-wrap min-h-[300px]">
                  {inquiry.messages?.[0]?.content}
                </div>
              </div>
            )}
          </motion.div>

          {/* 4. Response Area - Only visible if responded */}
          <div className="space-y-6">
            {inquiry.messages.filter(m => m.role === "admin").map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 bg-brand-cyan/10 border border-brand-cyan/20 rounded-[40px] rounded-tl-none relative"
              >
                <div className="absolute top-0 left-0 bg-brand-cyan text-black text-[9px] font-extrabold px-3 py-1 rounded-br-2xl uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> Lichtzen Official Response
                </div>
                <div className="mt-4 text-slate-100 text-sm leading-relaxed font-medium italic">
                  "{msg.content}"
                </div>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-brand-cyan opacity-60">
                  <CheckCircle2 className="w-3 h-3" /> Verified by Technical Team . {new Date(msg.createdAt?.toDate ? msg.createdAt.toDate() : msg.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 5. Follow-up Interaction Layer (Optional, Compact) */}
          <footer className="mt-4 p-6 bg-white/[0.01] border border-white/5 rounded-3xl group">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-1 h-1 bg-slate-500 rounded-full" />
               <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Follow-up Dialogue Support</p>
             </div>
             <form onSubmit={handleSendFollowUp} className="flex gap-4">
                <input 
                  placeholder="Need further clarification? Type here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-xs text-white focus:outline-none focus:border-brand-violet/50 transition-all outline-none"
                />
                <button 
                  disabled={isSubmitting || !newMessage.trim()}
                  className="px-6 py-3 bg-white hover:bg-slate-200 text-black rounded-xl transition-all disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
             </form>
          </footer>
        </div>
      </div>
    </div>
  );
}
