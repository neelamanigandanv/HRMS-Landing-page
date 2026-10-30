import React, { useState, useEffect, useRef } from "react";
import PageLayout from "../layout/PageLayout";
import SEO from "../layout/SEO";
import Icon, { IconName } from "../ui/Icon";
import { useDemoModal } from "../../context/DemoModalContext";
import "../../pages/Blog.css";
import "../../pages/GuideDetailPage.css";
import "../../pages/SecurityPage.css";

export interface LegalTableData {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface LegalCallout {
  title: string;
  text: string;
  icon?: IconName;
}

export interface LegalSection {
  id: string;
  number?: string;
  title: string;
  badge?: string;
  content: string[];
  bulletPoints?: string[];
  callout?: LegalCallout;
  table?: LegalTableData;
}

export interface LegalBadgePill {
  icon: IconName;
  text: string;
}

export interface LegalTemplateProps {
  title: string;
  highlightedTitle?: string;
  badge: string;
  lastUpdated: string;
  version?: string;
  summary: string;
  canonicalPath: string;
  badges?: LegalBadgePill[];
  sections: LegalSection[];
  placeholderNotice?: string;
  ctaCard?: {
    badge?: string;
    title: string;
    desc: string;
    buttonText: string;
    action?: () => void;
    leadEmail?: string;
  };
}

export function LegalTemplate({
  title,
  highlightedTitle,
  badge,
  lastUpdated,
  version = "Version 2.4 (Enterprise Directive)",
  summary,
  canonicalPath,
  badges = [],
  sections,
  placeholderNotice,
  ctaCard,
}: LegalTemplateProps) {
  const { openDemoModal } = useDemoModal();
  const [activeToc, setActiveToc] = useState<string>(sections[0]?.id || "");
  const isClickScrollingRef = useRef<boolean>(false);

  const breadcrumbs = [
    { label: "Legal", to: "/privacy-policy" },
    { label: title },
  ];

  // Scroll spy to highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const navOffset = 180;
      const tocIds = sections.map((s) => s.id);
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;

      if (windowHeight + scrollY >= documentHeight - 120 && tocIds.length > 0) {
        setActiveToc(tocIds[tocIds.length - 1]);
        return;
      }

      let currentActiveId = tocIds[0];

      for (const id of tocIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navOffset) {
            currentActiveId = id;
          }
        }
      }

      if (currentActiveId) {
        setActiveToc(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    setActiveToc(id);
    const element = document.getElementById(id);
    if (element) {
      isClickScrollingRef.current = true;
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 700);
    }
  };

  const handlePrintDocument = () => {
    window.print();
  };

  const handleCtaClick = () => {
    if (ctaCard?.action) {
      ctaCard.action();
    } else {
      openDemoModal({
        title: "Enterprise Legal & Compliance Inquiry",
        subtitle: `Connect directly with our legal affairs and InfoSec compliance counsel regarding our ${title}.`,
        defaultInterest: "Enterprise Compliance & Legal Terms",
      });
    }
  };

  // Render hero title with gradient highlight
  const renderHeroTitle = () => {
    if (highlightedTitle) {
      return (
        <>
          {title} <span className="guide-hero-title-highlight">{highlightedTitle}</span>
        </>
      );
    }
    const words = title.split(" ");
    if (words.length > 1) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(" ")} <span className="guide-hero-title-highlight">{lastWord}</span>
        </>
      );
    }
    return <span className="guide-hero-title-highlight">{title}</span>;
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA={true}>
      <SEO
        title={`${title} | LattiumHR`}
        description={summary}
        canonicalPath={canonicalPath}
      />

      <div className="guide-detail-page">
        {/* ==========================================================================
            1. HERO / BANNER (CENTERED RADIAL GRADIENT - MATCHING SECURITY PAGE)
            ========================================================================== */}
        <section className="guide-detail-hero" aria-labelledby="legal-page-title">
          <div className="guide-detail-container">
            <div className="guide-hero-centered-content">
              <span className="guide-hero-eyebrow">
                <Icon name="shield" size={13} /> {badge} • LAST UPDATED {lastUpdated.toUpperCase()}
              </span>

              <h1 id="legal-page-title" className="guide-hero-title">
                {renderHeroTitle()}
              </h1>

              <p className="guide-hero-subtitle">{summary}</p>

              {/* Authoritative Trust Badges Row */}
              {badges.length > 0 && (
                <div className="security-hero-badges-row">
                  {badges.map((b, idx) => (
                    <span key={idx} className="security-hero-badge-pill">
                      <Icon name={b.icon} size={14} /> {b.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Optional Placeholder / Regulatory Notice Alert */}
        {placeholderNotice && (
          <div className="guide-detail-container" style={{ marginTop: "24px" }}>
            <div className="guide-callout-box" style={{ margin: 0, borderLeftColor: "#7b2958" }}>
              <div className="guide-callout-title">
                <Icon name="shield" size={16} /> Statutory Compliance Notice
              </div>
              <p>{placeholderNotice}</p>
            </div>
          </div>
        )}

        {/* ==========================================================================
            2. TWO-COLUMN LAYOUT: STICKY TOC SIDEBAR (LEFT) + RICH PROSE SECTIONS (RIGHT)
            ========================================================================== */}
        <div className="guide-detail-container">
          <div className="guide-layout-grid">
            {/* Left Column: Sticky Topics, Legal Inquiry Card, and Print PDF */}
            <aside className="guide-sidebar-col" aria-label={`${title} Navigation`}>
              <div className="guide-sidebar-sticky">
                {/* 1. Topics Directory Card */}
                <div className="guide-topics-card">
                  <div className="guide-topics-header">
                    <Icon name="document" size={16} /> DOCUMENT DIRECTORY
                  </div>

                  <nav className="guide-topics-nav" aria-label={`${title} Sections`}>
                    {sections.map((sec, idx) => {
                      const num = sec.number || String(idx + 1).padStart(2, "0");
                      const cleanTitle = sec.title.replace(/^\d+\.\s*/, "");
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          className={`guide-topic-nav-item ${activeToc === sec.id ? "active" : ""}`}
                          onClick={() => scrollToSection(sec.id)}
                          aria-current={activeToc === sec.id ? "true" : undefined}
                        >
                          <span className="topic-num">{num}</span>
                          <span className="topic-text">{cleanTitle}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* 2. Legal / Compliance Counsel CTA Card */}
                <div className="guide-sidebar-cta-card">
                  <span className="sidebar-cta-badge">
                    <Icon name="award" size={12} /> {ctaCard?.badge || "LEGAL COUNSEL"}
                  </span>
                  <h4>{ctaCard?.title || "Questions Regarding Terms & Compliance?"}</h4>
                  <p>
                    {ctaCard?.desc ||
                      "Our legal affairs desk reviews enterprise master agreements, custom DPAs, and corporate non-disclosure terms within 24 hours."}
                  </p>
                  <button
                    type="button"
                    onClick={handleCtaClick}
                    className="sidebar-cta-btn"
                  >
                    {ctaCard?.buttonText || "Contact Legal Desk"} <Icon name="arrow" size={14} />
                  </button>
                  <div className="sidebar-cta-guarantee">
                    <Icon name="check" size={13} /> Strict NDA &amp; Enterprise Governance
                  </div>
                </div>

                {/* 3. Print / Save Document Card */}
                <div className="security-download-card">
                  <button
                    type="button"
                    onClick={handlePrintDocument}
                    className="security-download-btn"
                    title={`Print or Save PDF copy of ${title}`}
                  >
                    <Icon name="download" size={14} /> Print / Save Document PDF
                  </button>
                  <div className="security-direct-lead">
                    <Icon name="shield" size={12} /> Direct Desk: {ctaCard?.leadEmail || "legal@lattiumhr.com"}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: Comprehensive Legal Prose Sections */}
            <main className="guide-main-article-content">
              {sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="guide-prose-section">
                  <h2>{sec.title}</h2>

                  {sec.badge && (
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#7b2958",
                        background: "#fae8f2",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        marginBottom: "14px",
                      }}
                    >
                      {sec.badge}
                    </span>
                  )}

                  {sec.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}

                  {/* Bullet points if present */}
                  {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                    <ul style={{ margin: "14px 0 20px 0" }}>
                      {sec.bulletPoints.map((point, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: "8px", lineHeight: "1.6" }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Structured Table (e.g. Cookie Inventory or SLA breakdown) */}
                  {sec.table && (
                    <div className="pt-state-table-wrap" style={{ margin: "20px 0" }}>
                      {sec.table.caption && (
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#191735", marginBottom: "8px" }}>
                          {sec.table.caption}
                        </div>
                      )}
                      <table className="pt-state-table">
                        <thead>
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>
                                  {cIdx === 0 ? <code>{cell}</code> : cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Callout box if present */}
                  {sec.callout && (
                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name={sec.callout.icon || "shield"} size={16} /> {sec.callout.title}
                      </div>
                      <p>{sec.callout.text}</p>
                    </div>
                  )}
                </section>
              ))}
            </main>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default LegalTemplate;
