import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import { PartnerCategory } from "@/data/partnersData";
import { submitEnquiry } from "@/services/enquiryService";

interface EnquiryFormProps {
  initialPartnerType?: PartnerCategory;
}

interface FormValues {
  firstName: string;
  lastName: string;
  company: string;
  businessEmail: string;
  phone: string;
  location: string;
  partnerType: PartnerCategory;
  additionalComments: string;
  consent: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ initialPartnerType = "reseller" }) => {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    company: "",
    businessEmail: "",
    phone: "",
    location: "",
    partnerType: initialPartnerType,
    additionalComments: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update selected partner type if triggered externally from "Join as [type]" button
  useEffect(() => {
    if (initialPartnerType) {
      setValues((prev) => ({ ...prev, partnerType: initialPartnerType }));
    }
  }, [initialPartnerType]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormValues, string>> = {};

    if (!values.firstName.trim()) {
      errs.firstName = "First name is required.";
    }

    if (!values.lastName.trim()) {
      errs.lastName = "Last name is required.";
    }

    if (!values.company.trim()) {
      errs.company = "Company name is required.";
    }

    if (!values.businessEmail.trim()) {
      errs.businessEmail = "Business email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.businessEmail.trim())) {
      errs.businessEmail = "Please enter a valid email address.";
    }

    if (!values.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (values.phone.trim().length < 7) {
      errs.phone = "Please enter a valid phone number.";
    }

    if (!values.location.trim()) {
      errs.location = "City or country location is required.";
    }

    if (!values.partnerType) {
      errs.partnerType = "Please select a partner track.";
    }

    if (!values.consent) {
      errs.consent = "You must agree to receive communications regarding the partnership.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitEnquiry({
        name: `${values.firstName.trim()} ${values.lastName.trim()}`,
        email: values.businessEmail.trim(),
        phone: values.phone.trim(),
        company_name: values.company.trim(),
        primary_area_of_interest: `Partner Programme - ${values.partnerType.toUpperCase()}`,
        nature_of_enquiry: "IMPLEMENTATION_PARTNERSHIP",
        notes: `Location: ${values.location.trim()} | Track: ${values.partnerType} | Comments: ${values.additionalComments.trim()}`,
        source_page: "/partners",
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err?.message || "Unable to submit your partner application. Please check your network and try again."
      );
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="partner-form-section" id="partner-enquiry-form" aria-labelledby="form-heading">
      <div className="container">
        {/* 2-Column Split Layout: Left Content, Right Form */}
        <div className="partner-form-split-grid">
          {/* Left Column: Eyebrow, Heading, Subhead, Trust Highlights */}
          <div className="partner-form-left-col">
            <div className="partner-section-eyebrow">
              <span className="partner-sparkle">✦</span>
              <span>PARTNER ENQUIRY FORM</span>
              <span className="partner-sparkle">✦</span>
            </div>

            <h2 id="form-heading" className="partner-form-main-title">
              Ready to Expand Your <span className="partner-highlight-word">Horizons</span>?
            </h2>

            <p className="partner-form-main-subhead">
              Fill out the enquiry form below. Our alliance directors review every submission
              and get back to you with personalized partnership terms.
            </p>

            {/* Left Column Alliance Value Props */}
            <div className="partner-form-left-highlights">
              <div className="partner-form-hl-item">
                <span className="partner-form-hl-icon">
                  <Icon name="check" size={16} />
                </span>
                <div>
                  <strong>Guaranteed 48-Hour Response</strong>
                  <p>Our alliance team evaluates your profile and reaches out with next steps.</p>
                </div>
              </div>

              <div className="partner-form-hl-item">
                <span className="partner-form-hl-icon">
                  <Icon name="shield" size={16} />
                </span>
                <div>
                  <strong>Protected Deal Registration</strong>
                  <p>Register client opportunities with complete margin and conflict protection.</p>
                </div>
              </div>

              <div className="partner-form-hl-item">
                <span className="partner-form-hl-icon">
                  <Icon name="users" size={16} />
                </span>
                <div>
                  <strong>Dedicated Alliance Director</strong>
                  <p>Direct line to regional directors and senior solution architects.</p>
                </div>
              </div>
            </div>

            {/* Direct Contact Pill */}
            <div className="partner-form-direct-contact">
              <span className="direct-label">Questions about partnership tiers?</span>
              <a href="mailto:alliances@lattiumhr.com" className="direct-email">
                alliances@lattiumhr.com <Icon name="arrow" size={14} />
              </a>
            </div>

            {/* Left Column Dedicated Trust & Assurance Card (Baseline Endpoint matching image) */}
            <div className="partner-left-guarantee-card">
              <div className="partner-left-guarantee-header">
                <span className="guarantee-badge-icon">
                  <Icon name="shield" size={16} />
                </span>
                <strong>Mutual NDA &amp; Deal Protection</strong>
              </div>
              <p>
                All shared enterprise opportunities, client lists, and commission structures
                are protected under strict bilateral non-disclosure standards.
              </p>
            </div>
          </div>

          {/* Right Column: Form Card or Thank You State */}
          <div className="partner-form-right-col">
            <div className="partner-form-card">
              {isSubmitted ? (
                /* ============================================================
                   THANK YOU STATE
                   ============================================================ */
                <div className="partner-thank-you-box" role="status" aria-live="polite">
                  <div className="partner-thank-you-icon">
                    <Icon name="check" size={32} />
                  </div>
                  <h3 className="partner-thank-you-title">Application Received!</h3>
                  <p className="partner-thank-you-text">
                    Thanks for your interest. Our partnership team will contact you within 2 working days
                    at <strong>{values.businessEmail}</strong>.
                  </p>
                  <div className="partner-thank-you-actions">
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="partner-thank-you-btn-primary"
                    >
                      Submit Another Application
                    </button>
                    <Link to="/" className="partner-thank-you-btn-secondary">
                      Go to Home
                    </Link>
                  </div>
                </div>
              ) : (
                /* ============================================================
                   ENQUIRY FORM
                   ============================================================ */
                <form onSubmit={handleSubmit} noValidate className="partner-grid-form">
                  {/* First Name & Last Name */}
                  <div className="partner-form-row two-col">
                    <div className="partner-input-group">
                      <label htmlFor="partner-first-name" className="partner-label">
                        First Name <span className="partner-required">*</span>
                      </label>
                      <input
                        id="partner-first-name"
                        type="text"
                        className={`partner-input ${errors.firstName ? "has-error" : ""}`}
                        placeholder="e.g. John"
                        value={values.firstName}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, firstName: e.target.value }));
                          if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
                        }}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "first-name-error" : undefined}
                      />
                      {errors.firstName && (
                        <span id="first-name-error" className="partner-field-error" role="alert">
                          {errors.firstName}
                        </span>
                      )}
                    </div>

                    <div className="partner-input-group">
                      <label htmlFor="partner-last-name" className="partner-label">
                        Last Name <span className="partner-required">*</span>
                      </label>
                      <input
                        id="partner-last-name"
                        type="text"
                        className={`partner-input ${errors.lastName ? "has-error" : ""}`}
                        placeholder="e.g. Doe"
                        value={values.lastName}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, lastName: e.target.value }));
                          if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
                        }}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "last-name-error" : undefined}
                      />
                      {errors.lastName && (
                        <span id="last-name-error" className="partner-field-error" role="alert">
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company Name & Business Email */}
                  <div className="partner-form-row two-col">
                    <div className="partner-input-group">
                      <label htmlFor="partner-company" className="partner-label">
                        Company Name <span className="partner-required">*</span>
                      </label>
                      <input
                        id="partner-company"
                        type="text"
                        className={`partner-input ${errors.company ? "has-error" : ""}`}
                        placeholder="e.g. Nexus Tech Consulting"
                        value={values.company}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, company: e.target.value }));
                          if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
                        }}
                        aria-invalid={!!errors.company}
                        aria-describedby={errors.company ? "company-error" : undefined}
                      />
                      {errors.company && (
                        <span id="company-error" className="partner-field-error" role="alert">
                          {errors.company}
                        </span>
                      )}
                    </div>

                    <div className="partner-input-group">
                      <label htmlFor="partner-email" className="partner-label">
                        Business Email Address <span className="partner-required">*</span>
                      </label>
                      <input
                        id="partner-email"
                        type="email"
                        className={`partner-input ${errors.businessEmail ? "has-error" : ""}`}
                        placeholder="name@company.com"
                        value={values.businessEmail}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, businessEmail: e.target.value }));
                          if (errors.businessEmail) setErrors((prev) => ({ ...prev, businessEmail: undefined }));
                        }}
                        aria-invalid={!!errors.businessEmail}
                        aria-describedby={errors.businessEmail ? "email-error" : undefined}
                      />
                      {errors.businessEmail && (
                        <span id="email-error" className="partner-field-error" role="alert">
                          {errors.businessEmail}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone Number & Location */}
                  <div className="partner-form-row two-col">
                    <div className="partner-input-group">
                      <label htmlFor="partner-phone" className="partner-label">
                        Phone Number <span className="partner-required">*</span>
                      </label>
                      <input
                        id="partner-phone"
                        type="tel"
                        className={`partner-input ${errors.phone ? "has-error" : ""}`}
                        placeholder="+91 98765 43210"
                        value={values.phone}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, phone: e.target.value }));
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && (
                        <span id="phone-error" className="partner-field-error" role="alert">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className="partner-input-group">
                      <label htmlFor="partner-location" className="partner-label">
                        Location (City, Country) <span className="partner-required">*</span>
                      </label>
                      <input
                        id="partner-location"
                        type="text"
                        className={`partner-input ${errors.location ? "has-error" : ""}`}
                        placeholder="e.g. Mumbai, India"
                        value={values.location}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, location: e.target.value }));
                          if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
                        }}
                        aria-invalid={!!errors.location}
                        aria-describedby={errors.location ? "location-error" : undefined}
                      />
                      {errors.location && (
                        <span id="location-error" className="partner-field-error" role="alert">
                          {errors.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Partner Type Dropdown */}
                  <div className="partner-form-row">
                    <div className="partner-input-group">
                      <label htmlFor="partner-type-select" className="partner-label">
                        Interested Partner Track <span className="partner-required">*</span>
                      </label>
                      <select
                        id="partner-type-select"
                        className={`partner-select ${errors.partnerType ? "has-error" : ""}`}
                        value={values.partnerType}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, partnerType: e.target.value as PartnerCategory }));
                          if (errors.partnerType) setErrors((prev) => ({ ...prev, partnerType: undefined }));
                        }}
                        aria-invalid={!!errors.partnerType}
                        aria-describedby={errors.partnerType ? "type-error" : undefined}
                      >
                        <option value="reseller">Reseller Partner (Full commercial distribution & VAR)</option>
                        <option value="referral">Referral Partner (Client recommendations & revenue share)</option>
                        <option value="technology">Technology Partner (API, biometric hardware & ERP integration)</option>
                      </select>
                      {errors.partnerType && (
                        <span id="type-error" className="partner-field-error" role="alert">
                          {errors.partnerType}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Additional Comments */}
                  <div className="partner-form-row">
                    <div className="partner-input-group">
                      <label htmlFor="partner-comments" className="partner-label">
                        Tell us about your client base & operations{" "}
                        <span className="partner-optional">(Optional)</span>
                      </label>
                      <textarea
                        id="partner-comments"
                        rows={3}
                        className="partner-textarea"
                        placeholder="Number of clients served, key industries, current software portfolio..."
                        value={values.additionalComments}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, additionalComments: e.target.value }))
                        }
                      ></textarea>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="partner-form-row">
                    <div className="partner-checkbox-group">
                      <label className="partner-checkbox-label">
                        <input
                          type="checkbox"
                          className="partner-checkbox"
                          checked={values.consent}
                          onChange={(e) => {
                            setValues((prev) => ({ ...prev, consent: e.target.checked }));
                            if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                          }}
                          aria-invalid={!!errors.consent}
                        />
                        <span className="partner-checkbox-text">
                          I agree to be contacted by LattiumHR alliance directors regarding partnership
                          onboarding and evaluate commercial terms.
                        </span>
                      </label>
                      {errors.consent && (
                        <span className="partner-field-error block-error" role="alert">
                          {errors.consent}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submit Error Banner */}
                  {submitError && (
                    <div className="partner-form-error-alert" role="alert">
                      <Icon name="x" size={16} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="partner-form-row submit-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="partner-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="partner-spinner" aria-hidden="true"></span>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Partner Application <Icon name="arrow" size={16} />
                        </>
                      )}
                    </button>
                    <span className="partner-privacy-note">
                      <Icon name="lock" size={13} /> Strict NDA and data confidentiality observed.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
