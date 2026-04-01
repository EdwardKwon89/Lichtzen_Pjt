'use client';

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export default function MIRSystemPage() {
  const t = useTranslations('Products.mirSystem');
  const commonT = useTranslations('Common');

  const specs = [
    { label: t('spec1'), value: "Quartz / Ceramic MIR Element" },
    { label: "Wavelength", value: "1.0 - 4.5 μm (Optimized)" },
    { label: t('spec2'), value: "Max 1,200 mm" },
    { label: "Power Output", value: "Up to 50 kW/m²" },
    { label: "Cooling Method", value: "Forced Air Cooling System" },
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
          <Link href="/products/spot-uv" className="hover:text-brand-violet transition-colors">{commonT('products')}</Link>
          <span className="mx-4 text-white/10">|</span>
          <span className="text-slate-500">Thermal Systems</span>
          <span className="mx-4 text-white/10">|</span>
          <span className="text-brand-cyan underline decoration-brand-cyan/20 underline-offset-4 tracking-[0.4em]">MIR System</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="relative aspect-[4/3] rounded-[64px] overflow-hidden bg-skin-card border border-white/5 flex items-center justify-center group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-skin-base via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 z-10 transition-transform duration-500 group-hover:translate-x-2">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--brand-accent-rgb),1)] border-2 border-white/20" />
                  <span className="text-[10px] font-mono font-black text-brand-cyan tracking-[0.3em] uppercase">System Optimized</span>
                </div>
                <h3 className="text-3xl font-heading font-black text-white uppercase tracking-tighter shadow-sm">AETHER-MIR X1</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-[32px] bg-skin-card border border-white/5 hover:border-brand-orange/30 transition-all cursor-pointer shadow-lg hover:shadow-brand-orange/10 group" />
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
                <div className="w-12 h-12 rounded-2xl bg-brand-violet/10 flex items-center justify-center mb-6 text-brand-violet text-[10px] font-black border border-brand-violet/20 uppercase tracking-tighter">HEX</div>
                <h4 className="text-lg font-black text-skin-foreground mb-3 uppercase tracking-tight">Medium Infra</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Deep penetration thermal waves for high-efficiency moisture removal.</p>
              </div>
              <div className="p-10 rounded-[40px] bg-skin-card border border-white/5 shadow-xl hover:border-brand-cyan/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-6 text-brand-cyan text-[10px] font-black border border-brand-cyan/20 uppercase tracking-tighter">SPD</div>
                <h4 className="text-lg font-black text-skin-foreground mb-3 uppercase tracking-tight">Smart Response</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Precision temperature feedback loop for 0.1°C stability.</p>
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

            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-heading font-black py-6 rounded-3xl transition-all active:scale-[0.98] shadow-2xl shadow-brand-cyan/20 uppercase tracking-[0.2em] text-[10px]">
                Request Technical Data
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
