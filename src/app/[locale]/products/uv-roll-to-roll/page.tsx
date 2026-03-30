const specs = [
  { label: "UV Ramp", value: "80, 120, 160 W/cm (Selectable)" },
  { label: "Cooling System", value: "Water Cooled / Air Cooled Hybrid" },
  { label: "Web Width", value: "Max 1,600 mm" },
  { label: "Operation Speed", value: "Up to 150 m/min" },
  { label: "Safety Features", value: "Auto-Shutter, Emergency Stop, Ozone Exhaust" },
];

export default function UVRollToRollPage() {
  return (
    <div className="bg-brand-navy min-h-screen pt-12 pb-24 text-slate-200">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 flex text-xs font-mono uppercase tracking-widest text-slate-500">
          <span className="hover:text-brand-violet cursor-pointer">Products</span>
          <span className="mx-2">/</span>
          <span className="text-slate-300">UV Systems</span>
          <span className="mx-2">/</span>
          <span className="text-brand-cyan font-bold">Roll-to-Roll UV</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Visual Content */}
          <div className="space-y-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/5 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* Existing Site Resource Placeholder (Will be replaced by real URL if available) */}
              <div className="text-center px-8 z-10 transition-transform duration-700 group-hover:scale-105">
                <div className="w-24 h-24 mb-6 mx-auto border-t-4 border-brand-violet rounded-full animate-spin-slow opacity-30" />
                <h3 className="text-sm font-mono text-brand-cyan tracking-widest mb-2 uppercase">Lichtzen UV Engineering</h3>
                <p className="text-2xl font-heading font-bold text-white">ROLL-TO-ROLL SYSTEM V2</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-slate-800/50 border border-white/5 hover:border-brand-violet/30 transition-colors cursor-pointer" />
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl font-heading font-bold text-white mb-6 leading-tight tracking-tighter">
                Highly Efficient <br />
                <span className="text-brand-violet">Roll-to-Roll</span> UV System
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Designed for high-speed continuous processes. Lichtzen's Roll-to-Roll UV system provides stable curing energy 
                even at speeds exceeding 150m/min, ensuring uniform quality for coating and printing industries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-slate-800/20 border border-white/5">
                <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Optical Precision</h4>
                <p className="text-xs text-slate-500">Optimized reflector design to minimize energy loss and maximize heat dissipation.</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-800/20 border border-white/5">
                <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Smart Control</h4>
                <p className="text-xs text-slate-500">Real-time UV monitoring and intelligent shutter control for energy efficiency.</p>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="pt-8">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest border-l-4 border-brand-cyan pl-4">
                Technical Specifications
              </h3>
              <div className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/40">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.label} className="border-b border-white/5 transition-colors hover:bg-white/5">
                        <td className="py-4 px-6 font-mono text-slate-500 w-1/3 text-xs uppercase">{spec.label}</td>
                        <td className="py-4 px-6 text-slate-200 font-medium">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-brand-violet hover:bg-brand-violet/80 text-white font-bold py-4 rounded-lg transition-all active:scale-95 shadow-lg shadow-brand-violet/20">
                Request Quote
              </button>
              <button className="flex-1 border border-white/10 hover:border-brand-cyan/50 text-white font-bold py-4 rounded-lg transition-all group">
                Download Catalog <span className="group-hover:ml-2 transition-all">↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
