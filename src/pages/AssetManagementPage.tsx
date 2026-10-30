import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FooterCTA from "../components/common/FooterCTA";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useDemoModal } from "../context/DemoModalContext";
import "./AssetManagementPage.css";

export function AssetManagementPage() {
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
        "Centralized employee directory, verified profiles, role assignments, and organizational reporting hierarchy.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      title: "Attendance Management",
      icon: <Icon name="attendance" size={30} />,
      description:
        "Capture live biometric punches, geofenced mobile check-ins, and shift schedules tied directly to employee profiles.",
      link: "/features/attendance-management",
    },
    {
      number: "03",
      title: "Leave Management",
      icon: <Icon name="leave" size={30} />,
      description:
        "Track leave balances, auto-calculate entitlements, and route multi-level manager approvals without paperwork.",
      link: "/features/leave-management",
    },
    {
      number: "04",
      title: "Payroll Management",
      icon: <Icon name="payroll" size={30} />,
      description:
        "Disburse accurate salaries with automatic statutory compliance, tax deductions, and full asset exit clearance gates.",
      link: "/features/payroll-management",
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
      headline: "Saved ₹42+ Lakhs in lost hardware and recovered 100% of remote laptops",
      quote:
        "Before Lattium, laptops vanished whenever remote contractors or regional staff resigned. With automated digital handover slips and exit clearance gates, our missing equipment rate dropped to zero.",
      name: "Freddy Dean",
      role: "VP of IT & Infrastructure, FinScale",
      avatar: "/images/testi-avatar-1.jpg",
    },
    {
      id: 2,
      brand: "zendesk",
      headline: "Digital asset allocation takes 3 minutes on Day One of onboarding",
      quote:
        "New employees sign their digital equipment handover slips right from their phones on their first morning. High-res photo attachments and serial barcode scans eliminated all allocation disputes.",
      name: "Sarah Jenkins",
      role: "Head of People Operations, CloudScale",
      avatar: "/images/testi-avatar-2.jpg",
    },
    {
      id: 3,
      brand: "notion",
      headline: "Multi-branch IT inventory reconciled in one afternoon instead of weeks",
      quote:
        "Managing hardware across 6 regional branches used to mean messy Excel files and ghost assets. With Lattium QR barcode scanning, branch custodians audit our entire device fleet in hours.",
      name: "Rohan Mehta",
      role: "Chief Operating Officer, Apex Labs",
      avatar: "/images/leader-rohan-mehta.jpg",
    },
    {
      id: 4,
      brand: "hubspot",
      headline: "Passed our ISO 27001 physical asset audit with zero discrepancies",
      quote:
        "Auditors were blown away by our tamper-proof device history trail. We exported serialized ownership records, purchase invoices, and disposal certificates with a single click.",
      name: "Ananya Kapoor",
      role: "Chief Information Security Officer, UrbanBite",
      avatar: "/images/leader-ananya-kapoor.jpg",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 3 Core Capability Blocks (Matching Flagship Reference Layout)
  const capabilityBlocks = [
    {
      id: "hardware-inventory",
      badge: "01 Centralized Inventory",
      eyebrow: "✦ 01. HARDWARE INVENTORY ✦",
      image: "/images/asset-block-hardware.jpg",
      imageAlt: "IT professional inspecting hardware inventory and scanning QR codes on corporate devices",
      title: "Centralized Equipment Directory & Multi-Branch Tracking",
      description:
        "Maintain complete visibility into all physical devices across headquarters, regional branches, and remote workforces. Filter by branch, device model, allocation status, and warranty health in real time.",
      bullets: [
        "QR code & barcode scanning for rapid mobile physical audits",
        "Automated serial number, MAC address & IMEI cataloging",
        "Multi-branch warehouse & regional custodian mapping",
        "Real-time status tags: In-Use, In-Stock, Maintenance, or Retired",
        "Vendor purchase invoices & depreciated book value calculations",
        "Instant asset search by employee name, serial, or branch",
      ],
      callout: {
        role: "IT Asset Manager",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Serialized Fleet" },
        { value: "4,850+", label: "Active Units" },
        { value: "< 2 Mins", label: "Audit Scan" },
        { value: "0%", label: "Ghost Assets" },
      ],
    },
    {
      id: "digital-handovers",
      badge: "02 Digital Allocations",
      eyebrow: "✦ 02. DIGITAL HANDOVERS ✦",
      image: "/images/asset-block-handover.jpg",
      imageAlt: "Employee signing digital asset handover form on mobile tablet during first-day onboarding",
      title: "Frictionless Equipment Allocation & E-Signatures",
      description:
        "Equip new hires from day one without missing cables or lost serials. Auto-generate digital handover slips with photographic condition verification and legally binding employee acknowledgments.",
      bullets: [
        "Pre-configured asset welcome bundles by job role & designation",
        "Instant digital handover agreements signed directly on mobile",
        "High-resolution equipment condition capture at handover",
        "Multi-tier manager & IT department approval workflows",
        "Automatic profile binding linking assets to HR records",
        "Courier dispatch tracking for remote & hybrid team kits",
      ],
      callout: {
        role: "People Operations & IT Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "3 Mins", label: "Fast Handover" },
        { value: "100%", label: "E-Signed Records" },
        { value: "0", label: "Paper Forms" },
        { value: "24/7", label: "Self-Service Portal" },
      ],
    },
    {
      id: "lifecycle-recovery",
      badge: "03 Recovery & Compliance",
      eyebrow: "✦ 03. LIFECYCLE RECOVERY ✦",
      image: "/images/asset-block-lifecycle.jpg",
      imageAlt: "IT security manager reviewing hardware warranty logs and offboarding recovery checklists",
      title: "Warranty Tracking, Maintenance & Offboarding Recovery",
      description:
        "Never lose track of leased equipment, expiring warranties, or laptops during employee exits. Automatically trigger asset recovery checklists before payroll final settlements.",
      bullets: [
        "Proactive 30-day alerts for expiring AMC & OEM warranties",
        "Integrated maintenance repair logs with authorized vendor tracking",
        "Mandatory asset recovery clearance gating Full & Final pay runs",
        "Scrap & retirement disposal certificates with e-waste compliance",
        "Replacement hardware loaner tracking during repair cycles",
        "Immutable audit log tracking every custodian change from day one",
      ],
      callout: {
        role: "Asset Security & Audit Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "99.9%", label: "Recovery Rate" },
        { value: "30-Day", label: "Advance Alerts" },
        { value: "100%", label: "Exit Gating" },
        { value: "AES-256", label: "Audit Trail" },
      ],
    },
  ];

  // 3-Step Work Process (Catalog & Tag, Allocate & Sign, Service & Recover)
  const workflowSteps = [
    {
      number: "01",
      title: "Catalog & Barcode Tagging",
      description:
        "Log every laptop, monitor, device, and software license with serials, purchase invoices, warranty dates, and dynamic QR labels.",
      icon: <Icon name="asset" size={32} />,
    },
    {
      number: "02",
      title: "Allocate & Digital Signoff",
      description:
        "Assign equipment during onboarding with automated e-handover forms, condition photo verification, and instant employee e-signatures.",
      icon: <Icon name="document" size={32} />,
    },
    {
      number: "03",
      title: "Service, Audit & Recover",
      description:
        "Track warranty claims, conduct mobile QR physical audits, and automatically recover equipment during offboarding before final pay runs.",
      icon: <Icon name="shield" size={32} />,
    },
  ];

  // FAQ data
  const faqs = [
    {
      q: "What is Lattium Asset Management software?",
      a: "Lattium Asset Management is an enterprise cloud platform that centralizes the tracking, allocation, maintenance, and recovery of company equipment—including laptops, mobile phones, monitors, peripherals, and software licenses—seamlessly connected to employee HR profiles.",
    },
    {
      q: "How does Lattium connect assets with employee profiles?",
      a: "Because Lattium is an all-in-one HRMS, asset records are natively linked to employee master files. When an employee is onboarded, transferred between branches, or offboarded, their assigned hardware automatically updates across IT and HR directories.",
    },
    {
      q: "Can employees sign digital handover slips on their phones?",
      a: "Yes. Lattium generates mobile-friendly digital handover agreements with device serial numbers, condition photos, and terms of use. Employees sign electronically on their screen, creating an immutable legal timestamp.",
    },
    {
      q: "How does Lattium prevent laptop loss when an employee resigns?",
      a: "When an employee submits their resignation or an exit is initiated, Lattium instantly generates an Asset Recovery Checklist. The Full & Final (F&F) payroll settlement is automatically gated until the IT custodian inspects the returned equipment and issues clearance.",
    },
    {
      q: "Does Lattium support barcode and QR code physical audits?",
      a: "Yes. You can generate and print serialized QR labels or use existing manufacturer barcodes. IT teams scan labels directly using any smartphone camera, reconciling physical branch inventories in minutes without specialized barcode scanners.",
    },
    {
      q: "Can we track warranties, AMCs, and service histories?",
      a: "Yes. Lattium sends proactive 30-day and 60-day alerts before manufacturer warranties or annual maintenance contracts (AMCs) expire. It also logs every repair, vendor invoice, and loaner machine issued during servicing.",
    },
    {
      q: "Can we manage hardware spread across multiple branches and cities?",
      a: "Yes. Lattium supports multi-branch IT warehouses, regional supply closets, and remote team shipping. You can monitor stock levels per location, initiate inter-branch equipment transfers, and assign local IT custodians.",
    },
    {
      q: "Is Lattium Asset Management compliant with security audits like ISO 27001?",
      a: "Yes. Lattium maintains an immutable audit log of every custodian change, repair ticket, physical audit scan, and disposal certificate with AES-256 cloud encryption, ensuring 100% compliance during ISO 27001 and SOC 2 audits.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper asset-page-wrapper">
      <SEO
        title="Asset Management Software — IT Hardware, Inventory & Device Lifecycle Tracking | Lattium"
        description="Track hardware allocations, laptops, peripherals, serial numbers, warranties, and digital asset return handovers across all branches with Lattium HR."
        canonicalPath="/features/asset-management"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Dark Spotlight Stage + Flagship 3-Card Floating Showcase)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="asset-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Lattium Assets">
              <span>✦ LATTIUM ASSETS ✦</span>
            </div>

            {/* Title & Subtext - Updated Hero Headline */}
            <h1 id="asset-hero-title" className="emp-hero-rich-title">
              Intelligent <span className="emp-glow-text">Asset</span>
              <br className="emp-hero-br" />
              Lifecycle Management
            </h1>
            <p className="emp-hero-rich-subhead">
              Track, allocate, and recover IT hardware, company laptops, and equipment across all your branches with Lattium HR. Eliminate ghost equipment loss, capture digital e-signatures, and automate exit clearance gates.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-pill-btn-primary"
                onClick={() =>
                  openDemoModal({
                    title: "Book an Asset Management Demo",
                    subtitle:
                      "Experience serialized hardware tracking, mobile digital handovers, and offboarding exit clearance with Lattium HR.",
                  })
                }
              >
                Book a Free Demo <Icon name="arrow" size={15} />
              </button>
              <button
                type="button"
                className="emp-pill-btn-secondary"
                onClick={() => {
                  const el = document.getElementById("asset-capabilities");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Explore Capabilities
              </button>
            </div>

            {/* Trust Points */}
            <div className="emp-hero-trust-row">
              <span>
                <Icon name="check" size={13} /> 100% Serialized Hardware Tracking
              </span>
              <span>
                <Icon name="check" size={13} /> Digital E-Signed Handover Slips
              </span>
              <span>
                <Icon name="check" size={13} /> Zero Offboarding Asset Losses
              </span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Hardware Fleet Breakdown Donut Chart */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Hardware Fleet</h3>
                    <span className="emp-float-widget-sub">By Device Category</span>
                  </div>
                  <span className="emp-float-widget-badge">
                    <span className="asset-live-pulse-dot" /> Live
                  </span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#f4edf3" strokeWidth="18" fill="none" />
                    {/* Laptops & Desktops 52% (Emerald #10b981) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="68"
                      stroke="#10b981"
                      strokeWidth="18"
                      fill="none"
                      strokeDasharray="427"
                      strokeDashoffset="205"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Monitors & Workstations 30% (Plum #802B5B) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="68"
                      stroke="#802B5B"
                      strokeWidth="18"
                      fill="none"
                      strokeDasharray="427"
                      strokeDashoffset="299"
                      strokeLinecap="round"
                      transform="rotate(97 90 90)"
                    />
                    {/* Mobile & Network Gear 18% (Violet #8b5cf6) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="68"
                      stroke="#8b5cf6"
                      strokeWidth="18"
                      fill="none"
                      strokeDasharray="427"
                      strokeDashoffset="350"
                      strokeLinecap="round"
                      transform="rotate(205 90 90)"
                    />
                    {/* Center Info */}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">
                      Active Units
                    </text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">
                      4,850
                    </text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-mint" />
                    <span>Laptops (52%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-plum" />
                    <span>Monitors (30%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-violet" />
                    <span>Mobile/IT (18%)</span>
                  </div>
                </div>
              </div>

              {/* Center Main Card: Real IT Asset Management Dashboard Showcase */}
              <div className="emp-hero-center-photo-card">
                <img
                  src="/images/asset-hero-showcase.jpg"
                  alt="IT asset manager cataloging serialized corporate laptops and reviewing digital handover receipts"
                  className="emp-hero-center-img"
                  loading="eager"
                />

                {/* Top-Left Floating Live Status Pill */}
                <div className="emp-photo-status-pill">
                  <span className="emp-live-pulse" />
                  <span>Hardware Fleet Synced</span>
                </div>

                {/* Bottom Profile / Device Allocation Tag */}
                <div className="emp-photo-profile-tag">
                  <div className="emp-photo-profile-avatar">
                    <Icon name="asset" size={18} />
                  </div>
                  <div className="emp-photo-profile-text">
                    <strong>MacBook Pro 16" M3 Max • SN: C02G9012</strong>
                    <span>Allocated to Sarah Jenkins • E-Signed & Active</span>
                  </div>
                </div>
              </div>

              {/* Right Widget: Offboarding Recovery SLA & Activity */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Recovery & Audit SLA</h3>
                    <span className="emp-float-widget-sub">Exit Clearance Rate</span>
                  </div>
                  <span className="emp-float-widget-pill-green">100%</span>
                </div>

                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">4,850</strong>
                  <div className="emp-stat-meta">
                    <span>Active Assets Tracked</span>
                    <small>0 Ghost Assets • 100% Verified</small>
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
                  <span>Exit Clearance Full & Final Payroll Gate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PROBLEM SECTION (The Challenge)
            ========================================================================= */}
        <section className="emp-section emp-problem-section" id="problem">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ THE CHALLENGE ✦</span>
              <h2 className="emp-section-title">
                Company Hardware Shouldn't Disappear Into Spreadsheets
              </h2>
              <p className="emp-section-subhead">
                When equipment tracking relies on fragmented spreadsheets, unverified paper handovers, and branch silos, companies lose thousands in untracked laptops and failed audit compliance.
              </p>
            </div>

            <div className="emp-problem-grid">
              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <Icon name="asset" size={32} />
                </div>
                <h3 className="emp-problem-title">
                  Ghost Assets &<br />
                  Offboarding Loss
                </h3>
                <p className="emp-problem-desc">
                  Up to 14% of corporate laptops and equipment vanish when employees resign without automated IT clearance gates. Lattium halts exit settlements until returned equipment is physically verified.
                </p>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <Icon name="document" size={32} />
                </div>
                <h3 className="emp-problem-title">
                  Paper Handover Chaos &<br />
                  No Serial Custody
                </h3>
                <p className="emp-problem-desc">
                  Physical sign-off sheets get lost and disputes arise over who received which serial number, charger, or monitor. Digital handovers with photo condition capture ensure 100% legal accountability.
                </p>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <Icon name="shield" size={32} />
                </div>
                <h3 className="emp-problem-title">
                  Warranty Expirations &<br />
                  Audit Penalties
                </h3>
                <p className="emp-problem-desc">
                  Untracked OEM warranties lead to surprise repair bills, while missing disposal records trigger ISO 27001 audit penalties. Automated 30-day alerts keep your hardware fleet fully compliant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CORE CAPABILITY BLOCKS (3 Blocks - Matching Flagship Reference Layout)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="asset-capabilities">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ ASSET MANAGEMENT CAPABILITIES ✦</span>
              <h2 className="emp-section-title">
                Comprehensive Hardware Control from Day One to Exit
              </h2>
              <p className="emp-section-subhead">
                Eliminate ghost assets, safeguard warranties, and speed up onboarding equipment allocation with automated cloud workflows.
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
            4. WHY LATTIUM ASSETS (1 Big Card with Scenic BG + 4 Small Cards)
            ========================================================================= */}
        <section className="emp-why-choose-section" aria-labelledby="why-assets-heading">
          <div className="container">
            {/* Centered Section Header */}
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY LATTIUM ASSETS ✦</span>
              <h2 id="why-assets-heading" className="emp-section-title">
                Enterprise Asset Governance with Zero Capital Waste
              </h2>
              <p className="emp-section-subhead">
                Discover why scaling enterprises trust Lattium to eliminate ghost hardware losses, track warranties, and ensure audit compliance.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: 1 Big Card (Top Floating Metric Cards + Bottom Text) */}
              <div className="emp-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">✦ TOTAL HARDWARE CLARITY ✦</span>
                  </div>

                  {/* Floating Metric Card 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Serialized Hardware Fleet</small>
                        <strong>100% Audit-Ready</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Missing Units</span>
                  </div>

                  {/* Floating Metric Card 2 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="shield" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Offboarding Asset Recovery</small>
                        <strong>99.9% Recovery Rate</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Exit Payroll Gating</span>
                  </div>
                </div>

                {/* Bottom Narrative Copy */}
                <p className="emp-big-card-bottom-text">
                  Scattered spreadsheets and unverified handovers cause expensive hardware to vanish during offboarding. Lattium unites HR employee profiles with IT device lifecycles to protect your capital investments across all regional offices.
                </p>
              </div>

              {/* Right Column: 4 Small Cards (Equal Line Count, Standard System) */}
              <div className="emp-why-small-grid">
                {/* Card 01 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="asset" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Zero Ghost Assets</h3>
                  <p className="emp-why-card-desc">
                    Continuous synchronization between employee status and hardware allocation prevents equipment loss during employee resignations.
                  </p>
                </div>

                {/* Card 02 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="branch" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Multi-Branch Warehouses</h3>
                  <p className="emp-why-card-desc">
                    Manage regional IT supply closets, branch loaner pools, and headquarters central inventories from a single unified screen.
                  </p>
                </div>

                {/* Card 03 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="shield" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Digital Audit Readiness</h3>
                  <p className="emp-why-card-desc">
                    Export ISO 27001 and SOC 2 compliant hardware rosters, depreciated valuations, and signed handover trails in one click.
                  </p>
                </div>

                {/* Card 04 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="employee" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Native HRMS Integration</h3>
                  <p className="emp-why-card-desc">
                    Directly connected with Employee Onboarding, Role Transfers, and Full-and-Final Payroll settlement clearances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WORK PROCESS SECTION (3-Step Notch Cards Workflow)
            ========================================================================= */}
        <section className="emp-process-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="container">
            <div className="emp-process-header">
              <span className="emp-process-eyebrow">✦ HOW IT WORKS ✦</span>
              <h2 id="workflow-heading" className="emp-process-title">
                Work Smarter With A Simpler Workflow
              </h2>
              <p className="emp-process-subhead">
                A unified, automated workflow to catalog, assign, maintain, and recover company hardware across all your regional branches.
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
            6. CENTER CTA SECTION (High-Impact Mid-Page Conversion Card)
            ========================================================================= */}
        <section className="emp-center-cta-section" aria-labelledby="cta-banner-title">
          <div className="container">
            <div className="emp-center-cta-card">
              {/* Primary Color Accent Block */}
              <div className="emp-cta-primary-bar" />

              {/* Overlapping Photorealistic Image */}
              <div className="emp-cta-img-wrap">
                <img
                  src="/images/asset-process-inventory.jpg"
                  alt="IT asset management team conducting serialized hardware inventory audits"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              {/* Right Content Area */}
              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ CENTRALIZED ASSET GOVERNANCE ✦</span>
                <h2 id="cta-banner-title" className="emp-cta-title">
                  Ready to Eliminate Ghost Assets Across All Your Branches?
                </h2>
                <p className="emp-cta-desc">
                  Replace disconnected inventory spreadsheets and unrecorded equipment handovers with one unified, automated IT asset management platform. Protect every device from day-one onboarding to final offboarding.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={() =>
                      openDemoModal({
                        title: "Schedule an Asset Management Demo",
                        subtitle:
                          "Experience serialized equipment tracking, mobile digital handovers, and offboarding exit clearance with Lattium.",
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
                        title: "Talk to an IT Asset Specialist",
                        subtitle:
                          "Consult with our solutions team on multi-branch device tracking, barcode auditing, and ISO 27001 audit readiness.",
                      })
                    }
                  >
                    Talk to an Asset Specialist <Icon name="arrow" size={14} />
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
                Asset Management Is Just the Beginning
              </h2>
              <p className="emp-section-subhead">
                Asset management works best when integrated into every other HR workflow. Explore our unified platform modules.
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
            8. TESTIMONIALS SECTION (Flagship Slider)
            ========================================================================= */}
        <section className="emp-testimonials-section" aria-labelledby="testi-title">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ TESTIMONIALS ✦</span>
              <h2 id="testi-title" className="emp-section-title">
                Proven by Enterprises Managing Distributed Hardware
              </h2>
              <p className="emp-section-subhead">
                See how growing multi-branch organizations protect equipment, streamline handovers, and pass audits with Lattium.
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
                        width="48"
                        height="48"
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
            9. FAQ SECTION (Canonical 2-Column Accordion Layout)
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title="Everything You Need to Know"
                body="Common questions about serialized tracking, e-signatures, physical audits, or offboarding recovery."
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
            10. BOTTOM CONVERSION CTA BANNER (Exact Flagship Footer CTA)
            ========================================================================= */}
        <FooterCTA />
      </main>

      <Footer />
    </div>
  );
}

export default AssetManagementPage;
