import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

export function PartnersPage() {
  const breadcrumbs = [
    { label: "Company", to: "/about" },
    { label: "Partners" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Partner Network | LattiumHR Partner Program"
        description="Collaborate with LattiumHR as an implementation partner, HR consultancy, or technology integrator."
        canonicalPath="/partners"
      />

      <section className="partners-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="briefcase" size={14} /> PARTNER NETWORK
            </span>
            <h1>Grow your consulting practice with LattiumHR</h1>
            <p>
              Join chartered accountants, HR consultants, and IT integrators empowering growing
              businesses with modern workforce management.
            </p>
            <div className="feature-hero-actions">
              <Button to="/contact">
                Apply to Become a Partner <Icon name="arrow" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Tracks */}
      <section className="partner-tracks-section">
        <div className="container">
          <SectionHeading
            eyebrow="PARTNER TRACKS"
            title="Choose your collaboration pathway"
            body="Tailored programs designed for implementation consultants, HR advisors, and technology providers."
            center
          />

          <div className="partner-tracks-grid">
            <div className="partner-track-card">
              <div className="track-icon-box purple">
                <Icon name="users" size={24} />
              </div>
              <h3>HR & Payroll Consultants</h3>
              <p>
                Recommend a reliable, compliant HRMS to your SME clients and earn recurring commissions
                or deliver value-added payroll services.
              </p>
              <ul>
                <li>Dedicated partner portal & sandbox</li>
                <li>Attractive recurring revenue share</li>
                <li>Direct access to senior advisory support</li>
              </ul>
            </div>

            <div className="partner-track-card">
              <div className="track-icon-box orange">
                <Icon name="setup" size={24} />
              </div>
              <h3>System Integrators</h3>
              <p>
                Lead customer implementations, data migrations, biometric device installations, and
                custom ERP workflow integrations.
              </p>
              <ul>
                <li>Certified implementation enablement</li>
                <li>Technical onboarding documentation</li>
                <li>Co-marketing and qualified client leads</li>
              </ul>
            </div>

            <div className="partner-track-card">
              <div className="track-icon-box green">
                <Icon name="award" size={24} />
              </div>
              <h3>Chartered Accountants & Payroll Firms</h3>
              <p>
                Streamline client tax filings, PF/ESI challans, and salary disbursements with error-free
                data feeds directly from LattiumHR.
              </p>
              <ul>
                <li>Automated ECR text file exports</li>
                <li>Multi-client unified dashboard view</li>
                <li>Prioritized audit period support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Application Banner */}
      <section className="partner-cta-section">
        <div className="container">
          <div className="partner-banner-box">
            <div>
              <h3>Ready to join our partner ecosystem?</h3>
              <p>Schedule a 20-minute partner introduction with our alliance directors.</p>
            </div>
            <Button to="/contact">
              Connect with Partner Team <Icon name="arrow" size={16} />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default PartnersPage;
