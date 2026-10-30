import React, { useState } from "react";
import Icon, { IconName } from "../ui/Icon";
import { HIRING_STEPS, HiringStep } from "../../data/careersData";

// Orbital angles for the 5 satellite buttons along the right arc of the circle (pointing towards right points)
const SATELLITE_POSITIONS = [
  { left: "76%", top: "11.5%" },  // Step 1: ~ -56 deg (top-right arc)
  { left: "91%", top: "28.5%" },  // Step 2: ~ -28 deg (upper-right arc)
  { left: "96.5%", top: "50%" },  // Step 3: 0 deg (middle-right arc)
  { left: "91%", top: "71.5%" },  // Step 4: ~ +28 deg (lower-right arc)
  { left: "76%", top: "88.5%" },  // Step 5: ~ +56 deg (bottom-right arc)
];

export default function HiringStepper() {
  // Default to step 3 (as highlighted in reference image) or step 1
  const [activeStep, setActiveStep] = useState<number>(3);

  const activeStepData =
    HIRING_STEPS.find((st) => st.step === activeStep) || HIRING_STEPS[0];

  return (
    <div className="careers-process-wrapper" aria-label="Our 5-Step Hiring Process">
      <div className="careers-process-grid">
        {/* ==================================================================
            LEFT COLUMN: "Our Usual Process" 5 Numbered Items (Points)
            ================================================================== */}
        <div className="careers-process-points-col">
          <h3 className="careers-process-points-title">Our Usual Process</h3>

          <div className="careers-process-steps-list">
            {HIRING_STEPS.map((st: HiringStep) => {
              const isActive = st.step === activeStep;
              return (
                <div
                  key={st.step}
                  className={`careers-process-step-item ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveStep(st.step)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveStep(st.step);
                    }
                  }}
                  aria-pressed={isActive}
                  aria-label={`Step ${st.step}: ${st.title}`}
                >
                  {/* Number Badge (Primary Brand Plum) */}
                  <div className="careers-process-step-num-badge">
                    <span>{st.step}</span>
                  </div>

                  {/* Step Text - Clean & Borderless */}
                  <div className="careers-process-step-text">
                    <p className="careers-process-step-copy">
                      <strong className="careers-process-step-bold">{st.title}.</strong>{" "}
                      <span className="careers-process-step-desc-inline">
                        {st.description}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================================
            RIGHT COLUMN: Interactive Orbital Dial & Center Card (Flow)
            ================================================================== */}
        <div className="careers-process-orbit-col" aria-live="polite">
          <div className="careers-orbit-stage">
            {/* Outer Dotted Orbit Ring */}
            <div className="careers-orbit-dotted-ring" aria-hidden="true" />

            {/* Central Circle Display - Enlarged with No Text Overlap */}
            <div className="careers-orbit-center-card">
              <div className="careers-orbit-center-icon-box">
                <Icon
                  name={(activeStepData.icon as IconName) || "briefcase"}
                  size={32}
                />
              </div>

              <h4 className="careers-orbit-center-title">
                {activeStepData.step}. {activeStepData.title}
              </h4>

              <div className="careers-orbit-center-meta">
                <span className="careers-orbit-duration-badge">
                  <Icon name="clock" size={12} /> {activeStepData.duration}
                </span>
                <span className="careers-orbit-subtitle-text">
                  {activeStepData.subtitle}
                </span>
              </div>

              <p className="careers-orbit-center-desc">
                {activeStepData.description}
              </p>
            </div>

            {/* 5 Satellite Icons placed along the right circular arc */}
            {HIRING_STEPS.map((st: HiringStep, idx: number) => {
              const pos = SATELLITE_POSITIONS[idx] || { left: "50%", top: "50%" };
              const isActive = st.step === activeStep;

              return (
                <button
                  key={st.step}
                  type="button"
                  style={{ left: pos.left, top: pos.top }}
                  className={`careers-orbit-satellite-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveStep(st.step)}
                  title={`Select Step ${st.step}: ${st.title}`}
                  aria-label={`Step ${st.step}: ${st.title}`}
                >
                  <Icon
                    name={(st.icon as IconName) || "briefcase"}
                    size={22}
                  />
                  {isActive && (
                    <span className="careers-orbit-satellite-pulse" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
