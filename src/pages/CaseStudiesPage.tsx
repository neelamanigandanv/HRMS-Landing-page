import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { caseStudies } from "../data/resourcesData";
import { useCurrency } from "../context/CurrencyContext";
import { useDemoModal } from "../context/DemoModalContext";

export function CaseStudiesPage() {
  const { openDemoModal } = useDemoModal();
  const { formatText } = useCurrency();
  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "Case Studies" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Customer Case Studies | Real Multi-Branch Transformations"
        description="See how 500+ businesses running retail stores, distribution centers, and regional branches cut payroll cycles and eliminate compliance penalties with LattiumHR."
        canonicalPath="/resources/case-studies"
      />

      <section className="case-studies-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="award" size={14} /> CUSTOMER SUCCESS STORIES
            </span>
            <h1>Real operational transformations across multi-branch teams</h1>
            <p>
              Discover how ambitious organizations simplified attendance, accelerated monthly
              payroll, and unified their branches on LattiumHR.
            </p>
            <div className="feature-hero-actions">
              <Button onClick={() => openDemoModal()}>
                Request a Live Demo <Icon name="arrow" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Detailed Cards */}
      <section className="case-studies-list-section">
        <div className="container">
          <div className="case-studies-stack">
            {caseStudies.map((cs) => (
              <article key={cs.slug} className="case-study-card">
                <div className="cs-header-strip">
                  <div className="cs-client-info">
                    <span className="cs-industry-badge">{cs.industry}</span>
                    <h2>{cs.client}</h2>
                    <div className="cs-meta-specs">
                      <span>
                        <Icon name="employee" size={15} /> {cs.employees}
                      </span>
                      <span>•</span>
                      <span>
                        <Icon name="branch" size={15} /> {cs.locations}
                      </span>
                    </div>
                  </div>
                  <div className="cs-metrics-grid">
                    {cs.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="cs-metric-box">
                        <strong>{formatText(m.value)}</strong>
                        <small>{m.label}</small>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cs-quote-block">
                  <div className="quote-icon-mark">“</div>
                  <p>{cs.quote}</p>
                  <div className="cs-author-tag">
                    <strong>{cs.author.name}</strong> — {cs.author.role}
                  </div>
                </div>

                <div className="cs-narrative-grid">
                  <div className="cs-narrative-col">
                    <h4>The Operational Challenge</h4>
                    <p>{cs.challenge}</p>
                  </div>
                  <div className="cs-narrative-col">
                    <h4>The LattiumHR Solution</h4>
                    <p>{cs.solution}</p>
                  </div>
                </div>

                <div className="cs-results-box">
                  <strong>Key Business Outcomes:</strong>
                  <ul>
                    {cs.results.map((res, rIdx) => (
                      <li key={rIdx}>
                        <Icon name="check" size={15} className="check-icon" />
                        <span>{formatText(res)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default CaseStudiesPage;
