import { FormEvent, useEffect, useState } from "react";
import Icon from "../ui/Icon";

export interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  defaultInterest?: string;
}

export function RequestDemoModal({
  isOpen,
  onClose,
  title = "See LattiumHR in Action",
  subtitle = "Get a personalised 30-min walkthrough with a product specialist",
  defaultInterest = "",
}: RequestDemoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    interest: defaultInterest || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      setErrors({});
      setTouched({});
    }
  }, [isOpen]);

  const validateField = (field: string, value: string): string => {
    const trimmed = value.trim();
    switch (field) {
      case "name":
        if (!trimmed) return "Please enter your full name";
        if (trimmed.length < 2) return "Enter your full name";
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return "Letters only";
        return "";
      case "email":
        if (!trimmed) return "Work email is required";
        if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmed)) return "Enter a valid work email";
        return "";
      case "phone": {
        const digits = trimmed.replace(/\D/g, "");
        if (!digits) return "Phone number is required";
        if (digits.length < 10) return "Min 10 digits required";
        return "";
      }
      case "company":
        if (!trimmed) return "Company name is required";
        return "";
      case "employees":
        if (!value) return "Please select team size";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, (formData as Record<string, string>)[field] || "");
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fieldsToValidate = ["name", "email", "phone", "company", "employees"];
    const newErrors: Record<string, string> = {};

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, (formData as Record<string, string>)[field] || "");
      if (err) newErrors[field] = err;
    });

    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      employees: true,
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      employees: "",
      interest: defaultInterest || "",
    });
    setErrors({});
    setTouched({});
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
              <label>
                <span>Full Name *</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={errors.name && touched.name ? "has-error" : ""}
                  placeholder="e.g. Rahul Sharma"
                  aria-invalid={Boolean(errors.name && touched.name)}
                  autoFocus
                />
                {errors.name && touched.name && (
                  <span className="field-error">
                    <Icon name="x" size={11} /> {errors.name}
                  </span>
                )}
              </label>

              {/* Work Email */}
              <label>
                <span>Work Email *</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={errors.email && touched.email ? "has-error" : ""}
                  placeholder="rahul@company.com"
                  aria-invalid={Boolean(errors.email && touched.email)}
                />
                {errors.email && touched.email && (
                  <span className="field-error">
                    <Icon name="x" size={11} /> {errors.email}
                  </span>
                )}
              </label>

              {/* Phone */}
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

              {/* Company */}
              <label>
                <span>Company Name *</span>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  onBlur={() => handleBlur("company")}
                  className={errors.company && touched.company ? "has-error" : ""}
                  placeholder="Acme Technologies"
                  aria-invalid={Boolean(errors.company && touched.company)}
                />
                {errors.company && touched.company && (
                  <span className="field-error">
                    <Icon name="x" size={11} /> {errors.company}
                  </span>
                )}
              </label>

              {/* Team Size */}
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
                    Select team size
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

              {/* Module Interest */}
              <label>
                <span>Primary Focus</span>
                <select
                  value={formData.interest}
                  onChange={(e) => handleChange("interest", e.target.value)}
                >
                  <option value="" disabled>
                    Select primary focus
                  </option>
                  <option value="Full Platform">All Modules (Full Suite)</option>
                  <option value="Attendance & Geofencing">Attendance & Geofencing</option>
                  <option value="Payroll & Compliance">Payroll & Compliance</option>
                  <option value="Core HR & Onboarding">Core HR & Directory</option>
                  <option value="Multi-Branch Operations">Multi-Branch Operations</option>
                </select>
              </label>
            </div>

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
