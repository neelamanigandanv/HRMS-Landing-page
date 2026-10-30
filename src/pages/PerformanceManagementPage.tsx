import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FooterCTA from "../components/common/FooterCTA";
import SEO from "../components/layout/SEO";
import Icon, { IconName } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { useDemoModal } from "../context/DemoModalContext";
import "./PerformanceManagementPage.css";

export function PerformanceManagementPage() {
  const { openDemoModal } = useDemoModal();

  // Interactive States
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeWorkflowCard, setActiveWorkflowCard] = useState<number>(0);
  const [activeConnectedCard, setActiveConnectedCard] = useState<number | null>(null);

  const handleOpenDemo = () => {
    openDemoModal({
      title: "Request a Performance Management Demo",
      subtitle:
        "See how LattiumHR helps teams set clear goals, conduct fair reviews, and nurture employee development.",
      defaultInterest: "Performance Management",
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 1. Performance Challenges Cards
  const challenges = [
    {
      id: "unclear-goals",
      title: "Unclear Employee Goals",
      desc: "Employees work without explicit alignment to organization objectives. Ambiguous targets set once a year and forgotten leave team members unsure of daily priorities.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
      ),
    },
    {
      id: "inconsistent-reviews",
      title: "Inconsistent Reviews",
      desc: "Annual appraisals rely on vague memory and subjective criteria. Recency bias distorts evaluation, leaving hardworking contributors feeling misunderstood and undervalued.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "scattered-feedback",
      title: "Scattered Feedback",
      desc: "Valuable coaching notes and 1-on-1 discussions get lost across informal chat messages and forgotten emails without any structured repository or action items.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="9" y1="10" x2="15" y2="10" />
        </svg>
      ),
    },
    {
      id: "limited-visibility",
      title: "Limited Visibility Into Progress",
      desc: "HR leaders and managers lack continuous insight into team competencies, top performers, and skill gaps, making succession planning and promotions guesswork.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  // 2. Three Flagship Capability Blocks
  const capabilityBlocks = [
    {
      id: "goals-tracking",
      badge: "01 Goals & OKRs",
      eyebrow: "✦ 01. GOAL & OBJECTIVE TRACKING ✦",
      image: "/images/perf-block-goals.jpg",
      imageAlt: "Managers setting organizational goals, key performance indicators, and quarterly OKRs on digital tablet",
      title: "Transparent Goal Setting & Continuous Objective Tracking",
      description:
        "Connect individual responsibilities with broader company objectives. Define measurable OKRs, set weighted milestones, and empower employees to record progress in real time with complete visibility.",
      bullets: [
        "Cascade company strategic goals into department and individual targets",
        "Configurable measurement metrics (percentage, numerical milestones, currency)",
        "Self-service goal progress updates with instant manager notifications",
        "Real-time visual progress bars keeping everyday priorities aligned",
        "Tag goals by core competencies, project deliverables, or business quarters",
        "Audit-logged goal history ensuring expectations remain unambiguous",
      ],
      callout: {
        role: "Head of Talent Development",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Goal Alignment" },
        { value: "4.8x", label: "Higher Completion" },
        { value: "Real-Time", label: "Progress Updates" },
        { value: "0%", label: "Ambiguity Score" },
      ],
    },
    {
      id: "reviews-feedback",
      badge: "02 Reviews & Feedback",
      eyebrow: "✦ 02. STRUCTURED PERFORMANCE REVIEWS ✦",
      image: "/images/perf-block-reviews.jpg",
      imageAlt: "HR manager conducting a structured employee performance appraisal and sharing constructive feedback",
      title: "Objective Performance Reviews & Continuous Manager Feedback",
      description:
        "Replace rushed annual evaluations with structured, consistent review cycles. Facilitate self-assessments, multi-tiered manager evaluations, and continuous 1-on-1 check-ins with clear scoring rubrics.",
      bullets: [
        "Flexible review cadences: quarterly, semi-annual, or annual appraisal cycles",
        "Balanced evaluation forms combining rating matrices and qualitative remarks",
        "Documented 1-on-1 check-in logs with shared action plans and private notes",
        "Built-in bell curve normalization and calibration tools for HR admins",
        "Multi-level approval workflows before final ratings are published",
        "Automated deadline notifications and reminders for reviewers",
      ],
      callout: {
        role: "People Operations Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "98%", label: "On-Time Reviews" },
        { value: "360°", label: "Feedback Ready" },
        { value: "100%", label: "Review Transparency" },
        { value: "0", label: "Recency Bias" },
      ],
    },
    {
      id: "development-records",
      badge: "03 Development & Records",
      eyebrow: "✦ 03. DEVELOPMENT & REVIEW HISTORY ✦",
      image: "/images/perf-block-development.jpg",
      imageAlt: "Team leader and employee reviewing an individual development roadmap and career progression milestones",
      title: "Performance Progress Monitoring & Employee Development Planning",
      description:
        "Turn performance evaluation into long-term career growth. Build individual development plans (IDPs), track competency milestones, and preserve a permanent historical record of every review cycle.",
      bullets: [
        "Individual Development Plans (IDPs) tailored to review findings and career goals",
        "Comprehensive historical review archive stored under each employee's profile",
        "Skill gap analysis to guide internal mentorship and training opportunities",
        "Direct connection to promotional nominations and annual salary revisions",
        "Department-level performance distribution dashboards for executive visibility",
        "Exportable PDF appraisal scorecards and cycle completion summaries",
      ],
      callout: {
        role: "VP of Human Resources",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Records Preserved" },
        { value: "Personalized", label: "Growth Roadmaps" },
        { value: "Instant", label: "Audit Readiness" },
        { value: "Zero", label: "Data Loss" },
      ],
    },
  ];

  // 3. Six Performance Capabilities Matrix
  const capabilitiesMatrix = [
    {
      title: "Goal & Objective Tracking",
      desc: "Establish clear OKRs, define quantifiable targets, and monitor milestones across teams in real time.",
      badge: "Supported Feature",
      icon: <Icon name="chart" size={24} />,
    },
    {
      title: "Employee Performance Reviews",
      desc: "Execute structured appraisal cycles with self-reviews, manager assessments, and objective scoring rubrics.",
      badge: "Supported Feature",
      icon: <Icon name="award" size={24} />,
    },
    {
      title: "Manager Feedback",
      desc: "Capture continuous 1-on-1 check-in notes, constructive guidance, and shared development action points.",
      badge: "Supported Feature",
      icon: <Icon name="chat" size={24} />,
    },
    {
      title: "Performance Progress Monitoring",
      desc: "Gain real-time visibility into goal status, cycle completion rates, and department performance metrics.",
      badge: "Supported Feature",
      icon: <Icon name="reports" size={24} />,
    },
    {
      title: "Employee Development Planning",
      desc: "Transform appraisal insights into individual development plans (IDPs), skill roadmaps, and mentoring.",
      badge: "Supported Feature",
      icon: <Icon name="growth" size={24} />,
    },
    {
      title: "Review History & Records",
      desc: "Maintain a secure, permanent audit archive of past appraisals, ratings, and promotion nominations.",
      badge: "Supported Feature",
      icon: <Icon name="document" size={24} />,
    },
  ];

  // 4. Performance Review Workflow (5 Steps required by user)
  const workflowSteps = [
    {
      number: "01",
      title: "Set Goals",
      description: "Define measurable OKRs, core competency targets, and time-bound milestones aligned with company goals.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Monitor Progress",
      description: "Employees update completion status while managers track real-time trajectory and remove blockers.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Review Performance",
      description: "Conduct standardized self-assessments and multi-tiered manager evaluations with objective scoring criteria.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Share Feedback",
      description: "Hold focused 1-on-1 review conversations, acknowledge wins, and document constructive next steps.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" />
          <circle cx="12" cy="10" r="1" />
          <circle cx="15" cy="10" r="1" />
        </svg>
      ),
    },
    {
      number: "05",
      title: "Plan Improvement",
      description: "Formulate Individual Development Plans (IDPs), schedule skills training, and prepare for promotion paths.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
    },
  ];

  // 5. Connected System Modules (How It Works Together)
  const connectedModules = [
    {
      number: "01",
      role: "Core Platform",
      title: "Employee Management",
      icon: <Icon name="employee" size={28} />,
      description:
        "Centralized employee records, job roles, and visual org reporting hierarchies automatically dictate review assignments and approver chains.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      role: "Leadership Layer",
      title: "Manager Responsibilities",
      icon: <Icon name="role" size={28} />,
      description:
        "Managers run structured 1-on-1 check-ins, record progress notes, evaluate competencies, and recommend direct reports for promotion.",
      link: "/features/employee-management",
    },
    {
      number: "03",
      role: "People Operations",
      title: "HR Oversight & Governance",
      icon: <Icon name="shield" size={28} />,
      description:
        "HR administrators configure appraisal schedules, calibrate rating distributions with bell curves, and maintain audit-ready review files.",
      link: "/features/roles-permissions",
    },
    {
      number: "04",
      role: "Financial Impact",
      title: "Payroll & Compensation",
      icon: <Icon name="payroll" size={28} />,
      description:
        "Approved appraisal scores directly drive annual salary increments, performance bonuses, and promotion adjustments without manual data entry.",
      link: "/features/payroll-management",
    },
  ];

  // 6. FAQs (Required questions)
  const faqs = [
    {
      q: "What is performance management software?",
      a: "Performance management software is a centralized digital platform that helps organizations set and track employee goals, conduct fair and structured performance reviews, record continuous feedback, and create personalized development roadmaps across the entire workforce.",
    },
    {
      q: "How are employee goals tracked?",
      a: "Employees and managers set specific, measurable objectives (OKRs or KPIs) with assigned deadlines, metric targets, and weightages. Team members update their completion percentages directly from their self-service portal, keeping progress visible to managers in real time.",
    },
    {
      q: "How can managers conduct performance reviews?",
      a: "Managers conduct evaluations through standardized online review templates that combine competency ratings, goal progress data, and qualitative feedback. They can review past 1-on-1 check-in records, schedule review discussions, and submit balanced evaluations for HR calibration.",
    },
    {
      q: "Can HR monitor employee review progress?",
      a: "Yes. HR administrators have access to an oversight dashboard showing real-time cycle status, department completion rates, pending manager reviews, rating distributions, and automated reminders to keep review cycles on schedule.",
    },
    {
      q: "How does performance management support employee development?",
      a: "By directly connecting review findings with Individual Development Plans (IDPs), managers and team members can pinpoint skill gaps, establish training goals, assign mentors, and outline clear milestones for career progression and internal promotions.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper perf-page-wrapper">
      <SEO
        title="Performance Management Software — Goals, Reviews & Employee Development | LattiumHR"
        description="Turn Employee Performance Into Progress. Track employee goals, organize performance reviews, and bring more clarity to employee development with LattiumHR."
        canonicalPath="/features/performance-management"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Turn Employee Performance Into Progress)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="perf-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Performance Management">
              <span>✦ PERFORMANCE MANAGEMENT ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="perf-hero-title" className="emp-hero-rich-title">
              Turn Employee Performance <br className="emp-hero-br" />
              Into <span className="emp-glow-text">Progress.</span>
            </h1>
            <p className="emp-hero-rich-subhead">
              Track employee goals, organize performance reviews, and bring more clarity to employee development.
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
                Explore Capabilities
              </button>
            </div>

            {/* Trust Points */}
            <div className="emp-hero-trust-row">
              <span><Icon name="check" size={13} /> Clear OKRs & Goal Tracking</span>
              <span><Icon name="check" size={13} /> Structured Review Cycles</span>
              <span><Icon name="check" size={13} /> Continuous 1-on-1 Feedback</span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE (Matching Employee Management hero stage) */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Goal Achievement Donut Chart */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Goal Tracking Status</h3>
                    <span className="emp-float-widget-sub">Active Cycle • Q3</span>
                  </div>
                  <span className="emp-float-widget-badge">Live</span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#f4edf3" strokeWidth="18" fill="none" />
                    {/* On Track 68% (Plum #802B5B) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#802B5B" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="136"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Ahead 22% (Emerald #10b981) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#10b981" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="333"
                      strokeLinecap="round"
                      transform="rotate(155 90 90)"
                    />
                    {/* Needs Attention 10% (Amber #f59e0b) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#f59e0b" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="384"
                      strokeLinecap="round"
                      transform="rotate(234 90 90)"
                    />
                    {/* Center Info */}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">All Goals</text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">342</text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-plum" />
                    <span>On Track (68%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-mint" />
                    <span>Ahead of Schedule (22%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot" style={{ backgroundColor: "#f59e0b" }} />
                    <span>Needs Attention (10%)</span>
                  </div>
                </div>
              </div>

              {/* Center Main Card: Real Performance Review Meeting */}
              <div className="emp-hero-center-photo-card perf-hero-showcase-frame">
                <img
                  src="/images/perf-hero-showcase.jpg"
                  alt="HR manager and professional conducting a structured 1-on-1 performance review in a modern office"
                  className="emp-hero-center-img perf-hero-mockup-img"
                  loading="eager"
                />

                {/* Top-Left Floating Live Status Pill */}
                <div className="emp-photo-status-pill">
                  <span className="perf-live-pulse-dot" />
                  <span>Performance Review Cycle Active</span>
                </div>
              </div>

              {/* Right Widget: Review Milestone & Rating Scorecard */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Cycle Completion</h3>
                    <span className="emp-float-widget-sub">Quarterly Review</span>
                  </div>
                  <span className="emp-float-widget-pill-green">98% Submitted</span>
                </div>

                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">4.6</strong>
                  <div className="emp-stat-meta">
                    <span>Average Team Rating</span>
                    <small>Out of 5.0 • High Performance</small>
                  </div>
                </div>

                {/* Mini Bar Velocity Chart */}
                <div className="emp-mini-bar-chart">
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "45%" }} />
                    <span className="emp-bar-lbl">M1</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "60%" }} />
                    <span className="emp-bar-lbl">M2</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "72%" }} />
                    <span className="emp-bar-lbl">M3</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "85%" }} />
                    <span className="emp-bar-lbl">M4</span>
                  </div>
                  <div className="emp-bar-col is-active">
                    <div className="emp-bar-fill" style={{ height: "98%" }} />
                    <span className="emp-bar-lbl">M5</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "92%" }} />
                    <span className="emp-bar-lbl">M6</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "96%" }} />
                    <span className="emp-bar-lbl">M7</span>
                  </div>
                </div>

                <div className="emp-widget-footer-pill">
                  <Icon name="check" size={14} />
                  <span>100% Calibrated with Zero Recency Bias</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PERFORMANCE CHALLENGES
            ========================================================================= */}
        <section className="emp-section emp-problem-section" id="challenges">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ PERFORMANCE CHALLENGES ✦</span>
              <h2 className="emp-section-title">
                Performance Reviews Should Mean More Than a Score.
              </h2>
              <p className="emp-section-subhead">
                When performance conversations happen once a year in a rush, employees receive disconnected numbers instead of actionable growth.
              </p>
            </div>

            <div className="emp-problem-grid perf-problem-grid">
              {challenges.map((c) => (
                <div key={c.id} className="emp-problem-card">
                  <div className="emp-problem-icon-wrap" aria-hidden="true">
                    {c.icon}
                  </div>
                  <h3 className="emp-problem-title">{c.title}</h3>
                  <p className="emp-problem-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section Divider Line */}
          <div className="emp-section-divider-line" aria-hidden="true" />
        </section>

        {/* =========================================================================
            3. PERFORMANCE MANAGEMENT CAPABILITIES (3 Flagship Detailed Blocks)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="capabilities">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ PERFORMANCE MANAGEMENT CAPABILITIES ✦</span>
              <h2 className="emp-section-title">
                Everything You Need to Support Better Performance.
              </h2>
              <p className="emp-section-subhead">
                From goal alignment to structured reviews and actionable development plans, give managers and employees the tools to succeed together.
              </p>
            </div>
          </div>

          {/* 3 Core Capability Blocks */}
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
                            onClick={handleOpenDemo}
                          >
                            Book a Demo <Icon name="arrow" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Deck: 4 Compact Stats Cards (Uniform Clean Style) */}
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
              </div>
            ))}
          </div>
        </section>

        

        {/* =========================================================================
            4. PERFORMANCE REVIEW WORKFLOW (From Setting Goals to Recognizing Progress)
            ========================================================================= */}
        <section className="emp-process-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="container">
            <div className="emp-process-header">
              <span className="emp-process-eyebrow">✦ PERFORMANCE REVIEW WORKFLOW ✦</span>
              <h2 id="workflow-heading" className="emp-process-title">
                From Setting Goals to Recognizing Progress.
              </h2>
              <p className="emp-process-subhead">
                A connected visual journey: Set Goals → Monitor Progress → Review Performance → Share Feedback → Plan Improvement.
              </p>
            </div>

            {/* 5-Step Process Grid */}
            <div className="perf-process-grid-5">
              {workflowSteps.map((step, idx) => {
                const isActive = activeWorkflowCard === idx;
                return (
                  <div
                    key={step.number}
                    className={`perf-process-card ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveWorkflowCard(idx)}
                    onClick={() => setActiveWorkflowCard(idx)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                  >
                    <div className="emp-process-notch">
                      <span className="emp-process-notch-num">{step.number}</span>
                    </div>

                    <div className="emp-process-icon-box">{step.icon}</div>

                    <h3 className="emp-process-card-title">{step.title}</h3>
                    <p className="emp-process-card-desc">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WHY LATTIUMHR FOR PERFORMANCE MANAGEMENT
            ========================================================================= */}
        <section className="emp-section emp-why-choose-section" id="why-choose">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY LATTIUMHR ✦</span>
              <h2 id="why-choose-title" className="emp-section-title">
                Make Performance Conversations More Meaningful.
              </h2>
              <p className="emp-section-subhead">
                Structured goals, review records, and clearer feedback support managers and HR teams in understanding real employee progress.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: Big Card */}
              <div className="emp-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">
                      ✦ CONTINUOUS GROWTH PLATFORM ✦
                    </span>
                  </div>

                  {/* Floating Metric 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Verified Appraisal Records</small>
                        <strong>100% Audit-Ready</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Missing Reviews</span>
                  </div>

                  {/* Floating Metric 2 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="shield" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Goal Alignment Score</small>
                        <strong>94% Team Alignment</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Real-Time Tracking</span>
                  </div>
                </div>

                <p className="emp-big-card-bottom-text">
                  Provide managers and HR teams with structured goals, comprehensive review archives, and continuous feedback. Instead of relying on memory during annual evaluations, hold constructive, data-backed conversations focused on long-term career growth.
                </p>
              </div>

              {/* Right Column: 4 Small Cards */}
              <div className="emp-why-small-grid">
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="chart" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Structured Goal Alignment</h3>
                  <p className="emp-why-card-desc">
                    Connect individual contributor deliverables directly with team targets and quarterly strategic milestones.
                  </p>
                </div>

                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="document" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Comprehensive Review Records</h3>
                  <p className="emp-why-card-desc">
                    Maintain an immutable chronological record of every rating, evaluation remark, and promotion nomination.
                  </p>
                </div>

                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="chat" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Continuous Manager Feedback</h3>
                  <p className="emp-why-card-desc">
                    Enable ongoing 1-on-1 check-ins with documented notes so feedback guides everyday progress throughout the year.
                  </p>
                </div>

                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="award" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">HR Visibility & Calibration</h3>
                  <p className="emp-why-card-desc">
                    Gain company-wide visibility across branches, apply bell-curve calibration, and identify high-potential talent early.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. MIDDLE CTA SECTION (Help Every Employee Move Forward)
            ========================================================================= */}
        <section className="emp-center-cta-section" aria-labelledby="middle-cta-title">
          <div className="container">
            <div className="emp-center-cta-card">
              <div className="emp-cta-primary-bar" />

              <div className="emp-cta-img-wrap">
                <img
                  src="/images/emp-cta-collaboration.jpg"
                  alt="Team celebrating successful performance review and development milestones"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ HELP EVERY EMPLOYEE GROW ✦</span>
                <h2 id="middle-cta-title" className="emp-cta-title">
                  Help Every Employee Move Forward.
                </h2>
                <p className="emp-cta-desc">
                  Bring more structure to employee goals, reviews, and development conversations.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={handleOpenDemo}
                  >
                    Request a Demo
                  </button>
                  <button
                    type="button"
                    className="emp-cta-btn-secondary"
                    onClick={handleOpenDemo}
                  >
                    Talk to a Product Specialist <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. HOW IT WORKS TOGETHER (Connect Individual Progress With Team Goals)
            ========================================================================= */}
        <section className="emp-section emp-connected-section" id="connected-modules">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ HOW IT WORKS TOGETHER ✦</span>
              <h2 className="emp-section-title">
                Connect Individual Progress With Team Goals.
              </h2>
              <p className="emp-section-subhead">
                Performance Management connects seamlessly with Employee Management, manager responsibilities, and HR oversight in one unified ecosystem.
              </p>
            </div>

            {/* 4 Connected Module Cards */}
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
                    <div className="emp-process-notch" aria-label={`Module ${mod.number}`}>
                      <span className="emp-process-notch-num">{mod.number}</span>
                    </div>

                    <div className="emp-process-icon-box" aria-hidden="true">
                      {mod.icon}
                    </div>

                    <span className="perf-ecosystem-role-tag">{mod.role}</span>
                    <h3 className="emp-process-card-title">{mod.title}</h3>
                    <p className="emp-process-card-desc">{mod.description}</p>
                    <span className="emp-connected-explore-pill">
                      Explore Capability <Icon name="arrow" size={13} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FAQ SECTION (Performance Management FAQs)
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs" aria-labelledby="faq-heading">
          <div className="container faq-grid">
            <div>
              <div className="section-heading">
                <span className="eyebrow">QUESTIONS, ANSWERED</span>
                <h2 id="faq-heading">Performance Management FAQs</h2>
                <p>
                  Clear answers about goal tracking, appraisal workflows, manager feedback, and employee development.
                </p>
              </div>
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
            9. FINAL CTA SECTION
            ========================================================================= */}
        <FooterCTA />
      </main>

      <Footer />
    </div>
  );
}

export default PerformanceManagementPage;
