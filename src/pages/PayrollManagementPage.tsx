import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useDemoModal } from "../context/DemoModalContext";
import "./PayrollManagementPage.css";

export function PayrollManagementPage() {
  const { openDemoModal } = useDemoModal();

  // State for interactive elements
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeWorkflowCard, setActiveWorkflowCard] = useState<number>(1);
  const [activeConnectedCard, setActiveConnectedCard] = useState<number | null>(null);

  const connectedModules = [
    {
      number: "01",
      title: "Employee Management",
      icon: <Icon name="employee" size={30} />,
      description:
        "Centralized employee directory, verified bank accounts, PAN/Aadhaar KYC, and salary structure history.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      title: "Attendance Management",
      icon: <Icon name="attendance" size={30} />,
      description:
        "Biometric punches, shift allowances, and overtime hours sync directly into salary calculations with zero manual data entry.",
      link: "/features/attendance-management",
    },
    {
      number: "03",
      title: "Leave Management",
      icon: <Icon name="leave" size={30} />,
      description:
        "Approved paid leaves, unapproved absences, and automatic Loss of Pay (LOP) deductions feed directly into monthly pay runs.",
      link: "/features/leave-management",
    },
    {
      number: "04",
      title: "Performance Management",
      icon: <Icon name="award" size={30} />,
      description:
        "Seamlessly connect annual appraisal ratings, milestone bonuses, and merit salary increments with compensation payroll bands.",
      link: "/features/performance-management",
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 380;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const testimonials = [
    {
      id: 1,
      brand: "stripe",
      headline: "Compressed our monthly salary processing from 5 days to 2 hours",
      quote:
        "Reconciling spreadsheets, biometric logs, and tax deductions used to consume our entire finance team every month end. Lattium automates statutory withholdings and direct bank files with 100% precision.",
      name: "Freddy Dean",
      role: "Chief Financial Officer, FinTech Horizon",
      avatar: "/images/testi-avatar-1.jpg",
    },
    {
      id: 2,
      brand: "zendesk",
      headline: "Passed our annual statutory audit with zero missing PF or TDS records",
      quote:
        "Lattium's automatic PF ECR and TDS Form 24Q generators completely eliminated our compliance headaches. Everything is pre-calculated, verified by maker-checker workflows, and audit-ready.",
      name: "Sarah Jenkins",
      role: "Head of Finance & Operations, CloudScale",
      avatar: "/images/testi-avatar-2.jpg",
    },
    {
      id: 3,
      brand: "notion",
      headline: "Seamless multi-branch salary disbursement across 12 legal entities",
      quote:
        "We operate retail branches across 8 states with different Professional Tax rates and holiday calendars. Lattium handles entity-specific salary runs and bank batch files effortlessly.",
      name: "Rohan Mehta",
      role: "VP of Finance & Treasury, Apex Retail",
      avatar: "/images/leader-rohan-mehta.jpg",
    },
    {
      id: 4,
      brand: "hubspot",
      headline: "85% reduction in employee payroll queries during tax filing season",
      quote:
        "Employees love the self-service tax declaration portal. Comparing Old vs. New tax regimes and downloading Form 16 directly from their mobile app solved our internal HR ticketing bottleneck.",
      name: "Ananya Kapoor",
      role: "Director of People Operations, UrbanBite",
      avatar: "/images/leader-ananya-kapoor.jpg",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 3 Payroll Management Capability Blocks (Matching Reference Layout)
  const capabilityBlocks = [
    {
      id: "statutory-engine",
      badge: "01 Statutory Engine",
      eyebrow: "✦ 01. 100% STATUTORY COMPLIANCE & TAX ENGINE ✦",
      image: "/images/branch-payroll.jpg",
      imageAlt: "Corporate finance executives and tax specialists reviewing statutory payroll compliance reports",
      title: "Automated Statutory Compliance & Multi-Tier Tax Engine",
      description:
        "Never fear a tax audit again. Lattium automatically computes Provident Fund (PF), ESIC, Professional Tax (PT), and TDS under both Old and New Tax Regimes with zero manual math.",
      bullets: [
        "Automated PF, ESIC, Professional Tax (PT), and Labour Welfare Fund (LWF) calculations",
        "Built-in TDS tax computation supporting both Old and New Income Tax regimes",
        "Automated PF ECR text file generator ready for direct EPFO portal upload",
        "Form 16 generation, digital signature stamping, and 24Q quarterly filing reports",
        "Gratuity provision calculator and full-and-final (FnF) exit settlements",
        "Automated statutory updates tracking state-level minimum wage amendments",
      ],
      callout: {
        role: "Tax & Compliance Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Statutory Compliant" },
        { value: "1-Click", label: "PF ECR Generation" },
        { value: "0 Fines", label: "Audit Track Record" },
        { value: "Auto", label: "Tax Regime Switch" },
      ],
    },
    {
      id: "direct-bank-payouts",
      badge: "02 Direct Bank Payouts",
      eyebrow: "✦ 02. DIRECT BANK INTEGRATION & MAKER-CHECKER CONTROLS ✦",
      image: "/images/industry-finance.jpg",
      imageAlt: "Treasury and finance specialists executing secure batch salary disbursement with two-factor authorization",
      title: "1-Click Direct Bank Disbursal & Maker-Checker Dual Controls",
      description:
        "Disburse salaries straight from your corporate bank accounts. Generate encrypted NEFT, RTGS, and IMPS batch payout files with dual-authorization maker-checker security controls.",
      bullets: [
        "Direct bank API integrations with ICICI, HDFC, Axis, SBI, and Yes Bank",
        "Encrypted bank payout batch file generator (NEFT, RTGS, and IMPS)",
        "Strict maker-checker authorization preventing unauthorized salary disbursements",
        "Real-time payment status tracking with instant failed transaction alerts",
        "Multi-entity salary disbursement across domestic and international accounts",
        "Tamper-proof audit logs recording every approval, change, and payout event",
      ],
      callout: {
        role: "Treasury & Banking Specialist",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "< 2 Mins", label: "Payout Execution" },
        { value: "256-Bit", label: "Bank Encryption" },
        { value: "Dual", label: "Maker-Checker" },
        { value: "Zero", label: "Bank File Errors" },
      ],
    },
    {
      id: "employee-self-service",
      badge: "03 Self-Service Payslips",
      eyebrow: "✦ 03. EMPLOYEE SELF-SERVICE & TAX DECLARATIONS ✦",
      image: "/images/article-payroll.jpg",
      imageAlt: "HR professional and finance lead reviewing digital employee payslips and tax deduction proofs",
      title: "Transparent Employee Self-Service & Digital Payslips",
      description:
        "Empower employees with password-protected digital payslips, an interactive tax regime simulator (Old vs. New), and instant investment proof submissions directly from mobile or desktop.",
      bullets: [
        "Password-protected, encrypted monthly payslips accessible via web and mobile app",
        "Interactive tax planner comparing deductions under Old vs. New tax regimes",
        "Online investment proof submission portal with automated document verification",
        "1-click employee reimbursement claims with receipt photo upload and approvals",
        "Annual Form 16 Part A & B instant download from employee profile",
        "Automated salary breakdown explanations reducing payroll helpdesk tickets",
      ],
      callout: {
        role: "Employee Compensation Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "Instant", label: "Payslip Delivery" },
        { value: "85%", label: "Fewer HR Queries" },
        { value: "Old vs New", label: "Tax Simulator" },
        { value: "1-Click", label: "Form 16 Download" },
      ],
    },
  ];

  // 3-Step Work Process
  const workflowSteps = [
    {
      number: "01",
      title: "Lock Inputs & Attendance",
      description:
        "Approved leaves, biometric overtime hours, Loss of Pay (LOP), and approved employee reimbursement claims lock automatically.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Verify & Authorize",
      description:
        "Maker-checker controls preview gross-to-net calculations, statutory deductions (PF, ESI, PT), and TDS withholdings with zero errors.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Disburse & Distribute",
      description:
        "Execute direct bank salary files, disburse payouts instantly, and publish encrypted digital payslips to employee self-service portals.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
  ];

  // FAQ data
  const faqs = [
    {
      q: "Does Lattium support both Old and New Income Tax Regimes?",
      a: "Yes. Lattium has native dual-tax regime calculators built into the engine. Employees can simulate their net take-home salary under both regimes, submit IT declarations, and switch regimes at the start of the financial year with full compliance.",
    },
    {
      q: "Can Lattium handle multiple company entities and branch bank accounts?",
      a: "Yes. You can manage multiple legal entities, branch-specific Professional Tax (PT) slabs across different Indian states, and multiple corporate bank accounts from a single centralized admin dashboard.",
    },
    {
      q: "How does Lattium generate bank payout files for salary disbursal?",
      a: "Lattium supports standard encrypted banking file formats (NEFT, RTGS, IMPS) compatible with all major Indian banks including HDFC, ICICI, SBI, Axis, and Yes Bank, as well as direct open banking API salary rails.",
    },
    {
      q: "How are Loss of Pay (LOP) and biometric overtime synchronized?",
      a: "Attendance punch logs, approved leaves, unpaid days, and overtime hours automatically sync in real time from Lattium Attendance and Leave modules directly into the salary calculation engine with zero manual data entry.",
    },
    {
      q: "Can Lattium generate statutory returns like PF ECR and TDS Form 24Q?",
      a: "Yes. Lattium automatically compiles and formats monthly EPFO Electronic Challan cum Return (ECR) text files, ESIC monthly return sheets, Professional Tax statements, and quarterly TDS 24Q text files for seamless government filing.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper pay-page-wrapper">
      <SEO
        title="Payroll Management Software — Automated Statutory Payroll & Direct Bank Disbursal | LattiumHR"
        description="Run 100% compliant monthly payroll in 2 clicks. Automate statutory deductions (PF, ESIC, PT, TDS), attendance sync, and instant direct bank salary payouts."
        canonicalPath="/features/payroll-management"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Dark Spotlight Stage + Plum Showcase)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="pay-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Lattium HR">
              <span>✦ LATTIUM HR ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="pay-hero-title" className="emp-hero-rich-title">
              Precision <span className="emp-glow-text">Payroll</span>
              <br className="emp-hero-br" />
              Management
            </h1>
            <p className="emp-hero-rich-subhead">
              Ready to eliminate calculation errors, automate statutory filings, and disburse salaries in two clicks with Lattium HR. Get started by booking a demo or signing up for a free trial today.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-pill-btn-primary"
                onClick={() =>
                  openDemoModal({
                    title: "Book a Payroll Management Demo",
                    subtitle:
                      "Experience 1-click salary processing, statutory compliance (PF, ESI, TDS), and direct bank disbursals with Lattium HR.",
                  })
                }
              >
                Book a Demo <Icon name="arrow" size={14} />
              </button>
              <button
                type="button"
                className="emp-pill-btn-secondary"
                onClick={() => {
                  const featSection = document.getElementById("features");
                  featSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Features
              </button>
            </div>

            {/* Trust Points */}
            <div className="emp-hero-trust-row">
              <span><Icon name="check" size={13} /> 100% Statutory Compliance Guarantee</span>
              <span><Icon name="check" size={13} /> Bank-Grade 256-Bit Financial Encryption</span>
              <span><Icon name="check" size={13} /> Zero Delayed Salary Runs</span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Payroll Breakdown Donut Chart */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Salary Run Breakdown</h3>
                    <span className="emp-float-widget-sub">Current Payroll Cycle</span>
                  </div>
                  <span className="emp-float-widget-badge">
                    <span className="pay-live-pulse-dot" /> Verified
                  </span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#F6F8F8" strokeWidth="18" fill="none" />
                    {/* Net Salary 72% (Emerald #10b981) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#10b981" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="120"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Statutory PF & Taxes 18% (Plum #004B49) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#004B49" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="350"
                      strokeLinecap="round"
                      transform="rotate(169 90 90)"
                    />
                    {/* Benefits & Claims 10% (Violet #004B49) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#004B49" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="384"
                      strokeLinecap="round"
                      transform="rotate(234 90 90)"
                    />
                    {/* Center Info */}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">Total Processed</text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">1,490</text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-mint" />
                    <span>Net Salary (72%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-plum" />
                    <span>Taxes & PF (18%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-violet" />
                    <span>Claims (10%)</span>
                  </div>
                </div>
              </div>

              {/* Center Main Card: Real Payroll Controller Processing Salaries */}
              <div className="emp-hero-center-photo-card">
                <img
                  src="/images/pay-hero-showcase.jpg"
                  alt="Finance Director and Payroll Controller reviewing monthly salary processing dashboard on wide screen in corporate office"
                  className="emp-hero-center-img"
                  loading="eager"
                />

                {/* Top-Left Floating Live Status Pill */}
                <div className="emp-photo-status-pill">
                  <span className="emp-live-pulse" />
                  <span>Payroll Disbursed</span>
                </div>
              </div>

              {/* Right Widget: Monthly Disbursal SLA & Activity */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Monthly Payout SLA</h3>
                    <span className="emp-float-widget-sub">On-Time Disbursement</span>
                  </div>
                  <span className="emp-float-widget-pill-green">100%</span>
                </div>

                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">1,490</strong>
                  <div className="emp-stat-meta">
                    <span>Salaries Disbursed This Month</span>
                    <small>0 Compliance Flags • Bank Verified</small>
                  </div>
                </div>

                {/* Modern Bar Chart */}
                <div className="emp-mini-bar-chart">
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "88%" }} />
                    <span className="emp-bar-lbl">M</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "92%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "96%" }} />
                    <span className="emp-bar-lbl">W</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "98%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col is-active">
                    <div className="emp-bar-fill" style={{ height: "100%" }} />
                    <span className="emp-bar-lbl">F</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "50%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                </div>

                {/* Bottom Verified Footnote */}
                <div className="emp-widget-footnote">
                  <Icon name="check" size={14} />
                  <span>100% Automated Statutory & Bank Sync</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PROBLEM SECTION (The Challenge)
            ========================================================================= */}
        <section className="emp-section emp-problem-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ THE CHALLENGE ✦</span>
              <h2 className="emp-section-title">
                Payroll Shouldn't Require Endless Spreadsheets & Tax Panic
              </h2>
              <p className="emp-section-subhead">
                When salary calculations rely on manual formulas, formula errors multiply, statutory filing deadlines get missed, and employees lose trust in their pay.
              </p>
            </div>

            <div className="emp-problem-grid">
              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Statutory Penalties &
                  <br />
                  Tax Regime Drift
                </h3>
                <p className="emp-problem-desc">
                  Miscalculating Provident Fund (PF), ESI caps, Professional Tax, or TDS under changing tax regimes triggers steep government penalties, interest fines, and compliance notices.
                </p>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Manual Spreadsheets &
                  <br />
                  Formula Breakage
                </h3>
                <p className="emp-problem-desc">
                  Managing overtime multiples, Loss of Pay (LOP), shift differentials, and arrears in complex Excel macros leads to chronic salary miscalculations, delayed paydays, and employee grievances.
                </p>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Delayed Salary Payouts &
                  <br />
                  Bank File Friction
                </h3>
                <p className="emp-problem-desc">
                  Generating separate banking spreadsheets by hand causes format rejections, bank batch delays, and security risks without maker-checker dual-authorization controls.
                </p>
              </div>
            </div>
          </div>

          {/* Section Divider Line */}
          <div className="emp-section-divider-line" aria-hidden="true" />
        </section>

        {/* =========================================================================
            3. PAYROLL MANAGEMENT CAPABILITIES (3 Deep Blocks)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="features">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ PAYROLL MANAGEMENT CAPABILITIES ✦</span>
              <h2 className="emp-section-title">
                Enterprise-Grade Payroll Built for Speed, Scale & Compliance
              </h2>
              <p className="emp-section-subhead">
                Explore the three core capabilities designed to eliminate formula errors, automate statutory compliance, and disburse salaries on time, every month.
              </p>
            </div>
          </div>

          {/* 3 Full Blocks */}
          <div className="emp-capability-blocks-list">
            {capabilityBlocks.map((blk, idx) => (
              <div key={blk.id} className={`emp-cap-block-wrapper emp-cap-bg-${idx}`}>
                <div className="container">
                  <article
                    id={`cap-block-${blk.id}`}
                    className="emp-reference-block-card"
                  >
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
                        <div className="emp-block-checklist-2col">
                          {blk.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="emp-block-check-item">
                              <span className="emp-block-check-icon" aria-hidden="true">
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
                          <div
                            key={sIdx}
                            className="emp-block-stat-box"
                          >
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
            4. WHY LATTIUM IS BEST FOR PAYROLL MANAGEMENT (01 Big Card + 02-05 Small Cards)
            ========================================================================= */}
        <section className="emp-why-choose-section" aria-labelledby="why-choose-title">
          <div className="container">
            {/* Centered Section Header */}
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY LATTIUM PAYROLL ✦</span>
              <h2 id="why-choose-title" className="emp-section-title">
                Payroll Automation That Works the Way Your Business Does
              </h2>
              <p className="emp-section-subhead">
                Eliminate end-of-month panic with an integrated salary engine that continuously ingests attendance, leaves, and tax data.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: 1 Big Card (Top Floating Metric Cards + Bottom Text) */}
              <div className="emp-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">
                      ✦ ZERO-ERROR SALARY PROCESSING ✦
                    </span>
                  </div>

                  {/* Floating Metric Card 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Statutory Compliance Engine</small>
                        <strong>100% Tax Compliant</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Penalty Risk</span>
                  </div>

                  {/* Floating Metric Card 2 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="shield" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Automated Attendance Sync</small>
                        <strong>1-Click Salary Run</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Manual Math</span>
                  </div>
                </div>

                {/* Bottom Narrative Copy */}
                <p className="emp-big-card-bottom-text">
                  Unlike standalone payroll software that forces you to copy-paste spreadsheet data from attendance machines and leave trackers, Lattium unifies your entire employee lifecycle into one tamper-proof financial pipeline.
                </p>
              </div>

              {/* Right Column: 4 Small Cards (Equal Line Count, No Numbers) */}
              <div className="emp-why-small-grid">
                {/* Card 01 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="payroll" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Automated Tax Calculations</h3>
                  <p className="emp-why-card-desc">
                    Auto-compute PF, ESIC, PT, and dual tax regimes (Old vs. New) with complete regulatory accuracy.
                  </p>
                </div>

                {/* Card 02 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="branch" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Multi-Branch Entity Payouts</h3>
                  <p className="emp-why-card-desc">
                    Manage multi-entity payroll runs and state-specific statutory filings through one master dashboard.
                  </p>
                </div>

                {/* Card 03 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="shield" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Maker-Checker Approvals</h3>
                  <p className="emp-why-card-desc">
                    Prevent unauthorized payouts with dual-level authorization and tamper-proof financial audit logs.
                  </p>
                </div>

                {/* Card 04 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="attendance" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Attendance & Leave Sync</h3>
                  <p className="emp-why-card-desc">
                    Loss of Pay (LOP), biometric overtime, and encashed leaves calculate directly into net take-home pay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WORK PROCESS SECTION (3 Process Cards)
            ========================================================================= */}
        <section className="emp-process-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="container">
            {/* Centered Header */}
            <div className="emp-process-header">
              <span className="emp-process-eyebrow">✦ PROCESS ✦</span>
              <h2 id="workflow-heading" className="emp-process-title">
                Work Smarter With A Simpler Workflow
              </h2>
              <p className="emp-process-subhead">
                A structured, frictionless approach to locking inputs, verifying statutory taxes, and disbursing salaries in record time.
              </p>
            </div>

            {/* 3 Process Cards */}
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
                    {/* Top Notch Semicircle with Number having full half-circle background */}
                    <div className="emp-process-notch">
                      <span className="emp-process-notch-num">{step.number}</span>
                    </div>

                    {/* Centered Icon Box */}
                    <div className="emp-process-icon-box">
                      {step.icon}
                    </div>

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
            6. CENTER CTA SECTION
            ========================================================================= */}
        <section className="emp-center-cta-section" aria-labelledby="cta-banner-title">
          <div className="container">
            <div className="emp-center-cta-card">
              {/* Primary Color Accent Block */}
              <div className="emp-cta-primary-bar" />

              {/* Overlapping Photorealistic Team Collaboration Image */}
              <div className="emp-cta-img-wrap">
                <img
                  src="/images/leave-block-payroll.jpg"
                  alt="Finance Director and HR payroll lead reviewing monthly compensation disbursements"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              {/* Right Content Area */}
              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ CONNECTED PAYROLL PLATFORM ✦</span>
                <h2 id="cta-banner-title" className="emp-cta-title">
                  Ready to Modernize Your Monthly Payroll?
                </h2>
                <p className="emp-cta-desc">
                  Replace complex formulas, manual bank files, and compliance anxiety with an automated, 100% compliant salary platform. Give your team peace of mind on payday.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={() =>
                      openDemoModal({
                        title: "Schedule a Payroll Management Demo",
                        subtitle:
                          "Experience 1-click salary processing, statutory tax calculation, and direct bank disbursals with Lattium.",
                      })
                    }
                  >
                    Book a Demo
                  </button>
                  <button
                    type="button"
                    className="emp-cta-btn-secondary"
                    onClick={() =>
                      openDemoModal({
                        title: "Talk to a Payroll Specialist",
                        subtitle:
                          "Consult with our product advisors on tax regime setup, banking API integrations, and seamless migration assistance.",
                      })
                    }
                  >
                    Talk to a Specialist <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CONNECTED HRMS MODULES (Works Better Together)
            ========================================================================= */}
        <section className="emp-section emp-connected-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WORKS BETTER TOGETHER ✦</span>
              <h2 className="emp-section-title">
                Payroll Management Is Just the Beginning
              </h2>
              <p className="emp-section-subhead">
                Connect payroll calculations with related HR workflows across the Lattium platform.
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
            8. TESTIMONIALS SECTION
            ========================================================================= */}
        <section className="emp-testimonials-section" aria-labelledby="testi-title">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ TESTIMONIALS ✦</span>
              <h2 id="testi-title" className="emp-section-title">
                What Finance & HR Leaders Say
              </h2>
              <p className="emp-section-subhead">
                Discover how forward-thinking enterprises eliminate salary calculation errors, automate tax withholdings, and disburse on time.
              </p>
            </div>

            <div className="emp-testimonials-wrap">
              <div className="emp-testimonials-track" ref={sliderRef}>
                {testimonials.map((item) => (
                  <article key={item.id} className="emp-testimonial-card">
                    <div className="emp-testi-brand">{item.brand}</div>
                    <h3 className="emp-testi-headline">{item.headline}</h3>
                    <p className="emp-testi-quote">{item.quote}</p>
                    <div className="emp-testi-author">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="emp-testi-avatar"
                        loading="lazy"
                      />
                      <div className="emp-testi-author-info">
                        <strong>{item.name}</strong>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Slider Navigation Buttons at Bottom Right */}
              <div className="emp-testi-nav-row">
                <div className="emp-testi-nav-btns">
                  <button
                    type="button"
                    className="emp-testi-arrow-btn prev"
                    onClick={() => scrollSlider("left")}
                    aria-label="Previous testimonial"
                  >
                    <Icon name="arrow" size={16} />
                  </button>
                  <button
                    type="button"
                    className="emp-testi-arrow-btn next"
                    onClick={() => scrollSlider("right")}
                    aria-label="Next testimonial"
                  >
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. FAQ SECTION
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title="Everything you need to know"
                body="Common questions about dual tax regime computation, direct bank disbursals, statutory filings, and attendance LOP sync."
              />
              <Link className="text-link" to="/faq">
                View all FAQs <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
                  <button type="button" onClick={() => toggleFaq(i)}>
                    <span>{f.q}</span>
                    <i>{openFaq === i ? "−" : "+"}</i>
                  </button>
                  {openFaq === i && <p>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            BOTTOM CONVERSION CTA BANNER
            ========================================================================= */}
        <section className="final-cta">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">READY TO SIMPLIFY PAYROLL?</span>
              <h2>Your team deserves accurate, on-time paydays.</h2>
              <p>
                Join 500+ growing businesses worldwide running HR, attendance, and payroll on
                LattiumHR.
              </p>
              <div className="final-actions">
                <Button
                  onClick={() =>
                    openDemoModal({
                      title: "Book a Payroll Management Demo",
                      subtitle:
                        "Experience 1-click salary processing, statutory compliance (PF, ESI, TDS), and direct bank disbursals with Lattium HR.",
                    })
                  }
                >
                  Book a Free Demo <Icon name="arrow" />
                </Button>
                <Button to="/contact-sales" secondary>
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

export default PayrollManagementPage;
