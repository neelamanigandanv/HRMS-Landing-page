import { FormEvent, useEffect, useState } from "react";
import Icon from "../ui/Icon";
import CustomSelect from "../ui/CustomSelect";
import PhoneInput from "./PhoneInput";
import { validatePhoneNumber, FormValidators } from "../../utils/phoneUtils";
import { submitEnquiry } from "../../services/enquiryService";

const MODAL_TEAM_SIZE_OPTIONS = [
  { value: "1-50", label: "1 – 50 employees" },
  { value: "51-200", label: "51 – 200 employees" },
  { value: "201-500", label: "201 – 500 employees" },
  { value: "500+", label: "500+ employees" },
];

const MODAL_INTEREST_OPTIONS = [
  { value: "Full Platform", label: "All-In-One Platform" },
  { value: "Attendance & Geofencing", label: "Attendance & Geofencing" },
  { value: "Statutory Payroll", label: "Statutory Payroll Management" },
  { value: "Multi-Branch Governance", label: "Multi-Branch Governance" },
];

export interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  defaultInterest?: string;
  defaultEmail?: string;
}

export function RequestDemoModal({
  isOpen,
  onClose,
  title = "See Zentilos in Action",
  subtitle = "Get a personalised 30-min walkthrough with a product specialist",
  defaultInterest = "",
  defaultEmail = "",
}: RequestDemoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: defaultEmail || "",
    phone: "",
    company: "",
    employees: "",
    interest: defaultInterest || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Reset when re-opened
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setSubmitError(null);
      setErrors({});
      setSubmitAttempted(false);
      if (defaultEmail || defaultInterest) {
        setFormData((prev) => ({
          ...prev,
          email: defaultEmail || prev.email,
          interest: defaultInterest || prev.interest,
        }));
      }
    }
  }, [isOpen, defaultEmail, defaultInterest]);

  const validateField = (field: string, value: string): string => {
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Only re-validate dynamically if user has already tried to submit
    if (submitAttempted) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: string) => {
    // Only validate on blur if user has already attempted to submit
    if (submitAttempted) {
      const err = validateField(field, (formData as Record<string, string>)[field] || "");
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const fieldsToValidate = ["name", "email", "phone", "company", "employees"];
    const newErrors: Record<string, string> = {};

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, (formData as Record<string, string>)[field] || "");
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus first error field for clean accessible UX
      const firstError = fieldsToValidate.find((f) => newErrors[f]);
      if (firstError) {
        const el = document.getElementById(`modal-${firstError}`);
        if (el) el.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const currentPath =
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.hash || "#demo-popup"}`
          : "/pricing#demo-popup";

      await submitEnquiry({
        name: formData.name.trim(),
        work_email: formData.email.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company_name: formData.company.trim(),
        team_size: formData.employees,
        primary_area_of_interest: formData.interest || "Attendance & Leave Tracking",
        nature_of_enquiry: "SCHEDULE_LIVE_DEMO",
        notes: `Demo request from modal (${title})`,
        source_page: currentPath,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err?.message || "Failed to submit demo request. Please check your connection and try again."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: defaultEmail || "",
      phone: "",
      company: "",
      employees: "",
      interest: defaultInterest || "",
    });
    setErrors({});
    setSubmitAttempted(false);
    setSubmitError(null);
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="demo-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-demo-title"
    >
      <div className="demo-modal-card">
        {/* Close button (X) */}
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close demo form modal"
        >
          <Icon name="x" size={16} />
        </button>

        {isSubmitted ? (
          <div className="demo-form compact">
            <div className="demo-success-panel" style={{ padding: "36px 20px" }}>
              <div className="demo-success-icon" style={{ width: "60px", height: "60px" }}>
                <Icon name="check" size={28} />
              </div>
              <h3 style={{ fontSize: "22px", marginTop: "6px" }}>Demo Request Received!</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65" }}>
                Thank you, <strong>{formData.name}</strong>. Our product specialist will call you at{" "}
                <strong>{formData.phone}</strong> (or email at <strong>{formData.email}</strong>) within 2 business hours for your personalised walkthrough.
              </p>

              <div
                style={{
                  background: "#f8f8fb",
                  border: "1px solid #e9e8ef",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  width: "100%",
                  marginTop: "8px",
                  textAlign: "left",
                  fontSize: "12px",
                  color: "#475569",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "7px", fontWeight: "600", color: "#191735" }}>
                  <Icon name="check" size={14} /> 30-minute tailored walkthrough
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", fontWeight: "600", color: "#191735" }}>
                  <Icon name="check" size={14} /> Multi-branch & compliance walkthrough
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", fontWeight: "600", color: "#191735" }}>
                  <Icon name="check" size={14} /> No credit card required • 100% free
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "14px", width: "100%" }}>
                <button
                  type="button"
                  className="btn form-submit"
                  onClick={onClose}
                  style={{ flex: 1, margin: 0, height: "44px" }}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="demo-success-reset"
                  onClick={handleReset}
                  style={{ margin: 0, padding: "0 18px", height: "44px" }}
                >
                  Book another
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form
            className={`demo-form ${isSubmitting ? "form-submitting" : ""}`}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-title" style={{ marginBottom: "18px" }}>
              <span>
                <Icon name="sparkle" size={18} />
              </span>
              <div>
                <strong id="modal-demo-title">{title}</strong>
                <small>{subtitle}</small>
              </div>
            </div>

            <div className="form-grid">
              {/* Full Name */}
              <div className="demo-field-wrap">
                <label htmlFor="modal-name" className="demo-field-label">
                  <span>Full Name</span>
                  <span className="required-star">*</span>
                </label>
                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={submitAttempted && errors.name ? "has-error" : ""}
                  placeholder="e.g. Rahul Sharma"
                  aria-invalid={Boolean(submitAttempted && errors.name)}
                  autoFocus
                />
                {submitAttempted && errors.name && (
                  <span className="field-error">
                    <Icon name="x" size={11} /> {errors.name}
                  </span>
                )}
              </div>

              {/* Work Email */}
              <div className="demo-field-wrap">
                <label htmlFor="modal-email" className="demo-field-label">
                  <span>Work Email</span>
                  <span className="required-star">*</span>
                </label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={submitAttempted && errors.email ? "has-error" : ""}
                  placeholder="rahul@company.com"
                  aria-invalid={Boolean(submitAttempted && errors.email)}
                />
                {submitAttempted && errors.email && (
                  <span className="field-error">
                    <Icon name="x" size={11} /> {errors.email}
                  </span>
                )}
              </div>

              {/* Phone with Country Selector */}
              <div className="demo-field-wrap">
                <label htmlFor="modal-phone" className="demo-field-label">
                  <span>Phone Number</span>
                  <span className="required-star">*</span>
                </label>
                <PhoneInput
                  id="modal-phone"
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
              </div>

              {/* Company */}
              <div className="demo-field-wrap">
                <label htmlFor="modal-company" className="demo-field-label">
                  <span>Company Name</span>
                  <span className="required-star">*</span>
                </label>
                <input
                  id="modal-company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  onBlur={() => handleBlur("company")}
                  className={submitAttempted && errors.company ? "has-error" : ""}
                  placeholder="Acme Technologies"
                  aria-invalid={Boolean(submitAttempted && errors.company)}
                />
                {submitAttempted && errors.company && (
                  <span className="field-error">
                    <Icon name="x" size={11} /> {errors.company}
                  </span>
                )}
              </div>

              {/* Team Size */}
              <div className="demo-field-wrap">
                <label htmlFor="modal-team-size" className="demo-field-label">
                  <span>Team Size</span>
                  <span className="required-star">*</span>
                </label>
                <CustomSelect
                  id="modal-team-size"
                  options={MODAL_TEAM_SIZE_OPTIONS}
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

              {/* Module Interest */}
              <div className="demo-field-wrap">
                <label htmlFor="modal-primary-focus" className="demo-field-label">
                  <span>Primary Area of Interest</span>
                </label>
                <CustomSelect
                  id="modal-primary-focus"
                  options={MODAL_INTEREST_OPTIONS}
                  value={formData.interest}
                  placeholder="Select primary focus"
                  onChange={(val) => handleChange("interest", val)}
                />
              </div>
            </div>

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
                  marginTop: "12px",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
                role="alert"
              >
                <span style={{ fontWeight: "bold", fontSize: "14px", lineHeight: "1" }}>!</span>
                <span>{submitError}</span>
              </div>
            )}

            <button type="submit" className="btn form-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>Scheduling Walkthrough...</span>
              ) : (
                <span className="form-submit-content">
                  <span>Book a Free Demo</span>
                  <Icon name="arrow" size={16} />
                </span>
              )}
            </button>

            <small className="privacy" style={{ marginTop: "12px" }}>
              <Icon name="shield" size={13} /> Your details are strictly confidential. No credit card required.
            </small>
          </form>
        )}
      </div>
    </div>
  );
}

export default RequestDemoModal;
