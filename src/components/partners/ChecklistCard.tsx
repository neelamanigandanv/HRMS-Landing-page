import React from "react";
import { PARTNER_CHECKLIST, ChecklistItem } from "@/data/partnersData";

/* Precise SVG Icons matching reference layout with primary plum/wine palette */
const renderResourceIcon = (id: string, isFeatured?: boolean) => {
  const strokeColor = isFeatured ? "#FFFFFF" : "#802B5B";
  switch (id) {
    case "item-welcome-kit":
      return (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Thumbs up with sparkles above thumb - matching Card 1 in reference */}
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2.36a1.5 1.5 0 0 1 2.5 1.38z" />
          <path d="M12.5 1v2" />
          <path d="m16.5 2.5-1.2 1.6" />
          <path d="m8.5 2.5 1.2 1.6" />
        </svg>
      );
    case "item-training":
      return (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Lightbulb with checkmark inside - matching Card 2 in reference */}
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 2a7 7 0 0 0-4.8 12.1c.5.5.8 1.2.8 1.9h8c0-.7.3-1.4.8-1.9A7 7 0 0 0 12 2z" />
          <path d="m9.5 9.5 1.8 1.8 3.5-3.5" />
          <path d="M12 0v1.2" />
          <path d="M21.5 9h-1.2" />
          <path d="M3.7 9H2.5" />
          <path d="m18.5 3.5-.9.9" />
          <path d="m5.5 3.5.9.9" />
          <path d="m18.5 14.5-.9-.9" />
          <path d="m5.5 14.5.9-.9" />
        </svg>
      );
    case "item-demo-support":
      return (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Rocket taking off diagonally - matching Card 3 in reference */}
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4.5c1.2-1.2 3-1.5 3-1.5" />
          <path d="M12 15v5s3.03-.55 4.5-2c1.2-1.2 1.5-3 1.5-3" />
          <circle cx="15" cy="9" r="1.5" />
          <path d="m3.5 20.5-1.5 1.5" />
        </svg>
      );
    case "item-lead-support":
      return (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Target / Bullseye for lead routing & co-selling */}
          <circle cx="12" cy="12" r="9.5" />
          <circle cx="12" cy="12" r="5.5" />
          <circle cx="12" cy="12" r="2" fill={strokeColor} />
          <path d="M12 2.5v2" />
          <path d="M12 19.5v2" />
          <path d="M2.5 12h2" />
          <path d="M19.5 12h2" />
        </svg>
      );
    case "item-marketing-material":
      return (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Marketing & Collateral Deck */}
          <rect x="3" y="3" width="18" height="13" rx="2" />
          <path d="M7 8h4" />
          <path d="M7 12h10" />
          <path d="M14 8h3" />
          <path d="M8 21h8" />
          <path d="M12 16v5" />
        </svg>
      );
    case "item-partner-manager":
      return (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Handshake forming heart silhouette - matching Card 4 in reference */}
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9" />
          <path d="m16 8.5-2 2" />
          <path d="m14 11-1.5 1.5" />
        </svg>
      );
    default:
      return null;
  }
};

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

        {/* 6 Resource Cards Grid (Exactly 2 Rows of 3 Cards) Matching Reference Image Layout */}
        <div className="partner-step-card-grid">
          {PARTNER_CHECKLIST.map((item: ChecklistItem) => {
            const isFeatured = item.isFeatured;
            return (
              <div
                key={item.id}
                className={`partner-nft-step-card ${isFeatured ? "is-featured" : ""}`}
              >
                {/* Top-Left Circular Icon Container */}
                <div className={`partner-card-icon-circle ${isFeatured ? "is-featured" : ""}`}>
                  {renderResourceIcon(item.id, isFeatured)}
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
