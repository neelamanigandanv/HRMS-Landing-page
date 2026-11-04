import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import CustomSelect, { CustomSelectOption } from "../components/ui/CustomSelect";
import PhoneInput from "../components/common/PhoneInput";
import { validatePhoneNumber } from "../utils/phoneUtils";
import { getJobById, JobOpening } from "../data/careersData";
import { submitCrmEnquiry } from "../services/enquiryService";
import "./CareersPage.css";

const NOTICE_PERIOD_OPTIONS: CustomSelectOption[] = [
  { value: "Immediate Joiner (0–15 days)", label: "Immediate Joiner (0–15 days)" },
  { value: "30 Days", label: "30 Days" },
  { value: "60 Days", label: "60 Days" },
  { value: "90 Days", label: "90 Days" },
];

const EXPERIENCE_OPTIONS: CustomSelectOption[] = [
  { value: "0–1 years (Entry / Fresher)", label: "0–1 years (Entry / Fresher)" },
  { value: "1–3 years", label: "1–3 years" },
  { value: "3–5 years", label: "3–5 years" },
  { value: "5–8 years", label: "5–8 years" },
  { value: "8+ years (Senior / Lead)", label: "8+ years (Senior / Lead)" },
];

export function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = jobId ? getJobById(jobId) : undefined;
  const [copied, setCopied] = useState(false);

  // Form state — strictly applies to the current job (no redundant role selection)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
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
      setFormErrors((prev) => ({ ...prev, resume: "Please upload a valid PDF, DOC, or DOCX document." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, resume: "File size exceeds the 5 MB limit." }));
      return;
    }
    setResumeFile(file);
    setFormErrors((prev) => { const copy = { ...prev }; delete copy.resume; return copy; });
  };

  const removeResumeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = "Full name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) errors.email = "Email address is required.";
    else if (!emailRegex.test(email.trim())) errors.email = "Please enter a valid email address.";
    const phoneErr = validatePhoneNumber(phone);
    if (phoneErr) errors.phone = phoneErr;
    if (!resumeFile) errors.resume = "Please upload your resume (PDF, DOC, DOCX up to 5 MB).";
    if (!totalExperience) errors.totalExperience = "Please select your total work experience.";
    if (!noticePeriod) errors.noticePeriod = "Please specify your notice period.";
    if (!consent) errors.consent = "Please consent to the processing of your data.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const scrollToForm = () => {
    const el = document.getElementById("apply-form") || document.getElementById("application-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const input = document.getElementById("app-fullname");
        input?.focus();
      }, 450);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const targetRoleName = job ? `${job.title} (${job.department})` : "Direct Job Application";

    const payload = {
      full_name: fullName.trim(),
      name: fullName.trim(),
      work_email: email.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company_name: currentCompany.trim() ? `Current: ${currentCompany.trim()}` : "Candidate Profile",
      source_page: `/careers/${job?.id || "direct"}`,
      nature_of_enquiry: "JOB_APPLICATION",
      extra_data: {
        target_role: targetRoleName,
        total_experience: totalExperience,
        notice_period: noticePeriod,
        current_company: currentCompany.trim() || "Not Specified",
        expected_ctc: expectedCtc.trim() || "Not Specified",
        linkedin_portfolio_url: linkedinUrl.trim(),
        resume_url: resumeFile ? resumeFile.name : "",
        why_zentilos: coverNote.trim(),
        why_lattium_hr: coverNote.trim(),
      },
    };

    try {
      const res = await submitCrmEnquiry(payload);
      const genId = res?.data?.id
        ? String(res.data.id)
        : `APP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setApplicationRefId(genId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(err?.message || "Failed to submit application. Please check your connection and try again.");
    }
  };

  if (!job) {
    return (
      <PageLayout hideCTA={true}>
        <SEO
          title="Position Not Found | Careers at Zentilos"
          description="The requested job position could not be found or has already been filled."
        />
        <div className="container not-found-wrapper" style={{ padding: "100px 20px", textAlign: "center" }}>
          <Icon name="search" size={48} className="not-found-icon" />
          <h1 style={{ fontSize: "2rem", margin: "20px 0 10px", color: "#191735" }}>
            Position Not Found
          </h1>
          <p style={{ color: "#64748b", marginBottom: "30px" }}>
            This role may have already been filled or moved. Explore our other open positions.
          </p>
          <Button to="/careers">
            View All Open Roles <Icon name="arrow" size={16} />
          </Button>
        </div>
      </PageLayout>
    );
  }

  const breadcrumbs = [
    { label: "Careers", to: "/careers" },
    { label: job.title },
  ];

  // JobPosting Schema (JSON-LD) for SEO
  const jobPostingSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.aboutRole,
    identifier: {
      "@type": "PropertyValue",
      name: "Zentilos",
      value: job.id,
    },
    datePosted: job.postedDate,
    validThrough: "2027-12-31",
    employmentType: job.type === "Full-Time" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "Zentilos",
      sameAs: "https://zentilos.com",
      logo: "https://zentilos.com/favicon.svg",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },
    baseSalary: job.salaryRange
      ? {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: {
            "@type": "QuantitativeValue",
            unitText: "YEAR",
          },
        }
      : undefined,
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA={true}>
      <SEO
        title={`${job.title} | Careers at Zentilos`}
        description={job.shortSummary}
        canonicalPath={`/careers/${job.id}`}
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      <div className="job-detail-page">
        {/* ==================================================================
            1. HERO SECTION (Elevated SaaS Job Header with Quick Meta)
            ================================================================== */}
        <header className="job-detail-header-section" aria-labelledby="job-title-heading">
          <div className="container">
            <div className="job-detail-hero-content">
              {/* Department Eyebrow */}
              <div className="job-detail-clean-eyebrow">
                <span className="careers-sparkle">✦</span>
                <span>{job.department.toUpperCase()} • FULL-TIME POSITION</span>
                <span className="careers-sparkle">✦</span>
              </div>

              <h1 id="job-title-heading" className="job-detail-title">
                {job.title}
              </h1>

              {/* Short Summary Subtitle */}
              <p className="job-detail-subtitle">
                {job.shortSummary}
              </p>

              {/* Clean Core Key Points Row */}
              <div className="job-detail-meta-tags">
                <span className="job-meta-pill">
                  <Icon name="map-pin" size={15} /> {job.location}
                </span>
                <span className="job-meta-pill">
                  <Icon name="briefcase" size={15} /> {job.department}
                </span>
                <span className="job-meta-pill">
                  <Icon name="clock" size={15} /> {job.type}
                </span>
                <span className="job-meta-pill">
                  <Icon name="users" size={15} /> {job.experience}
                </span>
                <span className="job-meta-pill highlight">
                  <Icon name="shield" size={15} /> 48-Hour Review SLA
                </span>
              </div>

              {/* Hero Action Buttons */}
              <div className="job-detail-hero-actions">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="careers-btn-apply-main"
                >
                  Apply for this Role <Icon name="arrow" size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2500);
                    }
                  }}
                  className="job-detail-hero-share-btn"
                >
                  <Icon name={copied ? "check" : "document"} size={14} />
                  <span>{copied ? "Link Copied to Clipboard!" : "Share / Copy Job Link"}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================================
            2. JOB CONTENT BODY (Balanced 2-Column Grid with Rich Right-Side Cards)
            ================================================================== */}
        <main className="job-detail-body-section">
          <div className="container">
            <div className="job-detail-content-layout">
              {/* Main Column */}
              <div className="job-detail-main-col">
                {/* 1. About the Role */}
                <section className="job-detail-block">
                  <h2 className="job-detail-section-title">About the Role</h2>
                  <p className="job-detail-paragraph">{job.aboutRole}</p>
                </section>

                {/* 2. Responsibilities */}
                <section className="job-detail-block">
                  <h2 className="job-detail-section-title">Key Responsibilities</h2>
                  <ul className="job-detail-list">
                    {job.responsibilities.map((item, idx) => (
                      <li key={idx} className="job-detail-list-item">
                        <span className="list-check-icon">
                          <Icon name="check" size={14} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 3. Requirements & Qualifications */}
                <section className="job-detail-block">
                  <h2 className="job-detail-section-title">Requirements &amp; Qualifications</h2>
                  <ul className="job-detail-list">
                    {job.requirements.map((item, idx) => (
                      <li key={idx} className="job-detail-list-item">
                        <span className="list-check-icon">
                          <Icon name="check" size={14} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 4. Bonus Skills */}
                {job.niceToHave && job.niceToHave.length > 0 && (
                  <section className="job-detail-block">
                    <h2 className="job-detail-section-title">Bonus Skills &amp; Nice to Have</h2>
                    <ul className="job-detail-list">
                      {job.niceToHave.map((item, idx) => (
                        <li key={idx} className="job-detail-list-item">
                          <span className="list-bullet-sparkle">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* 5. What We Offer & Benefits */}
                <section className="job-detail-block">
                  <h2 className="job-detail-section-title">What We Offer &amp; Benefits</h2>
                  <ul className="job-detail-list">
                    {job.benefits.map((item, idx) => (
                      <li key={idx} className="job-detail-list-item">
                        <span className="list-check-icon accent">
                          <Icon name="check" size={14} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Right Column: Complete Suite of Rich Information Cards */}
              <aside className="job-detail-sidebar-col" aria-label="Role Summary and Process">
                {/* Card 1: Role Overview & Fast Application */}
                <div className="job-sidebar-card">
                  <div className="job-sidebar-card-header">
                    <span className="job-sidebar-badge">ROLE OVERVIEW</span>
                    <h4 className="job-sidebar-title">Position Specifications</h4>
                  </div>
                  <div className="job-sidebar-rows">
                    <div className="job-sidebar-row">
                      <span className="sidebar-lbl">Department</span>
                      <strong className="sidebar-val">{job.department}</strong>
                    </div>
                    <div className="job-sidebar-row">
                      <span className="sidebar-lbl">Location &amp; Work Model</span>
                      <strong className="sidebar-val">{job.location}</strong>
                    </div>
                    <div className="job-sidebar-row">
                      <span className="sidebar-lbl">Employment Type</span>
                      <strong className="sidebar-val">{job.type}</strong>
                    </div>
                    <div className="job-sidebar-row">
                      <span className="sidebar-lbl">Experience Requirement</span>
                      <strong className="sidebar-val">{job.experience}</strong>
                    </div>
                    {job.salaryRange && (
                      <div className="job-sidebar-row">
                        <span className="sidebar-lbl">Compensation Package</span>
                        <strong className="sidebar-val salary">{job.salaryRange}</strong>
                      </div>
                    )}
                    <div className="job-sidebar-row">
                      <span className="sidebar-lbl">Review SLA</span>
                      <strong className="sidebar-val">48-Hour Guaranteed Feedback</strong>
                    </div>
                  </div>

                  <div className="job-sidebar-divider" />

                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="job-sidebar-apply-btn"
                  >
                    Apply for this Role <Icon name="arrow" size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Job opening URL copied to clipboard!");
                      }
                    }}
                    className="job-sidebar-copy-btn"
                  >
                    🔗 Copy Job Opening Link
                  </button>
                </div>

                {/* Card 2: 4-Stage Transparent Hiring Journey */}
                <div className="job-sidebar-card">
                  <div className="job-sidebar-card-header">
                    <span className="job-sidebar-badge">HIRING ROADMAP</span>
                    <h4 className="job-sidebar-title">What to Expect Next</h4>
                  </div>
                  <div className="job-hiring-mini-steps">
                    <div className="hiring-mini-step">
                      <span className="step-mini-num">01</span>
                      <div className="step-mini-content">
                        <strong>Application Review (48 Hours)</strong>
                        <p>Direct evaluation by engineering &amp; domain leads.</p>
                      </div>
                    </div>
                    <div className="hiring-mini-step">
                      <span className="step-mini-num">02</span>
                      <div className="step-mini-content">
                        <strong>Technical Discovery (30 Mins)</strong>
                        <p>Casual discussion about your craft, projects &amp; goals.</p>
                      </div>
                    </div>
                    <div className="hiring-mini-step">
                      <span className="step-mini-num">03</span>
                      <div className="step-mini-content">
                        <strong>System Deep-Dive (45 Mins)</strong>
                        <p>Real-world practical architectural challenge.</p>
                      </div>
                    </div>
                    <div className="hiring-mini-step">
                      <span className="step-mini-num">04</span>
                      <div className="step-mini-content">
                        <strong>Offer &amp; Team Welcome</strong>
                        <p>Clear, transparent compensation &amp; quick onboarding.</p>
                      </div>
                    </div>
                  </div>
                  <div className="job-sidebar-guarantee-note">
                    <Icon name="check" size={13} /> Zero ghosting. Human response guaranteed.
                  </div>
                </div>

                {/* Card 3: The Zentilos Culture & Perks */}
                <div className="job-sidebar-card">
                  <div className="job-sidebar-card-header">
                    <span className="job-sidebar-badge">CULTURE &amp; PERKS</span>
                    <h4 className="job-sidebar-title">Built for High Autonomy</h4>
                  </div>
                  <ul className="job-sidebar-perks-list">
                    <li>
                      <span className="perk-bullet-sparkle">✦</span>
                      <span><strong>High Trust &amp; Autonomy:</strong> Zero micro-management.</span>
                    </li>
                    <li>
                      <span className="perk-bullet-sparkle">✦</span>
                      <span><strong>Premium Health Cover:</strong> Comprehensive family medical policy.</span>
                    </li>
                    <li>
                      <span className="perk-bullet-sparkle">✦</span>
                      <span><strong>Flexible Hybrid Schedule:</strong> Focus on outcomes, not seat time.</span>
                    </li>
                    <li>
                      <span className="perk-bullet-sparkle">✦</span>
                      <span><strong>₹50,000 Learning Grant:</strong> Annual books &amp; course allowance.</span>
                    </li>
                  </ul>
                </div>

                {/* Card 4: Direct Candidate Help Desk */}
                <div className="job-sidebar-card job-sidebar-contact-card">
                  <div className="job-sidebar-card-header">
                    <span className="job-sidebar-badge">TALENT ACQUISITION</span>
                    <h4 className="job-sidebar-title">Have Questions First?</h4>
                  </div>
                  <p className="job-contact-card-desc">
                    Connect directly with our recruitment team before applying to discuss role expectations or culture fit.
                  </p>
                  <a href="mailto:talent@zentilos.com" className="job-contact-card-link">
                    <Icon name="mail" size={14} /> talent@zentilos.com
                  </a>
                  <a href="tel:+918041228900" className="job-contact-card-link">
                    <Icon name="phone" size={14} /> +91 (080) 4122-8900
                  </a>
                  <div className="job-contact-card-nda">
                    <Icon name="shield" size={12} /> Strict Candidate Confidentiality Observed
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* ==================================================================
            3. DEDICATED APPLICATION FORM SECTION (Left Heading & Content, Right Form)
            ================================================================== */}
        <section className="job-apply-form-section" id="apply-form" aria-labelledby="apply-form-title">
          <div id="application-form" style={{ position: "relative", top: "-40px" }} />
          <div className="container">
            <div className="job-apply-split-grid">
              {/* Left Column: Heading, Subheading & Content (Styled clean like Request Demo Page) */}
              <div className="job-apply-left-col">
                <div className="job-apply-left-header">
                  <div className="demo-eyebrow">
                    <span className="demo-sparkle">✦</span>
                    <span>DIRECT APPLICATION • {job.department.toUpperCase()}</span>
                    <span className="demo-sparkle">✦</span>
                  </div>

                  {(() => {
                    // Strictly balanced 2-line formatting across all roles (Customer Support, Marketing, Engineering, Design, Sales)
                    const t = job.title.trim();
                    let line1 = "Apply for";
                    let line2 = t;

                    if (t.toLowerCase().includes("customer support")) {
                      line1 = "Apply for Customer Support";
                      line2 = "Specialist (HRMS & Payroll)";
                    } else if (t.toLowerCase().includes("marketing manager")) {
                      line1 = "Apply for Product & Growth";
                      line2 = "Marketing Manager";
                    } else if (t.toLowerCase().includes("full-stack")) {
                      line1 = "Apply for Senior Full-Stack";
                      line2 = "Engineer (React & Node.js)";
                    } else if (t.toLowerCase().includes("product designer")) {
                      line1 = "Apply for Lead Product";
                      line2 = "Designer (UI/UX)";
                    } else if (t.toLowerCase().includes("account executive")) {
                      line1 = "Apply for Enterprise Account";
                      line2 = "Executive (SaaS Sales)";
                    } else {
                      const words = t.split(" ");
                      if (words.length > 2) {
                        const mid = Math.ceil(words.length / 2);
                        line1 = `Apply for ${words.slice(0, mid).join(" ")}`;
                        line2 = words.slice(mid).join(" ");
                      } else {
                        line1 = "Apply for";
                        line2 = t;
                      }
                    }

                    return (
                      <h2 id="apply-form-title" className="job-apply-hero-title">
                        {line1} <br />
                        <span className="demo-highlight-plum">{line2}</span>
                      </h2>
                    );
                  })()}

                  <p className="demo-hero-intro">
                    Join our team building modern enterprise HR software. Submit your credentials below for direct review with guaranteed 48-hour response.
                  </p>
                </div>

                {/* 4-Step Evaluation Process: Clean Highlights List positioned directly below intro */}
                <div className="job-apply-steps-container">
                  <div className="demo-highlights-list">
                    {/* Step 1 */}
                    <div className="demo-highlight-item">
                      <span className="demo-highlight-icon">
                        <Icon name="check" size={14} />
                      </span>
                      <div className="demo-highlight-text">
                        <strong>Application &amp; Portfolio Review</strong>
                        <span>Human evaluation by department lead within 48h.</span>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="demo-highlight-item">
                      <span className="demo-highlight-icon">
                        <Icon name="check" size={14} />
                      </span>
                      <div className="demo-highlight-text">
                        <strong>Craft &amp; Technical Deep-Dive</strong>
                        <span>Collaborative discussion on real system architecture.</span>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="demo-highlight-item">
                      <span className="demo-highlight-icon">
                        <Icon name="check" size={14} />
                      </span>
                      <div className="demo-highlight-text">
                        <strong>Leadership &amp; Culture Alignment</strong>
                        <span>Open conversation on autonomy, growth, and team values.</span>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="demo-highlight-item">
                      <span className="demo-highlight-icon">
                        <Icon name="check" size={14} />
                      </span>
                      <div className="demo-highlight-text">
                        <strong>Transparent Offer &amp; Onboarding</strong>
                        <span>Comprehensive fixed compensation and equity package.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Application Form Card */}
              <div className="job-apply-right-col">
                <div className="job-apply-form-card">
                  {isSubmitted ? (
                    <div className="job-apply-success-box" aria-live="polite">
                      <div className="job-apply-success-icon">
                        <Icon name="check" size={32} />
                      </div>
                      <h3>Application Submitted Successfully!</h3>
                      <p>
                        Thank you for applying for the <strong>{job.title}</strong> position. Our engineering &amp; talent leadership team has received your details and will contact you via <strong>{email}</strong> within 48 hours.
                      </p>
                      <div className="careers-thank-you-ref-box" style={{ margin: "0 auto 1.5rem", maxWidth: "360px" }}>
                        <span className="careers-ref-label">Application Reference ID</span>
                        <span className="careers-ref-code">{applicationRefId}</span>
                        <small className="careers-ref-hint">
                          A confirmation receipt has been recorded for <strong>{email}</strong>
                        </small>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFullName("");
                          setEmail("");
                          setPhone("");
                          setCurrentCompany("");
                          setTotalExperience("");
                          setNoticePeriod("");
                          setExpectedCtc("");
                          setLinkedinUrl("");
                          setResumeFile(null);
                          setCoverNote("");
                          setConsent(false);
                          setFormErrors({});
                        }}
                        className="job-form-submit-btn"
                        style={{ margin: "0 auto" }}
                      >
                        Submit Another Application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} noValidate className="job-detail-apply-form">
                      {/* Form Header matching icon + one line heading + subheading layout */}
                      <div className="job-form-header-area">
                        <div className="job-form-header-icon-box">
                          <Icon name="sparkle" size={22} />
                        </div>
                        <div className="job-form-header-text">
                          <h3 className="job-form-heading">Submit Your Application</h3>
                          <p className="job-form-subheading">
                            Direct application for {job.title} • 48h response SLA
                          </p>
                        </div>
                      </div>

                      {/* 2-Column Grid: Exactly 8 inputs in 4 balanced rows — all with identical 48px height and identical width */}
                      <div className="job-form-grid">
                        {/* 1. Full Name */}
                        <div className="job-form-field">
                          <label htmlFor="app-fullname">
                            Full Name <span className="required-star">*</span>
                          </label>
                          <input
                            id="app-fullname"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Anandita Sen"
                            className={formErrors.fullName ? "error" : ""}
                            required
                          />
                          {formErrors.fullName && (
                            <span className="careers-form-error">{formErrors.fullName}</span>
                          )}
                        </div>

                        {/* 2. Work Email */}
                        <div className="job-form-field">
                          <label htmlFor="app-email">
                            Work Email <span className="required-star">*</span>
                          </label>
                          <input
                            id="app-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="anandita@example.com"
                            className={formErrors.email ? "error" : ""}
                            required
                          />
                          {formErrors.email && (
                            <span className="careers-form-error">{formErrors.email}</span>
                          )}
                        </div>

                        {/* 3. Phone Number */}
                        <div className="job-form-field">
                          <label htmlFor="app-phone">
                            Phone Number <span className="required-star">*</span>
                          </label>
                          <PhoneInput
                            id="app-phone"
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

                        {/* 4. Current Company */}
                        <div className="job-form-field">
                          <label htmlFor="app-company">
                            Current Company <span className="optional" style={{ color: "#8a8698", fontWeight: 400 }}>(Optional)</span>
                          </label>
                          <input
                            id="app-company"
                            type="text"
                            value={currentCompany}
                            onChange={(e) => setCurrentCompany(e.target.value)}
                            placeholder="e.g. Current Employer or Self-Employed"
                          />
                        </div>

                        {/* 5. Total Experience */}
                        <div className="job-form-field">
                          <label htmlFor="app-experience">
                            Total Experience <span className="required-star">*</span>
                          </label>
                          <CustomSelect
                            id="app-experience"
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
                        <div className="job-form-field">
                          <label htmlFor="app-notice">
                            Notice Period <span className="required-star">*</span>
                          </label>
                          <CustomSelect
                            id="app-notice"
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

                        {/* 7. Expected CTC */}
                        <div className="job-form-field">
                          <label htmlFor="app-ctc">
                            Expected CTC <span className="optional" style={{ color: "#8a8698", fontWeight: 400 }}>(Optional)</span>
                          </label>
                          <input
                            id="app-ctc"
                            type="text"
                            value={expectedCtc}
                            onChange={(e) => setExpectedCtc(e.target.value)}
                            placeholder="e.g. ₹16,00,000 / year"
                          />
                        </div>

                        {/* 8. LinkedIn / Portfolio URL */}
                        <div className="job-form-field">
                          <label htmlFor="app-linkedin">
                            LinkedIn / Portfolio <span className="optional" style={{ color: "#8a8698", fontWeight: 400 }}>(Optional)</span>
                          </label>
                          <input
                            id="app-linkedin"
                            type="url"
                            value={linkedinUrl}
                            onChange={(e) => setLinkedinUrl(e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      </div>

                      {/* Resume Upload Dropzone (Exempted from single-input height/width as requested) */}
                      <div className="job-form-field full-width" style={{ marginTop: "1.2rem" }}>
                        <label>
                          Resume / CV <span className="required-star">*</span>
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
                      <div className="job-form-field full-width" style={{ marginTop: "1.2rem" }}>
                        <label htmlFor="app-covernote">
                          Why Zentilos? / What do you want to build? <span className="optional" style={{ color: "#8a8698", fontWeight: 400 }}>(Optional)</span>
                        </label>
                        <textarea
                          id="app-covernote"
                          rows={3}
                          value={coverNote}
                          onChange={(e) => setCoverNote(e.target.value)}
                          placeholder="Tell us briefly about your craft, past impact, and why you want to join our journey..."
                        />
                      </div>

                      {/* Consent Checkbox */}
                      <div className="job-form-field full-width" style={{ marginTop: "1.1rem" }}>
                        <label
                          className="careers-checkbox-label"
                          style={{
                            height: "auto",
                            minHeight: "auto",
                            maxHeight: "none",
                            whiteSpace: "normal",
                            overflow: "visible",
                            textOverflow: "clip",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            lineHeight: "1.55",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="careers-checkbox"
                            style={{
                              flexShrink: 0,
                              width: "18px",
                              height: "18px",
                              minHeight: "18px",
                              maxHeight: "18px",
                              marginTop: "2px",
                              cursor: "pointer",
                            }}
                            required
                          />
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#334155",
                              lineHeight: "1.55",
                              whiteSpace: "normal",
                              overflow: "visible",
                              textOverflow: "clip",
                            }}
                          >
                            I consent to Zentilos collecting and processing my application data for recruitment purposes in accordance with the{" "}
                            <a
                              href="/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#802B5B", fontWeight: 600, textDecoration: "underline" }}
                            >
                              Privacy Policy
                            </a>
                            . <span className="required-star" style={{ color: "#dc2626", fontWeight: 800 }}>*</span>
                          </span>
                        </label>
                        {formErrors.consent && (
                          <span className="careers-form-error" style={{ marginTop: "6px" }}>{formErrors.consent}</span>
                        )}
                      </div>

                      {submitError && (
                        <div className="careers-form-error-banner" style={{ color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", padding: "10px 14px", borderRadius: "8px", margin: "16px 0", fontSize: "14px" }}>
                          <span>{submitError}</span>
                        </div>
                      )}

                      {/* Submit Button Row */}
                      <div className="job-form-submit-row">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="job-form-submit-btn"
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
                        <div className="job-form-safety-footer">
                          <Icon name="shield" size={14} />
                          <span>Your details are safe with us. Strict confidentiality &amp; bilateral NDA observed.</span>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default JobDetailPage;
