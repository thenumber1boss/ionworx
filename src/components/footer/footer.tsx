"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import this
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname(); // Get path

  // --- NEW LOGIC: HIDE ON PLANNER ---
  if (pathname === "/planner") return null;
  // ----------------------------------

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
                src="/logo.png"
                alt="Ionworx Logo"
                width={120}
                height={40}
            /> 
          </Link>
           <p className="text-gray-400 text-sm leading-relaxed">
             Empowering Nigeria with sustainable, reliable, and independent energy solutions. We are the architects of the new power grid.
           </p>
           <div className="flex gap-4">
             <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[hsl(var(--accent))] hover:text-black transition-all"><Facebook size={18} /></Link>
             <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[hsl(var(--accent))] hover:text-black transition-all"><Twitter size={18} /></Link>
             <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[hsl(var(--accent))] hover:text-black transition-all"><Instagram size={18} /></Link>
             <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[hsl(var(--accent))] hover:text-black transition-all"><Youtube size={18} /></Link>
           </div>
        </div>

        {/* Quick Links */}
        <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-[hsl(var(--accent))] transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-[hsl(var(--accent))] transition-colors">Our Services</Link></li>
                <li><Link href="/projects" className="hover:text-[hsl(var(--accent))] transition-colors">Projects</Link></li>
                <li><Link href="/planner" className="hover:text-[hsl(var(--accent))] transition-colors">Energy Planner</Link></li>
                <li><Link href="/contact" className="hover:text-[hsl(var(--accent))] transition-colors">Contact</Link></li>
            </ul>
        </div>

        {/* Services */}
        <div>
            <h3 className="font-bold text-lg mb-6">Solutions</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
                <li>Residential Solar</li>
                <li>Commercial Grids</li>
                <li>Battery Storage</li>
                <li>Solar Farms</li>
                <li>EV Charging</li>
            </ul>
        </div>

        {/* Contact Info */}
        <div>
            <h3 className="font-bold text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <span>Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <span>+234 706 300 0481</span>
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <span>help@ionworx.ng</span>
                </li>
            </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-xs">
            © {currentYear} Ionworx New Energies Ltd. All rights reserved.
        </p>
        <p className="text-gray-500 text-xs flex items-center">
            Powered by <a href="https://www.gritinformedia.tech" className="text-[hsl(var(--accent))] hover:underline ml-1">Grit</a>
        </p>
      </div>
    </footer>
  );
}