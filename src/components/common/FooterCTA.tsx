import React from "react";
import { useDemoModal } from "../../context/DemoModalContext";
import Icon from "../ui/Icon";
import "./FooterCTA.css";

export interface FooterCTAProps {
  variant?: "default" | "neon-curtain";
  eyebrowBadgeText?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subheadlineLine1?: string;
  subheadlineLine2?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  className?: string;
}

export function FooterCTA({
  variant = "default",
  eyebrowBadgeText = "Built for Modern Multi-Branch Workforce Operations",
  headlineLine1,
  headlineLine2,
  subheadlineLine1,
  subheadlineLine2,
  primaryButtonText,
  secondaryButtonText,
  className = "",
}: FooterCTAProps) {
  const { openDemoModal } = useDemoModal();

  const handleEstimatePrice = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      const el = document.getElementById("pricing");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.location.href = "/#pricing";
  };

  const isNeon = variant === "neon-curtain";

  // Default content based on variant
  const finalHead1 = headlineLine1 ?? (isNeon ? "Boost Your Workforce" : "Driving Innovation to Build the");
  const finalHead2 = headlineLine2 ?? (isNeon ? "Potential with LattiumHR" : "Future of People Operations");
  const finalSub1 = subheadlineLine1 ?? (isNeon
    ? "Focus on team growth while we take care of workforce operations:"
    : "We harness modern automation and connected workflows, driving innovation");
  const finalSub2 = subheadlineLine2 ?? (isNeon
    ? "directory, self-service, leave, attendance, document vault, and approvals."
    : "to enhance efficiency, compliance, and growth for teams worldwide.");
  const finalPrimaryText = primaryButtonText ?? (isNeon ? "Book a Live Demo" : "Book a Demo");
  const finalSecondaryText = secondaryButtonText ?? (isNeon ? "Explore Features" : "Estimate Price");

  // FULL WIDTH NEON CURTAIN VARIANT (Matches media_1793362590960_6e750997.png edge-to-edge)
  if (isNeon) {
    return (
      <section className={`footer-cta-neon-fullwidth ${className}`} aria-label="Workforce Potential Call to Action">
        <div className="neon-curtain-container">
          {/* Eyebrow Pill Badge */}
          <div className="neon-curtain-badge-pill">
            <span className="neon-curtain-badge-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </span>
            <span>{eyebrowBadgeText}</span>
          </div>

          {/* Pure White Bold 2-Line Headline */}
          <h2 className="neon-curtain-headline">
            <span>{finalHead1}</span>
            <br />
            <span>{finalHead2}</span>
          </h2>

          {/* 2-Line Subheadline with Colon and List */}
          <p className="neon-curtain-subheadline">
            <span>{finalSub1}</span>
            <br />
            <span>{finalSub2}</span>
          </p>

          {/* Action Buttons: Vibrant Rose Primary + Dark Glassmorphic Secondary */}
          <div className="neon-curtain-actions">
            <button
              type="button"
              className="neon-curtain-btn-primary"
              onClick={() => openDemoModal()}
            >
              <span>{finalPrimaryText}</span>
              <span className="neon-curtain-arrow-circle" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff75ba" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </button>

            <a
              href="/#pricing"
              onClick={handleEstimatePrice}
              className="neon-curtain-btn-secondary"
            >
              <span>{finalSecondaryText}</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  // DEFAULT FLOATING BOXED CARD FOR OTHER PAGES
  return (
    <section className={`footer-cta-wrapper ${className}`} aria-label="Footer Call to Action">
      <div className="container-wide">
        <div className="footer-cta-card">
          <div className="footer-cta-bg-overlay" aria-hidden="true" />
          <div className="footer-cta-content">
            <h2 className="footer-cta-headline">
              <span>{finalHead1}</span>
              <br className="footer-cta-br" />
              <span>{finalHead2}</span>
            </h2>

            <p className="footer-cta-subheadline">
              <span>{finalSub1}</span>
              <br className="footer-cta-br" />
              <span>{finalSub2}</span>
            </p>

            <div className="footer-cta-actions">
              <button
                type="button"
                className="footer-cta-btn-primary"
                onClick={() => openDemoModal()}
              >
                <span>{finalPrimaryText}</span>
                <span className="footer-cta-arrow-box" aria-hidden="true">
                  <Icon name="arrow" size={14} />
                </span>
              </button>

              <a
                href="/#pricing"
                onClick={handleEstimatePrice}
                className="footer-cta-btn-secondary"
              >
                <span>{finalSecondaryText}</span>
                <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FooterCTA;
