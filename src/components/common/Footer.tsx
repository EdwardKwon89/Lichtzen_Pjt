import Link from "next/link";

const footerLinks = {
  products: [
    { name: "UV Lamps", href: "#" },
    { name: "IR Heaters", href: "#" },
    { name: "Optical Sensors", href: "#" },
    { name: "Custom Solutions", href: "#" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "History", href: "/history" },
    { name: "Certifications", href: "/certs" },
    { name: "Global Offices", href: "/offices" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Global Warranty", href: "/warranty" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/5 py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-6 h-6 bg-brand-violet rounded-sm" />
            <span className="text-xl font-heading font-bold text-white tracking-widest">
              LICHTZEN
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs transition-opacity duration-500 opacity-80 hover:opacity-100">
            Precision engineering for global industries. Innovating the spectrum of light to power the future.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-4">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-brand-cyan transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Organization</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-brand-cyan transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Compliance</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-brand-cyan transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">
          © 2024 LICHTZEN GLOBAL CORP. ALL RIGHTS RESERVED.
        </p>
        <div className="flex space-x-6">
          <span className="text-[10px] text-slate-500 hover:text-brand-violet cursor-pointer uppercase tracking-tighter">LinkedIn</span>
          <span className="text-[10px] text-slate-500 hover:text-brand-violet cursor-pointer uppercase tracking-tighter">YouTube</span>
        </div>
      </div>
    </footer>
  );
}
