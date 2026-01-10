"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { 
  Zap, Sun, Moon, ShoppingCart, Plus, 
  Settings, TrendingDown, ArrowRightLeft,
  Battery, CheckCircle2, Home, Sparkles, AlertTriangle, ArrowLeft, ArrowUp, ArrowDown, HelpCircle, MousePointer2
} from "lucide-react";

// --- HELPER: Haptics ---
const vibrate = (pattern = 10) => {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

// --- COMPONENT: Toast Notification ---
const Toast = ({ message, onComplete }: { message: string, onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-5 duration-300 pointer-events-none border border-slate-700">
      <div className="bg-green-500 rounded-full p-1"><CheckCircle2 size={12} className="text-black"/></div>
      <span className="text-xs font-bold uppercase tracking-wide">{message}</span>
    </div>
  );
};

// --- COMPONENT: Tutorial Tooltip ---
const TutorialTooltip = ({ text, position = "bottom", onClick }: { text: string, position?: string, onClick?: () => void }) => (
  <div onClick={onClick} className="absolute z-50 animate-bounce cursor-pointer">
      {position === "top" && (
          <div className="flex flex-col items-center">
              <div className="bg-[hsl(var(--accent))] text-black px-4 py-2 rounded-lg font-bold text-xs shadow-xl mb-2 max-w-[150px] text-center">
                  {text}
              </div>
              <ArrowDown className="text-[hsl(var(--accent))] drop-shadow-lg" size={32} />
          </div>
      )}
      {position === "bottom" && (
          <div className="flex flex-col items-center">
              <ArrowUp className="text-[hsl(var(--accent))] drop-shadow-lg" size={32} />
              <div className="bg-[hsl(var(--accent))] text-black px-4 py-2 rounded-lg font-bold text-xs shadow-xl mt-2 max-w-[150px] text-center">
                  {text}
              </div>
          </div>
      )}
      {position === "right" && (
          <div className="flex items-center">
              <ArrowLeft className="text-[hsl(var(--accent))] drop-shadow-lg" size={32} />
              <div className="bg-[hsl(var(--accent))] text-black px-4 py-2 rounded-lg font-bold text-xs shadow-xl ml-2 max-w-[150px] text-left">
                  {text}
              </div>
          </div>
      )}
  </div>
);

export default function EnergyGame({ 
   marketData, 
   solarOptions, 
   currentStats, 
   onAddAppliance, 
   onUpgradeAppliance,
   onToggleSource,
   onUpdateHours,
   onSelectSetup,
   onReset,
   setBand,
   comingSoon = true,
   comingSoonFormUrl,
   comingSoonFormFields,
}: any) {
  
  // UI State
  const [activePane, setActivePane] = useState<"none" | "store" | "solar" | "item_details">("none");
  const [selectedItemUid, setSelectedItemUid] = useState<string | null>(null);
  const [showHighBillAlert, setShowHighBillAlert] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
   // Coming-soon signup state
   const [csName, setCsName] = useState("");
   const [csEmail, setCsEmail] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Tutorial State: 'start' -> 'added_first' -> 'opened_details' -> 'done'
  const [tutorialStep, setTutorialStep] = useState<string>("start");
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  const houseRef = useRef(null);
  const alertTimeout = useRef<NodeJS.Timeout | null>(null);

  // --- LOGIC: Alerts & Animations ---
  
  // High Bill Alert
  useEffect(() => {
    if (currentStats.gridMonthly > 50000 && !currentStats.activeSetup && !showHighBillAlert) {
      setShowHighBillAlert(true);
      vibrate([50, 50, 50]); 
      alertTimeout.current = setTimeout(() => setShowHighBillAlert(false), 8000);
    }
  }, [currentStats.gridMonthly, currentStats.activeSetup]);

  // Inverter Strain Animation
  useEffect(() => {
    if (currentStats.inverterStrain > 100) {
      vibrate(500); 
      gsap.to(houseRef.current, { x: 5, repeat: 5, yoyo: true, duration: 0.05 });
    }
  }, [currentStats.inverterStrain]);

  // Tutorial State Transitions
  useEffect(() => {
    if (currentStats.houseItems.length > 0 && tutorialStep === "start") {
        setTutorialStep("added_first");
    }
  }, [currentStats.houseItems.length]);

  const handleItemClick = (uid: string) => {
    setSelectedItemUid(uid);
    setActivePane("item_details");
    vibrate(15);
    
    // Clear tutorial step if focused on details
    if (tutorialStep === "added_first") {
        setTutorialStep("done");
        setHasSeenTutorial(true);
    }
  };

  const handleAddItem = (id: string, name: string) => {
    onAddAppliance(id);
    vibrate(20);
    setToastMsg(`Added ${name}`);
    
    // If mobile, close store to show the house update
    if (window.innerWidth < 1024) {
        setActivePane("none");
    }
  };

  const selectedItem = currentStats.houseItems.find((i: any) => i.uid === selectedItemUid);

   // If the planner is toggled to Coming Soon, show a placeholder screen
   if (comingSoon) {
      const handleSubmitComingSoon = async (e: React.FormEvent) => {
         e.preventDefault();
         if (!csName.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(csEmail)) {
            setToastMsg('Please provide a valid name and email');
            return;
         }
         setIsSubmitting(true);

         // If a Google Form URL and entry keys were provided, submit to it.
         // Expected prop shape: comingSoonFormUrl (string), comingSoonFormFields: { name: 'entry.123', email: 'entry.456' }
         try {
            if (typeof (comingSoonFormUrl) === 'string' && comingSoonFormUrl) {
               const params = new URLSearchParams();
               if (comingSoonFormFields?.name) params.append(comingSoonFormFields.name, csName);
               if (comingSoonFormFields?.email) params.append(comingSoonFormFields.email, csEmail);

               // Google Forms often blocks CORS; using `mode: 'no-cors'` makes the request opaque.
               await fetch(comingSoonFormUrl, {
                  method: 'POST',
                  mode: 'no-cors',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: params.toString(),
               });

               setToastMsg("Thanks — we'll be in touch!");
               setCsName('');
               setCsEmail('');
            } else {
               // Fallback: store locally (client-side only) so the user requested signup is not lost.
               const existing = JSON.parse(localStorage.getItem('planner_signups') || '[]');
               existing.push({ name: csName, email: csEmail, when: new Date().toISOString() });
               localStorage.setItem('planner_signups', JSON.stringify(existing));
               setToastMsg("Saved locally — we'll contact you when ready.");
               setCsName('');
               setCsEmail('');
            }
         } catch (err) {
            setToastMsg('Submission failed. Please try again later.');
         } finally {
            setIsSubmitting(false);
         }
      };

      return (
         <div className={`fixed inset-0 z-[100] w-full h-full flex items-center justify-center
            ${isNight ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            {toastMsg && <Toast message={toastMsg} onComplete={() => setToastMsg(null)} />}

            <div className="max-w-lg mx-6 p-8 rounded-2xl shadow-2xl text-center border border-[hsl(var(--border))]">
               <h1 className="text-3xl md:text-4xl font-black mb-4">Energy Planner — Coming Soon</h1>
               <p className="text-sm text-muted-foreground mb-6">We're building an interactive energy planner to help model solar, storage, and savings. Sign up for early access.</p>

               <form onSubmit={handleSubmitComingSoon} className="space-y-4">
                  <input value={csName} onChange={(e) => setCsName(e.target.value)} placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))]" />
                  <input value={csEmail} onChange={(e) => setCsEmail(e.target.value)} placeholder="Email address" type="email" className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))]" />
                  <div className="flex items-center justify-center gap-3">
                     <Link href="/" className="px-4 py-2 rounded-lg border border-[hsl(var(--border))]">Return Home</Link>
                     <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-[hsl(var(--accent))] text-black">
                        {isSubmitting ? 'Sending...' : 'Notify Me'}
                     </button>
                  </div>
               </form>

               <p className="text-xs text-muted-foreground mt-4">We only store your name & email to notify you — no servers required if you use local fallback.</p>
            </div>
         </div>
      );
   }

   return (
    // MAIN CONTAINER: Fixed Full Screen, No Page Scroll (Immersive)
    <div className={`fixed inset-0 z-[100] w-full h-full overflow-hidden transition-colors duration-1000 flex flex-col
      ${isNight ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}
    `}>
      
      {/* 0. TOAST LAYER */}
      {toastMsg && <Toast message={toastMsg} onComplete={() => setToastMsg(null)} />}

      {/* 1. BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000 opacity-30
          ${isNight ? 'bg-blue-900' : 'bg-orange-300'}
        `}/>
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `radial-gradient(circle, ${isNight ? '#ffffff' : '#000000'} 1px, transparent 1px)`, backgroundSize: '24px 24px' }}>
        </div>
      </div>

      {/* =====================================================================================
          DESKTOP LAYOUT (LG+) 
         ===================================================================================== */}
      {/* ADDED: min-h-0 to ensure flex children scroll correctly */}
      <div className="hidden lg:grid grid-cols-12 gap-0 h-full w-full z-10 min-h-0">
        
        {/* LEFT COLUMN: MARKET (Scrollable List) */}
        <div className={`col-span-3 border-r border-slate-200 dark:border-white/5 flex flex-col backdrop-blur-sm h-full min-h-0 relative
           ${isNight ? 'bg-slate-900/50' : 'bg-white/50'}
        `}>
           <div className="p-6 pb-2 flex-shrink-0">
             <div className="flex items-center gap-3 mb-4">
                 <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                 </Link>
                 <div className="p-2 bg-[hsl(var(--accent))] rounded-lg text-black"><ShoppingCart size={20}/></div>
                 <h3 className="font-black text-lg uppercase">Store</h3>
             </div>
           </div>
           
           {/* Tutorial Cue: Add Item */}
           {tutorialStep === "start" && currentStats.band && (
               <div className="absolute top-24 right-4 z-50">
                   <TutorialTooltip text="Start by adding appliances!" position="right" />
               </div>
           )}

           {/* ADDED: min-h-0, pb-10 for scroll safety */}
           <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 p-6 pt-0 pb-10 min-h-0">
             {marketData.map((item: any) => (
                <button 
                  key={item.id}
                  onClick={() => handleAddItem(item.id, item.name)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-[1.02] active:scale-95 text-left group
                    ${isNight ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'}
                  `}
                >
                   <div>
                     <div className="font-bold text-sm group-hover:text-[hsl(var(--accent))] transition-colors">{item.name}</div>
                     <div className="text-[10px] font-bold uppercase opacity-50">{item.baseWatts}W • {item.defaultHours}h/day</div>
                   </div>
                   <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[hsl(var(--accent))] group-hover:text-black transition-colors">
                      <Plus size={16}/>
                   </div>
                </button>
             ))}
           </div>
        </div>

        {/* CENTER COLUMN: VISUALIZATION (Fixed) */}
        <div className="col-span-6 relative p-8 flex flex-col h-full min-h-0">
           {/* Top Bar */}
           <div className="flex justify-between items-start mb-8 z-10 flex-shrink-0">
              <div className="flex gap-4">
                 <div className={`px-4 py-2 rounded-xl border backdrop-blur-md ${isNight ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-white'}`}>
                    <div className="text-[10px] font-bold uppercase opacity-50">Monthly Bill</div>
                    <div className="text-xl font-black">₦{currentStats.gridMonthly.toLocaleString()}</div>
                 </div>
                 {currentStats.savings > 0 && (
                   <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600">
                      <div className="text-[10px] font-bold uppercase">Savings</div>
                      <div className="text-xl font-black">-₦{currentStats.savings.toLocaleString()}</div>
                   </div>
                 )}
              </div>
              
              <div className="flex gap-2">
                 <button onClick={() => setIsNight(!isNight)} className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:scale-105 transition-transform">
                    {isNight ? <Moon size={20}/> : <Sun size={20}/>}
                 </button>
                 <button onClick={onReset} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors" title="Reset Sim">
                    <Settings size={20}/>
                 </button>
              </div>
           </div>

           {/* The House Grid - Centered & Scrollable if too many items */}
           <div className="flex-1 flex items-center justify-center relative overflow-hidden min-h-0">
              <div ref={houseRef} className={`relative w-full max-w-xl aspect-square rounded-[3rem] border-4 flex flex-col overflow-hidden shadow-2xl transition-all
                  ${currentStats.isBlackout ? 'bg-black border-slate-800 brightness-50' : isNight ? 'bg-slate-900 border-slate-700' : 'bg-white border-white'}
              `}>
                  <div className="p-6 border-b border-white/5 flex justify-between items-center bg-inherit z-10 flex-shrink-0">
                     <span className="font-black tracking-widest uppercase text-sm flex items-center gap-2"><Home size={16}/> My Grid</span>
                     <span className="text-xs font-bold opacity-50">{currentStats.houseItems.length} Devices Active</span>
                  </div>
                  
                  {/* Tutorial Cue: Click Item */}
                  {tutorialStep === "added_first" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                        <TutorialTooltip text="Tap device to edit!" position="top" />
                    </div>
                  )}

                  <div className="flex-1 p-6 grid grid-cols-4 gap-4 content-start overflow-y-auto custom-scrollbar min-h-0">
                      {currentStats.houseItems.map((item: any) => (
                        <button 
                          key={item.uid}
                          onClick={() => handleItemClick(item.uid)}
                          className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative group transition-all hover:scale-105
                            ${item.source === 'solar' 
                               ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                               : isNight ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-white hover:shadow-md'}
                          `}
                        >
                           {/* VISUAL CUE: Gear Icon for Interactivity */}
                           <div className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${item.source === 'solar' ? 'text-white/50' : 'text-slate-400'}`}>
                               <Settings size={14} />
                           </div>

                           {item.isEfficient && <Sparkles size={12} className="absolute top-2 left-2 text-green-400 fill-green-400" />}
                           <Zap size={24} className={item.source === 'solar' ? 'fill-current' : ''} />
                           <span className="text-[10px] font-bold mt-2 truncate max-w-full px-1">{item.name}</span>
                        </button>
                      ))}
                      {currentStats.houseItems.length === 0 && (
                        <div className="col-span-4 h-full flex flex-col items-center justify-center text-slate-400 opacity-50 py-10">
                           <ShoppingCart size={48} className="mb-2"/>
                           <span className="text-xs font-bold uppercase">Add items from left menu</span>
                        </div>
                      )}
                  </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: SYSTEMS & DETAILS (Scrollable List) */}
        <div className={`col-span-3 border-l border-slate-200 dark:border-white/5 flex flex-col backdrop-blur-sm h-full min-h-0
           ${isNight ? 'bg-slate-900/50' : 'bg-white/50'}
        `}>
           
           {/* If an item is selected, show its details here, otherwise show Solar Options */}
           {activePane === "item_details" && selectedItem ? (
              <div className="flex flex-col h-full animate-in slide-in-from-right duration-300 min-h-0">
                 <div className="p-6 pb-2 flex-shrink-0">
                     <button onClick={() => setActivePane("none")} className="mb-4 text-xs font-bold uppercase flex items-center gap-1 opacity-50 hover:opacity-100"><ArrowRightLeft size={12}/> Back to Systems</button>
                     
                     <div className={`p-6 rounded-3xl mb-6 flex flex-col items-center text-center
                        ${selectedItem.source === 'solar' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-800'}
                     `}>
                        <Zap size={48} className="mb-4"/>
                        <h3 className="text-xl font-black">{selectedItem.name}</h3>
                        <p className="text-xs font-bold uppercase opacity-60">{selectedItem.category}</p>
                     </div>
                 </div>

                 <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-10 min-h-0">
                    <div>
                       <div className="flex justify-between mb-2 text-xs font-bold uppercase opacity-60">
                          <span>Usage</span>
                          <span>{selectedItem.hours} hrs/day</span>
                       </div>
                       <input 
                          type="range" min="0" max="24" step="0.5"
                          value={selectedItem.hours}
                          onChange={(e) => onUpdateHours(selectedItem.uid, parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none accent-blue-500"
                        />
                    </div>
                    
                    <button 
                       onClick={() => { if(!selectedItem.isEfficient) { onUpgradeAppliance(selectedItem.uid); vibrate(); }}}
                       className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all
                          ${selectedItem.isEfficient ? 'border-green-500 bg-green-500/5 text-green-500' : 'border-slate-300 hover:border-green-500 hover:text-green-500'}
                       `}
                    >
                       <span className="text-xs font-black uppercase">Efficiency Upgrade</span>
                       {selectedItem.isEfficient ? <CheckCircle2 size={16}/> : <TrendingDown size={16}/>}
                    </button>

                    <button 
                       onClick={() => { onToggleSource(selectedItem.uid); vibrate(); }}
                       disabled={!currentStats.activeSetup}
                       className={`w-full p-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg transition-all
                          ${!currentStats.activeSetup ? 'opacity-50 cursor-not-allowed bg-slate-400' : selectedItem.source === 'grid' ? 'bg-slate-900 text-white dark:bg-blue-600' : 'bg-orange-500 text-white'}
                       `}
                    >
                       <ArrowRightLeft size={16}/>
                       {selectedItem.source === 'grid' ? 'Switch to Solar' : 'Switch to Grid'}
                    </button>
                 </div>
              </div>
           ) : (
             <div className="flex flex-col h-full min-h-0">
                <div className="p-6 pb-2 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-500 rounded-lg text-white"><Battery size={20}/></div>
                        <h3 className="font-black text-lg uppercase">Power Systems</h3>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 p-6 pt-0 pb-10 min-h-0">
                   {solarOptions.map((setup: any) => (
                     <button 
                       key={setup.id}
                       onClick={() => { onSelectSetup(setup); vibrate([50]); }}
                       className={`w-full p-4 rounded-2xl text-left border-2 transition-all relative overflow-hidden group
                         ${currentStats.activeSetup?.id === setup.id 
                            ? 'border-green-500 bg-green-500/5' 
                            : isNight ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-200 bg-white hover:border-slate-300'}
                       `}
                     >
                       <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-[9px] font-black uppercase tracking-widest opacity-50">{setup.kva}kVA Inv</div>
                            <div className="text-sm font-black">{setup.name}</div>
                          </div>
                          <div className="text-xs font-black text-green-500">₦{setup.priceLabel}</div>
                       </div>
                       <div className="mt-2 text-[9px] font-bold uppercase opacity-40 flex items-center gap-1">
                          <Battery size={10}/> {setup.batteryWh}Wh Storage
                       </div>
                     </button>
                   ))}
                </div>
             </div>
           )}
        </div>
      </div>



      {/* =====================================================================================
          MOBILE LAYOUT ( < LG ) - PURE APP MODE
         ===================================================================================== */}
      <div className="lg:hidden flex flex-col h-full w-full relative z-10 min-h-0">
        
        {/* Top HUD */}
        <div className="p-4 flex justify-between items-start z-10 flex-shrink-0">
           <Link href="/" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 shadow-sm mr-2">
               <ArrowLeft size={20}/>
           </Link>
           <div className={`flex-1 mr-2 px-4 py-2 rounded-xl border backdrop-blur-md shadow-sm ${isNight ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-white'}`}>
              <div className="text-[10px] font-bold uppercase opacity-50">Monthly Bill</div>
              <div className="text-xl font-black">₦{currentStats.gridMonthly.toLocaleString()}</div>
           </div>
           <button onClick={() => setIsNight(!isNight)} className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 shadow-sm">
              {isNight ? <Moon size={20}/> : <Sun size={20}/>}
           </button>
        </div>

        {/* Center House - Scaled to fit remaining height */}
        <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden min-h-0">
             <div ref={houseRef} className={`relative w-full max-w-sm aspect-square rounded-[2.5rem] border-4 flex flex-col overflow-hidden shadow-2xl transition-all
                 ${currentStats.isBlackout ? 'bg-black border-slate-800 brightness-50' : isNight ? 'bg-slate-900 border-slate-700' : 'bg-white border-white'}
              `}>
                  <div className="p-4 border-b border-white/5 flex justify-between items-center bg-inherit z-10 flex-shrink-0">
                     <span className="font-black tracking-widest uppercase text-xs">My Grid</span>
                     <span className="text-[10px] font-bold opacity-50">{currentStats.houseItems.length} Units</span>
                  </div>
                  
                  {/* Tutorial Cue: Click Item (Mobile) */}
                  {tutorialStep === "added_first" && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                          <TutorialTooltip text="Tap to Edit" position="top" />
                      </div>
                  )}

                  <div className="flex-1 p-4 grid grid-cols-4 gap-2 content-start overflow-y-auto min-h-0">
                      {currentStats.houseItems.map((item: any) => (
                        <button 
                          key={item.uid}
                          onClick={() => handleItemClick(item.uid)}
                          className={`aspect-square rounded-xl flex items-center justify-center relative
                            ${item.source === 'solar' ? 'bg-blue-500 text-white' : isNight ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}
                          `}
                        >
                           {/* Visual Cue: Small Dot indicating clickable */}
                           <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-slate-400 rounded-full opacity-50"></div>
                           
                           <Zap size={20} className={item.source === 'solar' ? 'fill-current' : ''} />
                        </button>
                      ))}
                      {/* Mobile Add Button */}
                      <button 
                        onClick={() => setActivePane("store")}
                        className="aspect-square rounded-xl border-2 border-dashed border-slate-300 text-slate-300 flex items-center justify-center relative"
                      >
                         <Plus size={20}/>
                         {/* Tutorial Cue: Add (Mobile) */}
                         {tutorialStep === "start" && currentStats.band && (
                             <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 pointer-events-none">
                                 <TutorialTooltip text="Add items" position="bottom" />
                             </div>
                         )}
                      </button>
                  </div>
              </div>
        </div>

        {/* Bottom Floating Bar */}
        <div className="p-6 pb-8 flex justify-center gap-6 z-20 flex-shrink-0">
           <button onClick={() => setActivePane("store")} className="h-14 w-14 rounded-2xl bg-[hsl(var(--accent))] text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 relative">
              <ShoppingCart size={24}/>
              {tutorialStep === "start" && currentStats.band && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--primary))] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[hsl(var(--primary))]"></span>
                  </span>
              )}
           </button>
           <button onClick={() => setActivePane("solar")} className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl ring-4 hover:scale-105 active:scale-95 ${currentStats.activeSetup ? 'bg-green-500 text-white ring-green-500/20' : 'bg-slate-900 text-white ring-white'}`}>
              {currentStats.activeSetup ? <Battery size={28}/> : <Zap size={28}/>}
           </button>
           <button onClick={onReset} className="h-14 w-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95">
              <Settings size={24}/>
           </button>
        </div>

        {/* Mobile Modals (Bottom Sheets) */}
        {(activePane === "store" || activePane === "solar" || activePane === "item_details") && (
           <>
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30" onClick={() => setActivePane("none")}/>
             {/* ADDED: flex flex-col and overflow-hidden to the modal container */}
             <div className={`absolute bottom-0 inset-x-0 h-[60vh] rounded-t-[2rem] flex flex-col z-40 shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-hidden
                  ${isNight ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}
             `}>
                
                {/* Drag Handle Area */}
                <div className="p-4 flex justify-center flex-shrink-0" onClick={() => setActivePane("none")}>
                     <div className="w-12 h-1.5 bg-slate-300 rounded-full opacity-50"/>
                </div>

                {/* --- MOBILE STORE CONTENT --- */}
                {activePane === "store" && (
                   <div className="flex-1 overflow-y-auto space-y-3 p-6 pt-0 min-h-0">
                      <h3 className="font-black text-lg uppercase mb-4 sticky top-0 bg-inherit py-2 z-10">Marketplace</h3>
                      <div className="space-y-3 pb-20">
                        {marketData.map((item: any) => (
                          <button key={item.id} onClick={() => handleAddItem(item.id, item.name)} className={`w-full flex justify-between items-center p-4 rounded-2xl border ${isNight ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-slate-50'}`}>
                             <div className="text-left">
                                <div className="font-bold">{item.name}</div>
                                <div className="text-xs opacity-50">{item.baseWatts}W</div>
                             </div>
                             <Plus size={20}/>
                          </button>
                        ))}
                      </div>
                   </div>
                )}

                {/* --- MOBILE SOLAR CONTENT --- */}
                {activePane === "solar" && (
                   <div className="flex-1 overflow-y-auto space-y-3 p-6 pt-0 min-h-0">
                      <h3 className="font-black text-lg uppercase mb-4 sticky top-0 bg-inherit py-2 z-10">Power Systems</h3>
                      <div className="space-y-3 pb-20">
                        {solarOptions.map((setup: any) => (
                          <button key={setup.id} onClick={() => { onSelectSetup(setup); setActivePane("none"); vibrate(); }} className={`w-full p-4 rounded-2xl border-2 text-left ${currentStats.activeSetup?.id === setup.id ? 'border-green-500 bg-green-500/5' : 'border-slate-200'}`}>
                             <div className="flex justify-between font-bold">
                                <span>{setup.name}</span>
                                <span className="text-green-500">₦{setup.priceLabel}</span>
                             </div>
                             <div className="text-xs opacity-50 mt-1">{setup.kva}kVA • {setup.batteryWh}Wh</div>
                          </button>
                        ))}
                      </div>
                   </div>
                )}

                {/* --- MOBILE DETAILS CONTENT --- */}
                {activePane === "item_details" && selectedItem && (
                   <div className="flex-1 flex flex-col p-6 pt-0 overflow-y-auto min-h-0">
                      <div className="flex items-center gap-4 mb-6 sticky top-0 bg-inherit py-2 z-10">
                         <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl"><Zap size={24}/></div>
                         <div>
                            <h3 className="font-black text-xl">{selectedItem.name}</h3>
                            <div className="text-xs font-bold uppercase opacity-50">{selectedItem.category}</div>
                         </div>
                      </div>
                      
                      <div className="pb-20">
                        <div className="mb-6 space-y-2">
                           <div className="flex justify-between text-xs font-bold uppercase opacity-60">
                              <span>Daily Usage</span>
                              <span>{selectedItem.hours} hrs</span>
                           </div>
                           <input type="range" min="0" max="24" step="0.5" value={selectedItem.hours} onChange={(e) => onUpdateHours(selectedItem.uid, parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-full appearance-none accent-blue-500"/>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-auto">
                           <button onClick={() => { if(!selectedItem.isEfficient) onUpgradeAppliance(selectedItem.uid); }} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 ${selectedItem.isEfficient ? 'border-green-500 text-green-500 opacity-50' : 'border-slate-300'}`}>
                              <TrendingDown size={20}/> <span className="text-[10px] font-black uppercase">Upgrade</span>
                           </button>
                           <button onClick={() => onToggleSource(selectedItem.uid)} className={`p-4 rounded-xl flex flex-col items-center gap-2 text-white ${selectedItem.source === 'grid' ? 'bg-slate-900' : 'bg-orange-500'}`}>
                              <ArrowRightLeft size={20}/> <span className="text-[10px] font-black uppercase">{selectedItem.source === 'grid' ? 'To Solar' : 'To Grid'}</span>
                           </button>
                        </div>
                      </div>
                   </div>
                )}
             </div>
           </>
        )}
      </div>

      {/* BAND SELECTION OVERLAY (Global) - Enhanced Definitions */}
      {!currentStats.band && (
        <div className="absolute inset-0 z-[200] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-6">
           <div className="w-full max-w-sm text-center">
              <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">GRID<span className="text-blue-500">RUNNER</span></h1>
              <p className="text-slate-400 text-sm mb-8">Select your tariff band to initialize simulation.</p>
              
              <div className="space-y-4">
                 <button onClick={() => setBand('A')} className="w-full p-4 bg-white rounded-xl hover:scale-105 transition-transform text-left group">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-xl text-black">BAND A</span>
                        <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-1 rounded">20+ Hrs</span>
                    </div>
                    <div className="text-xs text-slate-500">Premium supply, highest cost. (₦225/kWh)</div>
                 </button>

                 <button onClick={() => setBand('B')} className="w-full p-4 bg-slate-100 rounded-xl hover:scale-105 transition-transform text-left group">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-xl text-black">BAND B</span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 font-bold px-2 py-1 rounded">16-20 Hrs</span>
                    </div>
                    <div className="text-xs text-slate-500">Moderate supply, mid cost. (₦145/kWh)</div>
                 </button>

                 <button onClick={() => setBand('C')} className="w-full p-4 bg-slate-200 rounded-xl hover:scale-105 transition-transform text-left group">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-xl text-black">BAND C</span>
                        <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-1 rounded">&lt; 12 Hrs</span>
                    </div>
                    <div className="text-xs text-slate-500">Poor supply, lowest cost. (₦65/kWh)</div>
                 </button>
              </div>

              <Link href="/" className="inline-block mt-8 text-white/50 text-sm underline hover:text-white transition-colors">Exit Simulator</Link>
           </div>
        </div>
      )}

    </div>
  );
}