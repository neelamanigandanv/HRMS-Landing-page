import React from "react";
import { useDemoModal } from "../../context/DemoModalContext";
import Icon from "../ui/Icon";
import "./FooterCTA.css";

export interface InsightCardStat {
  label: string;
  value: string;
  color: string;
}

export interface FooterCTAProps {
  variant?: "default" | "neon-curtain" | "matrix-glow" | "insight-card" | "emp-banner";
  eyebrowBadgeText?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subheadlineLine1?: string;
  subheadlineLine2?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  className?: string;
  /** insight-card variant props */
  insightBgImage?: string;
  insightCardTitle?: string;
  insightCardStat?: string;
  insightCardBadge?: string;
  insightCategories?: InsightCardStat[];
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
  insightBgImage,
  insightCardTitle,
  insightCardStat,
  insightCardBadge,
  insightCategories,
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

  // ======================== INSIGHT CARD VARIANT ========================
  // Two-column: left text + button, right atmospheric image with floating dashboard card
  if (variant === "insight-card") {
    const iEyebrow = eyebrowBadgeText !== "Built for Modern Multi-Branch Workforce Operations"
      ? eyebrowBadgeText
      : "ATTENDANCE INSIGHTS";
    const iHead = headlineLine1 ?? "Real-time attendance overview & insights";
    const iDesc = subheadlineLine1 ??
      "Stay on top of your workforce attendance with real-time dashboards, automated exception alerts, and clear shift analytics — giving managers complete visibility.";
    const iBtnText = primaryButtonText ?? "Get Started";
    const iCardTitle = insightCardTitle ?? "Overview";
    const iCardStat = insightCardStat ?? "23 insights";
    const iCardBadge = insightCardBadge ?? "+4 new";
    const iCategories: InsightCardStat[] = insightCategories ?? [
      { label: "On-Time", value: "16", color: "#10b981" },
      { label: "Late Arrivals", value: "5", color: "#eab308" },
      { label: "Absent", value: "2", color: "#a78bfa" },
    ];
    const totalCats = iCategories.reduce((s, c) => s + parseInt(c.value, 10), 0) || 1;

    return (
      <section className={`insight-card-section ${className}`} aria-label="Attendance Insights CTA">
        <div className="insight-card-wrapper">
          {/* Left Column: Text */}
          <div className="insight-card-left">
            <span className="insight-card-eyebrow">{iEyebrow}</span>
            <h2 className="insight-card-headline">{iHead}</h2>
            <p className="insight-card-desc">{iDesc}</p>
            <button
              type="button"
              className="insight-card-btn"
              onClick={() => openDemoModal()}
            >
              <span>{iBtnText}</span>
            </button>
          </div>

          {/* Right Column: Atmospheric BG Image with Floating Dashboard Card */}
          <div className="insight-card-right">
            {/* Atmospheric CSS Background (dark gradient with subtle pattern) */}
            <div className="insight-card-bg-visual" aria-hidden="true">
              <div className="insight-card-bg-pattern" />
            </div>

            {/* Floating Dashboard Card Overlay */}
            <div className="insight-card-dashboard">
              <div className="insight-dash-header">
                <span className="insight-dash-title">{iCardTitle}</span>
                <span className="insight-dash-badge">{iCardBadge}</span>
              </div>
              <span className="insight-dash-stat">{iCardStat}</span>

              {/* Category Progress Bar */}
              <div className="insight-dash-categories">
                {iCategories.map((cat, i) => (
                  <span key={i} className="insight-dash-cat-label" style={{ color: cat.color }}>
                    {cat.value} {cat.label}
                  </span>
                ))}
              </div>
              <div className="insight-dash-bar">
                {iCategories.map((cat, i) => (
                  <div
                    key={i}
                    className="insight-dash-bar-seg"
                    style={{
                      width: `${(parseInt(cat.value, 10) / totalCats) * 100}%`,
                      background: cat.color,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ======================== EMP BANNER VARIANT ========================
  // Pure white background CTA banner with ambient brand plum glow at bottom-left and top-right
  if (variant === "emp-banner") {
    const empHead1 = headlineLine1 ?? "Boost Your Workforce";
    const empHead2 = headlineLine2 ?? "Potential with Zentilos";
    const empSub = subheadlineLine1 ??
      "Focus on team growth while we handle the rest — employee directory, self-service, leave, attendance, document vault, and approvals.";
    const empBadge = eyebrowBadgeText !== "Built for Modern Multi-Branch Workforce Operations"
      ? eyebrowBadgeText
      : "Built for Modern Multi-Branch Workforce Operations";
    const empPrimary = primaryButtonText ?? "Book a Live Demo";
    const empSecondary = secondaryButtonText ?? "Explore Features";

    return (
      <section className={`footer-cta-emp-banner ${className}`} aria-label="Employee Management Call to Action">
        {/* Minimal Light Grid Lines across Full Background */}
        <div className="emp-banner-grid-lines" aria-hidden="true" />

        {/* Ambient Primary Color Radial Glows: Bottom-Left and Top-Right */}
        <div className="emp-banner-blob emp-banner-blob-bottom-left" aria-hidden="true" />
        <div className="emp-banner-blob emp-banner-blob-top-right" aria-hidden="true" />

        {/* Content Container */}
        <div className="emp-banner-container">
          {/* Badge Pill */}
          <div className="emp-banner-badge">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="7" fill="#802B5B" opacity="0.16" />
              <path d="M4 7l2 2 4-4" stroke="#802B5B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{empBadge}</span>
          </div>

          {/* Headline */}
          <h2 className="emp-banner-headline">
            <span>{empHead1}</span>
            <br />
            <span className="emp-banner-headline-accent">{empHead2}</span>
          </h2>

          {/* Subheadline */}
          <p className="emp-banner-subtitle">{empSub}</p>

          {/* Action Buttons */}
          <div className="emp-banner-actions">
            <button
              type="button"
              className="emp-banner-btn-primary"
              onClick={() => openDemoModal()}
            >
              <span>{empPrimary}</span>
              <span className="emp-banner-btn-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            <a
              href="/pricing"
              className="emp-banner-btn-secondary"
              onClick={handleEstimatePrice}
            >
              <span>{empSecondary}</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Default content based on variant
  const finalHead1 = headlineLine1 ?? (isNeon ? "Boost Your Workforce" : "Driving Innovation to Build the");
  const finalHead2 = headlineLine2 ?? (isNeon ? "Potential with Zentilos" : "Future of People Operations");
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
        {/* Right-Side Slender Neon Rays Backdrop Layer */}
        <div
          className="neon-curtain-bg-layer"
          style={{
            backgroundImage: "url('/images/cta-slender-neon-lines.png?v=9')",
            backgroundSize: "auto 100%",
            backgroundPosition: "right top",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />

        <div className="neon-curtain-container">
          {/* Eyebrow Pill Badge */}
          <div className="neon-curtain-badge-pill">
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

  // MATRIX GLOW CARD VARIANT (Matches media_1793607831999_35c463a8.png with primary plum gradient & glowing flares)
  if (variant === "matrix-glow") {
    const matrixHead1 = headlineLine1 ?? "Ready to streamline leave &";
    const matrixHead2 = headlineLine2 ?? "absence management?";
    const matrixSub1 =
      subheadlineLine1 ??
      "Get enterprise-grade leave tracking and automated multi-tier approvals";
    const matrixSub2 =
      subheadlineLine2 ??
      "in just minutes — zero payroll delays and zero compliance disruptions.";
    const matrixBtnText = primaryButtonText ?? "Book a demo";
    const matrixSecondaryText = secondaryButtonText ?? "Explore Features";
    const matrixEyebrow =
      eyebrowBadgeText && eyebrowBadgeText !== "Built for Modern Multi-Branch Workforce Operations"
        ? eyebrowBadgeText
        : "Automated Leave & Absence Platform";

    return (
      <section
        className={`footer-cta-matrix-glow-section ${className}`}
        aria-label="Leave Management Call to Action"
      >
        {/* Backlit Glowing Side Flares anchored to section edges */}
        <div className="matrix-glow-flare matrix-glow-flare-left" aria-hidden="true" />
        <div className="matrix-glow-flare matrix-glow-flare-right" aria-hidden="true" />

        <div className="matrix-glow-container">
          {/* The Full-Width Hero Card */}
          <div className="matrix-glow-card">
            {/* Tech Dotted Matrix Grid Pattern */}
            <div className="matrix-glow-dots-grid" aria-hidden="true" />

            {/* Top Center Ambient Spotlight */}
            <div className="matrix-glow-spotlight" aria-hidden="true" />

            {/* Small Eyebrow Badge Pill (Replaces Center Icon) */}
            <div className="matrix-glow-eyebrow">
              <span>{matrixEyebrow}</span>
            </div>

            {/* Pure White Bold Headline */}
            <h2 className="matrix-glow-headline">
              <span>{matrixHead1}</span>
              {matrixHead2 && (
                <>
                  <br />
                  <span>{matrixHead2}</span>
                </>
              )}
            </h2>

            {/* Clean Centered Subheadline */}
            <p className="matrix-glow-subheadline">
              <span>{matrixSub1}</span>
              {matrixSub2 && (
                <>
                  {" "}
                  <span>{matrixSub2}</span>
                </>
              )}
            </p>

            {/* Action Buttons: Home Hero Style Primary with White Arrow Box */}
            <div className="matrix-glow-actions">
              <button
                type="button"
                className="matrix-glow-btn"
                onClick={() => openDemoModal()}
              >
                <span>{matrixBtnText}</span>
                <span className="matrix-btn-arrow-box" aria-hidden="true">
                  <Icon name="arrow" size={14} />
                </span>
              </button>

              <a
                href="/#pricing"
                onClick={handleEstimatePrice}
                className="matrix-glow-btn-secondary"
              >
                <span>{matrixSecondaryText}</span>
              </a>
            </div>
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
