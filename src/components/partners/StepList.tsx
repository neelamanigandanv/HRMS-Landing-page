import React from "react";
import Icon, { IconName } from "@/components/ui/Icon";
import { HOW_IT_WORKS_STEPS } from "@/data/partnersData";

export const StepList: React.FC = () => {
  const stepIcons: IconName[] = ["search", "users", "book-open", "chart"];

  return (
    <section className="partner-process-section" id="how-it-works" aria-labelledby="steps-heading">
      <div className="container">
        {/* Top Centered Header */}
        <div className="partner-section-header">
          <div className="partner-section-eyebrow">
            <span className="partner-sparkle">✦</span>
            <span>OUR WORK PROCESS</span>
            <span className="partner-sparkle">✦</span>
          </div>

          <h2 id="steps-heading" className="partner-section-title">
            From Application to First Closed Deal in <span className="partner-highlight-word">Four Steps</span>
          </h2>

          <p className="partner-section-subtitle">
            Our onboarding process is designed to deliver rapid enablement, certified expertise,
            and predictable revenue through a structured four-stage path.
          </p>
        </div>

        {/* Connected Milestone Bar */}
        <div className="partner-process-timeline-bar" aria-hidden="true">
          <div className="partner-process-timeline-line"></div>
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div key={step.step} className="partner-process-timeline-node">
              <span className="partner-process-timeline-pill">
                <span className="partner-process-timeline-dot"></span>
                STEP 0{idx + 1}
              </span>
            </div>
          ))}
        </div>

        {/* 4 Cards Grid */}
        <div className="partner-process-cards-grid">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div key={step.step} className="partner-process-card">
              <div className="partner-process-icon-wrap">
                <Icon name={stepIcons[idx % stepIcons.length]} size={24} />
              </div>

              <h3 className="partner-process-card-title">{step.title}</h3>
              <p className="partner-process-card-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepList;
