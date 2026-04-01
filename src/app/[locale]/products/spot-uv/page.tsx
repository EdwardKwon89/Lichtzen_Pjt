'use client';

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export default function SpotUVPage() {
  const t = useTranslations('Products.spotUv');
  const commonT = useTranslations('Common');

  const specs = [
    { label: t('spec1'), value: "Up to 15,000 mW/cm²" },
    { label: "Irradiation Area", value: "φ3, φ5, φ8, φ10 mm (Customizable)" },
    { label: "Wavelength", value: "365, 385, 395, 405 nm" },
    { label: "Channel Opts", value: "1CH / 4CH / 8CH Controller" },
    { label: "Cooling Method", value: "Fanless Natural Sealing / Air Flow" },
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
          <span className="text-brand-cyan underline decoration-brand-cyan/20 underline-offset-4 tracking-[0.4em]">Spot UV</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="relative aspect-[4/3] rounded-[64px] overflow-hidden bg-skin-card border border-white/5 group shadow-2xl shadow-brand-violet/5">
              <Image 
                src="/images/products/spot-uv.png"
                alt={t('title')}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-skin-base via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-12 left-12 z-10 transition-transform duration-700 group-hover:translate-x-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--brand-accent-rgb),1)] border-2 border-white/20" />
                  <span className="text-[10px] font-mono font-black text-brand-cyan tracking-[0.3em] uppercase">Status: Precision Output</span>
                </div>
                <h3 className="text-4xl font-heading font-black text-white uppercase tracking-tighter shadow-sm">AETHER-SPOT 8X</h3>
              </div>
            </div>

            <div className="p-12 rounded-[48px] bg-skin-card border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="w-10 h-px bg-slate-800" />
                Precision Control Unit
              </h4>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Power Resolution</span>
                  <span className="text-brand-cyan font-mono font-black text-sm tracking-widest">0.1% Steps</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Multi-Channel</span>
                  <span className="text-brand-cyan font-mono font-black text-sm tracking-widest">Independent 8CH</span>
                </div>
              </div>
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
              <div className="p-10 rounded-[40px] bg-skin-card border border-white/5 shadow-xl hover:border-brand-violet/20 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-brand-violet/10 flex items-center justify-center mb-6 text-brand-violet text-[10px] font-black border border-brand-violet/20 uppercase tracking-tighter">LED</div>
                <h4 className="text-lg font-black text-skin-foreground mb-3 uppercase tracking-tight">Thermal Sync</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Integrated cold-start synchronization to protect substrate integrity.</p>
              </div>
              <div className="p-10 rounded-[40px] bg-skin-card border border-white/5 shadow-xl hover:border-brand-cyan/20 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-6 text-brand-cyan text-[10px] font-black border border-brand-cyan/20 uppercase tracking-tighter">MTBF</div>
                <h4 className="text-lg font-black text-skin-foreground mb-3 uppercase tracking-tight">High Reliability</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Industrial-grade durability with 50,000h rated component lifecycle.</p>
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
