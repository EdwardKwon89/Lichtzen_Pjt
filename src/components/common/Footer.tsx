'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('Common');

  const footerLinks = {
    products: [
      { name: "UV Roll-to-Roll", href: "/products/uv-roll-to-roll" },
      { name: "MIR Systems", href: "/products/mir-system" },
      { name: "Spot UV Curing", href: "/products/spot-uv" },
    ],
    company: [
      { name: t('about'), href: "/about" },
      { name: t('technology'), href: "/technology" },
      { name: t('applications'), href: "/applications" },
    ],
    support: [
      { name: "Inquiry Form", href: "/support" },
      { name: "Technical Support", href: "/support" },
    ]
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-brand-violet to-brand-cyan rounded-lg" />
              <span className="text-2xl font-heading font-black text-white tracking-widest uppercase">{t('title')}</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              Global leader in UV and IR optical precision systems. 
              Engineering the next generation of industrial performance for the mobility and electronics sectors.
            </p>
            <div className="flex gap-4">
              {['LinkedIn', 'Twitter', 'YouTube'].map(social => (
                <a key={social} href="#" className="text-slate-600 hover:text-brand-cyan transition-colors text-xs font-mono uppercase tracking-widest">{social}</a>
              ))}
            </div>
          </div>

          {/* Links Side */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">{t('products')}</h4>
            <ul className="space-y-3">
              {footerLinks.products.map(link => (
                <li key={link.name}><Link href={link.href as any} className="text-slate-500 hover:text-white transition-colors text-sm">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.name}><Link href={link.href as any} className="text-slate-500 hover:text-white transition-colors text-sm">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Business</h4>
            <ul className="space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.name}><Link href={link.href as any} className="text-slate-500 hover:text-white transition-colors text-sm">{link.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
            © 2026 Lichtzen Co., Ltd. All Rights Reserved. | Seodaemun-gu, Seoul, Korea
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-slate-600 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-600 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
