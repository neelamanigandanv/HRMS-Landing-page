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
import CustomSelect, { CustomSelectOption } from "../components/ui/CustomSelect";
import PhoneInput from "../components/common/PhoneInput";
import { validatePhoneNumber } from "../utils/phoneUtils";
import { submitCrmEnquiry } from "../services/enquiryService";
import "./CareersPage.css";

const GENERAL_ROLE_OPTION: CustomSelectOption = {
  value: "general",
  label: "General Application (Open Consideration across teams)",
};

const ROLE_OPTIONS: CustomSelectOption[] = [
  GENERAL_ROLE_OPTION,
  ...JOB_OPENINGS.map((j) => ({
    value: j.id,
    label: `${j.title} (${j.department})`,
  })),
];

const EXPERIENCE_OPTIONS: CustomSelectOption[] = [
  { value: "0–1 years (Entry / Fresher)", label: "0–1 years (Entry / Fresher)" },
  { value: "1–3 years", label: "1–3 years" },
  { value: "3–5 years", label: "3–5 years" },
  { value: "5–8 years", label: "5–8 years" },
  { value: "8+ years (Senior / Lead)", label: "8+ years (Senior / Lead)" },
];

const NOTICE_PERIOD_OPTIONS: CustomSelectOption[] = [
  { value: "Immediate Joiner (0–15 days)", label: "Immediate Joiner (0–15 days)" },
  { value: "30 Days", label: "30 Days" },
  { value: "60 Days", label: "60 Days" },
  { value: "90 Days", label: "90 Days" },
];

export function CareersPage() {
  // Active selected job for on-page form (null = General Application)
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  // Application Modal state (fallback)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  // On-page application form state (matching ApplyModal exactly)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [consent, setConsent] = useState(false);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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

  // Validation for Direct Application
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    const phoneErr = validatePhoneNumber(phone);
    if (phoneErr) {
      errors.phone = phoneErr;
    }

    if (!currentLocation.trim()) {
      errors.currentLocation = "Current location is required.";
    }

    if (!totalExperience) {
      errors.totalExperience = "Please select your relevant work experience.";
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const targetRoleName = selectedJob
      ? `${selectedJob.title} (${selectedJob.department})`
      : selectedRoleId === "general"
      ? "General Application"
      : ROLE_OPTIONS.find((r) => r.value === selectedRoleId)?.label || "General Application";

    const payload = {
      full_name: fullName.trim(),
      name: fullName.trim(),
      work_email: email.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: currentLocation.trim(),
      company_name: currentCompany.trim() ? `Current: ${currentCompany.trim()}` : "Direct Candidate",
      source_page: "/careers/direct",
      nature_of_enquiry: "JOB_APPLICATION",
      notes: `Location: ${currentLocation.trim()} | Exp: ${totalExperience} | Notice: ${noticePeriod} | Why: ${coverNote.trim()}`,
      extra_data: {
        target_role: targetRoleName,
        current_location: currentLocation.trim(),
        relevant_experience: totalExperience,
        total_experience: totalExperience,
        notice_period: noticePeriod,
        current_company: currentCompany.trim() || "Not Specified",
        expected_ctc: expectedCtc.trim() || "Not Specified",
        linkedin_portfolio_url: [linkedinUrl.trim(), portfolioUrl.trim()].filter(Boolean).join(" | "),
        resume_link: resumeLink.trim(),
        resume_url: resumeFile ? resumeFile.name : (resumeLink.trim() || ""),
        why_are_you_interested_in_zentilos: coverNote.trim(),
        why_zentilos: coverNote.trim(),
        why_lattium_hr: coverNote.trim(),
      },
    };

    try {
      const res = await submitCrmEnquiry(payload);
      const genId = res.data?.id
        ? String(res.data.id)
        : `APP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setApplicationRefId(genId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err?.message || "Failed to submit application. Please check your connection and try again."
      );
    }
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
        title="Careers at Zentilos | Build the Future of Workforce Software"
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
                <span>CAREERS AT ZENTILOS</span>
                <span className="careers-sparkle">✦</span>
              </div>

              {/* Two-Line Properly Balanced Heading */}
              <h1 id="careers-hero-heading" className="careers-hero-title">
                Build Software That Makes Work Better
                <br className="careers-hero-br" />
                <span className="careers-hero-glow">for Modern Growing Teams</span>
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
              eyebrow="✦ LIFE AT ZENTILOS ✦"
              title="Where Craft, Empathy, and Ownership Meet"
              body="A glimpse into how we collaborate, celebrate milestones, and build meaningful software every single day."
              center
            />

            <div className="careers-gallery-grid">
              <div className="careers-gallery-item large">
                <img
                  src="/images/hero-hr-working-pro.jpg"
                  alt="Zentilos cross-functional product design sprint in conference room"
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

              {/* Rich Culture & Operating Ethic Content Box with Image & Glassmorphic Overlay */}
              <div className="careers-gallery-item careers-culture-callout-card">
                <img
                  src="/images/work-process-team.jpg"
                  alt="Zentilos high trust collaborative culture"
                  className="careers-gallery-img"
                  loading="lazy"
                />
                <div className="careers-culture-callout-overlay">
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
                  alt="Zentilos team celebration after shipping a major product release"
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
              title="Apply to Join Zentilos"
              body="Submit your details below. We review every profile carefully and respond within 48 business hours."
              center
            />

            <div className="careers-modal-card onpage-apply-card">
              {/* Application Form Card Header */}
              <div className="careers-modal-header">
                <div className="job-form-header-area" style={{ margin: 0, padding: 0, border: "none" }}>
                  <div className="job-form-header-icon-box">
                    <Icon name="sparkle" size={22} />
                  </div>
                  <div className="job-form-header-text">
                    <h3 id="application-heading" className="job-form-heading">
                      {selectedJob ? `Apply for ${selectedJob.title}` : "Submit Your Application"}
                    </h3>
                    <p className="job-form-subheading">
                      {selectedJob ? (
                        <span>
                          <strong>{selectedJob.department}</strong> • {selectedJob.location} • 48h response SLA
                        </span>
                      ) : (
                        "Direct application to our talent acquisition team • 48h response SLA"
                      )}
                    </p>
                  </div>
                </div>
                {selectedJob && (
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="careers-modal-clear-role-btn"
                    title="Switch to General Application"
                  >
                    <Icon name="x" size={12} /> Switch to General Application
                  </button>
                )}
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
                      <strong>{selectedJob ? selectedJob.title : "a position at Zentilos"}</strong>.
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
                          setPortfolioUrl("");
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
                  <form onSubmit={handleFormSubmit} noValidate className="careers-apply-form">
                    <div className="careers-form-grid">
                      {/* 1. Name */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-fullname" className="careers-form-label">
                          Name <span className="required">*</span>
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

                      {/* 2. Email Address */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-email" className="careers-form-label">
                          Email Address <span className="required">*</span>
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

                      {/* 3. Phone Number */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-phone" className="careers-form-label">
                          Phone Number <span className="required">*</span>
                        </label>
                        <PhoneInput
                          id="onpage-app-phone"
                          name="phone"
                          value={phone}
                          onChange={(fullNumber) => {
                            setPhone(fullNumber);
                            if (formErrors.phone) {
                              setFormErrors((prev) => {
                                const copy = { ...prev };
                                delete copy.phone;
                                return copy;
                              });
                            }
                          }}
                          hasError={Boolean(formErrors.phone)}
                          required
                        />
                        {formErrors.phone && (
                          <span className="careers-form-error">{formErrors.phone}</span>
                        )}
                      </div>

                      {/* 4. Current Location */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-location" className="careers-form-label">
                          Current Location <span className="required">*</span>
                        </label>
                        <input
                          id="onpage-app-location"
                          type="text"
                          value={currentLocation}
                          onChange={(e) => {
                            setCurrentLocation(e.target.value);
                            if (formErrors.currentLocation) {
                              setFormErrors((prev) => {
                                const copy = { ...prev };
                                delete copy.currentLocation;
                                return copy;
                              });
                            }
                          }}
                          placeholder="e.g. Bengaluru, India"
                          className={`careers-form-input ${formErrors.currentLocation ? "error" : ""}`}
                          required
                        />
                        {formErrors.currentLocation && (
                          <span className="careers-form-error">{formErrors.currentLocation}</span>
                        )}
                      </div>

                      {/* 5. Relevant Experience */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-experience" className="careers-form-label">
                          Relevant Experience <span className="required">*</span>
                        </label>
                        <CustomSelect
                          id="onpage-app-experience"
                          options={EXPERIENCE_OPTIONS}
                          value={totalExperience}
                          onChange={(val) => {
                            setTotalExperience(val);
                            if (formErrors.totalExperience) {
                              setFormErrors({ ...formErrors, totalExperience: "" });
                            }
                          }}
                          placeholder="Select experience level"
                          hasError={!!formErrors.totalExperience}
                        />
                        {formErrors.totalExperience && (
                          <span className="careers-form-error">{formErrors.totalExperience}</span>
                        )}
                      </div>

                      {/* 6. Notice Period */}
                      <div className="careers-form-group">
                        <label htmlFor="onpage-app-notice" className="careers-form-label">
                          Notice Period <span className="required">*</span>
                        </label>
                        <CustomSelect
                          id="onpage-app-notice"
                          options={NOTICE_PERIOD_OPTIONS}
                          value={noticePeriod}
                          onChange={(val) => {
                            setNoticePeriod(val);
                            if (formErrors.noticePeriod) {
                              setFormErrors({ ...formErrors, noticePeriod: "" });
                            }
                          }}
                          placeholder="Select notice period"
                          hasError={!!formErrors.noticePeriod}
                        />
                        {formErrors.noticePeriod && (
                          <span className="careers-form-error">{formErrors.noticePeriod}</span>
                        )}
                      </div>
                    </div>

                    {/* 7. Resume / CV Link */}
                    <div className="careers-form-group full-width" style={{ marginTop: "1rem" }}>
                      <label htmlFor="onpage-app-resume-link" className="careers-form-label">
                        Resume / CV Link <span className="optional" style={{ color: "#8a8698", fontWeight: 400 }}>(Google Drive, Dropbox, or LinkedIn URL)</span>
                      </label>
                      <input
                        id="onpage-app-resume-link"
                        type="url"
                        value={resumeLink}
                        onChange={(e) => setResumeLink(e.target.value)}
                        placeholder="https://drive.google.com/file/d/..."
                        className="careers-form-input"
                      />
                    </div>

                    {/* 8. Why are you interested in Zentilos? */}
                    <div className="careers-form-group full-width" style={{ marginTop: "1rem" }}>
                      <label htmlFor="onpage-app-covernote" className="careers-form-label">
                        Why are you interested in Zentilos? <span className="optional" style={{ color: "#8a8698", fontWeight: 400 }}>(Optional)</span>
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
                    <div className="careers-form-group full-width" style={{ marginTop: "1rem" }}>
                      <label className="careers-checkbox-label">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="careers-checkbox"
                          required
                        />
                        <span>
                          I consent to Zentilos collecting and processing my application data for recruitment
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

                    {submitError && (
                      <div className="careers-form-error-banner" style={{ color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
                        <span>{submitError}</span>
                      </div>
                    )}

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
