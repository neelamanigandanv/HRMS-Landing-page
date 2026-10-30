import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import CustomSelect from "../components/ui/CustomSelect";
import { getJobById } from "../data/careersData";
import "./CareersPage.css";

const NOTICE_PERIOD_OPTIONS = [
  { value: "Immediate", label: "Immediate (0–15 days)", desc: "Ready to join within two weeks" },
  { value: "30 days", label: "30 days", desc: "Standard one-month transition" },
  { value: "60 days", label: "60 days", desc: "Two months notice period" },
  { value: "90 days", label: "90 days", desc: "Three months notice period" },
];

export function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = jobId ? getJobById(jobId) : undefined;

  // On-page form state
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    noticePeriod: "Immediate",
    linkedin: "",
    resumeLink: "",
    coverNote: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollToForm = () => {
    const el = document.getElementById("apply-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  if (!job) {
    return (
      <PageLayout hideCTA={true}>
        <SEO
          title="Position Not Found | Careers at LattiumHR"
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
      name: "LattiumHR",
      value: job.id,
    },
    datePosted: job.postedDate,
    validThrough: "2027-12-31",
    employmentType: job.type === "Full-Time" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "LattiumHR",
      sameAs: "https://lattiumhr.com",
      logo: "https://lattiumhr.com/favicon.svg",
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
        title={`${job.title} | Careers at LattiumHR`}
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
            1. HERO SECTION (Centered, Clean Eyebrow, Proper Balanced Heading & Subhead)
            ================================================================== */}
        <header className="job-detail-header-section" aria-labelledby="job-title-heading">
          <div className="container">
            {/* Top Navigation Row */}
            <div className="job-detail-top-nav">
              <Link to="/careers" className="job-detail-back-pill">
                <span className="back-arrow-icon">←</span> Back to All Open Positions
              </Link>
            </div>

            <div className="job-detail-hero-content">
              {/* Eyebrow */}
              <div className="job-detail-clean-eyebrow">
                <span className="careers-sparkle">✦</span>
                <span>{job.department.toUpperCase()} • FULL-TIME ROLE</span>
                <span className="careers-sparkle">✦</span>
              </div>

              <h1 id="job-title-heading" className="job-detail-title">
                {job.title}
              </h1>

              {/* Short Summary Subtitle */}
              <p className="job-detail-subtitle">
                {job.shortSummary}
              </p>

              {/* Clean Core Meta Pills */}
              <div className="job-detail-meta-tags">
                <span className="job-meta-pill">
                  <Icon name="map-pin" size={14} /> {job.location}
                </span>
                <span className="job-meta-pill">
                  <Icon name="clock" size={14} /> {job.type}
                </span>
                <span className="job-meta-pill">
                  <Icon name="briefcase" size={14} /> {job.experience}
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
                      alert("Job opening URL copied to clipboard!");
                    }
                  }}
                  className="job-detail-hero-share-btn"
                >
                  <Icon name="document" size={14} /> Copy Job Link
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

                {/* Card 3: The LattiumHR Culture & Perks */}
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
                  <a href="mailto:talent@lattiumhr.com" className="job-contact-card-link">
                    <Icon name="mail" size={14} /> talent@lattiumhr.com
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
            3. DEDICATED APPLICATION FORM SECTION (Left Detail, Right Form)
            ================================================================== */}
        <section className="job-apply-form-section" id="apply-form" aria-labelledby="apply-form-title">
          <div className="container">
            <div className="job-apply-split-grid">
              {/* Left Column: Heading, Subheading, Details */}
              <div className="job-apply-left-col">
                <div className="job-apply-clean-eyebrow">
                  <span className="careers-sparkle">✦</span>
                  <span>DIRECT APPLICATION</span>
                  <span className="careers-sparkle">✦</span>
                </div>

                <h2 id="apply-form-title" className="job-apply-title">
                  Ready to Build with Us as <span className="careers-highlight-word">{job.title}</span>?
                </h2>

                <p className="job-apply-subhead">
                  Submit your application directly to our talent acquisition team. We personally review every
                  single submission and respond with next steps within 48 hours. No automated resume black holes.
                </p>

                <div className="job-apply-perks-list">
                  <div className="job-apply-perk-item">
                    <span className="job-apply-perk-icon">
                      <Icon name="clock" size={16} />
                    </span>
                    <div>
                      <strong>Guaranteed 48-Hour Response SLA</strong>
                      <p>You will receive human feedback and interview dates within 2 business days.</p>
                    </div>
                  </div>

                  <div className="job-apply-perk-item">
                    <span className="job-apply-perk-icon">
                      <Icon name="users" size={16} />
                    </span>
                    <div>
                      <strong>Direct Lead &amp; Peer Interviews</strong>
                      <p>Meet and converse with the exact engineers and architects you will build with.</p>
                    </div>
                  </div>

                  <div className="job-apply-perk-item">
                    <span className="job-apply-perk-icon">
                      <Icon name="shield" size={16} />
                    </span>
                    <div>
                      <strong>Transparent Compensation &amp; Freedom</strong>
                      <p>Competitive benchmarked salary ({job.salaryRange || "Top of market tier"}), comprehensive health cover, and annual learning grants.</p>
                    </div>
                  </div>
                </div>

                <div className="job-apply-contact-pill">
                  <span className="apply-contact-label">Have questions before submitting?</span>
                  <a href="mailto:talent@lattiumhr.com" className="apply-contact-email">
                    talent@lattiumhr.com <Icon name="arrow" size={14} />
                  </a>
                </div>
              </div>

              {/* Right Column: Complete Application Form */}
              <div className="job-apply-right-col">
                <div className="job-apply-form-card">
                  {isSubmitted ? (
                    <div className="job-apply-success-box">
                      <div className="job-apply-success-icon">
                        <Icon name="check" size={32} />
                      </div>
                      <h3>Application Submitted Successfully!</h3>
                      <p>
                        Thank you for applying for the <strong>{job.title}</strong> position. Our engineering &amp; talent leadership team has received your details and will contact you via <strong>{formValues.email}</strong> within 48 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormValues({
                            fullName: "",
                            email: "",
                            phone: "",
                            location: "",
                            experience: "",
                            noticePeriod: "Immediate",
                            linkedin: "",
                            resumeLink: "",
                            coverNote: "",
                          });
                        }}
                        className="careers-btn-apply-main"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="job-apply-form">
                      <h3 className="job-form-heading">Submit Your Application</h3>

                      <div className="job-form-grid">
                        <div className="job-form-field">
                          <label htmlFor="fullName">Full Name *</label>
                          <input
                            id="fullName"
                            type="text"
                            required
                            placeholder="e.g. Aditi Sharma"
                            value={formValues.fullName}
                            onChange={(e) => setFormValues({ ...formValues, fullName: e.target.value })}
                          />
                        </div>

                        <div className="job-form-field">
                          <label htmlFor="email">Email Address *</label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder="aditi@example.com"
                            value={formValues.email}
                            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                          />
                        </div>

                        <div className="job-form-field">
                          <label htmlFor="phone">Phone Number *</label>
                          <input
                            id="phone"
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formValues.phone}
                            onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                          />
                        </div>

                        <div className="job-form-field">
                          <label htmlFor="location">Current Location</label>
                          <input
                            id="location"
                            type="text"
                            placeholder="e.g. Bengaluru, India"
                            value={formValues.location}
                            onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                          />
                        </div>

                        <div className="job-form-field">
                          <label htmlFor="experience">Relevant Experience</label>
                          <input
                            id="experience"
                            type="text"
                            placeholder="e.g. 4+ years"
                            value={formValues.experience}
                            onChange={(e) => setFormValues({ ...formValues, experience: e.target.value })}
                          />
                        </div>

                        <div className="job-form-field">
                          <label htmlFor="noticePeriod">Notice Period</label>
                          <CustomSelect
                            id="noticePeriod"
                            options={NOTICE_PERIOD_OPTIONS}
                            value={formValues.noticePeriod}
                            onChange={(val) => setFormValues({ ...formValues, noticePeriod: val })}
                          />
                        </div>

                        <div className="job-form-field full-width">
                          <label htmlFor="linkedin">LinkedIn or Portfolio URL</label>
                          <input
                            id="linkedin"
                            type="url"
                            placeholder="https://linkedin.com/in/username or github.com/username"
                            value={formValues.linkedin}
                            onChange={(e) => setFormValues({ ...formValues, linkedin: e.target.value })}
                          />
                        </div>

                        <div className="job-form-field full-width">
                          <label htmlFor="resumeLink">Resume / CV Link (Google Drive, Dropbox, or PDF URL) *</label>
                          <input
                            id="resumeLink"
                            type="url"
                            required
                            placeholder="https://drive.google.com/file/... (ensure link sharing is on)"
                            value={formValues.resumeLink}
                            onChange={(e) => setFormValues({ ...formValues, resumeLink: e.target.value })}
                          />
                        </div>

                        <div className="job-form-field full-width">
                          <label htmlFor="coverNote">Why are you interested in LattiumHR? (Optional)</label>
                          <textarea
                            id="coverNote"
                            rows={3}
                            placeholder="Share a brief note on what excites you about this role..."
                            value={formValues.coverNote}
                            onChange={(e) => setFormValues({ ...formValues, coverNote: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="job-form-submit-row">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="job-form-submit-btn"
                        >
                          {isSubmitting ? "Submitting Application..." : "Submit Application →"}
                        </button>
                        <span className="job-form-privacy-note">
                          <Icon name="lock" size={13} /> Strict confidentiality observed.
                        </span>
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
