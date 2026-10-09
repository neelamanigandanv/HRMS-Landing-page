import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

export function SecurityPage() {
  const breadcrumbs = [
    { label: "Company", to: "/about" },
    { label: "Trust & Security" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Trust & Security Architecture | LattiumHR"
        description="Learn how LattiumHR protects confidential employee identity and financial data with encryption, role-based access control, and continuous monitoring."
        canonicalPath="/security"
      />

      <section className="security-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="shield" size={14} /> SECURITY & PRIVACY
            </span>
            <h1>Bank-grade security built for sensitive workforce data</h1>
            <p>
              Your employee identity documents, personal bank accounts, and salary numbers represent
              your organization’s most confidential records. We protect them with rigorous safeguards.
            </p>
          </div>
        </div>
      </section>

      {/* Security Architecture Pillars */}
      <section className="security-pillars-section">
        <div className="container">
          <SectionHeading
            eyebrow="SECURITY ARCHITECTURE"
            title="Comprehensive data protection at every layer"
            body="Our multi-layered security controls safeguard your data from physical storage through network transmission."
            center
          />

          <div className="security-pillars-grid">
            <div className="sec-pillar-card">
              <div className="sec-icon-box purple">
                <Icon name="lock" size={24} />
              </div>
              <h3>Data Encryption</h3>
              <p>
                All data is encrypted at rest using industry-standard AES-256 encryption. All communications
                between employee devices and our cloud servers are encrypted using modern TLS 1.3
                protocols.
              </p>
              <ul>
                <li>Encrypted database volumes & document vaults</li>
                <li>Hashed user passwords using salted bcrypt</li>
                <li>Strict HTTPS enforcement across all endpoints</li>
              </ul>
            </div>

            <div className="sec-pillar-card">
              <div className="sec-icon-box orange">
                <Icon name="role" size={24} />
              </div>
              <h3>Access Governance & RBAC</h3>
              <p>
                Granular role-based permissions and field-level masking ensure team members only view
                information necessary for their designated responsibilities.
              </p>
              <ul>
                <li>Two-Factor Authentication (2FA) for admins</li>
                <li>Optional office IP network whitelisting</li>
                <li>Branch and department geographic boundaries</li>
              </ul>
            </div>

            <div className="sec-pillar-card">
              <div className="sec-icon-box green">
                <Icon name="reports" size={24} />
              </div>
              <h3>Auditing & Disaster Recovery</h3>
              <p>
                Automated continuous backups and immutable audit trails capture every system access,
                export, and administrative setting modification.
              </p>
              <ul>
                <li>Encrypted daily point-in-time database backups</li>
                <li>Multi-zone disaster recovery redundancy</li>
                <li>Timestamped change logs for compliance audits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Notice with Marked Placeholder */}
      <section className="security-compliance-section">
        <div className="container" style={{ maxWidth: "860px" }}>
          <div className="security-compliance-box">
            <div className="sec-notice-header">
              <Icon name="shield" size={22} className="alert-icon" />
              <div>
                <strong>Data Hosting & Verification Notice:</strong>
                <p>
                  Customer data is hosted in Tier-III cloud data centers located geographically within
                  India [e.g., AWS Asia Pacific Mumbai Region / Azure Central India].
                </p>
              </div>
            </div>

            <div className="sec-placeholders-list">
              <h4>Formal Audit & Certification Status:</h4>
              <p>
                LattiumHR follows ISO 27001 and SOC 2 Type II operational security frameworks.
                Official third-party audit reports and SOC 2 attestations are available to enterprise
                customers under NDA upon formal compliance review.
              </p>
              <div className="placeholder-tag-box">
                <em>[Placeholder: Insert formal SOC 2 Type II audit report date and DPO contact upon annual third-party verification]</em>
              </div>
            </div>

            <div className="sec-report-cta">
              <p>Found a vulnerability or have specific compliance questionnaires for your Infosec team?</p>
              <Button to="/contact" secondary>
                Contact Security Team <Icon name="arrow" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default SecurityPage;
