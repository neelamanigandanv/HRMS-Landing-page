import { useState, useEffect } from "react";
import "./Hero3DStaircase.css";

interface StepData {
  id: number;
  label: string;
  pillTop: string;
  pillLeft: string;
}

const STEPS: StepData[] = [
  { id: 1, label: "Hire", pillTop: "54%", pillLeft: "29%" },
  { id: 2, label: "Onboard", pillTop: "45.5%", pillLeft: "40%" },
  { id: 3, label: "Attendance", pillTop: "37%", pillLeft: "50%" },
  { id: 4, label: "Payroll", pillTop: "28%", pillLeft: "61%" },
  { id: 5, label: "Growth", pillTop: "18%", pillLeft: "72%" },
];

export function Hero3DStaircase() {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Sync active step with the 12-second loop for interactive highlighting
  useEffect(() => {
    const cycleTimes = [
      { step: 1, start: 0, end: 1100 },
      { step: 2, start: 2200, end: 3600 },
      { step: 3, start: 3600, end: 5000 },
      { step: 4, start: 5000, end: 6400 },
      { step: 5, start: 6400, end: 8600 },
      { step: 1, start: 10800, end: 12000 },
    ];

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % 12000;
      const current = cycleTimes.find((c) => elapsed >= c.start && elapsed < c.end);
      if (current) {
        setActiveStep(current.step);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-3d-visual-container" aria-label="LattiumHR interactive workforce journey from Hire to Growth">
      {/* Background Soft Pink Ambient Glow */}
      <div className="hero-3d-ambient-glow" />

      {/* Floating Sparkles (Always Twinkling) */}
      <div className="hero-3d-sparkle sparkle-1" aria-hidden="true">
        <svg viewBox="0 0 20 20" width="16" height="16">
          <path d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8 Z" fill="#D8B26E" />
        </svg>
      </div>
      <div className="hero-3d-sparkle sparkle-2" aria-hidden="true">
        <svg viewBox="0 0 20 20" width="14" height="14">
          <path d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8 Z" fill="#B8487C" />
        </svg>
      </div>
      <div className="hero-3d-sparkle sparkle-3" aria-hidden="true">
        <svg viewBox="0 0 20 20" width="18" height="18">
          <path d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8 Z" fill="#8C2B66" />
        </svg>
      </div>

      {/* Camera Drift Wrapper: Gentle ambient 3D tilt */}
      <div className="hero-3d-camera-rig">
        {/* The Studio 3D Scene Base Render */}
        <div className="hero-3d-render-wrap">
          <img
            src="/images/hero-3d-staircase.jpg"
            alt="LattiumHR 3D Staircase: From Hire to Growth"
            className="hero-3d-base-img"
            loading="eager"
            fetchPriority="high"
          />

          {/* Step 5 Soft Plum Aura (Glows when coin is on Step 5) */}
          <div className={`step-5-glow-aura ${activeStep === 5 ? "is-active" : ""}`} />

          {/* Celebration Sparkles Burst on Step 5 */}
          <div className={`growth-sparkles-burst ${activeStep === 5 ? "is-bursting" : ""}`} aria-hidden="true">
            <span className="burst-star star-1" />
            <span className="burst-star star-2" />
            <span className="burst-star star-3" />
            <span className="burst-star star-4" />
            <span className="burst-star star-5" />
          </div>

          {/* The Animated Hopping Champagne-Gold Coin */}
          <div className="coin-anim-track" aria-hidden="true">
            <div className="coin-body-gold">
              <div className="coin-milled-rim">
                <div className="coin-inner-face">
                  <span className="coin-engraved-l">L</span>
                </div>
              </div>
              <div className="coin-reflection-sheen" />
            </div>
            {/* Dynamic Coin Contact Shadow */}
            <div className="coin-cast-shadow" />
          </div>

          {/* The 5 Floating Responsive Pill Labels */}
          <div className="hero-3d-pills-layer">
            {STEPS.map((step) => {
              const isCurrent = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`step-floating-pill step-pill-${step.id} ${isCurrent ? "is-active-step" : ""}`}
                  style={{ top: step.pillTop, left: step.pillLeft }}
                >
                  <span className="pill-number-circle">{step.id}</span>
                  <span className="pill-step-name">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Pink Glass Orbs with Depth of Field */}
      <div className="glass-orb orb-fg-1" aria-hidden="true" />
      <div className="glass-orb orb-fg-2" aria-hidden="true" />
      <div className="glass-orb orb-bg-1" aria-hidden="true" />
      <div className="glass-orb orb-bg-2" aria-hidden="true" />
    </div>
  );
}

export default Hero3DStaircase;
