import { FormEvent, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "51-200",
    inquiryType: "Sales",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email) return;
    setSubmitted(true);
  };

  const breadcrumbs = [{ label: "Contact Us" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA>
      <SEO
        title="Contact Us | Connect with LattiumHR Team"
        description="Get in touch with our product specialists, request a personalized consultation, or visit our offices in Mumbai, Bengaluru, and Delhi NCR."
        canonicalPath="/contact"
      />

      <section className="contact-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="mail" size={14} /> GET IN TOUCH
            </span>
            <h1>Let’s talk about your people operations</h1>
            <p>
              Whether you are evaluating HRMS platforms, need guidance on multi-branch attendance, or
              have questions about statutory compliance, our team is ready to help.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container contact-grid">
          {/* Contact Details Column */}
          <div className="contact-info-panel">
            <h3>Direct Contact Channels</h3>
            <p>Reach out to the appropriate department for immediate assistance.</p>

            <div className="contact-channels-list">
              <div className="contact-channel-item">
                <span className="channel-icon-mini">
                  <Icon name="mail" size={18} />
                </span>
                <div>
                  <small>SALES & PRODUCT DEMOS</small>
                  <strong>sales@lattiumhr.com</strong>
                  <p>Response within 2 business hours</p>
                </div>
              </div>

              <div className="contact-channel-item">
                <span className="channel-icon-mini">
                  <Icon name="phone" size={18} />
                </span>
                <div>
                  <small>PHONE CONSULTATION</small>
                  <strong>+91 80001 23456</strong>
                  <p>Mon–Fri: 9:30 AM – 6:30 PM IST</p>
                </div>
              </div>

              <div className="contact-channel-item">
                <span className="channel-icon-mini">
                  <Icon name="help-circle" size={18} />
                </span>
                <div>
                  <small>CUSTOMER SUPPORT</small>
                  <strong>support@lattiumhr.com</strong>
                  <p>Guaranteed SLA response times</p>
                </div>
              </div>
            </div>

            <div className="contact-offices-box">
              <h4>Regional Office Addresses</h4>
              <div className="office-address-item">
                <strong>Mumbai Headquarters</strong>
                <p>Level 8, Platina Tower, Bandra Kurla Complex, Mumbai 400051</p>
              </div>
              <div className="office-address-item">
                <strong>Bengaluru Tech Hub</strong>
                <p>100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038</p>
              </div>
              <div className="office-address-item">
                <strong>Delhi NCR Office</strong>
                <p>Building 10B, DLF Cyber City, Gurugram, Haryana 122002</p>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="contact-success-state">
                <div className="success-icon">
                  <Icon name="check" size={32} />
                </div>
                <h3>Message Received</h3>
                <p>
                  Thank you <strong>{contactData.name}</strong>. A product specialist will review your
                  inquiry and contact you at <strong>{contactData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3>Send Us a Message</h3>
                <div className="form-grid">
                  <label>
                    <span>Full Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={contactData.name}
                      onChange={(e) =>
                        setContactData((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Work Email *</span>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={contactData.email}
                      onChange={(e) =>
                        setContactData((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Phone Number *</span>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={contactData.phone}
                      onChange={(e) =>
                        setContactData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Company Name</span>
                    <input
                      type="text"
                      placeholder="Your company name"
                      value={contactData.company}
                      onChange={(e) =>
                        setContactData((prev) => ({ ...prev, company: e.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Team Size</span>
                    <select
                      value={contactData.teamSize}
                      onChange={(e) =>
                        setContactData((prev) => ({ ...prev, teamSize: e.target.value }))
                      }
                    >
                      <option value="1-50">1 – 50 employees</option>
                      <option value="51-200">51 – 200 employees</option>
                      <option value="201-500">201 – 500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </label>
                  <label>
                    <span>Nature of Inquiry</span>
                    <select
                      value={contactData.inquiryType}
                      onChange={(e) =>
                        setContactData((prev) => ({ ...prev, inquiryType: e.target.value }))
                      }
                    >
                      <option value="Sales">Schedule Live Product Demo</option>
                      <option value="Pricing">Custom Pricing Quote</option>
                      <option value="Partnership">Implementation Partnership</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </label>
                </div>
                <label className="message-label">
                  <span>How can we help your team?</span>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your current HR setup, number of branches, or key challenges..."
                    value={contactData.message}
                    onChange={(e) =>
                      setContactData((prev) => ({ ...prev, message: e.target.value }))
                    }
                  />
                </label>
                <Button type="submit" className="form-submit">
                  Send Inquiry <Icon name="arrow" />
                </Button>
                <small className="privacy-note">
                  <Icon name="shield" size={13} /> We respect your privacy. No marketing spam.
                </small>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ContactPage;
