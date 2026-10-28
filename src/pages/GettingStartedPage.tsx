import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import "./GettingStartedPage.css";

export function GettingStartedPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeToc, setActiveToc] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToStep = (stepNumber: number) => {
    setActiveToc(stepNumber);
    const element = document.getElementById(`guide-step-${stepNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToGuide = () => {
    const element = document.getElementById("guide-content");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageLayout hideCTA={true}>
      <SEO
        title="Set Up Your Organization - Getting Started Guide | LattiumHR"
        description="Configure your company details, locations, departments and settings to get started with LattiumHR."
        canonicalPath="/help/getting-started"
      />

      <div className="gs-page-wrapper">
        {/* ==========================================================================
            CLEAN LIGHT DOCUMENTATION HEADER
            ========================================================================== */}
        <header className="gs-clean-header">
          <div className="gs-header-container">
            {/* Top Bar: Breadcrumbs & Quick Utility Actions */}
            <div className="gs-header-top-bar">
              <nav className="gs-header-breadcrumbs" aria-label="Breadcrumb">
                <Link to="/" aria-label="Home">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span>Home</span>
                </Link>
                <span className="gs-header-breadcrumbs-sep">/</span>
                <Link to="/resources">Resources</Link>
                <span className="gs-header-breadcrumbs-sep">/</span>
                <Link to="/help/getting-started">Getting Started</Link>
                <span className="gs-header-breadcrumbs-sep">/</span>
                <span className="gs-header-breadcrumbs-current">Set Up Your Organization</span>
              </nav>

              <div className="gs-header-utilities">
                <span className="gs-util-pill">
                  <Icon name="clock" size={13} />
                  <span>5 min read</span>
                </span>
                <span className="gs-util-pill">
                  <Icon name="check" size={13} />
                  <span>Updated for 2026</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`gs-util-btn ${copied ? "copied" : ""}`}
                  title="Copy guide link to clipboard"
                >
                  <Icon name={copied ? "check" : "document"} size={13} />
                  <span>{copied ? "Link Copied!" : "Share Guide"}</span>
                </button>
              </div>
            </div>

            {/* Main Header Info */}
            <div className="gs-header-main">
              <div className="gs-header-badge">
                <Icon name="book-open" size={13} />
                <span>GETTING STARTED GUIDE</span>
              </div>

              <h1 className="gs-header-title">Set Up Your Organization</h1>

              <p className="gs-header-lead">
                Configure your company details, locations, departments and settings to get started with LattiumHR.
              </p>

              {/* 3 Quick highlights */}
              <div className="gs-header-highlights">
                <div className="gs-highlight-card">
                  <div className="gs-highlight-icon-wrap">
                    <Icon name="clock" size={18} />
                  </div>
                  <div className="gs-highlight-meta">
                    <span className="gs-highlight-label">Completion Time</span>
                    <span className="gs-highlight-value">5–10 Minutes</span>
                  </div>
                </div>

                <div className="gs-highlight-card">
                  <div className="gs-highlight-icon-wrap">
                    <Icon name="shield" size={18} />
                  </div>
                  <div className="gs-highlight-meta">
                    <span className="gs-highlight-label">Prerequisites</span>
                    <span className="gs-highlight-value">Super Admin Access</span>
                  </div>
                </div>

                <div className="gs-highlight-card">
                  <div className="gs-highlight-icon-wrap">
                    <Icon name="building" size={18} />
                  </div>
                  <div className="gs-highlight-meta">
                    <span className="gs-highlight-label">Key Outcome</span>
                    <span className="gs-highlight-value">Configured Branches &amp; Units</span>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="gs-header-actions">
                <button
                  type="button"
                  onClick={scrollToGuide}
                  className="gs-header-btn-primary"
                >
                  <span>Start Reading Guide</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </button>
                <Link to="/resources" className="gs-header-btn-secondary">
                  <span>Browse All Guides</span>
                  <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* ==========================================================================
            MAIN GUIDE SECTION (3-COLUMN LAYOUT)
            ========================================================================== */}
        <section id="guide-content" className="gs-main-section">
          <div className="gs-main-container">
            {/* 1. LEFT SIDEBAR */}
            <aside className="gs-left-sidebar">
              {/* Getting Started Steps List */}
              <div className="gs-sidebar-card">
                <h4 className="gs-sidebar-heading">Getting Started</h4>
                <nav className="gs-steps-nav">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className={`gs-step-nav-link ${activeStep === 1 ? "active" : ""}`}
                  >
                    <span className="gs-step-nav-circle">1</span>
                    <span>Set Up Your Organization</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className={`gs-step-nav-link ${activeStep === 2 ? "active" : ""}`}
                  >
                    <span className="gs-step-nav-circle">2</span>
                    <span>Add Employees</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className={`gs-step-nav-link ${activeStep === 3 ? "active" : ""}`}
                  >
                    <span className="gs-step-nav-circle">3</span>
                    <span>Configure Policies</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className={`gs-step-nav-link ${activeStep === 4 ? "active" : ""}`}
                  >
                    <span className="gs-step-nav-circle">4</span>
                    <span>Activate Workflows</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(5)}
                    className={`gs-step-nav-link ${activeStep === 5 ? "active" : ""}`}
                  >
                    <span className="gs-step-nav-circle">5</span>
                    <span>Explore Your Dashboards</span>
                  </button>
                </nav>
              </div>

              {/* Related Guides List */}
              <div className="gs-sidebar-card">
                <h4 className="gs-sidebar-heading">Related Guides</h4>
                <div className="gs-sidebar-guides-list">
                  <Link to="/help/employee-bulk-import" className="gs-sidebar-guide-link">
                    <span>Add Employees in Bulk</span>
                    <Icon name="arrow" size={13} />
                  </Link>
                  <Link to="/help/attendance-shifts" className="gs-sidebar-guide-link">
                    <span>Configure Attendance &amp; Shifts</span>
                    <Icon name="arrow" size={13} />
                  </Link>
                  <Link to="/help/leave-policies" className="gs-sidebar-guide-link">
                    <span>Create Leave Policies</span>
                    <Icon name="arrow" size={13} />
                  </Link>
                  <Link to="/help/payroll-run" className="gs-sidebar-guide-link">
                    <span>Process a Monthly Payroll Run</span>
                    <Icon name="arrow" size={13} />
                  </Link>
                </div>
              </div>
            </aside>

            {/* 2. CENTER CONTENT COLUMN */}
            <main className="gs-content-col">
              {/* "Before you begin" Callout */}
              <div className="gs-callout-card">
                <div className="gs-callout-icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                </div>
                <div className="gs-callout-body">
                  <h4 className="gs-callout-title">Before you begin</h4>
                  <ul className="gs-callout-list">
                    <li>
                      <Icon name="check" size={15} />
                      <span>You have admin access to your LattiumHR account.</span>
                    </li>
                    <li>
                      <Icon name="check" size={15} />
                      <span>Keep your company details, locations, and department structure ready.</span>
                    </li>
                    <li>
                      <Icon name="check" size={15} />
                      <span>Decide your working hours, leave calendar, and approval hierarchy.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 1: Add Company Details */}
              <div id="guide-step-1" className="gs-step-card">
                <div className="gs-step-left">
                  <div className="gs-step-header">
                    <div className="gs-step-number-badge">1</div>
                    <div className="gs-step-titles">
                      <h3>Add Company Details</h3>
                      <p>
                        Start by adding your basic company information such as name, industry,
                        address and contact details.
                      </p>
                    </div>
                  </div>

                  <ul className="gs-substeps-list">
                    <li className="gs-substep-item">
                      <span className="gs-substep-num">1</span>
                      <span className="gs-substep-text">
                        Go to <strong>Organization</strong> from the left navigation menu.
                      </span>
                    </li>
                    <li className="gs-substep-item">
                      <span className="gs-substep-num">2</span>
                      <span className="gs-substep-text">
                        Click on <strong>Company Details</strong>.
                      </span>
                    </li>
                    <li className="gs-substep-item">
                      <span className="gs-substep-num">3</span>
                      <span className="gs-substep-text">
                        Fill in your company information and click <strong>Save</strong>.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="gs-step-mockup">
                  <div className="gs-mini-mockup-body">
                    <div className="gs-mini-mockup-nav">
                      <div className="gs-mini-nav-item active">
                        <Icon name="building" size={11} />
                        <span>Organization</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="map-pin" size={11} />
                        <span>Locations</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="briefcase" size={11} />
                        <span>Departments</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="award" size={11} />
                        <span>Designations</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="calendar" size={11} />
                        <span>Calendar</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="clock" size={11} />
                        <span>Working Hours</span>
                      </div>
                    </div>

                    <div className="gs-mini-mockup-content">
                      <div className="gs-mini-mockup-header-row">
                        <h5 className="gs-mini-mockup-title">Company Details</h5>
                      </div>
                      <div className="gs-mini-form-fields">
                        <div className="gs-mini-field">
                          <label className="gs-mini-label">Company Name</label>
                          <div className="gs-mini-input">
                            <span>Acma Corp</span>
                          </div>
                        </div>
                        <div className="gs-mini-field">
                          <label className="gs-mini-label">Industry</label>
                          <div className="gs-mini-input">
                            <span>Technology</span>
                          </div>
                        </div>
                        <div className="gs-mini-field">
                          <label className="gs-mini-label">Address</label>
                          <div className="gs-mini-input">
                            <span>123 Business Street, Bangalore</span>
                          </div>
                        </div>
                      </div>
                      <div className="gs-mockup-footer" style={{ marginTop: "12px" }}>
                        <button type="button" className="gs-mini-primary-btn">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Set Up Locations */}
              <div id="guide-step-2" className="gs-step-card">
                <div className="gs-step-left">
                  <div className="gs-step-header">
                    <div className="gs-step-number-badge">2</div>
                    <div className="gs-step-titles">
                      <h3>Set Up Locations</h3>
                      <p>
                        Add your office locations, branches or business units. This helps you
                        manage employees and operations across multiple locations.
                      </p>
                    </div>
                  </div>

                  <ul className="gs-substeps-list">
                    <li className="gs-substep-item">
                      <span className="gs-substep-num">1</span>
                      <span className="gs-substep-text">
                        Go to <strong>Locations</strong> in the left menu.
                      </span>
                    </li>
                    <li className="gs-substep-item">
                      <span className="gs-substep-num">2</span>
                      <span className="gs-substep-text">
                        Click <strong>Add Location</strong>.
                      </span>
                    </li>
                    <li className="gs-substep-item">
                      <span className="gs-substep-num">3</span>
                      <span className="gs-substep-text">
                        Enter location details and save.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="gs-step-mockup">
                  <div className="gs-mini-mockup-body">
                    <div className="gs-mini-mockup-nav">
                      <div className="gs-mini-nav-item">
                        <Icon name="building" size={11} />
                        <span>Organization</span>
                      </div>
                      <div className="gs-mini-nav-item active">
                        <Icon name="map-pin" size={11} />
                        <span>Locations</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="briefcase" size={11} />
                        <span>Departments</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="award" size={11} />
                        <span>Designations</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="calendar" size={11} />
                        <span>Calendar</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="clock" size={11} />
                        <span>Working Hours</span>
                      </div>
                    </div>

                    <div className="gs-mini-mockup-content">
                      <div className="gs-mini-mockup-header-row">
                        <h5 className="gs-mini-mockup-title">Locations</h5>
                        <button type="button" className="gs-mini-primary-btn">+ Add Location</button>
                      </div>
                      <div className="gs-mini-locations-list">
                        <div className="gs-mini-location-row">
                          <div className="gs-mini-location-info">
                            <Icon name="map-pin" size={13} />
                            <div>
                              <div className="gs-mini-loc-name">Head Office</div>
                              <div className="gs-mini-loc-city">Bangalore, India</div>
                            </div>
                          </div>
                          <Icon name="chevron" size={12} style={{ color: "#94a3b8" }} />
                        </div>
                        <div className="gs-mini-location-row">
                          <div className="gs-mini-location-info">
                            <Icon name="map-pin" size={13} />
                            <div>
                              <div className="gs-mini-loc-name">Branch Office</div>
                              <div className="gs-mini-loc-city">Chennai, India</div>
                            </div>
                          </div>
                          <Icon name="chevron" size={12} style={{ color: "#94a3b8" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Configure Departments */}
              <div id="guide-step-3" className="gs-step-card">
                <div className="gs-step-left">
                  <div className="gs-step-header">
                    <div className="gs-step-number-badge">3</div>
                    <div className="gs-step-titles">
                      <h3>Configure Departments</h3>
                      <p>
                        Organize your team structure by creating departments and sub-departments.
                      </p>
                    </div>
                  </div>

                  <ul className="gs-substeps-list">
                    <li className="gs-substep-item">
                      <span className="gs-substep-num">1</span>
                      <span className="gs-substep-text">
                        Go to <strong>Departments</strong> in the left menu.
                      </span>
                    </li>
                    <li className="gs-substep-item">
                      <span className="gs-substep-num">2</span>
                      <span className="gs-substep-text">
                        Click <strong>Add Department</strong>.
                      </span>
                    </li>
                    <li className="gs-substep-item">
                      <span className="gs-substep-num">3</span>
                      <span className="gs-substep-text">
                        Enter the department name and save.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="gs-step-mockup">
                  <div className="gs-mini-mockup-body">
                    <div className="gs-mini-mockup-nav">
                      <div className="gs-mini-nav-item">
                        <Icon name="building" size={11} />
                        <span>Organization</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="map-pin" size={11} />
                        <span>Locations</span>
                      </div>
                      <div className="gs-mini-nav-item active">
                        <Icon name="briefcase" size={11} />
                        <span>Departments</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="award" size={11} />
                        <span>Designations</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="calendar" size={11} />
                        <span>Calendar</span>
                      </div>
                      <div className="gs-mini-nav-item">
                        <Icon name="clock" size={11} />
                        <span>Working Hours</span>
                      </div>
                    </div>

                    <div className="gs-mini-mockup-content">
                      <div className="gs-mini-mockup-header-row">
                        <h5 className="gs-mini-mockup-title">Departments</h5>
                        <button type="button" className="gs-mini-primary-btn">+ Add Department</button>
                      </div>
                      <div className="gs-mini-departments-list">
                        <div className="gs-mini-dept-row">
                          <span>Engineering</span>
                          <Icon name="chevron" size={11} style={{ color: "#94a3b8" }} />
                        </div>
                        <div className="gs-mini-dept-row">
                          <span>Marketing</span>
                          <Icon name="chevron" size={11} style={{ color: "#94a3b8" }} />
                        </div>
                        <div className="gs-mini-dept-row">
                          <span>Human Resources</span>
                          <Icon name="chevron" size={11} style={{ color: "#94a3b8" }} />
                        </div>
                        <div className="gs-mini-dept-row">
                          <span>Finance</span>
                          <Icon name="chevron" size={11} style={{ color: "#94a3b8" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Completion Banner ("You're all set!") */}
              <div id="guide-step-complete" className="gs-completion-card">
                <div className="gs-completion-left">
                  <div className="gs-completion-icon">
                    <Icon name="check" size={22} />
                  </div>
                  <div className="gs-completion-info">
                    <h3>You&apos;re all set!</h3>
                    <p>
                      Your organization is now configured. Next, add your employees
                      and set up policies to start using LattiumHR.
                    </p>
                  </div>
                </div>

                <div className="gs-completion-right">
                  <Link to="/help/employee-bulk-import" className="gs-completion-btn">
                    <span>Continue to Add Employees</span>
                    <Icon name="arrow" size={15} />
                  </Link>
                  <Link to="/help/getting-started" className="gs-completion-back-link">
                    Back to Get Started
                  </Link>
                </div>
              </div>
            </main>

            {/* 3. RIGHT SIDEBAR ("ON THIS PAGE") */}
            <aside className="gs-right-sidebar">
              <div className="gs-toc-card">
                <h4 className="gs-toc-heading">On this page</h4>
                <ul className="gs-toc-list">
                  <li className={`gs-toc-item ${activeToc === 1 ? "active" : ""}`}>
                    <a
                      href="#guide-step-1"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToStep(1);
                      }}
                    >
                      <span className="gs-toc-badge">1</span>
                      <span>Add Company Details</span>
                    </a>
                  </li>
                  <li className={`gs-toc-item ${activeToc === 2 ? "active" : ""}`}>
                    <a
                      href="#guide-step-2"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToStep(2);
                      }}
                    >
                      <span className="gs-toc-badge">2</span>
                      <span>Set Up Locations</span>
                    </a>
                  </li>
                  <li className={`gs-toc-item ${activeToc === 3 ? "active" : ""}`}>
                    <a
                      href="#guide-step-3"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToStep(3);
                      }}
                    >
                      <span className="gs-toc-badge">3</span>
                      <span>Configure Departments</span>
                    </a>
                  </li>
                  <li className={`gs-toc-item ${activeToc === 4 ? "active" : ""}`}>
                    <a
                      href="#guide-step-complete"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToStep(4);
                      }}
                    >
                      <span className="gs-toc-badge">4</span>
                      <span>Set Up Designations</span>
                    </a>
                  </li>
                  <li className={`gs-toc-item ${activeToc === 5 ? "active" : ""}`}>
                    <a
                      href="#guide-step-complete"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToStep(5);
                      }}
                    >
                      <span className="gs-toc-badge">5</span>
                      <span>Configure Calendar &amp; Hours</span>
                    </a>
                  </li>
                  <li className={`gs-toc-item ${activeToc === 6 ? "active" : ""}`}>
                    <a
                      href="#guide-step-complete"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToStep(6);
                      }}
                    >
                      <span className="gs-toc-badge">6</span>
                      <span>Review &amp; Save</span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ==========================================================================
            RELATED GUIDES 4-CARD GRID
            ========================================================================== */}
        <section className="gs-related-section">
          <div className="gs-related-container">
            <div className="gs-related-top">
              <div className="gs-related-header">
                <h2>Related Guides</h2>
                <p>Learn more about setting up and managing your HR system.</p>
              </div>
              <Link to="/resources" className="gs-related-view-all">
                <span>View All Guides</span>
                <Icon name="arrow" size={14} />
              </Link>
            </div>

            <div className="gs-related-grid">
              {/* Card 1: Add Employees in Bulk */}
              <Link to="/help/employee-bulk-import" className="gs-related-card">
                <div>
                  <div className="gs-related-icon-wrap">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="7" r="4" />
                      <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
                      <path d="M19 11v6m3-3h-6" strokeWidth="1.8" />
                    </svg>
                  </div>
                  <h4 className="gs-related-title">Add Employees in Bulk</h4>
                  <p className="gs-related-desc">
                    Save time by importing multiple employees at once.
                  </p>
                </div>
                <div className="gs-related-footer">
                  <span>5 min read</span>
                  <Icon name="arrow" size={14} />
                </div>
              </Link>

              {/* Card 2: Configure Attendance & Shifts */}
              <Link to="/help/attendance-shifts" className="gs-related-card">
                <div>
                  <div className="gs-related-icon-wrap">
                    <Icon name="clock" size={20} />
                  </div>
                  <h4 className="gs-related-title">Configure Attendance &amp; Shifts</h4>
                  <p className="gs-related-desc">
                    Set up work schedules and attendance rules.
                  </p>
                </div>
                <div className="gs-related-footer">
                  <span>7 min read</span>
                  <Icon name="arrow" size={14} />
                </div>
              </Link>

              {/* Card 3: Create Leave Policies */}
              <Link to="/help/leave-policies" className="gs-related-card">
                <div>
                  <div className="gs-related-icon-wrap">
                    <Icon name="calendar" size={20} />
                  </div>
                  <h4 className="gs-related-title">Create Leave Policies</h4>
                  <p className="gs-related-desc">
                    Define leave types, approval flows and balance rules.
                  </p>
                </div>
                <div className="gs-related-footer">
                  <span>6 min read</span>
                  <Icon name="arrow" size={14} />
                </div>
              </Link>

              {/* Card 4: Process a Monthly Payroll Run */}
              <Link to="/help/payroll-run" className="gs-related-card">
                <div>
                  <div className="gs-related-icon-wrap">
                    <Icon name="wallet" size={20} />
                  </div>
                  <h4 className="gs-related-title">Process a Monthly Payroll Run</h4>
                  <p className="gs-related-desc">
                    Review, approve and process payroll for your team.
                  </p>
                </div>
                <div className="gs-related-footer">
                  <span>8 min read</span>
                  <Icon name="arrow" size={14} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            "NEED MORE HELP?" SUPPORT SECTION
            ========================================================================== */}
        <section className="gs-support-section">
          <div className="gs-support-container">
            <div className="gs-support-left">
              <div className="gs-support-left-eyebrow">NEED MORE HELP?</div>
              <h2>We&apos;re here to support you.</h2>
              <p>Find answers, explore FAQs, or get in touch with our team.</p>
            </div>

            <div className="gs-support-cards">
              {/* Channel 1: Help Center */}
              <div className="gs-support-col">
                <div className="gs-support-col-icon">
                  <Icon name="help-circle" size={19} />
                </div>
                <h4>Help Center</h4>
                <p>Browse product guides and tutorials.</p>
                <Link to="/help" className="gs-support-link">
                  <span>Visit Help Center</span>
                  <Icon name="arrow" size={13} />
                </Link>
              </div>

              {/* Channel 2: FAQs */}
              <div className="gs-support-col">
                <div className="gs-support-col-icon">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="10" r="0.5" fill="currentColor" />
                    <path d="M12 7a1.5 1.5 0 0 1 1.5 1.5c0 1-1.5 1.5-1.5 2" strokeWidth="1.8" />
                  </svg>
                </div>
                <h4>FAQs</h4>
                <p>Quick answers to common questions.</p>
                <Link to="/faqs" className="gs-support-link">
                  <span>View FAQs</span>
                  <Icon name="arrow" size={13} />
                </Link>
              </div>

              {/* Channel 3: Customer Support */}
              <div className="gs-support-col">
                <div className="gs-support-col-icon">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <h4>Customer Support</h4>
                <p>Get assistance when you need it.</p>
                <Link to="/contact" className="gs-support-link">
                  <span>Contact Support</span>
                  <Icon name="arrow" size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default GettingStartedPage;
