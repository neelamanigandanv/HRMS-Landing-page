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

  // Full clean reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setSubmitError(null);
      setErrors({});
      setSubmitAttempted(false);
      setFormData({
        name: "",
        email: defaultEmail || "",
        phone: "",
        company: "",
        employees: "",
        interest: defaultInterest || "",
      });
    }
  }, [isOpen, defaultEmail, defaultInterest]);

  // Clean close handler that wipes stale input state
  const handleClose = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setErrors({});
    setSubmitAttempted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      employees: "",
      interest: "",
    });
    onClose();
  };

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
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
        form_type: "demo_popup",
        name: formData.name.trim(),
        work_email: formData.email.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone.trim(),
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
      setSubmitAttempted(false);
      setErrors({});
      // Clear data immediately after successful submit so subsequent modal opens start completely fresh
      setFormData({
        name: "",
        email: defaultEmail || "",
        phone: "",
        company: "",
        employees: "",
        interest: defaultInterest || "",
      });
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
          handleClose();
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
          onClick={handleClose}
          aria-label="Close demo form modal"
        >
          <Icon name="x" size={16} />
        </button>

        {isSubmitted ? (
          <div className="demo-success-card">
            {/* Top Luxury Plum/Wine Ribbon Bar */}
            <div className="demo-success-top-ribbon" />

            <div className="demo-success-content">
              {/* Confetti & Clipboard Illustration matching reference image */}
              <div className="demo-success-illustration-wrap">
                <svg
                  width="130"
                  height="115"
                  viewBox="0 0 140 125"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="demo-success-illustration"
                  aria-hidden="true"
                >
                  {/* Confetti circles */}
                  <circle cx="24" cy="38" r="3" fill="#e879a9" opacity="0.85" />
                  <circle cx="116" cy="32" r="3.5" stroke="#802B5B" strokeWidth="1.5" fill="none" opacity="0.7" />
                  <circle cx="92" cy="16" r="2.5" fill="#0d9488" opacity="0.75" />
                  <circle cx="48" cy="18" r="2" fill="#802B5B" opacity="0.6" />
                  <circle cx="28" cy="76" r="2.5" fill="#0d9488" opacity="0.7" />
                  <circle cx="122" cy="68" r="3" fill="#e879a9" opacity="0.85" />

                  {/* Confetti rectangular ribbons */}
                  <rect x="24" y="22" width="7" height="3" rx="1.5" transform="rotate(-30 24 22)" fill="#0d9488" opacity="0.8" />
                  <rect x="110" y="20" width="8" height="3.5" rx="1.5" transform="rotate(25 110 20)" fill="#802B5B" opacity="0.7" />
                  <rect x="18" y="52" width="6" height="3" rx="1.5" transform="rotate(40 18 52)" fill="#e879a9" opacity="0.85" />
                  <rect x="118" y="48" width="7" height="3" rx="1.5" transform="rotate(-35 118 48)" fill="#0d9488" opacity="0.75" />
                  <rect x="36" y="92" width="7" height="3" rx="1.5" transform="rotate(15 36 92)" fill="#802B5B" opacity="0.6" />

                  {/* Starbursts */}
                  <path d="M70 6V12M67 9H73" stroke="#e879a9" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
                  <path d="M104 84V88M102 86H106" stroke="#802B5B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

                  {/* Clipboard soft drop shadow */}
                  <rect x="38" y="30" width="60" height="74" rx="8" fill="rgba(128, 43, 91, 0.08)" />

                  {/* Clipboard Base with Luxury Plum Outline */}
                  <rect x="36" y="26" width="60" height="74" rx="7" fill="#ffffff" stroke="#5c183e" strokeWidth="3" />

                  {/* Top Clip Clamp */}
                  <rect x="52" y="20" width="28" height="12" rx="4" fill="#802B5B" stroke="#5c183e" strokeWidth="2.5" />
                  <circle cx="66" cy="25" r="2.5" fill="#ffffff" />

                  {/* Checkmark inside clipboard */}
                  <path
                    d="M48 62L58 72L82 48"
                    stroke="#0d9488"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Shield with Checkmark (Bottom-Right Overlap) */}
                  <g filter="url(#shieldShadow)">
                    <path
                      d="M90 62C90 62 99 59 108 62C108 77 99 87 90 92C81 87 72 77 72 62C81 59 90 62 90 62Z"
                      fill="url(#shieldGrad)"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M84 76L88 80L96 71"
                      stroke="#ffffff"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* Gradients & Filters */}
                  <defs>
                    <linearGradient id="shieldGrad" x1="72" y1="62" x2="108" y2="92" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#0d9488" />
                      <stop offset="100%" stopColor="#065f46" />
                    </linearGradient>
                    <filter id="shieldShadow" x="68" y="60" width="44" height="40" filterUnits="userSpaceOnUse">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#065f46" floodOpacity="0.3" />
                    </filter>
                  </defs>
                </svg>
              </div>

              {/* Title from Reference Image */}
              <h3 className="demo-success-title">Thank You for Your Interest!</h3>

              {/* Lead Paragraph */}
              <p className="demo-success-desc">
                We&apos;ve received your request for <strong>{formData.company ? `${formData.company} (Zentilos HRMS)` : "Zentilos HRMS"}</strong>.
                Our team is already on it and will get back to you within <strong>2 business hours</strong> to schedule your demo.
              </p>

              {/* Contact Specifics */}
              <p className="demo-success-contact-note">
                Our product specialist will call <strong>{formData.name}</strong> at{" "}
                <strong>{formData.phone}</strong> (or email at <strong>{formData.email}</strong>) for your personalised walkthrough.
              </p>

              {/* 3 Walkthrough Perks Box */}
              <div className="demo-success-perks-box">
                <div className="demo-success-perk-item">
                  <span className="perk-check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <span>30-minute tailored walkthrough</span>
                </div>
                <div className="demo-success-perk-item">
                  <span className="perk-check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <span>Multi-branch &amp; compliance walkthrough</span>
                </div>
                <div className="demo-success-perk-item">
                  <span className="perk-check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <span>No credit card required • 100% free</span>
                </div>
              </div>

              {/* Friendly Closing Note */}
              <p className="demo-success-closing">
                We look forward to connecting with you soon.
              </p>

              {/* Actions: Done & Book Another */}
              <div className="demo-success-actions">
                <button
                  type="button"
                  className="demo-success-btn-done"
                  onClick={handleClose}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="demo-success-btn-reset"
                  onClick={handleReset}
                >
                  Book another
                </button>
              </div>
            </div>
          </div>) : (
          <form
            className={`demo-form ${isSubmitting ? "form-submitting" : ""}`}
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
