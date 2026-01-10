"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- LOGIC: Hide Navbar on Planner for Immersive Mode ---
  // MOVED HERE (After all hooks) to prevent "Rendered fewer hooks" error
  if (pathname === "/planner") return null;
  // --------------------------------------------------------

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Energy Planner", href: "/planner", isSpecial: true },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="relative z-10 flex items-center gap-2">
           <Image
            src="/logo.png"
            alt="Ionworx Logo"
            width={120}
            height={40}
          />  
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[hsl(var(--accent))] ${
                pathname === link.href ? "text-[hsl(var(--accent))]" : "text-foreground"
              } ${link.isSpecial ? "hidden" : "block"}`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link 
                href="/planner" 
                className="hidden lg:flex px-4 py-2 rounded-full border border-[hsl(var(--border))] text-xs font-semibold uppercase tracking-wider hover:bg-[hsl(var(--accent))] hover:border-[hsl(var(--accent))] hover:text-black transition-all"
            >
                Play Simulator
            </Link>
            <button
              onClick={() => window.open("https://wa.me/+2347063000481", "_blank")}
              className="px-6 py-2.5 rounded-lg bg-[hsl(var(--primary))] text-white font-semibold shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Quote
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
            className="md:hidden z-10 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white/95 dark:bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 z-[60] p-2 rounded-md bg-white/30 dark:bg-black/30 backdrop-blur-sm text-foreground dark:text-white"
                >
                  <X size={24} />
                </button>
                {navLinks.map((link) => (
                    <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold"
                    >
                    {link.name}
                    </Link>
                ))}
                 <button
                    onClick={() => {
                        window.open("https://wa.me/+2347063000481", "_blank");
                        setIsMobileMenuOpen(false);
                    }}
                    className="mt-4 px-8 py-3 rounded-lg bg-[hsl(var(--accent))] text-black font-bold text-lg"
                    >
                    Get Quote
                </button>
            </div>
        )}
      </div>
    </nav>
  );
}