import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import "./EnterprisePage.css";

interface FAQItem {
  q: string;
  a: string;
}

export function EnterprisePage() {
  const { openDemoModal } = useDemoModal();

  // Interactive Vertical Workspace Accordion (Section 6)
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);

  const workspaceCards = [
    {
      id: "chro-leadership",
      number: "01",
      verticalTitle: "CHRO & Global Leadership",
      title: "Chief Human Resources Officers & Global Leadership",
      desc: "Gain unified cross-subsidiary workforce intelligence, ensure 100% statutory compliance across international jurisdictions, and maintain enterprise governance across 500 to 10,000+ employees.",
      points: [
        { title: "Multi-Entity Global Rollup", desc: "Consolidate headcounts, attrition trends, compensation forecasting, and department metrics across subsidiaries." },
        { title: "Statutory Audit Defense", desc: "Automate state PT slabs, PF trusts, ESI, gratuity reserves, and tax compliance with full audit trails." },
        { title: "Global Identity & SSO", desc: "Enforce enterprise SAML 2.0 / Okta / Azure AD authentication and automated SCIM user lifecycle sync." },
        { title: "Custom Enterprise SLA", desc: "Backed by 99.99% uptime commitments, 24/7 dedicated support SLA, and a named technical account director." },
      ],
      buttonText: "Request Enterprise Demo",
      image: "/images/roles-block-admin.jpg",
      alt: "Chief Human Resources Officer reviewing global workforce intelligence in LattiumHR",
    },
    {
      id: "plant-director",
      number: "02",
      verticalTitle: "Plant & Dept Directors",
      title: "Plant Directors & Department Heads",
      desc: "Manage high-concurrency industrial turnstile clock-ins, complex multi-shift rosters, and cross-department matrix approvals without operational friction or coverage shortfalls.",
      points: [
        { title: "Industrial Shift Rosters", desc: "Manage rotational 24/7 schedules, night shift premiums, and fatigue regulations for thousands of plant workers." },
        { title: "Automated Matrix Approvals", desc: "Configure multi-level sequential and project-based sign-offs for leaves, overtime, and capex budgets." },
        { title: "Real-Time Turnstile Ingestion", desc: "Stream biometric attendance live from high-speed turnstiles with emergency muster roll accountability." },
        { title: "Department Budget Governance", desc: "Gain real-time visibility into cost center overtime expenditures, contractor pools, and headcounts." },
      ],
      buttonText: "Request Enterprise Demo",
      image: "/images/work-process-team.jpg",
      alt: "Plant director managing team shift operations and enterprise approvals",
    },
    {
      id: "global-employee",
      number: "03",
      verticalTitle: "Global Workforce",
      title: "Enterprise Global Workforce",
      desc: "Empower distributed field workers, plant personnel, and corporate professionals with a modern, consumer-grade mobile self-service experience.",
      points: [
        { title: "Mobile Geofence & QR Pass", desc: "Frictionless clock-ins with biometric face match, plant turnstile QR passes, and GPS geofencing." },
        { title: "Instant Encrypted Payslips", desc: "Download itemized, password-protected monthly salary slips and statutory investment sheets 24/7." },
        { title: "Self-Service Leave & Benefits", desc: "Real-time visibility into leave balances, group health insurance claims, and corporate perk allocations." },
        { title: "Consumer-Grade Mobile App", desc: "Modern native app experience available in multiple regional languages across iOS and Android." },
      ],
      buttonText: "Request Enterprise Demo",
      image: "/images/emp-cta-collaboration.jpg",
      alt: "Enterprise employee accessing mobile self-service and attendance",
    },
  ];

  // Section 2: What You Get From Day One (4 quick-win cards)
  const dayOneCards = [
    {
      id: "multientity",
      title: "Multi-Entity Tenant Architecture.",
      desc: "Manage multiple corporate subsidiaries, regional tax entities, and overseas subsidiaries under one unified master organization with strict data isolation.",
      btnText: "Explore Global Hierarchy",
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
      id: "iot",
      title: "High-Volume Biometric & IoT Sync.",
      desc: "Ingest hundreds of thousands of daily clock-ins from factory turnstiles, distributed branch scanners, and mobile GPS geofences simultaneously.",
      btnText: "View IoT Scalability",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "matrix",
      title: "Matrix & Multi-Level Delegation.",
      desc: "Configure multi-level conditional approval chains across dual-reporting lines, cost centers, and departmental budgets with automated proxy delegation.",
      btnText: "Review Approval Matrix",
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
      title: "High-Volume Statutory Payroll Engine.",
      desc: "Disburse salary runs for thousands of employees across diverse statutory state rules, PF trusts, ESI, gratuity accruals, and direct banking integrations.",
      btnText: "See Enterprise Payroll",
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
      title: "Request an Enterprise Walkthrough",
      subtitle:
        "See how LattiumHR unifies multi-entity workforce management, SAP/ERP integrations, and high-volume statutory payroll for 500+ employees.",
      defaultInterest: "Enterprise Solution (500+ Staff)",
    });
  };

  const scrollToWorkingBlock = (cardId: string) => {
    const targetId =
      cardId === "multientity"
        ? "working-multientity"
        : cardId === "iot"
        ? "working-iot"
        : cardId === "matrix"
        ? "working-matrix"
        : "working-payroll";
    const el = document.getElementById(targetId) || document.getElementById("the-way-of-working");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Section 7: FAQs explicitly tailored for Enterprises (500 to 10,000+ staff)
  const faqs: FAQItem[] = [
    {
      q: "Can LattiumHR support organizations with 1,000 to 10,000+ employees across multiple corporate entities?",
      a: "Yes. LattiumHR features a high-performance multi-tenant architecture designed to scale seamlessly across tens of thousands of users. You can operate multiple legal subsidiaries, regional business units, and international entities under a single master organization with strict data segregation and unified executive rollups.",
    },
    {
      q: "How does LattiumHR integrate with existing ERP platforms (SAP, Oracle, NetSuite) and core banking?",
      a: "LattiumHR provides bi-directional REST APIs, webhooks, and pre-built connectors for SAP S/4HANA, NetSuite, Oracle Fusion, and Workday. Cost center journal entries, employee master records, and direct host-to-host bank salary transfer files sync automatically with zero manual CSV scripting.",
    },
    {
      q: "What security standards, certifications, and data residency guarantees do you offer for enterprise clients?",
      a: "LattiumHR is built on ISO 27001-certified and SOC 2 Type II-attested cloud infrastructure. We enforce bank-grade AES-256 encryption at rest, TLS 1.3 in transit, role-based access control (RBAC), immutable audit logs, SAML 2.0 SSO, and regional data residency compliance with GDPR and Indian DPDP standards.",
    },
    {
      q: "Can LattiumHR handle high-concurrency biometric turnstiles at manufacturing plants and corporate campuses?",
      a: "Yes. Our cloud IoT edge connectors interface directly with high-throughput biometric turnstiles and face-recognition terminals (ZKTeco, Suprema, Matrix, Essl). The system effortlessly ingests thousands of punches per minute during industrial shift changeovers with zero server lag or dropped logs.",
    },
    {
      q: "How does LattiumHR support Single Sign-On (SSO) and automated SCIM identity management?",
      a: "We support enterprise SAML 2.0 Single Sign-On with providers including Microsoft Azure AD (Entra ID), Okta, Ping Identity, and Google Workspace. System for Cross-domain Identity Management (SCIM) automates instant user provisioning and de-provisioning based on directory changes.",
    },
    {
      q: "What does the enterprise migration, dedicated onboarding, and SLA support model look like?",
      a: "Enterprise accounts receive a dedicated implementation squad led by a Senior Solution Architect and Customer Success Director. We guarantee a 99.99% uptime SLA, 15-minute response times for critical incidents, custom staging sandbox environments, and comprehensive on-site or virtual leadership training.",
    },
  ];

  // Section 4: Why Enterprises Choose LattiumHR (4 Modern Process Cards)
  const whyEnterpriseCards = [
    {
      id: "globalarch",
      number: "01",
      title: "Global Multi-Entity Architecture",
      desc: "Manage subsidiaries, international operating entities, and localized regional tax frameworks under one consolidated master account with complete data sovereignty.",
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
      id: "erpconnectors",
      number: "02",
      title: "Bi-Directional ERP Connectors",
      desc: "Native cloud connectors for SAP S/4HANA, Oracle Fusion, NetSuite, and host-to-host banking APIs. Keep general ledger and headcount records synchronized in real time.",
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
      id: "securityvault",
      number: "03",
      title: "SOC 2 & Bank-Grade Security",
      desc: "Rigorous ISO 27001 and SOC 2 Type II controls. Complete SAML 2.0 SSO, SCIM de-provisioning, immutable audit logs, and granular field-level permission encryption.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.2 0l-3.58 2.687a.5.5 0 0 1-.81-.47l1.514-8.526" />
        </svg>
      ),
    },
    {
      id: "dedicatedsla",
      number: "04",
      title: "99.99% SLA & Dedicated CSM",
      desc: "Guaranteed enterprise uptime backed by enforceable financial SLAs, 24/7 mission-critical response routing, and a named enterprise solutions director.",
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
        title="Enterprise HRMS Software — Multi-Entity Workforce Solutions | LattiumHR"
        description="Enterprise HRMS engineered for global scale. Multi-entity directory, high-concurrency biometric attendance, SAP/ERP integrations, and statutory payroll for 500+ employees."
        canonicalPath="/solutions/enterprises"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            SECTION 1 — HERO
            ========================================================================= */}
        <section className="sb-hero-section" aria-labelledby="ent-hero-heading">
          <div className="container">
            {/* Eyebrow */}
            <div className="sb-hero-eyebrow-tag">
              <span className="sb-hero-eyebrow-sparkle">✦</span>
              <span>ENTERPRISE WORKFORCE SOLUTIONS</span>
              <span className="sb-hero-eyebrow-sparkle">✦</span>
            </div>

            {/* Headline */}
            <h1 id="ent-hero-heading" className="sb-hero-title">
              Enterprise HRMS Engineered for <span className="sb-glow-text">Global Scale.</span>
            </h1>

            {/* Subheadline */}
            <p className="sb-hero-subhead">
              Consolidate multi-entity operations, high-volume automated payroll, custom ERP integrations, and bank-grade security for 500 to 10,000+ employees across your expanding organization.
            </p>

            {/* Hero CTAs */}
            <div className="sb-hero-actions">
              <button
                type="button"
                className="sb-btn-primary"
                onClick={handleOpenDemo}
              >
                Request Enterprise Demo <Icon name="arrow" size={16} />
              </button>
              <a href="#workspace" className="sb-btn-secondary">
                Explore Enterprise Workspace
              </a>
            </div>

            {/* Trust Row */}
            <div className="sb-hero-trust-row">
              <span>
                <Icon name="check" size={14} /> ISO 27001 &amp; SOC 2 Type II Certified
              </span>
              <span>
                <Icon name="check" size={14} /> Dedicated 99.99% Uptime SLA Commitment
              </span>
              <span>
                <Icon name="check" size={14} /> Engineered for 500 to 10,000+ Headcount
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
                Uncompromising Power. Zero Operational Drag.
              </h2>
              <p className="sb-section-subhead">
                Replace fragmented legacy software with a high-throughput, unified infrastructure designed to support every corporate subsidiary and manufacturing facility.
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
            SECTION 3 — THE ENTERPRISE WAY OF WORKING (4 Alternating Checkerboard Blocks)
            ========================================================================= */}
        <section className="sb-way-of-working-section" id="the-way-of-working" aria-labelledby="working-heading">
          <div className="container">
            <div className="sb-section-header center">
              <span className="sb-eyebrow">✦ THE ENTERPRISE WAY OF WORKING ✦</span>
              <h2 id="working-heading" className="sb-section-title">
                Operational Rigor Tailored for Large-Scale Enterprise.
              </h2>
              <p className="sb-section-subhead">
                Bring corporate subsidiaries, industrial turnstile attendance, multi-tiered delegation matrices, and high-volume statutory payroll into one robust ecosystem.
              </p>
            </div>

            {/* Alternating 4-Block Checkerboard Grid */}
            <div className="sb-checkerboard-wrapper">
              {/* -------------------------------------------------------------------
                  ROW 1: GLOBAL SUBSIDIARY DIRECTORY & RBAC
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-multientity">
                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">ENTERPRISE IDENTITY &amp; DATA ISOLATION</span>
                  <h3 className="sb-cb-title">
                    Global Subsidiary Architecture with Strict Role-Based Data Segregation.
                  </h3>
                  <p className="sb-cb-desc">
                    Govern large multi-national organizations with ease. Support parent-subsidiary company relationships, localized holiday calendars, and custom role permissions with SAML 2.0 / Okta / Azure AD SSO integration.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Multi-subsidiary tenant consolidation with isolated tax entities &amp; bank accounts</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Enterprise Single Sign-On (SAML 2.0, Okta, Microsoft Azure AD, Google Workspace)</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Comprehensive immutable audit logs, IP whitelisting, and SOC 2 / GDPR compliance</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Global Architecture <span className="sb-cb-arrow">→</span>
                  </button>
                </div>

                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">Global 2,450</span>
                        <span className="sb-m-tab">Subsidiary A 1,200</span>
                        <span className="sb-m-tab">Subsidiary B 850</span>
                        <span className="sb-m-tab">Overseas 400</span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Vikramaditya Singhania • Chief Operating Officer</strong>
                              <span className="sb-m-badge high">Global HQ</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Master Tenant Authority &amp; SAML SSO Active</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Dr. Shalini Raman • VP, Global Clinical Research</strong>
                              <span className="sb-m-badge slate">Life Sciences</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">Active • 420 Direct &amp; Indirect Reports Provisioned</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Enterprise SAML 2.0 / Okta Directory Sync</strong>
                              <span className="sb-m-badge active">Identity Hub</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Real-Time SCIM User De-Provisioning Linked</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>SOC 2 Type II Automated Compliance Audit Vault</strong>
                              <span className="sb-m-badge amber">Sealed</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">0 Violations • 90-Day Access Logs Encrypted</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Users</small>
                          <strong>2,450</strong>
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
                          <small>Subsidiaries</small>
                          <strong>04</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>Multi</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>SLA Uptime</small>
                          <strong>99.99%</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ROW 2: INDUSTRIAL BIOMETRIC & TURNSTILE INGESTION
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-iot">
                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">Active Facility 2,450</span>
                        <span className="sb-m-tab">On Shift 2,310</span>
                        <span className="sb-m-tab">Turnstiles 16</span>
                        <span className="sb-m-tab">Geofence 620</span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Automated Turnstile Cluster #4 (Main Plant Gate)</strong>
                              <span className="sb-m-badge active">Synced</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% 840 Scans/Min Biometric Ingestion Verified</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Rotational 3-Shift Roster (Manufacturing Plant 1)</strong>
                              <span className="sb-m-badge active">Active</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Shift Allowance &amp; Fatigue Caps Enforced</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Corporate Campus GPS &amp; Facial ID Geofence</strong>
                              <span className="sb-m-badge slate">HQ Active</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Liveness Detection &amp; GPS Radius Confirmed</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Emergency Digital Muster Roll &amp; Live Presence</strong>
                              <span className="sb-m-badge high">Safety Protocol</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Plant Floor Staff Accounted For Live</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Scans/Min</small>
                          <strong>2,400+</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="5" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>High</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>IoT Turnstiles</small>
                          <strong>16/16</strong>
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
                          <small>Roster Sync</small>
                          <strong>99.8%</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="2" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>Exact</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">HIGH-THROUGHPUT REAL-TIME INGESTION</span>
                  <h3 className="sb-cb-title">
                    Industrial Attendance Infrastructure for Plants, Warehouses &amp; Campuses.
                  </h3>
                  <p className="sb-cb-desc">
                    Handle complex shift changeovers with thousands of simultaneous clock-ins without lag. Native cloud IoT connectors interface with high-speed turnstiles, biometric scanners, and mobile geofences.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>High-concurrency biometric IoT ingestion supporting 10,000+ clock-ins per minute</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Automated 24/7 rotational shift rosters, night allowances, and fatigue rules</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Real-time factory floor presence monitoring and emergency muster roll reporting</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore IoT Infrastructure <span className="sb-cb-arrow">→</span>
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ROW 3: ENTERPRISE DECISION AUTOMATION & MATRIX DELEGATION
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-matrix">
                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">CUSTOMIZABLE GOVERNANCE &amp; DELEGATION</span>
                  <h3 className="sb-cb-title">
                    Enterprise Workflow Engine with Matrix Reporting &amp; Budget Governance.
                  </h3>
                  <p className="sb-cb-desc">
                    Model multi-dimensional approval matrices reflecting real-world enterprise structures. Direct leaves, expense reimbursements, and staffing authorizations through hierarchical or project-based routing.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Multi-tiered conditional workflows based on cost centers, seniority, and capex limits</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Automated out-of-office proxy delegation with audit-proof digital time stamps</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Proactive department headcount budget ceiling alerts and hiring requisitions</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Approval Matrices <span className="sb-cb-arrow">→</span>
                  </button>
                </div>

                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">Active 142</span>
                        <span className="sb-m-tab">High Priority 8</span>
                        <span className="sb-m-tab">Finance 14</span>
                        <span className="sb-m-tab">SLA Breach 0</span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Capital Equipment Requisition (₹14.8L) • R&amp;D</strong>
                              <span className="sb-m-badge high">Level 2 Done</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">Pending VP Procurement Sign-Off (Cost Center Approved)</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Expatriate Global Relocation Leave (12 Days)</strong>
                              <span className="sb-m-badge active">Approved</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">Dual-Reporting Matrix: Line Manager &amp; Country Lead Approved</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Overtime Authorization Pool (Assembly Line C)</strong>
                              <span className="sb-m-badge slate">Auto-Routed</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">Within Plant Cost Ceiling • Automated Matrix Clearance</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Temporary Proxy Delegation • Chief People Officer</strong>
                              <span className="sb-m-badge active">Active</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">Delegated to VP HR for 7-Day Board Meeting Period</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Avg SLA</small>
                          <strong>2.1h</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="10" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>94%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Resolved Today</small>
                          <strong>142</strong>
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
                          <small>Audit Trails</small>
                          <strong>100%</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>Sealed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ROW 4: HIGH-VOLUME STATUTORY PAYROLL & ERP INTEGRATION
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-payroll">
                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">Consolidated 2,450</span>
                        <span className="sb-m-tab">Subsidiaries 4</span>
                        <span className="sb-m-tab">₹18.6 Cr</span>
                        <span className="sb-m-tab">Bank Direct Live</span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Subsidiary Tech India Pvt Ltd • 1,200 Staff</strong>
                              <span className="sb-m-badge high">Disbursed</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Statutory Reconciled • Bank API Host-to-Host Disbursal</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Subsidiary Logistics &amp; Operations • 850 Staff</strong>
                              <span className="sb-m-badge high">Disbursed</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% State PT Slabs, PF Trust, ESI &amp; Overtime Applied</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Subsidiary R&amp;D Global Entity • 400 Staff</strong>
                              <span className="sb-m-badge high">Reconciled</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Stock Grants, Tax Withholdings &amp; Bonus Batches</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>SAP S/4HANA General Ledger Bi-Directional Sync</strong>
                              <span className="sb-m-badge active">Synced</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">Journal Entries Posted to Department Cost Centers Auto-Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Disbursed</small>
                          <strong>2,450</strong>
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
                          <small>SAP GL Sync</small>
                          <strong>Live</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>Bi-Dir</span>
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
                  <span className="sb-cb-eyebrow">ENTERPRISE PAYROLL SCALE &amp; ERP INTEGRATION</span>
                  <h3 className="sb-cb-title">
                    Automated Multi-State Payroll with Direct SAP &amp; Oracle Connectors.
                  </h3>
                  <p className="sb-cb-desc">
                    Process monthly payroll for thousands of employees across multiple state legal entities in a single morning. Push journal entries directly to SAP, NetSuite, Oracle, and enterprise core banking APIs.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>High-volume batch payroll engine supporting complex salary structures &amp; flexible benefits</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Multi-state statutory compliance formulas (PF trusts, ESI, gratuity reserves, Form 24Q)</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Two-way API connectors for SAP S/4HANA, NetSuite, Oracle Fusion, and corporate banks</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Enterprise Payroll <span className="sb-cb-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4 — WHY ENTERPRISES CHOOSE LATTIUMHR (4 Interactive Process Cards)
            Matching Small Business Page Reference Layout with Top Notches & Accent Center Card
            ========================================================================= */}
        <section className="sb-why-lattium-section" aria-labelledby="why-lattium-heading">
          {/* Subtle background pattern & atmospheric glow */}
          <div className="sb-why-lattium-backdrop" aria-hidden="true" />
          <div className="sb-why-lattium-glow" aria-hidden="true" />

          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="sb-why-header">
              <span className="sb-why-eyebrow">✦ WHY ENTERPRISES CHOOSE LATTIUMHR ✦</span>
              <h2 id="why-lattium-heading" className="sb-why-title">
                What Makes LattiumHR Right for Large Enterprises?
              </h2>
              <p className="sb-why-subhead">
                Built from the ground up for high-availability performance, strict data isolation, and deep interoperability with existing enterprise IT ecosystems.
              </p>
            </div>

            {/* Process Cards Grid matching Reference Image */}
            <div className="sb-why-cards-grid" role="region" aria-label="Why LattiumHR Pillars for Enterprises">
              {whyEnterpriseCards.map((card) => (
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
            SECTION 5 — BRAND MANIFESTO FOR ENTERPRISES
            ========================================================================= */}
        <section className="sb-manifesto-section" aria-labelledby="manifesto-heading">
          <div className="container sb-manifesto-container">
            <div className="sb-manifesto-layout">
              {/* Left Column: Eyebrow, Headline & Manifesto Message */}
              <div className="sb-manifesto-left">
                <span className="sb-manifesto-eyebrow">
                  ✦ A MANIFESTO FOR MODERN ENTERPRISES ✦
                </span>
                <h2 id="manifesto-heading" className="sb-manifesto-headline">
                  Enterprise Scale. <span className="sb-manifesto-highlight">Consumer-Grade Simplicity.</span>
                </h2>
                <p className="sb-manifesto-lead">
                  “For decades, large enterprises have tolerated clunky legacy HR software that requires months of consultant training, millions in licensing fees, and constant IT firefighting.”
                </p>
                <p className="sb-manifesto-text">
                  Your workforce deserves modern, responsive technology that employees actually enjoy using. LattiumHR proves you can have robust enterprise compliance, multi-entity segregation, and complex shift management—without the soul-crushing friction of 2000s legacy platforms.
                </p>
                <div className="sb-manifesto-punchline">
                  Scale is no longer an excuse for terrible software. Welcome to enterprise HR reimagined.
                </div>
              </div>

              {/* Right Column: Clean Action Box with Conversion Checklist */}
              <div className="sb-manifesto-right">
                <div className="sb-manifesto-action-box">
                  <h3 className="sb-manifesto-action-title">Ready for Your Digital Transformation?</h3>
                  <p className="sb-manifesto-action-desc">
                    See how LattiumHR unifies multi-entity workforce management, SAP/ERP connectors, and high-volume statutory payroll.
                  </p>
                  <div className="sb-manifesto-checklist">
                    <div className="sb-manifesto-check-item">
                      <span className="sb-manifesto-check-icon">✓</span>
                      <span>Enterprise Resilience — 99.99% uptime with SOC 2 Type II attestations</span>
                    </div>
                    <div className="sb-manifesto-check-item">
                      <span className="sb-manifesto-check-icon">✓</span>
                      <span>High-Throughput Performance — 10,000+ clock-ins/min without latency</span>
                    </div>
                    <div className="sb-manifesto-check-item">
                      <span className="sb-manifesto-check-icon">✓</span>
                      <span>Fast Rollout — 4 to 6-week guided rollout with custom ERP sync</span>
                    </div>
                  </div>
                  <div className="sb-manifesto-btn-group">
                    <button
                      type="button"
                      className="sb-manifesto-btn"
                      onClick={handleOpenDemo}
                    >
                      Request Enterprise Consultation <Icon name="arrow" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6 — THE ENTERPRISE WORKSPACE (Interactive 3-Role Stage)
            ========================================================================= */}
        <section id="workspace" className="sb-workspace-role-section" aria-labelledby="perspectives-heading">
          <div className="container">
            <div className="sb-section-header center">
              <span className="sb-eyebrow">✦ THE ENTERPRISE WORKSPACE ✦</span>
              <h2 id="perspectives-heading" className="sb-section-title">
                Everything Starts With Your People at Enterprise Scale.
              </h2>
              <p className="sb-section-subhead">
                Empower executive leadership, plant &amp; department directors, and global workforces with dedicated portals engineered around their responsibilities.
              </p>
            </div>

            {/* Mobile Tab Switcher Pills */}
            <div className="sb-workspace-mobile-pills" role="tablist" aria-label="Enterprise Perspectives">
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
            SECTION 7 — FREQUENTLY ASKED QUESTIONS (Enterprise HR, Answered)
            Canonical 2-column layout: Left column with heading, Right column with accordion
            ========================================================================= */}
        <section className="faq-section sb-faq-section" id="faqs" aria-labelledby="faq-heading">
          <div className="container faq-grid">
            <div>
              <div className="section-heading">
                <span className="eyebrow">QUESTIONS, ANSWERED</span>
                <h2 id="faq-heading">Enterprise HRMS, Answered.</h2>
                <p>
                  Everything you need to know about scaling to 10,000+ employees, custom ERP connectors, biometric turnstiles, and enterprise security.
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
              <span className="eyebrow">✦ READY TO MODERNIZE ENTERPRISE HR? ✦</span>
              <h2 id="final-cta-heading">
                Bring consumer-grade simplicity to your enterprise workforce.
              </h2>
              <p>
                Join industry leaders running high-volume attendance, multi-state payroll, and global governance on LattiumHR.
              </p>

              <div className="final-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={handleOpenDemo}
                >
                  Schedule Enterprise Consultation <Icon name="arrow" />
                </button>
                <a href="/contact-sales" className="btn btn-secondary">
                  Speak with Enterprise Sales
                </a>
              </div>

              <div className="final-points">
                <span>
                  <Icon name="check" /> Dedicated enterprise solution architect
                </span>
                <span>
                  <Icon name="check" /> Two-way SAP, Oracle &amp; NetSuite connectors
                </span>
                <span>
                  <Icon name="check" /> Guaranteed 99.99% uptime with SOC 2 compliance
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

export default EnterprisePage;

