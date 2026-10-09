import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

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

  const handleSubmit = (e: FormEvent) => {
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

    // Simulate backend submission confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/thank-you", { state: { submittedData: formData } });
    }, 600);
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
            <span className="feature-badge">
              <Icon name="sparkle" size={14} /> PERSONALIZED PRODUCT TOUR
            </span>
            <h1>See how LattiumHR fits your organization</h1>
            <p className="demo-hero-intro">
              Join 500+ businesses worldwide running core HR, geofenced attendance, and statutory
              payroll on one connected platform.
            </p>

            <div className="demo-expectations-box">
              <h3>What you’ll get in your 30-minute session:</h3>
              <ul className="expectations-list">
                <li>
                  <span className="exp-icon">
                    <Icon name="check" size={14} />
                  </span>
                  <div>
                    <strong>Tailored Workflow Walkthrough</strong>
                    <p>Live demo customized to your employee count, office locations, and shift patterns.</p>
                  </div>
                </li>
                <li>
                  <span className="exp-icon">
                    <Icon name="check" size={14} />
                  </span>
                  <div>
                    <strong>Statutory Compliance Review</strong>
                    <p>Learn how automated PF, ESI, state PT, and TDS rules eliminate calculation errors.</p>
                  </div>
                </li>
                <li>
                  <span className="exp-icon">
                    <Icon name="check" size={14} />
                  </span>
                  <div>
                    <strong>Data Migration & Go-Live Roadmap</strong>
                    <p>See how your dedicated onboarding specialist migrates records in 2–4 weeks.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="demo-trust-badges">
              <div className="trust-pill">
                <strong>500+</strong>
                <small>Active Companies</small>
              </div>
              <div className="trust-pill">
                <strong>98%</strong>
                <small>On-Time Payroll</small>
              </div>
              <div className="trust-pill">
                <strong>4.8 / 5</strong>
                <small>Customer Rating</small>
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

                  <label>
                    <span>Team Size *</span>
                    <select
                      value={formData.employees}
                      onChange={(e) => handleChange("employees", e.target.value)}
                      onBlur={() => handleBlur("employees")}
                      className={errors.employees && touched.employees ? "has-error" : ""}
                      aria-invalid={Boolean(errors.employees && touched.employees)}
                    >
                      <option value="" disabled>
                        Select number of employees
                      </option>
                      <option value="1-50">1 – 50 employees</option>
                      <option value="51-200">51 – 200 employees</option>
                      <option value="201-500">201 – 500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                    {errors.employees && touched.employees && (
                      <span className="field-error">
                        <Icon name="x" size={11} /> {errors.employees}
                      </span>
                    )}
                  </label>

                  <label>
                    <span>Primary Area of Interest</span>
                    <select
                      value={formData.interest}
                      onChange={(e) => handleChange("interest", e.target.value)}
                    >
                      <option value="Full Platform">All-In-One Platform</option>
                      <option value="Attendance & Geofencing">Attendance & Geofencing</option>
                      <option value="Statutory Payroll">Statutory Payroll Management</option>
                      <option value="Multi-Branch Governance">Multi-Branch Governance</option>
                    </select>
                  </label>
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
