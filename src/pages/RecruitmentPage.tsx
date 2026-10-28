import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useDemoModal } from "../context/DemoModalContext";
import "./RecruitmentPage.css";

export function RecruitmentPage() {
  const { openDemoModal } = useDemoModal();

  // State for interactive elements
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeWorkflowCard, setActiveWorkflowCard] = useState<number>(0);
  const [activeConnectedCard, setActiveConnectedCard] = useState<number | null>(null);

  const handleOpenDemo = () => {
    openDemoModal({
      title: "Request a Recruitment Demo",
      subtitle:
        "See how LattiumHR helps teams organize candidate information, track hiring stages, and simplify every hire.",
      defaultInterest: "Recruitment Management",
    });
  };

  // Connected HR Modules (How It Works Together Section)
  const connectedModules = [
    {
      number: "01",
      title: "Employee Management",
      icon: <Icon name="employee" size={30} />,
      description:
        "Selected candidates convert directly into employee master profiles, preserving identity records, resume history, and designations.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      title: "Attendance Management",
      icon: <Icon name="attendance" size={30} />,
      description:
        "Once onboarded, new hires are automatically assigned work shifts, biometric device permissions, or geofenced clock-in profiles.",
      link: "/features/attendance-management",
    },
    {
      number: "03",
      title: "Leave Management",
      icon: <Icon name="leave" size={30} />,
      description:
        "Automatic allotment of probationary leave entitlements, company holiday calendars, and department approval manager mappings.",
      link: "/features/leave-management",
    },
    {
      number: "04",
      title: "Payroll Management",
      icon: <Icon name="payroll" size={30} />,
      description:
        "Agreed salary compensation and statutory tax details flow seamlessly into monthly payroll preparation without re-entry.",
      link: "/features/payroll-management",
    },
  ];

  // 3 Core Capability Blocks (Matching Flagship Reference Layout)
  const capabilityBlocks = [
    {
      id: "requisition-sourcing",
      badge: "01 Requisition & Sourcing",
      eyebrow: "✦ 01. REQUISITION & SOURCING ✦",
      image: "/images/recruitment-block-sourcing.jpg",
      imageAlt: "Candidate Profile Record UI showing verified candidate details, resume attachment, and skills tags",
      title: "Structured Job Openings & Unified Candidate Records",
      description:
        "Create standardized job openings across departments and centralize all applicant profiles in one structured cloud workspace. Store resumes, portfolios, salary expectations, and candidate notes in one place.",
      bullets: [
        "Standardized job opening requisitions with role requirements and salary bands",
        "Centralized candidate profiles storing resumes, contact info, and portfolio links",
        "Tag-based candidate filtering by primary skills, experience level, and location",
        "Granular access permissions keeping candidate compensation notes confidential",
        "Automatic applicant source attribution across careers page, referrals, and boards",
        "Instant search-as-you-type candidate database across all active and archived roles",
      ],
      callout: {
        role: "Head of Talent Acquisition",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Digital Profiles" },
        { value: "128+", label: "Active Pool" },
        { value: "< 2 Mins", label: "Application Log" },
        { value: "0", label: "Lost Resumes" },
      ],
    },
    {
      id: "pipeline-tracking",
      badge: "02 Pipeline & Stages",
      eyebrow: "✦ 02. PIPELINE & STAGES ✦",
      image: "/images/recruitment-block-pipeline.jpg",
      imageAlt: "Recruitment Pipeline Stages UI showing candidate progression, reviewer scorecards, and hiring status",
      title: "Visual Pipeline Tracking Across Every Hiring Stage",
      description:
        "Track candidates visually from initial application to final selection. Move applicants smoothly between screening, technical rounds, and leadership interviews with full visibility into current hiring progress.",
      bullets: [
        "Visual drag-and-drop hiring pipeline with configurable stage columns",
        "Real-time candidate stage status tags: Screening, Technical, Culture, or Offer",
        "Automated candidate milestone updates and interviewer notification alerts",
        "Panel interview scheduling with calendar sync across department leads",
        "Candidate progress history capturing every stage transition and reviewer note",
        "Requisition health indicators highlighting stage bottlenecks and delayed reviews",
      ],
      callout: {
        role: "Recruiting Operations Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "5", label: "Custom Stages" },
        { value: "100%", label: "Stage Visibility" },
        { value: "< 24h", label: "Feedback Loop" },
        { value: "0%", label: "Pipeline Dropoffs" },
      ],
    },
    {
      id: "interview-selection",
      badge: "03 Interview & Selection",
      eyebrow: "✦ 03. INTERVIEW & SELECTION ✦",
      image: "/images/recruitment-block-offer.jpg",
      imageAlt: "Candidate Selection and Digital Offer Letter UI showing compensation details and onboarding convert button",
      title: "Structured Interview Scorecards & Seamless Offer Generation",
      description:
        "Equip interview panels with objective evaluation criteria and scorecards. Consolidate hiring manager feedback, make confident candidate selection decisions, and roll out digital offer letters in minutes.",
      bullets: [
        "Standardized interview evaluation rubrics and scorecard rating matrices",
        "Centralized feedback aggregation compiling multiple panel assessments",
        "Documented candidate selection records providing transparent audit trails",
        "Branded digital offer letter generation with compensation and designation details",
        "Mobile-friendly digital offer acceptance with legally binding e-acknowledgment",
        "1-Click candidate-to-employee profile handoff into the employee directory",
      ],
      callout: {
        role: "People & Talent Director",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "4.9/5", label: "Candidate Rating" },
        { value: "100%", label: "Scorecard Sync" },
        { value: "1-Click", label: "Offer Creation" },
        { value: "Instant", label: "Employee Sync" },
      ],
    },
  ];

  // 3-Step Work Process (Recruitment Workflow Section)
  const workflowSteps = [
    {
      number: "01",
      title: "Open Position & Collect Applications",
      description:
        "Open standardized job requisitions, define core role parameters, and gather incoming applicant resumes into a centralized, searchable talent repository.",
      icon: <Icon name="briefcase" size={30} />,
    },
    {
      number: "02",
      title: "Screen & Coordinate Interviews",
      description:
        "Shortlist qualified profiles, coordinate multi-stage interview panels, and collect standardized scorecard evaluations without messy email chains.",
      icon: <Icon name="users" size={30} />,
    },
    {
      number: "03",
      title: "Select & Onboard New Hire",
      description:
        "Review consolidated panel assessments, document the selection decision, roll out digital offer letters, and transition the candidate into employee onboarding.",
      icon: <Icon name="award" size={30} />,
    },
  ];

  // FAQ data (Recruitment Management FAQs)
  const faqs = [
    {
      q: "What is recruitment management software?",
      a: "Recruitment management software is a centralized platform designed to organize and streamline the hiring process—from opening job requisitions and tracking candidate applications to coordinating interview panels, collecting feedback, and issuing offer letters.",
    },
    {
      q: "How does candidate tracking work in LattiumHR?",
      a: "LattiumHR provides a visual, stage-by-stage candidate pipeline. Recruiters and hiring managers can track applicant records, review attached resumes, update hiring stages (Screening, Technical, Culture Fit, Offer), and add evaluation notes in real time.",
    },
    {
      q: "Can multiple interviewers submit feedback and scorecards?",
      a: "Yes. Interview panel members receive dedicated review links where they can evaluate candidates against standardized criteria, assign numerical ratings, and submit written feedback. All ratings are consolidated into the candidate's master record.",
    },
    {
      q: "Can we customize the hiring stages for different roles?",
      a: "Yes. You can configure hiring pipelines tailored to specific departments or job designations—whether you require a quick two-step screening for operational staff or a four-stage panel process for senior engineering roles.",
    },
    {
      q: "How does a selected candidate transition to employee management?",
      a: "With a single click, a selected candidate who accepts their offer is converted into an active employee master profile. Their contact info, resume documents, job title, and compensation terms automatically populate into the Employee Management directory.",
    },
    {
      q: "Can we manage multiple job vacancies across different branches?",
      a: "Yes. LattiumHR supports multi-branch workforce management. You can open, manage, and track vacancies across regional offices, satellite branches, and headquarters while keeping one unified view for leadership.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper rec-page-wrapper">
      <SEO
        title="Recruitment Management Software — Candidate Pipeline & Hiring | LattiumHR"
        description="Organize your hiring activities, manage candidate information, and gain better visibility into your recruitment process with LattiumHR."
        canonicalPath="/features/recruitment"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Dark Spotlight Stage + Open Floating 3-Card Showcase)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="rec-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Lattium Recruitment">
              <span>✦ LATTIUM RECRUITMENT ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="rec-hero-title" className="emp-hero-rich-title">
              Find the <span className="emp-glow-text">Right Talent.</span>
              <br className="emp-hero-br" />
              Simplify Every Hire.
            </h1>
            <p className="emp-hero-rich-subhead">
              Organize your hiring activities, manage candidate information, and gain better visibility into your recruitment process.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-pill-btn-primary"
                onClick={handleOpenDemo}
              >
                Request a Demo <Icon name="arrow" size={15} />
              </button>
              <button
                type="button"
                className="emp-pill-btn-secondary"
                onClick={() => {
                  const el = document.getElementById("challenges");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Explore Features
              </button>
            </div>

            {/* Trust Points Row */}
            <div className="emp-hero-trust-row">
              <span>
                <Icon name="check" size={13} /> No credit card required
              </span>
              <span>
                <Icon name="check" size={13} /> Visual hiring pipeline
              </span>
              <span>
                <Icon name="check" size={13} /> Seamless employee onboarding handoff
              </span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE STAGE */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Candidate Pipeline Breakdown Donut Chart */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Pipeline Breakdown</h3>
                    <span className="emp-float-widget-sub">Candidates by Stage</span>
                  </div>
                  <span className="emp-float-widget-badge">
                    <span className="rec-live-pulse-dot" /> Live
                  </span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#F6F8F8" strokeWidth="18" fill="none" />
                    {/* Sourced & Applied 44% (Emerald #10b981) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="68"
                      stroke="#10b981"
                      strokeWidth="18"
                      fill="none"
                      strokeDasharray="427"
                      strokeDashoffset="239"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Active Interviews 36% (Plum #004B49) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="68"
                      stroke="#004B49"
                      strokeWidth="18"
                      fill="none"
                      strokeDasharray="427"
                      strokeDashoffset="273"
                      strokeLinecap="round"
                      transform="rotate(68 90 90)"
                    />
                    {/* Offer Extended 20% (Violet #004B49) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="68"
                      stroke="#004B49"
                      strokeWidth="18"
                      fill="none"
                      strokeDasharray="427"
                      strokeDashoffset="341"
                      strokeLinecap="round"
                      transform="rotate(198 90 90)"
                    />
                    {/* Center Info */}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">
                      Active Pool
                    </text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">
                      128
                    </text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-mint" />
                    <span>Applied (44%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-plum" />
                    <span>Interviews (36%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-violet" />
                    <span>Offers (20%)</span>
                  </div>
                </div>
              </div>

              {/* Center Main Card: Real Recruitment Dashboard Showcase */}
              <div className="emp-hero-center-photo-card">
                <img
                  src="/images/recruitment-hero-showcase.jpg"
                  alt="Recruitment talent acquisition pipeline dashboard showing candidate profiles and hiring stages"
                  className="emp-hero-center-img"
                  loading="eager"
                  width="600"
                  height="380"
                />

                {/* Top-Left Floating Live Status Pill */}
                <div className="emp-photo-status-pill">
                  <span className="emp-live-pulse" />
                  <span>Hiring Pipeline Active</span>
                </div>

                {/* Bottom Profile / Candidate Tag */}
                <div className="emp-photo-profile-tag">
                  <div className="emp-photo-profile-avatar">
                    <Icon name="role" size={18} />
                  </div>
                  <div className="emp-photo-profile-text">
                    <strong>Elena Ivanova • Lead UI/UX Designer</strong>
                    <span>Scorecard: 4.8/5 • Offer Extended & Ready</span>
                  </div>
                </div>
              </div>

              {/* Right Widget: Hiring Velocity & Time to Hire SLA */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Hiring Velocity</h3>
                    <span className="emp-float-widget-sub">Time-to-Hire Efficiency</span>
                  </div>
                  <span className="emp-float-widget-pill-green">18 Days</span>
                </div>

                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">128</strong>
                  <div className="emp-stat-meta">
                    <span>Active Candidates Evaluated</span>
                    <small>0 Lost Resumes • 100% Tracked</small>
                  </div>
                </div>

                {/* Modern Bar Chart */}
                <div className="emp-mini-bar-chart">
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "65%" }} />
                    <span className="emp-bar-lbl">M</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "82%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "94%" }} />
                    <span className="emp-bar-lbl">W</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "88%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col is-active">
                    <div className="emp-bar-fill" style={{ height: "98%" }} />
                    <span className="emp-bar-lbl">F</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "45%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                </div>

                {/* Bottom Verified Footnote */}
                <div className="emp-widget-footnote">
                  <Icon name="check" size={14} />
                  <span>Instant Handoff to Employee Onboarding</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. RECRUITMENT CHALLENGES SECTION (The Challenge)
            ========================================================================= */}
        <section className="emp-section emp-problem-section" id="challenges">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ RECRUITMENT CHALLENGES ✦</span>
              <h2 className="emp-section-title">
                Hiring Shouldn't Feel Like a Puzzle.
              </h2>
              <p className="emp-section-subhead">
                When candidate tracking relies on scattered spreadsheets, lost resumes in email inboxes, and uncoordinated interview panels, finding and hiring the right talent becomes slow and frustrating.
              </p>
            </div>

            <div className="emp-problem-grid">
              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <Icon name="document" size={32} />
                </div>
                <h3 className="emp-problem-title">
                  Scattered Resumes &<br />
                  Lost Candidate Info
                </h3>
                <p className="emp-problem-desc">
                  Applicant resumes get buried in personal email inboxes and unorganized folders. Without a centralized talent record, HR teams lose track of qualified candidates and waste valuable sourcing spend.
                </p>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <Icon name="clock" size={32} />
                </div>
                <h3 className="emp-problem-title">
                  Unclear Hiring Progress &<br />
                  Stage Bottlenecks
                </h3>
                <p className="emp-problem-desc">
                  Hiring managers and department heads struggle to see who is waiting for screening feedback, which stage candidates are in, or why open positions remain unfilled for months.
                </p>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <Icon name="users" size={32} />
                </div>
                <h3 className="emp-problem-title">
                  Complicated Coordination &<br />
                  Multiple Vacancies
                </h3>
                <p className="emp-problem-desc">
                  Juggling multi-round interview calendars, chasing panel scorecard feedback, and managing multiple job openings across branches without structured stages leads to dropped talent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. RECRUITMENT CAPABILITIES SECTION (3 Reference Blocks)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="capabilities">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ RECRUITMENT CAPABILITIES ✦</span>
              <h2 className="emp-section-title">
                Everything You Need to Organize Your Hiring.
              </h2>
              <p className="emp-section-subhead">
                From opening a requisition to rolling out offer letters, LattiumHR centralizes candidate profiles, evaluation scorecards, and hiring-stage tracking.
              </p>
            </div>
          </div>

          {/* 3 Full Blocks: Each with distinct background tint, top deck & bottom stats deck */}
          <div className="emp-capability-blocks-list">
            {capabilityBlocks.map((blk, idx) => (
              <div key={blk.id} className={`emp-cap-block-wrapper emp-cap-bg-${idx}`}>
                <div className="container">
                  <article id={`cap-block-${blk.id}`} className="emp-reference-block-card">
                    {/* Top Deck: 2 Columns (Left Image + Right Content) */}
                    <div className="emp-block-top-deck">
                      {/* Left Column: Vertical Image */}
                      <div className="emp-block-img-col">
                        <img
                          src={blk.image}
                          alt={blk.imageAlt}
                          className="emp-block-hero-img"
                          loading={idx === 0 ? "eager" : "lazy"}
                          width="580"
                          height="440"
                        />
                      </div>

                      {/* Right Column: Eyebrow, Title, Subtitle, 2-Col Checklist, Callout */}
                      <div className="emp-block-content-col">
                        <span className="emp-block-eyebrow">{blk.eyebrow}</span>
                        <h3 className="emp-block-title">{blk.title}</h3>
                        <p className="emp-block-desc">{blk.description}</p>

                        {/* 2-Column Checklist (6 Items) */}
                        <div className="emp-block-checklist-grid">
                          {blk.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="emp-block-check-item">
                              <span className="emp-block-check-badge" aria-hidden="true">
                                ✓
                              </span>
                              <span className="emp-block-check-text">{bullet}</span>
                            </div>
                          ))}
                        </div>

                        <div className="emp-block-action-row">
                          <button
                            type="button"
                            className="emp-block-callout-btn"
                            onClick={() =>
                              openDemoModal({
                                title: `Explore ${blk.title}`,
                                subtitle: blk.description,
                                defaultInterest: "Recruitment Management",
                              })
                            }
                          >
                            Book a Demo <Icon name="arrow" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Deck: 4 Compact Stats Cards */}
                    <div className="emp-block-bottom-deck">
                      <div className="emp-block-stats-grid">
                        {blk.stats.map((st, sIdx) => (
                          <div key={sIdx} className="emp-block-stat-box">
                            <strong className="emp-block-stat-val">{st.value}</strong>
                            <span className="emp-block-stat-lbl">{st.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>

                {/* Subtle Centered Divider Line between Blocks */}
                {idx < capabilityBlocks.length - 1 && (
                  <div className="emp-block-divider-line" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. RECRUITMENT WORKFLOW SECTION (From Job Opening to the Right Candidate)
            ========================================================================= */}
        <section className="emp-process-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="container">
            <div className="emp-process-header">
              <span className="emp-process-eyebrow">✦ RECRUITMENT WORKFLOW ✦</span>
              <h2 id="workflow-heading" className="emp-process-title">
                From Job Opening to the Right Candidate.
              </h2>
              <p className="emp-process-subhead">
                The hiring journey from opening a position and receiving applications to screening, interviewing, and selecting top talent.
              </p>
            </div>

            {/* 3 Process Cards with Semicircle Number Notch */}
            <div className="emp-process-grid">
              {workflowSteps.map((step, idx) => {
                const isActive = activeWorkflowCard === idx;
                return (
                  <div
                    key={step.number}
                    className={`emp-process-card ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveWorkflowCard(idx)}
                    onClick={() => setActiveWorkflowCard(idx)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                  >
                    {/* Top Notch Semicircle with Number */}
                    <div className="emp-process-notch">
                      <span className="emp-process-notch-num">{step.number}</span>
                    </div>

                    {/* Centered Icon Box */}
                    <div className="emp-process-icon-box">{step.icon}</div>

                    {/* Card Title & Description */}
                    <h3 className="emp-process-card-title">{step.title}</h3>
                    <p className="emp-process-card-desc">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WHY LATTIUMHR FOR RECRUITMENT SECTION (Bring More Clarity to Every Hiring Decision)
            ========================================================================= */}
        <section className="emp-why-choose-section" aria-labelledby="why-recruitment-heading">
          <div className="container">
            {/* Centered Section Header */}
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY LATTIUMHR FOR RECRUITMENT ✦</span>
              <h2 id="why-recruitment-heading" className="emp-section-title">
                Bring More Clarity to Every Hiring Decision.
              </h2>
              <p className="emp-section-subhead">
                A structured recruitment process helps teams organize candidate information, understand hiring progress, and coordinate recruitment activities more clearly.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: 1 Big Card with Scenic Background */}
              <div className="emp-why-big-card rec-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">✦ TOTAL HIRING CLARITY ✦</span>
                  </div>

                  {/* Floating Metric Card 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Candidate Pipeline Visibility</small>
                        <strong>100% Tracked Stages</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Dropped Applicants</span>
                  </div>

                  {/* Floating Metric Card 2 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="award" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Average Time to Hire</small>
                        <strong>18 Days Turnaround</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">40% Faster Hires</span>
                  </div>
                </div>

                {/* Bottom Narrative Copy */}
                <p className="emp-big-card-bottom-text">
                  Uncoordinated hiring processes cost growing organizations top talent and create operational friction. LattiumHR centralizes candidate information, interviewer scorecards, and hiring progress so business owners and HR teams make confident, informed hiring choices.
                </p>
              </div>

              {/* Right Column: 4 Small Cards */}
              <div className="emp-why-small-grid">
                {/* Card 01 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="document" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Zero Resume Chaos</h3>
                  <p className="emp-why-card-desc">
                    Every applicant record, resume PDF, and evaluation note is searchable in one cloud repository instead of scattered email threads.
                  </p>
                </div>

                {/* Card 02 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="users" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Collaborative Panel Reviews</h3>
                  <p className="emp-why-card-desc">
                    Standardized scorecards ensure hiring managers and interviewers evaluate candidates on consistent, objective criteria.
                  </p>
                </div>

                {/* Card 03 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="clock" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Real-Time Progress Tracking</h3>
                  <p className="emp-why-card-desc">
                    Keep leadership and recruiters informed on time-to-hire, stage bottlenecks, and open vacancy statuses across all branches.
                  </p>
                </div>

                {/* Card 04 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="employee" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Smooth Day-One Handoff</h3>
                  <p className="emp-why-card-desc">
                    Selected candidate records instantly transition to employee onboarding checklists without retyping details or uploading duplicates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. MIDDLE CTA SECTION (Immediately after Why LattiumHR section)
            ========================================================================= */}
        <section className="rec-middle-cta-section" aria-labelledby="mid-cta-heading">
          <div className="container">
            <div className="rec-middle-cta-card">
              <div className="rec-middle-cta-glow" aria-hidden="true" />
              <div className="rec-middle-cta-content">
                <span className="rec-cta-eyebrow-pill">✦ TAKE THE NEXT STEP ✦</span>
                <h2 id="mid-cta-heading" className="rec-middle-cta-title">
                  Make Your Hiring Process More Organized.
                </h2>
                <p className="rec-middle-cta-subhead">
                  Discover how LattiumHR can help your team bring more structure and clarity to recruitment.
                </p>
                <div className="rec-middle-cta-actions">
                  <button
                    type="button"
                    className="rec-btn-cta-white"
                    onClick={handleOpenDemo}
                  >
                    Request a Demo <Icon name="arrow" size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. HOW IT WORKS TOGETHER SECTION (Connect Recruitment With Your Workforce)
            ========================================================================= */}
        <section className="emp-section emp-connected-section" aria-labelledby="connected-heading">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ HOW IT WORKS TOGETHER ✦</span>
              <h2 id="connected-heading" className="emp-section-title">
                Connect Recruitment With Your Workforce.
              </h2>
              <p className="emp-section-subhead">
                Create a clearer transition from selecting the right candidate to managing them as part of your workforce.
              </p>
            </div>

            {/* 4 Connected Module Cards - Matching Work Process Card Design */}
            <div
              className="emp-process-grid emp-connected-grid"
              onMouseLeave={() => setActiveConnectedCard(null)}
            >
              {connectedModules.map((mod, idx) => {
                const isActive = activeConnectedCard === idx;
                return (
                  <Link
                    to={mod.link}
                    key={mod.number}
                    className={`emp-process-card emp-connected-card ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveConnectedCard(idx)}
                    onClick={() => setActiveConnectedCard(idx)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                  >
                    {/* Top Notch with Step / Module Number */}
                    <div className="emp-process-notch" aria-label={`Module ${mod.number}`}>
                      {isActive ? (
                        <span className="emp-process-notch-pill">{mod.number}</span>
                      ) : (
                        <span className="emp-process-notch-num">{mod.number}</span>
                      )}
                    </div>

                    {/* Centered Rounded Icon Box */}
                    <div className="emp-process-icon-box" aria-hidden="true">
                      {mod.icon}
                    </div>

                    {/* Step Title */}
                    <h3 className="emp-process-card-title">{mod.title}</h3>

                    {/* Step Description */}
                    <p className="emp-process-card-desc">{mod.description}</p>

                    {/* Bottom Action Hint */}
                    <div className="emp-connected-explore-pill">
                      <span>Explore Module</span>
                      <Icon name="arrow" size={12} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FAQ SECTION (Recruitment Management FAQs)
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs" aria-labelledby="faq-heading">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title="Recruitment Management FAQs."
                body="Common questions about recruitment software, candidate tracking, interview scorecards, and the transition into employee management."
              />
              <Link className="text-link" to="/faq">
                View all FAQs <Icon name="arrow" size={17} />
              </Link>
            </div>

            <div className="faq-list">
              {faqs.map((f, i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{f.q}</span>
                    <i aria-hidden="true">{openFaq === i ? "−" : "+"}</i>
                  </button>
                  {openFaq === i && <p>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. FINAL CTA SECTION (Ready to Improve Your Hiring Process?)
            ========================================================================= */}
        <section className="final-cta" aria-labelledby="final-cta-heading">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">✦ READY TO HIRE SMARTER? ✦</span>
              <h2 id="final-cta-heading">Ready to Improve Your Hiring Process?</h2>
              <p>
                Discover a more organized way to manage your recruitment activities.
              </p>
              <div className="final-actions">
                <Button onClick={handleOpenDemo}>
                  Request a Demo <Icon name="arrow" />
                </Button>
                <Button to="/contact" secondary>
                  Contact Our Team
                </Button>
              </div>
              <div className="final-points">
                <span>
                  <Icon name="check" /> Free personalized 30-min walkthrough
                </span>
                <span>
                  <Icon name="check" /> No credit card required
                </span>
                <span>
                  <Icon name="check" /> Ready to go live in 2 weeks
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Website's Existing Footer */}
      <Footer />
    </div>
  );
}

export default RecruitmentPage;
