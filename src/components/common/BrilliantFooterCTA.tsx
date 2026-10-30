import React from "react";
import { Link } from "react-router-dom";
import { useDemoModal } from "../../context/DemoModalContext";
import "./BrilliantFooterCTA.css";

export interface BrilliantFooterCTAProps {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  secondaryLink?: string;
  onPrimaryClick?: () => void;
  className?: string;
}

export const BrilliantFooterCTA: React.FC<BrilliantFooterCTAProps> = ({
  eyebrow = "READY WHEN YOU ARE",
  titleLine1 = "LET'S BUILD",
  titleLine2 = "SOMETHING",
  titleLine3 = "BRILLIANT.",
  description = "Join 500+ growing multi-branch enterprises running zero-error statutory payroll, automated attendance, and connected HR.",
  primaryBtnText = "Book a Live Demo",
  secondaryBtnText = "Estimate Price",
  secondaryLink = "#pricing",
  onPrimaryClick,
  className = "",
}) => {
  const { openDemoModal } = useDemoModal();

  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      openDemoModal();
    }
  };

  return (
    <section className={`brilliant-footer-cta ${className}`}>
      {/* 1. Subtle Dot Matrix Grid */}
      <div className="brilliant-cta-dots" aria-hidden="true" />

      {/* 2. Concentric Radar Rings Radiating Behind Headline */}
      <div className="brilliant-radar-rings" aria-hidden="true">
        <span className="brilliant-ring brilliant-ring-1" />
        <span className="brilliant-ring brilliant-ring-2" />
        <span className="brilliant-ring brilliant-ring-3" />
        <span className="brilliant-ring brilliant-ring-4" />
      </div>

      {/* 3. Corner Precision Brackets */}
      <span className="brilliant-corner-bracket bracket-tl" aria-hidden="true" />
      <span className="brilliant-corner-bracket bracket-tr" aria-hidden="true" />
      <span className="brilliant-corner-bracket bracket-bl" aria-hidden="true" />
      <span className="brilliant-corner-bracket bracket-br" aria-hidden="true" />

      {/* 4. Foreground Content */}
      <div className="brilliant-cta-container">
        {eyebrow && <span className="brilliant-cta-eyebrow">{eyebrow}</span>}

        <h2 className="brilliant-cta-title">
          {titleLine1 && <span className="brilliant-title-line">{titleLine1}</span>}
          {titleLine2 && <span className="brilliant-title-line">{titleLine2}</span>}
          {titleLine3 && <span className="brilliant-title-line">{titleLine3}</span>}
        </h2>

        {description && <p className="brilliant-cta-description">{description}</p>}

        <div className="brilliant-cta-actions">
          <button
            type="button"
            className="brilliant-btn-primary"
            onClick={handlePrimaryClick}
          >
            {primaryBtnText}
          </button>

          {secondaryLink.startsWith("#") ? (
            <a href={secondaryLink} className="brilliant-btn-secondary">
              {secondaryBtnText}
            </a>
          ) : (
            <Link to={secondaryLink} className="brilliant-btn-secondary">
              {secondaryBtnText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrilliantFooterCTA;

