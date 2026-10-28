import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import AllGuidesSection from "../components/guides/AllGuidesSection";
import "./GuidesPage.css";

export function GuidesPage() {
  // Search query state for elevated search box
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <PageLayout hideCTA={true}>
      <SEO
        title="Knowledge Guides | LattiumHR Knowledge Hub"
        description="Comprehensive HR, Payroll, Leave, and Statutory Compliance guides crafted by industry experts to help modern businesses operate with confidence."
        canonicalPath="/guides"
      />

      <div className="guides-page">
        {/* ==========================================================================
            1. HERO SECTION (EXACT FAQ HERO SECTION AESTHETIC & ELEVATED SEARCH)
            ========================================================================== */}
        <section className="guides-hero-section">
          <div className="guides-hero-container">
            <span className="guides-eyebrow">
              <Icon name="sparkle" size={13} /> CURATED KNOWLEDGE & BEST PRACTICES
            </span>

            <h1 className="guides-hero-title">
              <span className="guides-hero-title-main">Master HR Operations &amp;</span>
              <span className="guides-hero-title-accent">Statutory Compliance</span>
            </h1>

            <p className="guides-hero-subtitle">
              Field-tested HR frameworks, salary calculation formulas, and zero-penalty audit workflows engineered for ambitious growing teams.
            </p>

            {/* Elevated Search Bar (Matching FAQ hero) */}
            <div className="guides-search-box-wrap">
              <div className="guides-search-box">
                <Icon name="search" size={20} className="guides-search-icon" />
                <input
                  type="text"
                  placeholder="Search guides, topics, compliance terms (e.g. Payroll, EPF, Leave)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search guides and playbooks"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="guides-search-clear"
                    aria-label="Clear search"
                  >
                    <Icon name="x" size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Related Action Buttons in Hero: Book a Free Demo (Primary) + Browse All Guides (Secondary) */}
            <div className="guides-hero-actions">
              <button
                type="button"
                className="guides-hero-btn-primary"
                onClick={() => {
                  window.location.href = "/request-demo";
                }}
              >
                <Icon name="arrow" size={16} /> Book a Free Demo
              </button>
              <button
                type="button"
                className="guides-hero-btn-secondary"
                onClick={() => {
                  document.getElementById("all-guides-library")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Icon name="file-text" size={16} /> Browse All Guides
              </button>
            </div>

            {/* 3 Related Keypoints Under Buttons */}
            <div className="guides-hero-keypoints">
              <span className="guides-keypoint-item">
                <Icon name="check" size={14} /> Statutory &amp; Labor Law Compliant
              </span>
              <span className="guides-keypoint-dot">•</span>
              <span className="guides-keypoint-item">
                <Icon name="check" size={14} /> Updated for FY 2025–2026 Slabs
              </span>
              <span className="guides-keypoint-dot">•</span>
              <span className="guides-keypoint-item">
                <Icon name="check" size={14} /> Step-by-Step Practical Playbooks
              </span>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            2. ALL GUIDES SECTION (PREMIUM INTERACTIVE RESOURCE LIBRARY)
            ========================================================================== */}
        <AllGuidesSection heroSearch={searchQuery} />

        {/* ==========================================================================
            3. FINAL CONVERSION CTA (MATCHING HOME PAGE THEME & STYLING)
            ========================================================================== */}
        <section className="guides-final-cta-section">
          <div className="guides-container">
            <div className="guides-final-cta-content">
              <span className="guides-final-eyebrow">READY TO SIMPLIFY HR?</span>
              <h2 className="guides-final-title">
                Your people deserve better than spreadsheets.
              </h2>
              <p className="guides-final-desc">
                Join 500+ growing businesses worldwide running HR, attendance, and payroll on LattiumHR with zero calculation errors.
              </p>

              <div className="guides-final-actions">
                <Button to="/request-demo" className="guides-final-btn-primary">
                  Book a Free Demo <Icon name="arrow" size={16} />
                </Button>
                <Button to="/contact" className="guides-final-btn-secondary">
                  Talk to a Specialist <Icon name="phone" size={16} />
                </Button>
              </div>

              <div className="guides-final-badges">
                <div className="guides-final-badge-item">
                  <Icon name="check" size={16} />
                  <span>Free personalised demo</span>
                </div>
                <div className="guides-final-badge-item">
                  <Icon name="check" size={16} />
                  <span>No credit card required</span>
                </div>
                <div className="guides-final-badge-item">
                  <Icon name="check" size={16} />
                  <span>Go live in 2–4 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default GuidesPage;
