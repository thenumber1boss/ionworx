"use client";
import React from "react";
import { 
  Sun, 
  Battery, 
  Zap, 
  Factory, 
  Recycle, 
  MonitorCheck, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      id: "residential",
      icon: <Sun className="w-8 h-8 text-[hsl(var(--accent))]" />,
      title: "Residential Solar",
      desc: "Turn your home into a micro-plant. High-efficiency panels coupled with intelligent inverters to slash bills by up to 90%.",
      features: ["Hybrid Inverters", "Rooftop & Ground Mounts", "Smart Load Management"],
    },
    {
      id: "storage",
      icon: <Battery className="w-8 h-8 text-[hsl(var(--accent))]" />,
      title: "Advanced Storage",
      desc: "Never fear a blackout again. Our Lithium-Iron (LiFePO4) battery banks provide seamless failover in milliseconds.",
      features: ["Tesla Powerwall Integration", "Scalable Battery Racks", "10-Year Warranty"],
    },
    {
      id: "commercial",
      icon: <Factory className="w-8 h-8 text-[hsl(var(--accent))]" />,
      title: "Commercial & Industrial",
      desc: "Powering factories, malls, and offices. Reduce operational expenditures (OPEX) and secure your business against grid instability.",
      features: ["PPA Financing Available", "Peak Shaving", "3-Phase Systems"],
    },
    {
      id: "ev",
      icon: <Zap className="w-8 h-8 text-[hsl(var(--accent))]" />,
      title: "EV Charging Infrastructure",
      desc: "Future-proof your property. We install Level 2 and Level 3 DC Fast Chargers for homes, fleets, and public stations.",
      features: ["Solar-to-EV Direct", "Fleet Management Software", "Universal Compatibility"],
    },
    {
      id: "recycling",
      icon: <Recycle className="w-8 h-8 text-[hsl(var(--accent))]" />,
      title: "Sustainable Recycling",
      desc: "We don't just install; we manage the lifecycle. Certified disposal and recycling of old batteries and degraded panels.",
      features: ["Hazardous Material Handling", "Eco-Compliance", "Buy-Back Programs"],
    },
    {
      id: "monitoring",
      icon: <MonitorCheck className="w-8 h-8 text-[hsl(var(--accent))]" />,
      title: "O&M + Monitoring",
      desc: "24/7 remote monitoring of your assets. We detect faults before they happen and dispatch teams instantly.",
      features: ["Real-time App Access", "Annual Cleaning", "Performance Audits"],
    },
  ];

  return (
    <div className="min-h-screen pt-[12rem] pb-20 px-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] font-bold mb-6">
          Engineering the <span className="text-[hsl(var(--accent))]">Future</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          We don't just sell panels. We design comprehensive energy ecosystems tailored to the unique challenges of the African power grid.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="group relative p-8 rounded-2xl border border-[hsl(var(--border))] bg-card hover:border-[hsl(var(--accent))] transition-all duration-300 hover:shadow-2xl hover:shadow-[hsl(var(--accent))]/10 overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-[hsl(var(--accent))] blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity"></div>

            <div className="mb-6 p-4 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] w-fit shadow-sm">
              {service.icon}
            </div>
            
            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {service.desc}
            </p>

            <ul className="space-y-2 mb-8">
              {service.features.map((item, i) => (
                <li key={i} className="flex items-center text-sm font-medium text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>

            <button className="flex items-center text-[hsl(var(--accent))] font-bold text-sm tracking-wide uppercase group-hover:gap-2 transition-all">
              Learn More <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-24 p-10 rounded-3xl bg-[hsl(var(--primary))] text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Unsure what you need?</h2>
          <p className="text-blue-100">
            Use our interactive energy simulator to calculate your load, battery requirements, and estimated ROI in seconds.
          </p>
        </div>
        
        <Link 
            href="/planner"
            className="relative z-10 whitespace-nowrap px-8 py-4 bg-white text-[hsl(var(--primary))] font-bold rounded-xl hover:bg-[hsl(var(--accent))] hover:text-black transition-colors"
        >
            Start Simulator
        </Link>
      </div>
    </div>
  );
}