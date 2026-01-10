"use client";
import React, { useState } from "react";
import { User, Briefcase, GraduationCap, Building2, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

const PERSONA_TYPES = [
  { 
    id: 'student', 
    label: "The Starter", 
    desc: "1-Room, Minimal appliances. Tight budget.", 
    icon: GraduationCap,
    income: 150000,
    color: "bg-blue-500"
  },
  { 
    id: 'family', 
    label: "Family Head", 
    desc: "3-Bedroom. Comfort is key. High bills.", 
    icon: User,
    income: 800000,
    color: "bg-green-500"
  },
  { 
    id: 'tycoon', 
    label: "Big Chief", 
    desc: "Duplex, ACs everywhere. Money isn't the issue, Reliability is.", 
    icon: Building2,
    income: 3000000,
    color: "bg-purple-600"
  },
];

const BANDS = [
  { id: 'A', label: "Band A", hrs: "20+", cost: "₦225", desc: "Premium Grid (Expensive)" },
  { id: 'B', label: "Band B", hrs: "16-20", cost: "₦145", desc: "Moderate Grid" },
  { id: 'C', label: "Band C", hrs: "<12", cost: "₦65", desc: "Poor Supply (Cheap)" },
];

export default function PersonaCreator({ onComplete }: { onComplete: (profile: any) => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    type: "", // student, family, tycoon
    band: "",
    income: 0
  });

  const handleTypeSelect = (type: any) => {
    setFormData(prev => ({ ...prev, type: type.id, income: type.income }));
    // Add a small delay for better UX
    setTimeout(() => setStep(3), 200);
  };

  const handleBandSelect = (bandId: string) => {
    setFormData(prev => ({ ...prev, band: bandId }));
    setTimeout(() => setStep(4), 200);
  };

  const finish = () => {
    // Save to local storage or just pass up
    const profile = { ...formData, avatar: "default" };
    if (typeof window !== "undefined") {
        localStorage.setItem("gridrunner_persona", JSON.stringify(profile));
    }
    onComplete(profile);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      
      {/* BACKGROUND FX */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* HEADER */}
        <div className="text-center mb-10">
            <h1 className="text-4xl font-black tracking-tighter italic mb-2">
                GRID<span className="text-blue-500">RUNNER</span>
            </h1>
            <div className="flex justify-center gap-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-blue-500' : 'w-2 bg-slate-800'}`} />
                ))}
            </div>
        </div>

        {/* STEP 1: NAME */}
        {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Identify Yourself</h2>
                    <p className="text-slate-400 text-sm">What should we call you on the grid?</p>
                </div>
                <input 
                    autoFocus
                    type="text" 
                    placeholder="Enter Name..." 
                    className="w-full bg-transparent border-b-2 border-slate-700 p-4 text-center text-2xl font-bold focus:border-blue-500 outline-none placeholder:text-slate-700"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && formData.name && setStep(2)}
                />
                <button 
                    disabled={!formData.name}
                    onClick={() => setStep(2)}
                    className="w-full bg-white text-black font-black py-4 rounded-xl disabled:opacity-50 hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                    NEXT <ArrowRight size={18} />
                </button>
            </div>
        )}

        {/* STEP 2: ARCHETYPE */}
        {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Select Lifestyle</h2>
                    <p className="text-slate-400 text-sm">Determines your starting appliances & income.</p>
                </div>
                <div className="grid gap-3">
                    {PERSONA_TYPES.map(t => (
                        <button 
                            key={t.id}
                            onClick={() => handleTypeSelect(t)}
                            className="group relative p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-slate-800 transition-all text-left flex items-start gap-4"
                        >
                            <div className={`p-3 rounded-xl ${t.color} text-white`}>
                                <t.icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{t.label}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{t.desc}</p>
                                <div className="mt-2 text-xs font-mono text-green-400">Budget: ₦{t.income.toLocaleString()}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* STEP 3: TARIFF BAND */}
        {step === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Grid Connection</h2>
                    <p className="text-slate-400 text-sm">Select your local NEPA/DisCo reliability.</p>
                </div>
                <div className="grid gap-3">
                    {BANDS.map(b => (
                        <button 
                            key={b.id}
                            onClick={() => handleBandSelect(b.id)}
                            className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-yellow-500 hover:bg-slate-800 transition-all text-left"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-black text-xl">{b.label}</span>
                                <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded text-slate-300">{b.hrs} Hrs/Day</span>
                            </div>
                            <div className="text-xs text-slate-500">{b.desc}</div>
                            <div className="mt-2 text-xs font-mono text-yellow-500">Rate: {b.cost}/kWh</div>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* STEP 4: SUMMARY */}
        {step === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300 text-center">
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
                        <Zap size={40} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black mb-1">{formData.name}</h2>
                    <p className="text-sm text-slate-400 uppercase tracking-widest mb-6">Ready to Deploy</p>
                    
                    <div className="grid grid-cols-2 gap-4 w-full text-left">
                        <div className="p-3 rounded-xl bg-slate-800">
                            <div className="text-[10px] uppercase opacity-50">Profile</div>
                            <div className="font-bold capitalize">{PERSONA_TYPES.find(p=>p.id===formData.type)?.label}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-800">
                            <div className="text-[10px] uppercase opacity-50">Band</div>
                            <div className="font-bold text-yellow-400">Band {formData.band}</div>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={finish}
                    className="w-full bg-green-500 text-black font-black py-4 rounded-xl hover:scale-105 transition-transform shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
                >
                    ENTER SIMULATION <CheckCircle2 size={18} />
                </button>
            </div>
        )}

      </div>
    </div>
  );
}