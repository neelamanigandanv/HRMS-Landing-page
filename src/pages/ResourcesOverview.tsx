import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { resourcesNavItems } from "../data/navigationData";

export function ResourcesOverview() {
  const breadcrumbs = [{ label: "Resources" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Resources & Support Hub | LattiumHR"
        description="Explore the HRMS glossary, compliance blog, FAQs, customer support channels, getting started roadmap, and customer case studies."
        canonicalPath="/resources"
      />

      <section className="resources-overview-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="book-open" size={14} /> KNOWLEDGE & SUPPORT
            </span>
            <h1>Resources, guides, and tools to elevate your HR operations</h1>
            <p>
              Deepen your understanding of Indian statutory compliance, explore HRMS terminology,
              learn best practices for multi-branch attendance, and access our dedicated customer
              support team.
            </p>
            <div className="feature-hero-actions">
              <Button to="/resources/blog">
                Explore Blog Articles <Icon name="arrow" size={16} />
              </Button>
              <Button to="/help" secondary>
                Visit Help Center
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Directory Grid */}
      <section className="resources-grid-section">
        <div className="container">
          <SectionHeading
            eyebrow="RESOURCE DIRECTORY"
            title="Everything you need to succeed"
            body="Browse our curated collection of operational guides, statutory glossary terms, and support channels."
            center
          />

          <div className="resources-directory-grid">
            {resourcesNavItems.slice(1).map((item) => (
              <Link key={item.href} to={item.href} className="resource-hub-card">
                <div className="res-card-top">
                  <span className="res-card-icon">
                    <Icon name={item.icon || "book-open"} size={22} />
                  </span>
                  {item.badge && <span className="mini-badge">{item.badge}</span>}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="res-explore-link">
                  Open Resource <Icon name="arrow" size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Highlight Banner */}
      <section className="resources-featured-section">
        <div className="container">
          <div className="featured-guide-box">
            <div className="guide-copy">
              <span className="eyebrow">FEATURED GUIDE</span>
              <h2>Indian Statutory Payroll Compliance in 2025</h2>
              <p>
                A comprehensive guide for finance and HR leaders on navigating PF wage caps, ESIC
                thresholds, state-specific Professional Tax slabs, and automated ECR filing.
              </p>
              <Button to="/resources/blog/indian-payroll-compliance-guide-2025">
                Read Full Guide <Icon name="arrow" size={16} />
              </Button>
            </div>
            <div className="guide-badges">
              <div className="guide-stat">
                <strong>100%</strong>
                <small>Statutory Coverage</small>
              </div>
              <div className="guide-stat">
                <strong>7 mins</strong>
                <small>Estimated Read</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ResourcesOverview;
