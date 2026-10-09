import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { solutionsNavItems } from "../data/navigationData";

export function SolutionsOverview() {
  const breadcrumbs = [{ label: "Solutions" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Solutions Overview | Tailored HRMS for Your Business Stage"
        description="Find the right HRMS solution for your team size, departmental role, or operational footprint."
        canonicalPath="/solutions"
      />

      {/* Hero */}
      <section className="solutions-overview-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="branch" size={14} /> TAILORED WORKFLOWS
            </span>
            <h1>Software that adapts to your organization—not the other way around</h1>
            <p>
              Whether you are an ambitious 20-person startup transitioning off spreadsheets or a
              multi-city enterprise managing thousands of shift employees, explore how LattiumHR fits
              your specific operating reality.
            </p>
            <div className="feature-hero-actions">
              <Button to="/request-demo">
                Request a Custom Walkthrough <Icon name="arrow" size={16} />
              </Button>
              <Button to="/product" secondary>
                Explore Product Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions by Category */}
      <section className="solutions-by-category-section">
        <div className="container">
          {/* By Company Size */}
          <div className="solution-category-group">
            <SectionHeading
              eyebrow="BY COMPANY STAGE"
              title="Built to scale across every growth milestone"
              body="From initial launch to high-growth complexity and enterprise governance."
            />
            <div className="solutions-grid-cards">
              {solutionsNavItems.slice(1, 4).map((item) => (
                <Link key={item.href} to={item.href} className="solution-hub-card">
                  <div className="hub-card-icon">
                    <Icon name={item.icon || "branch"} size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="hub-explore-link">
                    Explore Solution <Icon name="arrow" size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* By Operational Team */}
          <div className="solution-category-group" style={{ marginTop: "60px" }}>
            <SectionHeading
              eyebrow="BY OPERATIONAL ROLE"
              title="Tailored experiences for functional leaders"
              body="Empower HR managers and finance executives with tools configured for their specific priorities."
            />
            <div className="solutions-grid-cards two-col">
              {solutionsNavItems.slice(4, 6).map((item) => (
                <Link key={item.href} to={item.href} className="solution-hub-card">
                  <div className="hub-card-icon">
                    <Icon name={item.icon || "users"} size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="hub-explore-link">
                    Explore Solution <Icon name="arrow" size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* By Footprint & Industry */}
          <div className="solution-category-group" style={{ marginTop: "60px" }}>
            <SectionHeading
              eyebrow="BY OPERATIONAL FOOTPRINT"
              title="Multi-location & vertical excellence"
              body="Manage distributed branch footprints and industry-specific workforce dynamics with confidence."
            />
            <div className="solutions-grid-cards two-col">
              {solutionsNavItems.slice(6, 8).map((item) => (
                <Link key={item.href} to={item.href} className="solution-hub-card">
                  <div className="hub-card-icon">
                    <Icon name={item.icon || "globe"} size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="hub-explore-link">
                    Explore Solution <Icon name="arrow" size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default SolutionsOverview;
