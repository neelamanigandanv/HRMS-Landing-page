import React from "react";
import { PARTNER_CHECKLIST, ChecklistItem } from "@/data/partnersData";
import { PartnerIllustration } from "./PartnerIllustration";

export const ChecklistCard: React.FC = () => {
  return (
    <section className="partner-checklist-section" id="what-you-get" aria-labelledby="checklist-heading">
      <div className="container">
        {/* Section Header */}
        <div className="partner-section-header">
          <div className="partner-section-eyebrow">
            <span className="partner-sparkle">✦</span>
            <span>WHAT YOU GET</span>
            <span className="partner-sparkle">✦</span>
          </div>
          <h2 id="checklist-heading" className="partner-section-title">
            Enterprise Resources to Help You <span className="partner-highlight-word">Win</span>
          </h2>
          <p className="partner-section-subtitle">
            Every partner receives comprehensive tooling, ongoing presales support, and co-marketing
            assistance to drive rapid deal closures.
          </p>
        </div>

        {/* 6 Illustration-Centric Resource Cards Grid (Matching Reference Image) */}
        <div className="partner-step-card-grid">
          {PARTNER_CHECKLIST.map((item: ChecklistItem, index: number) => {
            return (
              <div
                key={item.id}
                className={`partner-nft-step-card ${index === 1 ? "is-featured" : ""}`}
              >
                {/* Visual Vector Illustration at top center */}
                <div className="partner-card-illustration-wrap">
                  <PartnerIllustration
                    type={item.id}
                    className="partner-card-illustration-svg"
                  />
                </div>

                {/* Card Title & Desc */}
                <h3 className="partner-step-card-title">{item.title}</h3>
                <p className="partner-step-card-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChecklistCard;
