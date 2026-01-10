import { useState, useMemo, useEffect } from "react";

// --- 0. GAME CONSTANTS & PRESETS ---

export const PERSONA_PRESETS: Record<string, any[]> = {
  'student': [
    { id: 'fan', hours: 18 }, { id: 'bulbs', hours: 6 }, { id: 'kettle', hours: 0.2 }, { id: 'sound', hours: 4 }
  ],
  'family': [
    { id: 'fridge', hours: 24 }, { id: 'ac1', hours: 6 }, { id: 'tv', hours: 5 }, { id: 'bulbs', hours: 8 }, { id: 'fan', hours: 12 }, { id: 'micro', hours: 0.3 }
  ],
  'tycoon': [
    { id: 'fridge', hours: 24 }, { id: 'ac15', hours: 10 }, { id: 'ac1', hours: 8 }, { id: 'ac1', hours: 8 }, { id: 'pump', hours: 1 }, { id: 'wash', hours: 1 }, { id: 'tv', hours: 8 }, { id: 'console', hours: 4 }
  ]
};

// Electricity Tariff Bands (Cost per kWh)
export const BAND_RATES: Record<string, number> = {
  'A': 225, 
  'B': 145, 
  'C': 65,  
};

// ... (Keep existing SOLAR_SETUPS and MARKET_DATA as is) ...
// [Retain previous SOLAR_SETUPS and MARKET_DATA arrays here for brevity, they are unchanged]
const SOLAR_SETUPS = [
  { id: 'starter', name: "Lite Backup",   kva: 1.5, batteryWh: 1200,  cost: 950000,   priceLabel: "0.95M" },
  { id: 'mid',     name: "Home Office",   kva: 2.5, batteryWh: 2500,  cost: 1850000,  priceLabel: "1.85M" },
  { id: 'family',  name: "Family Freedom",kva: 3.5, batteryWh: 5000,  cost: 3400000,  priceLabel: "3.4M" },
  { id: 'elite',   name: "Elite Estate",  kva: 5.0, batteryWh: 10000, cost: 5600000,  priceLabel: "5.6M" },
  { id: 'titan',   name: "Titan Grid",    kva: 10.0, batteryWh: 20000, cost: 11500000, priceLabel: "11.5M" },
];

const MARKET_DATA = [
  { id: "fridge", name: "Deep Freezer",     category: "Kitchen", baseWatts: 450,  invWatts: 140,  defaultHours: 24 },
  { id: "kettle", name: "Electric Kettle",  category: "Kitchen", baseWatts: 2200, invWatts: 1200, defaultHours: 0.5 },
  { id: "micro",  name: "Microwave",        category: "Kitchen", baseWatts: 1200, invWatts: 800,  defaultHours: 0.3 },
  { id: "stove",  name: "Electric Hotplate",category: "Kitchen", baseWatts: 2500, invWatts: 1500, defaultHours: 1 },
  { id: "ac1",    name: "AC (1HP)",         category: "Cooling", baseWatts: 1200, invWatts: 650,  defaultHours: 8 },
  { id: "ac15",   name: "AC (1.5HP)",       category: "Cooling", baseWatts: 1800, invWatts: 800,  defaultHours: 8 },
  { id: "fan",    name: "Ceiling Fan",      category: "Cooling", baseWatts: 85,   invWatts: 35,   defaultHours: 12 },
  { id: "tv",     name: "55\" Smart TV",    category: "Living",  baseWatts: 150,  invWatts: 80,   defaultHours: 6 },
  { id: "sound",  name: "Home Theatre",     category: "Living",  baseWatts: 100,  invWatts: 40,   defaultHours: 4 },
  { id: "console",name: "Game Console",     category: "Living",  baseWatts: 200,  invWatts: 120,  defaultHours: 3 },
  { id: "pump",   name: "Water Pump (1HP)", category: "Utility", baseWatts: 1100, invWatts: 750,  defaultHours: 0.5 },
  { id: "iron",   name: "Steam Iron",       category: "Utility", baseWatts: 1800, invWatts: 1000, defaultHours: 0.5 },
  { id: "wash",   name: "Washing Machine",  category: "Utility", baseWatts: 500,  invWatts: 300,  defaultHours: 1 },
  { id: "bulbs",  name: "Lighting Set (10)",category: "Utility", baseWatts: 600,  invWatts: 100,  defaultHours: 6 },
];

// --- 2. THE ENGINE HOOK ---

export function useEnergyEngine() {
  const [houseItems, setHouseItems] = useState<any[]>([]);
  const [activeSetup, setActiveSetup] = useState<any>(null);
  const [band, setBand] = useState<string | null>(null); 
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isBlackout, setIsBlackout] = useState(false);

  // --- Real-time Calculations ---
  const currentStats = useMemo(() => {
    let gridMonthly = 0;
    let solarInstantLoad = 0;
    let baselineGridMonthly = 0; 
    
    const currentBandRate = band ? BAND_RATES[band] : 0;

    houseItems.forEach(item => {
      const data = MARKET_DATA.find(m => m.id === item.id);
      if (!data) return;

      const watts = item.isEfficient ? data.invWatts : data.baseWatts;
      const hours = item.hours ?? data.defaultHours; 
      const monthlyKwh = (watts * hours * 30) / 1000;

      const baseWatts = data.baseWatts;
      const baseMonthlyKwh = (baseWatts * hours * 30) / 1000;
      baselineGridMonthly += (baseMonthlyKwh * currentBandRate);

      if (item.source === 'grid') {
        gridMonthly += (monthlyKwh * currentBandRate);
      } else {
        solarInstantLoad += watts;
      }
    });

    const savings = baselineGridMonthly - gridMonthly;
    const inverterStrain = activeSetup ? (solarInstantLoad / (activeSetup.kva * 1000)) * 100 : 0;
    
    return {
      gridMonthly,
      solarInstantLoad,
      savings,
      inverterStrain,
      batteryLevel,
      isBlackout,
      activeSetup,
      band,
      houseItems: houseItems.map(item => {
        const data = MARKET_DATA.find(m => m.id === item.id);
        const currentWatts = item.isEfficient ? data?.invWatts : data?.baseWatts;
        return {
          ...item,
          name: data?.name, // Ensure name is always fresh
          variantLabel: item.isEfficient ? "Inverter-Spec" : "Standard",
          watts: currentWatts,
          category: data?.category,
          monthlyCost: Math.round(((currentWatts || 0) * item.hours * 30 / 1000) * currentBandRate)
        };
      })
    };
  }, [houseItems, band, activeSetup, batteryLevel, isBlackout]);

  // --- Actions ---

  const addAppliance = (id: string, customHours?: number) => {
    const data = MARKET_DATA.find(m => m.id === id);
    if (!data) return;
    
    setHouseItems(prev => [...prev, {
      id,
      uid: Math.random().toString(36).substr(2, 9),
      name: data.name,
      isEfficient: false,
      source: 'grid',
      hours: customHours ?? data.defaultHours 
    }]);
  };

  // NEW: Bulk Load Scenario
  const loadScenario = (presetKey: string) => {
    const preset = PERSONA_PRESETS[presetKey];
    if (!preset) return;

    const newItems = preset.map(p => {
      const data = MARKET_DATA.find(m => m.id === p.id);
      return {
        id: p.id,
        uid: Math.random().toString(36).substr(2, 9),
        name: data?.name,
        isEfficient: false,
        source: 'grid',
        hours: p.hours
      };
    });
    setHouseItems(newItems);
  };

  const updateApplianceHours = (uid: string, newHours: number) => {
    setHouseItems(prev => prev.map(item => 
      item.uid === uid ? { ...item, hours: newHours } : item
    ));
  };

  const upgradeAppliance = (uid: string) => {
    setHouseItems(prev => prev.map(item => 
      item.uid === uid ? { ...item, isEfficient: true } : item
    ));
  };

  const toggleSource = (uid: string) => {
    if (!activeSetup) return; 
    setHouseItems(prev => prev.map(item => 
      item.uid === uid ? { ...item, source: item.source === 'grid' ? 'solar' : 'grid' } : item
    ));
  };

  const reset = () => {
    setHouseItems([]);
    setActiveSetup(null);
    setBand(null); 
    setBatteryLevel(100);
    setIsBlackout(false);
  };

  return {
    marketData: MARKET_DATA,
    solarOptions: SOLAR_SETUPS,
    currentStats,
    onAddAppliance: addAppliance,
    onUpgradeAppliance: upgradeAppliance,
    onToggleSource: toggleSource,
    onUpdateHours: updateApplianceHours,
    onSelectSetup: setActiveSetup,
    onReset: reset,
    setBand,
    loadScenario // Exported for the creator
  };
}