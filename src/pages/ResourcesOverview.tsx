import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import "./ResourcesOverview.css";

export function ResourcesOverview() {
  const { openDemoModal } = useDemoModal();
  const navigate = useNavigate();

  // Glossary category filter state (search bar removed per user request)
  const [glossaryCategory, setGlossaryCategory] = useState("All");

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Glossary categories exactly as in screenshot
  const glossaryCategories = [
    "All",
    "HR Basics",
    "Payroll",
    "Attendance",
    "Leave",
    "Compliance",
    "Performance",
  ];

  // Primary glossary cards as in screenshot
  const allGlossaryCards = [
    {
      id: "hrms",
      badge: "HR Basics",
      category: "HR Basics",
      title: "HRMS",
      iconType: "users" as const,
      desc: "A Human Resource Management System (HRMS) software that helps businesses manage their people, processes and data in one place.",
      link: "/resources/hrms-glossary",
    },
    {
      id: "attendance",
      badge: "Attendance",
      category: "Attendance",
      title: "Attendance",
      iconType: "calendar" as const,
      desc: "Tracks employee working hours, leaves and presence using automated systems or biometric devices.",
      link: "/resources/hrms-glossary",
    },
    {
      id: "compliance",
      badge: "Compliance",
      category: "Compliance",
      title: "Compliance",
      iconType: "shield" as const,
      desc: "Ensures the organisation follows legal regulations and internal policies related to HR and labor laws.",
      link: "/resources/hrms-glossary",
    },
    {
      id: "payroll",
      badge: "Payroll",
      category: "Payroll",
      title: "Payroll Processing",
      iconType: "payroll" as const,
      desc: "The complete cycle of calculating employee compensation, statutory deductions, tax withholdings, and net disbursements.",
      link: "/resources/hrms-glossary",
    },
    {
      id: "leave",
      badge: "Leave",
      category: "Leave",
      title: "Leave Management",
      iconType: "calendar" as const,
      desc: "Policies and automated workflows for allocating, tracking, and approving employee vacation, sick leave, and holidays.",
      link: "/resources/hrms-glossary",
    },
    {
      id: "performance",
      badge: "Performance",
      category: "Performance",
      title: "Performance Appraisal",
      iconType: "users" as const,
      desc: "Systematic review and assessment of an employee's job performance, goal achievements, and contribution to company objectives.",
      link: "/resources/hrms-glossary",
    },
  ];

  const displayedGlossaryCards =
    glossaryCategory === "All"
      ? allGlossaryCards.slice(0, 3)
      : allGlossaryCards.filter((c) => c.category === glossaryCategory);

  // FAQs exactly from the screenshot
  const faqItems = [
    {
      q: "How do I add a new branch in LattiumHR?",
      a: "Navigate to Settings > Branches & Locations. Click 'Add Branch' to set up a new physical entity, define custom working hours, assign regional public holiday calendars, and set GPS geofence coordinates.",
    },
    {
      q: "Can I import employees in bulk?",
      a: "Yes. LattiumHR provides a pre-formatted Excel/CSV template. Simply download the sheet, populate your employee details, and upload it for automatic validation and bulk ingestion without errors.",
    },
    {
      q: "Is there a mobile app for LattiumHR?",
      a: "Yes. The LattiumHR mobile app is available on iOS and Android. Staff can mark touchless geofenced attendance, submit leave requests, and view payslips, while managers can approve requests on the go.",
    },
    {
      q: "How do I generate and manage reports?",
      a: "Visit the Reports workspace to export real-time attendance summaries, PF/ESI statutory registers, bank salary payout files, and headcount retention trends in Excel or PDF format.",
    },
    {
      q: "Can I integrate LattiumHR with third-party systems?",
      a: "Yes. LattiumHR integrates directly with biometric scanners (eSSL, ZKTeco), corporate banking portals (HDFC, ICICI, SBI) for salary disbursements, and ERP systems via secure REST APIs.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell res-hub-exact-page">
      <SEO
        title="Resources & Knowledge Hub | LattiumHR"
        description="Explore helpful guides, FAQs, and support resources to simplify HR management and get the most out of Lattium HRMS."
        canonicalPath="/resources"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (PREVIOUS FULLSCREEN CENTERED HERO WITH BEND ORANGE LINE)
            ========================================================================= */}
        <section className="res-hero-section">
          <div className="res-hero-grid-pattern" />
          <div className="res-hero-ambient" />
          <div className="container">
            <div className="res-hero-content">
              <span className="res-hero-eyebrow">
                <Icon name="sparkle" size={14} />
                KNOWLEDGE &amp; RESOURCE HUB
              </span>

              <h1 className="res-hero-title">
                Resources to Help You <br />
                <span className="res-hero-title-accent">
                  Work Smarter
                  <svg
                    className="res-bend-orange-line"
                    viewBox="0 0 340 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 14C80 3 260 3 337 14"
                      stroke="#ff782d"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="res-hero-subhead">
                Explore helpful guides, FAQs, and support resources to simplify HR management and get the most out of Lattium HRMS.
              </p>

              <div className="res-hero-actions">
                <Button to="/resources/blog" className="res-hero-primary-btn">
                  Explore Resources <Icon name="arrow" size={15} />
                </Button>
                <Button to="/contact" secondary className="res-hero-secondary-btn">
                  Contact Support
                </Button>
              </div>

              {/* 3 Key Points matching Home Page Hero pattern */}
              <div className="res-hero-benefits">
                <div className="res-hero-benefit-item">
                  <strong className="res-benefit-num">100+</strong>
                  <p>
                    <b>Free Resources</b>
                    <small>Guides, templates &amp; blogs</small>
                  </p>
                </div>
                <div className="res-hero-benefit-item">
                  <strong className="res-benefit-num">4-Step</strong>
                  <p>
                    <b>Implementation</b>
                    <small>Simple go-live roadmap</small>
                  </p>
                </div>
                <div className="res-hero-benefit-item">
                  <strong className="res-benefit-num">24/7</strong>
                  <p>
                    <b>Expert Support</b>
                    <small>Real-time team assistance</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="res-section-divider" />

        {/* =========================================================================
            2. LATEST ARTICLES & INSIGHTS (EXACT REPLICA OF SCREENSHOT)
            ========================================================================= */}
        <section className="res-exact-section" id="articles">
          <div className="container">
            <div className="res-exact-section-header centered">
              <span className="res-exact-eyebrow">FEATURED RESOURCES</span>
              <h2 className="res-exact-section-title">Latest Articles &amp; Insights</h2>
              <p className="res-exact-section-subhead">
                Practical guides and expert strategies to manage multi-location HR, payroll, and team onboarding.
              </p>
            </div>

            {/* Articles Layout: Top 1 Big Card + Bottom 2 Medium Cards */}
            <div className="res-exact-articles-stack">
              {/* Top Featured Large Horizontal Card */}
              <div className="res-exact-card-featured">
                <div className="res-card-featured-img-wrap">
                  <img
                    src="/images/article-multibranch.jpg"
                    alt="How to Manage Multiple Branches in One HRMS Platform"
                    className="res-exact-img"
                    loading="lazy"
                  />
                </div>
                <div className="res-card-featured-content">
                  <div>
                    <span className="res-exact-cat-pill">HR Strategy</span>
                    <h3 className="res-card-featured-title">
                      How to Manage Multiple Branches in One HRMS Platform
                    </h3>
                    <p className="res-card-featured-desc">
                      Learn how a unified HRMS helps you handle multiple locations, team workflows, and cross-branch compliance — without operational chaos.
                    </p>
                    <div className="res-card-tags-row">
                      <span className="res-tag-item">
                        <Icon name="check" size={10} /> Multi-Branch Sync
                      </span>
                      <span className="res-tag-item">
                        <Icon name="check" size={10} /> Geofence Attendance
                      </span>
                      <span className="res-tag-item">
                        <Icon name="check" size={10} /> Centralised Payroll
                      </span>
                    </div>
                  </div>
                  <div className="res-card-featured-footer">
                    <div className="res-card-foot-meta">
                      <span className="res-exact-readtime">
                        <Icon name="clock" size={13} /> 5 min read
                      </span>
                      <span className="res-meta-dot">·</span>
                      <span className="res-card-date">Updated 2025</span>
                    </div>
                    <Link
                      to="/resources/blog/geofenced-attendance-vs-biometric-scanners"
                      className="res-card-read-btn"
                    >
                      Read article <Icon name="arrow" size={13} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom 2 Cards Grid */}
              <div className="res-exact-articles-grid-2">
                {/* Card 1 */}
                <div className="res-exact-card-medium">
                  <div className="res-card-medium-img-wrap">
                    <img
                      src="/images/article-payroll.jpg"
                      alt="Automating Payroll for Multi-Location Teams"
                      className="res-exact-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="res-card-medium-content">
                    <div>
                      <span className="res-exact-cat-pill">Payroll</span>
                      <h4 className="res-card-medium-title">
                        Automating Payroll for Multi-Location Teams
                      </h4>
                      <p className="res-card-medium-desc">
                        Save hours each month, eliminate branch discrepancies, and keep your entire team compliant.
                      </p>
                      <div className="res-card-tags-row">
                        <span className="res-tag-item">Auto Deductions</span>
                        <span className="res-tag-item">Direct Bank Sync</span>
                      </div>
                    </div>
                    <div className="res-card-featured-footer">
                      <div className="res-card-foot-meta">
                        <span className="res-exact-readtime">
                          <Icon name="clock" size={12} /> 4 min read
                        </span>
                      </div>
                      <Link
                        to="/resources/blog/indian-payroll-compliance-guide-2025"
                        className="res-card-read-btn"
                      >
                        Read article <Icon name="arrow" size={12} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="res-exact-card-medium">
                  <div className="res-card-medium-img-wrap">
                    <img
                      src="/images/article-onboarding.jpg"
                      alt="Building a Better Employee Onboarding Process"
                      className="res-exact-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="res-card-medium-content">
                    <div>
                      <span className="res-exact-cat-pill">Employee Experience</span>
                      <h4 className="res-card-medium-title">
                        Building a Better Employee Onboarding Process
                      </h4>
                      <p className="res-card-medium-desc">
                        Set your new branch hires up for success from day one with paperless, guided onboarding.
                      </p>
                      <div className="res-card-tags-row">
                        <span className="res-tag-item">Digital Forms</span>
                        <span className="res-tag-item">Asset Tracking</span>
                      </div>
                    </div>
                    <div className="res-card-featured-footer">
                      <div className="res-card-foot-meta">
                        <span className="res-exact-readtime">
                          <Icon name="clock" size={12} /> 6 min read
                        </span>
                      </div>
                      <Link
                        to="/resources/blog"
                        className="res-card-read-btn"
                      >
                        Read article <Icon name="arrow" size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="res-section-divider" />

        {/* =========================================================================
            3. IMPLEMENTATION ROADMAP (EXACT REPLICA OF SCREENSHOT)
            ========================================================================= */}
        <section className="res-exact-section res-roadmap-section" id="roadmap">
          <div className="container">
            <div className="res-roadmap-header-wrap">
              <div className="res-roadmap-eyebrow-row">
                <span className="res-eyebrow-line" />
                <span className="res-roadmap-eyebrow-text">GET STARTED</span>
                <span className="res-eyebrow-line" />
              </div>

              <h2 className="res-roadmap-main-title">
                Implementation <span className="res-roadmap-title-grad">Roadmap</span>
              </h2>

              <p className="res-roadmap-subhead">
                A simple 4-step journey to get your HRMS up and running faster.
              </p>
            </div>

            {/* 4 Cards Connected by Subtle Arrows */}
            <div className="res-exact-roadmap-row">
              {/* Step 1: Plan */}
              <div className="res-exact-step-card">
                <div className="res-step-badge-wrap">
                  <div className="res-step-badge-circle">01</div>
                </div>

                <div className="res-card-art-box">
                  <div className="res-art-aura" />
                  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="res-art-svg" aria-hidden="true">
                    {/* Marked Area 1: Soft cloud backdrop behind illustration */}
                    <path d="M26 54 C26 24 46 12 80 12 C114 12 136 24 136 54 C136 82 114 94 80 94 C46 94 26 82 26 54 Z" fill="#f4eaf2" />
                    {/* Marked Area 1: Floating petals / droplets */}
                    <path d="M44 22 C42 18 46 14 50 16 C54 18 52 24 48 24 C45 24 44 23 44 22 Z" fill="#b86d9a" opacity="0.75" />
                    <path d="M36 30 C34 27 37 24 40 25 C43 26 42 31 39 31 C37 31 36 30 36 30 Z" fill="#9c3b74" opacity="0.65" />
                    <path d="M138 32 C140 28 144 30 143 34 C142 38 136 36 138 32 Z" fill="#a4467c" opacity="0.6" />
                    <circle cx="138" cy="72" r="2.5" fill="#c98ab2" opacity="0.6" />

                    <rect x="42" y="16" width="68" height="88" rx="10" fill="#ffffff" stroke="#e8d7e3" strokeWidth="2" />
                    <rect x="58" y="10" width="36" height="12" rx="4" fill="#8c285f" />
                    <rect x="68" y="6" width="16" height="7" rx="3" fill="#6a1b46" />
                    <rect x="52" y="32" width="12" height="12" rx="3" fill="#8c285f" />
                    <path d="M55 38L57 40L61 35" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="69" y="36" width="32" height="4" rx="2" fill="#e2d0dc" />
                    <rect x="52" y="50" width="12" height="12" rx="3" fill="#8c285f" />
                    <path d="M55 56L57 58L61 53" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="69" y="54" width="28" height="4" rx="2" fill="#e2d0dc" />
                    <rect x="52" y="68" width="12" height="12" rx="3" fill="#8c285f" />
                    <path d="M55 74L57 76L61 71" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="69" y="72" width="24" height="4" rx="2" fill="#e2d0dc" />
                    <circle cx="104" cy="90" r="14" fill="#7b2958" />
                    <path d="M104 83v2m0 10v2m-5-7h2m10 0h-2m-3.54-3.54l1.41 1.41m-7.08 7.08l1.41 1.41m0-9.9l-1.41 1.41m7.08 7.08l-1.41 1.41" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="104" cy="90" r="4" fill="#ffffff" />
                    <circle cx="104" cy="90" r="2" fill="#7b2958" />
                  </svg>
                </div>

                <h3 className="res-step-title">Plan</h3>
                <p className="res-step-desc">
                  Define your needs and set up your account.
                </p>

                <ul className="res-roadmap-checklist">
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Understand your HR goals</span>
                  </li>
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Choose the right plan</span>
                  </li>
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Complete initial setup</span>
                  </li>
                </ul>

                <Link to="/help/getting-started" className="res-card-view-guide">
                  View guide <Icon name="arrow" size={12} />
                </Link>

                {/* Marked Area 2: Corner wave shape */}
                <div className="res-card-corner-wave" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cornerWaveGrad1" x1="100" y1="100" x2="25" y2="35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ecd4e3" stopOpacity="0.85" />
                        <stop offset="0.65" stopColor="#f5e6f0" stopOpacity="0.5" />
                        <stop offset="1" stopColor="#fef8fc" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M10 100 C 45 98 68 82 84 55 C 93 40 98 22 100 0 L 100 100 Z" fill="url(#cornerWaveGrad1)" />
                  </svg>
                </div>
              </div>

              <div className="res-roadmap-connector">
                <Icon name="arrow" size={16} />
              </div>

              {/* Step 2: Configure */}
              <div className="res-exact-step-card">
                <div className="res-step-badge-wrap">
                  <div className="res-step-badge-circle">02</div>
                </div>

                <div className="res-card-art-box">
                  <div className="res-art-aura" />
                  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="res-art-svg" aria-hidden="true">
                    {/* Marked Area 1: Soft cloud backdrop behind illustration */}
                    <path d="M26 54 C26 24 46 12 80 12 C114 12 136 24 136 54 C136 82 114 94 80 94 C46 94 26 82 26 54 Z" fill="#f4eaf2" />
                    {/* Marked Area 1: Floating petals / droplets */}
                    <path d="M40 22 C38 18 42 14 46 16 C50 18 48 24 44 24 C41 24 40 23 40 22 Z" fill="#b86d9a" opacity="0.75" />
                    <path d="M32 30 C30 27 33 24 36 25 C39 26 38 31 35 31 C33 31 32 30 32 30 Z" fill="#9c3b74" opacity="0.65" />
                    <path d="M142 34 C144 30 148 32 147 36 C146 40 140 38 142 34 Z" fill="#a4467c" opacity="0.6" />
                    <path d="M148 42 C150 39 153 41 152 44 C151 47 146 45 148 42 Z" fill="#c98ab2" opacity="0.65" />

                    <rect x="36" y="20" width="88" height="68" rx="8" fill="#ffffff" stroke="#e8d7e3" strokeWidth="2" />
                    <path d="M37 28C37 23.58 40.58 20 45 20H115C119.42 20 123 23.58 123 28V32H37V28Z" fill="url(#browserHeaderGrad)" />
                    <circle cx="45" cy="26" r="2" fill="#ffffff" opacity="0.8" />
                    <circle cx="51" cy="26" r="2" fill="#ffffff" opacity="0.8" />
                    <circle cx="57" cy="26" r="2" fill="#ffffff" opacity="0.8" />
                    <rect x="73" y="38" width="14" height="12" rx="3" fill="#7b2958" />
                    <circle cx="80" cy="42" r="2.5" fill="#ffffff" />
                    <path d="M76 49c0-2 1.8-3 4-3s4 1 4 3" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <path d="M80 50V56M60 56H100M60 56V62M80 56V62M100 56V62" stroke="#caa2ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="53" y="62" width="14" height="12" rx="3" fill="#fae6f0" stroke="#dcbcd0" strokeWidth="1" />
                    <circle cx="60" cy="66" r="2" fill="#7b2958" />
                    <path d="M56 72c0-1.5 1.5-2.2 4-2.2s4 0.7 4 2.2" stroke="#7b2958" strokeWidth="1" strokeLinecap="round" />
                    <rect x="73" y="62" width="14" height="12" rx="3" fill="#fae6f0" stroke="#dcbcd0" strokeWidth="1" />
                    <circle cx="80" cy="66" r="2" fill="#7b2958" />
                    <path d="M76 72c0-1.5 1.5-2.2 4-2.2s4 0.7 4 2.2" stroke="#7b2958" strokeWidth="1" strokeLinecap="round" />
                    <rect x="93" y="62" width="14" height="12" rx="3" fill="#fae6f0" stroke="#dcbcd0" strokeWidth="1" />
                    <circle cx="100" cy="66" r="2" fill="#7b2958" />
                    <path d="M96 72c0-1.5 1.5-2.2 4-2.2s4 0.7 4 2.2" stroke="#7b2958" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="118" cy="85" r="14" fill="#7b2958" />
                    <path d="M118 78v2m0 10v2m-5-7h2m10 0h-2m-3.54-3.54l1.41 1.41m-7.08 7.08l1.41 1.41m0-9.9l-1.41 1.41m7.08 7.08l-1.41 1.41" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="118" cy="85" r="4" fill="#ffffff" />
                    <circle cx="118" cy="85" r="2" fill="#7b2958" />
                    <defs>
                      <linearGradient id="browserHeaderGrad" x1="37" y1="20" x2="123" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6c1d47" />
                        <stop offset="1" stopColor="#9c2d67" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <h3 className="res-step-title">Configure</h3>
                <p className="res-step-desc">
                  Set up branches, roles, and workflows.
                </p>

                <ul className="res-roadmap-checklist">
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Add your branches &amp; locations</span>
                  </li>
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Create roles and permissions</span>
                  </li>
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Configure workflows</span>
                  </li>
                </ul>

                <Link to="/help/getting-started" className="res-card-view-guide">
                  View guide <Icon name="arrow" size={12} />
                </Link>

                {/* Marked Area 2: Corner wave shape */}
                <div className="res-card-corner-wave" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cornerWaveGrad2" x1="100" y1="100" x2="25" y2="35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ecd4e3" stopOpacity="0.85" />
                        <stop offset="0.65" stopColor="#f5e6f0" stopOpacity="0.5" />
                        <stop offset="1" stopColor="#fef8fc" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M10 100 C 45 98 68 82 84 55 C 93 40 98 22 100 0 L 100 100 Z" fill="url(#cornerWaveGrad2)" />
                  </svg>
                </div>
              </div>

              <div className="res-roadmap-connector">
                <Icon name="arrow" size={16} />
              </div>

              {/* Step 3: Migrate */}
              <div className="res-exact-step-card">
                <div className="res-step-badge-wrap">
                  <div className="res-step-badge-circle">03</div>
                </div>

                <div className="res-card-art-box">
                  <div className="res-art-aura" />
                  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="res-art-svg" aria-hidden="true">
                    {/* Marked Area 1: Soft cloud backdrop behind illustration */}
                    <path d="M26 54 C26 24 46 12 80 12 C114 12 136 24 136 54 C136 82 114 94 80 94 C46 94 26 82 26 54 Z" fill="#f4eaf2" />
                    {/* Marked Area 1: Floating petals / droplets inside circled region */}
                    <path d="M46 22 C44 18 48 14 52 16 C56 18 54 24 50 24 C47 24 46 23 46 22 Z" fill="#b86d9a" opacity="0.8" />
                    <path d="M38 30 C36 27 39 24 42 25 C45 26 44 31 41 31 C39 31 38 30 38 30 Z" fill="#9c3b74" opacity="0.7" />
                    <path d="M54 28 C56 31 53 34 50 33 C47 32 48 27 51 27 C53 27 54 28 54 28 Z" fill="#c98ab2" opacity="0.65" />
                    
                    {/* Right-side sparkles */}
                    <path d="M140 36 C142 32 146 34 145 38 C144 42 138 40 140 36 Z" fill="#a4467c" opacity="0.6" />
                    <circle cx="136" cy="50" r="2" fill="#c98ab2" opacity="0.6" />

                    {/* Circular avatar container with team icons */}
                    <circle cx="82" cy="56" r="32" fill="#ffffff" stroke="#ebdbe5" strokeWidth="2" />
                    <circle cx="70" cy="52" r="7" fill="#691a44" opacity="0.85" />
                    <path d="M58 72c0-5 5-8 12-8s12 3 12 8" fill="#691a44" opacity="0.85" />
                    <circle cx="94" cy="52" r="7" fill="#691a44" opacity="0.85" />
                    <path d="M82 72c0-5 5-8 12-8s12 3 12 8" fill="#691a44" opacity="0.85" />
                    <circle cx="82" cy="48" r="8.5" fill="#4d1231" />
                    <path d="M68 72c0-6 6.5-9.5 14-9.5s14 3.5 14 9.5" fill="#4d1231" />
                    <circle cx="108" cy="80" r="13" fill="#7b2958" />
                    <path d="M108 74v12M102 80h12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                <h3 className="res-step-title">Migrate</h3>
                <p className="res-step-desc">
                  Bring your data and invite your team.
                </p>

                <ul className="res-roadmap-checklist">
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Import existing data</span>
                  </li>
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Verify and clean up</span>
                  </li>
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Invite your team members</span>
                  </li>
                </ul>

                <Link to="/help/getting-started" className="res-card-view-guide">
                  View guide <Icon name="arrow" size={12} />
                </Link>

                {/* Marked Area 2: Corner wave shape */}
                <div className="res-card-corner-wave" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cornerWaveGrad3" x1="100" y1="100" x2="25" y2="35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ecd4e3" stopOpacity="0.85" />
                        <stop offset="0.65" stopColor="#f5e6f0" stopOpacity="0.5" />
                        <stop offset="1" stopColor="#fef8fc" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M10 100 C 45 98 68 82 84 55 C 93 40 98 22 100 0 L 100 100 Z" fill="url(#cornerWaveGrad3)" />
                  </svg>
                </div>
              </div>

              <div className="res-roadmap-connector">
                <Icon name="arrow" size={16} />
              </div>

              {/* Step 4: Go Live */}
              <div className="res-exact-step-card">
                <div className="res-step-badge-wrap">
                  <div className="res-step-badge-circle">04</div>
                </div>

                <div className="res-card-art-box">
                  <div className="res-art-aura" />
                  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="res-art-svg" aria-hidden="true">
                    {/* Marked Area 1: Soft cloud backdrop behind illustration */}
                    <path d="M26 54 C26 24 46 12 80 12 C114 12 136 24 136 54 C136 82 114 94 80 94 C46 94 26 82 26 54 Z" fill="#f4eaf2" />
                    {/* Marked Area 1: Floating petals / droplets */}
                    <path d="M40 22 C38 18 42 14 46 16 C50 18 48 24 44 24 C41 24 40 23 40 22 Z" fill="#b86d9a" opacity="0.75" />
                    <path d="M32 30 C30 27 33 24 36 25 C39 26 38 31 35 31 C33 31 32 30 32 30 Z" fill="#9c3b74" opacity="0.65" />
                    <path d="M140 28 C142 24 146 26 145 30 C144 34 138 32 140 28 Z" fill="#a4467c" opacity="0.6" />
                    <circle cx="120" cy="18" r="2" fill="#7b2958" />

                    <rect x="36" y="36" width="76" height="48" rx="6" fill="#ffffff" stroke="#e8d7e3" strokeWidth="2" />
                    <path d="M28 84C28 82.8954 28.8954 82 30 82H118C119.105 82 120 82.8954 120 84V86C120 87.1046 119.105 88 118 88H30C28.8954 88 28 87.1046 28 86V84Z" fill="#d9c5d3" />
                    <path d="M66 82H82V84H66V82Z" fill="#a892a2" />
                    <ellipse cx="62" cy="74" rx="14" ry="7" fill="#f4e4ef" />
                    <ellipse cx="86" cy="74" rx="14" ry="7" fill="#f4e4ef" />
                    <ellipse cx="74" cy="70" rx="16" ry="9" fill="#fcf6fa" />
                    <g transform="translate(68, 20) rotate(32)">
                      <path d="M12 40L14 49L8 42L2 51L4 40Z" fill="#ff782d" />
                      <path d="M10 40L12 45L8 41L4 46L6 40Z" fill="#ffd15c" />
                      <path d="M8 8C14 16 16 32 16 38H0C0 32 2 16 8 8Z" fill="#581639" />
                      <path d="M8 8C11 13 13 18 13 22H3C3 18 5 13 8 8Z" fill="#7b2958" />
                      <circle cx="8" cy="24" r="3.5" fill="#fdf2f8" stroke="#ffffff" strokeWidth="1" />
                      <path d="M0 30L-4 38L0 38Z" fill="#ff782d" />
                      <path d="M16 30L20 38L16 38Z" fill="#ff782d" />
                    </g>
                  </svg>
                </div>

                <h3 className="res-step-title">Go Live</h3>
                <p className="res-step-desc">
                  Start using LattiumHR across your locations.
                </p>

                <ul className="res-roadmap-checklist">
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Run a quick training session</span>
                  </li>
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Explore key features</span>
                  </li>
                  <li>
                    <span className="res-chk-dot"><Icon name="check" size={10} /></span>
                    <span>Get ongoing support</span>
                  </li>
                </ul>

                <Link to="/help/getting-started" className="res-card-view-guide">
                  View guide <Icon name="arrow" size={12} />
                </Link>

                {/* Marked Area 2: Corner wave shape */}
                <div className="res-card-corner-wave" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cornerWaveGrad4" x1="100" y1="100" x2="25" y2="35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ecd4e3" stopOpacity="0.85" />
                        <stop offset="0.65" stopColor="#f5e6f0" stopOpacity="0.5" />
                        <stop offset="1" stopColor="#fef8fc" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M10 100 C 45 98 68 82 84 55 C 93 40 98 22 100 0 L 100 100 Z" fill="url(#cornerWaveGrad4)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="res-section-divider" />

        {/* =========================================================================
            4. CUSTOMER STORIES (EXACT REPLICA OF SCREENSHOT)
            ========================================================================= */}
        <section className="res-exact-section" id="stories">
          <div className="container">
            <div className="res-stories-section-header centered">
              <div className="res-stories-eyebrow-wrap">
                <span className="res-stories-eyebrow-line" />
                <span className="res-stories-eyebrow">REAL IMPACT</span>
                <span className="res-stories-eyebrow-line" />
              </div>
              <h2 className="res-stories-title">Customer Stories</h2>
              <p className="res-stories-subhead">
                See how businesses like yours are achieving more with LattiumHR.
              </p>
            </div>

            {/* Stories Grid: Left Big Featured + Right 2 Stacked Cards */}
            <div className="res-exact-stories-grid">
              {/* Left Big Featured Card: Skyline Group */}
              <div className="res-story-featured-card">
                <div className="res-story-featured-img-wrap">
                  <img
                    src="/images/skyline-hq.jpg"
                    alt="Skyline Group Headquarters"
                    className="res-story-featured-img"
                    loading="lazy"
                  />
                </div>
                <div className="res-story-featured-body">
                  <div className="res-story-pill-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="res-story-pill-icon">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <line x1="9" y1="6" x2="9.01" y2="6" />
                      <line x1="15" y1="6" x2="15.01" y2="6" />
                      <line x1="9" y1="10" x2="9.01" y2="10" />
                      <line x1="15" y1="10" x2="15.01" y2="10" />
                      <line x1="9" y1="14" x2="9.01" y2="14" />
                      <line x1="15" y1="14" x2="15.01" y2="14" />
                      <path d="M9 18h6" />
                    </svg>
                    <span>SKYLINE GROUP</span>
                  </div>

                  <h3 className="res-story-stat-title">3 Branches</h3>
                  <p className="res-story-stat-sub">
                    HR operations simplified across locations with LattiumHR.
                  </p>

                  <blockquote className="res-story-quote">
                    "LattiumHR gave us the control and visibility we needed across all our branches. The implementation was smooth and the support team was fantastic."
                  </blockquote>

                  <div className="res-story-featured-foot">
                    <span className="res-story-author">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-author-person-icon">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      — HR Manager, Skyline Group
                    </span>
                    <Link to="/resources/case-studies" className="res-story-more-btn">
                      Read story <Icon name="arrow" size={13} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Stacked Cards: BrightPath & GreenLeaf */}
              <div className="res-exact-stories-stacked">
                {/* Card 1: BrightPath Solutions */}
                <div className="res-story-side-card">
                  <div className="res-story-side-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#b83280" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="res-side-box-icon">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>

                  <div className="res-story-side-center">
                    <h4 className="res-story-side-title">BrightPath Solutions</h4>
                    <p className="res-story-side-desc">
                      Consistent HR processes across every team.
                    </p>

                    <div className="res-story-stats-row">
                      <div className="res-story-stat-item">
                        <div className="res-story-stat-val">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#b83280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="res-stat-icon">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            <polyline points="17 6 23 6 23 12" />
                          </svg>
                          <span>100+</span>
                        </div>
                        <span className="res-story-stat-lbl">Employees</span>
                      </div>
                      <div className="res-story-stat-sep" />
                      <div className="res-story-stat-item">
                        <div className="res-story-stat-val">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#b83280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="res-stat-icon">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>2</span>
                        </div>
                        <span className="res-story-stat-lbl">Locations</span>
                      </div>
                    </div>
                  </div>

                  <div className="res-story-side-right">
                    <div className="res-story-thumb-wrap">
                      <img
                        src="/images/brightpath-thumb.jpg"
                        alt="BrightPath Solutions Workspace"
                        className="res-story-side-thumb"
                        loading="lazy"
                      />
                    </div>
                    <Link to="/resources/case-studies" className="res-story-side-link">
                      Read story <Icon name="arrow" size={12} />
                    </Link>
                  </div>
                </div>

                {/* Card 2: GreenLeaf Retail */}
                <div className="res-story-side-card">
                  <div className="res-story-side-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#b83280" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="res-side-box-icon">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>

                  <div className="res-story-side-center">
                    <h4 className="res-story-side-title">GreenLeaf Retail</h4>
                    <p className="res-story-side-desc">
                      Better visibility across a growing frontline team.
                    </p>

                    <div className="res-story-stats-row">
                      <div className="res-story-stat-item">
                        <div className="res-story-stat-val">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#b83280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="res-stat-icon">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          <span>250+</span>
                        </div>
                        <span className="res-story-stat-lbl">Employees</span>
                      </div>
                      <div className="res-story-stat-sep" />
                      <div className="res-story-stat-item">
                        <div className="res-story-stat-val">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#b83280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="res-stat-icon">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>4</span>
                        </div>
                        <span className="res-story-stat-lbl">Locations</span>
                      </div>
                    </div>
                  </div>

                  <div className="res-story-side-right">
                    <div className="res-story-thumb-wrap">
                      <img
                        src="/images/greenleaf-thumb.jpg"
                        alt="GreenLeaf Retail Frontline Team"
                        className="res-story-side-thumb"
                        loading="lazy"
                      />
                    </div>
                    <Link to="/resources/case-studies" className="res-story-side-link">
                      Read story <Icon name="arrow" size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="res-section-divider" />

        {/* =========================================================================
            5. HR GLOSSARY (EXACT REPLICA OF SCREENSHOT - NO SEARCH BAR)
            ========================================================================= */}
        <section className="res-exact-section res-glossary-section-relative" id="glossary">
          {/* Ambient background glows */}
          <div className="res-glossary-glow-tl" aria-hidden="true" />
          <div className="res-glossary-glow-br" aria-hidden="true" />

          <div className="container">
            {/* Centered Header with Flanked Eyebrow and Gradient Title (No search bar) */}
            <div className="res-exact-section-header centered">
              <div className="res-glossary-eyebrow-wrap">
                <span className="res-glossary-eyebrow-line" />
                <span className="res-glossary-eyebrow-text">HR KNOWLEDGE BASE</span>
                <span className="res-glossary-eyebrow-line" />
              </div>

              <h2 className="res-glossary-main-title">
                HR <span className="res-glossary-gradient-word">Glossary</span>
              </h2>

              <p className="res-glossary-main-subhead">
                Explore essential HR and payroll terms to make workforce management easier.
              </p>
            </div>

            {/* Filter Pills Row */}
            <div className="res-glossary-pills-row">
              {glossaryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setGlossaryCategory(cat)}
                  className={`res-glossary-pill-btn ${glossaryCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 3 Term Cards Row */}
            <div className="res-glossary-cards-grid">
              {displayedGlossaryCards.map((card) => (
                <div key={card.id} className="res-glossary-card">
                  <div className="res-glossary-card-top">
                    <div className="res-glossary-icon-box">
                      {card.iconType === "users" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-gloss-icon-svg">
                          <circle cx="9" cy="8" r="3" />
                          <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                          <path d="M16 11c2.2 0 4 1.8 4 4" />
                          <circle cx="16" cy="7" r="2.2" />
                        </svg>
                      )}
                      {card.iconType === "calendar" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-gloss-icon-svg">
                          <rect x="3" y="4" width="18" height="17" rx="3" />
                          <path d="M16 2v4M8 2v4M3 9.5h18" />
                          <circle cx="16" cy="15.5" r="3" fill="#fae8f3" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M16 14v1.7l1 0.8" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      )}
                      {card.iconType === "shield" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-gloss-icon-svg">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      )}
                      {card.iconType === "payroll" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-gloss-icon-svg">
                          <rect x="4" y="3" width="16" height="18" rx="2" />
                          <path d="M8 7h8M8 11h3m3 0h2M8 15h3m3 0h2" />
                        </svg>
                      )}
                    </div>

                    <span className="res-glossary-badge">{card.badge}</span>
                  </div>

                  <h3 className="res-glossary-card-title">{card.title}</h3>
                  <p className="res-glossary-card-desc">{card.desc}</p>

                  <div className="res-glossary-card-foot">
                    <Link to={card.link} className="res-glossary-learn-link">
                      Learn more <Icon name="arrow" size={13} />
                    </Link>
                  </div>

                  {/* Corner wave shape */}
                  <div className="res-card-corner-wave" aria-hidden="true">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`glossWaveGrad-${card.id}`} x1="100" y1="100" x2="25" y2="35" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ecd4e3" stopOpacity="0.85" />
                          <stop offset="0.65" stopColor="#f5e6f0" stopOpacity="0.5" />
                          <stop offset="1" stopColor="#fef8fc" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M10 100 C 45 98 68 82 84 55 C 93 40 98 22 100 0 L 100 100 Z" fill={`url(#glossWaveGrad-${card.id})`} />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="res-section-divider" />

        {/* =========================================================================
            6. HELP & SUPPORT (EXACT REPLICA OF SCREENSHOT)
            ========================================================================= */}
        <section className="res-exact-section res-help-section-relative" id="help">
          {/* Ambient background glows */}
          <div className="res-help-glow-tl" aria-hidden="true" />
          <div className="res-help-glow-br" aria-hidden="true" />

          <div className="container">
            {/* Centered Header with Flanked Eyebrow and Gradient Headline */}
            <div className="res-exact-section-header centered">
              <div className="res-help-eyebrow-wrap">
                <span className="res-help-eyebrow-line" />
                <span className="res-help-eyebrow-text">HELP &amp; SUPPORT</span>
                <span className="res-help-eyebrow-line" />
              </div>

              <h2 className="res-help-main-title">
                {"We're Here "}
                <span className="res-help-gradient-word">to Help</span>
              </h2>

              <p className="res-help-main-subhead">
                Find answers, get support and make the most of your HRMS experience.
              </p>
            </div>

            {/* 2 Big Cards Grid */}
            <div className="res-help-dual-grid">
              {/* Card 1: Help Center */}
              <div className="res-help-card">
                {/* Header with Title & Book Illustration */}
                <div className="res-help-card-header">
                  <div className="res-help-card-info">
                    <span className="res-help-card-badge help-center-badge">HELP CENTER</span>
                    <h3 className="res-help-card-title">
                      Quick answers,<br />real solutions.
                    </h3>
                    <p className="res-help-card-desc">
                      Browse our help center for step-by-step guides, troubleshooting tips and detailed resources.
                    </p>
                  </div>

                  <div className="res-help-card-art">
                    <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="res-help-art-svg" aria-hidden="true">
                      <circle cx="85" cy="75" r="48" fill="#f6ebf4" />
                      
                      {/* Open Book in 3D perspective */}
                      <g transform="translate(15, 24)">
                        <path d="M70 95 L15 78 L20 28 L70 42 L120 28 L125 78 Z" fill="#ecd3e4" />
                        <path d="M70 90 L20 75 L20 28 L70 42 Z" fill="#ffffff" stroke="#dfc4d7" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M28 42 L62 51 M28 51 L62 60 M28 60 L54 68" stroke="#d5b9cc" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M70 90 L120 75 L120 28 L70 42 Z" fill="#ffffff" stroke="#dfc4d7" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M78 51 L112 42 M78 60 L112 51 M78 68 L104 60" stroke="#d5b9cc" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M70 42 L70 90" stroke="#b24f88" strokeWidth="2.5" strokeLinecap="round" />
                      </g>

                      {/* Floating Magenta Question Bubble */}
                      <g transform="translate(106, 14)">
                        <path d="M-6 8 L-14 4 M36 8 L44 4 M32 36 L40 42 M-2 32 L-8 38" stroke="#b24f88" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="15" cy="20" r="18" fill="url(#qBubbleGradHelp)" />
                        <text x="15" y="27" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800" fontFamily="sans-serif">?</text>
                      </g>

                      <defs>
                        <linearGradient id="qBubbleGradHelp" x1="0" y1="0" x2="30" y2="36" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#e24996" />
                          <stop offset="1" stopColor="#7a1a52" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* 3 Content Rows */}
                <div className="res-help-rows-list">
                  <Link to="/help/getting-started" className="res-help-row-item">
                    <div className="res-help-row-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-row-icon-svg">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </div>
                    <div className="res-help-row-text">
                      <h4 className="res-help-row-title">Setup &amp; Configuration</h4>
                      <p className="res-help-row-desc">Get started with your HRMS setup, organization and basic configurations.</p>
                    </div>
                    <span className="res-help-row-arrow">
                      <Icon name="arrow" size={13} />
                    </span>
                  </Link>

                  <Link to="/help" className="res-help-row-item">
                    <div className="res-help-row-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-row-icon-svg">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <div className="res-help-row-text">
                      <h4 className="res-help-row-title">Guides &amp; Tutorials</h4>
                      <p className="res-help-row-desc">Learn with easy step-by-step instructions and video guides.</p>
                    </div>
                    <span className="res-help-row-arrow">
                      <Icon name="arrow" size={13} />
                    </span>
                  </Link>

                  <Link to="/resources/faq" className="res-help-row-item">
                    <div className="res-help-row-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-row-icon-svg">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                    <div className="res-help-row-text">
                      <h4 className="res-help-row-title">FAQs</h4>
                      <p className="res-help-row-desc">Find answers to common questions and quick solutions.</p>
                    </div>
                    <span className="res-help-row-arrow">
                      <Icon name="arrow" size={13} />
                    </span>
                  </Link>
                </div>

                {/* Footer link */}
                <div className="res-help-card-foot">
                  <Link to="/help" className="res-help-card-action">
                    Visit Help Center <Icon name="arrow" size={13} />
                  </Link>
                </div>

                {/* Corner wave shape */}
                <div className="res-card-corner-wave" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="helpCornerGrad1" x1="100" y1="100" x2="25" y2="35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ecd4e3" stopOpacity="0.85" />
                        <stop offset="0.65" stopColor="#f5e6f0" stopOpacity="0.5" />
                        <stop offset="1" stopColor="#fef8fc" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M10 100 C 45 98 68 82 84 55 C 93 40 98 22 100 0 L 100 100 Z" fill="url(#helpCornerGrad1)" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Customer Support */}
              <div className="res-help-card">
                {/* Header with Title & Agent Illustration */}
                <div className="res-help-card-header">
                  <div className="res-help-card-info">
                    <span className="res-help-card-badge customer-support-badge">CUSTOMER SUPPORT</span>
                    <h3 className="res-help-card-title">
                      Need direct<br />assistance?
                    </h3>
                    <p className="res-help-card-desc">
                      Our support team is here to help with any questions or issues. Get the help you need, when you need it.
                    </p>
                  </div>

                  <div className="res-help-card-art">
                    <svg viewBox="0 0 170 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="res-help-art-svg" aria-hidden="true">
                      <ellipse cx="95" cy="75" rx="55" ry="50" fill="#f4eaf3" />
                      
                      {/* Floating chat bubble on left */}
                      <g transform="translate(18, 38)">
                        <rect width="36" height="24" rx="12" fill="#ffffff" stroke="#ecd4e5" strokeWidth="1.5" />
                        <path d="M26 24 L22 28 L22 24 Z" fill="#ffffff" stroke="#ecd4e5" strokeWidth="1.5" />
                        <circle cx="12" cy="12" r="2" fill="#9c3b74" />
                        <circle cx="18" cy="12" r="2" fill="#9c3b74" />
                        <circle cx="24" cy="12" r="2" fill="#9c3b74" />
                      </g>

                      {/* Agent Body & Hair */}
                      <g transform="translate(65, 18)">
                        <path d="M18 25 C14 10 42 10 48 25 C54 40 56 60 56 70 C50 72 45 65 42 50 C38 65 30 72 14 70 C14 60 16 40 18 25 Z" fill="#2d1326" />
                        <ellipse cx="33" cy="38" rx="14" ry="16" fill="#fcd9c7" />
                        <path d="M19 28 C24 16 42 16 47 28 C45 23 38 22 33 25 C28 22 21 23 19 28 Z" fill="#2d1326" />
                        <circle cx="28" cy="36" r="1.5" fill="#2d1326" />
                        <circle cx="38" cy="36" r="1.5" fill="#2d1326" />
                        <path d="M30 43 Q33 46 36 43" stroke="#9e4359" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M19 36 C18 20 48 20 47 36" stroke="#5d204a" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <rect x="16" y="32" width="5" height="12" rx="2.5" fill="#8c285f" />
                        <rect x="45" y="32" width="5" height="12" rx="2.5" fill="#8c285f" />
                        <path d="M20 40 Q25 48 30 47" stroke="#5d204a" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <circle cx="31" cy="47" r="2.2" fill="#8c285f" />
                        <rect x="30" y="52" width="6" height="8" fill="#f5cbb8" />
                        <path d="M12 60 C18 56 48 56 54 60 L62 90 H4 Z" fill="#82285e" />
                        <path d="M28 60 L33 72 L38 60 Z" fill="#ffffff" />
                        
                        {/* Modern Laptop in front */}
                        <g transform="translate(-18, 55)">
                          <path d="M20 18 L48 18 L45 42 L17 42 Z" fill="#dfd2e0" stroke="#cbb8ce" strokeWidth="1.5" />
                          <circle cx="32" cy="30" r="3" fill="#ffffff" />
                          <path d="M12 42 L52 42 L56 46 L8 46 Z" fill="#beabbe" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* 3 Support Channels Rows */}
                <div className="res-help-rows-list">
                  <div
                    onClick={() =>
                      openDemoModal({
                        title: "Start Live Support Chat",
                        subtitle: "Connect instantly with our customer care representatives.",
                      })
                    }
                    className="res-help-row-item cursor-pointer"
                  >
                    <div className="res-help-row-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-row-icon-svg">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <circle cx="9" cy="10" r="1" fill="currentColor" />
                        <circle cx="12" cy="10" r="1" fill="currentColor" />
                        <circle cx="15" cy="10" r="1" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="res-help-row-text">
                      <h4 className="res-help-row-title">Live Chat</h4>
                      <p className="res-help-row-desc">Get instant help from our team.</p>
                    </div>
                    <span className="res-help-row-arrow">
                      <Icon name="arrow" size={13} />
                    </span>
                  </div>

                  <a href="mailto:support@lattiumhr.com" className="res-help-row-item">
                    <div className="res-help-row-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-row-icon-svg">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <polyline points="3 7 12 13 21 7" />
                      </svg>
                    </div>
                    <div className="res-help-row-text">
                      <h4 className="res-help-row-title">Email Support</h4>
                      <p className="res-help-row-desc">Detailed help for complex issues.</p>
                    </div>
                    <span className="res-help-row-arrow">
                      <Icon name="arrow" size={13} />
                    </span>
                  </a>

                  <a href="tel:+918001234567" className="res-help-row-item">
                    <div className="res-help-row-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="res-row-icon-svg">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="res-help-row-text">
                      <h4 className="res-help-row-title">Phone Support</h4>
                      <p className="res-help-row-desc">Talk to us during business hours.</p>
                    </div>
                    <span className="res-help-row-arrow">
                      <Icon name="arrow" size={13} />
                    </span>
                  </a>
                </div>

                {/* Footer link */}
                <div className="res-help-card-foot">
                  <button
                    type="button"
                    onClick={() =>
                      openDemoModal({
                        title: "Contact Dedicated Support",
                        subtitle: "Our technical operations desk is available 24/7.",
                      })
                    }
                    className="res-help-card-action"
                  >
                    Contact Support <Icon name="arrow" size={13} />
                  </button>
                </div>

                {/* Corner wave shape */}
                <div className="res-card-corner-wave" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="helpCornerGrad2" x1="100" y1="100" x2="25" y2="35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ecd4e3" stopOpacity="0.85" />
                        <stop offset="0.65" stopColor="#f5e6f0" stopOpacity="0.5" />
                        <stop offset="1" stopColor="#fef8fc" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M10 100 C 45 98 68 82 84 55 C 93 40 98 22 100 0 L 100 100 Z" fill="url(#helpCornerGrad2)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="res-section-divider" />

        {/* =========================================================================
            7. FREQUENTLY ASKED QUESTIONS (IMPROVED)
            ========================================================================= */}
        <section className="res-exact-section res-faq-section-relative" id="faqs">
          {/* Ambient background glows */}
          <div className="res-faq-glow-tl" aria-hidden="true" />
          <div className="res-faq-glow-br" aria-hidden="true" />

          <div className="container res-exact-faq-container">
            {/* Centered Header with Flanked Eyebrow & Gradient Heading */}
            <div className="res-exact-section-header centered">
              <div className="res-faq-eyebrow-wrap">
                <span className="res-faq-eyebrow-line" />
                <span className="res-faq-eyebrow-text">FREQUENTLY ASKED QUESTIONS</span>
                <span className="res-faq-eyebrow-line" />
              </div>

              <h2 className="res-faq-main-title">
                Common <span className="res-faq-gradient-word">Questions</span>
              </h2>

              <p className="res-faq-main-subhead">
                Find clear answers to the most common questions about onboarding, multi-branch setups, and payroll.
              </p>
            </div>

            {/* Accordion FAQ Rows */}
            <div className="res-exact-faq-list">
              {faqItems.map((faq, idx) => {
                const isOpen = openFaq === idx;
                const num = String(idx + 1).padStart(2, "0");
                return (
                  <div key={idx} className={`res-exact-faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      className="res-exact-faq-q"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="res-faq-q-left">
                        <span className="res-faq-num">{num}</span>
                        <span className="res-faq-q-text">{faq.q}</span>
                      </div>
                      <span className={`res-faq-toggle-circle ${isOpen ? "open" : ""}`}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="res-faq-icon-svg"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" className="res-faq-vert-line" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="res-exact-faq-a">
                        <div className="res-faq-a-inner">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* View All FAQs Button & Contact Hint */}
            <div className="res-faq-bottom-action">
              <Link to="/resources/faqs" className="res-faq-view-all-btn">
                <span>View All FAQs</span>
                <Icon name="arrow" size={14} />
              </Link>
              <p className="res-faq-support-hint">
                {"Have a different question? "}
                <button
                  type="button"
                  onClick={() =>
                    openDemoModal({
                      title: "Ask a Question",
                      subtitle: "Our HR product specialists will respond within 15 minutes.",
                    })
                  }
                  className="res-faq-contact-btn"
                >
                  Talk to our team
                </button>
              </p>
            </div>
          </div>
        </section>

        <div className="res-section-divider" />

        {/* =========================================================================
            8. FINAL CTA: HOME PAGE STYLE
            ========================================================================= */}
        <section className="final-cta">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">READY TO SIMPLIFY HR?</span>
              <h2>Your people deserve better than spreadsheets.</h2>
              <p>
                Join 500+ growing businesses worldwide running HR, attendance, and payroll on
                LattiumHR.
              </p>
              <div className="final-actions">
                <Button onClick={() => openDemoModal()}>
                  Book a Free Demo <Icon name="arrow" />
                </Button>
                <Button to="/request-demo" secondary>
                  Estimate Your Price
                </Button>
              </div>
              <div className="final-points">
                <span>
                  <Icon name="check" />
                  Free personalised demo
                </span>
                <span>
                  <Icon name="check" />
                  No credit card required
                </span>
                <span>
                  <Icon name="check" />
                  Go live in 2–4 weeks
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ResourcesOverview;
