'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const t = useTranslations('Products');
  const params = useParams();
  const id = params?.id as string;

  // mapping logic or translation key
  const productKey = id === 'uv-roll-to-roll' ? 'uvRoll' : (id === 'mir-system' ? 'mirSystem' : 'uvRoll');

  return (
    <div className="bg-brand-navy min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          <div className="aspect-square bg-slate-900 rounded-[60px] border border-white/5 relative overflow-hidden flex items-center justify-center group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-violet/20 via-transparent to-brand-cyan/20 opacity-50" />
            <div className="text-9xl grayscale group-hover:grayscale-0 transition-all group-hover:rotate-6 duration-700">📦</div>
          </div>

          <div className="space-y-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="text-brand-cyan font-mono text-xs tracking-[0.5em] uppercase mb-4 block">Product Series</span>
              <h1 className="text-6xl font-heading font-black text-white mb-6 uppercase tracking-tighter">
                {t(`${productKey}.title`)}
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                {t(`${productKey}.desc`)}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-10 rounded-[40px] bg-white/5 border border-white/5"
            >
              <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-4">
                <div className="w-2 h-8 bg-brand-violet rounded-full" />
                {t(`${productKey}.specTitle`)}
              </h3>
              <div className="space-y-6">
                {[1, 2, 3].map(spec => (
                  <div key={spec} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-slate-500 font-medium">{t(`${productKey}.spec${spec}`)}</span>
                    <span className="text-brand-cyan font-mono text-sm uppercase tracking-widest">Available</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-bold text-xl rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all"
            >
              Request Quote
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
