import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import { JobOpening } from "../../data/careersData";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobOpening | null; // null represents general application
}

export default function ApplyModal({ isOpen, onClose, job }: ApplyModalProps) {
  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [consent, setConsent] = useState(false);

  // States
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRefId, setApplicationRefId] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  // Reset form when reopened or job changes
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setFormErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, job]);

  if (!isOpen) return null;

  // File Upload Handling
  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setFormErrors((prev) => ({
        ...prev,
        resume: "Please upload a valid PDF, DOC, or DOCX document.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        resume: "File size exceeds the 5 MB limit.",
      }));
      return;
    }

    setResumeFile(file);
    setFormErrors((prev) => {
      const copy = { ...prev };
      delete copy.resume;
      return copy;
    });
  };

  const removeResumeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^[0-9+\s\-()]{8,18}$/;
    if (!phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone.trim())) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (!resumeFile) {
      errors.resume = "Please upload your resume (PDF, DOC, DOCX up to 5 MB).";
    }

    if (!totalExperience) {
      errors.totalExperience = "Please select your total work experience.";
    }

    if (!noticePeriod) {
      errors.noticePeriod = "Please specify your notice period.";
    }

    if (!consent) {
      errors.consent = "Please consent to the processing of your data.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate network request latency (700ms)
      await new Promise((resolve) => setTimeout(resolve, 700));

      // ======================================================================
      // TODO: Replace with live recruitment API
      // e.g.:
      // const formData = new FormData();
      // formData.append('jobId', job?.id || 'general');
      // formData.append('fullName', fullName);
      // formData.append('email', email);
      // formData.append('phone', phone);
      // formData.append('resume', resumeFile);
      // formData.append('experience', totalExperience);
      // formData.append('noticePeriod', noticePeriod);
      // const res = await fetch('/api/careers/apply', { method: 'POST', body: formData });
      // ======================================================================

      const generatedId = `APP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setApplicationRefId(generatedId);
      setIsSubmitted(true);
    } catch {
      alert("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleTitle = job ? job.title : "General Application (Open Role)";

  return (
    <div
      className="careers-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="careers-modal-card" ref={modalRef}>
        {/* Header */}
        <div className="careers-modal-header">
          <div>
            <span className="careers-modal-eyebrow">
              {job ? `APPLY FOR ${job.department.toUpperCase()}` : "GENERAL APPLICATION"}
            </span>
            <h2 id="apply-modal-title" className="careers-modal-title">
              {roleTitle}
            </h2>
            {job && (
              <div className="careers-modal-meta">
                <span>
                  <Icon name="map-pin" size={13} /> {job.location}
                </span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="careers-modal-close-btn"
            onClick={onClose}
            aria-label="Close application dialog"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        {/* Content Body: Form OR Thank You State */}
        <div className="careers-modal-body">
          {isSubmitted ? (
            /* 4. THANK YOU STATE */
            <div className="careers-thank-you-view" aria-live="polite">
              <div className="careers-thank-you-icon-box">
                <Icon name="check" size={34} />
              </div>

              <h3 className="careers-thank-you-title">Application Received!</h3>
              <p className="careers-thank-you-text">
                Thank you for applying for <strong>{roleTitle}</strong> at LattiumHR.
                Our talent team will review your background and contact you within{" "}
                <strong>5 working days</strong>.
              </p>

              {/* Reference ID Badge */}
              <div className="careers-thank-you-ref-box">
                <span className="careers-ref-label">Application Reference ID</span>
                <span className="careers-ref-code">{applicationRefId}</span>
                <small className="careers-ref-hint">
                  A confirmation receipt has been noted for <strong>{email}</strong>
                </small>
              </div>

              {/* Action Buttons */}
              <div className="careers-thank-you-actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="careers-btn-modal-primary"
                >
                  Back to Careers
                </button>
                <Link to="/" className="careers-btn-modal-secondary">
                  Go to Home
                </Link>
              </div>
            </div>
          ) : (
            /* 3. APPLICATION FORM */
            <form onSubmit={handleSubmit} noValidate className="careers-apply-form">
              <div className="careers-form-grid">
                {/* Full Name */}
                <div className="careers-form-group">
                  <label htmlFor="app-fullname" className="careers-form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    id="app-fullname"
                    ref={fullNameRef}
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Anandita Sen"
                    className={`careers-form-input ${formErrors.fullName ? "error" : ""}`}
                    required
                  />
                  {formErrors.fullName && (
                    <span className="careers-form-error">{formErrors.fullName}</span>
                  )}
                </div>

                {/* Email */}
                <div className="careers-form-group">
                  <label htmlFor="app-email" className="careers-form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    id="app-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anandita@example.com"
                    className={`careers-form-input ${formErrors.email ? "error" : ""}`}
                    required
                  />
                  {formErrors.email && (
                    <span className="careers-form-error">{formErrors.email}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="careers-form-group">
                  <label htmlFor="app-phone" className="careers-form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    id="app-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`careers-form-input ${formErrors.phone ? "error" : ""}`}
                    required
                  />
                  {formErrors.phone && (
                    <span className="careers-form-error">{formErrors.phone}</span>
                  )}
                </div>

                {/* LinkedIn or Portfolio */}
                <div className="careers-form-group">
                  <label htmlFor="app-linkedin" className="careers-form-label">
                    LinkedIn / Portfolio URL <span className="optional">(Optional)</span>
                  </label>
                  <input
                    id="app-linkedin"
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="careers-form-input"
                  />
                </div>

                {/* Total Experience */}
                <div className="careers-form-group">
                  <label htmlFor="app-experience" className="careers-form-label">
                    Total Experience <span className="required">*</span>
                  </label>
                  <select
                    id="app-experience"
                    value={totalExperience}
                    onChange={(e) => setTotalExperience(e.target.value)}
                    className={`careers-form-select ${formErrors.totalExperience ? "error" : ""}`}
                    required
                  >
                    <option value="">Select experience level</option>
                    <option value="0–1 years (Entry / Fresher)">0–1 years (Entry / Fresher)</option>
                    <option value="1–3 years">1–3 years</option>
                    <option value="3–5 years">3–5 years</option>
                    <option value="5–8 years">5–8 years</option>
                    <option value="8+ years (Senior / Lead)">8+ years (Senior / Lead)</option>
                  </select>
                  {formErrors.totalExperience && (
                    <span className="careers-form-error">{formErrors.totalExperience}</span>
                  )}
                </div>

                {/* Notice Period */}
                <div className="careers-form-group">
                  <label htmlFor="app-notice" className="careers-form-label">
                    Notice Period <span className="required">*</span>
                  </label>
                  <select
                    id="app-notice"
                    value={noticePeriod}
                    onChange={(e) => setNoticePeriod(e.target.value)}
                    className={`careers-form-select ${formErrors.noticePeriod ? "error" : ""}`}
                    required
                  >
                    <option value="">Select notice period</option>
                    <option value="Immediate Joiner (0 days)">Immediate Joiner (0 days)</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="90 Days">90 Days</option>
                  </select>
                  {formErrors.noticePeriod && (
                    <span className="careers-form-error">{formErrors.noticePeriod}</span>
                  )}
                </div>

                {/* Current Company */}
                <div className="careers-form-group">
                  <label htmlFor="app-company" className="careers-form-label">
                    Current Company <span className="optional">(Optional)</span>
                  </label>
                  <input
                    id="app-company"
                    type="text"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                    placeholder="e.g. Current Employer or Self-Employed"
                    className="careers-form-input"
                  />
                </div>

                {/* Expected CTC */}
                <div className="careers-form-group">
                  <label htmlFor="app-ctc" className="careers-form-label">
                    Expected CTC <span className="optional">(Optional)</span>
                  </label>
                  <input
                    id="app-ctc"
                    type="text"
                    value={expectedCtc}
                    onChange={(e) => setExpectedCtc(e.target.value)}
                    placeholder="e.g. ₹20,00,000 / year"
                    className="careers-form-input"
                  />
                </div>
              </div>

              {/* Resume Upload Dropzone */}
              <div className="careers-form-group full-width">
                <label className="careers-form-label">
                  Resume / CV <span className="required">*</span>
                </label>
                <div
                  className={`careers-dropzone ${isDragOver ? "dragover" : ""} ${
                    formErrors.resume ? "error" : ""
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    handleFileChange(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                  }}
                  aria-label="Upload resume file dropzone"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e.target.files)}
                  />
                  <div className="careers-dropzone-icon">📄</div>
                  <div className="careers-dropzone-text">
                    Drag and drop your resume here, or{" "}
                    <span className="browse-link">browse files</span>
                  </div>
                  <div className="careers-dropzone-hint">
                    Accepts PDF, DOC, DOCX up to 5 MB
                  </div>
                </div>

                {/* File Preview */}
                {resumeFile && (
                  <div className="careers-file-preview">
                    <span className="file-info">
                      📎 <strong>{resumeFile.name}</strong> (
                      {(resumeFile.size / 1024).toFixed(0)} KB)
                    </span>
                    <button
                      type="button"
                      onClick={removeResumeFile}
                      className="file-remove-btn"
                      aria-label="Remove uploaded resume"
                    >
                      × Remove
                    </button>
                  </div>
                )}
                {formErrors.resume && (
                  <span className="careers-form-error">{formErrors.resume}</span>
                )}
              </div>

              {/* Cover Note */}
              <div className="careers-form-group full-width">
                <label htmlFor="app-covernote" className="careers-form-label">
                  Cover Note / Why LattiumHR? <span className="optional">(Optional)</span>
                </label>
                <textarea
                  id="app-covernote"
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Tell us briefly about why you're interested in this role or notable projects you've shipped..."
                  className="careers-form-textarea"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="careers-form-group full-width">
                <label className="careers-checkbox-label">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="careers-checkbox"
                    required
                  />
                  <span>
                    I consent to LattiumHR collecting and processing my application data for
                    recruitment purposes in accordance with the{" "}
                    <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </Link>
                    . <span className="required">*</span>
                  </span>
                </label>
                {formErrors.consent && (
                  <span className="careers-form-error">{formErrors.consent}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="careers-form-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="careers-btn-submit-app"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner">⏳</span> Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application <Icon name="arrow" size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

