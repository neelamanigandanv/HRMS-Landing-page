import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useDemoModal } from "../context/DemoModalContext";
import "./AttendanceManagementPage.css";

export function AttendanceManagementPage() {
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
        "Centralized employee directory, reporting hierarchies, and verified KYC linked directly to every clock-in log.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      title: "Leave Management",
      icon: <Icon name="leave" size={30} />,
      description:
        "Approved leaves, sick days, and half-day permissions instantly reflect in attendance logs and monthly rosters.",
      link: "/features/leave-management",
    },
    {
      number: "03",
      title: "Payroll Management",
      icon: <Icon name="payroll" size={30} />,
      description:
        "Automate Loss of Pay (LOP), overtime multipliers, and shift differential allowances directly into salary slips.",
      link: "/features/payroll-management",
    },
    {
      number: "04",
      title: "Performance Management",
      icon: <Icon name="award" size={30} />,
      description:
        "Correlate punctuality scores, shift adherence, and on-time consistency with annual employee performance reviews.",
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
      headline: "Eradicated buddy punching across our 18 manufacturing facilities",
      quote:
        "Managing shift turnstiles across 18 regional factories with USB punch readers used to be an operational nightmare. With Lattium's cloud IoT biometric sync, we have zero proxy punches and real-time floor visibility.",
      name: "Freddy Dean",
      role: "VP of Plant Operations, Apex Manufacturing",
      avatar: "/images/testi-avatar-1.jpg",
    },
    {
      id: 2,
      brand: "zendesk",
      headline: "Cut monthly attendance reconciliation time from 5 days to 2 hours",
      quote:
        "Chasing missing punches, paper overtime slips, and cross-checking leave requests used to paralyze our HR team every month. Lattium's automated payroll handshake compressed reconciliation into a single afternoon.",
      name: "Sarah Jenkins",
      role: "Head of People Operations, RetailNext",
      avatar: "/images/testi-avatar-2.jpg",
    },
    {
      id: 3,
      brand: "notion",
      headline: "GPS geofencing gave us 100% visibility over 400+ on-field representatives",
      quote:
        "Our sales and medical reps operate across hundreds of hospital client locations. With customizable GPS geofencing polygons, our team checks in smoothly on their mobile app while leadership tracks verified presence.",
      name: "Rohan Mehta",
      role: "Chief Operating Officer, LogiTransit",
      avatar: "/images/leader-rohan-mehta.jpg",
    },
    {
      id: 4,
      brand: "hubspot",
      headline: "Managing 24/7 rotational night shifts without fatigue or clashes",
      quote:
        "Lattium's visual shift planner automatically alerts us if an employee is scheduled with insufficient rest between shifts or if a critical ward is understaffed. It has completely modernized our hospital shift management.",
      name: "Ananya Kapoor",
      role: "Director of Workforce Planning, Metro Health",
      avatar: "/images/leader-ananya-kapoor.jpg",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 3 Attendance Management Capability Blocks (Matching Reference Layout)
  const capabilityBlocks = [
    {
      id: "touchless-biometrics",
      badge: "01 Touchless Biometrics",
      eyebrow: "✦ 01. TOUCHLESS BIOMETRIC & FACIAL RECOGNITION ✦",
      image: "/images/att-hero-showcase.jpg",
      imageAlt: "Touchless AI facial recognition scanner verifying employee attendance at modern office entrance",
      title: "Touchless AI Facial Recognition & Biometric Terminal Sync",
      description:
        "Deploy tamper-proof biometric terminals and AI facial recognition scanners that authenticate employees in under 0.8 seconds with liveness detection, completely eradicating buddy punching.",
      bullets: [
        "Sub-second AI facial recognition with 3D dual-camera liveness detection",
        "Native IoT hardware sync with Suprema, ZKTeco, and Matrix devices",
        "Offline punch buffer mode during network drops with auto cloud replay",
        "Centralized cloud enrollment across all headquarters and satellite branches",
        "Touchless kiosk mode for tablet mounts in high-traffic reception zones",
        "Strict biometric encryption complying with GDPR and DPDP data safety",
      ],
      callout: {
        role: "Workforce Systems Architect",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "< 0.8s", label: "Face Scan Speed" },
        { value: "100%", label: "Proxy Punch Proof" },
        { value: "99.9%", label: "Hardware Uptime" },
        { value: "Offline", label: "Local Buffer Mode" },
      ],
    },
    {
      id: "geofence-mobile",
      badge: "02 GPS Geofencing",
      eyebrow: "✦ 02. GEOFENCED MOBILE CLOCK-IN & ROSTER PLANNER ✦",
      image: "/images/att-block-geofence.jpg",
      imageAlt: "Employee using GPS geofenced mobile attendance app on smartphone with verified location circle",
      title: "GPS Geofenced Mobile Attendance & Rotational Shift Planner",
      description:
        "Empower hybrid, on-field, and multi-shift teams to clock in securely from their smartphones with customizable polygonal geofences, IP-range fencing, and visual rotational shift rosters.",
      bullets: [
        "Configurable polygonal GPS geofencing around client sites and branch perimeters",
        "Dynamic rotational shift planning with automated clash and fatigue alerts",
        "Wi-Fi BSSID and static office IP-range restrictions for remote punch verification",
        "Self-service mobile shift swapping and manager overtime pre-authorizations",
        "Live field rep location tagging during customer client visits and on-duty travel",
        "Automated grace period rules and customizable late-coming deduction policies",
      ],
      callout: {
        role: "Operations & Mobility Specialist",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "15m", label: "GPS Precision" },
        { value: "24/7", label: "Shift Flexibility" },
        { value: "Instant", label: "Shift Swap Workflow" },
        { value: "Real-Time", label: "Field Geo-Tracking" },
      ],
    },
    {
      id: "overtime-payroll",
      badge: "03 Payroll Integration",
      eyebrow: "✦ 03. AUTOMATED OVERTIME & PAYROLL RECONCILIATION ✦",
      image: "/images/att-block-overtime.jpg",
      imageAlt: "Operations managers reviewing automated attendance and shift roster schedules on digital screens",
      title: "Automated Overtime Reconciliation & 1-Click Payroll Sync",
      description:
        "Say goodbye to end-of-month attendance panic. LattiumHR continuously ingests approved punches, leaves, holidays, and overtime rules directly into the payroll engine for zero-error calculations.",
      bullets: [
        "Continuous real-time punch ingestion into statutory payroll processing engines",
        "Configurable multi-tier overtime calculations (1.5x, 2.0x, night differential)",
        "Automated Loss of Pay (LOP) computations tied to approved leaves and holidays",
        "Exceptions manager highlighting missing punches, half-days, and roster anomalies",
        "Manager maker-checker approval workflows before monthly payroll freeze",
        "Audit-ready time card export in PDF, Excel, and statutory compliance formats",
      ],
      callout: {
        role: "Statutory Payroll Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "0 Days", label: "Pre-Payroll Wait" },
        { value: "100%", label: "Formula Accuracy" },
        { value: "1-Click", label: "Salary Sync" },
        { value: "Audit-Ready", label: "Statutory Proof" },
      ],
    },
  ];

  // 3-Step Work Process
  const workflowSteps = [
    {
      number: "01",
      title: "Capture & Authenticate",
      description:
        "Employees clock in via AI facial recognition kiosks, biometric hardware, or GPS geofenced mobile apps with sub-second verification.",
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
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Schedule & Shift Sync",
      description:
        "Managers build rotational shift rosters, monitor real-time branch headcounts, and approve overtime or shift swaps instantly.",
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
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "1-Click Payroll Handshake",
      description:
        "Validated hours, overtime rules, Loss of Pay (LOP), and approved leaves feed straight into salary processing with zero calculation errors.",
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
  ];

  // FAQ data
  const faqs = [
    {
      q: "How does Lattium prevent buddy punching and unauthorized proxy clock-ins?",
      a: "Lattium combines 3D facial recognition liveness detection, device-locked mobile tokens, and real-time biometric terminal sync. Geofencing ensures mobile check-ins can only happen inside verified office GPS polygons or company Wi-Fi networks.",
    },
    {
      q: "Can Lattium integrate with our existing biometric fingerprint or face scanners?",
      a: "Yes. Lattium has native cloud IoT connectors for popular enterprise hardware like Suprema, ZKTeco, Matrix, Essl, and Realtime. Devices sync punches to the cloud continuously with zero manual USB downloads or batch CSV scripts.",
    },
    {
      q: "How does mobile geofenced attendance work for field and remote staff?",
      a: "HR admins define geographic boundaries (geofences) around customer sites, construction locations, or branch offices with customizable radius meters. Employees clock in via the Lattium iOS/Android app only when their GPS coordinates match the designated perimeter.",
    },
    {
      q: "Can the platform handle flexible shift rotations, night shifts, and split shifts?",
      a: "Yes. Lattium includes a dynamic shift roster planner supporting morning, evening, rotational night shifts (spanning across midnight), and split shifts with automated clash detection and mandatory rest period alerts.",
    },
    {
      q: "How does attendance data sync with monthly payroll and overtime calculations?",
      a: "Attendance logs, approved leaves, public holidays, and overtime rules are pre-integrated into Lattium Payroll. Loss of Pay (LOP), late-coming deductions, and overtime multiples are automatically calculated without manual data transfers.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper att-page-wrapper">
      <SEO
        title="Attendance Management Software — Biometric, Geofencing & Shift Roster System | LattiumHR"
        description="Eliminate time theft, automate shift rosters, and sync biometric punches directly to payroll. Cloud-native attendance tracking for multi-branch organizations."
        canonicalPath="/features/attendance-management"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Dark Spotlight Stage + Plum Showcase)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="att-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Lattium HR">
              <span>✦ LATTIUM HR ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="att-hero-title" className="emp-hero-rich-title">
              Precision <span className="emp-glow-text">Attendance</span>
              <br className="emp-hero-br" />
              Management
            </h1>
            <p className="emp-hero-rich-subhead">
              Ready to eliminate time theft, streamline rotational shift rosters, and connect biometric punches directly into payroll with Lattium HR. Get started by booking a demo or signing up for a free trial today.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-pill-btn-primary"
                onClick={() =>
                  openDemoModal({
                    title: "Book an Attendance Management Demo",
                    subtitle:
                      "Experience touchless facial recognition, GPS geofencing, and automated payroll sync with Lattium HR.",
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
              <span><Icon name="check" size={13} /> Sub-second AI Facial Recognition</span>
              <span><Icon name="check" size={13} /> 100% India Data Residency</span>
              <span><Icon name="check" size={13} /> Zero Proxy Punch Guarantee</span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Attendance Distribution Donut Chart */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Today's Punctuality</h3>
                    <span className="emp-float-widget-sub">By Clock-In Mode</span>
                  </div>
                  <span className="emp-float-widget-badge">
                    <span className="att-live-pulse-dot" /> Live
                  </span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#f4edf3" strokeWidth="18" fill="none" />
                    {/* On-Time 82% (Emerald #10b981) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#10b981" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="77"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Grace Period 12% (Plum #7b2958) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#7b2958" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="375"
                      strokeLinecap="round"
                      transform="rotate(205 90 90)"
                    />
                    {/* Remote Geofence 6% (Violet #8b5cf6) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#8b5cf6" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="401"
                      strokeLinecap="round"
                      transform="rotate(248 90 90)"
                    />
                    {/* Center Info */}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">Total Punches</text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">1,840</text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-mint" />
                    <span>On-Time (82%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-plum" />
                    <span>Grace (12%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-violet" />
                    <span>Geofence (6%)</span>
                  </div>
                </div>
              </div>

              {/* Center Main Card: Real Attendance Facial Recognition Terminal in Action */}
              <div className="emp-hero-center-photo-card">
                <img
                  src="/images/att-hero-showcase.jpg"
                  alt="Employee seamlessly clocking in using AI facial recognition kiosk terminal in modern corporate office"
                  className="emp-hero-center-img"
                  loading="eager"
                />

                {/* Top-Left Floating Live Status Pill */}
                <div className="emp-photo-status-pill">
                  <span className="emp-live-pulse" />
                  <span>Biometric Sync Live</span>
                </div>
              </div>

              {/* Right Widget: Shift Roster & Attendance Activity */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Shift Adherence</h3>
                    <span className="emp-float-widget-sub">Weekly Presence Rate</span>
                  </div>
                  <span className="emp-float-widget-pill-green">98.6%</span>
                </div>

                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">482</strong>
                  <div className="emp-stat-meta">
                    <span>Active On-Duty Staff</span>
                    <small>0 Buddy Punches • Sync Active</small>
                  </div>
                </div>

                {/* Modern Bar Chart */}
                <div className="emp-mini-bar-chart">
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "88%" }} />
                    <span className="emp-bar-lbl">M</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "94%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "96%" }} />
                    <span className="emp-bar-lbl">W</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "92%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col is-active">
                    <div className="emp-bar-fill" style={{ height: "99%" }} />
                    <span className="emp-bar-lbl">F</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "76%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                </div>

                {/* Bottom Verified Footnote */}
                <div className="emp-widget-footnote">
                  <Icon name="check" size={14} />
                  <span>100% Real-Time Biometric & GPS Sync</span>
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
                Time Tracking Shouldn't Be Trapped in Spreadsheets
              </h2>
              <p className="emp-section-subhead">
                When employee attendance is captured through isolated biometric readers, paper logs, and manual spreadsheets, payroll errors multiply and accountability disappears.
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Time Theft &
                  <br />
                  Buddy Punching
                </h3>
                <p className="emp-problem-desc">
                  Traditional RFID swipe cards and unverified clock-in methods allow proxy punching between co-workers. Companies lose up to 4.5% of gross payroll annually paying for unworked hours and fraudulent attendance logs.
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
                  Manual Roster
                  <br />
                  Scheduling Chaos
                </h3>
                <p className="emp-problem-desc">
                  Building rotational shift schedules across branches and night shifts in spreadsheets causes double-bookings, understaffed floors, and unrecorded shift swaps, triggering employee fatigue and dispute escalations.
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
                  Pre-Payroll
                  <br />
                  Reconciliation Lag
                </h3>
                <p className="emp-problem-desc">
                  HR teams spend 4–6 business days each month chasing missing punch exceptions, manual sign-offs, and overtime slips. Disconnected payroll leads to salary delays, inaccurate Loss of Pay (LOP), and compliance audit failures.
                </p>
              </div>
            </div>
          </div>

          {/* Section Divider Line */}
          <div className="emp-section-divider-line" aria-hidden="true" />
        </section>

        {/* =========================================================================
            3. ATTENDANCE MANAGEMENT CAPABILITIES (3 Deep Blocks)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="features">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ ATTENDANCE MANAGEMENT CAPABILITIES ✦</span>
              <h2 className="emp-section-title">
                Everything You Need for Accurate Workforce Time Tracking
              </h2>
              <p className="emp-section-subhead">
                Explore the three core capabilities designed to eliminate proxy clock-ins, streamline multi-shift rosters, and link attendance straight to payroll.
              </p>
            </div>
          </div>

          {/* 3 Full Blocks: Each with distinct outside background color & generous spacing */}
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

                    {/* Bottom Deck: 4 Compact Stats Cards (Uniform Clean Style) */}
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
            4. WHY LATTIUM IS BEST FOR ATTENDANCE MANAGEMENT (01 Big Card + 02-05 Small Cards)
            ========================================================================= */}
        <section className="emp-why-choose-section" aria-labelledby="why-choose-title">
          <div className="container">
            {/* Centered Section Header */}
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY LATTIUM ATTENDANCE ✦</span>
              <h2 id="why-choose-title" className="emp-section-title">
                Time Tracking That Works the Way Your Workforce Does
              </h2>
              <p className="emp-section-subhead">
                Capture verified presence across distributed branches, field teams, and factory shifts through one centralized cloud HRMS.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: 1 Big Card (Top Floating Metric Cards + Bottom Text) */}
              <div className="emp-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">
                      ✦ MULTI-MODAL TIME CAPTURE ✦
                    </span>
                  </div>

                  {/* Floating Metric Card 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Verified Live Attendance</small>
                        <strong>99.9% Punch Accuracy</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Buddy Punching</span>
                  </div>

                  {/* Floating Metric Card 2 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="shield" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Pre-Payroll Automation</small>
                        <strong>1-Click Salary Sync</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Manual Chasing</span>
                  </div>
                </div>

                {/* Bottom Narrative Copy */}
                <p className="emp-big-card-bottom-text">
                  Whether your employees work from manufacturing plants, corporate headquarters, or on-field client deployments, Lattium unifies biometric hardware, GPS geofencing, and shift schedules into one real-time cloud stream with zero manual data transfers.
                </p>
              </div>

              {/* Right Column: 4 Small Cards (Equal Line Count, No Numbers) */}
              <div className="emp-why-small-grid">
                {/* Card 01 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="attendance" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Touchless Biometric Terminals</h3>
                  <p className="emp-why-card-desc">
                    Deploy AI facial recognition and IoT fingerprint hardware that work offline and sync immediately.
                  </p>
                </div>

                {/* Card 02 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="branch" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Configurable GPS Geofencing</h3>
                  <p className="emp-why-card-desc">
                    Lock mobile clock-ins strictly within office campuses, client locations, or remote work perimeters.
                  </p>
                </div>

                {/* Card 03 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="clock" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Rotational Shift Scheduling</h3>
                  <p className="emp-why-card-desc">
                    Build 24/7 morning, night, and alternating shifts with automated shift clash warnings and rest intervals.
                  </p>
                </div>

                {/* Card 04 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="payroll" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Automated Overtime & LOP Sync</h3>
                  <p className="emp-why-card-desc">
                    Loss of Pay, night differentials, and approved overtime hours calculate directly into salary payslips.
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
                A structured, frictionless approach to capturing punches, scheduling shifts, and reconciling payroll with zero manual calculations.
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
                  src="/images/att-process-workforce.jpg"
                  alt="Workforce leaders reviewing real-time attendance dashboard and punch logs"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              {/* Right Content Area */}
              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ CONNECTED TIME & ATTENDANCE ✦</span>
                <h2 id="cta-banner-title" className="emp-cta-title">
                  Ready to Modernize Workforce Attendance?
                </h2>
                <p className="emp-cta-desc">
                  Replace disconnected punch machines, manual spreadsheets, and overtime disputes with one unified, automated attendance system. Keep every shift verified and compliant from day one.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={() =>
                      openDemoModal({
                        title: "Schedule an Attendance Management Demo",
                        subtitle:
                          "Experience touchless biometrics, GPS geofencing, and automated payroll sync with Lattium.",
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
                        title: "Talk to an Attendance Specialist",
                        subtitle:
                          "Consult with our product advisors on hardware terminal compatibility, shift roster policies, and seamless migration assistance.",
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
                Attendance Management Is Just the Beginning
              </h2>
              <p className="emp-section-subhead">
                Connect attendance logs with related HR workflows across the Lattium platform.
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
                What Operations & HR Leaders Say
              </h2>
              <p className="emp-section-subhead">
                Discover how growing organizations eliminate proxy punching, accelerate shift scheduling, and achieve 100% attendance accuracy.
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
                body="Common questions about touchless biometric hardware, GPS geofencing perimeters, shift rosters, and payroll synchronization."
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
              <span className="eyebrow">READY TO SIMPLIFY TIME TRACKING?</span>
              <h2>Your workforce deserves better than punch cards.</h2>
              <p>
                Join 500+ growing businesses worldwide running HR, attendance, and payroll on
                LattiumHR.
              </p>
              <div className="final-actions">
                <Button
                  onClick={() =>
                    openDemoModal({
                      title: "Book an Attendance Management Demo",
                      subtitle:
                        "Experience touchless biometrics, GPS geofencing, and automated payroll sync with Lattium HR.",
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

export default AttendanceManagementPage;
