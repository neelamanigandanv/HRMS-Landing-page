import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { gettingStartedSteps } from "../data/resourcesData";

export function GettingStartedPage() {
  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "Help Center", to: "/help" },
    { label: "Getting Started" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Getting Started with LattiumHR | 4-Stage Implementation Guide"
        description="Follow our structured 4-stage onboarding roadmap to configure branches, import employee records, setup payroll rules, and launch live operations."
        canonicalPath="/help/getting-started"
      />

      <section className="getting-started-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="check" size={14} /> IMPLEMENTATION BLUEPRINT
            </span>
            <h1>Getting Started with LattiumHR</h1>
            <p>
              Your structured, step-by-step roadmap to go from kickoff to your first live payroll run in
              under 3 weeks.
            </p>
            <div className="feature-hero-actions">
              <Button to="/request-demo">
                Schedule Kickoff Call <Icon name="arrow" size={16} />
              </Button>
              <Button to="/help" secondary>
                View Help Center
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps Timeline */}
      <section className="timeline-steps-section">
        <div className="container" style={{ maxWidth: "880px" }}>
          <SectionHeading
            eyebrow="ONBOARDING TIMELINE"
            title="The 4-stage go-live blueprint"
            body="Every stage is supported by your dedicated implementation specialist."
            center
          />

          <div className="timeline-list">
            {gettingStartedSteps.map((step) => (
              <div key={step.step} className="timeline-step-card">
                <div className="timeline-step-number">
                  <span>{step.step}</span>
                </div>
                <div className="timeline-step-content">
                  <div className="step-header">
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                    <span className="step-time-pill">{step.timeEstimate}</span>
                  </div>

                  <div className="step-tasks-box">
                    <strong>Action Items:</strong>
                    <ul>
                      {step.tasks.map((task, tIdx) => (
                        <li key={tIdx}>
                          <Icon name="check" size={14} className="check-icon" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="step-pro-tip">
                    <Icon name="sparkle" size={16} />
                    <div>
                      <strong>Implementation Tip:</strong>
                      <p>{step.tips}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="readiness-checklist-banner">
            <div>
              <h3>Ready to begin onboarding?</h3>
              <p>Download our sample CSV migration templates and schedule your kickoff call.</p>
            </div>
            <Button to="/request-demo">
              Book Kickoff Session <Icon name="arrow" size={16} />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default GettingStartedPage;
