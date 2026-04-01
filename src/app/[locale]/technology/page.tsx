'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target, Zap, Waves, Beaker, Cpu } from 'lucide-react';

export default function TechnologyPage() {
  const t = useTranslations('Technology');

  const techStack = [
    {
      id: "precision",
      icon: <Target className="w-8 h-8 text-brand-cyan" />
    },
    {
      id: "spectrum",
      icon: <Zap className="w-8 h-8 text-brand-violet" />
    },
    {
      id: "thermal",
      icon: <Waves className="w-8 h-8 text-brand-cyan" />
    }
  ];

  return (
    <div className="bg-skin-base min-h-screen pt-32 pb-32 text-skin-foreground transition-colors duration-500 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-violet/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-24"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-[10px] font-mono font-black tracking-[0.4em] uppercase mb-8 shadow-lg shadow-brand-cyan/5">
            {t('subtitle')}
          </span>
          <h1 className="text-6xl lg:text-7xl font-heading font-black text-skin-foreground mb-10 leading-none tracking-tighter uppercase">
            {t('title')} <span className="text-brand-violet">.</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed font-light max-w-2xl">
            {t('desc')}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {techStack.map((tech, idx) => (
            <motion.div 
              key={tech.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 rounded-[48px] bg-skin-card border border-white/5 hover:border-brand-violet/30 transition-all duration-500 group shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
                {tech.icon}
              </div>
              <h3 className="text-2xl font-bold text-skin-foreground mb-4 tracking-tight relative z-10">{t(`${tech.id}.title`)}</h3>
              <p className="text-slate-500 text-base leading-relaxed font-light relative z-10">{t(`${tech.id}.desc`)}</p>
            </motion.div>
          ))}
        </div>

        <section className="relative rounded-[64px] overflow-hidden bg-skin-card border border-white/5 p-12 lg:p-24 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--brand-accent-rgb)_0%,_transparent_70%)]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h3 className="text-4xl font-heading font-black text-skin-foreground mb-12 tracking-tighter uppercase flex items-center gap-4">
                <Beaker className="w-8 h-8 text-brand-cyan" />
                {t('rdTitle')}
              </h3>
              <div className="space-y-12">
                {[1, 2].map(num => (
                  <motion.div 
                    key={num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-8 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-brand-cyan font-mono font-black italic text-lg group-hover:bg-brand-cyan group-hover:text-white transition-all duration-500 shadow-xl">
                      0{num}
                    </div>
                    <div>
                      <h4 className="text-skin-foreground font-black mb-4 uppercase text-sm tracking-widest group-hover:text-brand-cyan transition-colors">
                        {t(`rdStep${num}.title`)}
                      </h4>
                      <p className="text-slate-500 text-base leading-relaxed font-light">{t(`rdStep${num}.desc`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[64px] bg-gradient-to-br from-brand-violet/20 via-transparent to-brand-cyan/20 border border-white/10 flex items-center justify-center relative group">
                <Cpu className="w-40 h-40 text-brand-violet opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-cyan/10 rounded-full blur-[60px]" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-violet/10 rounded-full blur-[60px]" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
