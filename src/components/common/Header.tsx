"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Technology", href: "/technology" },
  { name: "Support", href: "/support" },
  { name: "Company", href: "/company" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-navy/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-violet to-brand-cyan rounded-sm transform group-hover:rotate-45 transition-transform duration-500" />
          <span className="text-2xl font-heading font-bold tracking-tighter text-white">
            LICHTZEN
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-brand-cyan transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <button className="bg-brand-violet hover:bg-brand-violet/90 text-white px-5 py-2 rounded-md text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-violet/20">
            Contact Us
          </button>
        </nav>

        {/* Mobile Menu Icon Placeholder */}
        <div className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </div>
    </header>
  );
}
