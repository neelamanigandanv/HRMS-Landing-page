import { Link } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import SEO from "../layout/SEO";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { SolutionData } from "../../data/solutionsData";

export function SolutionTemplate({ solution }: { solution: SolutionData }) {
  const breadcrumbs = [
    { label: "Solutions", to: "/solutions" },
    { label: solution.title },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title={solution.title}
        description={solution.subhead}
        canonicalPath={`/solutions/${solution.slug}`}
      />

      {/* Solution Hero */}
      <section className="solution-hero">
        <div className="container">
          <div className="solution-hero-content">
            <span className="solution-badge">
              <Icon name="branch" size={14} /> {solution.badge}
            </span>
            <h1>{solution.headline}</h1>
            <p className="solution-subhead">{solution.subhead}</p>
            <div className="solution-hero-actions">
              <Button to="/request-demo">
                Request a Demo <Icon name="arrow" size={16} />
              </Button>
              <Button to="/solutions" secondary>
                Explore All Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Challenges */}
      <section className="solution-challenges-section">
        <div className="container">
          <SectionHeading
            eyebrow="CURRENT REALITY"
            title={solution.challengesTitle}
            body={solution.challengesDesc}
            center
          />
          <div className="solution-challenges-grid">
            {solution.challenges.map((ch, idx) => (
              <div key={idx} className="challenge-card">
                <div className="challenge-num">0{idx + 1}</div>
                <strong>{ch.problem}</strong>
                <p>{ch.consequence}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tailored Capabilities */}
      <section className="solution-capabilities-section">
        <div className="container">
          <SectionHeading
            eyebrow="THE SOLUTION"
            title={solution.capabilitiesTitle}
            body={solution.capabilitiesDesc}
            center
          />
          <div className="solution-capabilities-grid">
            {solution.capabilities.map((cap, idx) => (
              <div key={idx} className="sol-cap-card">
                <span className="sol-cap-icon">
                  <Icon name={cap.icon} size={22} />
                </span>
                <strong>{cap.title}</strong>
                <p>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concrete Business Benefits */}
      <section className="solution-benefits-section">
        <div className="container">
          <div className="benefits-banner">
            <SectionHeading
              eyebrow="MEASURABLE ADVANTAGE"
              title={solution.benefitsTitle}
              body={solution.benefitsDesc}
              center
            />
            <div className="solution-benefits-grid">
              {solution.benefits.map((b, idx) => (
                <div key={idx} className="benefit-stat-card">
                  <strong>{b.metric}</strong>
                  <span>{b.title}</span>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="solution-usecases-section">
        <div className="container">
          <SectionHeading
            eyebrow="USE CASES"
            title={solution.useCasesTitle}
            body="See how organizations in this operational segment deploy LattiumHR to overcome specific hurdles."
            center
          />
          <div className="usecases-grid">
            {solution.useCases.map((uc, idx) => (
              <div key={idx} className="usecase-card">
                <div className="usecase-badge">Scenario {idx + 1}</div>
                <h4>{uc.scenario}</h4>
                <div className="usecase-block">
                  <strong>LattiumHR Approach:</strong>
                  <p>{uc.solution}</p>
                </div>
                <div className="usecase-block outcome">
                  <strong>Result:</strong>
                  <p>{uc.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Modules */}
      <section className="solution-modules-section">
        <div className="container">
          <div className="rec-modules-box">
            <div>
              <span className="eyebrow">RECOMMENDED STACK</span>
              <h3>Key modules for this solution</h3>
              <p>Explore the specific feature modules recommended for your workflow.</p>
            </div>
            <div className="rec-modules-grid">
              {solution.recommendedModules.map((mod, idx) => (
                <Link key={idx} to={mod.link} className="rec-module-link">
                  <div>
                    <strong>{mod.name}</strong>
                    <p>{mod.desc}</p>
                  </div>
                  <Icon name="arrow" size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default SolutionTemplate;
