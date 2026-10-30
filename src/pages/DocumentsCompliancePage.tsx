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
import "./DocumentsCompliancePage.css";

export function DocumentsCompliancePage() {
  const { openDemoModal } = useDemoModal();

  // State for interactive elements
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeWorkflowCard, setActiveWorkflowCard] = useState<number>(0);
  const [activeConnectedCard, setActiveConnectedCard] = useState<number | null>(null);

  const handleOpenDemo = () => {
    openDemoModal({
      title: "Request a Documents & Compliance Demo",
      subtitle:
        "See how LattiumHR helps teams organize employee records, track document expirations, and stay audit-ready.",
      defaultInterest: "Documents & Compliance",
    });
  };

  // Connected HR Modules (How It Works Together)
  const connectedModules = [
    {
      number: "01",
      title: "Employee Management",
      icon: <Icon name="employee" size={30} />,
      description:
        "Documents attach directly to master employee profiles, ensuring personal records, KYC proofs, and employment contracts stay unified.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      title: "Recruitment & Onboarding",
      icon: <Icon name="role" size={30} />,
      description:
        "Collect statutory KYC, educational certificates, and signed offer letters digitally before Day 1 without paper bottlenecks.",
      link: "/features/recruitment",
    },
    {
      number: "03",
      title: "Payroll Management",
      icon: <Icon name="payroll" size={30} />,
      description:
        "Verified PAN, Aadhaar, PF/ESI numbers, and investment declarations flow directly into salary processing with zero tax discrepancies.",
      link: "/features/payroll-management",
    },
    {
      number: "04",
      title: "Asset Management",
      icon: <Icon name="asset" size={30} />,
      description:
        "Store digital equipment handover receipts, signed NDA forms, and asset return clearances in each team member's audit file.",
      link: "/features/asset-management",
    },
  ];

  // 3 Core Capability Blocks (Matching Flagship Reference Layout - supported features only)
  const capabilityBlocks = [
    {
      id: "document-storage",
      badge: "01 Document Storage",
      eyebrow: "✦ 01. SECURE DOCUMENT STORAGE ✦",
      image: "/images/doc-block-storage.jpg",
      imageAlt: "HR operations specialist organizing digital employee document records on laptop in modern office",
      title: "Secure Document Storage & Unified Employee Records",
      description:
        "Eliminate lost paperwork and disorganized desktop folders. Store identity proofs, contracts, certifications, increment letters, and tax declarations directly under each employee's master digital profile in one centralized cloud vault.",
      bullets: [
        "Structured digital folders categorized by KYC, employment, credentials, and tax",
        "Direct association of uploaded files to employee master profiles and history",
        "Support for all standard formats including PDF, DOCX, scans, and images",
        "Instant search-as-you-type retrieval by employee name, ID, or document type",
        "Bulk document upload with automated file naming and employee tagging",
        "Immutable audit trails recording upload timestamps, versions, and viewer history",
      ],
      callout: {
        role: "Head of People Operations",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Digital Records" },
        { value: "0", label: "Lost Documents" },
        { value: "< 50ms", label: "Search Retrieval" },
        { value: "AES-256", label: "Cloud Encryption" },
      ],
    },
    {
      id: "expiry-tracking",
      badge: "02 Expiry Tracking",
      eyebrow: "✦ 02. PROACTIVE EXPIRY TRACKING ✦",
      image: "/images/doc-block-expiry.jpg",
      imageAlt: "HR compliance specialist reviewing document expiration alerts and renewals on tablet with checklist",
      title: "Automated Expiry Tracking & Timely Renewal Follow-Ups",
      description:
        "Stay ahead of critical deadlines without manual spreadsheet tracking. LattiumHR automatically monitors expiry dates across passports, work visas, commercial licenses, statutory permits, and employment agreements with timely renewal notifications.",
      bullets: [
        "Configurable multi-tier advance alerts at 90, 60, 30, and 7 days before expiry",
        "Centralized visual expiry calendar giving HR and managers complete visibility",
        "One-click renewal request notifications sent directly to employees via app and email",
        "Color-coded status tags: Verified, Expiring Soon, Under Renewal, and Expired",
        "Automated manager escalations when mandatory renewals remain pending",
        "Exportable document validity reports ready for labor audits and management review",
      ],
      callout: {
        role: "Compliance & Audit Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "30-Day", label: "Advance Warning" },
        { value: "100%", label: "Renewal Tracking" },
        { value: "Zero", label: "Expiry Penalties" },
        { value: "Live", label: "Timeline Alerts" },
      ],
    },
    {
      id: "compliance-access",
      badge: "03 Checklists & Access",
      eyebrow: "✦ 03. COMPLIANCE & ACCESS CONTROL ✦",
      image: "/images/doc-block-compliance.jpg",
      imageAlt: "Corporate compliance officers in boardroom reviewing audit readiness checklist and security controls",
      title: "Statutory Compliance Checklists & Granular Access Control",
      description:
        "Maintain airtight statutory compliance while protecting sensitive employee information. Enforce mandatory document verification checklists by role, grant granular role-based permissions, and log digital policy acknowledgments.",
      bullets: [
        "Mandatory document submission checklists customized by job role and branch",
        "Granular role-based permissions ensuring sensitive files remain strictly confidential",
        "Digital policy acknowledgment tracking with verifiable employee timestamps",
        "Bank-grade AES-256 encryption at rest and TLS 1.3 encryption in transit",
        "Self-service document upload portal accessible from web browser or mobile",
        "One-click compliance audit-pack exports for labor officers and ISO audits",
      ],
      callout: {
        role: "Chief Information Security Officer",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Audit Readiness" },
        { value: "Granular", label: "Role Permissions" },
        { value: "TLS 1.3", label: "In-Transit Security" },
        { value: "0", label: "Data Leakage" },
      ],
    },
  ];

  // 4-Step Work Process (Workflow: Upload or collect -> Organize records -> Track requirements -> Review and renew)
  const workflowSteps = [
    {
      number: "01",
      title: "Upload or Collect Documents",
      description:
        "Collect required paperwork digitally during candidate onboarding or upload existing employee records in bulk with automated tagging.",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Organize Records",
      description:
        "Automatically file documents into structured, encrypted categories tied directly to each team member's master employee profile.",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          <line x1="12" y1="11" x2="12" y2="17" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Track Requirements",
      description:
        "Evaluate mandatory compliance checklists, identify missing paperwork, and monitor upcoming expiration dates in real time.",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Review and Renew",
      description:
        "Receive advance expiry alerts, trigger one-click renewal follow-ups with employees, and maintain 100% audit readiness year-round.",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
      ),
    },
  ];

  // Testimonials
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
      headline: "Passed our annual statutory audit with zero missing document flags",
      quote:
        "Before LattiumHR, our document records were scattered across Google Drive, desktop folders, and physical filing cabinets. Now, every employee has an encrypted profile with complete Aadhaar, PAN, and contract verification.",
      name: "Ananya Kapoor",
      role: "Head of Talent & Compliance, UrbanBite",
      avatar: "/images/leader-ananya-kapoor.jpg",
    },
    {
      id: 2,
      brand: "zendesk",
      headline: "Automated expiry alerts saved us from costly visa and license penalties",
      quote:
        "With over 400 field technicians and overseas consultants, tracking license expiration dates used to keep our legal team up at night. The 60-day automated reminder alerts completely solved our renewal delays.",
      name: "Rohan Mehta",
      role: "Chief Operating Officer, Apex Labs",
      avatar: "/images/leader-rohan-mehta.jpg",
    },
    {
      id: 3,
      brand: "notion",
      headline: "Self-service document collection cut onboarding paperwork by 80%",
      quote:
        "New hires upload their statutory identity proofs and signed agreements before Day 1 through the mobile portal. Our HR managers just click verify, and the records file into the compliance vault automatically.",
      name: "Sarah Jenkins",
      role: "VP of People Operations, CloudScale",
      avatar: "/images/testi-avatar-2.jpg",
    },
    {
      id: 4,
      brand: "hubspot",
      headline: "Strict role-based privacy gives our leadership total peace of mind",
      quote:
        "Confidential compensation letters and health insurance records are isolated with bank-grade encryption. Department managers only see what they need, while HR admins retain complete governance.",
      name: "Freddy Dean",
      role: "Co-Founder, Modern FinTech",
      avatar: "/images/testi-avatar-1.jpg",
    },
  ];

  // FAQ covering the exact requested topics: Document types, document access, expiry tracking, compliance records
  const faqs = [
    {
      q: "What types of employee documents can be stored in LattiumHR?",
      a: "LattiumHR supports all standard employee paperwork including government identity proofs (Aadhaar, PAN, Passport, Voter ID), signed employment contracts, appointment & increment letters, educational degrees, professional certifications, driving & equipment licenses, tax declarations, and custom company policy forms in PDF, DOCX, and high-resolution image formats.",
    },
    {
      q: "Who has access to view, upload, and download employee documents?",
      a: "Document access is governed by strict, customizable role-based permissions. Employees can view and upload their own self-service documents, reporting managers can review assigned team submissions, and HR administrators maintain full access with granular download and deletion permissions. All access events are logged in an immutable audit trail.",
    },
    {
      q: "How does automated document expiry tracking and notification work?",
      a: "When a document with a validity date (such as a passport, work visa, commercial driving permit, or regulatory license) is uploaded, LattiumHR logs the expiration timeline. The system automatically triggers configurable notifications at 90, 60, 30, and 7 days before expiry to both the employee and HR lead, ensuring timely renewals without manual follow-up.",
    },
    {
      q: "How does LattiumHR help with statutory compliance and labor audits?",
      a: "LattiumHR provides pre-configured compliance checklists tailored to statutory labor guidelines. HR teams can monitor missing mandatory records across departments in real time and generate one-click, audit-ready compliance dossiers whenever labor inspectors or statutory auditors request records.",
    },
    {
      q: "How are confidential employee documents protected and encrypted?",
      a: "All documents uploaded to LattiumHR are secured with bank-grade AES-256 cloud encryption at rest and TLS 1.3 protocol encryption during transit. Data is stored in certified, enterprise-tier cloud environments with daily automated backups and zero unauthorized third-party sharing.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper doc-page-wrapper">
      <SEO
        title="Documents & Compliance Management Software — Centralized Employee Records | LattiumHR"
        description="Keep employee documents organized. Stay compliance-ready. Secure cloud storage, automated expiry tracking, compliance checklists, and role-based access control with LattiumHR."
        canonicalPath="/features/documents-compliance"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Dark Spotlight Stage + Dual Action Buttons + Floating Showcase)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="doc-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Documents and Compliance">
              <span>✦ DOCUMENTS & COMPLIANCE ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="doc-hero-title" className="emp-hero-rich-title">
              Keep Employee Documents Organized.
              <br className="emp-hero-br" />
              <span className="emp-glow-text">Stay Compliance-Ready.</span>
            </h1>
            <p className="emp-hero-rich-subhead">
              Centralize employee files, track document renewals with advance expiry alerts, enforce statutory checklists, and protect sensitive workforce data with bank-grade access control.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-pill-btn-primary"
                onClick={handleOpenDemo}
              >
                Book a Free Demo <Icon name="arrow" size={15} />
              </button>
              <button
                type="button"
                className="emp-pill-btn-secondary"
                onClick={() => {
                  const el = document.getElementById("capabilities");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Explore Capabilities
              </button>
            </div>

            {/* Trust Points */}
            <div className="emp-hero-trust-row">
              <span>
                <Icon name="check" size={13} /> No credit card required
              </span>
              <span>
                <Icon name="check" size={13} /> AES-256 Cloud Encrypted
              </span>
              <span>
                <Icon name="check" size={13} /> 100% India Statutory Ready
              </span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE STAGE */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Document Verification & Compliance Distribution */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Document Status</h3>
                    <span className="emp-float-widget-sub">By Compliance Level</span>
                  </div>
                  <span className="doc-status-badge-verified">
                    <span className="doc-live-pulse-dot" /> 98.4% Compliant
                  </span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#f4edf3" strokeWidth="18" fill="none" />
                    {/* KYC Verified 72% (#802B5B) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#802B5B" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="120"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Active Contracts 18% (#10b981) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#10b981" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="350"
                      strokeLinecap="round"
                      transform="rotate(60 90 90)"
                    />
                    {/* Under Renewal 10% (#f59e0b) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#f59e0b" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="384"
                      strokeLinecap="round"
                      transform="rotate(145 90 90)"
                    />
                  </svg>
                  <div className="emp-donut-center-text">
                    <strong style={{ fontSize: "1.45rem" }}>1,285</strong>
                    <small>Total Files</small>
                  </div>
                </div>

                <div style={{ marginTop: "12px" }}>
                  <div className="doc-widget-metric-row">
                    <span className="doc-widget-metric-label">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#802B5B" }} />
                      KYC & Identity Proofs
                    </span>
                    <strong className="doc-widget-metric-val">100% Verified</strong>
                  </div>
                  <div className="doc-widget-metric-row">
                    <span className="doc-widget-metric-label">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                      Employment Contracts
                    </span>
                    <strong className="doc-widget-metric-val">98.2% Active</strong>
                  </div>
                  <div className="doc-widget-metric-row">
                    <span className="doc-widget-metric-label">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                      Expiring in 30 Days
                    </span>
                    <strong className="doc-widget-metric-val">18 Documents</strong>
                  </div>
                </div>
              </div>

              {/* Center Widget: High-Res UI Showcase Mockup */}
              <div className="emp-hero-float-card emp-hero-center-mockup">
                <div className="emp-browser-bar">
                  <div className="emp-browser-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <div className="emp-browser-url-pill">
                    <Icon name="shield" size={11} />
                    <span>lattium.app/features/documents-compliance</span>
                  </div>
                  <span className="emp-browser-live-badge">
                    <span className="doc-live-pulse-dot" /> Audit-Ready
                  </span>
                </div>

                <div className="doc-hero-showcase-frame">
                  <img
                    src="/images/doc-hero-showcase.jpg"
                    alt="LattiumHR Documents and Compliance Overview Dashboard showing employee document cards and expiry alerts"
                    className="doc-hero-mockup-img"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Right Widget: Upcoming Expirations Live Tracker */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Expiry Watchlist</h3>
                    <span className="emp-float-widget-sub">Next 30 Days</span>
                  </div>
                  <span className="doc-status-badge-alert">
                    <Icon name="clock" size={12} /> 18 Alerts
                  </span>
                </div>

                <div className="doc-expiry-list">
                  <div className="doc-expiry-item">
                    <div>
                      <strong>Commercial Driving License</strong>
                      <small>Rajesh Kumar • Logistics</small>
                    </div>
                    <span className="doc-expiry-days orange">12d left</span>
                  </div>

                  <div className="doc-expiry-item">
                    <div>
                      <strong>Employment Agreement</strong>
                      <small>Vikram Patel • Engineering</small>
                    </div>
                    <span className="doc-expiry-days amber">18d left</span>
                  </div>

                  <div className="doc-expiry-item">
                    <div>
                      <strong>Work Visa & Passport</strong>
                      <small>Sarah Jenkins • Design & UX</small>
                    </div>
                    <span className="doc-expiry-days amber">25d left</span>
                  </div>

                  <div className="doc-expiry-item">
                    <div>
                      <strong>Statutory Labor Permit</strong>
                      <small>Bangalore Hub • Operations</small>
                    </div>
                    <span className="doc-expiry-days green">Renewed ✓</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="emp-widget-quick-cta"
                  style={{ marginTop: "14px", width: "100%" }}
                  onClick={handleOpenDemo}
                >
                  <span>Review All Expirations</span>
                  <Icon name="arrow" size={13} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. CHALLENGES SECTION (Missing documents, scattered records, expiry follow-ups)
            ========================================================================= */}
        <section className="emp-problem-section" aria-labelledby="problem-heading">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ THE CHALLENGES WE SOLVE ✦</span>
              <h2 id="problem-heading" className="emp-section-title">
                Managing Employee Documents Shouldn't Feel Like Chaos
              </h2>
              <p className="emp-section-subhead">
                Scattered files, lost contracts, and surprise expiry dates cost HR teams countless hours and create serious legal compliance liabilities.
              </p>
            </div>

            <div className="emp-problem-grid">
              {/* Challenge 1 */}
              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrapper">
                  <Icon name="document" size={24} />
                </div>
                <h3 className="emp-problem-card-title">Missing Documents</h3>
                <p className="emp-problem-card-desc">
                  Crucial employee onboarding files, bank proofs, and signed agreements go missing right when annual audits or payroll runs arrive.
                </p>
              </div>

              {/* Challenge 2 */}
              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrapper">
                  <Icon name="search" size={24} />
                </div>
                <h3 className="emp-problem-card-title">Scattered Records</h3>
                <p className="emp-problem-card-desc">
                  Files are stranded across personal email inboxes, disparate Google Drive folders, local desktops, and physical file cabinets.
                </p>
              </div>

              {/* Challenge 3 */}
              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrapper">
                  <Icon name="clock" size={24} />
                </div>
                <h3 className="emp-problem-card-title">Expiry Follow-Ups</h3>
                <p className="emp-problem-card-desc">
                  Passports, work visas, commercial permits, and health certifications expire without advance warning, risking statutory penalties.
                </p>
              </div>

              {/* Challenge 4 */}
              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrapper">
                  <Icon name="shield" size={24} />
                </div>
                <h3 className="emp-problem-card-title">Tracking Required Paperwork</h3>
                <p className="emp-problem-card-desc">
                  HR managers waste hours manually maintaining spreadsheets to see which team members have incomplete compliance checklists.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CAPABILITIES SECTION (3 Reference Blocks - supported features only)
            ========================================================================= */}
        <section className="emp-reference-blocks-section" id="capabilities" aria-labelledby="capabilities-heading">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ POWERFUL CAPABILITIES ✦</span>
              <h2 id="capabilities-heading" className="emp-section-title">
                Everything You Need to Master HR Documentation
              </h2>
              <p className="emp-section-subhead">
                A purpose-built compliance toolkit that keeps employee paperwork organized, searchable, and strictly governed at scale.
              </p>
            </div>

            {capabilityBlocks.map((blk, idx) => (
              <div key={blk.id} className="emp-block-wrapper">
                <div className="emp-block-container">
                  <article
                    aria-labelledby={`emp-block-title-${blk.id}`}
                    className="emp-reference-block-card"
                  >
                    {/* Top Deck: 2 Columns (Left Image + Right Content) */}
                    <div className="emp-block-top-deck">
                      {/* Left Column: Portrait Photograph */}
                      <div className="emp-block-img-col">
                        <img
                          src={blk.image}
                          alt={blk.imageAlt}
                          className="emp-block-hero-img"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </div>

                      {/* Right Column: Eyebrow, Title, Description, 2-Col Checklist, Action */}
                      <div className="emp-block-content-col">
                        <span className="emp-block-eyebrow">{blk.eyebrow}</span>
                        <h3 id={`emp-block-title-${blk.id}`} className="emp-block-title">
                          {blk.title}
                        </h3>
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
            4. WHY LATTIUMHR FOR DOCUMENTS & COMPLIANCE (1 Big Card + 4 Small Cards)
            ========================================================================= */}
        <section className="emp-why-choose-section" aria-labelledby="why-choose-title">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY LATTIUMHR ✦</span>
              <h2 id="why-choose-title" className="emp-section-title">
                More Organized Records. Easier Retrieval. Zero Compliance Surprises.
              </h2>
              <p className="emp-section-subhead">
                Transform routine administrative paperwork into a streamlined, automated compliance system that grows with your organization.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: 1 Big Card */}
              <div className="emp-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">
                      ✦ ONE CENTRALIZED DOCUMENT VAULT ✦
                    </span>
                  </div>

                  {/* Floating Metric Card 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Verified Employee Records</small>
                        <strong>100% Audit-Ready</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Missing Files</span>
                  </div>

                  {/* Floating Metric Card 2 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="shield" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Statutory Document Compliance</small>
                        <strong>99.9% Audit Score</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Compliance Risk</span>
                  </div>
                </div>

                {/* Bottom Narrative Copy */}
                <p className="emp-big-card-bottom-text">
                  Keep employee contracts, statutory proofs, increment letters, and certifications organized in one secure vault. LattiumHR unifies identity records, policy acknowledgments, and expiration timelines into one tamper-proof archive with zero missing paperwork.
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
                  <h3 className="emp-why-card-title">More Organized Records</h3>
                  <p className="emp-why-card-desc">
                    Categorize documents by KYC, contracts, tax, and licenses across all branches without folder clutter.
                  </p>
                </div>

                {/* Card 02 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="search" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Easier Document Retrieval</h3>
                  <p className="emp-why-card-desc">
                    Find any signed agreement, PAN card, or degree certificate in milliseconds using search-as-you-type.
                  </p>
                </div>

                {/* Card 03 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="clock" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Proactive Expiry Follow-Ups</h3>
                  <p className="emp-why-card-desc">
                    Receive advance alerts at 90, 60, and 30 days so employees and managers renew permits ahead of time.
                  </p>
                </div>

                {/* Card 04 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="shield" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Strict Access Control</h3>
                  <p className="emp-why-card-desc">
                    Safeguard confidential personnel files with bank-grade AES-256 cloud encryption and role-based privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WORK PROCESS SECTION (4 Steps: Upload -> Organize -> Track -> Review & Renew)
            ========================================================================= */}
        <section className="emp-process-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="container">
            <div className="emp-process-header">
              <span className="emp-process-eyebrow">✦ WORKFLOW PROCESS ✦</span>
              <h2 id="workflow-heading" className="emp-process-title">
                How Documents & Compliance Works
              </h2>
              <p className="emp-process-subhead">
                A simple, 4-step workflow that turns everyday paperwork into an automated, audit-ready compliance system.
              </p>
            </div>

            {/* 4 Process Cards */}
            <div className="doc-process-grid-4col">
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
            6. MIDDLE CTA SECTION (“Bring More Control to Your HR Documentation.”)
            ========================================================================= */}
        <section className="emp-center-cta-section" aria-labelledby="cta-banner-title">
          <div className="container">
            <div className="emp-center-cta-card">
              {/* Primary Color Accent Block */}
              <div className="emp-cta-primary-bar" />

              {/* Overlapping Photorealistic Team Collaboration Image */}
              <div className="emp-cta-img-wrap">
                <img
                  src="/images/emp-cta-collaboration.jpg"
                  alt="HR compliance and legal team collaborating on employee document governance"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              {/* Right Content Area */}
              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ CENTRALIZED HR DOCUMENTATION ✦</span>
                <h2 id="cta-banner-title" className="emp-cta-title">
                  Bring More Control to Your HR Documentation.
                </h2>
                <p className="emp-cta-desc">
                  Replace missing documents, scattered records, and manual expiry follow-ups with one centralized, encrypted document workspace. Keep every record audit-ready from day one.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={handleOpenDemo}
                  >
                    Book a Demo
                  </button>
                  <button
                    type="button"
                    className="emp-cta-btn-secondary"
                    onClick={handleOpenDemo}
                  >
                    Talk to an HR Expert <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CONNECTED HRMS MODULES (How It Works Together)
            ========================================================================= */}
        <section className="emp-section emp-connected-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WORKS BETTER TOGETHER ✦</span>
              <h2 className="emp-section-title">
                Connected Across Every Everyday HR Workflow
              </h2>
              <p className="emp-section-subhead">
                Employee Management + Documents & Compliance + relevant HR workflows work seamlessly together.
              </p>
            </div>

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
                      {isActive ? (
                        <span className="emp-process-notch-pill">{mod.number}</span>
                      ) : (
                        <span className="emp-process-notch-num">{mod.number}</span>
                      )}
                    </div>

                    <div className="emp-process-icon-box" aria-hidden="true">
                      {mod.icon}
                    </div>

                    <h3 className="emp-process-card-title">{mod.title}</h3>
                    <p className="emp-process-card-desc">{mod.description}</p>

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
                What People Say About LattiumHR
              </h2>
              <p className="emp-section-subhead">
                Discover how organizations simplify document collection, eliminate expiry penalties, and maintain 100% statutory compliance.
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
            9. FAQ SECTION (Covering document types, document access, expiry tracking, compliance records)
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title="Everything you need to know"
                body="Common questions about document storage, role-based privacy, automated expiry notifications, and compliance records."
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
            10. BOTTOM CONVERSION CTA BANNER
            ========================================================================= */}
        <FooterCTA />
      </main>

      <Footer />
    </div>
  );
}

export default DocumentsCompliancePage;
