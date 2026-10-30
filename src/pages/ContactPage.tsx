import { FormEvent, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import CustomSelect from "../components/ui/CustomSelect";
import { submitEnquiry, NatureOfEnquiry } from "../services/enquiryService";

const CONTACT_TEAM_SIZE_OPTIONS = [
  { value: "1-50", label: "1 – 50 employees", desc: "Startups & small teams" },
  { value: "51-200", label: "51 – 200 employees", desc: "Mid-sized growing orgs" },
  { value: "201-500", label: "201 – 500 employees", desc: "Multi-branch enterprises" },
  { value: "500+", label: "500+ employees", desc: "Large workforce & conglomerates" },
];

const CONTACT_INQUIRY_OPTIONS = [
  { value: "Sales", label: "Schedule Live Product Demo", desc: "Tailored 30-min product walkthrough" },
  { value: "Pricing", label: "Custom Pricing Quote", desc: "Volume & enterprise discounts" },
  { value: "Partnership", label: "Implementation Partnership", desc: "System integrator or reseller alliances" },
  { value: "General", label: "General Inquiry", desc: "Questions & business queries" },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "51-200",
    inquiryType: "Sales",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const natureMap: Record<string, NatureOfEnquiry> = {
      Sales: "SCHEDULE_LIVE_DEMO",
      Pricing: "CUSTOM_PRICE",
      Partnership: "IMPLEMENTATION_PARTNERSHIP",
      General: "GENERAL_ENQUIRY",
    };

    try {
      await submitEnquiry({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        company_name: contactData.company || "Not Specified",
        team_size: contactData.teamSize,
        primary_area_of_interest:
          contactData.inquiryType === "Sales"
            ? "Product Walkthrough"
            : contactData.inquiryType === "Pricing"
            ? "Enterprise Pricing"
            : contactData.inquiryType === "Partnership"
            ? "Partner Program"
            : "Platform Suite",
        nature_of_enquiry: natureMap[contactData.inquiryType] || "GENERAL_ENQUIRY",
        notes: contactData.message,
        source_page: "/contact",
      });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err?.message || "Failed to submit inquiry. Please check your connection and try again."
      );
    }
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    <label htmlFor="contact-team-size" style={{ fontSize: "11px", fontWeight: "700", color: "#4b495b", margin: 0 }}>
                      Team Size
                    </label>
                    <CustomSelect
                      id="contact-team-size"
                      options={CONTACT_TEAM_SIZE_OPTIONS}
                      value={contactData.teamSize}
                      onChange={(val) => setContactData((prev) => ({ ...prev, teamSize: val }))}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    <label htmlFor="contact-inquiry-type" style={{ fontSize: "11px", fontWeight: "700", color: "#4b495b", margin: 0 }}>
                      Nature of Inquiry
                    </label>
                    <CustomSelect
                      id="contact-inquiry-type"
                      options={CONTACT_INQUIRY_OPTIONS}
                      value={contactData.inquiryType}
                      onChange={(val) => setContactData((prev) => ({ ...prev, inquiryType: val }))}
                    />
                  </div>
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

                {submitError && (
                  <div
                    style={{
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "#991b1b",
                      fontSize: "13px",
                      lineHeight: "1.5",
                      marginBottom: "14px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                    role="alert"
                  >
                    <Icon name="x" size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="form-submit">
                  {isSubmitting ? "Sending Inquiry..." : "Send Inquiry"} <Icon name="arrow" />
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
