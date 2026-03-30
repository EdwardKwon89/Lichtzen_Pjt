const techStack = [
  {
    title: "Optical Simulation",
    description: "Advanced Ray-tracing and flux analysis to ensure 99.9% energy uniformity across the target surface.",
    icon: "🔬"
  },
  {
    title: "Spectrum Engineering",
    description: "Customized wavelength tuning for specific material absorption rates, maximizing efficiency.",
    icon: "📡"
  },
  {
    title: "Precision Thermal Control",
    description: "Multi-zone temperature monitoring and feedback loops for stable process environments.",
    icon: "🌡️"
  }
];

export default function TechnologyPage() {
  return (
    <div className="bg-brand-navy min-h-screen pt-24 pb-24 text-slate-200">
      <div className="container mx-auto px-6">
        <header className="max-w-3xl mb-20">
          <h2 className="text-brand-cyan font-mono text-sm tracking-[0.3em] uppercase mb-4">Core Competency</h2>
          <h1 className="text-5xl font-heading font-bold text-white mb-8 leading-tight">
            The Science of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan">Optical Precision</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Lichtzen doesn't just build equipment. We engineer light. Through rigorous simulation and spectral analysis, 
            we deliver unmatched performance in UV and IR applications.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {techStack.map((tech) => (
            <div key={tech.title} className="p-10 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-violet/30 transition-all group">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{tech.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{tech.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{tech.description}</p>
            </div>
          ))}
        </div>

        <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/5 p-12 lg:p-20">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--brand-cyan)_0%,_transparent_70%)]" />
          <div className="max-w-2xl relative z-10">
            <h3 className="text-3xl font-heading font-bold text-white mb-6 tracking-tight">R&D Powerhouse</h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-bold italic">01</div>
                <div>
                  <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Spectral Testing</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">We measure the exact absorption spectrum of your materials to design the perfect cure.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-violet/30 flex items-center justify-center text-brand-violet font-bold italic">02</div>
                <div>
                  <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Prototyping</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Rapid iteration of reflector geometries for optimized energy distribution.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
