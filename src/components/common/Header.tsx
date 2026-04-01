'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, Palette, Sun, Moon, Zap, Waves } from 'lucide-react';
import { useTheme } from '@/app/ThemeContext';

export default function Header() {
  const t = useTranslations('Common');
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const isAdmin = pathname.includes('/admin');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Temporarily show header even on admin pages for debugging/theme test
  // if (isAdmin) return null;

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('products'), href: '/products/spot-uv' },
    { name: t('technology'), href: '/technology' },
    { name: t('applications'), href: '/applications' },
    { name: t('about'), href: '/about' },
    { name: t('support'), href: '/support' }
  ];

  const themes = [
    { id: 'deep-navy', icon: <Zap className="w-3 h-3" />, label: 'Deep Navy' },
    { id: 'ocean-depth', icon: <Waves className="w-3 h-3" />, label: 'Ocean' },
    { id: 'industrial-graphite', icon: <Moon className="w-3 h-3" />, label: 'Industrial' },
    { id: 'frosty-crystal', icon: <Sun className="w-3 h-3" />, label: 'Crystal' }
  ] as const;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-skin-base shadow-2xl border-b border-white/5 py-2' : 'bg-skin-base/20 backdrop-blur-sm py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-brand-violet to-brand-cyan rounded-lg group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center justify-center p-1">
            <div className="w-full h-full bg-skin-base rounded-sm" />
          </div>
          <span className="text-xl font-heading font-black text-skin-foreground tracking-widest uppercase">{t('title')}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href as any} 
                  className={`text-sm font-medium transition-colors hover:text-skin-accent ${pathname === link.href ? 'text-skin-accent' : 'text-slate-400'}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 pl-8 border-l border-white/10">
            {/* Theme Switcher */}
            <div className="flex items-center gap-2 bg-white/5 rounded-full p-1.5 border border-white/10 shadow-inner backdrop-blur-md">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={t.label}
                  className={`p-2 rounded-full transition-all duration-300 relative group/btn ${theme === t.id ? 'bg-skin-accent text-white scale-110 shadow-[0_0_15px_rgba(var(--brand-accent-rgb),0.5)]' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                >
                  <div className="w-4 h-4 transition-transform group-hover/btn:scale-110">{t.icon}</div>
                  {theme === t.id && (
                    <motion.div 
                      layoutId="activeTheme"
                      className="absolute inset-0 bg-skin-accent rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 border border-white/10 group">
              <Globe className="w-3 h-3 text-slate-500 group-hover:text-skin-accent transition-colors" />
              <div className="flex gap-2 text-[10px] font-bold font-mono tracking-widest">
                <Link 
                  href={pathname as any} 
                  locale="ko" 
                  className={`transition-colors ${locale === 'ko' ? 'text-skin-accent' : 'text-slate-600 hover:text-skin-foreground'}`}
                >
                  KO
                </Link>
                <span className="text-white/10">|</span>
                <Link 
                  href={pathname as any} 
                  locale="en" 
                  className={`transition-colors ${locale === 'en' ? 'text-skin-accent' : 'text-slate-600 hover:text-skin-foreground'}`}
                >
                  EN
                </Link>
              </div>
            </div>
            <Link 
              href="/support"
              className="text-xs font-bold uppercase tracking-widest bg-white text-brand-navy px-6 py-2 rounded-full hover:bg-skin-accent hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center border border-transparent"
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
