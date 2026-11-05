import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import CustomSelect from "../components/ui/CustomSelect";
import PhoneInput from "../components/common/PhoneInput";
import { validatePhoneNumber, FormValidators } from "../utils/phoneUtils";
import { submitEnquiry } from "../services/enquiryService";
import "./RequestDemoPage.css";

const TEAM_SIZE_OPTIONS = [
  { value: "1-50", label: "1 – 50 employees" },
  { value: "51-200", label: "51 – 200 employees" },
  { value: "201-500", label: "201 – 500 employees" },
  { value: "500+", label: "500+ employees" },
];

const INTEREST_OPTIONS = [
  { value: "Full Platform", label: "All-In-One Platform" },
  { value: "Attendance & Geofencing", label: "Attendance & Geofencing" },
  { value: "Statutory Payroll", label: "Statutory Payroll Management" },
  { value: "Multi-Branch Governance", label: "Multi-Branch Governance" },
];

export function RequestDemoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    interest: "Full Platform",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (field: string, value: string): string => {
    switch (field) {
      case "name":
        return FormValidators.name(value);
      case "email":
        return FormValidators.email(value);
      case "phone":
        return validatePhoneNumber(value);
      case "company":
        return FormValidators.company(value);
      case "employees":
        return FormValidators.teamSize(value);
      default:
        return "";
    }
  };

  const handleBlur = (field: string) => {
    if (submitAttempted) {
      const err = validate(field, (formData as any)[field]);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitAttempted) {
      const err = validate(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const fields = ["name", "email", "phone", "company", "employees"];
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      const err = validate(f, (formData as any)[f]);
      if (err) newErrors[f] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitEnquiry({
        form_type: "request_demo",
        name: formData.name.trim(),
        work_email: formData.email.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone.trim(),
        phone: formData.phone.trim(),
        company_name: formData.company.trim(),
        team_size: formData.employees,
        primary_area_of_interest: formData.interest || "Payroll & HRMS",
        additional_notes: formData.notes || "",
        nature_of_enquiry: "SCHEDULE_LIVE_DEMO",
        notes: formData.notes || "",
        source_page: "/request-demo",
      });
      setIsSubmitting(false);
      navigate("/thank-you", { state: { submittedData: formData } });
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err?.message || "Failed to submit demo request. Please check your connection and try again."
      );
    }
  };

  const breadcrumbs = [{ label: "Request a Demo" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA>
      <SEO
        title="Request a Live Demo | Zentilos"
        description="Book a personalized 30-minute walkthrough with an HRMS product specialist. See attendance geofencing, statutory payroll, and multi-branch tools tailored to your business."
        canonicalPath="/request-demo"
      />

      <section className="demo-page-hero">
        <div className="container demo-page-grid">
          {/* Left Column: Value Proposition & What to Expect */}
          <div className="demo-copy-col">
            <div className="demo-copy-top">
              <div className="demo-eyebrow">
                <span className="demo-sparkle">✦</span>
                <span>PERSONALIZED PRODUCT TOUR</span>
                <span className="demo-sparkle">✦</span>
              </div>

              <h1>
                See how Zentilos <span className="demo-highlight-plum">fits your organization</span>
              </h1>

              <p className="demo-hero-intro">
                Take a personalized 30-minute walkthrough configured for your team size,
                multi-branch structure, and statutory payroll workflows.
              </p>
            </div>

            <div className="demo-highlights-list">
              <div className="demo-highlight-item">
                <span className="demo-highlight-icon">
                  <Icon name="check" size={14} />
                </span>
                <div className="demo-highlight-text">
                  <strong>Tailored Workflow Walkthrough</strong>
                  <span>Customized to your shift rosters, branch locations, and team size.</span>
                </div>
              </div>

              <div className="demo-highlight-item">
                <span className="demo-highlight-icon">
                  <Icon name="check" size={14} />
                </span>
                <div className="demo-highlight-text">
                  <strong>Statutory Payroll &amp; Compliance</strong>
                  <span>Automated PF, ESIC, State PT, and TDS rules with zero-leakage calculations.</span>
                </div>
              </div>

              <div className="demo-highlight-item">
                <span className="demo-highlight-icon">
                  <Icon name="check" size={14} />
                </span>
                <div className="demo-highlight-text">
                  <strong>Biometric &amp; Geofencing Sync</strong>
                  <span>Real-time mobile selfie punch, GPS perimeter tracking, and device sync.</span>
                </div>
              </div>

              <div className="demo-highlight-item">
                <span className="demo-highlight-icon">
                  <Icon name="check" size={14} />
                </span>
                <div className="demo-highlight-text">
                  <strong>Fast 2–4 Week Go-Live</strong>
                  <span>Dedicated implementation manager and risk-free historical data migration.</span>
                </div>
              </div>
            </div>

            <div className="demo-copy-bottom">
              <div className="demo-trust-strip">
                <div className="demo-stat-pill">
                  <strong>500+</strong>
                  <span>Enterprises</span>
                </div>
                <div className="demo-stat-divider" />
                <div className="demo-stat-pill">
                  <strong>99.9%</strong>
                  <span>Payroll SLA</span>
                </div>
                <div className="demo-stat-divider" />
                <div className="demo-stat-pill">
                  <strong>4.9 / 5</strong>
                  <span>User Rating</span>
                </div>
              </div>

              <div className="demo-side-guarantee">
                <div className="demo-side-guarantee-left">
                  <Icon name="shield" size={14} />
                  <span>Strict bilateral NDA &amp; enterprise data security</span>
                </div>
                <a href="tel:+9108041228900" className="demo-side-phone-link">
                  <Icon name="phone" size={12} /> +91 (080) 4122-8900
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Demo Form Card */}
          <div className="demo-form-col">
            <div className="demo-card-container">
              <div className="demo-card-header">
                <h2>Request Your Demo</h2>
                <p>Fill out the details below to schedule your personalized session.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="demo-page-form">
                <div className="form-grid">
                  <label className="form-field-group">
                    <span className="field-label-text">
                      Full Name <span className="required-star">*</span>
                    </span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={submitAttempted && errors.name ? "has-error" : ""}
                      placeholder="e.g. Kavya Sharma"
                      aria-invalid={Boolean(submitAttempted && errors.name)}
                    />
                    {submitAttempted && errors.name && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.name}
                      </span>
                    )}
                  </label>

                  <label className="form-field-group">
                    <span className="field-label-text">
                      Work Email <span className="required-star">*</span>
                    </span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={submitAttempted && errors.email ? "has-error" : ""}
                      placeholder="kavya@company.com"
                      aria-invalid={Boolean(submitAttempted && errors.email)}
                    />
                    {submitAttempted && errors.email && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.email}
                      </span>
                    )}
                  </label>

                  <label className="form-field-group">
                    <span className="field-label-text">
                      Phone Number <span className="required-star">*</span>
                    </span>
                    <PhoneInput
                      id="demo-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(fullNumber) => handleChange("phone", fullNumber)}
                      onBlur={() => handleBlur("phone")}
                      hasError={Boolean(submitAttempted && errors.phone)}
                      required
                    />
                    {submitAttempted && errors.phone && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.phone}
                      </span>
                    )}
                  </label>

                  <label className="form-field-group">
                    <span className="field-label-text">
                      Company Name <span className="required-star">*</span>
                    </span>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      onBlur={() => handleBlur("company")}
                      className={submitAttempted && errors.company ? "has-error" : ""}
                      placeholder="e.g. Acme Retail Pvt Ltd"
                      aria-invalid={Boolean(submitAttempted && errors.company)}
                    />
                    {submitAttempted && errors.company && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.company}
                      </span>
                    )}
                  </label>

                  <div className="form-field-group">
                    <label htmlFor="team-size-select" className="field-label-text">
                      Team Size <span className="required-star">*</span>
                    </label>
                    <CustomSelect
                      id="team-size-select"
                      options={TEAM_SIZE_OPTIONS}
                      value={formData.employees}
                      placeholder="Select team size"
                      onChange={(val) => handleChange("employees", val)}
                      onBlur={() => handleBlur("employees")}
                      hasError={Boolean(submitAttempted && errors.employees)}
                    />
                    {submitAttempted && errors.employees && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.employees}
                      </span>
                    )}
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="interest-select" className="field-label-text">
                      Primary Area of Interest
                    </label>
                    <CustomSelect
                      id="interest-select"
                      options={INTEREST_OPTIONS}
                      value={formData.interest}
                      placeholder="Choose primary interest"
                      onChange={(val) => handleChange("interest", val)}
                    />
                  </div>
                </div>

                <label className="message-label">
                  <span>Addition Notes (Optional)</span>
                  <textarea
                    rows={3}
                    placeholder="Tell us about specific challenges (e.g. multi-state PT, shift rotations)..."
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
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
                  {isSubmitting ? "Submitting..." : "Schedule My 30-Min Demo"}
                </Button>

                <div className="form-safety-footer">
                  <Icon name="shield" size={14} />
                  <span>No credit card required. 100% confidential. No marketing spam.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default RequestDemoPage;
