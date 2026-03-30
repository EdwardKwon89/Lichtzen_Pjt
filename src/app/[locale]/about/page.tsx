'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const timelineKeys = ["2010", "2013", "2016", "2019", "2022", "2024"];
const valueKeys = ["precision", "sustainability", "innovation"];

export default function AboutPage() {
  const t = useTranslations('About');
  const commonT = useTranslations('Common');

  return (
    <div className="bg-brand-navy min-h-screen pt-24 pb-32 text-slate-200">
      <div className="container mx-auto px-6">
        {/* CEO Message / Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.header 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-brand-violet font-mono text-sm tracking-[0.3em] uppercase mb-6">{t('visionTitle')}</h2>
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight tracking-tighter">
              {t('visionMain1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan underline decoration-brand-cyan/20 underline-offset-8">
                {t('visionMain2')}
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed italic border-l-4 border-brand-violet pl-8 py-2">
              "{t('ceoMessage')}"
            </p>
            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-[2px] bg-brand-cyan/40" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">{t('ceoLabel')}</span>
            </div>
          </motion.header>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-white/5 flex items-center justify-center group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/10 via-transparent to-brand-cyan/10 opacity-50" />
            <div className="text-center p-12 z-10">
              <div className="text-6xl mb-8">🔭</div>
              <h3 className="text-2xl font-bold text-white mb-2">{t('rndTitle')}</h3>
              <p className="text-slate-500 text-sm">{t('rndDesc')}</p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <section className="mb-40">
          <h3 className="text-3xl font-heading font-bold text-white mb-16 text-center">{t('timelineHeading')}</h3>
          <div className="relative max-w-4xl mx-auto space-y-12">
            <div className="absolute left-0 lg:left-1/2 top-0 w-px h-full bg-gradient-to-b from-brand-violet via-brand-cyan to-transparent opacity-20" />
            
            {timelineKeys.map((year, idx) => (
              <motion.div 
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="lg:w-1/2 flex flex-col px-8">
                  <div className={`p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-violet/40 transition-all ${idx % 2 === 0 ? 'text-left lg:text-right' : 'text-left'}`}>
                    <span className="text-3xl font-heading font-bold text-brand-cyan mb-4 block">{year}</span>
                    <p className="text-slate-300 font-medium leading-relaxed">{t(`timeline.${year}`)}</p>
                  </div>
                </div>
                <div className="absolute left-[-5px] lg:left-1/2 lg:ml-[-5px] w-[10px] h-[10px] bg-brand-violet rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)] z-20" />
                <div className="lg:w-1/2 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueKeys.map((v, idx) => (
            <motion.div 
              key={v}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-10 rounded-2xl bg-gradient-to-b from-slate-900 to-brand-navy border border-white/5 hover:-translate-y-2 transition-transform"
            >
              <h4 className="text-brand-cyan font-mono text-xs tracking-widest uppercase mb-4">{commonT(v)}</h4>
              <p className="text-lg font-bold text-white mb-4">{t(`values.${v}`)}</p>
              <div className="w-8 h-1 bg-brand-violet/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
