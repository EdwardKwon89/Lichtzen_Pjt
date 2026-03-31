import Image from "next/image";

const specs = [
  { label: "Irradiance", value: "Up to 15,000 mW/cm²" },
  { label: "Irradiation Area", value: "φ3, φ5, φ8, φ10 mm (Customizable)" },
  { label: "Wavelength", value: "365, 385, 395, 405 nm" },
  { label: "Channel Opts", value: "1CH / 4CH / 8CH Controller" },
  { label: "Cooling Method", value: "Fanless Natural Sealing / Air Flow" },
];

export default function SpotUVPage() {
  return (
    <div className="bg-brand-navy min-h-screen pt-32 pb-24 text-slate-200">
      <div className="container mx-auto px-6">
        {/* Breadcrumb ... (unchanged) */}
        <nav className="mb-8 flex text-xs font-mono uppercase tracking-widest text-slate-500">
          <span className="hover:text-brand-violet cursor-pointer">Products</span>
          <span className="mx-2">/</span>
          <span className="text-slate-300">UV Systems</span>
          <span className="mx-2">/</span>
          <span className="text-brand-cyan font-bold">Spot UV</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Visual Content */}
          <div className="space-y-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 group">
              <Image 
                src="/images/products/spot-uv.png"
                alt="High-Precision Spot UV Curing System"
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]" />
                  <span className="text-xs font-mono text-brand-cyan tracking-widest uppercase">System Active</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-white uppercase tracking-tighter">AETHER-UV 8000 SERIES</h3>
              </div>
            </div>

            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-navy border border-white/5">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Precision Control Unit</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-400">Power Level</span>
                  <span className="text-brand-cyan">0 - 100% (Manual/Auto)</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-400">Timer Range</span>
                  <span className="text-brand-cyan">0.1 - 999.9 sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl font-heading font-bold text-white mb-6 leading-tight tracking-tighter">
                Ultra-Precision <br />
                <span className="text-brand-violet">Spot UV</span> Curing
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Experience extreme precision in spot curing. Our Spot UV systems are optimized for electronic components, 
                medical devices, and lens bonding where absolute positioning and energy stability are non-negotiable.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-slate-800/10 border border-white/5">
                <div className="w-8 h-8 rounded bg-brand-violet/20 flex items-center justify-center mb-4 text-brand-violet text-xs font-bold">LED</div>
                <h4 className="text-sm font-bold text-white mb-2">Cool UV Source</h4>
                <p className="text-xs text-slate-500">Minimal heat generation protecting delicate components.</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-800/10 border border-white/5">
                <div className="w-8 h-8 rounded bg-brand-cyan/20 flex items-center justify-center mb-4 text-brand-cyan text-xs font-bold">10k+</div>
                <h4 className="text-sm font-bold text-white mb-2">High Durability</h4>
                <p className="text-xs text-slate-500">Over 20,000 hours of LED life for continuous production.</p>
              </div>
            </div>

            {/* Specifications Table */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest border-l-4 border-brand-cyan pl-4">
                Technical Specifications
              </h3>
              <div className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/40 font-mono">
                <table className="w-full text-left text-xs uppercase">
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.label} className="border-b border-white/5 transition-colors hover:bg-white/5 text-slate-400">
                        <td className="py-4 px-6 w-1/3 border-r border-white/5">{spec.label}</td>
                        <td className="py-4 px-6 text-brand-cyan">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-heading font-bold py-5 rounded-xl shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all">
              Request Technical Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
