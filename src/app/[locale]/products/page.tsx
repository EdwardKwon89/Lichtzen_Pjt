'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';

const categories = ['led', 'lamp', 'mir', 'instrument'] as const;
const products = [
  { id: 'ls4', category: 'led' },
  { id: 'lba', category: 'led' },
  { id: 'innocure', category: 'lamp' },
  { id: 'conveyor', category: 'lamp' },
  { id: 'uvRoll', category: 'lamp' },
  { id: 'mirSystem', category: 'mir' },
  { id: 'radiometer', category: 'instrument' },
  { id: 'components', category: 'instrument' },
] as const;

export default function ProductsPage() {
  const t = useTranslations('Products');

  return (
    <main className="bg-brand-navy min-h-screen pt-24 pb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-brand-cyan font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
            Solutions
          </span>
          <h1 className="text-5xl md:text-6xl font-heading font-black text-white mb-8 tracking-tighter uppercase">
            {t('list.title')}
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
            {t('list.desc')}
          </p>
        </motion.div>
      </section>

      {/* Category Sections */}
      <div className="container mx-auto px-6 space-y-32">
        {categories.map((cat, catIdx) => (
          <section key={cat} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-12"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-widest px-8 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm shadow-xl">
                {t(`list.categories.${cat}`)}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter((p) => p.category === cat)
                .map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="group block relative p-1 rounded-[32px] bg-white/5 border border-white/5 hover:border-brand-violet/50 transition-all duration-500 overflow-hidden h-full"
                    >
                      {/* Image Area */}
                      <div className="aspect-[16/10] bg-slate-900 rounded-[28px] relative overflow-hidden flex items-center justify-center p-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/20 via-transparent to-brand-cyan/20 opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                        
                        {/* Dynamic Icon placeholder until images generated */}
                        <div className="text-5xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700">
                          {cat === 'led' ? '💡' : cat === 'lamp' ? '⚙️' : cat === 'mir' ? '🔥' : '📐'}
                        </div>

                        <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="w-10 h-10 rounded-full bg-brand-violet flex items-center justify-center text-white shadow-lg shadow-brand-violet/40">
                            <ArrowRight size={18} />
                          </div>
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="p-8 space-y-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                          {t(`${product.id}.title`)}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-light">
                          {t(`${product.id}.desc`)}
                        </p>
                        
                        <div className="pt-4 border-t border-white/5">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] group-hover:text-brand-violet transition-colors">
                            Technical Excellence // 0{idx + (catIdx + 1) * 3}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
