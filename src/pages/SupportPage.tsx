import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/layout/SEO";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import CustomSelect from "@/components/ui/CustomSelect";
import { submitSupportTicket, TicketRecord } from "@/services/supportTicketService";
import { submitEnquiry } from "@/services/enquiryService";
import "./SupportPage.css";

type SupportType = "technical" | "product" | "sales";

const SUPPORT_CATEGORIES_BY_TYPE: Record<SupportType, string[]> = {
  technical: [
    "Login, SSO & Authentication Issues",
    "Biometric Turnstile & Hardware Sync",
    "System Error or Unexpected Bug",
    "API & Webhook Integration",
    "Performance, Latency or Downtime",
    "Data Export / Import Error",
  ],
  product: [
    "Attendance Rules & Shift Rosters",
    "Leave Policy, Sandwich Rules & Accruals",
    "Payroll Components & Salary Masters",
    "Employee Onboarding & Document Vaults",
    "Role Permissions & Approval Chains",
    "Statutory Compliance (PF, ESI, PT, TDS)",
  ],
  sales: [
    "Custom Enterprise Pricing & Quotes",
    "Schedule Live Guided Product Demo",
    "Implementation & Data Migration Timeline",
    "Plan Upgrade or Additional Employee Seats",
    "Partnership & Reseller Inquiries",
    "General Commercial Inquiry",
  ],
};

const TYPE_CONFIG = {
  technical: {
    badge: "ENGINEERING DESK",
    title: "Technical Support",
    desc: "Login issues, errors, integrations, product bugs.",
    subjectPlaceholder: "e.g., Biometric device punch sync timeout on Mumbai turnstile",
    descPlaceholder:
      "Please describe the technical error, steps to reproduce, device model, or error message shown...",
    assignedTeam: "L2 Technical Integrations & Bug Desk",
    targetSLA: "Within 2 business hours",
  },
  product: {
    badge: "CUSTOMER SUCCESS",
    title: "Product & Account Assistance",
    desc: "HRMS setup, attendance, leave, payroll, permissions.",
    subjectPlaceholder: "e.g., Assistance configuring multi-shift night allowances and comp-off",
    descPlaceholder:
      "Please describe your policy rules, affected departments, or HRMS setup questions...",
    assignedTeam: "Specialized HRMS Operations & Customer Success",
    targetSLA: "Within 3 business hours",
  },
  sales: {
    badge: "COMMERCIAL & DEMO",
    title: "Sales & Demo Enquiries",
    desc: "Pricing, plans, product demonstrations, business requirements.",
    subjectPlaceholder: "e.g., Enterprise pricing quotation for 250 employees across 3 branches",
    descPlaceholder:
      "Tell us about your team size, current payroll/HR setup, timeline, or requested demo topics...",
    assignedTeam: "Commercial Solutions & Enterprise Demo Desk",
    targetSLA: "Within 1 business hour",
  },
};

export default function SupportPage() {
  const location = useLocation();

  // Selected support type from Section 2 (synced with form)
  const [selectedType, setSelectedType] = useState<SupportType>("technical");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [issueCategory, setIssueCategory] = useState(SUPPORT_CATEGORIES_BY_TYPE.technical[0]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);

  // Form status & feedback
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedTicket, setSubmittedTicket] = useState<TicketRecord | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Dropzone drag state
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Field refs for accessible focus
  const fullNameRef = useRef<HTMLInputElement>(null);
  const workEmailRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // Sync category dropdown when support type changes
  const handleTypeSelect = (type: SupportType, shouldScroll = true) => {
    setSelectedType(type);
    setIssueCategory(SUPPORT_CATEGORIES_BY_TYPE[type][0]);
    if (shouldScroll) {
      const el = document.getElementById("submit-request");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // URL Hash or query check on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get("type") as SupportType;
    if (typeParam && (typeParam === "technical" || typeParam === "product" || typeParam === "sales")) {
      handleTypeSelect(typeParam, false);
    }
    if (location.hash === "#submit-request" || location.hash === "#ticket") {
      const el = document.getElementById("submit-request");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // File Upload Handling
  const handleFilesSelected = (filesList: FileList | null) => {
    if (!filesList) return;
    const newFiles: File[] = [];
    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      if (attachedFiles.length + newFiles.length >= 5) {
        alert("You can upload a maximum of 5 attachments.");
        break;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 5 MB limit.`);
        continue;
      }
      newFiles.push(file);
    }
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!workEmail.trim()) {
      errors.workEmail = "Work email is required.";
    } else if (!emailRegex.test(workEmail.trim())) {
      errors.workEmail = "Please enter a valid business email address.";
    }

    if (!companyName.trim()) {
      errors.companyName = "Company name is required.";
    }

    if (!subject.trim()) {
      errors.subject = "Subject is required.";
    }

    if (!description.trim()) {
      errors.description = "Issue description is required.";
    } else if (description.trim().length < 15) {
      errors.description = `Description must be at least 15 characters (currently ${description.trim().length}).`;
    }

    if (!consent) {
      errors.consent = "Please agree to be contacted regarding this request.";
    }

    setFormErrors(errors);

    // Focus first invalid field
    if (errors.fullName && fullNameRef.current) {
      fullNameRef.current.focus();
    } else if (errors.workEmail && workEmailRef.current) {
      workEmailRef.current.focus();
    } else if (errors.companyName && companyNameRef.current) {
      companyNameRef.current.focus();
    } else if (errors.subject && subjectRef.current) {
      subjectRef.current.focus();
    } else if (errors.description && descriptionRef.current) {
      descriptionRef.current.focus();
    }

    return Object.keys(errors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit to local Support Ticket Service (creates reference number and persists in session)
      const ticket = await submitSupportTicket({
        name: fullName.trim(),
        email: workEmail.trim(),
        workEmail: workEmail.trim(),
        companyName: companyName.trim(),
        category: issueCategory,
        priority: selectedType === "technical" ? "High" : "Medium",
        subject: subject.trim(),
        description: description.trim(),
        files: attachedFiles.map((f) => ({ name: f.name, size: f.size, type: f.type })),
        filesCount: attachedFiles.length,
        consent,
      });

      // 2. Also forward to backend public enquiry API endpoint (POST /neuverve/public/enquiry)
      try {
        await submitEnquiry({
          name: fullName.trim(),
          email: workEmail.trim(),
          company_name: companyName.trim(),
          primary_area_of_interest: issueCategory,
          nature_of_enquiry:
            selectedType === "sales" ? "SCHEDULE_LIVE_DEMO" : "GENERAL_ENQUIRY",
          notes: `[Ref: ${ticket.id}] [${selectedType.toUpperCase()}] ${subject.trim()}: ${description.trim()}`,
          source_page: "/support#submit-request",
        });
      } catch (backendErr) {
        // Log backend sync notice without blocking customer confirmation
        console.warn("Backend enquiry sync notice:", backendErr);
      }

      setSubmittedTicket(ticket);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "An error occurred while submitting your support request. Please try again.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to submit another request
  const handleResetForm = () => {
    setSubmittedTicket(null);
    setSubject("");
    setDescription("");
    setAttachedFiles([]);
    setFormErrors({});
    setCopiedRef(false);
  };

  // Copy Reference Number
  const handleCopyRef = (id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  return (
    <PageLayout hideCTA={true}>
      <SEO
        title="Customer Support & Help Desk | LattiumHR"
        description="Connect directly with LattiumHR's technical engineers, HRMS customer success desk, and sales specialists for fast, reliable resolution."
        canonicalPath="/support"
      />

      <div className="support-hub-page">
        {/* ==================================================================
            1. HERO — We're Here to Help
            ================================================================== */}
        <section className="support-hero-section" aria-labelledby="support-hero-heading">
          <div className="container">
            <div className="support-hero-content">
              {/* Eyebrow */}
              <div className="support-hero-eyebrow">
                <span className="support-hero-sparkle">✦</span>
                <span>CUSTOMER SUPPORT &amp; HELP DESK</span>
                <span className="support-hero-sparkle">✦</span>
              </div>

              {/* Heading */}
              <h1 id="support-hero-heading" className="support-hero-title">
                Let's Get Your HRMS{" "}
                <span className="support-hero-glow">Questions Resolved</span>
              </h1>

              {/* Subheading */}
              <p className="support-hero-subtext">
                Whether you need help using LattiumHR, configuring biometric sync, or have an urgent technical inquiry, connect with the right specialist team for rapid resolution.
              </p>

              {/* Action Buttons */}
              <div className="support-hero-actions">
                <Button
                  onClick={() => {
                    const el = document.getElementById("submit-request");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="support-hero-btn-primary"
                >
                  Submit a Support Request <Icon name="arrow" size={16} />
                </Button>
                <Button to="/help" secondary className="support-hero-btn-secondary">
                  Visit Help Center
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="support-hero-trust-row">
                <span className="support-hero-trust-item">
                  <Icon name="check" size={15} /> Guaranteed 2-Hour SLA for Critical Tickets
                </span>
                <span className="support-hero-trust-item">
                  <Icon name="check" size={15} /> Direct Access to Certified HRMS Engineers
                </span>
                <span className="support-hero-trust-item">
                  <Icon name="check" size={15} /> Mon–Sat 9:00 AM – 7:00 PM IST Active Hotline
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Inset Divider */}
        <hr className="support-section-divider" aria-hidden="true" />

        {/* ==================================================================
            2. CHOOSE YOUR SUPPORT TYPE (Matching Uploaded Image 2 Architecture)
            ================================================================== */}
        <section className="support-section" id="choose-support-type" aria-labelledby="types-heading">
          <div className="container">
            <div className="support-section-header">
              <span className="support-section-eyebrow">✦ STEP 1: CHOOSE YOUR PATH ✦</span>
              <h2 id="types-heading" className="support-section-title">
                How Can We Assist You?
              </h2>
              <p className="support-section-subtext">
                Select the category that best describes your inquiry. Each card configures a
                tailored workflow directly routed to that specialized team.
              </p>
            </div>

            <div className="support-types-grid">
              {/* Card 1: Technical Support */}
              <div
                className={`support-type-card-v2 ${selectedType === "technical" ? "selected" : ""}`}
                onClick={() => handleTypeSelect("technical")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleTypeSelect("technical");
                }}
                aria-pressed={selectedType === "technical"}
              >
                <div className="type-card-media-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80"
                    alt="Technical Engineering Support"
                    className="type-card-image"
                    loading="lazy"
                  />
                  <span className="type-card-overlay-badge">
                    {TYPE_CONFIG.technical.badge}
                  </span>
                </div>

                <div className="type-card-body">
                  <div className="type-card-meta-row">
                    <span className="type-card-meta-item">
                      <Icon name="clock" size={13} /> 2-Hour SLA
                    </span>
                    <span className="type-card-meta-dot">•</span>
                    <span className="type-card-meta-item">
                      <Icon name="shield" size={13} /> L2 Engineers
                    </span>
                  </div>

                  <h3 className="type-card-title">{TYPE_CONFIG.technical.title}</h3>
                  <p className="type-card-desc">{TYPE_CONFIG.technical.desc}</p>

                  <div className="type-card-tags">
                    <span className="type-card-tag">Login &amp; SSO</span>
                    <span className="type-card-tag">Device Sync</span>
                    <span className="type-card-tag">System Errors</span>
                    <span className="type-card-tag">API &amp; Webhooks</span>
                  </div>

                  <div className="type-card-action-row">
                    <span>Raise Technical Ticket</span>
                    <Icon name="arrow" size={15} />
                  </div>
                </div>
              </div>

              {/* Card 2: Product & Account Assistance */}
              <div
                className={`support-type-card-v2 ${selectedType === "product" ? "selected" : ""}`}
                onClick={() => handleTypeSelect("product")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleTypeSelect("product");
                }}
                aria-pressed={selectedType === "product"}
              >
                <div className="type-card-media-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80"
                    alt="Product & Customer Success Team"
                    className="type-card-image"
                    loading="lazy"
                  />
                  <span className="type-card-overlay-badge">
                    {TYPE_CONFIG.product.badge}
                  </span>
                </div>

                <div className="type-card-body">
                  <div className="type-card-meta-row">
                    <span className="type-card-meta-item">
                      <Icon name="clock" size={13} /> 3-Hour SLA
                    </span>
                    <span className="type-card-meta-dot">•</span>
                    <span className="type-card-meta-item">
                      <Icon name="users" size={13} /> Success Desk
                    </span>
                  </div>

                  <h3 className="type-card-title">{TYPE_CONFIG.product.title}</h3>
                  <p className="type-card-desc">{TYPE_CONFIG.product.desc}</p>

                  <div className="type-card-tags">
                    <span className="type-card-tag">Shift Rosters</span>
                    <span className="type-card-tag">Leave Policies</span>
                    <span className="type-card-tag">Payroll CTC</span>
                    <span className="type-card-tag">Role Access</span>
                  </div>

                  <div className="type-card-action-row">
                    <span>Get Account Assistance</span>
                    <Icon name="arrow" size={15} />
                  </div>
                </div>
              </div>

              {/* Card 3: Sales & Demo Enquiries */}
              <div
                className={`support-type-card-v2 ${selectedType === "sales" ? "selected" : ""}`}
                onClick={() => handleTypeSelect("sales")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleTypeSelect("sales");
                }}
                aria-pressed={selectedType === "sales"}
              >
                <div className="type-card-media-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=700&q=80"
                    alt="Enterprise Sales and Guided Product Demo"
                    className="type-card-image"
                    loading="lazy"
                  />
                  <span className="type-card-overlay-badge">
                    {TYPE_CONFIG.sales.badge}
                  </span>
                </div>

                <div className="type-card-body">
                  <div className="type-card-meta-row">
                    <span className="type-card-meta-item">
                      <Icon name="clock" size={13} /> 1-Hour SLA
                    </span>
                    <span className="type-card-meta-dot">•</span>
                    <span className="type-card-meta-item">
                      <Icon name="sparkle" size={13} /> Solutions Desk
                    </span>
                  </div>

                  <h3 className="type-card-title">{TYPE_CONFIG.sales.title}</h3>
                  <p className="type-card-desc">{TYPE_CONFIG.sales.desc}</p>

                  <div className="type-card-tags">
                    <span className="type-card-tag">Custom Quotes</span>
                    <span className="type-card-tag">Live Walkthrough</span>
                    <span className="type-card-tag">Plan Upgrade</span>
                    <span className="type-card-tag">Data Migration</span>
                  </div>

                  <div className="type-card-action-row">
                    <span>Inquire with Sales</span>
                    <Icon name="arrow" size={15} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inset Divider */}
        <hr className="support-section-divider" aria-hidden="true" />

        {/* ==================================================================
            3. SUBMIT A SUPPORT REQUEST (Centered Form Architecture)
            ================================================================== */}
        <section
          className="support-section alt-bg"
          id="submit-request"
          aria-labelledby="submit-heading"
        >
          <div className="container">
            {/* Centered Section Header */}
            <div className="support-section-header">
              <span className="support-section-eyebrow">✦ STEP 2: DISPATCH REQUEST ✦</span>
              <h2 id="submit-heading" className="support-section-title">
                Tell Us How We Can Help
              </h2>
              <p className="support-section-subtext">
                Fill in the details below. Our {TYPE_CONFIG[selectedType].assignedTeam} will
                review your request and reply to your work email.
              </p>
            </div>

            {/* Centered Form Wrapper */}
            <div className="support-form-wrapper">
                  {submittedTicket ? (
                    /* Confirmation Screen with Reference Number */
                    <div className="support-confirmation-card">
                      <div className="support-conf-icon-wrap">
                        <Icon name="check" size={36} />
                      </div>
                      <h3 className="support-conf-title">Request Successfully Received!</h3>
                      <p className="support-conf-sub">
                        Thank you, <strong>{submittedTicket.name}</strong>. Your support request has
                        been registered in our dispatch system and routed to our{" "}
                        <strong>{submittedTicket.assignedTeam}</strong>.
                      </p>

                      {/* Reference Number Box */}
                      <div className="support-ref-badge-box">
                        <span className="support-ref-label">Official Reference Number</span>
                        <div className="support-ref-value-row">
                          <span className="support-ref-number">{submittedTicket.id}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyRef(submittedTicket.id)}
                            className="support-ref-copy-btn"
                          >
                            {copiedRef ? "Copied! ✓" : "Copy Ref"}
                          </button>
                        </div>
                      </div>

                      {/* Metadata Summary */}
                      <div className="support-conf-meta-grid">
                        <div className="support-conf-meta-item">
                          <strong>Work Email</strong>
                          <span>{submittedTicket.workEmail}</span>
                        </div>
                        <div className="support-conf-meta-item">
                          <strong>Category</strong>
                          <span>{submittedTicket.category}</span>
                        </div>
                        <div className="support-conf-meta-item">
                          <strong>Estimated SLA</strong>
                          <span>{submittedTicket.expectedResponseSLA}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="support-conf-actions">
                        <Button onClick={handleResetForm} secondary>
                          Submit Another Request
                        </Button>
                        <Button to={`/support/track?id=${submittedTicket.id}`}>
                          Track Request Status <Icon name="arrow" size={15} />
                        </Button>
                        <Button to="/help" secondary>
                          Browse Help Center
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Ticket Submission Form */
                    <>
                      {/* Category Switcher Tabs */}
                      <div
                        className="support-form-type-tabs"
                        role="tablist"
                        aria-label="Support Type Switcher"
                      >
                        <button
                          type="button"
                          role="tab"
                          aria-selected={selectedType === "technical"}
                          className={`support-form-type-tab ${
                            selectedType === "technical" ? "active" : ""
                          }`}
                          onClick={() => handleTypeSelect("technical", false)}
                        >
                          <Icon name="shield" size={16} /> Technical Support
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={selectedType === "product"}
                          className={`support-form-type-tab ${
                            selectedType === "product" ? "active" : ""
                          }`}
                          onClick={() => handleTypeSelect("product", false)}
                        >
                          <Icon name="users" size={16} /> Product &amp; Account
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={selectedType === "sales"}
                          className={`support-form-type-tab ${
                            selectedType === "sales" ? "active" : ""
                          }`}
                          onClick={() => handleTypeSelect("sales", false)}
                        >
                          <Icon name="sparkle" size={16} /> Sales &amp; Demo
                        </button>
                      </div>

                      {/* Active Routing Card */}
                      <div className="support-assigned-desk-card">
                        <div className="assigned-desk-header">
                          <span className="assigned-desk-badge">
                            <Icon name="shield" size={13} /> ACTIVE ROUTING
                          </span>
                          <strong className="assigned-desk-name">{TYPE_CONFIG[selectedType].title}</strong>
                        </div>
                        <div className="assigned-desk-meta-rows">
                          <div className="assigned-desk-row">
                            <span className="desk-lbl">Assigned Team:</span>
                            <strong className="desk-val">{TYPE_CONFIG[selectedType].assignedTeam}</strong>
                          </div>
                          <div className="assigned-desk-row">
                            <span className="desk-lbl">Target Resolution SLA:</span>
                            <strong className="desk-val sla">{TYPE_CONFIG[selectedType].targetSLA}</strong>
                          </div>
                        </div>
                      </div>

                      {submitError && (
                        <div
                          style={{
                            padding: "1rem",
                            marginBottom: "1.5rem",
                            backgroundColor: "#fef2f2",
                            border: "1px solid #fecaca",
                            borderRadius: "10px",
                            color: "#b91c1c",
                            fontSize: "0.9375rem",
                          }}
                        >
                          {submitError}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} noValidate>
                        <div className="support-form-grid">
                          {/* Row 1: Full Name & Work Email */}
                          <div className="support-form-row">
                            <div className="support-field-group">
                              <label htmlFor="sup-name" className="support-label">
                                Full Name <span className="support-required-star">*</span>
                              </label>
                              <input
                                id="sup-name"
                                ref={fullNameRef}
                                type="text"
                                className={`support-input ${formErrors.fullName ? "error" : ""}`}
                                placeholder="e.g. Ramesh Sharma"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                              />
                              {formErrors.fullName && (
                                <span className="support-field-error">{formErrors.fullName}</span>
                              )}
                            </div>

                            <div className="support-field-group">
                              <label htmlFor="sup-email" className="support-label">
                                Work Email <span className="support-required-star">*</span>
                              </label>
                              <input
                                id="sup-email"
                                ref={workEmailRef}
                                type="email"
                                className={`support-input ${formErrors.workEmail ? "error" : ""}`}
                                placeholder="ramesh@company.com"
                                value={workEmail}
                                onChange={(e) => setWorkEmail(e.target.value)}
                                required
                              />
                              {formErrors.workEmail && (
                                <span className="support-field-error">{formErrors.workEmail}</span>
                              )}
                            </div>
                          </div>

                          {/* Row 2: Company Name & Issue Category */}
                          <div className="support-form-row">
                            <div className="support-field-group">
                              <label htmlFor="sup-company" className="support-label">
                                Company Name <span className="support-required-star">*</span>
                              </label>
                              <input
                                id="sup-company"
                                ref={companyNameRef}
                                type="text"
                                className={`support-input ${
                                  formErrors.companyName ? "error" : ""
                                }`}
                                placeholder="e.g. Acme Technologies Pvt Ltd"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                              />
                              {formErrors.companyName && (
                                <span className="support-field-error">
                                  {formErrors.companyName}
                                </span>
                              )}
                            </div>

                            <div className="support-field-group">
                              <label htmlFor="sup-category" className="support-label">
                                Issue Category <span className="support-required-star">*</span>
                              </label>
                              <CustomSelect
                                id="sup-category"
                                options={SUPPORT_CATEGORIES_BY_TYPE[selectedType].map((cat) => ({
                                  value: cat,
                                  label: cat,
                                }))}
                                value={issueCategory}
                                onChange={(val) => setIssueCategory(val)}
                              />
                            </div>
                          </div>

                          {/* Row 3: Subject */}
                          <div className="support-field-group">
                            <label htmlFor="sup-subject" className="support-label">
                              Subject <span className="support-required-star">*</span>
                            </label>
                            <input
                              id="sup-subject"
                              ref={subjectRef}
                              type="text"
                              className={`support-input ${formErrors.subject ? "error" : ""}`}
                              placeholder={TYPE_CONFIG[selectedType].subjectPlaceholder}
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              required
                            />
                            {formErrors.subject && (
                              <span className="support-field-error">{formErrors.subject}</span>
                            )}
                          </div>

                          {/* Row 4: Issue Description */}
                          <div className="support-field-group">
                            <label htmlFor="sup-desc" className="support-label">
                              Issue Description <span className="support-required-star">*</span>
                            </label>
                            <textarea
                              id="sup-desc"
                              ref={descriptionRef}
                              rows={4}
                              className={`support-textarea ${
                                formErrors.description ? "error" : ""
                              }`}
                              placeholder={TYPE_CONFIG[selectedType].descPlaceholder}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                            />
                            <span className="support-field-helper">
                              Minimum 15 characters ({description.trim().length}/15)
                            </span>
                            {formErrors.description && (
                              <span className="support-field-error">
                                {formErrors.description}
                              </span>
                            )}
                          </div>

                          {/* Row 5: Attachment / Screenshot (Optional) */}
                          <div className="support-field-group">
                            <span className="support-label">Attachment / Screenshot (Optional)</span>
                            <div
                              className={`support-dropzone ${isDragOver ? "dragover" : ""}`}
                              onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragOver(true);
                              }}
                              onDragLeave={() => setIsDragOver(false)}
                              onDrop={(e) => {
                                e.preventDefault();
                                setIsDragOver(false);
                                handleFilesSelected(e.dataTransfer.files);
                              }}
                              onClick={() => fileInputRef.current?.click()}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  fileInputRef.current?.click();
                                }
                              }}
                              aria-label="Upload screenshot or error log"
                            >
                              <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept=".png,.jpg,.jpeg,.pdf"
                                style={{ display: "none" }}
                                onChange={(e) => handleFilesSelected(e.target.files)}
                              />
                              <div className="support-dropzone-icon">📎</div>
                              <div className="support-dropzone-text">
                                Drag and drop screenshots here, or{" "}
                                <span className="support-dropzone-browse">browse files</span>
                              </div>
                              <div className="support-dropzone-hint">
                                Supported: PNG, JPG, JPEG, PDF up to 5 files (max 5 MB each)
                              </div>
                            </div>

                            {attachedFiles.length > 0 && (
                              <div className="support-file-list">
                                {attachedFiles.map((file, idx) => (
                                  <div key={idx} className="support-file-item">
                                    <span>
                                      📄 {file.name} ({(file.size / 1024).toFixed(0)} KB)
                                    </span>
                                    <button
                                      type="button"
                                      className="support-file-remove"
                                      onClick={() => removeFile(idx)}
                                      aria-label={`Remove file ${file.name}`}
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Row 6: Consent Checkbox */}
                          <div className="support-field-group">
                            <label className="support-consent-group">
                              <input
                                type="checkbox"
                                className="support-consent-checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                required
                              />
                              <span className="support-consent-text">
                                I agree to be contacted regarding this support inquiry and
                                acknowledge LattiumHR's{" "}
                                <Link to="/privacy-policy" target="_blank">
                                  privacy policy
                                </Link>
                                .
                              </span>
                            </label>
                            {formErrors.consent && (
                              <span className="support-field-error">{formErrors.consent}</span>
                            )}
                          </div>

                          {/* Submit Button */}
                          <div>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="support-submit-btn"
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="inline-block animate-spin mr-2">⏳</span>
                                  Submitting Support Request...
                                </>
                              ) : (
                                <>
                                  Submit Support Request <Icon name="arrow" size={16} />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </section>

        {/* Inset Divider */}
        <hr className="support-section-divider" aria-hidden="true" />

        {/* ==================================================================
            4. OTHER WAYS TO REACH US (Matching Uploaded Image 3 Architecture)
            ================================================================== */}
        <section className="support-section" id="other-ways-to-reach" aria-labelledby="reach-heading">
          <div className="container">
            <div className="support-section-header">
              <span className="support-section-eyebrow">✦ DIRECT CHANNELS ✦</span>
              <h2 id="reach-heading" className="support-section-title">
                Choose the Way That Works for You
              </h2>
              <p className="support-section-subtext">
                Connect with our dedicated support representatives through direct corporate
                channels with guaranteed response times.
              </p>
            </div>

            {/* Direct Channels Banner matching Image 3 with eyebrow color (#802B5B) and 3 channels */}
            <div className="support-direct-banner">
              {/* Channel 1: Email */}
              <div className="direct-banner-item">
                <div className="direct-banner-header">
                  <Icon name="mail" size={20} />
                  <span className="direct-banner-label">Our Email</span>
                </div>
                <a href="mailto:support@lattiumhr.com" className="direct-banner-value">
                  support@lattiumhr.com
                </a>
                <span className="direct-banner-note">Average response: 2 to 4 business hours</span>
              </div>

              {/* Vertical Divider 1 with "or" */}
              <div className="direct-banner-divider" aria-hidden="true">
                <span className="divider-line" />
                <span className="divider-or">or</span>
                <span className="divider-line" />
              </div>

              {/* Channel 2: Phone */}
              <div className="direct-banner-item">
                <div className="direct-banner-header">
                  <Icon name="phone" size={20} />
                  <span className="direct-banner-label">Call Us</span>
                </div>
                <a href="tel:+918041238900" className="direct-banner-value">
                  +91 (80) 4123-8900
                </a>
                <span className="direct-banner-note">Mon – Sat: 9:00 AM – 7:00 PM IST</span>
              </div>

              {/* Vertical Divider 2 with "or" */}
              <div className="direct-banner-divider" aria-hidden="true">
                <span className="divider-line" />
                <span className="divider-or">or</span>
                <span className="divider-line" />
              </div>

              {/* Channel 3: Live In-App Chat Desk (Added 3rd channel) */}
              <div className="direct-banner-item">
                <div className="direct-banner-header">
                  <Icon name="attendance" size={20} />
                  <span className="direct-banner-label">Live Support Desk</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("submit-request");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="direct-banner-value direct-banner-btn"
                >
                  In-App Admin Console
                </button>
                <span className="direct-banner-note">Real-time resolution for verified admins</span>
              </div>
            </div>
          </div>
        </section>

        {/* Inset Divider */}
        <hr className="support-section-divider" aria-hidden="true" />

        {/* ==================================================================
            5. BEFORE YOU CONTACT US (Matching Uploaded Image 1 Architecture)
            ================================================================== */}
        <section className="support-section warm-bg" id="quick-solutions" aria-labelledby="quick-heading">
          <div className="container">
            <div className="support-section-header">
              <span className="support-section-eyebrow">✦ SELF-SERVICE KNOWLEDGE ✦</span>
              <h2 id="quick-heading" className="support-section-title">
                Find a Quick Solution First
              </h2>
              <p className="support-section-subtext">
                Over 70% of setup questions and common issues can be resolved instantly
                without waiting for an agent.
              </p>
            </div>

            <div className="support-quick-grid">
              {/* Quick Card 1 */}
              <Link to="/help" className="support-quick-card-v2">
                <div className="quick-card-top-icon">
                  <Icon name="file-text" size={26} />
                </div>
                <h3 className="quick-card-title">
                  Troubleshooting &amp; Device Recovery
                </h3>
                <p className="quick-card-desc">
                  Find immediate solutions for biometric hardware sync timeouts, attendance
                  regularization cycles, and employee password resets.
                </p>
                <div className="quick-card-divider" />
                <div className="quick-card-action-row">
                  <span className="quick-card-action-text">Read More</span>
                  <span className="quick-card-circle-arrow">
                    <span className="arrow-diag">↗</span>
                  </span>
                </div>
              </Link>

              {/* Quick Card 2 */}
              <Link to="/guides" className="support-quick-card-v2">
                <div className="quick-card-top-icon">
                  <Icon name="book-open" size={26} />
                </div>
                <h3 className="quick-card-title">
                  HRMS Setup &amp; Compliance Playbooks
                </h3>
                <p className="quick-card-desc">
                  Follow step-by-step walkthroughs for configuring organization hierarchies,
                  multi-branch state PT rules, and sandwich leave rosters.
                </p>
                <div className="quick-card-divider" />
                <div className="quick-card-action-row">
                  <span className="quick-card-action-text">Read More</span>
                  <span className="quick-card-circle-arrow">
                    <span className="arrow-diag">↗</span>
                  </span>
                </div>
              </Link>

              {/* Quick Card 3 */}
              <Link to="/faq" className="support-quick-card-v2">
                <div className="quick-card-top-icon">
                  <Icon name="help-circle" size={26} />
                </div>
                <h3 className="quick-card-title">
                  Licensing, Ownership &amp; Billing FAQs
                </h3>
                <p className="quick-card-desc">
                  Get quick answers regarding employee license upgrades, changing workspace
                  ownership, role permissions, and GST invoices.
                </p>
                <div className="quick-card-divider" />
                <div className="quick-card-action-row">
                  <span className="quick-card-action-text">Read More</span>
                  <span className="quick-card-circle-arrow">
                    <span className="arrow-diag">↗</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Central CTA Button */}
            <div className="support-quick-footer-action">
              <Button to="/help" className="support-hero-btn-primary">
                Explore Help Center <Icon name="arrow" size={16} />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
