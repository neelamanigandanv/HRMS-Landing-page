import { Link, useLocation } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

export function ThankYouPage() {
  const location = useLocation();
  const submittedData = location.state?.submittedData;

  const breadcrumbs = [{ label: "Thank You" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA>
      <SEO
        title="Thank You | Demo Request Confirmed"
        description="Your LattiumHR demo request has been received. Our product specialist will be in touch shortly."
        canonicalPath="/thank-you"
      />

      <section className="thank-you-section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="thank-you-card">
            <div className="thank-you-icon">
              <Icon name="check" size={32} />
            </div>

            {submittedData ? (
              <>
                <h1>Demo Request Confirmed!</h1>
                <p className="thank-you-intro">
                  Thank you, <strong>{submittedData.name}</strong>. We have received your demonstration
                  request for <strong>{submittedData.company}</strong>.
                </p>
                <div className="submitted-summary-box">
                  <div className="summary-row">
                    <span>Contact Email:</span>
                    <strong>{submittedData.email}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Phone:</span>
                    <strong>{submittedData.phone}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Team Size:</span>
                    <strong>{submittedData.employees} employees</strong>
                  </div>
                  <div className="summary-row">
                    <span>Focus Area:</span>
                    <strong>{submittedData.interest}</strong>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1>Demo Consultation Center</h1>
                <p className="thank-you-intro">
                  Thank you for your interest in LattiumHR. If you haven’t yet booked your session, you
                  can schedule a walkthrough anytime.
                </p>
              </>
            )}

            {/* What Happens Next Timeline */}
            <div className="next-steps-timeline">
              <h3>What Happens Next?</h3>
              <div className="steps-cards-list">
                <div className="step-card-mini">
                  <span className="step-badge">Step 1</span>
                  <strong>Specialist Review</strong>
                  <p>Our implementation specialist prepares a demo environment tailored to your industry.</p>
                </div>
                <div className="step-card-mini">
                  <span className="step-badge">Step 2</span>
                  <strong>Calendar Invite</strong>
                  <p>You’ll receive a calendar invitation and direct dial-in link within 2 business hours.</p>
                </div>
                <div className="step-card-mini">
                  <span className="step-badge">Step 3</span>
                  <strong>30-Min Walkthrough</strong>
                  <p>We walk through your attendance rules, payroll structures, and answer all questions.</p>
                </div>
              </div>
            </div>

            <div className="thank-you-actions">
              <Button to="/product">
                Explore Product Features <Icon name="arrow" size={16} />
              </Button>
              <Button to="/resources/blog" secondary>
                Read Compliance Guides
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ThankYouPage;
