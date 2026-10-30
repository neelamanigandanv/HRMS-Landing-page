import React from "react";
import Icon from "@/components/ui/Icon";

interface HeroBannerProps {
  onBecomePartnerClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onBecomePartnerClick }) => {
  return (
    <section className="partner-hero-rich" aria-labelledby="partner-hero-title">
      <div className="container">
        {/* Top Spotlight Tag */}
        <div className="partner-hero-spotlight-tag" aria-label="LattiumHR Partner Programme">
          <span>✦ LATTIUM HR PARTNER PROGRAMME ✦</span>
        </div>

        {/* Title & Subtext */}
        <h1 id="partner-hero-title" className="partner-hero-rich-title">
          Accelerate Growth with the
          <br className="partner-hero-br" />
          <span className="partner-glow-text">LattiumHR Partner Alliance</span>
        </h1>

        <p className="partner-hero-rich-subhead">
          Join our global network of certified resellers, implementation partners, and HR advisors.
          Deliver enterprise-ready HRMS, payroll, and biometric attendance while unlocking up to 35%
          recurring subscription revenues.
        </p>

        {/* Dual Pill Action Buttons */}
        <div className="partner-hero-rich-actions">
          <button
            type="button"
            className="partner-pill-btn-primary"
            onClick={onBecomePartnerClick}
          >
            Become a Partner <Icon name="arrow" size={15} />
          </button>
          <button
            type="button"
            className="partner-pill-btn-secondary"
            onClick={() => {
              const el = document.getElementById("find-the-right-fit");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Explore Partner Tracks
          </button>
        </div>

        {/* Trust Points */}
        <div className="partner-hero-trust-row">
          <span>
            <Icon name="check" size={13} /> Zero Sign-Up or Licensing Fees
          </span>
          <span>
            <Icon name="check" size={13} /> Up to 35% Recurring Revenue Share
          </span>
          <span>
            <Icon name="check" size={13} /> Dedicated Alliance Manager & Co-Sell
          </span>
          <span>
            <Icon name="check" size={13} /> Free Sandbox & Deal Protection
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
