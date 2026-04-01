'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const timelineKeys = ["2010", "2013", "2016", "2019", "2022", "2024"];
const valueKeys = ["precision", "sustainability", "innovation"];

export default function AboutPage() {
  const t = useTranslations('About');
  const commonT = useTranslations('Common');

  return (
    <div className="bg-skin-base min-h-screen pt-32 pb-40 text-skin-foreground transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* CEO Message / Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-48">
          <motion.header 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-brand-violet font-mono text-[10px] font-black tracking-[0.4em] uppercase mb-8 flex items-center gap-4">
              <span className="w-10 h-px bg-brand-violet/30" />
              {t('visionTitle')}
            </h2>
            <h1 className="text-6xl lg:text-8xl font-heading font-bold text-skin-foreground mb-10 leading-[0.9] tracking-tighter uppercase">
              {t('visionMain1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan">
                {t('visionMain2')} .
              </span>
            </h1>
            <p className="text-2xl text-slate-500 leading-relaxed font-light italic border-l-4 border-brand-violet/20 pl-10 py-4 mb-12">
              "{t('ceoMessage')}"
            </p>
            <div className="flex items-center gap-8">
              <div className="w-20 h-[1px] bg-brand-cyan/20" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-600">{t('ceoLabel')}</span>
            </div>
          </motion.header>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[64px] overflow-hidden bg-skin-card border border-white/5 flex items-center justify-center group shadow-2xl shadow-brand-violet/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/10 via-transparent to-brand-cyan/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="text-center p-16 z-10">
              <div className="text-7xl mb-10 filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-125">🔭</div>
              <h3 className="text-3xl font-heading font-bold text-skin-foreground mb-4 uppercase tracking-tight">{t('rndTitle')}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs mx-auto">{t('rndDesc')}</p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <section className="mb-48 relative">
          <div className="absolute inset-0 bg-brand-violet/5 blur-[120px] rounded-full -z-10" />
          <h3 className="text-5xl font-heading font-bold text-skin-foreground mb-24 text-center tracking-tighter uppercase">{t('timelineHeading')}</h3>
          <div className="relative max-w-5xl mx-auto space-y-20">
            <div className="absolute left-0 lg:left-1/2 top-0 w-px h-full bg-gradient-to-b from-brand-violet via-brand-cyan to-transparent opacity-20" />
            
            {timelineKeys.map((year, idx) => (
              <motion.div 
                key={year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-12 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="lg:w-1/2 flex flex-col px-8">
                  <div className={cn(
                    "p-12 rounded-[48px] bg-skin-card border border-white/5 hover:border-brand-violet/30 transition-all shadow-xl group relative overflow-hidden",
                    idx % 2 === 0 ? 'text-left lg:text-right' : 'text-left'
                  )}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-4xl font-heading font-bold text-brand-cyan mb-6 block tracking-tighter">{year}</span>
                    <p className="text-slate-400 font-bold text-lg leading-relaxed relative z-10">{t(`timeline.${year}`)}</p>
                  </div>
                </div>
                <div className="absolute left-[-6px] lg:left-1/2 lg:ml-[-6px] w-[12px] h-[12px] bg-brand-violet rounded-full shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.8)] z-20 border-2 border-skin-base" />
                <div className="lg:w-1/2 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {valueKeys.map((v, idx) => (
            <motion.div 
              key={v}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-12 rounded-[40px] bg-skin-card border border-white/5 hover:-translate-y-4 transition-all duration-500 shadow-2xl group flex flex-col"
            >
              <h4 className="text-brand-cyan font-mono text-[10px] font-black tracking-[0.3em] uppercase mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-brand-cyan/30" />
                {commonT(v)}
              </h4>
              <p className="text-2xl font-bold text-skin-foreground mb-8 leading-tight tracking-tight uppercase flex-1">{t(`values.${v}`)}</p>
              <div className="w-12 h-1.5 bg-brand-violet rounded-full shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.4)] group-hover:w-24 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
