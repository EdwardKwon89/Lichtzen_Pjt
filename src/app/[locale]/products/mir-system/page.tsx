const specs = [
  { label: "Radiant Flux", value: "2.5 - 5.0 W/cm²" },
  { label: "Wavelength", value: "2.5 - 4.0 μm (Medium Wave)" },
  { label: "Heating Accuracy", value: "±2°C Stability" },
  { label: "Response Time", value: "< 2.0 s (Instant On/Off)" },
  { label: "Application", value: "Drying, Coating, Textile, Battery Electrode" },
];

export default function MIRSystemPage() {
  return (
    <div className="bg-brand-navy min-h-screen pt-12 pb-24 text-slate-200">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 flex text-xs font-mono uppercase tracking-widest text-slate-500">
          <span className="hover:text-brand-violet cursor-pointer">Products</span>
          <span className="mx-2">/</span>
          <span className="text-slate-300">IR Drying Systems</span>
          <span className="mx-2">/</span>
          <span className="text-brand-cyan font-bold">MIR Technology</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Visual Content */}
          <div className="space-y-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/5 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="text-center px-8 z-10 transition-transform duration-700 group-hover:scale-105">
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent mb-6 mx-auto animate-pulse" />
                <h3 className="text-sm font-mono text-brand-cyan tracking-widest mb-2 uppercase">Lichtzen Thermal Control</h3>
                <p className="text-2xl font-heading font-bold text-white uppercase">MIR Drying Core</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-slate-800/10 border border-brand-cyan/20">
                <div className="text-brand-cyan text-sm font-bold mb-1">98% Efficient</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Energy Transfer</div>
              </div>
              <div className="p-6 rounded-xl bg-slate-800/10 border border-brand-violet/20">
                <div className="text-brand-violet text-sm font-bold mb-1">Instant On</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Responsive Speed</div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl font-heading font-bold text-white mb-6 leading-tight tracking-tighter">
                Medium Wave <br />
                <span className="text-brand-cyan">Infrared (MIR)</span> System
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Unlock the power of precision heating. Lichtzen's MIR technology focuses energy on the core of the coating, 
                minimizing surface scorching while maximizing drying efficiency for high-end battery and semiconductor materials.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-widest border-l-4 border-brand-violet pl-4">
                Core Advantages
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2" />
                  <span className="text-sm text-slate-400">Deep penetration with medium wavelength for thicker coatings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2" />
                  <span className="text-sm text-slate-400">Optimized zone control to maintain perfect temperature uniformity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2" />
                  <span className="text-sm text-slate-400">Significant energy saving compared to conventional hot air drying.</span>
                </li>
              </ul>
            </div>

            {/* Specifications Table */}
            <div>
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

            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-brand-cyan hover:bg-brand-cyan/80 text-brand-navy font-bold py-4 rounded-lg transition-all active:scale-95 shadow-lg shadow-brand-cyan/20">
                Request MIR Tech Detail
              </button>
              <button className="flex-1 border border-white/10 hover:border-brand-violet/50 text-white font-bold py-4 rounded-lg transition-all">
                Download Technical Paper
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
