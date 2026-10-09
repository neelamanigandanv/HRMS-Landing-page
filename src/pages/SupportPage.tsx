import { FormEvent, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

export function SupportPage() {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "Normal",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ticketData.name || !ticketData.email || !ticketData.message) return;
    setTicketSubmitted(true);
  };

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "Customer Support" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Customer Support & SLAs | LattiumHR"
        description="Connect with our dedicated HRMS support engineers. Guaranteed SLA response times, live onboarding assistance, and help channels."
        canonicalPath="/support"
      />

      <section className="support-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="phone" size={14} /> DEDICATED SUPPORT
            </span>
            <h1>We’re here to keep your team running smoothly</h1>
            <p>
              Direct access to payroll specialists, implementation engineers, and product experts.
              No automated chatbots that waste your time.
            </p>
          </div>
        </div>
      </section>

      {/* SLA & Channels Grid */}
      <section className="support-channels-section">
        <div className="container">
          <div className="channels-grid">
            <div className="channel-card">
              <div className="channel-icon-box purple">
                <Icon name="mail" size={24} />
              </div>
              <h3>Priority Email & Tickets</h3>
              <p>For configuration requests, data imports, and general technical inquiries.</p>
              <div className="sla-badge">
                <Icon name="clock" size={14} /> Response under 4 hours
              </div>
              <a href="mailto:support@lattiumhr.com" className="channel-contact-link">
                support@lattiumhr.com
              </a>
            </div>

            <div className="channel-card highlight">
              <div className="channel-icon-box orange">
                <Icon name="phone" size={24} />
              </div>
              <h3>Phone & Dedicated Specialist</h3>
              <p>Direct line to your assigned onboarding specialist for time-sensitive payroll assistance.</p>
              <div className="sla-badge green">
                <Icon name="shield" size={14} /> Response under 1 hour
              </div>
              <a href="tel:+918000123456" className="channel-contact-link">
                +91 80001 23456
              </a>
            </div>

            <div className="channel-card">
              <div className="channel-icon-box green">
                <Icon name="whatsapp" size={24} />
              </div>
              <h3>WhatsApp Operations Desk</h3>
              <p>Quick questions on mobile clock-in geofences and manager approval routing.</p>
              <div className="sla-badge">
                <Icon name="check" size={14} /> Mon–Sat: 9:00 AM – 7:00 PM
              </div>
              <span className="channel-contact-text">+91 98765 43210</span>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Ticket Form */}
      <section className="support-ticket-section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <SectionHeading
            eyebrow="CREATE SUPPORT TICKET"
            title="Submit a request to our engineering desk"
            body="Your request will be routed directly to the appropriate technical specialist."
            center
          />

          <div className="ticket-form-card">
            {ticketSubmitted ? (
              <div className="ticket-success-message">
                <div className="success-icon">
                  <Icon name="check" size={28} />
                </div>
                <h3>Support Request Dispatched</h3>
                <p>
                  Thank you <strong>{ticketData.name}</strong>. Ticket <strong>#LTR-8492</strong> has
                  been created. A specialist will respond to <strong>{ticketData.email}</strong>{" "}
                  within our guaranteed SLA window.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setTicketSubmitted(false)}
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ticket-form">
                <div className="form-grid">
                  <label>
                    <span>Full Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={ticketData.name}
                      onChange={(e) =>
                        setTicketData((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Work Email *</span>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={ticketData.email}
                      onChange={(e) =>
                        setTicketData((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Subject *</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Question about biometric device integration"
                      value={ticketData.subject}
                      onChange={(e) =>
                        setTicketData((prev) => ({ ...prev, subject: e.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Urgency Level</span>
                    <select
                      value={ticketData.priority}
                      onChange={(e) =>
                        setTicketData((prev) => ({ ...prev, priority: e.target.value }))
                      }
                    >
                      <option value="Low">Low — General inquiry</option>
                      <option value="Normal">Normal — Setup or configuration help</option>
                      <option value="Urgent">Urgent — Payroll run blocked</option>
                    </select>
                  </label>
                </div>
                <label className="message-label">
                  <span>Detailed Description *</span>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please include relevant branch name or error message..."
                    value={ticketData.message}
                    onChange={(e) =>
                      setTicketData((prev) => ({ ...prev, message: e.target.value }))
                    }
                  />
                </label>
                <Button type="submit" className="form-submit">
                  Submit Support Ticket <Icon name="arrow" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default SupportPage;
