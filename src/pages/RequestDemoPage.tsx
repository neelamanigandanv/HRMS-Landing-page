import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import CustomSelect from "../components/ui/CustomSelect";
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
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (field: string, value: string): string => {
    const trimmed = value.trim();
    if (field === "name") {
      if (!trimmed) return "Please enter your full name";
      if (trimmed.length < 2) return "Name must be at least 2 characters";
      return "";
    }
    if (field === "email") {
      if (!trimmed) return "Work email is required";
      if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmed)) return "Enter a valid work email";
      return "";
    }
    if (field === "phone") {
      const digits = trimmed.replace(/\D/g, "");
      if (!digits) return "Phone number is required";
      if (digits.length < 10) return "Minimum 10 digits required";
      return "";
    }
    if (field === "company") {
      if (!trimmed) return "Company name is required";
      return "";
    }
    if (field === "employees") {
      if (!value) return "Please select your team size";
      return "";
    }
    return "";
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validate(field, (formData as any)[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validate(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fields = ["name", "email", "phone", "company", "employees"];
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      const err = validate(f, (formData as any)[f]);
      if (err) newErrors[f] = err;
    });

    setTouched({ name: true, email: true, phone: true, company: true, employees: true });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.company,
        team_size: formData.employees,
        primary_area_of_interest: formData.interest || "Full Platform",
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
        title="Request a Live Demo | LattiumHR"
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
                See how LattiumHR <span className="demo-highlight-plum">fits your organization</span>
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
                  <label>
                    <span>Full Name *</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={errors.name && touched.name ? "has-error" : ""}
                      placeholder="e.g. Kavya Sharma"
                      aria-invalid={Boolean(errors.name && touched.name)}
                    />
                    {errors.name && touched.name && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.name}
                      </span>
                    )}
                  </label>

                  <label>
                    <span>Work Email *</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={errors.email && touched.email ? "has-error" : ""}
                      placeholder="kavya@company.com"
                      aria-invalid={Boolean(errors.email && touched.email)}
                    />
                    {errors.email && touched.email && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.email}
                      </span>
                    )}
                  </label>

                  <label>
                    <span>Phone Number *</span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      className={errors.phone && touched.phone ? "has-error" : ""}
                      placeholder="+91 98765 43210"
                      aria-invalid={Boolean(errors.phone && touched.phone)}
                    />
                    {errors.phone && touched.phone && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.phone}
                      </span>
                    )}
                  </label>

                  <label>
                    <span>Company Name *</span>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      onBlur={() => handleBlur("company")}
                      className={errors.company && touched.company ? "has-error" : ""}
                      placeholder="e.g. Acme Retail Pvt Ltd"
                      aria-invalid={Boolean(errors.company && touched.company)}
                    />
                    {errors.company && touched.company && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.company}
                      </span>
                    )}
                  </label>

                  <div className="form-field-group">
                    <label htmlFor="team-size-select" className="field-label-text">
                      Team Size *
                    </label>
                    <CustomSelect
                      id="team-size-select"
                      options={TEAM_SIZE_OPTIONS}
                      value={formData.employees}
                      placeholder="Select number of employees"
                      onChange={(val) => handleChange("employees", val)}
                      onBlur={() => handleBlur("employees")}
                      hasError={Boolean(errors.employees && touched.employees)}
                    />
                    {errors.employees && touched.employees && (
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
                  <span>Additional Notes (Optional)</span>
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
