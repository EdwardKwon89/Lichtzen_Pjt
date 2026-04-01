'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

import { Target, Zap, Globe } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('Home');
  const commonT = useTranslations('Common');

  const features = [
    { id: "precision", icon: <Target className="w-6 h-6 text-brand-cyan" /> },
    { id: "energy", icon: <Zap className="w-6 h-6 text-brand-violet" /> },
    { id: "global", icon: <Globe className="w-6 h-6 text-brand-cyan" /> }
  ];

  return (
    <div className="relative overflow-hidden bg-skin-base text-skin-foreground min-h-screen border-b border-white/5 transition-colors duration-500">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-skin-accent/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-skin-accent/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 pt-32 pb-40 relative z-10">
        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-xs font-mono tracking-[0.3em] uppercase mb-8 shadow-lg shadow-brand-cyan/5">
              {commonT('subtitle')}
            </span>
            <h1 className="text-6xl lg:text-8xl font-heading font-black text-skin-foreground mb-10 leading-tight tracking-tighter">
              {t('hero.title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-violet bg-[length:200%_auto] animate-gradient-slow uppercase">
                {t('hero.title2')}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl opacity-70 font-light leading-relaxed max-w-3xl mx-auto mb-14 drop-shadow-sm">
              {t('hero.desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              href="/products" 
              className="px-10 py-5 bg-skin-accent text-white font-bold rounded-full hover:brightness-110 hover:shadow-[0_0_40px_rgba(var(--brand-accent-rgb),0.4)] transition-all duration-500 group relative overflow-hidden"
            >
              <span className="relative z-10">{commonT('learnMore')}</span>
            </Link>
            <Link 
              href="/support" 
              className="px-10 py-5 bg-white/5 text-skin-foreground font-bold rounded-full border border-white/10 hover:bg-white/20 hover:border-skin-accent/40 transition-all backdrop-blur-md"
            >
              {commonT('contact')}
            </Link>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <motion.div 
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * idx, duration: 0.5 }}
              className="p-10 rounded-[32px] bg-white/5 border border-white/5 hover:border-brand-violet/30 transition-all duration-500 group backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-violet/20 to-brand-cyan/20 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-skin-foreground mb-4 tracking-tight">{t(`features.${f.id}`)}</h3>
              <p className="opacity-70 font-light leading-relaxed">
                {t(`features.${f.id}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Decorative Line Animations */}
      <div className="absolute left-0 bottom-20 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-violet/20 to-transparent" />
    </div>
  );
}
