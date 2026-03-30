export default function SupportPage() {
  return (
    <div className="bg-brand-navy min-h-screen pt-24 pb-24 text-slate-200">
      <div className="container mx-auto px-6">
        <header className="max-w-3xl mb-16 text-center mx-auto">
          <h2 className="text-brand-cyan font-mono text-xs tracking-[0.4em] uppercase mb-4 animate-pulse">Global Support Center</h2>
          <h1 className="text-5xl font-heading font-bold text-white mb-8 tracking-tighter">
            We are here to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan">solve your challenges</span>
          </h1>
          <p className="text-lg text-slate-400">
            Lichtzen provides professional technical support and consultation for your UV/IR optical requirements. 
            Send us your inquiry and our experts will contact you within 24 hours.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-6xl mx-auto">
          {/* Contact Details */}
          <div className="space-y-8 lg:col-span-1">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 space-y-6">
              <div>
                <h4 className="text-slate-500 font-mono text-[10px] tracking-widest uppercase mb-2">Primary Contact</h4>
                <p className="text-lg font-bold text-white tracking-tight">+82 10 1234 5678</p>
              </div>
              <div>
                <h4 className="text-slate-500 font-mono text-[10px] tracking-widest uppercase mb-2">Technical Inquiry</h4>
                <p className="text-lg font-bold text-white tracking-tight">tech.support@lichtzen.com</p>
              </div>
              <div>
                <h4 className="text-slate-500 font-mono text-[10px] tracking-widest uppercase mb-2">Location</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Lichtzen Optical Research Center,<br />
                  Seodaemun-gu, Seoul, Republic of Korea
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-brand-violet/10 border border-brand-violet/20 flex flex-col justify-between aspect-square">
              <h3 className="text-xl font-bold text-white mb-4">Request a <br />Technical Demo</h3>
              <p className="text-slate-400 text-xs mb-8 leading-relaxed">Experience our optical precision first-hand at our test lab. We support various sample testing.</p>
              <button className="w-full py-4 bg-brand-violet text-white font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all">Schedule a Demo</button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 p-10 rounded-2xl bg-white/5 border border-white/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Your Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-brand-violet outline-none transition-all placeholder:text-white/10" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Business Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-brand-violet outline-none transition-all placeholder:text-white/10" placeholder="john@company.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Inquiry Topic</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-brand-violet outline-none transition-all appearance-none cursor-pointer">
                  <option className="bg-brand-navy">Product Inquiry & Quote</option>
                  <option className="bg-brand-navy">Technical Support</option>
                  <option className="bg-brand-navy">Partnership Opportunity</option>
                  <option className="bg-brand-navy">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Message</label>
                <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-brand-violet outline-none transition-all placeholder:text-white/10 resize-none" placeholder="Describe your technical requirements or challenges..." />
              </div>

              <button className="w-full py-5 bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-bold rounded-xl shadow-xl shadow-brand-violet/20 hover:brightness-110 active:scale-[0.98] transition-all">Submit Evaluation Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
