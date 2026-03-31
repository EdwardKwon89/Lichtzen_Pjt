'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';

export default function Header() {
  const t = useTranslations('Common');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('products'), href: '/products/spot-uv' },
    { name: t('technology'), href: '/technology' },
    { name: t('applications'), href: '/applications' },
    { name: t('about'), href: '/about' },
    { name: t('support'), href: '/support' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-navy/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-brand-violet to-brand-cyan rounded-lg group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
          <span className="text-xl font-heading font-black text-white tracking-widest uppercase">{t('title')}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href as any} 
                  className={`text-sm font-medium transition-colors hover:text-brand-cyan ${pathname === link.href ? 'text-brand-cyan' : 'text-slate-400'}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6 pl-8 border-l border-white/10">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 border border-white/10 group">
              <Globe className="w-3 h-3 text-slate-500 group-hover:text-brand-cyan transition-colors" />
              <div className="flex gap-2 text-[10px] font-bold font-mono tracking-widest">
                <Link 
                  href={pathname as any} 
                  locale="ko" 
                  className={`transition-colors ${locale === 'ko' ? 'text-brand-cyan' : 'text-slate-600 hover:text-white'}`}
                >
                  KO
                </Link>
                <span className="text-white/10">|</span>
                <Link 
                  href={pathname as any} 
                  locale="en" 
                  className={`transition-colors ${locale === 'en' ? 'text-brand-cyan' : 'text-slate-600 hover:text-white'}`}
                >
                  EN
                </Link>
              </div>
            </div>
            <Link 
              href="/support"
              className="text-xs font-bold uppercase tracking-widest bg-white text-brand-navy px-6 py-2 rounded-full hover:bg-brand-cyan transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center"
              onClick={(e) => {
                if (pathname === '/support') {
                  e.preventDefault();
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('contact')}
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-navy/95 backdrop-blur-xl z-[60] lg:hidden flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-2xl font-black text-white tracking-widest">{t('title')}</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-10 h-10 text-brand-cyan" /></button>
            </div>
            
            <ul className="flex flex-col gap-8 mb-12">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href as any} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-heading font-bold text-white hover:text-brand-violet transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-8">
              <div className="flex gap-6 text-xl font-bold font-mono">
                <Link href={pathname as any} locale="ko" className={locale === 'ko' ? 'text-brand-cyan' : 'text-slate-600'}>KOREAN</Link>
                <Link href={pathname as any} locale="en" className={locale === 'en' ? 'text-brand-cyan' : 'text-slate-600'}>ENGLISH</Link>
              </div>
              <Link 
                href="/support"
                className="w-full py-6 bg-brand-violet text-white font-bold text-xl rounded-2xl shadow-2xl flex items-center justify-center"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (pathname === '/support') {
                    e.preventDefault();
                    setTimeout(() => {
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }
                }}
              >
                {t('contact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
