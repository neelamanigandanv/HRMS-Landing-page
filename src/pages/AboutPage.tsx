import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

export function AboutPage() {
  const breadcrumbs = [{ label: "About Us" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="About Us | Simplifying Multi-Branch Workforce Operations"
        description="Learn how LattiumHR helps 500+ businesses eliminate spreadsheet chaos and run connected HR, attendance, and payroll across every branch."
        canonicalPath="/about"
      />

      <section className="about-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="sparkle" size={14} /> OUR PURPOSE
            </span>
            <h1>Bringing order and clarity to people operations</h1>
            <p>
              We believe every employee deserves transparent attendance and on-time payroll, and every
              founder and HR leader deserves software that respects their time.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-copy">
              <span className="eyebrow">THE LATTIUMHR STORY</span>
              <h2>Born from the frustration of multi-branch chaos</h2>
              <p>
                In 2021, our founding team watched fast-growing retail and services companies struggle
                with a recurring nightmare: managing branch offices across cities with disconnected
                paper registers, WhatsApp leave requests, and complex Excel payroll formulas.
              </p>
              <p>
                Enterprise HR software was too bloated, expensive, and rigid. Lightweight tools
                couldn’t handle multi-state labor laws, branch-specific shift patterns, or biometric
                integrations.
              </p>
              <p>
                We built LattiumHR to bridge that exact gap: powerful enough to handle multi-branch
                statutory compliance, yet so intuitive that frontline workers and store staff need no
                training to use it.
              </p>
            </div>

            <div className="about-milestones-card">
              <h3>LattiumHR Today</h3>
              <div className="milestones-list">
                <div className="milestone-item">
                  <strong>500+</strong>
                  <span>Businesses running on LattiumHR across India & international branches</span>
                </div>
                <div className="milestone-item">
                  <strong>2.4M+</strong>
                  <span>Monthly attendance logs captured with verified GPS coordinates</span>
                </div>
                <div className="milestone-item">
                  <strong>99.4%</strong>
                  <span>On-time statutory payroll compliance rate across all clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values-section">
        <div className="container">
          <SectionHeading
            eyebrow="OUR OPERATING PRINCIPLES"
            title="The principles that guide our product"
            body="How we make decisions when designing features for frontline staff and HR teams."
            center
          />

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon purple">
                <Icon name="shield" size={24} />
              </div>
              <h3>1. Absolute Reliability</h3>
              <p>
                Payroll isn’t just a workflow—it’s an employee’s livelihood. We treat salary calculations
                and statutory filings with zero-tolerance for errors.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon orange">
                <Icon name="branch" size={24} />
              </div>
              <h3>2. Respect for Local Reality</h3>
              <p>
                Organizations don’t operate in a vacuum. A branch in Bengaluru has different holidays
                and PT rules than Mumbai. We build flexibility into our core.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon green">
                <Icon name="sparkle" size={24} />
              </div>
              <h3>3. Radical Simplicity</h3>
              <p>
                If a frontline employee needs a 40-page user manual to clock in or apply for casual
                leave, the software has failed. We build consumer-grade ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="about-locations-section">
        <div className="container">
          <SectionHeading
            eyebrow="OUR PRESENCE"
            title="Where to find our team"
            body="Headquartered in Mumbai with regional engineering and support hubs across India."
            center
          />

          <div className="locations-grid">
            <div className="location-box">
              <div className="loc-dot" />
              <strong>Mumbai (Headquarters)</strong>
              <p>Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051</p>
              <small>Executive, Product & Finance</small>
            </div>
            <div className="location-box">
              <div className="loc-dot" />
              <strong>Bengaluru Hub</strong>
              <p>Indiranagar 100 Feet Road, Bengaluru, Karnataka 560038</p>
              <small>Engineering & Cloud Infrastructure</small>
            </div>
            <div className="location-box">
              <div className="loc-dot" />
              <strong>Delhi NCR</strong>
              <p>Cyber City, DLF Phase 2, Gurugram, Haryana 122002</p>
              <small>Implementation & Customer Success</small>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default AboutPage;
