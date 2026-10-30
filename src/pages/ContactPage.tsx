import { FormEvent, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import CustomSelect from "../components/ui/CustomSelect";
import { submitEnquiry, NatureOfEnquiry } from "../services/enquiryService";
import "./ContactPage.css";

const CONTACT_TEAM_SIZE_OPTIONS = [
  { value: "1-50", label: "1 – 50 employees" },
  { value: "51-200", label: "51 – 200 employees" },
  { value: "201-500", label: "201 – 500 employees" },
  { value: "500+", label: "500+ employees" },
];

const CONTACT_INQUIRY_OPTIONS = [
  { value: "Sales", label: "Schedule Live Product Demo" },
  { value: "Pricing", label: "Custom Pricing Quote" },
  { value: "Partnership", label: "Implementation Partnership" },
  { value: "General", label: "General Inquiry" },
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
        description="Get in touch with our product specialists, request a personalized consultation, or contact our support team directly."
        canonicalPath="/contact"
      />

      <div className="contact-page-clean">
        <div className="contact-clean-container">
          {/* =================================================================
              LEFT COLUMN: Eyebrow, Heading, Subheading & 3 Horizontal Cards
              ================================================================= */}
          <div className="contact-left-col">
            <div className="contact-clean-eyebrow">
              <span className="contact-sparkle">✦</span>
              <span>GET IN TOUCH</span>
              <span className="contact-sparkle">✦</span>
            </div>

            <h1 className="contact-clean-title">
              Let’s talk about your{" "}
              <span className="contact-highlight-plum">people operations</span>
            </h1>

            <p className="contact-clean-desc">
              Whether you are evaluating HRMS platforms, need guidance on multi-branch
              attendance, or have questions about statutory compliance, our team is ready to help.
            </p>

            {/* Three Horizontal Cards */}
            <div className="contact-cards-stack">
              {/* Card 1: Direct Email */}
              <a href="mailto:sales@lattiumhr.com" className="contact-h-card">
                <div className="contact-h-icon">
                  <Icon name="mail" size={20} />
                </div>
                <div className="contact-h-content">
                  <span className="contact-h-label">SALES &amp; DEMOS</span>
                  <span className="contact-h-main">sales@lattiumhr.com</span>
                  <span className="contact-h-sub">Guaranteed response within 2 business hours</span>
                </div>
                <div className="contact-h-arrow">
                  <Icon name="arrow" size={16} />
                </div>
              </a>

              {/* Card 2: Phone Helpline */}
              <a href="tel:+9108041228900" className="contact-h-card">
                <div className="contact-h-icon">
                  <Icon name="phone" size={20} />
                </div>
                <div className="contact-h-content">
                  <span className="contact-h-label">DIRECT PHONE HELPLINE</span>
                  <span className="contact-h-main">+91 (080) 4122-8900</span>
                  <span className="contact-h-sub">Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                </div>
                <div className="contact-h-arrow">
                  <Icon name="arrow" size={16} />
                </div>
              </a>

              {/* Card 3: Corporate Headquarters */}
              <div className="contact-h-card">
                <div className="contact-h-icon">
                  <Icon name="map-pin" size={20} />
                </div>
                <div className="contact-h-content">
                  <span className="contact-h-label">GLOBAL HEADQUARTERS</span>
                  <span className="contact-h-main">Platina Tower, BKC, Mumbai</span>
                  <span className="contact-h-sub">Level 8, G Block, Bandra Kurla Complex 400051</span>
                </div>
                <div className="contact-h-arrow">
                  <Icon name="arrow" size={16} />
                </div>
              </div>
            </div>

            <div className="contact-left-trust-pill">
              <Icon name="shield" size={15} />
              <span>Bilateral NDA Protected • ISO 27001 Certified • Zero Spam</span>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: Contact Form Card
              ================================================================= */}
          <div className="contact-right-col">
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success-state-clean">
                  <div className="contact-success-icon-wrap">
                    <Icon name="check" size={30} />
                  </div>
                  <h3 className="contact-success-title">Message Received!</h3>
                  <p className="contact-success-text">
                    Thank you <strong>{contactData.name}</strong>. A workforce specialist
                    will review your inquiry and contact you at <strong>{contactData.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="contact-reset-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setContactData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        teamSize: "51-200",
                        inquiryType: "Sales",
                        message: "",
                      });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div>
                  <div className="contact-form-header">
                    <h2>Send Us a Message</h2>
                    <p>Fill out the details below and our team will get back to you within 2 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="contact-form-body">
                    <div className="contact-fields-grid">
                      <div className="contact-input-group">
                        <label className="contact-label-text">
                          Full Name <span className="required-star">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kavya Sharma"
                          value={contactData.name}
                          onChange={(e) =>
                            setContactData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="contact-text-input"
                        />
                      </div>

                      <div className="contact-input-group">
                        <label className="contact-label-text">
                          Work Email <span className="required-star">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="kavya@company.com"
                          value={contactData.email}
                          onChange={(e) =>
                            setContactData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="contact-text-input"
                        />
                      </div>

                      <div className="contact-input-group">
                        <label className="contact-label-text">
                          Phone Number <span className="required-star">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={contactData.phone}
                          onChange={(e) =>
                            setContactData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          className="contact-text-input"
                        />
                      </div>

                      <div className="contact-input-group">
                        <label className="contact-label-text">Company Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Retail Pvt Ltd"
                          value={contactData.company}
                          onChange={(e) =>
                            setContactData((prev) => ({ ...prev, company: e.target.value }))
                          }
                          className="contact-text-input"
                        />
                      </div>

                      <div className="contact-input-group">
                        <label className="contact-label-text">Team Size</label>
                        <CustomSelect
                          id="contact-team-size"
                          options={CONTACT_TEAM_SIZE_OPTIONS}
                          value={contactData.teamSize}
                          onChange={(val) => setContactData((prev) => ({ ...prev, teamSize: val }))}
                        />
                      </div>

                      <div className="contact-input-group">
                        <label className="contact-label-text">Nature of Inquiry</label>
                        <CustomSelect
                          id="contact-inquiry-type"
                          options={CONTACT_INQUIRY_OPTIONS}
                          value={contactData.inquiryType}
                          onChange={(val) => setContactData((prev) => ({ ...prev, inquiryType: val }))}
                        />
                      </div>
                    </div>

                    <div className="contact-input-group full-width">
                      <label className="contact-label-text">
                        How can we help your team?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your current HR setup, number of branches, or key challenges..."
                        value={contactData.message}
                        onChange={(e) =>
                          setContactData((prev) => ({ ...prev, message: e.target.value }))
                        }
                        className="contact-textarea-input"
                      />
                    </div>

                    {submitError && (
                      <div className="contact-form-error" role="alert">
                        <Icon name="x" size={16} />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="contact-form-submit-btn"
                    >
                      <span>{isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}</span>
                      <Icon name="arrow" size={15} />
                    </button>

                    <div className="contact-form-privacy">
                      <Icon name="shield" size={13} />
                      <span>We respect your privacy. 100% confidential. No spam.</span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ContactPage;
