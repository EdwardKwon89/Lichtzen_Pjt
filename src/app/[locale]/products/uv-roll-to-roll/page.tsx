'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export default function UVRollToRollPage() {
  const t = useTranslations('Products.rollToRoll');
  const commonT = useTranslations('Common');

  const specs = [
    { label: "UV Ramp", value: "80, 120, 160 W/cm (Selectable)" },
    { label: t('spec2'), value: "Water Cooled / Air Cooled Hybrid" },
    { label: "Web Width", value: "Max 1,600 mm" },
    { label: "Operation Speed", value: "Up to 150 m/min" },
    { label: "Safety Features", value: "Auto-Shutter, Emergency Stop, Ozone Exhaust" },
  ];

  return (
    <div className="bg-skin-base min-h-screen pt-32 pb-24 text-skin-foreground transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 flex text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-600"
        >
          <Link href="/products/mir-system" className="hover:text-brand-violet transition-colors">{commonT('products')}</Link>
          <span className="mx-4 text-white/10">|</span>
          <span className="text-slate-500">UV Systems</span>
          <span className="mx-4 text-white/10">|</span>
          <span className="text-brand-cyan underline decoration-brand-cyan/20 underline-offset-4 tracking-[0.4em]">Roll-to-Roll UV</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="relative aspect-[4/3] rounded-[64px] overflow-hidden bg-skin-card border border-white/5 flex items-center justify-center group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-skin-base via-transparent to-transparent opacity-90" />
              <div className="text-center px-12 z-10 transition-transform duration-1000 group-hover:scale-105">
                <div className="w-32 h-32 mb-8 mx-auto border-t-4 border-brand-violet rounded-full animate-spin-slow opacity-20 shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.3)]" />
                <h3 className="text-[10px] font-mono font-black text-brand-cyan tracking-[0.4em] mb-4 uppercase">Status: System Online</h3>
                <p className="text-4xl font-heading font-black text-white tracking-tighter uppercase shadow-sm">ROLL-TO-ROLL V2</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-[32px] bg-skin-card border border-white/5 hover:border-brand-violet/30 transition-all cursor-pointer shadow-lg hover:shadow-brand-violet/10 group" />
              ))}
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-6xl font-heading font-black text-skin-foreground mb-8 leading-[0.9] tracking-tighter uppercase">
                {t('title')} .
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed font-light max-w-xl">
                {t('desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-10 rounded-[40px] bg-skin-card border border-white/5 shadow-xl hover:border-brand-violet/10 transition-all duration-500">
                <h4 className="text-lg font-black text-skin-foreground mb-3 uppercase tracking-tight">Optical Core</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Hyper-efficient parabolic reflectors for uniform UV distribution across the entire web width.</p>
              </div>
              <div className="p-10 rounded-[40px] bg-skin-card border border-white/5 shadow-xl hover:border-brand-cyan/10 transition-all duration-500">
                <h4 className="text-lg font-black text-skin-foreground mb-3 uppercase tracking-tight">Kinetic Shield</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Intelligent shutter response system to safeguard substrate during unexpected line stops.</p>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="pt-8">
              <h3 className="text-xl font-heading font-black text-skin-foreground mb-8 uppercase tracking-tighter border-l-4 border-brand-cyan pl-6">
                {t('specTitle')}
              </h3>
              <div className="overflow-hidden rounded-[32px] border border-white/5 bg-skin-card shadow-2xl font-mono">
                <table className="w-full text-left text-[10px] uppercase font-bold tracking-tight">
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.label} className="border-b border-white/5 transition-colors hover:bg-white/5 text-slate-500">
                        <td className="py-5 px-10 w-1/3 border-r border-white/5 font-black text-slate-600">{spec.label}</td>
                        <td className="py-5 px-10 text-brand-cyan">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button className="flex-1 bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-heading font-black py-6 rounded-3xl transition-all active:scale-[0.98] shadow-2xl shadow-brand-violet/20 uppercase tracking-[0.2em] text-[10px]">
                Request Technical Proposal
              </button>
              <button className="flex-1 border-2 border-white/10 hover:border-brand-cyan/50 text-skin-foreground/80 font-black py-5 rounded-3xl transition-all group uppercase tracking-[0.2em] text-[10px]">
                Download Specs <span className="inline-block group-hover:translate-y-1 transition-transform ml-2">↓</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
