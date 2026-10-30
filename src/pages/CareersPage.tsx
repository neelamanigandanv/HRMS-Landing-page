import React, { useState, useRef } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import {
  JOB_OPENINGS,
  CULTURE_PERKS,
  JobOpening,
} from "../data/careersData";
import JobCard from "../components/careers/JobCard";
import HiringStepper from "../components/careers/HiringStepper";
import ApplyModal from "../components/careers/ApplyModal";
import "./CareersPage.css";

export function CareersPage() {
  // Active selected job for on-page form (defaults to People & Talent Acquisition Specialist)
  const defaultJob =
    JOB_OPENINGS.find((j) => j.id === "people-culture-lead") || JOB_OPENINGS[0];
  const [selectedJob, setSelectedJob] = useState<JobOpening>(defaultJob);

  // Application Modal state (fallback)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  // On-page application form state (matching ApplyModal exactly)
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

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRefId, setApplicationRefId] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const genId = `APP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setApplicationRefId(genId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  // When clicking "Apply Now" on any job card in Open Positions section, scroll down to the on-page form
  const handleApplyToJob = (job: JobOpening) => {
    setSelectedJob(job);
    const el = document.getElementById("application-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const input = document.getElementById("onpage-app-fullname");
        input?.focus();
      }, 450);
    }
  };

  const handleOpenApplyModal = (job: JobOpening | null) => {
    setSelectedJobForModal(job);
    setIsApplyModalOpen(true);
  };

  const scrollToPositions = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const breadcrumbs = [
    { label: "Company", to: "/about" },
    { label: "Careers" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA>
      <SEO
        title="Careers at LattiumHR | Build the Future of Workforce Software"
        description="Join an ambitious, high-trust team building modern workforce and payroll software for thousands of growing businesses."
        canonicalPath="/careers"
      />

      <div className="careers-page-container">
        {/* ==================================================================
            1. HERO SECTION (Properly Balanced Heading)
            ================================================================== */}
        <section className="careers-hero-section" aria-labelledby="careers-hero-heading">
          <div className="container">
            <div className="careers-hero-content">
              {/* Eyebrow */}
              <div className="careers-hero-eyebrow">
                <span className="careers-sparkle">✦</span>
                <span>CAREERS AT LATTIUMHR</span>
                <span className="careers-sparkle">✦</span>
              </div>

              {/* Properly Balanced Heading with Responsive Break */}
              <h1 id="careers-hero-heading" className="careers-hero-title">
                Build Software That Makes Work Better
                <br className="careers-hero-br" />
                for <span className="careers-hero-glow">Thousands of People</span>
              </h1>

              {/* One-line description */}
              <p className="careers-hero-subtext">
                We're a high-velocity team of product creators, engineers, and customer advocates
                solving the mission-critical challenges of growing businesses.
              </p>

              {/* View Open Positions CTA */}
              <div className="careers-hero-actions">
                <Button onClick={scrollToPositions} className="careers-hero-btn-primary">
                  View Open Positions <Icon name="arrow" size={16} />
                </Button>
              </div>

              {/* Quick Culture Signals */}
              <div className="careers-hero-highlights">
                <span className="careers-highlight-pill">
                  <Icon name="check" size={14} /> High-Ownership Culture
                </span>
                <span className="careers-highlight-pill">
                  <Icon name="check" size={14} /> Competitive Fixed CTC + Equity
                </span>
                <span className="careers-highlight-pill">
                  <Icon name="check" size={14} /> Transparent 5-Step Hiring
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. WHY WORK WITH US (Cards Matching Image 2 Style)
            ================================================================== */}
        <section className="careers-why-section" id="why-work-with-us" aria-labelledby="why-heading">
          <div className="container">
            <SectionHeading
              eyebrow="✦ WHY WORK WITH US ✦"
              title="Perks Designed for Sustainable High Performance"
              body="We believe in treating talented professionals like responsible adults. Here is what you can count on as part of our team."
              center
            />

            {/* 6 Perk Cards with interactive hover icon */}
            <div className="careers-perks-grid">
              {CULTURE_PERKS.map((perk) => (
                <div key={perk.id} className="careers-perk-card">
                  {/* Circular Icon Badge: Normal Soft Tint, Dark Plum on Hover */}
                  <div className="careers-perk-solid-circle">
                    <Icon name={(perk.icon as IconName) || "sparkle"} size={28} />
                  </div>

                  {/* Centered Title */}
                  <h3 className="careers-perk-title">{perk.title}</h3>

                  {/* Centered Description */}
                  <p className="careers-perk-desc">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. HIRING PROCESS (Step-by-Step Orbital Stepper matching Image 1)
            ================================================================== */}
        <section className="careers-process-section" id="hiring-process" aria-labelledby="process-heading">
          <div className="container">
            <SectionHeading
              eyebrow="✦ TRANSPARENT EVALUATION ✦"
              title="Our Step-by-Step Hiring Process"
              body="No ghosting, no trick questions. A structured and respectful interview journey designed to help us both determine if we're a great fit."
              center
            />

            <HiringStepper />
          </div>
        </section>

        {/* ==================================================================
            4. OPEN POSITIONS (Direct Job Cards - No Filter Bar)
            ================================================================== */}
        <section className="careers-positions-section" id="open-positions" aria-labelledby="roles-heading">
          <div className="container">
            <SectionHeading
              eyebrow="✦ OPEN POSITIONS ✦"
              title="Find Your Next Career Milestone"
              body="Explore our open positions across engineering, product design, sales, support, and marketing."
              center
            />

            {/* Direct Job Opening Cards */}
            <div className="careers-jobs-list-wrapper">
              <div className="careers-jobs-grid">
                {JOB_OPENINGS.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApplyToJob}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. LIFE AT COMPANY (Culture Gallery + Filled Content Box)
            ================================================================== */}
        <section className="careers-life-section" id="life-at-company" aria-labelledby="life-heading">
          <div className="container">
            <SectionHeading
              eyebrow="✦ LIFE AT LATTIUMHR ✦"
              title="Where Craft, Empathy, and Ownership Meet"
              body="A glimpse into how we collaborate, celebrate milestones, and build meaningful software every single day."
              center
            />

            <div className="careers-gallery-grid">
              <div className="careers-gallery-item large">
                <img
                  src="/images/hero-hr-working-pro.jpg"
                  alt="LattiumHR cross-functional product design sprint in conference room"
                  className="careers-gallery-img"
                  loading="lazy"
                />
                <div className="careers-gallery-overlay">
                  <strong>Cross-Functional Collaboration</strong>
                  <span>Engineers, designers, and domain specialists solving problems side by side</span>
                </div>
              </div>

              <div className="careers-gallery-item">
                <img
                  src="/images/sb-manager-workspace.jpg"
                  alt="HR operations team reviewing system architecture"
                  className="careers-gallery-img"
                  loading="lazy"
                />
                <div className="careers-gallery-overlay">
                  <strong>Deep Technical Craft</strong>
                  <span>Focusing on algorithmic precision and zero-defect payroll</span>
                </div>
              </div>

              <div className="careers-gallery-item">
                <img
                  src="/images/sb-employee-workspace.jpg"
                  alt="Team member comfortably working on product interface"
                  className="careers-gallery-img"
                  loading="lazy"
                />
                <div className="careers-gallery-overlay">
                  <strong>Focus Time & Flow</strong>
                  <span>Distraction-free environments designed for deep work</span>
                </div>
              </div>

              {/* Rich Culture & Operating Ethic Content Box (Fills 2-Column Space in Row 2 Right Side) */}
              <div className="careers-gallery-item careers-culture-callout-card">
                <div className="careers-culture-callout-inner">
                  <div className="careers-culture-callout-header">
                    <span className="careers-culture-tag">
                      <Icon name="sparkle" size={13} /> HIGH TRUST &amp; FREEDOM
                    </span>
                    <span className="careers-culture-motto">Our Ways of Working</span>
                  </div>

                  <blockquote className="careers-culture-quote">
                    &ldquo;We hire responsible adults and trust them with full ownership. You own the problem, determine the solution, and ship software with pride.&rdquo;
                  </blockquote>

                  <div className="careers-culture-pillars-row">
                    <div className="careers-pillar-pill">
                      <strong>01. Outcomes Over Hours</strong>
                      <p>We evaluate shipped product impact, never artificial seat-time.</p>
                    </div>

                    <div className="careers-pillar-pill">
                      <strong>02. Radical Candor</strong>
                      <p>Transparent, ego-free feedback where the best idea always wins.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="careers-gallery-item wide">
                <img
                  src="/images/hero-employee-directory-team.jpg"
                  alt="LattiumHR team celebration after shipping a major product release"
                  className="careers-gallery-img"
                  loading="lazy"
                />
                <div className="careers-gallery-overlay">
                  <strong>Celebrating Collective Milestones</strong>
                  <span>Recognizing impact and having fun as an ambitious team</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. APPLICATION FORM (Above Footer - Exact Style of ApplyModal Card)
            ================================================================== */}
        <section className="careers-open-app-section" id="application-form" aria-labelledby="application-heading">
          <div className="container">
            <SectionHeading
              eyebrow="✦ APPLICATION FORM ✦"
              title="Apply to Join LattiumHR"
              body="Submit your details below. We review every profile carefully and respond within 48 business hours."
              center
            />

            <div className="careers-modal-card onpage-apply-card">
              {/* Header Exactly Like Popup Card */}
              <div className="careers-modal-header">
                <div>
                  <span className="careers-modal-eyebrow">
                    APPLY FOR {selectedJob ? selectedJob.department.toUpperCase() : "PEOPLE & HR"}
                  </span>
                  <h2 id="application-heading" className="careers-modal-title">
                    {selectedJob ? selectedJob.title : "People & Talent Acquisition Specialist"}
                  </h2>
                  <div className="careers-modal-meta">
                    <span>
                      <Icon name="map-pin" size={13} /> {selectedJob ? selectedJob.location : "Mumbai HQ, India (Hybrid)"}
                    </span>
                    <span>•</span>
                    <span>{selectedJob ? selectedJob.type : "Full-Time"}</span>
                  </div>
                </div>

                {/* Role Switcher Pill Dropdown */}
                <div className="careers-modal-header-action">
                  <select
                    id="onpage-role-select"
                    value={selectedJob ? selectedJob.id : "people-culture-lead"}
                    onChange={(e) => {
                      const found = JOB_OPENINGS.find((j) => j.id === e.target.value);
                      if (found) setSelectedJob(found);
                    }}
                    className="careers-role-switch-select"
                    aria-label="Select target position"
                  >
                    {JOB_OPENINGS.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} ({j.department})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form Body OR Thank You View */}
              <div className="careers-modal-body">
                {isSubmitted ? (
                  /* Thank You View */
                  <div className="careers-thank-you-view" aria-live="polite">
                    <div className="careers-thank-you-icon-box">
                      <Icon name="check" size={34} />
                    </div>

                    <h3 className="careers-thank-you-title">Application Received!</h3>
                    <p className="careers-thank-you-text">
                      Thank you for applying for{" "}
                      <strong>{selectedJob ? selectedJob.title : "People & Talent Acquisition Specialist"}</strong> at LattiumHR.
                      Our talent team will review your background and reach out at <strong>{email}</strong> within{" "}
                      <strong>48 business hours</strong>.
                    </p>

                    <div className="careers-thank-you-ref-box">
                      <span className="careers-ref-label">Application Reference ID</span>
                      <span className="careers-ref-code">{applicationRefId}</span>
                      <small className="careers-ref-hint">
                        A confirmation receipt has been recorded for <strong>{email}</strong>
                      </small>
                    </div>

                    <div className="careers-thank-you-actions" style={{ marginTop: "24px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFullName("");
                          setEmail("");
                          setPhone("");
                          setResumeFile(null);
                          setLinkedinUrl("");
                          setTotalExperience("");
                          setNoticePeriod("");
                          setCurrentCompany("");
                          setExpectedCtc("");
                          setCoverNote("");
                          setConsent(false);
                          setFormErrors({});
                        }}
                        className="careers-btn-submit-app"
                        style={{ maxWidth: "320px", margin: "0 auto" }}
                      >
                        Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Application Form matching Popup Card */
                  <form onSubmit={handleFormSubmit} noValidate className="careers-apply-form">
                    <div className="careers-form-grid">
                      {/* Full Name */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-fullname" className="careers-form-label">
                          Full Name <span className="required">*</span>
                        </label>
                        <input
                          id="onpage-app-fullname"
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

                      {/* Work Email */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-email" className="careers-form-label">
                          Work Email <span className="required">*</span>
                        </label>
                        <input
                          id="onpage-app-email"
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

                      {/* Phone Number */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-phone" className="careers-form-label">
                          Phone Number <span className="required">*</span>
                        </label>
                        <input
                          id="onpage-app-phone"
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

                      {/* Applying For Role / Department */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-role" className="careers-form-label">
                          Target Role / Position <span className="required">*</span>
                        </label>
                        <select
                          id="onpage-app-role"
                          value={selectedJob ? selectedJob.id : "people-culture-lead"}
                          onChange={(e) => {
                            const found = JOB_OPENINGS.find((j) => j.id === e.target.value);
                            if (found) setSelectedJob(found);
                          }}
                          className="careers-form-select"
                          required
                        >
                          {JOB_OPENINGS.map((j) => (
                            <option key={j.id} value={j.id}>
                              {j.title} ({j.department})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Total Experience */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-experience" className="careers-form-label">
                          Total Experience <span className="required">*</span>
                        </label>
                        <select
                          id="onpage-app-experience"
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
                        <label htmlFor="onpage-app-notice" className="careers-form-label">
                          Notice Period <span className="required">*</span>
                        </label>
                        <select
                          id="onpage-app-notice"
                          value={noticePeriod}
                          onChange={(e) => setNoticePeriod(e.target.value)}
                          className={`careers-form-select ${formErrors.noticePeriod ? "error" : ""}`}
                          required
                        >
                          <option value="">Select notice period</option>
                          <option value="Immediate Joiner (0–15 days)">Immediate Joiner (0–15 days)</option>
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
                        <label htmlFor="onpage-app-company" className="careers-form-label">
                          Current Company <span className="optional">(Optional)</span>
                        </label>
                        <input
                          id="onpage-app-company"
                          type="text"
                          value={currentCompany}
                          onChange={(e) => setCurrentCompany(e.target.value)}
                          placeholder="e.g. Current Employer or Self-Employed"
                          className="careers-form-input"
                        />
                      </div>

                      {/* Expected CTC */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-ctc" className="careers-form-label">
                          Expected CTC <span className="optional">(Optional)</span>
                        </label>
                        <input
                          id="onpage-app-ctc"
                          type="text"
                          value={expectedCtc}
                          onChange={(e) => setExpectedCtc(e.target.value)}
                          placeholder="e.g. ₹16,00,000 / year"
                          className="careers-form-input"
                        />
                      </div>

                      {/* LinkedIn or Portfolio URL */}
                      <div className="careers-form-group full-width">
                        <label htmlFor="onpage-app-linkedin" className="careers-form-label">
                          LinkedIn / Portfolio URL <span className="optional">(Optional)</span>
                        </label>
                        <input
                          id="onpage-app-linkedin"
                          type="url"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/yourprofile or portfolio"
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
                      <label htmlFor="onpage-app-covernote" className="careers-form-label">
                        Why LattiumHR? / What do you want to build? <span className="optional">(Optional)</span>
                      </label>
                      <textarea
                        id="onpage-app-covernote"
                        rows={3}
                        value={coverNote}
                        onChange={(e) => setCoverNote(e.target.value)}
                        placeholder="Tell us briefly about your craft, past impact, and why you want to join our journey..."
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
                          I consent to LattiumHR collecting and processing my application data for recruitment
                          purposes in accordance with the{" "}
                          <a href="/privacy" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                          </a>
                          . <span className="required">*</span>
                        </span>
                      </label>
                      {formErrors.consent && (
                        <span className="careers-form-error">{formErrors.consent}</span>
                      )}
                    </div>

                    {/* Submit Button Row */}
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
        </section>
      </div>

      {/* Reusable Application Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={selectedJobForModal}
      />
    </PageLayout>
  );
}

export default CareersPage;
