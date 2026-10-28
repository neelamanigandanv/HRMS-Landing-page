import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import { useCurrency } from "../context/CurrencyContext";

const faqList = [
  {
    question: "How long does setup take?",
    answer:
      "Most teams go live in 2–4 weeks. Your dedicated implementation specialist handles configuration, data import, and team training.",
  },
  {
    question: "Can LattiumHR handle multiple branches?",
    answer:
      "Yes. Create branch-specific policies, holiday calendars, roles, and dashboards while keeping a unified company-wide view.",
  },
  {
    question: "Is payroll compliant with statutory regulations?",
    answer:
      "Yes. Payroll supports PF, ESI, PT, TDS, and other statutory requirements with ready-to-use reports.",
  },
  {
    question: "Can employees use it on mobile?",
    answer:
      "Absolutely. Employees can mark attendance, apply for leave, download payslips, and submit expenses from any device.",
  },
  {
    question: "What support do we get after launch?",
    answer:
      "Every plan includes guided onboarding and ongoing customer support. Professional and Enterprise plans include priority support.",
  },
];

const verticalIndustries = [
  {
    id: "tech-startups",
    name: "Tech & Startups",
    bestFor: "Best for: product companies, SaaS, IT services and hybrid teams",
    desc: "Run hybrid attendance, sprint-aligned leaves and confidential ESOP workflows without spreadsheets.",
    features: [
      {
        title: "Hybrid & remote geo-punching",
        desc: "Geo-fence, selfie, IP or Wi-Fi rules for office, home and field.",
      },
      {
        title: "Sprint-aligned leave rules",
        desc: "Block leave in release weeks and auto-create comp-offs.",
      },
      {
        title: "Confidential salary bands",
        desc: "Role-based visibility keeps pay data private.",
      },
      {
        title: "ESOP & vesting tracking",
        desc: "Grants, vesting schedules and exercises in one place.",
      },
      {
        title: "Automated onboarding & offboarding",
        desc: "Checklists for laptops, access and exit clearance.",
      },
      {
        title: "Flexible reimbursements & perks",
        desc: "Claims, wellness and learning budgets with approvals.",
      },
    ],
    stat: "Up to [XX]% less payroll processing time",
    compliance: ["PF", "ESI", "PT", "TDS", "LWF"],
        link: "/solutions/industries",
  },
  {
    id: "healthcare-retail",
    name: "Healthcare & Retail",
    desc: "Manage rotational rosters, overtime calculations and location-locked shifts without attendance gaps.",
    features: [
      {
        title: "Multi-shift roster planning",
        desc: "Automated shift rotations, night allowances and emergency coverage swaps.",
      },
      {
        title: "Store & branch geo-tagging",
        desc: "Geofenced punches locked strictly to POS and clinic premises.",
      },
      {
        title: "Overtime & penalty formulas",
        desc: "Real-time tracking of late marks, split shifts and holiday overtime.",
      },
      {
        title: "Uniform & asset issuance",
        desc: "Central inventory for scrubs, badges, barcode scanners and registers.",
      },
      {
        title: "Part-time & contract payouts",
        desc: "Hourly wage computation synced directly with verified biometric logs.",
      },
      {
        title: "License & credential alerts",
        desc: "Automated expiry warnings for medical council registrations and safety.",
      },
    ],
    stat: "Up to 99.4% shift coverage accuracy across branches",
    compliance: ["PF", "ESI", "Shop & Est", "Minimum Wages", "Gratuity"],
        link: "/solutions/industries",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    desc: "Handle contractor pools, overtime compliances and shop-floor shift rotations at enterprise scale.",
    features: [
      {
        title: "Contractor & vendor pools",
        desc: "Track daily contract labor headcounts and agency billing audits.",
      },
      {
        title: "Biometric turnstile sync",
        desc: "Zero-lag integration with face-recognition and fingerprint gates.",
      },
      {
        title: "Double overtime calculations",
        desc: "Automated computation for statutory overtime formulas and hazard pay.",
      },
      {
        title: "Shift handover locks",
        desc: "Production floor attendance locks before relief team check-in is complete.",
      },
      {
        title: "Safety & incident tracking",
        desc: "Record on-site safety trainings, incident logs and clearance badges.",
      },
      {
        title: "SMS & WhatsApp wage slips",
        desc: "Instant digital payslip delivery for non-desk and floor workers.",
      },
    ],
    stat: "Zero compliance penalties across 12+ statutory audit cycles",
    compliance: ["Factories Act", "PF", "ESI", "Bonus Act", "Contract Labor Act"],
        link: "/solutions/industries",
  },
  {
    id: "financial-services",
    name: "Financial Services",
    desc: "Billable timesheets synced to payroll with multi-entity runs and strict audit trails.",
    features: [
      {
        title: "Timesheet-to-payroll sync",
        desc: "Automatically calculate billable vs non-billable client allocations.",
      },
      {
        title: "Multi-entity salary runs",
        desc: "Run separate payrolls across registered subsidiaries seamlessly.",
      },
      {
        title: "Financial audit logs",
        desc: "Immutable time-stamped trails for salary edits and tax revisions.",
      },
      {
        title: "Incentive & commission slabs",
        desc: "Formula-based sales payouts calculated on closed deal metrics.",
      },
      {
        title: "Maker-Checker workflows",
        desc: "Multi-tier finance approval workflows before bank disbursement.",
      },
      {
        title: "Strict compensation secrecy",
        desc: "Role-based segregation for partner draws and executive packages.",
      },
    ],
    stat: "100% audit-ready statutory reports in under 5 minutes",
    compliance: ["PF", "TDS Form 16", "PT", "ESI", "ROC Filings"],
        link: "/solutions/industries",
  },
];

export function SolutionsOverview() {
  const breadcrumbs = [{ label: "Solutions" }];
  const { openDemoModal } = useDemoModal();
  const { isIndia } = useCurrency();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [activeIndustryTab, setActiveIndustryTab] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section");
    sections.forEach((section) => section.classList.add("reveal-section"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout breadcrumbs={breadcrumbs} onOpenDemo={() => openDemoModal()}>
      <SEO
        title="Solutions Overview | Tailored HRMS for Your Business Stage & Role | LattiumHR"
        description="Software that adapts to your organization—not the other way around. Explore LattiumHR solutions for small businesses, mid-sized teams, enterprises, HR managers, and multi-location footprints."
        canonicalPath="/solutions"
      />

      <div className="solutions-overview-page">
        {/* =================================================================
            1. HERO SECTION (CENTERED)
            ================================================================= */}
        <section className="so-hero-section">
          <div className="so-hero-ambient-glow" />
          <div className="container so-hero-centered-wrap">
            <div className="so-hero-copy">
              <span className="so-eyebrow-badge">
                <i>
                  <Icon name="sparkle" size={14} />
                </i>
                TAILORED WORKFLOWS
              </span>
              <h1 className="so-hero-title">
                Software That <em>Adapts to Your Organization</em> — Not the Other Way Around
              </h1>
              <p className="so-hero-lead">
                From fast-growing teams to distributed multi-branch enterprises,
                explore how LattiumHR unifies workforce operations, attendance, and payroll.
              </p>
              <div className="so-hero-actions">
                <Button onClick={() => openDemoModal()}>
                  Book a Free Demo <Icon name="arrow" size={16} />
                </Button>
                <Button href="#stages" secondary className="so-hero-btn-secondary">
                  Explore Solutions
                </Button>
              </div>

              {/* Trust & Proof Bar */}
              <div className="so-hero-proof-bar">
                <div className="so-proof-item">
                  <span className="so-proof-num">500+</span>
                  <span className="so-proof-label">Growing businesses</span>
                </div>
                <div className="so-proof-sep" />
                <div className="so-proof-item">
                  <span className="so-proof-num">99.8%</span>
                  <span className="so-proof-label">Statutory compliance</span>
                </div>
                <div className="so-proof-sep" />
                <div className="so-proof-item">
                  <span className="so-proof-num">2 Weeks</span>
                  <span className="so-proof-label">Average deployment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. SOLUTIONS BY COMPANY STAGE
            ================================================================= */}
        <section className="so-section so-section--alt" id="stages">
          <div className="container">
            <SectionHeading
              eyebrow="SOLUTIONS BY BUSINESS SIZE"
              title="Built to Scale Across Every Growth Milestone"
              center
            />

            <div className="so-biz-full-cards-stack">
              {/* Card 1: Standard (Small Business) */}
              <div className="so-biz-full-card so-biz-full-card--standard">
                <div className="so-biz-full-grid">
                  {/* Left Column: Plan Content & Features */}
                  <div className="so-biz-full-content">
                    <div className="so-biz-eyebrow">
                      <Icon name="zap" size={13} />
                      <span>STANDARD</span>
                    </div>

                    <h3 className="so-biz-plan-headline">Simplify HR. Focus on Growth.</h3>
                    <p className="so-biz-plan-desc">
                      Replace spreadsheets and paperwork with one system for employee records, attendance and leave, with self-service for every employee.
                    </p>

                    <div className="so-biz-divider" />

                    <div className="so-biz-features-section">
                      <div className="so-biz-features-eyebrow">
                        <span className="so-biz-check-mark">✓</span> CORE SOLUTIONS INCLUDED
                      </div>
                      <div className="so-biz-features-grid">
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="employee" size={14} />
                          </span>
                          <span>Centralized Digital Employee Records</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="attendance" size={14} />
                          </span>
                          <span>Automated Geofenced Attendance & Leave</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="users" size={14} />
                          </span>
                          <span>Mobile Employee Self-Service Portal</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="setup" size={14} />
                          </span>
                          <span>Streamlined Onboarding & Approval Workflows</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="chart" size={14} />
                          </span>
                          <span>Real-Time Workforce & Attendance Analytics</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="payroll" size={14} />
                          </span>
                          <span>Payroll-Ready Hours & Statutory Compliance</span>
                        </div>
                      </div>
                    </div>

                    <div className="so-biz-footer-row">
                      <Link to="/solutions/small-businesses" className="so-biz-explore-btn">
                        Explore Solutions <Icon name="arrow" size={14} />
                      </Link>
                      <button type="button" onClick={() => openDemoModal()} className="so-biz-features-link">
                        See all features
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Real UI Dashboard Preview */}
                  <div className="so-biz-visual-col">
                    <div className="so-biz-img-frame">
                      <img
                        src="/images/solution-small-business.jpg"
                        alt="LattiumHR Standard Solution Dashboard"
                        className="so-biz-card-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Divider */}
              <div className="so-fl-card-divider" />

              {/* Card 2: Professional (Mid-Sized Business) - Prominent Featured Styling */}
              <div className="so-biz-full-card so-biz-full-card--professional so-biz-full-card--reverse">
                <div className="so-biz-full-grid">
                  {/* Left Column in reverse: Real UI Dashboard Preview */}
                  <div className="so-biz-visual-col">
                    <div className="so-biz-img-frame">
                      <img
                        src="/images/solution-mid-sized.jpg"
                        alt="LattiumHR Professional Solution Multi-Branch Dashboard"
                        className="so-biz-card-img"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Right Column in reverse: Plan Content & Features */}
                  <div className="so-biz-full-content">
                    <div className="so-biz-eyebrow">
                      <Icon name="chart" size={13} />
                      <span>PROFESSIONAL</span>
                    </div>

                    <h3 className="so-biz-plan-headline">Automate Work. Empower Teams.</h3>
                    <p className="so-biz-plan-desc">
                      Automate approvals, shifts and payroll, and give managers the tools to run performance and goals for their own teams.
                    </p>

                    <div className="so-biz-divider" />

                    <div className="so-biz-features-section">
                      <div className="so-biz-features-eyebrow">
                        <span className="so-biz-check-mark">✓</span> EVERYTHING IN STANDARD, PLUS
                      </div>
                      <div className="so-biz-features-grid">
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="attendance" size={14} />
                          </span>
                          <span>Multi-Shift Scheduling & Overtime Controls</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="payroll" size={14} />
                          </span>
                          <span>Automated Payroll & Direct Disbursements</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="users" size={14} />
                          </span>
                          <span>Manager Delegation & Team Approvals</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="target" size={14} />
                          </span>
                          <span>Performance Appraisals & Goal Tracking</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="zap" size={14} />
                          </span>
                          <span>Workflow Automation & Device Integrations</span>
                        </div>
                      </div>
                    </div>

                    <div className="so-biz-footer-row">
                      <Link to="/solutions/mid-sized-businesses" className="so-biz-explore-btn">
                        Explore Solutions <Icon name="arrow" size={14} />
                      </Link>
                      <button type="button" onClick={() => openDemoModal()} className="so-biz-features-link">
                        See all features
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Divider */}
              <div className="so-fl-card-divider" />

              {/* Card 3: Enterprise */}
              <div className="so-biz-full-card so-biz-full-card--enterprise">
                <div className="so-biz-full-grid">
                  {/* Left Column: Plan Content & Features */}
                  <div className="so-biz-full-content">
                    <div className="so-biz-eyebrow">
                      <Icon name="building" size={13} />
                      <span>ENTERPRISE</span>
                    </div>

                    <h3 className="so-biz-plan-headline">Control Complexity. Scale with Confidence.</h3>
                    <p className="so-biz-plan-desc">
                      Run every location from one platform with custom workflows, detailed permissions and reports built for leadership, backed by priority support.
                    </p>

                    <div className="so-biz-divider" />

                    <div className="so-biz-features-section">
                      <div className="so-biz-features-eyebrow">
                        <span className="so-biz-check-mark">✓</span> EVERYTHING IN PROFESSIONAL, PLUS
                      </div>
                      <div className="so-biz-features-grid">
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="setup" size={14} />
                          </span>
                          <span>Multi-Entity Custom Workflow Engine</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="lock" size={14} />
                          </span>
                          <span>Granular Role-Based Access & Audit Logs</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="chart" size={14} />
                          </span>
                          <span>Custom BI Reports & Executive Analytics</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="globe" size={14} />
                          </span>
                          <span>Multi-Branch & Global Location Governance</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="shield" size={14} />
                          </span>
                          <span>Single Sign-On (SSO), SCIM & Enterprise Security</span>
                        </div>
                        <div className="so-biz-feature-item">
                          <span className="so-biz-feat-icon-box">
                            <Icon name="chat" size={14} />
                          </span>
                          <span>Dedicated Success Manager & 24/7 SLA</span>
                        </div>
                      </div>
                    </div>

                    <div className="so-biz-footer-row">
                      <Link to="/solutions/enterprises" className="so-biz-explore-btn">
                        Explore Solutions <Icon name="arrow" size={14} />
                      </Link>
                      <button type="button" onClick={() => openDemoModal()} className="so-biz-features-link">
                        See all features
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Real UI Dashboard Preview */}
                  <div className="so-biz-visual-col">
                    <div className="so-biz-img-frame">
                      <img
                        src="/images/solution-enterprise.jpg"
                        alt="LattiumHR Enterprise Global Operations Dashboard"
                        className="so-biz-card-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. VERTICAL WORKFLOW SOLUTIONS SECTION (BY INDUSTRY)
            ================================================================= */}
        <section className="so-section so-industry-section" id="industries">
          <div className="container">
            <SectionHeading
              eyebrow="VERTICAL WORKFLOW SOLUTIONS"
              title="Pre-Engineered Solutions for Your Industry's Operating Realities"
              body="Choose your industry to see the exact workflows, compliance and reports we have already built in."
              center
            />

            {/* Industry Pill Tabs */}
            <div className="so-vertical-tabs-wrap">
              {verticalIndustries.map((ind, idx) => {
                const isActive = activeIndustryTab === idx;
                return (
                  <button
                    key={ind.id}
                    type="button"
                    className={`so-vertical-tab-btn ${isActive ? "active" : ""}`}
                    onClick={() => setActiveIndustryTab(idx)}
                  >
                    {ind.name}
                  </button>
                );
              })}
            </div>

            {/* Showcase Card */}
            {(() => {
              const currentIndustry = verticalIndustries[activeIndustryTab] || verticalIndustries[0];
              return (
                <div className="so-vertical-showcase-card">
                  <div className="so-vertical-showcase-grid">
                    {/* Left Column */}
                    <div className="so-vertical-left-col">
                      <span className="so-vertical-industry-eyebrow">VERTICAL WORKFLOW BLUEPRINT</span>
                      <h3 className="so-vertical-industry-name">{currentIndustry.name}</h3>
                      <p className="so-vertical-industry-desc">{currentIndustry.desc}</p>

                      <div className="so-vertical-features-grid">
                        {currentIndustry.features.map((feat, idx) => (
                          <div key={idx} className="so-vertical-feat-card">
                            <div className="so-vertical-feat-icon">
                              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="so-check-svg">
                                <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className="so-vertical-feat-text">
                              <h4 className="so-vertical-feat-title">{feat.title}</h4>
                              <p className="so-vertical-feat-desc">{feat.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="so-vertical-actions-row">
                        <Link to={currentIndustry.link} className="so-vertical-cta-btn">
                          Explore full solution →
                        </Link>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="so-vertical-right-col">
                      <div className="so-vertical-art-banner">
                        <svg viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="so-vertical-art-svg">
                          {/* Left Monitor / Card */}
                          <g transform="translate(35, 20)">
                            <circle cx="50" cy="20" r="14" fill="#004B49" />
                            <rect x="0" y="44" width="100" height="72" rx="8" fill="#00201F" stroke="#00201F" strokeWidth="1.5" />
                            <rect x="16" y="66" width="68" height="6.5" rx="3.25" fill="#F6F8F8" />
                            <rect x="16" y="82" width="46" height="5.5" rx="2.75" fill="#004B49" opacity="0.85" />
                          </g>

                          {/* Right Monitor / Card */}
                          <g transform="translate(185, 20)">
                            <circle cx="50" cy="20" r="14" fill="#004B49" />
                            <rect x="0" y="44" width="100" height="72" rx="8" fill="#00201F" stroke="#00201F" strokeWidth="1.5" />
                            <rect x="18" y="82" width="8" height="20" rx="2" fill="#004B49" />
                            <rect x="33" y="66" width="8" height="36" rx="2" fill="#34d399" />
                            <rect x="48" y="56" width="8" height="46" rx="2" fill="#004B49" />
                            <rect x="63" y="74" width="8" height="28" rx="2" fill="#38bdf8" />
                          </g>
                        </svg>
                      </div>

                      <div className="so-vertical-stat-box">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="so-stat-trend-svg">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        <span>{currentIndustry.stat}</span>
                      </div>

                      <div className="so-vertical-compliance-box">
                        <div className="so-vertical-compliance-title">COMPLIANCE BUILT IN</div>
                        <div className="so-vertical-compliance-pills">
                          {currentIndustry.compliance.map((c) => (
                            <span key={c} className="so-vertical-compliance-pill">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="so-vertical-guarantee-card">
                        <div className="so-vertical-guarantee-icon">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM14.707 7.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="so-vertical-guarantee-content">
                          <strong className="so-vertical-guarantee-title">Pre-Engineered &amp; Audit-Ready</strong>
                          <p className="so-vertical-guarantee-desc">Fully configured to statutory labor acts, provident fund, and TDS guidelines with zero penalty risk.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* =================================================================
            4. FUNCTIONAL LEADERSHIP SOLUTIONS (EXACT REFERENCE PARITY WITH PRIMARY THEME)
            ================================================================= */}
        <section className="so-fl-section" id="roles">
          <div className="container">
            <SectionHeading
              eyebrow="FUNCTIONAL LEADERSHIP SOLUTIONS"
              title="Tailored Solutions for Functional Leaders"
              center
            />

            <div className="so-fl-cards-stack">
              {/* Card 1: HR Teams */}
              <div className="so-fl-card so-fl-card--hr">
                <div className="so-fl-card-grid">
                  {/* Left Column: HR Copy */}
                  <div className="so-fl-copy-col">
                    <div className="so-fl-role-badge">
                      <span className="so-fl-badge-icon">
                        <Icon name="employee" size={13} />
                      </span>
                      <span>HR TEAMS</span>
                    </div>

                    <h3 className="so-fl-card-title">Simplify People Operations</h3>

                    <p className="so-fl-card-desc">
                      Manage your employees, attendance, leave, and documents — all in one place. Spend less time on manual work and more time building a better employee experience.
                    </p>

                    <div className="so-fl-checklist-2col">
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Employee lifecycle management</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Documents &amp; compliance</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Attendance &amp; leave tracking</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Self-service portal</span>
                      </div>
                    </div>

                    <Link to="/solutions/hr-teams" className="so-card-link-btn">
                      Explore HR Solutions →
                    </Link>
                  </div>

                  {/* Right Column: HR Mockup Console */}
                  <div className="so-fl-mockup-wrapper">
                    <div className="so-fl-mockup-window">
                      {/* Mini Sidebar */}
                      <div className="so-fl-sidebar">
                        <div className="so-fl-logo">
                          <span className="so-fl-logo-diamond">◆</span>
                          <span className="so-fl-logo-text">LattiumHR</span>
                        </div>
                        <div className="so-fl-nav">
                          <div className="so-fl-nav-item active">
                            <Icon name="chart" size={11} />
                            <span>Dashboard</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="users" size={11} />
                            <span>Employees</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="attendance" size={11} />
                            <span>Attendance</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="leave" size={11} />
                            <span>Leave</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="document" size={11} />
                            <span>Documents</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="reports" size={11} />
                            <span>Reports</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Console Content */}
                      <div className="so-fl-main-body">
                        {/* Header bar */}
                        <div className="so-fl-console-topbar">
                          <div>
                            <div className="so-fl-greeting">Good morning, Kavya 👋</div>
                            <div className="so-fl-greeting-sub">Here’s what’s happening today</div>
                          </div>
                          <div className="so-fl-topbar-right">
                            <div className="so-fl-search-box">
                              <Icon name="search" size={10} />
                              <span>Search employees...</span>
                            </div>
                            <span className="so-fl-user-avatar">KS</span>
                          </div>
                        </div>

                        {/* 3 Metric Stat Cards */}
                        <div className="so-fl-stats-row">
                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-ico so-fl-stat-ico--green">
                                <Icon name="users" size={11} />
                              </span>
                              <span className="so-fl-stat-name">Total Employees</span>
                            </div>
                            <div className="so-fl-stat-val">248</div>
                            <div className="so-fl-stat-badge so-fl-stat-badge--green">↑ 12 this month</div>
                          </div>

                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-ico so-fl-stat-ico--plum">
                                <Icon name="attendance" size={11} />
                              </span>
                              <span className="so-fl-stat-name">Present Today</span>
                            </div>
                            <div className="so-fl-stat-val">221</div>
                            <div className="so-fl-stat-sub">88% attendance</div>
                          </div>

                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-ico so-fl-stat-ico--amber">
                                <Icon name="leave" size={11} />
                              </span>
                              <span className="so-fl-stat-name">On Leave</span>
                            </div>
                            <div className="so-fl-stat-val">08</div>
                            <div className="so-fl-stat-badge so-fl-stat-badge--amber">3 pending</div>
                          </div>
                        </div>

                        {/* Recent Employees Table */}
                        <div className="so-fl-table-card">
                          <div className="so-fl-table-header-row">
                            <span className="so-fl-table-title">Recent Employees</span>
                            <span className="so-fl-table-viewall">View all →</span>
                          </div>
                          <div className="so-fl-table-head-cols">
                            <span>Name</span>
                            <span>Department</span>
                            <span>Status</span>
                            <span>Join Date</span>
                          </div>
                          <div className="so-fl-table-rows">
                            <div className="so-fl-table-row">
                              <div className="so-fl-emp-info">
                                <span className="so-fl-emp-pic so-fl-emp-pic--1">PS</span>
                                <div>
                                  <div className="so-fl-emp-name">Priya Sharma</div>
                                  <div className="so-fl-emp-role">Product Designer</div>
                                </div>
                              </div>
                              <span className="so-fl-dept-name">Product Design</span>
                              <span><span className="so-fl-status-pill present">Present</span></span>
                              <span className="so-fl-date">Apr 12, 2025</span>
                            </div>

                            <div className="so-fl-table-row">
                              <div className="so-fl-emp-info">
                                <span className="so-fl-emp-pic so-fl-emp-pic--2">RM</span>
                                <div>
                                  <div className="so-fl-emp-name">Rohan Mehta</div>
                                  <div className="so-fl-emp-role">Sales Executive</div>
                                </div>
                              </div>
                              <span className="so-fl-dept-name">Sales</span>
                              <span><span className="so-fl-status-pill present">Present</span></span>
                              <span className="so-fl-date">Apr 06, 2025</span>
                            </div>

                            <div className="so-fl-table-row">
                              <div className="so-fl-emp-info">
                                <span className="so-fl-emp-pic so-fl-emp-pic--3">SI</span>
                                <div>
                                  <div className="so-fl-emp-name">Sneha Iyer</div>
                                  <div className="so-fl-emp-role">HR Executive</div>
                                </div>
                              </div>
                              <span className="so-fl-dept-name">HR</span>
                              <span><span className="so-fl-status-pill leave">On leave</span></span>
                              <span className="so-fl-date">Apr 02, 2025</span>
                            </div>

                            <div className="so-fl-table-row">
                              <div className="so-fl-emp-info">
                                <span className="so-fl-emp-pic so-fl-emp-pic--4">VN</span>
                                <div>
                                  <div className="so-fl-emp-name">Vikram Nair</div>
                                  <div className="so-fl-emp-role">Software Engineer</div>
                                </div>
                              </div>
                              <span className="so-fl-dept-name">Engineering</span>
                              <span><span className="so-fl-status-pill present">Present</span></span>
                              <span className="so-fl-date">Mar 28, 2025</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating badge on right with curved noodle connector */}
                    <div className="so-fl-floating-tag so-fl-floating-tag--hr">
                      <span className="so-fl-tag-ico">
                        <Icon name="check" size={11} />
                      </span>
                      <span>Faster approvals →</span>
                    </div>
                    <svg className="so-fl-noodle-line" viewBox="0 0 65 95" fill="none">
                      <path d="M 2 15 C 30 10, 52 35, 48 58 C 44 78, 12 80, 24 55 C 32 38, 52 42, 62 25" stroke="#004B49" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Line Divider Between Cards */}
              <div className="so-fl-card-divider" />

              {/* Card 2: Finance Teams (Image Left, Text Right) */}
              <div className="so-fl-card so-fl-card--finance so-fl-card--reverse">
                <div className="so-fl-card-grid">
                  {/* Left Column: Finance Mockup Console */}
                  <div className="so-fl-mockup-wrapper">
                    <div className="so-fl-mockup-window">
                      {/* Mini Sidebar */}
                      <div className="so-fl-sidebar">
                        <div className="so-fl-logo">
                          <span className="so-fl-logo-diamond">◆</span>
                          <span className="so-fl-logo-text">LattiumHR</span>
                        </div>
                        <div className="so-fl-nav">
                          <div className="so-fl-nav-item">
                            <Icon name="chart" size={11} />
                            <span>Dashboard</span>
                          </div>
                          <div className="so-fl-nav-item active">
                            <Icon name="payroll" size={11} />
                            <span>Payroll</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="reports" size={11} />
                            <span>Reports</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="finance" size={11} />
                            <span>Finance</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="setup" size={11} />
                            <span>Settings</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Console Content */}
                      <div className="so-fl-main-body">
                        {/* Header bar */}
                        <div className="so-fl-console-topbar">
                          <div className="so-fl-payroll-heading">Payroll Overview</div>
                          <div className="so-fl-month-dropdown">
                            <Icon name="calendar" size={10} />
                            <span>Apr 2025</span>
                            <span className="so-fl-dropdown-arrow">∨</span>
                          </div>
                        </div>

                        {/* 3 Metric Stat Cards */}
                        <div className="so-fl-stats-row">
                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-name">Total Payroll</span>
                            </div>
                            <div className="so-fl-stat-val">{isIndia ? "₹ 48,75,000" : "$ 59,200"}</div>
                            <div className="so-fl-stat-badge so-fl-stat-badge--green">↑ 2.5% vs last month</div>
                          </div>

                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-name">Processed</span>
                            </div>
                            <div className="so-fl-stat-val">248</div>
                            <div className="so-fl-stat-sub">employees</div>
                          </div>

                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-name">Pending Approvals</span>
                            </div>
                            <div className="so-fl-stat-val so-fl-stat-val--amber">2</div>
                            <div className="so-fl-stat-badge so-fl-stat-badge--amber">items</div>
                          </div>
                        </div>

                        {/* Lower Dual Grid: Donut Chart Breakdown + Quick Actions */}
                        <div className="so-fl-fin-lower-grid">
                          {/* Payroll Breakdown Donut Chart */}
                          <div className="so-fl-donut-panel">
                            <div className="so-fl-panel-title">Payroll Breakdown</div>
                            <div className="so-fl-donut-content">
                              <div className="so-fl-donut-svg-wrap">
                                <svg viewBox="0 0 100 100" className="so-fl-donut-svg">
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="13" />
                                  {/* Basic: 62% */}
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#004B49" strokeWidth="13"
                                    strokeDasharray="148 238.76" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                                  {/* Allowances: 18% */}
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#004B49" strokeWidth="13"
                                    strokeDasharray="43 238.76" strokeDashoffset="-148" transform="rotate(-90 50 50)" />
                                  {/* Deductions: 12% */}
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#7C8886" strokeWidth="13"
                                    strokeDasharray="28.6 238.76" strokeDashoffset="-191" transform="rotate(-90 50 50)" />
                                  {/* Other: 8% */}
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="13"
                                    strokeDasharray="19.1 238.76" strokeDashoffset="-219.6" transform="rotate(-90 50 50)" />
                                </svg>
                                <div className="so-fl-donut-center-text">
                                  <span className="amount">{isIndia ? "₹48.75L" : "$59.2K"}</span>
                                  <span className="lbl">Total</span>
                                </div>
                              </div>

                              <div className="so-fl-donut-legend">
                                <div className="so-fl-legend-item">
                                  <span className="dot" style={{ background: "#004B49" }} />
                                  <span className="name">Basic Salary</span>
                                  <span className="pct">62%</span>
                                </div>
                                <div className="so-fl-legend-item">
                                  <span className="dot" style={{ background: "#004B49" }} />
                                  <span className="name">Allowances</span>
                                  <span className="pct">18%</span>
                                </div>
                                <div className="so-fl-legend-item">
                                  <span className="dot" style={{ background: "#7C8886" }} />
                                  <span className="name">Deductions</span>
                                  <span className="pct">12%</span>
                                </div>
                                <div className="so-fl-legend-item">
                                  <span className="dot" style={{ background: "#f59e0b" }} />
                                  <span className="name">Other</span>
                                  <span className="pct">8%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions Panel */}
                          <div className="so-fl-actions-panel">
                            <div className="so-fl-panel-title">Quick Actions</div>
                            <div className="so-fl-action-items">
                              <div className="so-fl-action-btn">
                                <span className="so-fl-action-icon so-fl-action-icon--pink">
                                  <Icon name="zap" size={11} />
                                </span>
                                <span className="so-fl-action-label">Run Payroll</span>
                                <span className="so-fl-action-arrow">→</span>
                              </div>
                              <div className="so-fl-action-btn">
                                <span className="so-fl-action-icon so-fl-action-icon--purple">
                                  <Icon name="document" size={11} />
                                </span>
                                <span className="so-fl-action-label">Generate Reports</span>
                                <span className="so-fl-action-arrow">→</span>
                              </div>
                              <div className="so-fl-action-btn">
                                <span className="so-fl-action-icon so-fl-action-icon--purple">
                                  <Icon name="finance" size={11} />
                                </span>
                                <span className="so-fl-action-label">View Payslips</span>
                                <span className="so-fl-action-arrow">→</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating badge on right */}
                    <div className="so-fl-floating-tag so-fl-floating-tag--fin">
                      <span className="so-fl-tag-ico so-fl-tag-ico--fin">
                        <Icon name="chart" size={11} />
                      </span>
                      <span>Better visibility →</span>
                    </div>
                  </div>

                  {/* Right Column: Finance Copy */}
                  <div className="so-fl-copy-col">
                    <div className="so-fl-role-badge so-fl-role-badge--fin">
                      <span className="so-fl-badge-icon">
                        <Icon name="wallet" size={13} />
                      </span>
                      <span>FINANCE TEAMS</span>
                    </div>

                    <h3 className="so-fl-card-title">Gain Financial Clarity</h3>

                    <p className="so-fl-card-desc">
                      Streamline payroll processing, improve cost visibility, and simplify reporting — so your finance team can focus on what matters most.
                    </p>

                    <div className="so-fl-checklist-2col">
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Payroll processing</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Reports &amp; audit trails</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Cost &amp; budget visibility</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Statutory compliance</span>
                      </div>
                    </div>

                    <Link to="/solutions/finance-teams" className="so-card-link-btn">
                      Explore Finance Solutions →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            4. MIDDLE CTA SECTION (Above Distributed Branch Architecture)
            ================================================================= */}
        <section className="so-middle-cta-section">
          <div className="container">
            <div className="so-middle-cta-banner">
              <div className="so-middle-cta-grid">
                {/* Left Side: Multi-Entity Global Network Architecture Image */}
                <div className="so-middle-cta-img-wrap">
                  <img
                    src="/images/middle-cta-network.jpg"
                    alt="Multi-Entity Management global data network hub"
                    className="so-middle-cta-img"
                    loading="lazy"
                  />
                </div>

                {/* Right Side: Text Content and Button */}
                <div className="so-middle-cta-content">
                  <span className="so-cta-eyebrow">
                    <Icon name="globe" size={13} /> MULTI-ENTITY HRMS
                  </span>
                  <h2 className="so-middle-cta-title">
                    One HRMS for Every <br />
                    Branch <span className="so-cta-title-accent">&amp; Country</span>
                  </h2>
                  <p className="so-middle-cta-desc">
                    Run payroll, attendance and compliance for all your locations from one dashboard. See how it fits your team in a free walkthrough.
                  </p>

                  <div className="so-middle-cta-actions">
                    <button
                      type="button"
                      onClick={() =>
                        openDemoModal({
                          title: "Get Free HRMS Plan",
                          subtitle: "Run payroll, attendance and compliance for all your locations from one dashboard in a 30-min walkthrough",
                        })
                      }
                      className="so-middle-cta-btn"
                    >
                      Get Free HRMS Plan <Icon name="arrow" size={15} />
                    </button>
                  </div>

                  <div className="so-cta-points-row">
                    <span className="so-cta-point">
                      <Icon name="check" size={13} /> 30-min walkthrough
                    </span>
                    <span className="so-cta-point">
                      <Icon name="check" size={13} /> Custom migration plan
                    </span>
                    <span className="so-cta-point">
                      <Icon name="check" size={13} /> Zero obligation
                    </span>
                  </div>
                </div>
              </div>

              {/* Ambient bottom-right sparkle */}
              <div className="so-cta-sparkle" aria-hidden="true">
                <Icon name="sparkle" size={20} />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            5. FAQ SECTION (EXACT REFERENCE PARITY)
            ================================================================= */}
        <section className="faq-section" id="faq">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title="Everything you need to know"
                body="Can’t find what you’re looking for? Our team is happy to help."
              />
              <Link className="text-link" to="/faq#pricing-and-plans">
                View all FAQs <Icon name="arrow" size={17} />
              </Link>
            </div>

            <div className="faq-list">
              {faqList.map((f, i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.question}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{f.question}</span>
                    <i>{openFaq === i ? "−" : "+"}</i>
                  </button>
                  {openFaq === i && <p>{f.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default SolutionsOverview;
