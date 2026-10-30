import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import "./MidSizedBusinessPage.css";

interface FAQItem {
  q: string;
  a: string;
}

export function MidSizedBusinessPage() {
  const { openDemoModal } = useDemoModal();

  // Interactive Vertical Workspace Accordion (Section 6)
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);

  const workspaceCards = [
    {
      id: "hr-director",
      number: "01",
      verticalTitle: "HR & People Ops",
      title: "HR & People Operations Directors",
      desc: "Gain unified company-wide workforce intelligence, enforce consistent branch policies, ensure 100% statutory compliance across states, and eliminate month-end payroll chaos across 50 to 500+ employees.",
      points: [
        { title: "Multi-Branch Headcount Visibility", desc: "Real-time attendance, branch allocations, and department analytics in one consolidated dashboard." },
        { title: "Automated Statutory Compliance", desc: "Automated state-wise Professional Tax slabs, PF, ESI, and TDS calculations with zero penalty risk." },
        { title: "Audit-Ready Digital Records", desc: "Secure digital employee vault with KYC verification, contract lifecycle, and automated expiry alerts." },
        { title: "Smooth 2-Week Migration", desc: "Dedicated onboarding specialist to migrate historical spreadsheets and biometric devices seamlessly." },
      ],
      buttonText: "Request a Demo",
      image: "/images/hero-hr-working-pro.jpg",
      alt: "HR and People Operations Director managing multi-branch workforce in LattiumHR",
    },
    {
      id: "branch-manager",
      number: "02",
      verticalTitle: "Branch & Dept Managers",
      title: "Branch Heads & Department Managers",
      desc: "Coordinate multi-shift rosters, review live biometric clock-ins, and clear tiered leave and expense requests in seconds without email chains or coverage gaps.",
      points: [
        { title: "Multi-Tier Approval Management", desc: "Sequential manager and department head sign-offs on mobile and web with instant SLA alerts." },
        { title: "Live Branch Attendance Feeds", desc: "Real-time check-ins from biometric terminals, QR scanners, and mobile GPS geofences." },
        { title: "Shift Roster & Overtime Control", desc: "Visual shift planning with automated warnings that prevent critical department understaffing." },
        { title: "Fast Turnaround SLA", desc: "Resolve routine time-off, shift swaps, and attendance regularizations in under 2 hours." },
      ],
      buttonText: "Request a Demo",
      image: "/images/work-process-team.jpg",
      alt: "Department manager coordinating team schedules and multi-branch approvals",
    },
    {
      id: "branch-employee",
      number: "03",
      verticalTitle: "Distributed Employees",
      title: "Branch & Regional Employees",
      desc: "Empower your distributed team with modern mobile self-service to clock in with GPS geofencing, check real-time leave balances, and download monthly salary slips.",
      points: [
        { title: "Mobile & Geofenced Clock-In", desc: "One-tap attendance marking with GPS location tags, biometric sync, and selfie verification." },
        { title: "Instant PDF Salary Slips", desc: "Download password-protected, itemized monthly payslips and tax projection sheets on demand." },
        { title: "Transparent Leave Balances", desc: "Track Casual, Earned, Sick, and Comp-Off balances updated live with zero manual HR queries." },
        { title: "Direct Request Workflows", desc: "Submit leave applications, shift swaps, and punch regularizations with real-time status tracking." },
      ],
      buttonText: "Request a Demo",
      image: "/images/emp-cta-collaboration.jpg",
      alt: "Mid-sized company employee accessing mobile HR self-service on smartphone",
    },
  ];

  // Section 2: What You Get From Day One (4 quick-win cards)
  const dayOneCards = [
    {
      id: "hierarchy",
      title: "Multi-Branch & Department Hierarchy.",
      desc: "Organize reporting managers, departments, and multiple branch entities into one unified, role-governed directory without spreadsheet fragmentation.",
      btnText: "Explore Hierarchy",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "biometric",
      title: "Biometric & Geofenced Attendance.",
      desc: "Sync on-premise biometric hardware and mobile GPS geofencing across all your branches directly into one live central attendance dashboard.",
      btnText: "View Attendance",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "approvals",
      title: "Tiered Multi-Level Approvals.",
      desc: "Route leaves, expense claims, shift swaps, and attendance regularizations through configurable reporting manager chains with instant alerts.",
      btnText: "Review Approvals",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="3" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "payroll",
      title: "Multi-State Statutory Payroll Prep.",
      desc: "Automate Loss of Pay (LOP), state-specific Professional Tax (PT), PF, ESI, and TDS calculations before month-end with 100% audit readiness.",
      btnText: "See Payroll Prep",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      ),
    },
  ];

  // FAQ Accordion State (Section 7)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleOpenDemo = () => {
    openDemoModal({
      title: "Request a Mid-Sized Business Demo",
      subtitle:
        "See how LattiumHR unifies multi-branch workforce management, statutory payroll, and tiered approvals for 50-500 employees.",
      defaultInterest: "Mid-Sized Business Solution",
    });
  };

  const scrollToWorkingBlock = (cardId: string) => {
    const targetId =
      cardId === "hierarchy"
        ? "working-hierarchy"
        : cardId === "biometric"
        ? "working-biometric"
        : cardId === "approvals"
        ? "working-approvals"
        : "working-payroll";
    const el = document.getElementById(targetId) || document.getElementById("the-way-of-working");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Section 7: FAQs tailored for Mid-Sized Organizations
  const faqs: FAQItem[] = [
    {
      q: "Is LattiumHR built for mid-sized organizations with 50 to 500 employees?",
      a: "Yes. LattiumHR is specifically engineered for mid-market organizations that have outgrown basic tools and entry-level HR software, but want to avoid the multi-month implementation cycles, heavy IT overhead, and bloated licensing costs of legacy enterprise suites. It delivers multi-branch governance, statutory multi-state payroll, and multi-tier approval chains out of the box.",
    },
    {
      q: "Can LattiumHR handle multiple branches and regional offices with different policies?",
      a: "Yes. You can manage multiple legal entities, branch offices, and regional warehouses under a single parent account. Each branch can have its own local holiday calendar, shift patterns, biometric terminals, and state-specific statutory tax rules, while company executives maintain a unified consolidated view.",
    },
    {
      q: "How does attendance syncing work with existing biometric hardware across our branches?",
      a: "LattiumHR connects seamlessly with leading biometric fingerprint and facial recognition hardware via cloud APIs, alongside mobile GPS geofencing and web punch-in. Punches across all physical locations synchronize in real time to the central attendance roster with automated late mark, grace period, and overtime calculations.",
    },
    {
      q: "How does LattiumHR automate multi-level leave, expense, and shift approvals?",
      a: "You can configure multi-tier sequential approval hierarchies (e.g. Line Manager → Department Head → HR Operations) based on department, leave type, or absence duration. Automatic email notifications, mobile push alerts, and delegation rules during manager leave prevent operational bottlenecks.",
    },
    {
      q: "How does LattiumHR support multi-state statutory compliance and payroll?",
      a: "LattiumHR calculates statutory deductions including Provident Fund (PF), Employee State Insurance (ESI), state-specific Professional Tax (PT) slabs across Indian states, and TDS/income tax with 100% compliance. Verified attendance, overtime, and Loss of Pay (LOP) are compiled automatically for 1-click bank transfer export.",
    },
    {
      q: "How long does onboarding and data migration take for 100–300 employees?",
      a: "Most mid-sized organizations go live in 2 to 3 weeks. Your dedicated implementation specialist assists with historical employee data migration, biometric device linking, leave quota policy configuration, and department manager training with zero downtime.",
    },
  ];

  // Section 4: Why LattiumHR for Mid-Sized Businesses
  const whyMidSizedCards = [
    {
      id: "multilocation",
      number: "01",
      title: "Multi-Location Governance",
      desc: "Run unified company-wide policies while granting each branch its own holiday calendars, shift patterns, and localized rules with central HQ oversight.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M4 14l6-6 4 4 6-6" />
        </svg>
      ),
    },
    {
      id: "crossdept",
      number: "02",
      title: "Cross-Department Automation",
      desc: "Connect digital onboarding, biometric attendance, tiered leave approvals, and multi-state payroll into one seamless, automated pipeline.",
      isFeatured: true,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
          <path d="m19 5-7 7" />
        </svg>
      ),
    },
    {
      id: "rolesecurity",
      number: "03",
      title: "Granular Role Security",
      desc: "Protect sensitive salary figures, executive contracts, and personal records with granular role-based access for HR, Finance, Branch Leads, and Managers.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.2 0l-3.58 2.687a.5.5 0 0 1-.81-.47l1.514-8.526" />
        </svg>
      ),
    },
    {
      id: "scalepricing",
      number: "04",
      title: "Predictable Scale Pricing",
      desc: "Transparent tiered plans built specifically for 50 to 500 headcount. Scale employees and open new regional branches without unexpected price jumps.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
    },
  ];

  return (
    <div className="app-shell inner-page-shell sb-page-wrapper">
      <SEO
        title="Mid-Sized Business HRMS Software — Solutions for Growing Teams | LattiumHR"
        description="Scale people operations for your mid-sized business. Manage multi-branch employee records, biometric attendance, multi-tier approvals, and statutory payroll with LattiumHR."
        canonicalPath="/solutions/mid-sized-businesses"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            SECTION 1 — HERO
            ========================================================================= */}
        <section className="sb-hero-section" aria-labelledby="ms-hero-heading">
          <div className="container">
            {/* Eyebrow */}
            <div className="sb-hero-eyebrow-tag">
              <span className="sb-hero-eyebrow-sparkle">✦</span>
              <span>SOLUTIONS FOR MID-SIZED BUSINESSES</span>
              <span className="sb-hero-eyebrow-sparkle">✦</span>
            </div>

            {/* Headline */}
            <h1 id="ms-hero-heading" className="sb-hero-title">
              Scale People Operations for Your <span className="sb-glow-text">Mid-Sized Business.</span>
            </h1>

            {/* Subheadline */}
            <p className="sb-hero-subhead">
              Streamline multi-branch workforce management, statutory compliance, automated approval hierarchies, and unified payroll for 50 to 500+ employees across your expanding organization.
            </p>

            {/* Hero CTAs */}
            <div className="sb-hero-actions">
              <button
                type="button"
                className="sb-btn-primary"
                onClick={handleOpenDemo}
              >
                Request a Mid-Market Demo <Icon name="arrow" size={16} />
              </button>
              <a href="#workspace" className="sb-btn-secondary">
                Explore the Workspace
              </a>
            </div>

            {/* Trust Row */}
            <div className="sb-hero-trust-row">
              <span>
                <Icon name="check" size={14} /> Multi-branch & department structure
              </span>
              <span>
                <Icon name="check" size={14} /> Zero statutory compliance penalties
              </span>
              <span>
                <Icon name="check" size={14} /> Built for scaling teams of 50 to 500+
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2 — WHAT YOU GET FROM DAY ONE (4 Quick-Win Cards in 1 Row)
            ========================================================================= */}
        <section className="sb-dayone-section" aria-labelledby="dayone-heading">
          <div className="container">
            <div className="sb-section-header center">
              <span className="sb-eyebrow">✦ WHAT YOU GET FROM DAY ONE ✦</span>
              <h2 id="dayone-heading" className="sb-section-title">
                Enterprise Power. Startup Agility.
              </h2>
              <p className="sb-section-subhead">
                You don't need a 6-month enterprise implementation to gain operational control. Here is what your organization unlocks immediately.
              </p>
            </div>

            <div className="sb-dayone-grid">
              {dayOneCards.map((card) => (
                <div key={card.id} className="sb-dayone-card">
                  <div className="sb-dayone-icon-wrap">
                    {card.icon}
                  </div>
                  <h3 className="sb-dayone-card-title">{card.title}</h3>
                  <p className="sb-dayone-card-desc">{card.desc}</p>
                  <button
                    type="button"
                    onClick={() => scrollToWorkingBlock(card.id)}
                    className="sb-dayone-card-link"
                    aria-label={`Learn more about ${card.title}`}
                  >
                    <span>{card.btnText}</span>
                    <span className="sb-dayone-link-arrow">↓</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3 — THE MID-SIZED BUSINESS WAY OF WORKING (4 Alternating Checkerboard Blocks)
            ========================================================================= */}
        <section className="sb-way-of-working-section" id="the-way-of-working" aria-labelledby="working-heading">
          <div className="container">
            <div className="sb-section-header center">
              <span className="sb-eyebrow">✦ THE MID-SIZED BUSINESS WAY OF WORKING ✦</span>
              <h2 id="working-heading" className="sb-section-title">
                A Unified Operational Standard for Multi-Branch Teams.
              </h2>
              <p className="sb-section-subhead">
                Bring branch directories, biometric attendance, multi-tiered approvals, and multi-state statutory payroll into one robust, connected workflow.
              </p>
            </div>

            {/* Alternating 4-Block Checkerboard Grid */}
            <div className="sb-checkerboard-wrapper">
              {/* -------------------------------------------------------------------
                  ROW 1: EMPLOYEE DIRECTORY & MULTI-BRANCH HIERARCHY
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-hierarchy">
                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">STRUCTURED FOR SCALING HEADCOUNT</span>
                  <h3 className="sb-cb-title">
                    Centralized Directory with Multi-Branch & Department Hierarchies.
                  </h3>
                  <p className="sb-cb-desc">
                    Keep your growing company organized across multiple cities and business units. Establish clear reporting lines, department budgets, and granular visibility controls without data leaks.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Multi-entity, multi-branch, and department organizational mapping</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Granular role-based permissions (HR Admin, Finance, Branch Head, Line Manager)</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Secure digital vault for contracts, statutory KYC, and asset tracking</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Hierarchy Workflow <span className="sb-cb-arrow">→</span>
                  </button>
                </div>

                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">All Staff <span className="sb-m-count">185</span></span>
                        <span className="sb-m-tab">Mumbai HQ <span className="sb-m-count">92</span></span>
                        <span className="sb-m-tab">Bengaluru <span className="sb-m-count">64</span></span>
                        <span className="sb-m-tab">Delhi NCR <span className="sb-m-count">29</span></span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Kavya Sundaram • Regional Operations Head</strong>
                              <span className="sb-m-badge high">Mumbai HQ</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% KYC & Multi-Branch Org Authority Active</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Rohan Mehta • Associate VP, Engineering</strong>
                              <span className="sb-m-badge slate">Bengaluru Hub</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Asset Provisioning & Department Link Verified</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Priya Shah • Senior Financial Controller</strong>
                              <span className="sb-m-badge active">Delhi NCR</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Statutory Sign-Off Authority Provisioned</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Arjun Verma • Area Logistics Manager</strong>
                              <span className="sb-m-badge amber">14 Reports</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Direct Reporting Line Active</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Verified</small>
                          <strong>185</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="5" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>94%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Branches</small>
                          <strong>03</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>100%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Compliant</small>
                          <strong>100%</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>0 Audits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ROW 2: BIOMETRIC & GEOFENCED ATTENDANCE
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-biometric">
                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">Live Multi-Branch <span className="sb-m-count">185</span></span>
                        <span className="sb-m-tab">Present <span className="sb-m-count">174</span></span>
                        <span className="sb-m-tab">Biometric <span className="sb-m-count">142</span></span>
                        <span className="sb-m-tab">Geofence <span className="sb-m-count">32</span></span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Mumbai HQ Biometric Terminal #1 • 09:02 AM</strong>
                              <span className="sb-m-badge active">Synced</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Hardware Biometric Punch Verified</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Bengaluru Tech Hub Geofence • 09:14 AM</strong>
                              <span className="sb-m-badge active">On Time</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% GPS Radius & Selfie Validation Match</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Delhi NCR Distribution Terminal • 08:58 AM</strong>
                              <span className="sb-m-badge slate">Shift A</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Rotational Shift Schedule Verified</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Field Client Punch (Remote) • 09:32 AM</strong>
                              <span className="sb-m-badge amber">Grace Period</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill orange" style={{ width: "60%" }} />
                            </div>
                            <span className="sb-m-status-text overdue">Auto-Logged within 15-Min Policy Window</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Present</small>
                          <strong>174</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="5" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>94%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Biometric</small>
                          <strong>100%</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>Live</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>On-Time</small>
                          <strong>97%</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="10" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>Strict</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">REAL-TIME ATTENDANCE GOVERNANCE</span>
                  <h3 className="sb-cb-title">
                    Unified Attendance Across Offices, Warehouses, and Remote Teams.
                  </h3>
                  <p className="sb-cb-desc">
                    Eliminate manual timesheet reconciliations, buddy punching, and multi-location blindspots. Connect biometric terminals and GPS geofenced mobile clock-ins directly into one unified roster.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Cloud API sync with physical biometric fingerprint and facial recognition scanners</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Multi-shift rotation, night allowance, and automated roster conflict alerts</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Real-time late-mark tallies, grace period tracking, and overtime rule enforcement</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Attendance Governance <span className="sb-cb-arrow">→</span>
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ROW 3: TIERED APPROVAL WORKFLOWS
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-approvals">
                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">AUTOMATING COMPLEX DECISION CHAINS</span>
                  <h3 className="sb-cb-title">
                    Configurable Multi-Tier Approval Workflows Tailored to Your Structure.
                  </h3>
                  <p className="sb-cb-desc">
                    Empower frontline managers to make quick decisions while ensuring central HR and Finance retain full governance. Set conditional routing based on department, leave type, or absence duration.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Sequential &amp; parallel routing (Line Manager → Department Head → HR Admin)</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Shift swap, comp-off, expense, and punch regularization approval queues</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Team coverage conflict alerts preventing simultaneous critical role leaves</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Approval Workflows <span className="sb-cb-arrow">→</span>
                  </button>
                </div>

                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">Active Queue <span className="sb-m-count">18</span></span>
                        <span className="sb-m-tab">Level 1 Done <span className="sb-m-count">12</span></span>
                        <span className="sb-m-tab">Pending Level 2 <span className="sb-m-count">4</span></span>
                        <span className="sb-m-tab">SLA Alerts <span className="sb-m-count">0</span></span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Annual Leave (4 Days) • Rahul Sharma</strong>
                              <span className="sb-m-badge high">Level 1 Done</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">Pending Dept Head Final Sign-Off (SLA: 2h Remaining)</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Shift Roster Swap • Production Team B</strong>
                              <span className="sb-m-badge active">Approved</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Shift Coverage Verified • Zero Understaffing</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Travel Reimbursement • Vikram Nair</strong>
                              <span className="sb-m-badge slate">In Review</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill orange" style={{ width: "50%" }} />
                            </div>
                            <span className="sb-m-status-text overdue">Under Policy Limit • Routed to Finance Approval</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Biometric Regularization • Ananya K.</strong>
                              <span className="sb-m-badge active">Approved</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">Branch Head Confirmed On-Duty Client Visit</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Avg SLA</small>
                          <strong>1.8h</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="12" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>92%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Resolved</small>
                          <strong>18</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>100%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Coverage</small>
                          <strong>Safe</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>0 Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ROW 4: MULTI-STATE STATUTORY PAYROLL
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-payroll">
                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">Payroll Run <span className="sb-m-count">185</span></span>
                        <span className="sb-m-tab">Maharashtra <span className="sb-m-count">92</span></span>
                        <span className="sb-m-tab">Karnataka <span className="sb-m-count">64</span></span>
                        <span className="sb-m-tab">Haryana <span className="sb-m-count">29</span></span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Maharashtra Entity (Mumbai HQ) • 92 Staff</strong>
                              <span className="sb-m-badge high">Reconciled</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Attendance Synced • State PT Slab ₹200 Applied</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Karnataka Entity (Bengaluru) • 64 Staff</strong>
                              <span className="sb-m-badge high">Reconciled</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% PF &amp; ESI Computed • State PT Slab Applied</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Haryana Entity (Delhi NCR) • 29 Staff</strong>
                              <span className="sb-m-badge high">Reconciled</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Overtime &amp; LOP Deductions Verified</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Statutory Challans &amp; Bank Transfer File</strong>
                              <span className="sb-m-badge active">Generated</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">PF ECR, ESI Portal &amp; Form 24Q TDS Ready</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Reconciled</small>
                          <strong>185/185</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>100%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Entities</small>
                          <strong>03</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>Multi</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Errors</small>
                          <strong>00</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>0 Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">ERROR-FREE SALARY RUNS &amp; AUDIT READINESS</span>
                  <h3 className="sb-cb-title">
                    Automated Statutory Reconciliation Across Multiple State Rules.
                  </h3>
                  <p className="sb-cb-desc">
                    Process payroll in minutes instead of days. Automatically apply state-specific Professional Tax (PT), Provident Fund (PF), ESI, and TDS formulas with zero spreadsheet risk.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Automated Loss of Pay (LOP) and overtime sync directly from verified attendance</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Multi-state statutory compliance formulas (PF ECR, ESI portal files, state PT slabs, TDS)</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>1-click corporate bank disbursal files and automated password-protected PDF payslips</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Statutory Payroll <span className="sb-cb-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4 — WHY LATTIUMHR FOR MID-SIZED BUSINESSES (Interactive Process Cards)
            Matching Small Business Page Reference Layout with Top Notches & Accent Center Card
            ========================================================================= */}
        <section className="sb-why-lattium-section" aria-labelledby="why-lattium-heading">
          {/* Subtle background pattern & atmospheric glow */}
          <div className="sb-why-lattium-backdrop" aria-hidden="true" />
          <div className="sb-why-lattium-glow" aria-hidden="true" />

          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="sb-why-header">
              <span className="sb-why-eyebrow">✦ WHY LATTIUMHR IS BEST FOR MID-SIZED BUSINESSES ✦</span>
              <h2 id="why-lattium-heading" className="sb-why-title">
                What Makes LattiumHR Right for Mid-Sized Businesses?
              </h2>
              <p className="sb-why-subhead">
                Give your growing enterprise a unified way to manage multi-branch teams, automate complex approval hierarchies, and keep statutory payroll error-free in one connected workspace.
              </p>
            </div>

            {/* Process Cards Grid matching Reference Image */}
            <div className="sb-why-cards-grid" role="region" aria-label="Why LattiumHR Pillars for Mid-Sized Businesses">
              {whyMidSizedCards.map((card) => (
                <div
                  key={card.id}
                  className={`sb-why-process-card ${card.isFeatured ? "is-featured" : ""}`}
                >
                  {/* Top Notch Badge */}
                  <div className="sb-why-notch">
                    <span>{card.number}</span>
                  </div>

                  {/* Centered Icon Box */}
                  <div className="sb-why-icon-box">
                    {card.icon}
                  </div>

                  {/* Centered Title */}
                  <h3 className="sb-why-card-title">{card.title}</h3>

                  {/* Centered Description */}
                  <p className="sb-why-card-desc">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5 — BRAND MANIFESTO FOR MID-SIZED BUSINESSES
            ========================================================================= */}
        <section className="sb-manifesto-section" aria-labelledby="manifesto-heading">
          <div className="container sb-manifesto-container">
            <div className="sb-manifesto-layout">
              {/* Left Column: Eyebrow, Headline & Manifesto Message */}
              <div className="sb-manifesto-left">
                <span className="sb-manifesto-eyebrow">
                  ✦ A MANIFESTO FOR MID-SIZED ENTERPRISES ✦
                </span>
                <h2 id="manifesto-heading" className="sb-manifesto-headline">
                  Scaling Headcount. <span className="sb-manifesto-highlight">Zero Chaos.</span>
                </h2>
                <p className="sb-manifesto-lead">
                  “Between 50 and 500 employees, every process is tested. What worked with 20 people in a single room no longer scales across multiple branches and departments.”
                </p>
                <p className="sb-manifesto-text">
                  You shouldn't have to choose between clunky spreadsheets that invite compliance penalties, or bloated legacy systems that take half a year and millions to deploy. LattiumHR gives you exact multi-branch governance, biometric synchronization, and tiered approvals—live in weeks, not quarters.
                </p>
                <div className="sb-manifesto-punchline">
                  Your team has outgrown the startup stage. Your HR software should empower the enterprise you are becoming.
                </div>
              </div>

              {/* Right Column: Clean Action Box with Conversion Checklist */}
              <div className="sb-manifesto-right">
                <div className="sb-manifesto-action-box">
                  <h3 className="sb-manifesto-action-title">Ready to Upgrade Your Operations?</h3>
                  <p className="sb-manifesto-action-desc">
                    See how LattiumHR unifies multi-branch workforce management, statutory compliance, and payroll for 50–500 staff.
                  </p>
                  <div className="sb-manifesto-checklist">
                    <div className="sb-manifesto-check-item">
                      <span className="sb-manifesto-check-icon">✓</span>
                      <span>Unified Governance — multi-branch &amp; multi-entity control</span>
                    </div>
                    <div className="sb-manifesto-check-item">
                      <span className="sb-manifesto-check-icon">✓</span>
                      <span>Built for Scale — seamless from 50 to 500+ headcount</span>
                    </div>
                    <div className="sb-manifesto-check-item">
                      <span className="sb-manifesto-check-icon">✓</span>
                      <span>Live in 2 to 3 weeks with dedicated migration support</span>
                    </div>
                  </div>
                  <div className="sb-manifesto-btn-group">
                    <button
                      type="button"
                      className="sb-manifesto-btn"
                      onClick={handleOpenDemo}
                    >
                      Request a Mid-Market Demo <Icon name="arrow" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6 — THE MID-SIZED BUSINESS WORKSPACE (Interactive 3-Role Stage)
            ========================================================================= */}
        <section id="workspace" className="sb-workspace-role-section" aria-labelledby="perspectives-heading">
          <div className="container">
            <div className="sb-section-header center">
              <span className="sb-eyebrow">✦ THE MID-SIZED BUSINESS WORKSPACE ✦</span>
              <h2 id="perspectives-heading" className="sb-section-title">
                Everything Starts With Your People at Scale.
              </h2>
              <p className="sb-section-subhead">
                Give executive leadership, branch managers, and distributed employees dedicated visibility, fast approvals, and self-service without administrative overhead.
              </p>
            </div>

            {/* Mobile Tab Switcher Pills */}
            <div className="sb-workspace-mobile-pills" role="tablist" aria-label="Mid-Sized Business Perspectives">
              {workspaceCards.map((card, idx) => (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={activeRoleIndex === idx}
                  className={`sb-mobile-pill-btn ${activeRoleIndex === idx ? "is-active" : ""}`}
                  onClick={() => setActiveRoleIndex(idx)}
                >
                  <span className="sb-pill-num">{card.number}</span>
                  <span>{card.verticalTitle}</span>
                </button>
              ))}
            </div>

            {/* Interactive Cards Stage: Active Expanded Card Left, Fixed Vertical Strips Right */}
            <div className="sb-workspace-cards-stage">
              {(() => {
                const activeCard = workspaceCards[activeRoleIndex] || workspaceCards[0];
                return (
                  <div
                    key={activeCard.id}
                    className="sb-role-expanded-card"
                    role="tabpanel"
                    aria-labelledby={`tab-btn-${activeCard.id}`}
                  >
                    {/* Left: Info & Specs Grid */}
                    <div className="sb-role-expanded-content">
                      <h3 className="sb-role-name">{activeCard.title}</h3>
                      <p className="sb-role-description">{activeCard.desc}</p>

                      {/* Feature Points Grid */}
                      <div className="sb-workspace-points-grid">
                        {activeCard.points.map((pt, pIdx) => (
                          <div key={pIdx} className="sb-workspace-point-item">
                            <span className="sb-workspace-point-icon">
                              <Icon name="check" size={13} />
                            </span>
                            <div className="sb-workspace-point-text">
                              <span className="sb-workspace-point-title">{pt.title}</span>
                              <span className="sb-workspace-point-desc">{pt.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action CTA Button */}
                      <button
                        type="button"
                        className="sb-role-cta-btn"
                        onClick={handleOpenDemo}
                      >
                        <span className="sb-role-cta-arrow">→</span>
                        <span>{activeCard.buttonText}</span>
                      </button>
                    </div>

                    {/* Right: Portrait Visual Image */}
                    <div className="sb-role-expanded-visual">
                      <div className="sb-visual-img-frame">
                        <img
                          src={activeCard.image}
                          alt={activeCard.alt}
                          className="sb-role-img"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Fixed Right-Side Vertical Strips */}
              <div className="sb-workspace-right-strips" role="tablist" aria-label="Other Workspace Roles">
                {workspaceCards
                  .map((card, idx) => ({ card, idx }))
                  .filter(({ idx }) => idx !== activeRoleIndex)
                  .map(({ card, idx }) => (
                    <button
                      key={card.id}
                      id={`tab-btn-${card.id}`}
                      type="button"
                      role="tab"
                      aria-selected={false}
                      className="sb-role-vertical-strip"
                      onClick={() => setActiveRoleIndex(idx)}
                      title={`Click to view ${card.verticalTitle}`}
                    >
                      <span className="sb-vertical-num">{card.number}</span>
                      <span className="sb-vertical-label">{card.verticalTitle}</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7 — FREQUENTLY ASKED QUESTIONS (Mid-Sized Business HR, Answered)
            Canonical 2-column layout: Left column with heading, Right column with accordion
            ========================================================================= */}
        <section className="faq-section sb-faq-section" id="faqs" aria-labelledby="faq-heading">
          <div className="container faq-grid">
            <div>
              <div className="section-heading">
                <span className="eyebrow">QUESTIONS, ANSWERED</span>
                <h2 id="faq-heading">Mid-Sized Business HR, Answered.</h2>
                <p>
                  Everything you need to know about multi-branch governance, biometric attendance, tiered approval chains, and multi-state statutory compliance.
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
            SECTION 8 — FINAL CTA (Deep Purple Gradient Banner with Trust Checklist)
            ========================================================================= */}
        <section className="final-cta sb-final-cta-section" aria-labelledby="final-cta-heading">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">✦ READY TO SCALE OPERATIONS? ✦</span>
              <h2 id="final-cta-heading">
                Give your mid-sized business the HR system it deserves.
              </h2>
              <p>
                Join 500+ growing companies running multi-branch HR, biometric attendance, and automated statutory payroll on LattiumHR.
              </p>

              <div className="final-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={handleOpenDemo}
                >
                  Request a Free Demo <Icon name="arrow" />
                </button>
                <a href="/contact-sales" className="btn btn-secondary">
                  Talk to Sales
                </a>
              </div>

              <div className="final-points">
                <span>
                  <Icon name="check" /> Free personalized 30-min walkthrough
                </span>
                <span>
                  <Icon name="check" /> Dedicated data migration specialist
                </span>
                <span>
                  <Icon name="check" /> Live in 2 to 3 weeks with zero downtime
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

export default MidSizedBusinessPage;

