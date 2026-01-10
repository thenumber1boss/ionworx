"use client";
import React from "react";
import { Target, Users, Award, Globe } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { label: "Installations", value: "500+" },
    { label: "Megawatts Generated", value: "12MW" },
    { label: "Carbon Offset", value: "8k Tons" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <div className="min-h-screen pt-[12rem] pb-20">
      
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] font-bold mb-6">
            We are the <span className="text-[hsl(var(--accent))]">Architects</span> of the New Grid.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ionworx New Energies Ltd. was born from a simple frustration: The sun is free, yet power is expensive. We are engineering the bridge between the two.
          </p>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="bg-[hsl(var(--primary))] text-white py-16 mb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold font-mono mb-2">{stat.value}</div>
              <div className="text-blue-200 text-sm uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section className="px-6 max-w-7xl mx-auto mb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
           {/* Placeholder for Team Image */}
           <div className="absolute inset-0 bg-gray-800 animate-pulse"></div> 
           <img src="/images/projects/project2.jpeg" alt="Our Team" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        </div>
        
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="p-3 bg-[hsl(var(--accent))]/10 rounded-xl h-fit">
              <Target className="text-[hsl(var(--accent))]" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">To democratize energy independence in Nigeria. We believe every home and business should have the power to generate, store, and manage their own electricity without reliance on an unstable national grid.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-[hsl(var(--accent))]/10 rounded-xl h-fit">
              <Globe className="text-[hsl(var(--accent))]" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Our Standard</h3>
              <p className="text-muted-foreground">We reject "good enough." We use Tier-1 monocrystalline panels, top-rated Lithium Iron Phosphate (LiFePO4) batteries, and AI-driven monitoring software. If we wouldn't put it on our own house, we won't put it on yours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="px-6 max-w-7xl mx-auto text-center bg-secondary/30 rounded-3xl p-12">
        <h2 className="text-3xl font-bold mb-4">Meet the Experts</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our engineers are certified by global standards bodies. We don't use contractors; we use career professionals.
        </p>
        <button className="px-8 py-3 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] rounded-lg font-bold hover:opacity-90 transition-opacity">
            Join the Team
        </button>
      </section>

    </div>
  );
}