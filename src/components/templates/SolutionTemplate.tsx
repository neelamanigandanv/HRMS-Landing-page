import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import SEO from "../layout/SEO";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { SolutionData } from "../../data/solutionsData";
import { useCurrency } from "../../context/CurrencyContext";

export function SolutionTemplate({ solution }: { solution: SolutionData }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { formatText } = useCurrency();
  const breadcrumbs = [
    { label: "Solutions", to: "/solutions" },
    { label: solution.title },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA={Boolean(solution.footerCta)}>
      <SEO
        title={solution.title}
        description={solution.subhead}
        canonicalPath={`/solutions/${solution.slug}`}
      />

      {/* Solution Hero: Centered Small-Business Style Hero for HR Teams */}
      {solution.slug === "hr-teams" ? (
        <section className="solution-hero-sb-style" aria-labelledby="hr-hero-heading">
          <div className="container">
            {/* Eyebrow */}
            <div className="solution-hero-sb-eyebrow">
              <span className="solution-hero-sb-sparkle">✦</span>
              <span>SOLUTIONS FOR HR TEAMS</span>
              <span className="solution-hero-sb-sparkle">✦</span>
            </div>

            {/* Headline with glow accent */}
            <h1 id="hr-hero-heading" className="solution-hero-sb-title">
              Eliminate Repetitive Paperwork.{" "}
              <span className="solution-hero-glow">Elevate Employee Experience.</span>
            </h1>

            {/* Subheadline */}
            <p className="solution-hero-sb-subhead">
              {solution.subhead}
            </p>

            {/* Hero CTAs */}
            <div className="solution-hero-sb-actions">
              <Button to="/request-demo" className="solution-hero-btn-primary">
                Request a Demo <Icon name="arrow" size={16} />
              </Button>
              <Button
                onClick={() => {
                  const el = document.getElementById("the-solution") || document.getElementById("workflow-process");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                secondary
                className="solution-hero-btn-secondary"
              >
                Explore HR Features ↓
              </Button>
            </div>

            {/* Trust Row */}
            {solution.heroTrustPoints && solution.heroTrustPoints.length > 0 && (
              <div className="solution-hero-sb-trust-row">
                {solution.heroTrustPoints.map((tp, idx) => (
                  <span key={idx}>
                    <Icon name="check" size={14} /> {tp}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : solution.heroVisual ? (
        <section className="solution-hero-rich">
          <div className="container">
            <div className="solution-hero-grid">
              {/* Left Column: Headline, Subhead, CTAs & Trust Badges */}
              <div className="solution-hero-left">
                <div className="solution-hero-spotlight">
                  <Icon name="branch" size={14} /> <span>{solution.badge}</span>
                </div>
                <h1 className="solution-hero-title">
                  {solution.heroHeadlineAccent ? (
                    <>
                      {solution.headline.replace(solution.heroHeadlineAccent, "")}
                      <span className="solution-hero-glow">{solution.heroHeadlineAccent}</span>
                    </>
                  ) : (
                    solution.headline
                  )}
                </h1>
                <p className="solution-hero-rich-subhead">{solution.subhead}</p>

                <div className="solution-hero-actions">
                  <Button to="/request-demo" className="solution-hero-btn-primary">
                    Request a Demo <Icon name="arrow" size={16} />
                  </Button>
                  <Button
                    onClick={() => {
                      const el = document.getElementById("the-solution");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    secondary
                    className="solution-hero-btn-secondary"
                  >
                    Explore HR Features ↓
                  </Button>
                </div>

                {solution.heroTrustPoints && solution.heroTrustPoints.length > 0 && (
                  <div className="solution-hero-trust-row">
                    {solution.heroTrustPoints.map((tp, idx) => (
                      <span key={idx}>
                        <Icon name="check" size={13} /> {tp}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Hero Visual Stage with Floating Widgets */}
              <div className="solution-hero-right">
                <div className="solution-hero-visual-stage">
                  <div className="solution-hero-center-card">
                    <img
                      src={solution.heroVisual.image}
                      alt={solution.heroVisual.imageAlt}
                      className="solution-hero-center-img"
                      loading="eager"
                    />
                    {solution.heroVisual.badgeLive && (
                      <div className="solution-hero-live-pill">
                        <span className="solution-live-pulse" />
                        <span>{solution.heroVisual.badgeLive}</span>
                      </div>
                    )}
                  </div>

                  {/* Left Floating Widget */}
                  {solution.heroVisual.widgetLeft && (
                    <div className="solution-hero-float-card widget-left">
                      <div className="solution-float-icon-box">
                        <Icon name={solution.heroVisual.widgetLeft.icon} size={18} />
                      </div>
                      <div className="solution-float-body">
                        <strong className="solution-float-val">{solution.heroVisual.widgetLeft.value}</strong>
                        <span className="solution-float-title">{solution.heroVisual.widgetLeft.title}</span>
                        <small className="solution-float-sub">{solution.heroVisual.widgetLeft.subtitle}</small>
                      </div>
                    </div>
                  )}

                  {/* Right Floating Widget */}
                  {solution.heroVisual.widgetRight && (
                    <div className="solution-hero-float-card widget-right">
                      <div className="solution-float-icon-box accent">
                        <Icon name={solution.heroVisual.widgetRight.icon} size={18} />
                      </div>
                      <div className="solution-float-body">
                        <strong className="solution-float-val">{solution.heroVisual.widgetRight.value}</strong>
                        <span className="solution-float-title">{solution.heroVisual.widgetRight.title}</span>
                        <small className="solution-float-sub">{solution.heroVisual.widgetRight.subtitle}</small>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="solution-hero">
          <div className="container">
            <div className="solution-hero-content">
              <span className="solution-badge">
                <Icon name="branch" size={14} /> {solution.badge}
              </span>
              <h1>{solution.headline}</h1>
              <p className="solution-subhead">{solution.subhead}</p>
              <div className="solution-hero-actions">
                <Button to="/request-demo">
                  Request a Demo <Icon name="arrow" size={16} />
                </Button>
                <Button to="/solutions" secondary>
                  Explore All Solutions
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Specific Challenges */}
      <section className="solution-challenges-section">
        <div className="container">
          <SectionHeading
            eyebrow="✦ THE CHALLENGE ✦"
            title={solution.challengesTitle}
            body={solution.challengesDesc}
            center
          />
          <div className="solution-challenges-grid">
            {solution.challenges.map((ch, idx) => (
              <div key={idx} className="challenge-card">
                <div className="challenge-icon-wrap" aria-hidden="true">
                  {idx === 0 && (
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <line x1="9" y1="9" x2="15" y2="9" />
                      <line x1="9" y1="13" x2="13" y2="13" />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      <path d="m9 14 2 2 4-4" />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                  )}
                  {idx > 2 && (
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                </div>
                <h3 className="challenge-card-title">{ch.problem}</h3>
                <p className="challenge-card-desc">{ch.consequence}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Capabilities / Interactive 4-Slide Showcase */}
      {solution.interactiveSlides && solution.interactiveSlides.length > 0 ? (
        <section className="solution-showcase-slider-section" id="the-solution">
          <div className="container">
            <SectionHeading
              eyebrow="✦ THE SOLUTION ✦"
              title={solution.capabilitiesTitle}
              body={solution.capabilitiesDesc}
              center
            />
            <div className="solution-showcase-slider-wrap">
              {solution.interactiveSlides.map((slide, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <div
                    key={idx}
                    className={`solution-showcase-slide ${isActive ? "active" : ""}`}
                    aria-hidden={!isActive}
                  >
                    <div className="solution-showcase-left-col">
                      <span className="solution-showcase-eyebrow">{slide.eyebrow}</span>
                      <h2 className="solution-showcase-title">{slide.title}</h2>
                      <p className="solution-showcase-desc">{slide.description}</p>
                      <div className="solution-showcase-checks">
                        {slide.checkmarks.map((chk, cIdx) => (
                          <div key={cIdx} className="solution-showcase-check-item">
                            <span className="solution-showcase-check-circle" aria-hidden="true">
                              <Icon name="check" size={13} />
                            </span>
                            <span className="solution-showcase-check-text">{chk}</span>
                          </div>
                        ))}
                      </div>
                      <div className="solution-showcase-cta-wrap">
                        <Link to={slide.buttonLink || "/request-demo"} className="solution-showcase-cta-btn">
                          {slide.buttonText || "EXPLORE HUB →"}
                        </Link>
                      </div>
                    </div>
                    <div className="solution-showcase-right-col">
                      <div className="solution-showcase-img-frame">
                        <img
                          src={slide.image}
                          alt={slide.imageAlt}
                          className="solution-showcase-img"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 4 Pagination Dots below matching Reference Image */}
              <div className="solution-showcase-dots" role="tablist" aria-label="Solution capabilities">
                {solution.interactiveSlides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    role="tab"
                    aria-selected={dotIdx === activeSlide}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`solution-showcase-dot ${dotIdx === activeSlide ? "active" : ""}`}
                    onClick={() => setActiveSlide(dotIdx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="solution-capabilities-section">
          <div className="container">
            <SectionHeading
              eyebrow="THE SOLUTION"
              title={solution.capabilitiesTitle}
              body={solution.capabilitiesDesc}
              center
            />
            <div className="solution-capabilities-grid">
              {solution.capabilities.map((cap, idx) => (
                <div key={idx} className="sol-cap-card">
                  <span className="sol-cap-icon">
                    <Icon name={cap.icon} size={22} />
                  </span>
                  <strong>{cap.title}</strong>
                  <p>{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Horizontal 3-Step Process Bar (Directly below the Solution Section matching Reference Image 2) */}
      {solution.horizontalSteps && solution.horizontalSteps.length > 0 && (
        <section className="solution-horizontal-steps-section">
          <div className="container">
            <div className="solution-horizontal-steps-grid">
              {solution.horizontalSteps.map((step, sIdx) => (
                <div key={sIdx} className="solution-horizontal-step-item">
                  <div className="solution-horizontal-step-num" aria-hidden="true">
                    {step.stepNumber || sIdx + 1}
                  </div>
                  <div className="solution-horizontal-step-body">
                    <h3 className="solution-horizontal-step-title">{step.title}</h3>
                    <p className="solution-horizontal-step-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Workflow Process Section (Directly Above MEASURABLE ADVANTAGE) */}
      {solution.workflowProcess && (
        <section className="solution-workflow-section" id="workflow-process">
          <div className="container">
            <SectionHeading
              eyebrow={solution.workflowProcess.eyebrow || "✦ WORKFLOW PROCESS ✦"}
              title={solution.workflowProcess.title}
              body={solution.workflowProcess.subtitle}
              center
            />
            <div className="solution-workflow-grid">
              {/* Left Column: Visual Card with Overlapping Floating Metric Badge */}
              <div className="solution-workflow-visual-col">
                <div className="solution-workflow-media-card">
                  <img
                    src={solution.workflowProcess.image}
                    alt={solution.workflowProcess.imageAlt}
                    className="solution-workflow-img"
                    loading="lazy"
                  />
                  {/* Floating Metric Badge at bottom-left matching reference image */}
                  {solution.workflowProcess.badge && (
                    <div className="solution-workflow-float-badge">
                      <div
                        className="solution-workflow-badge-icon"
                        style={{ backgroundColor: solution.workflowProcess.badge.color || "#0f766e" }}
                      >
                        <Icon name={solution.workflowProcess.badge.icon} size={22} />
                      </div>
                      <div className="solution-workflow-badge-info">
                        <strong className="solution-workflow-badge-title">{solution.workflowProcess.badge.title}</strong>
                        <span className="solution-workflow-badge-sub">{solution.workflowProcess.badge.subtitle}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Step-by-Step Vertical Timeline matching reference image */}
              <div className="solution-workflow-steps-col">
                <div className="solution-workflow-timeline">
                  <div className="solution-workflow-timeline-line" aria-hidden="true" />
                  {solution.workflowProcess.steps.map((st, sIdx) => {
                    const isFirst = sIdx === 0;
                    return (
                      <div key={sIdx} className={`solution-workflow-step-item ${isFirst ? "is-first" : ""}`}>
                        <div className="solution-workflow-step-node">
                          <div className="solution-workflow-node-inner">
                            <span>{st.number || sIdx + 1}</span>
                          </div>
                        </div>
                        <div className="solution-workflow-step-content">
                          <h3 className="solution-workflow-step-title">{st.title}</h3>
                          <p className="solution-workflow-step-desc">{st.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mid-CTA Section (Directly Below Workflow Process) */}
      {solution.midCta && (
        <section className="solution-mid-cta-section" id="mid-cta-section">
          <div className="container">
            <div className="solution-mid-cta-card">
              <div className="solution-mid-cta-content">
                <span className="solution-mid-cta-tag">{solution.midCta.tag || "✦ INTERACTIVE HR CONSULTATION ✦"}</span>
                <h2 className="solution-mid-cta-title">{solution.midCta.title}</h2>
                <p className="solution-mid-cta-desc">{solution.midCta.description}</p>
                <div className="solution-mid-cta-actions">
                  <Button to={solution.midCta.primaryBtnLink || "/request-demo"} className="solution-mid-btn-primary">
                    <span>{solution.midCta.primaryBtnText || "Schedule Tailored Walkthrough"}</span>
                    <Icon name="arrow" />
                  </Button>
                  {solution.midCta.secondaryBtnText && (
                    <Button to={solution.midCta.secondaryBtnLink || "/contact"} secondary className="solution-mid-btn-secondary">
                      <span>{solution.midCta.secondaryBtnText}</span>
                    </Button>
                  )}
                </div>
              </div>
              {solution.midCta.checklist && solution.midCta.checklist.length > 0 && (
                <div className="solution-mid-cta-checklist">
                  {solution.midCta.checklist.map((item, chkIdx) => (
                    <div key={chkIdx} className="solution-mid-checklist-item">
                      <div className="solution-mid-check-icon">
                        <Icon name="check" size={15} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Strategic Workforce Impact / Bento Grid Section */}
      {solution.impactBento ? (
        <section className="solution-impact-bento-section" id="measurable-impact">
          <div className="container">
            <SectionHeading
              eyebrow={solution.impactBento.eyebrow || "✦ STRATEGIC WORKFORCE IMPACT ✦"}
              title={solution.impactBento.title || solution.benefitsTitle}
              body={solution.impactBento.subtitle || solution.benefitsDesc}
              center
            />

            <div className="impact-bento-grid">
              {/* Card 1: Left Tall Dark Card */}
              <div className="impact-bento-card impact-card-dark">
                <div className="impact-dark-content">
                  <h3 className="impact-dark-title">{solution.impactBento.cardDark.title}</h3>
                  <p className="impact-dark-desc">{solution.impactBento.cardDark.description}</p>
                </div>

                {/* 3D Dotted Globe Area with Avatar Pins */}
                <div className="impact-globe-wrapper" aria-hidden="true">
                  <svg className="impact-globe-svg" viewBox="0 0 320 320" fill="none">
                    <defs>
                      <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#004B49" stopOpacity="0.85" />
                        <stop offset="60%" stopColor="#00201F" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#00201F" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    {/* Atmospheric Glow */}
                    <circle cx="160" cy="160" r="140" fill="url(#globeAtmosphere)" />
                    {/* Concentric latitude dotted rings */}
                    <ellipse cx="160" cy="160" rx="138" ry="138" stroke="#004B49" strokeWidth="1.2" strokeDasharray="3 7" strokeOpacity="0.5" />
                    <ellipse cx="160" cy="160" rx="138" ry="95" stroke="#004B49" strokeWidth="1.2" strokeDasharray="3 7" strokeOpacity="0.55" />
                    <ellipse cx="160" cy="160" rx="138" ry="50" stroke="#004B49" strokeWidth="1.2" strokeDasharray="3 7" strokeOpacity="0.6" />
                    <ellipse cx="160" cy="160" rx="138" ry="10" stroke="#004B49" strokeWidth="1.2" strokeDasharray="3 7" strokeOpacity="0.65" />
                    {/* Longitude dotted arcs */}
                    <ellipse cx="160" cy="160" rx="46" ry="138" stroke="#004B49" strokeWidth="1.2" strokeDasharray="3 7" strokeOpacity="0.55" />
                    <ellipse cx="160" cy="160" rx="92" ry="138" stroke="#004B49" strokeWidth="1.2" strokeDasharray="3 7" strokeOpacity="0.5" />
                    <line x1="160" y1="22" x2="160" y2="298" stroke="#004B49" strokeWidth="1.2" strokeDasharray="3 7" strokeOpacity="0.65" />
                    {/* Coordinate micro dots */}
                    <circle cx="110" cy="115" r="2" fill="#E5EAEA" />
                    <circle cx="195" cy="105" r="2.5" fill="#F6F8F8" />
                    <circle cx="230" cy="155" r="2" fill="#E5EAEA" />
                    <circle cx="140" cy="190" r="2.5" fill="#F6F8F8" />
                    <circle cx="210" cy="215" r="2" fill="#E5EAEA" />
                    <circle cx="95" cy="210" r="1.8" fill="#004B49" />
                  </svg>

                  {/* Circular Avatar Pins floating over the globe */}
                  {solution.impactBento.cardDark.globeAvatars.map((person, pIdx) => (
                    <div
                      key={pIdx}
                      className="impact-globe-avatar-pin"
                      style={{ top: person.top, left: person.left }}
                      title={`${person.name} ${person.role ? `(${person.role})` : ""}`}
                    >
                      <img src={person.avatar} alt={person.name} className="impact-pin-img" loading="lazy" />
                    </div>
                  ))}
                </div>

                {/* Bottom Left Circular Violet Action Button */}
                <Link
                  to={solution.impactBento.cardDark.buttonLink || "/request-demo"}
                  className="impact-dark-btn"
                  aria-label="Explore Unified Workforce Intelligence"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </Link>
              </div>

              {/* Card 2: Top Middle White Card */}
              <div className="impact-bento-card impact-card-middle">
                <div className="impact-mid-content">
                  <h3 className="impact-mid-title">{solution.impactBento.cardTopMiddle.title}</h3>
                  <p className="impact-mid-desc">{solution.impactBento.cardTopMiddle.description}</p>
                </div>
                <div className="impact-mid-stat-wrap">
                  <div className="impact-mid-val">{solution.impactBento.cardTopMiddle.metricValue}</div>
                  <div className="impact-mid-lbl">{solution.impactBento.cardTopMiddle.metricLabel}</div>
                </div>
              </div>

              {/* Card 3: Top Right White Card with Semi-Circular Gauge */}
              <div className="impact-bento-card impact-card-gauge">
                <div className="impact-gauge-header">
                  <div className="impact-gauge-head-left">
                    <div className="impact-head-val">
                      <span>{solution.impactBento.cardTopRight.statValue}</span>
                      <span className="impact-trend-arrow">{solution.impactBento.cardTopRight.statTrend}</span>
                    </div>
                    <div className="impact-head-lbl">{solution.impactBento.cardTopRight.statLabel}</div>
                  </div>
                  {/* Overlapping Avatar Stack */}
                  <div className="impact-gauge-avatar-stack">
                    {solution.impactBento.cardTopRight.avatars.map((av, avIdx) => (
                      <img key={avIdx} src={av} alt="Team" className="impact-stack-img" loading="lazy" />
                    ))}
                  </div>
                </div>

                {/* Half-Donut Semi-Circular Gauge Arc */}
                <div className="impact-gauge-body">
                  <div className="impact-gauge-meter">
                    <svg viewBox="0 0 220 125" className="impact-gauge-svg">
                      <defs>
                        <linearGradient id="gaugeVioletGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#004B49" />
                          <stop offset="50%" stopColor="#003836" />
                          <stop offset="100%" stopColor="#E5EAEA" />
                        </linearGradient>
                      </defs>
                      {/* Background Inactive Arc */}
                      <path
                        d="M 25 110 A 85 85 0 0 1 195 110"
                        fill="none"
                        stroke="#f1f2f8"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                      {/* Active Progress Arc (approx 98% of 267px path) */}
                      <path
                        d="M 25 110 A 85 85 0 0 1 195 110"
                        fill="none"
                        stroke="url(#gaugeVioletGrad)"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeDasharray="267"
                        strokeDashoffset="6"
                      />
                    </svg>
                    <div className="impact-gauge-center-text">
                      <div className="impact-gauge-pct">{solution.impactBento.cardTopRight.gaugePercent}%</div>
                      <div className="impact-gauge-sub">{solution.impactBento.cardTopRight.gaugeLabel}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Bottom Right Wide White Card with Vertical Bar Chart */}
              <div className="impact-bento-card impact-card-chart">
                <div className="impact-chart-header">
                  <div className="impact-chart-header-left">
                    <h3 className="impact-chart-title">{solution.impactBento.cardBottomWide.title}</h3>
                    <p className="impact-chart-sub">{solution.impactBento.cardBottomWide.subtitle}</p>
                  </div>
                  <div className="impact-chart-header-right">
                    <span className="impact-chart-score-val">{solution.impactBento.cardBottomWide.statValue}</span>
                    <span className="impact-chart-score-arrow">{solution.impactBento.cardBottomWide.statTrend}</span>
                  </div>
                </div>

                <div className="impact-chart-body">
                  {/* Y-Axis Labels */}
                  <div className="impact-chart-yaxis">
                    {solution.impactBento.cardBottomWide.yAxisLabels.map((lbl, yIdx) => (
                      <span key={yIdx} className="impact-yaxis-step">{lbl}</span>
                    ))}
                  </div>

                  {/* Bars Area with 7 Columns */}
                  <div className="impact-chart-bars-wrap">
                    <div className="impact-chart-bars-row">
                      {solution.impactBento.cardBottomWide.chartBars.map((bar, bIdx) => (
                        <div key={bIdx} className="impact-bar-col">
                          <div className="impact-bar-track">
                            <div
                              className="impact-bar-fill"
                              style={{ height: `${bar.height}%` }}
                              title={`${bar.label}: ${bar.value || `${bar.height}%`}`}
                            />
                          </div>
                          <span className="impact-bar-lbl">{bar.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="solution-benefits-section">
          <div className="container">
            <div className="benefits-banner">
              <SectionHeading
                eyebrow="MEASURABLE ADVANTAGE"
                title={solution.benefitsTitle}
                body={solution.benefitsDesc}
                center
              />
              <div className="solution-benefits-grid">
                {solution.benefits.map((b, idx) => (
                  <div key={idx} className="benefit-stat-card">
                    <strong>{formatText(b.metric)}</strong>
                    <span>{formatText(b.title)}</span>
                    <p>{formatText(b.desc)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Real-World Use Cases */}
      {!solution.hideUseCases && solution.useCases && solution.useCases.length > 0 && (
        <section className="solution-usecases-section">
          <div className="container">
            <SectionHeading
              eyebrow="USE CASES"
              title={solution.useCasesTitle}
              body="See how organizations in this operational segment deploy LattiumHR to overcome specific hurdles."
              center
            />
            <div className="usecases-grid">
              {solution.useCases.map((uc, idx) => (
                <div key={idx} className="usecase-card">
                  <div className="usecase-badge">Scenario {idx + 1}</div>
                  <h4>{uc.scenario}</h4>
                  <div className="usecase-block">
                    <strong>LattiumHR Approach:</strong>
                    <p>{uc.solution}</p>
                  </div>
                  <div className="usecase-block outcome">
                    <strong>Result:</strong>
                    <p>{uc.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended Modules (Hidden on pages like HR Teams as requested) */}
      {!solution.hideRecommendedModules && solution.recommendedModules && solution.recommendedModules.length > 0 && (
        <section className="solution-modules-section">
          <div className="container">
            <div className="rec-modules-box">
              <div>
                <span className="eyebrow">RECOMMENDED STACK</span>
                <h3>Key modules for this solution</h3>
                <p>Explore the specific feature modules recommended for your workflow.</p>
              </div>
              <div className="rec-modules-grid">
                {solution.recommendedModules.map((mod, idx) => (
                  <Link key={idx} to={mod.link} className="rec-module-link">
                    <div>
                      <strong>{mod.name}</strong>
                      <p>{mod.desc}</p>
                    </div>
                    <Icon name="arrow" size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Explore Solutions for Your Business / Related Solutions (Directly above Testimonials) */}
      {solution.relatedSolutions && (
        <section className="solution-related-section" id="related-solutions">
          <div className="container">
            <SectionHeading
              eyebrow={solution.relatedSolutions.eyebrow || "✦ RELATED SOLUTIONS ✦"}
              title={solution.relatedSolutions.title || "Explore Solutions for Your Business"}
              body={solution.relatedSolutions.subtitle || "Discover how LattiumHR scales across company sizes and functional departments with specialized workflows."}
              center
            />
            <div className="solution-related-grid">
              {solution.relatedSolutions.cards.map((card, cIdx) => (
                <div key={cIdx} className="solution-related-card">
                  <div className="solution-related-card-top">
                    <div className="solution-related-icon-box">
                      <Icon name={card.icon} size={22} />
                    </div>
                  </div>
                  <h3 className="solution-related-title">{card.title}</h3>
                  <p className="solution-related-desc">{card.description}</p>
                  <Link to={card.link} className="solution-related-link">
                    <span>{card.linkText || "Learn more →"}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customer Testimonials Section (Matching Home Page Structure) */}
      {solution.testimonials && solution.testimonials.length > 0 && (
        <section className="proof-section" id="customers">
          <div className="container">
            {solution.testimonialsStats && solution.testimonialsStats.length > 0 && (
              <div className="stats-row">
                {solution.testimonialsStats.map((st, sIdx) => (
                  <div key={sIdx}>
                    <strong>{st.value}</strong>
                    <span>{st.label}</span>
                  </div>
                ))}
              </div>
            )}
            <SectionHeading
              eyebrow="CUSTOMER STORIES"
              title="Loved by People Operations & HR Leaders"
              center
            />
            <div className="testimonials">
              {solution.testimonials.map((t, tIdx) => (
                <article key={tIdx}>
                  <div className="quote-mark">“</div>
                  <p>{t.quote}</p>
                  <div>
                    <span className={`customer-avatar ca${(tIdx % 3) + 1}`}>
                      {t.avatar ||
                        t.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </span>
                    <div>
                      <strong>{t.author}</strong>
                      <small>
                        {t.role}, {t.company}
                      </small>
                    </div>
                    <em>★★★★★</em>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section (Matching Home Page Structure) */}
      {solution.faqs && solution.faqs.length > 0 && (
        <section className="faq-section" id="faqs">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title={`${solution.title} FAQs`}
                body="Clear answers to common questions about employee self-service, onboarding compliance, and approval workflows."
              />
              <Link className="text-link" to="/faq">
                View all FAQs <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className="faq-list">
              {solution.faqs.map((faq, i) => (
                <div className={`faq-item ${openFaqIndex === i ? "open" : ""}`} key={faq.q}>
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}>
                    <span>{faq.q}</span>
                    <i>{openFaqIndex === i ? "−" : "+"}</i>
                  </button>
                  {openFaqIndex === i && <p>{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Footer CTA (Matching Home Page Structure) */}
      {solution.footerCta && (
        <section className="final-cta">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">{solution.footerCta.eyebrow}</span>
              <h2>{solution.footerCta.title}</h2>
              <p>{solution.footerCta.description}</p>
              <div className="final-actions">
                <Button to={solution.footerCta.primaryBtnLink || "/request-demo"}>
                  {solution.footerCta.primaryBtnText || "Book a Free Demo"} <Icon name="arrow" />
                </Button>
                {solution.footerCta.secondaryBtnText && (
                  <Button to={solution.footerCta.secondaryBtnLink || "/features"} secondary>
                    {solution.footerCta.secondaryBtnText}
                  </Button>
                )}
              </div>
              {solution.footerCta.points && (
                <div className="final-points">
                  {solution.footerCta.points.map((pt, pIdx) => (
                    <span key={pIdx}>
                      <Icon name="check" />
                      {pt}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}

export default SolutionTemplate;
