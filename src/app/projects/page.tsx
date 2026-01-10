"use client";
import React from "react";
import { MapPin, Zap, BatteryCharging } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Lagos Industrial Complex",
      category: "Commercial",
      image: "/images/projects/project1.jpeg", // Using existing paths
      stats: { power: "1.2 MW", battery: "200 kWh", savings: "$45k/yr" },
      location: "Ikeja, Lagos",
      year: "2024",
    },
    {
      id: 2,
      title: "Luxury Villa Off-Grid",
      category: "Residential",
      image: "/images/projects/project2.jpeg",
      stats: { power: "25 kW", battery: "60 kWh", savings: "100% Bill" },
      location: "Banana Island",
      year: "2023",
    },
    {
      id: 3,
      title: "Rural Solar Farm",
      category: "Utility Scale",
      image: "/images/projects/project3.jpeg",
      stats: { power: "500 kW", battery: "N/A", savings: "Community Power" },
      location: "Ogun State",
      year: "2023",
    },
    {
      id: 4,
      title: "Banking HQ Backup",
      category: "Commercial",
      image: "/images/projects/project4.jpg",
      stats: { power: "150 kW", battery: "300 kWh", savings: "Zero Downtime" },
      location: "Victoria Island",
      year: "2024",
    },
  ];

  return (
    <div className="min-h-screen pt-[12rem] pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
            <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] font-bold mb-4">
            Recent <span className="text-[hsl(var(--accent))]">Deployments</span>
            </h1>
            <p className="text-muted-foreground max-w-md">
            See how we are transforming the Nigerian energy landscape, one installation at a time.
            </p>
        </div>

      </div>

      {/* Masonry-ish Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
            ></div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 text-[hsl(var(--accent))] text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="bg-[hsl(var(--accent))]/20 px-2 py-1 rounded">{project.category}</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <div>
                        <div className="text-white/60 text-xs uppercase flex items-center gap-1"><Zap size={12}/> Capacity</div>
                        <div className="text-white font-bold">{project.stats.power}</div>
                    </div>
                    <div>
                        <div className="text-white/60 text-xs uppercase flex items-center gap-1"><BatteryCharging size={12}/> Storage</div>
                        <div className="text-white font-bold">{project.stats.battery}</div>
                    </div>
                    <div>
                        <div className="text-white/60 text-xs uppercase flex items-center gap-1"><MapPin size={12}/> Loc</div>
                        <div className="text-white font-bold">{project.location}</div>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}