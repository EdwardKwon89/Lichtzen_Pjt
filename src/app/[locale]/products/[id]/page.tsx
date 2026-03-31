'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Cpu, Zap, Activity } from 'lucide-react';
import Image from 'next/image';

export default function ProductDetailPage() {
  const t = useTranslations('Products');
  const params = useParams();
  const id = params?.id as string;

  // Validate if the product ID exists in translation
  // (In a real app, you might want a more robust check)
  const productKey = id;

  return (
    <div className="bg-brand-navy min-h-screen pt-24 pb-32 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-violet/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            href="/products" 
            className="group inline-flex items-center gap-2 text-slate-500 hover:text-brand-cyan transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Lineup
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Product Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="aspect-[4/3] bg-slate-900 rounded-[48px] border border-white/5 relative overflow-hidden flex items-center justify-center group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-violet/20 via-transparent to-brand-cyan/20 opacity-50" />
              
              {/* Image Placeholder - Will be updated with AI generated images later */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-9xl grayscale group-hover:grayscale-0 transition-all group-hover:rotate-6 duration-700 select-none pb-4">
                  {id.includes('led') || id === 'ls4' || id === 'lba' ? '💡' : id.includes('lamp') || id === 'conveyor' || id === 'innocure' ? '⚙️' : '🔥'}
                </div>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan"
                  />
                </div>
              </div>

              {/* Glassmorphism Badge */}
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-[32px] bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-violet/20 flex items-center justify-center text-brand-violet">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic">Lichtzen Original</p>
                    <p className="text-white font-bold">Premium Quality</p>
                  </div>
                </div>
                <div className="text-brand-cyan opacity-40">
                  <Activity size={24} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square rounded-3xl bg-white/5 border border-white/5 hover:border-brand-violet/30 transition-all cursor-pointer flex items-center justify-center text-3xl opacity-50 hover:opacity-100">
                  📷
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet text-[10px] font-mono uppercase tracking-[0.3em] mb-6 shadow-sm shadow-brand-violet/10">
                <Zap size={12} className="fill-current" />
                Featured Solution
              </div>
              <h1 className="text-6xl font-heading font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                {t(`${productKey}.title`)}
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                {t(`${productKey}.desc`)}
              </p>
            </motion.div>

            {/* Spec Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-10 rounded-[48px] bg-white/5 border border-white/5 backdrop-blur-xl relative group"
            >
              <div className="absolute -top-px left-20 right-20 h-px bg-gradient-to-r from-transparent via-brand-violet to-transparent opacity-50" />
              
              <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-4">
                <div className="w-1.5 h-6 bg-brand-cyan rounded-full" />
                {t(`${productKey}.specTitle`)}
              </h3>
              
              <div className="space-y-4">
                {[1, 2, 3].map(spec => (
                  <div key={spec} className="group/item flex justify-between items-center p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-4">
                      <CheckCircle2 size={18} className="text-brand-violet opacity-40 group-hover/item:opacity-100 transition-opacity" />
                      <span className="text-slate-400 font-medium group-hover/item:text-white transition-colors">
                        {t(`${productKey}.spec${spec}`)}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-slate-700" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-6 bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-bold text-xl rounded-[30px] shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-3 border border-white/10"
              >
                Request Quote
                <ArrowRight size={20} />
              </motion.button>
              <button className="flex-1 py-6 bg-white/5 hover:bg-white/10 text-white font-bold text-xl rounded-[30px] border border-white/5 transition-all">
                Download Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
