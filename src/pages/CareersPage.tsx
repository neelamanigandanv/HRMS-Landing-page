import React, { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import {
  JOB_OPENINGS,
  CULTURE_PERKS,
  JobOpening,
} from "../data/careersData";
import JobCard from "../components/careers/JobCard";
import HiringStepper from "../components/careers/HiringStepper";
import ApplyModal from "../components/careers/ApplyModal";
import "./CareersPage.css";

export function CareersPage() {
  // Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  const handleOpenApplyModal = (job: JobOpening | null) => {
    setSelectedJobForModal(job);
    setIsApplyModalOpen(true);
  };

  const scrollToPositions = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const breadcrumbs = [
    { label: "Company", to: "/about" },
    { label: "Careers" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA>
      <SEO
        title="Careers at LattiumHR | Build the Future of Workforce Software"
        description="Join an ambitious, high-trust team building modern workforce and payroll software for thousands of growing businesses."
        canonicalPath="/careers"
      />

      <div className="careers-page-container">
        {/* ==================================================================
            1. HERO SECTION (Properly Balanced Heading)
            ================================================================== */}
        <section className="careers-hero-section" aria-labelledby="careers-hero-heading">
          <div className="container">
            <div className="careers-hero-content">
              {/* Eyebrow */}
              <div className="careers-hero-eyebrow">
                <span className="careers-sparkle">✦</span>
                <span>CAREERS AT LATTIUMHR</span>
                <span className="careers-sparkle">✦</span>
              </div>

              {/* Properly Balanced Heading with Responsive Break */}
              <h1 id="careers-hero-heading" className="careers-hero-title">
                Build Software That Makes Work Better
                <br className="careers-hero-br" />
                for <span className="careers-hero-glow">Thousands of People</span>
              </h1>

              {/* One-line description */}
              <p className="careers-hero-subtext">
                We're a high-velocity team of product creators, engineers, and customer advocates
                solving the mission-critical challenges of growing businesses.
              </p>

              {/* View Open Positions CTA */}
              <div className="careers-hero-actions">
                <Button onClick={scrollToPositions} className="careers-hero-btn-primary">
                  View Open Positions <Icon name="arrow" size={16} />
                </Button>
              </div>

              {/* Quick Culture Signals */}
              <div className="careers-hero-highlights">
                <span className="careers-highlight-pill">
                  <Icon name="check" size={14} /> High-Ownership Culture
                </span>
                <span className="careers-highlight-pill">
                  <Icon name="check" size={14} /> Competitive Fixed CTC + Equity
                </span>
                <span className="careers-highlight-pill">
                  <Icon name="check" size={14} /> Transparent 5-Step Hiring
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. WHY WORK WITH US (Cards Matching Image 2 Style)
            ================================================================== */}
        <section className="careers-why-section" id="why-work-with-us" aria-labelledby="why-heading">
          <div className="container">
            <SectionHeading
              eyebrow="✦ WHY WORK WITH US ✦"
              title="Perks Designed for Sustainable High Performance"
              body="We believe in treating talented professionals like responsible adults. Here is what you can count on as part of our team."
              center
            />

            {/* 6 Perk Cards with interactive hover icon */}
            <div className="careers-perks-grid">
              {CULTURE_PERKS.map((perk) => (
                <div key={perk.id} className="careers-perk-card">
                  {/* Circular Icon Badge: Normal Soft Tint, Dark Plum on Hover */}
                  <div className="careers-perk-solid-circle">
                    <Icon name={(perk.icon as IconName) || "sparkle"} size={28} />
                  </div>

                  {/* Centered Title */}
                  <h3 className="careers-perk-title">{perk.title}</h3>

                  {/* Centered Description */}
                  <p className="careers-perk-desc">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. HIRING PROCESS (Step-by-Step Orbital Stepper matching Image 1)
            ================================================================== */}
        <section className="careers-process-section" id="hiring-process" aria-labelledby="process-heading">
          <div className="container">
            <SectionHeading
              eyebrow="✦ TRANSPARENT EVALUATION ✦"
              title="Our Step-by-Step Hiring Process"
              body="No ghosting, no trick questions. A structured and respectful interview journey designed to help us both determine if we're a great fit."
              center
            />

            <HiringStepper />
          </div>
        </section>

        {/* ==================================================================
            4. OPEN POSITIONS (Direct Job Cards - No Filter Bar)
            ================================================================== */}
        <section className="careers-positions-section" id="open-positions" aria-labelledby="roles-heading">
          <div className="container">
            <SectionHeading
              eyebrow="✦ OPEN POSITIONS ✦"
              title="Find Your Next Career Milestone"
              body="Explore our open positions across engineering, product design, sales, support, and marketing."
              center
            />

            {/* Direct Job Opening Cards */}
            <div className="careers-jobs-list-wrapper">
              <div className="careers-jobs-grid">
                {JOB_OPENINGS.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleOpenApplyModal}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. LIFE AT COMPANY (Culture Gallery + Filled Content Box)
            ================================================================== */}
        <section className="careers-life-section" id="life-at-company" aria-labelledby="life-heading">
          <div className="container">
            <SectionHeading
              eyebrow="✦ LIFE AT LATTIUMHR ✦"
              title="Where Craft, Empathy, and Ownership Meet"
              body="A glimpse into how we collaborate, celebrate milestones, and build meaningful software every single day."
              center
            />

            <div className="careers-gallery-grid">
              <div className="careers-gallery-item large">
                <img
                  src="/images/hero-hr-working-pro.jpg"
                  alt="LattiumHR cross-functional product design sprint in conference room"
                  className="careers-gallery-img"
                  loading="lazy"
                />
                <div className="careers-gallery-overlay">
                  <strong>Cross-Functional Collaboration</strong>
                  <span>Engineers, designers, and domain specialists solving problems side by side</span>
                </div>
              </div>

              <div className="careers-gallery-item">
                <img
                  src="/images/sb-manager-workspace.jpg"
                  alt="HR operations team reviewing system architecture"
                  className="careers-gallery-img"
                  loading="lazy"
                />
                <div className="careers-gallery-overlay">
                  <strong>Deep Technical Craft</strong>
                  <span>Focusing on algorithmic precision and zero-defect payroll</span>
                </div>
              </div>

              <div className="careers-gallery-item">
                <img
                  src="/images/sb-employee-workspace.jpg"
                  alt="Team member comfortably working on product interface"
                  className="careers-gallery-img"
                  loading="lazy"
                />
                <div className="careers-gallery-overlay">
                  <strong>Focus Time & Flow</strong>
                  <span>Distraction-free environments designed for deep work</span>
                </div>
              </div>

              {/* Rich Culture & Operating Ethic Content Box (Fills 2-Column Space in Row 2 Right Side) */}
              <div className="careers-gallery-item careers-culture-callout-card">
                <div className="careers-culture-callout-inner">
                  <div className="careers-culture-callout-header">
                    <span className="careers-culture-tag">
                      <Icon name="sparkle" size={13} /> HIGH TRUST &amp; FREEDOM
                    </span>
                    <span className="careers-culture-motto">Our Ways of Working</span>
                  </div>

                  <blockquote className="careers-culture-quote">
                    &ldquo;We hire responsible adults and trust them with full ownership. You own the problem, determine the solution, and ship software with pride.&rdquo;
                  </blockquote>

                  <div className="careers-culture-pillars-row">
                    <div className="careers-pillar-pill">
                      <strong>01. Outcomes Over Hours</strong>
                      <p>We evaluate shipped product impact, never artificial seat-time.</p>
                    </div>

                    <div className="careers-pillar-pill">
                      <strong>02. Radical Candor</strong>
                      <p>Transparent, ego-free feedback where the best idea always wins.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="careers-gallery-item wide">
                <img
                  src="/images/hero-employee-directory-team.jpg"
                  alt="LattiumHR team celebration after shipping a major product release"
                  className="careers-gallery-img"
                  loading="lazy"
                />
                <div className="careers-gallery-overlay">
                  <strong>Celebrating Collective Milestones</strong>
                  <span>Recognizing impact and having fun as an ambitious team</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Reusable Application Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={selectedJobForModal}
      />
    </PageLayout>
  );
}

export default CareersPage;
