"use client";

import React from "react";
import EnergyGame from "./EnergyGame";
import { useEnergyEngine } from "./engine";

export default function Page() {
  // 1. Initialize the Logic Engine
  const engine = useEnergyEngine();

  return (
    <main>
      {/* 2. Pass all logic/state directly into the Game UI */}
      <EnergyGame
        {...engine}
        comingSoon={true}
        // Using the full formResponse endpoint you provided
        comingSoonFormUrl={"https://docs.google.com/forms/d/e/1FAIpQLScBTFicIUa2si9W7J0nJOU_IHa8A628VCeMCV3ZvujUEzqTrQ/formResponse"}
        comingSoonFormFields={{ name: "entry.58347567", email: "entry.1839307866" }}
      />
    </main>
  );
}