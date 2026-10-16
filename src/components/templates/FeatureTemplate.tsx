import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import SEO from "../layout/SEO";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Icon, { IconName } from "../ui/Icon";
import {
  FeatureData,
  DemoTabItem,
  WorkflowStep,
  ConnectedModuleItem,
  BusinessValueItem,
} from "../../data/featuresData";

export function FeatureTemplate({ feature }: { feature: FeatureData }) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const breadcrumbs = [
    { label: "Product", to: "/product" },
    { label: feature.title },
  ];

  // Resolve 3-tab interactive demo data with fallbacks
  const demoTabs: DemoTabItem[] =
    feature.demoTabs && feature.demoTabs.length > 0
      ? feature.demoTabs
      : [
          {
            id: "records",
            label: "Daily Records",
            icon: "document",
            title: `${feature.title} Dashboard`,
            subtitle: `Real-time synchronized operations across branches`,
            kpis: [
              { value: feature.roiStats[0]?.value || "100%", label: feature.roiStats[0]?.label || "Operational Accuracy" },
              { value: feature.roiStats[1]?.value || "98%", label: feature.roiStats[1]?.label || "On-Time Compliance" },
              { value: feature.roiStats[2]?.value || "0 Days", label: feature.roiStats[2]?.label || "Audit Preparedness" },
            ],
            rows: [
              { badge: "Verified", badgeColor: "green", title: "Automated Policy Validation", desc: "Live multi-branch rules verified against organizational policies", value: "Active ✓" },
              { badge: "Synced", badgeColor: "blue", title: "Cross-Branch Synchronization", desc: "Mumbai, Bengaluru & Delhi hubs reporting in real time", value: "Real-Time" },
              { badge: "Audit Ready", badgeColor: "purple", title: "Encrypted Cloud Records", desc: "Point-in-time snapshot with tamper-proof audit trails", value: "Secured" },
              { badge: "Notice", badgeColor: "orange", title: "Scheduled Policy Review", desc: "Automatic verification routine scheduled for next cycle", value: "Scheduled" },
            ],
          },
          {
            id: "workflows",
            label: "Workflows & Rules",
            icon: "setup",
            title: "Configurable Rule Engine",
            subtitle: "Custom approval tiers, policy triggers, and exception handling",
            kpis: [
              { value: "4 Tiers", label: "Managerial Levels" },
              { value: "100%", label: "Policy Coverage" },
              { value: "Instant", label: "Exception Alerts" },
            ],
            rows: [
              { badge: "Configured", badgeColor: "green", title: "Automated Escalation Rule", desc: "Approvals pending > 24 hours route to department heads", value: "Active ✓" },
              { badge: "Branch Rule", badgeColor: "purple", title: "Regional Policy Overrides", desc: "City-specific adjustments applied without breaking global templates", value: "Enabled" },
              { badge: "Notification", badgeColor: "blue", title: "Smart Mobile Alerts", desc: "Direct smartphone push notices for action-required items", value: "Live" },
            ],
          },
          {
            id: "reports",
            label: "Audit & Reports",
            icon: "reports",
            title: "Executive Summaries & Exports",
            subtitle: "Point-in-time audit reports, Excel sheets, and statutory registers",
            kpis: [
              { value: "50+ Built-In", label: "Export Formats" },
              { value: "1-Click", label: "Excel & PDF" },
              { value: "100%", label: "Audit Traceable" },
            ],
            rows: [
              { badge: "Report Ready", badgeColor: "green", title: "Monthly Executive Summary", desc: "Comprehensive branch performance and compliance health check", value: "Ready" },
              { badge: "Export", badgeColor: "blue", title: "Statutory Register Format", desc: "Inspector-ready export generated with full historical data", value: "Generated" },
              { badge: "Compliance", badgeColor: "purple", title: "Immutable Audit Ledger", desc: "Every administrative edit logged with user IP and timestamp", value: "Protected" },
            ],
          },
        ];

  const activeTab = demoTabs[activeTabIdx] || demoTabs[0];

  // Resolve 4 workflow steps with fallbacks
  const workflowSteps: WorkflowStep[] =
    feature.workflowSteps && feature.workflowSteps.length > 0
      ? feature.workflowSteps
      : [
          {
            step: "01",
            title: "Configure & Set Rules",
            desc: `Define custom branch parameters, approval hierarchies, and policy thresholds for ${feature.title}.`,
            icon: "setup",
          },
          {
            step: "02",
            title: "Record & Automate",
            desc: "Staff interact via mobile and web self-service while the automated engine captures verified inputs.",
            icon: "clock",
          },
          {
            step: "03",
            title: "Review & Resolve Exceptions",
            desc: "Managers receive instant notifications for irregularities, approving requests with 1-click controls.",
            icon: "check",
          },
          {
            step: "04",
            title: "Sync & Generate Reports",
            desc: "Validated outputs push seamlessly into payroll, statutory records, and executive dashboards.",
            icon: "reports",
          },
        ];

  // Resolve connected modules with fallbacks
  const connectedModules: ConnectedModuleItem[] =
    feature.connectedModules && feature.connectedModules.length > 0
      ? feature.connectedModules
      : ([
          {
            slug: "employee-management",
            title: "Employee Management",
            icon: "employee",
            desc: "Supplies centralized worker directory profiles, department tags, and manager reporting lines.",
          },
          {
            slug: "attendance-management",
            title: "Attendance Management",
            icon: "attendance",
            desc: "Feeds verified work hours, biometric punches, and geofenced branch presences automatically.",
          },
          {
            slug: "payroll-management",
            title: "Payroll Management",
            icon: "payroll",
            desc: "Calculates salary disbursements, statutory deductions, and bank payouts based on verified data.",
          },
        ] as ConnectedModuleItem[]).filter((m) => m.slug !== feature.slug);

  // Resolve business values with fallbacks
  const businessValues: BusinessValueItem[] =
    feature.businessValues && feature.businessValues.length > 0
      ? feature.businessValues
      : [
          {
            metric: feature.roiStats[0]?.value || "100%",
            title: "Immediate Operational Efficiency",
            desc: feature.roiStats[0]?.desc || "Eliminate administrative bottlenecks and manual cross-checks.",
            icon: "clock",
          },
          {
            metric: feature.roiStats[1]?.value || "Zero",
            title: "Complete Data Accuracy",
            desc: feature.roiStats[1]?.desc || "Single source of truth prevents duplicate entries across branches.",
            icon: "check",
          },
          {
            metric: "Bank-Grade",
            title: "Built-In Security & Compliance",
            desc: "Role-based access controls safeguard sensitive employee data and statutory registers.",
            icon: "shield",
          },
          {
            metric: feature.roiStats[2]?.value || "Real-Time",
            title: "End-to-End Visibility",
            desc: feature.roiStats[2]?.desc || "Leadership gets instant insights across all offices and satellite hubs.",
            icon: "globe",
          },
        ];

  return (
    <PageLayout hideCTA breadcrumbs={breadcrumbs}>
      <SEO
        title={feature.title}
        description={feature.subhead}
        canonicalPath={`/features/${feature.slug}`}
      />

      {/* =========================================================================
          SECTION 1: PRODUCT HERO
          Module-specific headline, supporting desc, Request a Demo CTA,
          Explore Features link, and relevant product UI preview mockup
          ========================================================================= */}
      <section className="product-hero-section">
        <div className="hero-glow" />
        <div className="container product-hero-grid">
          <div className="product-hero-copy">
            <span className="hero-badge">
              <i>
                <Icon name="sparkle" size={13} />
              </i>
              {feature.badge}
            </span>
            <h1>{feature.headline}</h1>
            <p className="product-hero-subhead">{feature.subhead}</p>
            <div className="product-hero-actions">
              <Button to="/request-demo">
                Request a Demo <Icon name="arrow" size={16} />
              </Button>
              <Button href="#demo" secondary>
                Explore Features
              </Button>
            </div>
            <div className="product-hero-trust">
              <span>
                <Icon name="check" size={14} /> Bank-grade security
              </span>
              <span>
                <Icon name="check" size={14} /> Multi-branch real-time sync
              </span>
              <span>
                <Icon name="check" size={14} /> Go live in 2–4 weeks
              </span>
            </div>
          </div>

          {/* Hero Product UI Preview Mockup */}
          <div className="product-hero-preview-col">
            <div className="feature-mockup-card hero-preview-card">
              <div className="mockup-header-bar">
                <div>
                  <strong>{feature.mockupTitle}</strong>
                  <small>{feature.mockupSubtitle}</small>
                </div>
                <span className="mockup-status-pill">
                  <Icon name="check" size={12} /> Active Sync
                </span>
              </div>

              <div className="mockup-body-preview">
                <div className="mockup-stats-strip">
                  {feature.roiStats.map((stat, idx) => (
                    <div key={idx} className="mini-stat">
                      <strong>{stat.value}</strong>
                      <small>{stat.label}</small>
                    </div>
                  ))}
                </div>

                <div className="mockup-list-simulated">
                  <div className="sim-row">
                    <span className="sim-badge green">Verified</span>
                    <span>Automated rule engine active</span>
                    <em>100% compliant</em>
                  </div>
                  <div className="sim-row">
                    <span className="sim-badge purple">Multi-Branch</span>
                    <span>Mumbai, Bengaluru & Delhi synced</span>
                    <em>Real-time</em>
                  </div>
                  <div className="sim-row">
                    <span className="sim-badge orange">Audit Ready</span>
                    <span>Encrypted cloud records</span>
                    <em>Secured</em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CORE CAPABILITIES
          3 or 4 key capabilities using existing Home page card design
          ========================================================================= */}
      <section className="product-capabilities-section" id="capabilities">
        <div className="container">
          <SectionHeading
            eyebrow="CORE CAPABILITIES"
            title={`Everything you need in ${feature.title}`}
            body="Purpose-built workflows and automated rule engines designed to eliminate manual guesswork and keep operations running smoothly."
            center
          />
          <div className="product-capabilities-grid">
            {feature.capabilities.slice(0, 4).map((cap, idx) => (
              <div key={idx} className="capability-card product-cap-card">
                <div className="cap-icon-box">
                  <Icon name={cap.icon} size={20} />
                </div>
                <div className="cap-content">
                  <div className="cap-header-row">
                    <strong>{cap.title}</strong>
                    {cap.tag && <span className="cap-tag">{cap.tag}</span>}
                  </div>
                  <p>{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE PRODUCT DEMONSTRATION
          Interactive tabs displaying different aspects of the specific module
          ========================================================================= */}
      <section className="product-demo-section" id="demo">
        <div className="container">
          <SectionHeading
            eyebrow="INTERACTIVE DEMONSTRATION"
            title={`Experience ${feature.title} in Action`}
            body="Click between module views to explore how your team interacts with live records, workflows, and automated checks."
            center
          />

          {/* Interactive Tab Switcher */}
          <div className="demo-tabs-nav">
            {demoTabs.map((tab, idx) => (
              <button
                key={tab.id || idx}
                type="button"
                className={`demo-tab-btn ${activeTabIdx === idx ? "active" : ""}`}
                onClick={() => setActiveTabIdx(idx)}
                aria-selected={activeTabIdx === idx}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Representative UI Mockup */}
          <div className="demo-mockup-frame">
            <div className="demo-mockup-header">
              <div className="demo-header-info">
                <strong>{activeTab.title}</strong>
                <small>{activeTab.subtitle}</small>
              </div>
              <span className="mockup-status-pill">
                <Icon name="check" size={12} /> Active View
              </span>
            </div>

            <div className="demo-kpis-strip">
              {activeTab.kpis.map((kpi, kIdx) => (
                <div key={kIdx} className="demo-kpi-item">
                  <strong>{kpi.value}</strong>
                  <small>{kpi.label}</small>
                </div>
              ))}
            </div>

            <div className="demo-rows-table">
              {activeTab.rows.map((row, rIdx) => (
                <div key={rIdx} className="demo-row-item">
                  <span className={`sim-badge ${row.badgeColor || "green"}`}>
                    {row.badge}
                  </span>
                  <div className="demo-row-details">
                    <strong>{row.title}</strong>
                    <small>{row.desc}</small>
                  </div>
                  <span className="demo-row-val">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOW IT WORKS
          3 or 4 connected steps with subtle styling (horizontal desktop, vertical mobile)
          ========================================================================= */}
      <section className="product-how-section">
        <div className="container">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title={`Connected 4-step workflow for ${feature.title}`}
            body="A proven, transparent process that eliminates administrative friction and gives every stakeholder clarity."
            center
          />

          <div className="workflow-steps-wrapper">
            <div className="workflow-steps-grid">
              {workflowSteps.map((st, idx) => (
                <div key={idx} className="workflow-step-card">
                  <div className="step-badge-row">
                    <span className="step-num">{st.step}</span>
                    <div className="step-icon-wrap">
                      <Icon name={st.icon} size={18} />
                    </div>
                  </div>
                  <strong>{st.title}</strong>
                  <p>{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ONE MIDDLE REQUEST A DEMO CTA
          Immediately after How It Works and before Connected HRMS Modules.
          Required text:
          Heading: "See How It Works for Your Team"
          Supporting text: "Explore the module in a personalized walkthrough and see how it fits your HR processes."
          Button: "Request a Demo" -> /request-demo
          ========================================================================= */}
      <section className="product-middle-cta-section">
        <div className="container">
          <div className="product-middle-cta-card">
            <div className="middle-cta-content">
              <span className="eyebrow">TAILORED WALKTHROUGH</span>
              <h2>See How It Works for Your Team</h2>
              <p>
                Explore the module in a personalized walkthrough and see how it fits your HR processes.
              </p>
            </div>
            <div className="middle-cta-action">
              <Button to="/request-demo">
                Request a Demo <Icon name="arrow" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CONNECTED HRMS MODULES
          Compact cards linking to existing product routes
          ========================================================================= */}
      <section className="product-connected-section">
        <div className="container">
          <SectionHeading
            eyebrow="CONNECTED HRMS MODULES"
            title="Seamless data sync across the LattiumHR ecosystem"
            body={`See how ${feature.title} automatically coordinates with your other operational HR modules.`}
            center
          />

          <div className="connected-modules-grid">
            {connectedModules.map((mod, idx) => (
              <Link
                key={idx}
                to={`/features/${mod.slug}`}
                className="connected-module-card"
              >
                <div className="conn-icon-box">
                  <Icon name={mod.icon} size={22} />
                </div>
                <div className="conn-info">
                  <strong>{mod.title}</strong>
                  <p>{mod.desc}</p>
                </div>
                <span className="conn-link-label">
                  Explore module <Icon name="arrow" size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: BUSINESS VALUE
          3 or 4 practical benefits with clear metrics and concise descriptions
          ========================================================================= */}
      <section className="product-value-section">
        <div className="container">
          <SectionHeading
            eyebrow="BUSINESS VALUE"
            title={`Measurable business impact of ${feature.title}`}
            body="Tangible operational results that protect company compliance, save management time, and empower your workforce."
            center
          />

          <div className="business-value-grid">
            {businessValues.map((bv, idx) => (
              <div key={idx} className="business-value-card">
                <div className="bv-header-row">
                  <span className="bv-metric">{bv.metric}</span>
                  <div className="bv-icon-box">
                    <Icon name={bv.icon} size={18} />
                  </div>
                </div>
                <strong>{bv.title}</strong>
                <p>{bv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: PRODUCT-SPECIFIC FAQS
          Interactive accordion with toggle (+ and −)
          ========================================================================= */}
      {feature.faqs.length > 0 && (
        <section className="product-faq-section">
          <div className="container">
            <SectionHeading
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              title={`Common questions about ${feature.title}`}
              body="Everything you need to know about policy customization, multi-branch setup, and data security."
              center
            />
            <div className="feature-faq-list">
              {feature.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`faq-item ${openFaq === idx ? "open" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <i>{openFaq === idx ? "−" : "+"}</i>
                  </button>
                  {openFaq === idx && <p>{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 9: FINAL REQUEST A DEMO CTA
          Final conversion section matching Home page visual design (.final-cta)
          ========================================================================= */}
      <section className="final-cta product-final-cta">
        <div className="container final-grid">
          <div>
            <span className="eyebrow">READY TO SIMPLIFY HR?</span>
            <h2>Transform how your team manages {feature.title.toLowerCase()}.</h2>
            <p>
              Join 500+ growing multi-branch businesses running HR, attendance, and payroll on LattiumHR.
            </p>
            <div className="final-actions">
              <Button to="/request-demo">
                Book a Free Demo <Icon name="arrow" />
              </Button>
              <Button to="/product" secondary>
                Explore All Modules
              </Button>
            </div>
            <div className="final-points">
              <span>
                <Icon name="check" /> Free personalized 30-min walkthrough
              </span>
              <span>
                <Icon name="check" /> Dedicated onboarding specialist
              </span>
              <span>
                <Icon name="check" /> Go live in 2–4 weeks
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default FeatureTemplate;
