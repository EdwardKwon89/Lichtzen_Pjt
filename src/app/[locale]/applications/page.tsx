'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

const industries = ["battery", "oled"];

export default function ApplicationsPage() {
  const t = useTranslations('Applications');
  const commonT = useTranslations('Common');

  return (
    <div className="bg-skin-base min-h-screen pt-32 pb-32 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-24"
        >
          <h1 className="text-6xl font-heading font-black text-skin-foreground mb-8 tracking-tighter uppercase">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed">
            {t('desc')}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-12">
          {industries.map((ind, idx) => (
            <motion.div 
              key={ind}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative rounded-[40px] overflow-hidden bg-skin-card border border-white/5 flex flex-col lg:flex-row shadow-2xl"
            >
              <div className="lg:w-1/2 h-[400px] bg-slate-800/20 relative overflow-hidden flex items-center justify-center">
                {ind === 'battery' ? (
                  <Image 
                    src="/images/applications/battery.png"
                    alt={t(`${ind}.name`)}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                ) : (
                  <Image 
                    src="/images/applications/oled.png"
                    alt={t(`${ind}.name`)}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-skin-base/40 to-transparent" />
              </div>

              <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                <span className="text-brand-violet font-mono text-xs tracking-widest uppercase mb-4">{t(`${ind}.name`)}</span>
                <h3 className="text-4xl font-bold text-skin-foreground mb-6 tracking-tight">{t(`${ind}.title`)}</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-10 font-light">
                  {t(`${ind}.desc`)}
                </p>
                <div className="space-y-4 mb-10">
                  {[1, 2, 3].map(f => (
                    <div key={f} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(var(--brand-accent-rgb),0.5)]" />
                      <span className="text-skin-foreground/80 font-medium">{t(`${ind}.feat${f}`)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <Link 
                    href="/support"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-cyan hover:text-white transition-colors group/link px-6 py-3 rounded-full border border-brand-cyan/20 hover:bg-brand-cyan shadow-lg shadow-brand-cyan/10"
                  >
                    {commonT('contact')}
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
