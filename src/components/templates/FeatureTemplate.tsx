import { useState } from "react";
import PageLayout from "../layout/PageLayout";
import SEO from "../layout/SEO";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { FeatureData } from "../../data/featuresData";

export function FeatureTemplate({ feature }: { feature: FeatureData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const breadcrumbs = [
    { label: "Product", to: "/product" },
    { label: feature.title },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title={feature.title}
        description={feature.subhead}
        canonicalPath={`/features/${feature.slug}`}
      />

      {/* Feature Hero */}
      <section className="feature-hero">
        <div className="container">
          <div className="feature-hero-content">
            <span className="feature-badge">
              <Icon name="sparkle" size={14} /> {feature.badge}
            </span>
            <h1>{feature.headline}</h1>
            <p className="feature-subhead">{feature.subhead}</p>
            <div className="feature-hero-actions">
              <Button to="/request-demo">
                Request a Demo <Icon name="arrow" size={16} />
              </Button>
              <Button to="/product" secondary>
                View All Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Business Problem */}
      <section className="feature-problem-section">
        <div className="container">
          <SectionHeading
            eyebrow="THE CHALLENGE"
            title={feature.problemTitle}
            body={feature.problemDesc}
            center
          />
          <div className="problem-grid">
            {feature.problemPoints.map((pt, idx) => (
              <div key={idx} className="problem-card">
                <div className="problem-icon">
                  <Icon name="x" size={18} />
                </div>
                <strong>{pt.issue}</strong>
                <p>{pt.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The LattiumHR Solution */}
      <section className="feature-solution-section">
        <div className="container">
          <div className="solution-split">
            <div className="solution-copy">
              <span className="eyebrow">THE SOLUTION</span>
              <h2>{feature.solutionTitle}</h2>
              <p>{feature.solutionDesc}</p>
              <ul className="solution-checklist">
                {feature.solutionPoints.map((pt, idx) => (
                  <li key={idx}>
                    <span className="check-icon">
                      <Icon name="check" size={14} />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product UI Mockup */}
            <div className="solution-mockup-wrapper">
              <div className="feature-mockup-card">
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
        </div>
      </section>

      {/* Key Capabilities Grid */}
      <section className="feature-capabilities-section">
        <div className="container">
          <SectionHeading
            eyebrow="KEY CAPABILITIES"
            title={`Everything you need in ${feature.title}`}
            body="Purpose-built modules that eliminate manual guesswork and keep your workforce moving forward."
            center
          />
          <div className="capabilities-grid">
            {feature.capabilities.map((cap, idx) => (
              <div key={idx} className="capability-card">
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

      {/* ROI & Business Outcomes */}
      <section className="feature-roi-section">
        <div className="container">
          <div className="roi-banner">
            <div className="roi-header">
              <span className="eyebrow white">MEASURABLE IMPACT</span>
              <h2>Proven operational outcomes from day one</h2>
            </div>
            <div className="roi-stats-grid">
              {feature.roiStats.map((stat, idx) => (
                <div key={idx} className="roi-stat-box">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <p>{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature FAQs */}
      {feature.faqs.length > 0 && (
        <section className="feature-faq-section">
          <div className="container">
            <SectionHeading
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              title={`Common questions about ${feature.title}`}
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
    </PageLayout>
  );
}

export default FeatureTemplate;
