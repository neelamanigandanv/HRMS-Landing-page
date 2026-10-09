import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { helpCategories, HelpCategory } from "../data/resourcesData";

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "Help Center" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Help Center & Documentation | LattiumHR"
        description="Searchable knowledge base, feature guides, setup tutorials, and troubleshooting articles."
        canonicalPath="/help"
      />

      <section className="help-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="help-circle" size={14} /> KNOWLEDGE BASE
            </span>
            <h1>How can we help you today?</h1>
            <p>
              Search our complete library of setup tutorials, module configurations, and best
              practice guides.
            </p>

            {/* Knowledge Base Search */}
            <div className="blog-search-bar">
              <Icon name="search" size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search topics: setting up branches, biometric sync, PF filings, mobile app..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search help center"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                >
                  <Icon name="x" size={14} />
                </button>
              )}
            </div>

            {/* Quick Links */}
            <div className="help-quick-links">
              <span>Popular searches:</span>
              <Link to="/help/getting-started">Getting Started</Link>
              <Link to="/features/payroll-management">Statutory PF</Link>
              <Link to="/features/attendance-management">Geofence Setup</Link>
              <Link to="/support">Contact Support</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Launch Banner */}
      <section className="help-launch-section">
        <div className="container">
          <div className="getting-started-banner">
            <div>
              <span className="eyebrow">NEW TO LATTIUMHR?</span>
              <h2>Step-by-step implementation roadmap</h2>
              <p>
                Follow our 4-stage onboarding blueprint to migrate records, train managers, and run
                your first error-free payroll cycle in under 3 weeks.
              </p>
            </div>
            <Button to="/help/getting-started">
              View Getting Started Guide <Icon name="arrow" size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Help Topic Categories */}
      <section className="help-topics-section">
        <div className="container">
          <SectionHeading
            eyebrow="BROWSE BY CATEGORY"
            title="Explore documentation by module"
            center
          />

          <div className="help-categories-grid">
            {helpCategories.map((cat: HelpCategory) => (
              <div key={cat.title} className="help-category-card">
                <div className="help-cat-header">
                  <span className="help-cat-icon">
                    <Icon name={cat.icon} size={22} />
                  </span>
                  <div>
                    <h3>{cat.title}</h3>
                    <small>{cat.articleCount} articles</small>
                  </div>
                </div>
                <p className="help-cat-desc">{cat.description}</p>

                <div className="help-article-links">
                  {cat.articles.map((art, aIdx) => (
                    <div key={aIdx} className="help-article-item">
                      <div className="article-title-row">
                        <strong>{art.title}</strong>
                        <small>{art.readTime}</small>
                      </div>
                      <p>{art.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="help-support-cta">
        <div className="container">
          <div className="support-cta-box">
            <div>
              <h3>Can’t find what you’re looking for?</h3>
              <p>Our dedicated customer support engineers are available via chat, email, and phone.</p>
            </div>
            <Button to="/support">
              Get Customer Support <Icon name="arrow" size={16} />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default HelpCenter;
