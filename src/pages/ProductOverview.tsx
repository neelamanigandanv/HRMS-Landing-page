import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { productNavItems } from "../data/navigationData";

export function ProductOverview() {
  const breadcrumbs = [{ label: "Product" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Product Overview | All-In-One HRMS Platform"
        description="Explore LattiumHR's modular workforce architecture: Core HR, attendance geofencing, statutory payroll, asset tracking, and reports."
        canonicalPath="/product"
      />

      {/* Hero */}
      <section className="product-overview-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="sparkle" size={14} /> COMPLETE HR SUITE
            </span>
            <h1>One connected platform for your entire workforce lifecycle</h1>
            <p>
              Replace disconnected tools with a unified operating system for people operations. Every
              module connects seamlessly—from your first interview to final payslips and asset
              returns.
            </p>
            <div className="feature-hero-actions">
              <Button to="/request-demo">
                Request a Live Demo <Icon name="arrow" size={16} />
              </Button>
              <Button to="/solutions" secondary>
                View by Solution
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="product-pillars-section">
        <div className="container">
          <SectionHeading
            eyebrow="CORE PLATFORM PILLARS"
            title="Engineered for multi-branch organizations"
            body="Every module shares the same underlying employee database, approval engine, and security perimeter."
            center
          />

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon purple">
                <Icon name="employee" size={24} />
              </div>
              <h3>1. Unified Workforce Data</h3>
              <p>
                A single source of truth for all employee profiles, bank accounts, identity documents,
                and reporting structures across all branches.
              </p>
              <ul>
                <li>Digital employee records & KYC</li>
                <li>Dynamic multi-branch org charts</li>
                <li>Employee self-service portal</li>
              </ul>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon orange">
                <Icon name="attendance" size={24} />
              </div>
              <h3>2. Time & Attendance Engine</h3>
              <p>
                Capture verified attendance from mobile geofencing and biometric terminals, feeding clean
                hours directly into salary processing.
              </p>
              <ul>
                <li>GPS geofenced mobile clock-in</li>
                <li>Biometric device cloud sync</li>
                <li>Leave quotas & regional holidays</li>
              </ul>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon green">
                <Icon name="payroll" size={24} />
              </div>
              <h3>3. 100% Compliant Payroll</h3>
              <p>
                Automate complex statutory rules (PF, ESI, PT, TDS) and generate bank-ready disbursement
                sheets in under 30 minutes.
              </p>
              <ul>
                <li>Statutory ECR and ESIC filings</li>
                <li>Direct NEFT/RTGS bank files</li>
                <li>Digital password-protected payslips</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Catalog Grid */}
      <section className="product-catalog-section">
        <div className="container">
          <SectionHeading
            eyebrow="EXPLORE ALL MODULES"
            title="Explore our dedicated feature modules"
            body="Click any module to read detailed capabilities, workflow breakdowns, and operational ROI."
            center
          />

          <div className="feature-catalog-grid">
            {productNavItems.slice(1).map((item) => (
              <Link key={item.href} to={item.href} className="catalog-card">
                <div className="catalog-card-header">
                  <span className="catalog-icon">
                    <Icon name={item.icon || "check"} size={22} />
                  </span>
                  {item.badge && <span className="mini-badge">{item.badge}</span>}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="catalog-explore-btn">
                  Explore Module <Icon name="arrow" size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Integration */}
      <section className="product-integrations-section">
        <div className="container">
          <div className="integration-banner">
            <div>
              <span className="eyebrow">SEAMLESS INTEROPERABILITY</span>
              <h2>Connects with your existing corporate ecosystem</h2>
              <p>
                Sync with biometric hardware, commercial banking portals, and external directories
                without expensive custom coding.
              </p>
            </div>
            <div className="integration-chips">
              <span>eSSL & ZKTeco</span>
              <span>HDFC Corporate</span>
              <span>ICICI Bank</span>
              <span>EPFO Portal</span>
              <span>ESIC System</span>
              <span>Google Workspace</span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ProductOverview;
