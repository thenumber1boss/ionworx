"use client";
import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Sun, 
  Battery, 
  CheckCircle2, 
  ChevronDown
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* --- 1. HERO SECTION (Restructured) --- */}
      {/* Added pt-32 md:pt-40 to clear fixed header */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 md:pt-40 pb-20">
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-40 dark:opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-8 animate-in slide-in-from-left duration-700 fade-in order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/20 w-fit">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent))] animate-pulse"></span>
                <span className="text-[hsl(var(--accent))] text-xs font-bold tracking-wider uppercase">Future of Energy</span>
            </div>
            
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight">
              Own Your Power. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]">
                Control Your Cost.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              The grid is unreliable. Prices are rising. Ionworx engineering upgrades your property with elite solar infrastructure that pays for itself. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button 
                onClick={() => window.open("https://wa.me/+2347063000481", "_blank")}
                className="group px-8 py-4 rounded-xl bg-[hsl(var(--primary))] text-white font-bold text-lg shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Get a Proposal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link 
                href="/planner"
                className="px-8 py-4 rounded-xl border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold text-lg transition-colors flex items-center justify-center"
              >
                Simulate Savings
              </Link>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <span>25-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <span>99% Uptime</span>
                </div>
            </div>
          </div>

          {/* Right Column: Visual (Now visible on mobile but stacked) */}
          <div className="relative order-2 w-full animate-in slide-in-from-right duration-1000 fade-in delay-200">
             {/* Glow Effect */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[hsl(var(--primary))] rounded-full blur-[120px] opacity-20"></div>
             
             {/* Image Container */}
             <div className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 backdrop-blur-sm group">
                {/* Gradient fade to blend hard edge */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
                
                <img src="/images/hero-img.png" alt="Solar Installation" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
                
                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 p-6 rounded-xl bg-background/90 backdrop-blur-md border border-white/10 shadow-lg z-20">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-muted-foreground">Current Generation</span>
                        <span className="text-green-500 flex items-center text-xs font-bold"><TrendingUp className="w-3 h-3 mr-1"/> +12% vs grid</span>
                    </div>
                    <div className="text-3xl font-bold font-[family-name:var(--font-heading)]">8.4 kW</div>
                    <div className="w-full bg-secondary h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-[hsl(var(--accent))] h-full w-[70%] rounded-full animate-pulse"></div>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* --- 2. TRUST BADGES --- */}
      <section className="py-10 border-y border-white/5 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest font-semibold">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {['LG', 'Tesla', 'SunPower', 'Canadian Solar'].map(brand => (
                    <span key={brand} className="text-2xl font-bold text-foreground/40 hover:text-foreground cursor-default transition-colors">{brand}</span>
                ))}
            </div>
        </div>
      </section>

      {/* --- 3. VALUE PROP: The Switch --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6">Why the old grid is <span className="text-red-500">failing</span> you.</h2>
            <p className="text-muted-foreground text-lg">You are renting power at a premium price. Ionworx helps you become your own utility company.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Pain Point 1 */}
            <div className="p-8 rounded-2xl bg-secondary/20 border border-transparent hover:border-red-500/30 transition-colors">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
                    <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Unpredictable Costs</h3>
                <p className="text-muted-foreground">Tariffs increase every year. With solar, you lock in your energy price for the next 25 years.</p>
            </div>
            {/* Pain Point 2 */}
            <div className="p-8 rounded-2xl bg-secondary/20 border border-transparent hover:border-[hsl(var(--accent))]/30 transition-colors relative overflow-hidden group">
                <div className="absolute inset-0 bg-[hsl(var(--accent))]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 bg-[hsl(var(--accent))]/10 rounded-full flex items-center justify-center mb-6 text-[hsl(var(--accent))] relative z-10">
                    <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">The Ionworx Standard</h3>
                <p className="text-muted-foreground relative z-10">We don't do "manage." We do "solve." Our systems are oversized to handle startup loads that crush cheap inverters.</p>
            </div>
            {/* Pain Point 3 */}
            <div className="p-8 rounded-2xl bg-secondary/20 border border-transparent hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 text-blue-500">
                    <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Total Independence</h3>
                <p className="text-muted-foreground">Blackouts don't exist here. Our sub-10ms switchover means your Netflix doesn't even buffer when the grid dies.</p>
            </div>
        </div>
      </section>

      {/* --- 4. SERVICES TEASER --- */}
      <section className="py-24 bg-[hsl(var(--card))] border-y border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6">
                    Industrial Grade.<br/> 
                    <span className="text-[hsl(var(--primary))]">Residential Feel.</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                    Whether you are powering a duplex in Lekki or a factory in Agbara, our engineering DNA remains the same: Robust, Efficient, Beautiful.
                </p>
                <div className="space-y-4 mb-8">
                    {['Hybrid Inverter Systems', 'Lithium Battery Storage', 'Solar Farm Development', 'EV Charging Stations'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="text-[hsl(var(--accent))]" size={20} />
                            <span className="font-medium">{item}</span>
                        </div>
                    ))}
                </div>
                <Link href="/services" className="inline-flex items-center text-[hsl(var(--primary))] font-bold hover:gap-2 transition-all">
                    View All Services <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                    <div className="p-6 rounded-2xl bg-secondary hover:bg-[hsl(var(--primary))] hover:text-white transition-colors cursor-pointer group">
                        <Sun className="mb-4 text-[hsl(var(--accent))] group-hover:text-white" size={32} />
                        <h4 className="font-bold">Solar Panels</h4>
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary hover:bg-[hsl(var(--primary))] hover:text-white transition-colors cursor-pointer group">
                        <Battery className="mb-4 text-[hsl(var(--accent))] group-hover:text-white" size={32} />
                        <h4 className="font-bold">Battery Banks</h4>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-secondary hover:bg-[hsl(var(--primary))] hover:text-white transition-colors cursor-pointer group">
                        <TrendingUp className="mb-4 text-[hsl(var(--accent))] group-hover:text-white" size={32} />
                        <h4 className="font-bold">Smart Monitoring</h4>
                    </div>
                    <div className="p-6 rounded-2xl bg-[hsl(var(--accent))] text-black cursor-pointer">
                        <h4 className="font-bold text-2xl mb-2">500+</h4>
                        <p className="text-xs font-semibold uppercase opacity-70">Projects Delivered</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- 5. GAME TEASER --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-[hsl(var(--primary))] text-white relative">
            <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.png')]"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 p-12 md:p-20 items-center">
                <div>
                    <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider mb-6">
                        Interactive Simulator
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6">
                        Can you beat <br/>the Grid?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8">
                        Most people overestimate what they need. Use our "Grid Master" simulator to build your virtual home, add appliances, and see exactly how much you can save.
                    </p>
                    <Link 
                        href="/planner"
                        className="inline-flex items-center px-8 py-4 bg-white text-[hsl(var(--primary))] rounded-xl font-bold hover:bg-[hsl(var(--accent))] hover:text-black transition-colors"
                    >
                        Play Simulator <ArrowRight className="ml-2" />
                    </Link>
                </div>
                <div className="relative">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold uppercase text-white/60">Load Profile</span>
                            <span className="text-green-400 font-mono">SAFE</span>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 bg-white/20 rounded-full w-full overflow-hidden">
                                <div className="h-full bg-green-400 w-[60%]"></div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>2HP AC</span>
                                <span className="font-mono">2500W</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Freezer</span>
                                <span className="font-mono">300W</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- 6. SEO FAQ SECTION --- */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
            {[
                {q: "How much does a solar system cost in Nigeria?", a: "Costs vary based on load. A basic 3kVA system starts around ₦3.5m, while robust family systems range from ₦6m to ₦10m. Use our Planner to get an exact estimate."},
                {q: "Do you offer payment plans?", a: "Yes, we partner with financial institutions to offer structured payment plans for commercial and high-end residential installations."},
                {q: "How long do the batteries last?", a: "We strictly use Lithium Iron Phosphate (LiFePO4) batteries which last 10-15 years (6000+ cycles), unlike old tubular batteries that die in 18 months."},
                {q: "Can I run my AC on solar?", a: "Absolutely. Our systems are specifically engineered to handle the inductive surge of Air Conditioners and Freezers."}
            ].map((faq, i) => (
                <details key={i} className="group bg-secondary/30 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 font-bold text-lg select-none group-hover:text-[hsl(var(--primary))] transition-colors">
                        {faq.q}
                        <ChevronDown className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.a}
                    </div>
                </details>
            ))}
        </div>
      </section>

      {/* --- 7. FINAL CTA --- */}
      <section className="py-24 bg-black text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6">Stop renting your life.</h2>
            <p className="text-gray-400 mb-10 text-lg">
                Join 500+ Nigerians who have declared independence from the grid.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                    onClick={() => window.open("https://wa.me/+2347063000481", "_blank")}
                    className="px-8 py-4 bg-[hsl(var(--accent))] text-black font-bold rounded-xl hover:bg-white transition-colors"
                >
                    Get a Quote Now
                </button>
                <Link href="/projects" className="px-8 py-4 border border-white/20 rounded-xl font-bold hover:bg-white/10 transition-colors">
                    See Our Work
                </Link>
            </div>
        </div>
      </section>

    </div>
  );
}