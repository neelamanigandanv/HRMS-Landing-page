import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

export function CareersPage() {
  const openRoles = [
    {
      title: "Senior Full-Stack Engineer (React & Node)",
      department: "Engineering",
      location: "Bengaluru / Hybrid",
      type: "Full-Time",
      description: "Build high-throughput payroll processing engines and resilient mobile geofencing synchronization pipelines.",
    },
    {
      title: "Product Implementation Specialist",
      department: "Customer Success",
      location: "Mumbai HQ",
      type: "Full-Time",
      description: "Guide multi-branch retail and services clients through data migration, policy configuration, and manager onboarding.",
    },
    {
      title: "Statutory Payroll & Compliance Lead",
      department: "Product & Operations",
      location: "Mumbai / Hybrid",
      type: "Full-Time",
      description: "Ensure LattiumHR's calculation rules stay ahead of evolving PF, ESI, state PT, and TDS regulatory updates.",
    },
    {
      title: "Enterprise Account Executive",
      department: "Sales",
      location: "Delhi NCR / Mumbai",
      type: "Full-Time",
      description: "Partner with founders, CFOs, and HR leaders of 100–1,000 employee companies modernizing their workforce operations.",
    },
  ];

  const breadcrumbs = [
    { label: "Company", to: "/about" },
    { label: "Careers" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Careers at LattiumHR | Build the Future of Workforce Software"
        description="Join a high-velocity team transforming people operations for thousands of employees across ambitious organizations."
        canonicalPath="/careers"
      />

      <section className="careers-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="users" size={14} /> JOIN OUR TEAM
            </span>
            <h1>Build software that makes work better for thousands of people</h1>
            <p>
              We’re a team of engineers, product builders, and operations specialists solving the
              real-world challenges of growing businesses.
            </p>
            <div className="feature-hero-actions">
              <a href="#roles" className="btn">
                View Open Positions <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Perks */}
      <section className="careers-culture-section">
        <div className="container">
          <SectionHeading
            eyebrow="WHY LATTIUMHR"
            title="What it’s like to work here"
            body="We value ownership, craftsmanship, and pragmatic solutions over unnecessary complexity."
            center
          />

          <div className="culture-grid">
            <div className="culture-card">
              <div className="culture-icon purple">
                <Icon name="sparkle" size={24} />
              </div>
              <h3>High Impact & Ownership</h3>
              <p>
                Every feature you ship touches hundreds of organizations and directly impacts workers'
                daily attendance and monthly payslips.
              </p>
            </div>

            <div className="culture-card">
              <div className="culture-icon orange">
                <Icon name="shield" size={24} />
              </div>
              <h3>Pragmatic Engineering</h3>
              <p>
                We focus on solving real customer problems with rock-solid, resilient architecture,
                prioritizing performance and simplicity.
              </p>
            </div>

            <div className="culture-card">
              <div className="culture-icon green">
                <Icon name="award" size={24} />
              </div>
              <h3>Competitive Comp & Health</h3>
              <p>
                Comprehensive health insurance for you and your dependents, flexible time-off policies,
                and performance equity grants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles List */}
      <section className="careers-roles-section" id="roles">
        <div className="container" style={{ maxWidth: "860px" }}>
          <SectionHeading
            eyebrow="OPEN OPPORTUNITIES"
            title="Explore our current openings"
            body="Don’t see your exact role? Send your resume to careers@lattiumhr.com."
            center
          />

          <div className="roles-list">
            {openRoles.map((role, idx) => (
              <div key={idx} className="role-opening-card">
                <div className="role-card-header">
                  <div>
                    <h3>{role.title}</h3>
                    <div className="role-badges">
                      <span className="role-badge dept">{role.department}</span>
                      <span className="role-badge loc">
                        <Icon name="map-pin" size={12} /> {role.location}
                      </span>
                      <span className="role-badge type">{role.type}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@lattiumhr.com?subject=Application: ${encodeURIComponent(role.title)}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Apply Now
                  </a>
                </div>
                <p className="role-desc">{role.description}</p>
              </div>
            ))}
          </div>

          <div className="general-application-box">
            <div>
              <strong>Don’t see a matching position?</strong>
              <p>We are always looking for exceptional engineers, product designers, and customer champions.</p>
            </div>
            <a href="mailto:careers@lattiumhr.com" className="btn btn-outline">
              Email Your Resume <Icon name="arrow" size={14} />
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default CareersPage;
