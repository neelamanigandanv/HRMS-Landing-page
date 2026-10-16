import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon, { IconName } from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";

export function EmployeeManagementPage() {
  const { openDemoModal } = useDemoModal();

  // State for interactive elements
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeHeroTab, setActiveHeroTab] = useState<"all" | "engineering" | "sales" | "finance">("all");
  const [activeSolutionTab, setActiveSolutionTab] = useState<"profile" | "job" | "docs" | "timeline">("profile");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Mock employee directory data for Hero UI visual
  const heroEmployees = [
    {
      id: "LAT-2041",
      name: "Priya Sharma",
      role: "Lead Product Designer",
      dept: "Engineering & Design",
      avatarBg: "#7b2958",
      initials: "PS",
      location: "Bengaluru HQ",
      status: "Active",
      category: "engineering",
    },
    {
      id: "LAT-2089",
      name: "Rohan Verma",
      role: "Senior Account Executive",
      dept: "Sales & Growth",
      avatarBg: "#3b82f6",
      initials: "RV",
      location: "Mumbai Hub",
      status: "Active",
      category: "sales",
    },
    {
      id: "LAT-2104",
      name: "Ananya Iyer",
      role: "Financial Analyst",
      dept: "Finance & Payroll",
      avatarBg: "#10b981",
      initials: "AI",
      location: "Delhi Office",
      status: "Active",
      category: "finance",
    },
    {
      id: "LAT-2155",
      name: "Kavya Sundaram",
      role: "Full-Stack Engineer",
      dept: "Platform Engineering",
      avatarBg: "#8b5cf6",
      initials: "KS",
      location: "Bengaluru HQ",
      status: "On Leave",
      category: "engineering",
    },
  ];

  const filteredHeroEmployees =
    activeHeroTab === "all"
      ? heroEmployees
      : heroEmployees.filter((emp) => emp.category === activeHeroTab);

  // FAQ data
  const faqs = [
    {
      q: "What is employee management software?",
      a: "Employee management software is a centralized digital solution designed to manage, organize, and streamline workforce records across the entire employee lifecycle—including onboarding, personal details, job roles, reporting hierarchies, and documents.",
    },
    {
      q: "Can we maintain all employee records in one place?",
      a: "Yes. Lattium provides a unified single source of truth for personal information, emergency contacts, statutory IDs, banking details, department assignments, and job histories across all branches and satellite offices.",
    },
    {
      q: "Can we import employee data in bulk?",
      a: "Yes. Lattium supports easy bulk Excel and CSV uploads with automated column mapping, format validation, and duplicate detection, allowing you to onboard entire teams and departments in minutes.",
    },
    {
      q: "Can employee information be accessed based on user roles?",
      a: "Yes. Granular, role-based access permissions ensure employees only view and update their own self-service profiles, managers see their direct reports, and HR admins retain full control over company-wide records.",
    },
    {
      q: "Can employee records connect with attendance and payroll?",
      a: "Yes. Employee profiles are natively integrated across the Lattium platform, automatically feeding verified employee records into attendance biometric sync, leave quotas, and automated payroll disbursements.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper">
      <SEO
        title="Employee Management Software — Centralized Employee Records & Profiles"
        description="Every Employee. Every Detail. One Connected Platform. Keep employee information organized, simplify HR administration and manage the entire employee lifecycle with Lattium."
        canonicalPath="/features/employee-management"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Above the fold)
            ========================================================================= */}
        <section className="emp-hero-section">
          <div className="emp-hero-ambient" />
          <div className="container emp-hero-container">
            <div className="emp-hero-content">
              <span className="emp-eyebrow">
                <Icon name="sparkle" size={13} /> EMPLOYEE MANAGEMENT
              </span>
              <h1 className="emp-hero-title">
                Every Employee. Every Detail. One Connected Platform.
              </h1>
              <p className="emp-hero-subhead">
                Keep employee information organized, simplify HR administration and manage the entire employee lifecycle from one centralized platform.
              </p>

              <div className="emp-hero-actions">
                <button
                  type="button"
                  onClick={() =>
                    openDemoModal({
                      title: "Request an Employee Management Walkthrough",
                      subtitle: "See how Lattium centralizes your employee directory, records, and lifecycle operations.",
                    })
                  }
                  className="emp-btn emp-btn-primary"
                >
                  Request a Demo <Icon name="arrow" size={15} />
                </button>
                <a href="#features" className="emp-btn emp-btn-secondary">
                  Explore Features
                </a>
              </div>

              <div className="emp-hero-trust">
                <span className="emp-trust-item">
                  <Icon name="check" size={13} /> Single source of truth
                </span>
                <span className="emp-trust-item">
                  <Icon name="check" size={13} /> Role-based access control
                </span>
                <span className="emp-trust-item">
                  <Icon name="check" size={13} /> Multi-branch live sync
                </span>
              </div>
            </div>

            {/* Visual: Realistic SaaS Employee Directory Dashboard UI (Not generic stock) */}
            <div className="emp-hero-visual">
              <div className="emp-dashboard-window">
                {/* Window top bar */}
                <div className="emp-window-header">
                  <div className="emp-window-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <div className="emp-window-search">
                    <Icon name="search" size={13} />
                    <span>Search 450+ employees, departments, roles...</span>
                  </div>
                  <div className="emp-window-badge">
                    <span className="status-live-pulse" /> Live Directory
                  </div>
                </div>

                {/* Directory Controls */}
                <div className="emp-dir-controls">
                  <div className="emp-dir-tabs">
                    <button
                      type="button"
                      className={`emp-dir-tab ${activeHeroTab === "all" ? "is-active" : ""}`}
                      onClick={() => setActiveHeroTab("all")}
                    >
                      All (450)
                    </button>
                    <button
                      type="button"
                      className={`emp-dir-tab ${activeHeroTab === "engineering" ? "is-active" : ""}`}
                      onClick={() => setActiveHeroTab("engineering")}
                    >
                      Engineering (180)
                    </button>
                    <button
                      type="button"
                      className={`emp-dir-tab ${activeHeroTab === "sales" ? "is-active" : ""}`}
                      onClick={() => setActiveHeroTab("sales")}
                    >
                      Sales (120)
                    </button>
                    <button
                      type="button"
                      className={`emp-dir-tab ${activeHeroTab === "finance" ? "is-active" : ""}`}
                      onClick={() => setActiveHeroTab("finance")}
                    >
                      Finance (45)
                    </button>
                  </div>
                  <span className="emp-add-btn">
                    + Add Employee
                  </span>
                </div>

                {/* Directory List View */}
                <div className="emp-dir-list">
                  {filteredHeroEmployees.map((emp) => (
                    <div key={emp.id} className="emp-dir-row">
                      <div className="emp-avatar" style={{ backgroundColor: emp.avatarBg }}>
                        {emp.initials}
                      </div>
                      <div className="emp-meta">
                        <div className="emp-meta-top">
                          <strong>{emp.name}</strong>
                          <span className="emp-code">{emp.id}</span>
                        </div>
                        <div className="emp-meta-sub">
                          <span>{emp.role}</span>
                          <span className="sep">•</span>
                          <span>{emp.dept}</span>
                        </div>
                      </div>
                      <div className="emp-location">
                        <Icon name="branch" size={12} /> {emp.location}
                      </div>
                      <div className="emp-status-badge">
                        <span className={`emp-pill ${emp.status === "Active" ? "active" : "away"}`}>
                          {emp.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Highlight Strip */}
                <div className="emp-window-footer">
                  <div className="emp-stat-pill">
                    <Icon name="check" size={13} />
                    <span><strong>100%</strong> Profile Completion</span>
                  </div>
                  <div className="emp-stat-pill">
                    <Icon name="shield" size={13} />
                    <span>Bank-Grade Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PROBLEM SECTION (The Challenge)
            ========================================================================= */}
        <section className="emp-section emp-problem-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">THE CHALLENGE</span>
              <h2 className="emp-section-title">
                Employee Data Shouldn't Be Scattered Everywhere
              </h2>
              <p className="emp-section-subhead">
                When employee information is spread across spreadsheets, emails and disconnected systems, even simple HR tasks become difficult to manage.
              </p>
            </div>

            <div className="emp-problem-grid">
              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap">
                  <Icon name="document" size={20} />
                </div>
                <h3 className="emp-problem-title">Scattered Employee Records</h3>
                <p className="emp-problem-desc">
                  Important information is stored in different places, creating duplicate versions, missing files, and data inconsistencies across offices.
                </p>
                <div className="emp-problem-footer">
                  <span className="emp-issue-tag">Spreadsheets & Paper Folders</span>
                </div>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap">
                  <Icon name="clock" size={20} />
                </div>
                <h3 className="emp-problem-title">Time-Consuming HR Tasks</h3>
                <p className="emp-problem-desc">
                  Manual updates and repetitive data entry slow down HR teams, pulling valuable hours away from employee engagement and hiring.
                </p>
                <div className="emp-problem-footer">
                  <span className="emp-issue-tag">Manual Data Re-Entry</span>
                </div>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap">
                  <Icon name="search" size={20} />
                </div>
                <h3 className="emp-problem-title">Limited Workforce Visibility</h3>
                <p className="emp-problem-desc">
                  Finding accurate, up-to-date employee information takes extra effort, delaying approvals, payroll processing, and statutory compliance.
                </p>
                <div className="emp-problem-footer">
                  <span className="emp-issue-tag">Disconnected Branch Info</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SOLUTION OVERVIEW (The Lattium Approach)
            ========================================================================= */}
        <section className="emp-section emp-solution-section">
          <div className="container emp-solution-container">
            <div className="emp-solution-copy">
              <span className="emp-eyebrow">THE LATTIUM APPROACH</span>
              <h2 className="emp-section-title">
                One Reliable Record for Every Employee
              </h2>
              <p className="emp-section-subhead">
                Bring employee information, employment details and HR records together in one organized system, making everyday workforce management simpler and more consistent.
              </p>

              <div className="emp-solution-highlights">
                <div className="emp-solution-highlight-item">
                  <div className="emp-highlight-check">
                    <Icon name="check" size={14} />
                  </div>
                  <div>
                    <strong>Centralized employee database</strong>
                    <p>A single cloud repository for personal records, emergency contacts, statutory IDs, and banking info.</p>
                  </div>
                </div>

                <div className="emp-solution-highlight-item">
                  <div className="emp-highlight-check">
                    <Icon name="check" size={14} />
                  </div>
                  <div>
                    <strong>Easy access to employee profiles</strong>
                    <p>Intuitive self-service portals let team members verify details while managers view direct reports instantly.</p>
                  </div>
                </div>

                <div className="emp-solution-highlight-item">
                  <div className="emp-highlight-check">
                    <Icon name="check" size={14} />
                  </div>
                  <div>
                    <strong>Organized employee lifecycle records</strong>
                    <p>Seamlessly document milestones from candidate onboarding to probation, role transitions, and exit clearances.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual: Prominent Employee Profile Card with Supporting Data Points */}
            <div className="emp-solution-visual">
              <div className="emp-profile-card">
                {/* Header Profile summary */}
                <div className="emp-profile-top">
                  <div className="emp-profile-avatar">PS</div>
                  <div className="emp-profile-info">
                    <div className="emp-profile-name-row">
                      <h3>Priya Sharma</h3>
                      <span className="emp-profile-badge">Permanent Staff</span>
                    </div>
                    <p className="emp-profile-role">Lead Product Designer • Engineering & UX</p>
                    <div className="emp-profile-tags">
                      <span><Icon name="branch" size={11} /> Bengaluru HQ</span>
                      <span><Icon name="employee" size={11} /> Reports to: VP of Product</span>
                    </div>
                  </div>
                </div>

                {/* Profile Tabs */}
                <div className="emp-profile-nav">
                  <button
                    type="button"
                    className={`emp-profile-nav-tab ${activeSolutionTab === "profile" ? "active" : ""}`}
                    onClick={() => setActiveSolutionTab("profile")}
                  >
                    Personal Details
                  </button>
                  <button
                    type="button"
                    className={`emp-profile-nav-tab ${activeSolutionTab === "job" ? "active" : ""}`}
                    onClick={() => setActiveSolutionTab("job")}
                  >
                    Job & Hierarchy
                  </button>
                  <button
                    type="button"
                    className={`emp-profile-nav-tab ${activeSolutionTab === "docs" ? "active" : ""}`}
                    onClick={() => setActiveSolutionTab("docs")}
                  >
                    Documents (4/4)
                  </button>
                  <button
                    type="button"
                    className={`emp-profile-nav-tab ${activeSolutionTab === "timeline" ? "active" : ""}`}
                    onClick={() => setActiveSolutionTab("timeline")}
                  >
                    Timeline
                  </button>
                </div>

                {/* Tab Content Display */}
                <div className="emp-profile-content-area">
                  {activeSolutionTab === "profile" && (
                    <div className="emp-profile-grid">
                      <div className="emp-info-cell">
                        <small>Official Email</small>
                        <span>priya.sharma@lattium.com</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>Direct Phone</small>
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>PAN / Tax ID</small>
                        <span>ABCDE1234F (Verified ✓)</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>Aadhaar / National ID</small>
                        <span>•••• •••• 9012 (Encrypted)</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>Emergency Contact</small>
                        <span>Sunil Sharma (Spouse)</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>Emergency Phone</small>
                        <span>+91 98450 11223</span>
                      </div>
                    </div>
                  )}

                  {activeSolutionTab === "job" && (
                    <div className="emp-profile-grid">
                      <div className="emp-info-cell">
                        <small>Department</small>
                        <span>Product & Experience Design</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>Designation Level</small>
                        <span>Lead Specialist (Grade L5)</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>Work Schedule</small>
                        <span>Standard 9:30 AM – 6:30 PM</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>Direct Reports</small>
                        <span>4 Product Designers</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>Branch Location</small>
                        <span>Bengaluru Technology Park</span>
                      </div>
                      <div className="emp-info-cell">
                        <small>Payroll Entity</small>
                        <span>Lattium Technologies Pvt Ltd</span>
                      </div>
                    </div>
                  )}

                  {activeSolutionTab === "docs" && (
                    <div className="emp-docs-list">
                      <div className="emp-doc-row">
                        <Icon name="document" size={15} />
                        <span>Signed Offer Letter.pdf</span>
                        <span className="emp-doc-status verified">Verified ✓</span>
                      </div>
                      <div className="emp-doc-row">
                        <Icon name="document" size={15} />
                        <span>Government ID & Proof of Address.pdf</span>
                        <span className="emp-doc-status verified">Verified ✓</span>
                      </div>
                      <div className="emp-doc-row">
                        <Icon name="document" size={15} />
                        <span>Educational Degree Certificates.pdf</span>
                        <span className="emp-doc-status verified">Verified ✓</span>
                      </div>
                      <div className="emp-doc-row">
                        <Icon name="document" size={15} />
                        <span>Bank Mandate & Cancelled Cheque.pdf</span>
                        <span className="emp-doc-status verified">Verified ✓</span>
                      </div>
                    </div>
                  )}

                  {activeSolutionTab === "timeline" && (
                    <div className="emp-timeline-list">
                      <div className="emp-timeline-item">
                        <span className="emp-tl-dot" />
                        <div>
                          <strong>Promoted to Lead Product Designer</strong>
                          <small>15 Jan 2024 • Approved by Management</small>
                        </div>
                      </div>
                      <div className="emp-timeline-item">
                        <span className="emp-tl-dot" />
                        <div>
                          <strong>Probation Confirmed & Full Benefits Unlocked</strong>
                          <small>12 Sep 2022 • Performance Rating 4.8/5</small>
                        </div>
                      </div>
                      <div className="emp-timeline-item">
                        <span className="emp-tl-dot" />
                        <div>
                          <strong>Joined as Senior Product Designer</strong>
                          <small>12 Mar 2022 • Onboarding Completed</small>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Card Footer Badge */}
                <div className="emp-profile-bottom">
                  <span className="emp-sync-tag">
                    <Icon name="check" size={12} /> Synced with Attendance & Payroll
                  </span>
                  <span className="emp-audit-stamp">
                    Last audit: Today, 09:30 AM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. KEY FEATURES (Employee Management Capabilities)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="features">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">EMPLOYEE MANAGEMENT CAPABILITIES</span>
              <h2 className="emp-section-title">
                Everything You Need to Manage Employee Records
              </h2>
              <p className="emp-section-subhead">
                Access the essential tools to maintain employee information, manage changes and keep records organized throughout the employee lifecycle.
              </p>
            </div>

            <div className="emp-features-grid">
              {/* Feature 01 */}
              <div className="emp-feature-card">
                <div className="emp-feature-top">
                  <span className="emp-feature-num">01</span>
                  <div className="emp-feature-icon">
                    <Icon name="employee" size={18} />
                  </div>
                </div>
                <h3 className="emp-feature-title">Centralized Employee Profiles</h3>
                <p className="emp-feature-desc">
                  Maintain employee contact details, job information, department, designation and reporting manager in one place.
                </p>
                <div className="emp-feature-meta">
                  <span className="emp-mini-pill">Contact info</span>
                  <span className="emp-mini-pill">Reporting lines</span>
                  <span className="emp-mini-pill">Designations</span>
                </div>
              </div>

              {/* Feature 02 */}
              <div className="emp-feature-card">
                <div className="emp-feature-top">
                  <span className="emp-feature-num">02</span>
                  <div className="emp-feature-icon">
                    <Icon name="users" size={18} />
                  </div>
                </div>
                <h3 className="emp-feature-title">Employee Onboarding</h3>
                <p className="emp-feature-desc">
                  Record new hires and organize the information needed to bring employees into your organization smoothly and efficiently.
                </p>
                <div className="emp-feature-meta">
                  <span className="emp-mini-pill">New hire forms</span>
                  <span className="emp-mini-pill">Checklists</span>
                  <span className="emp-mini-pill">Welcome invites</span>
                </div>
              </div>

              {/* Feature 03 */}
              <div className="emp-feature-card">
                <div className="emp-feature-top">
                  <span className="emp-feature-num">03</span>
                  <div className="emp-feature-icon">
                    <Icon name="upload" size={18} />
                  </div>
                </div>
                <h3 className="emp-feature-title">Bulk Import & Data Management</h3>
                <p className="emp-feature-desc">
                  Add employees using supported bulk uploads and simplify updates to employee records across your entire organization.
                </p>
                <div className="emp-feature-meta">
                  <span className="emp-mini-pill">Excel & CSV</span>
                  <span className="emp-mini-pill">Field mapping</span>
                  <span className="emp-mini-pill">Error alerts</span>
                </div>
              </div>

              {/* Feature 04 */}
              <div className="emp-feature-card">
                <div className="emp-feature-top">
                  <span className="emp-feature-num">04</span>
                  <div className="emp-feature-icon">
                    <Icon name="document" size={18} />
                  </div>
                </div>
                <h3 className="emp-feature-title">Document Management</h3>
                <p className="emp-feature-desc">
                  Keep employee-related documents organized and accessible to authorized users with cloud-backed security and verification.
                </p>
                <div className="emp-feature-meta">
                  <span className="emp-mini-pill">ID proofs</span>
                  <span className="emp-mini-pill">Offer letters</span>
                  <span className="emp-mini-pill">Encrypted vault</span>
                </div>
              </div>

              {/* Feature 05 */}
              <div className="emp-feature-card">
                <div className="emp-feature-top">
                  <span className="emp-feature-num">05</span>
                  <div className="emp-feature-icon">
                    <Icon name="clock" size={18} />
                  </div>
                </div>
                <h3 className="emp-feature-title">Employee Lifecycle Tracking</h3>
                <p className="emp-feature-desc">
                  Maintain employee status and employment records as people join, move within or leave the organization.
                </p>
                <div className="emp-feature-meta">
                  <span className="emp-mini-pill">Probations</span>
                  <span className="emp-mini-pill">Promotions</span>
                  <span className="emp-mini-pill">Exit clearances</span>
                </div>
              </div>

              {/* Feature 06 */}
              <div className="emp-feature-card">
                <div className="emp-feature-top">
                  <span className="emp-feature-num">06</span>
                  <div className="emp-feature-icon">
                    <Icon name="search" size={18} />
                  </div>
                </div>
                <h3 className="emp-feature-title">Search, Filters & Directory</h3>
                <p className="emp-feature-desc">
                  Find employees using relevant details and filter records to quickly locate the right information across teams and branches.
                </p>
                <div className="emp-feature-meta">
                  <span className="emp-mini-pill">Real-time search</span>
                  <span className="emp-mini-pill">Branch filters</span>
                  <span className="emp-mini-pill">Role filters</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. HOW IT WORKS (A Simpler Workflow)
            ========================================================================= */}
        <section className="emp-section emp-workflow-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">A SIMPLER WORKFLOW</span>
              <h2 className="emp-section-title">
                From Employee Onboarding to Organized Records
              </h2>
              <p className="emp-section-subhead">
                A simple four-step horizontal process designed to keep your workforce records synchronized from day one.
              </p>
            </div>

            <div className="emp-steps-row">
              <div className="emp-step-card">
                <div className="emp-step-number">01</div>
                <div className="emp-step-icon">
                  <Icon name="upload" size={18} />
                </div>
                <h3 className="emp-step-title">Add</h3>
                <p className="emp-step-desc">
                  Create an employee record or import supported data.
                </p>
              </div>

              <div className="emp-step-connector" />

              <div className="emp-step-card">
                <div className="emp-step-number">02</div>
                <div className="emp-step-icon">
                  <Icon name="document" size={18} />
                </div>
                <h3 className="emp-step-title">Organize</h3>
                <p className="emp-step-desc">
                  Maintain job details, documents and employee information.
                </p>
              </div>

              <div className="emp-step-connector" />

              <div className="emp-step-card">
                <div className="emp-step-number">03</div>
                <div className="emp-step-icon">
                  <Icon name="setup" size={18} />
                </div>
                <h3 className="emp-step-title">Manage</h3>
                <p className="emp-step-desc">
                  Update records as employee details and roles change.
                </p>
              </div>

              <div className="emp-step-connector" />

              <div className="emp-step-card">
                <div className="emp-step-number">04</div>
                <div className="emp-step-icon">
                  <Icon name="chart" size={18} />
                </div>
                <h3 className="emp-step-title">Track</h3>
                <p className="emp-step-desc">
                  Access up-to-date employee information when needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. BUSINESS BENEFITS (The Impact)
            ========================================================================= */}
        <section className="emp-section emp-benefits-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">THE IMPACT</span>
              <h2 className="emp-section-title">
                Less Administrative Work. More Organized HR.
              </h2>
              <p className="emp-section-subhead">
                Empower your organization with accurate records, streamlined daily updates, and transparent workforce coordination.
              </p>
            </div>

            <div className="emp-benefits-grid">
              <div className="emp-benefit-card">
                <div className="emp-benefit-icon">
                  <Icon name="clock" size={22} />
                </div>
                <h3 className="emp-benefit-title">Reduce repetitive employee data entry</h3>
                <p className="emp-benefit-desc">
                  Eliminate multiple spreadsheets and manual re-typing by allowing employees to update their own profiles with administrative verification.
                </p>
              </div>

              <div className="emp-benefit-card">
                <div className="emp-benefit-icon">
                  <Icon name="check" size={22} />
                </div>
                <h3 className="emp-benefit-title">Improve consistency across employee records</h3>
                <p className="emp-benefit-desc">
                  Enforce standard fields, uniform document requirements, and single-source-of-truth records across regional branches.
                </p>
              </div>

              <div className="emp-benefit-card">
                <div className="emp-benefit-icon">
                  <Icon name="search" size={22} />
                </div>
                <h3 className="emp-benefit-title">Help HR teams find information more efficiently</h3>
                <p className="emp-benefit-desc">
                  Instant search, branch filtering, and centralized document archives allow HR managers to pull reports and answers in seconds.
                </p>
              </div>

              <div className="emp-benefit-card">
                <div className="emp-benefit-icon">
                  <Icon name="users" size={22} />
                </div>
                <h3 className="emp-benefit-title">Support better coordination between HR and managers</h3>
                <p className="emp-benefit-desc">
                  Managers get transparent visibility into direct reports, probation status, and team contacts, improving everyday collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CONNECTED HRMS MODULES (Works Better Together)
            ========================================================================= */}
        <section className="emp-section emp-connected-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">WORKS BETTER TOGETHER</span>
              <h2 className="emp-section-title">
                Employee Management Is Just the Beginning
              </h2>
              <p className="emp-section-subhead">
                Connect employee records with related HR workflows across the Lattium platform.
              </p>
            </div>

            <div className="emp-modules-grid">
              {/* Module 1: Attendance */}
              <Link to="/features/attendance-management" className="emp-module-card">
                <div className="emp-module-header">
                  <div className="emp-module-icon">
                    <Icon name="attendance" size={20} />
                  </div>
                  <span className="emp-module-arrow">
                    <Icon name="arrow" size={14} />
                  </span>
                </div>
                <h3 className="emp-module-title">Attendance Management</h3>
                <p className="emp-module-desc">
                  Capture live biometric punches, geofenced mobile check-ins, and shift schedules tied directly to employee profiles.
                </p>
                <span className="emp-module-link">
                  Explore Attendance →
                </span>
              </Link>

              {/* Module 2: Leave */}
              <Link to="/features/leave-management" className="emp-module-card">
                <div className="emp-module-header">
                  <div className="emp-module-icon">
                    <Icon name="leave" size={20} />
                  </div>
                  <span className="emp-module-arrow">
                    <Icon name="arrow" size={14} />
                  </span>
                </div>
                <h3 className="emp-module-title">Leave Management</h3>
                <p className="emp-module-desc">
                  Track leave balances, auto-calculate entitlements, and route multi-level manager approvals without paperwork.
                </p>
                <span className="emp-module-link">
                  Explore Leave →
                </span>
              </Link>

              {/* Module 3: Payroll */}
              <Link to="/features/payroll-management" className="emp-module-card">
                <div className="emp-module-header">
                  <div className="emp-module-icon">
                    <Icon name="payroll" size={20} />
                  </div>
                  <span className="emp-module-arrow">
                    <Icon name="arrow" size={14} />
                  </span>
                </div>
                <h3 className="emp-module-title">Payroll Management</h3>
                <p className="emp-module-desc">
                  Disburse accurate salaries with automatic statutory calculations, PF, ESI, and tax deductions linked to worker data.
                </p>
                <span className="emp-module-link">
                  Explore Payroll →
                </span>
              </Link>

              {/* Module 4: Performance */}
              <Link to="/features/performance-management" className="emp-module-card">
                <div className="emp-module-header">
                  <div className="emp-module-icon">
                    <Icon name="award" size={20} />
                  </div>
                  <span className="emp-module-arrow">
                    <Icon name="arrow" size={14} />
                  </span>
                </div>
                <h3 className="emp-module-title">Performance Management</h3>
                <p className="emp-module-desc">
                  Set organizational goals, conduct periodic appraisals, and log career growth histories right in each employee file.
                </p>
                <span className="emp-module-link">
                  Explore Performance →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FAQ SECTION (Frequently Asked Questions)
            ========================================================================= */}
        <section className="emp-section emp-faq-section" id="faqs">
          <div className="container emp-faq-container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
              <h2 className="emp-section-title">Employee Management FAQs</h2>
              <p className="emp-section-subhead">
                Common questions about managing employee records, data privacy, bulk onboarding, and system integrations.
              </p>
            </div>

            <div className="emp-faq-accordion">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`emp-faq-item ${isOpen ? "is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className="emp-faq-question"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <span className="emp-faq-toggle-icon">
                        <Icon name={isOpen ? "chevron" : "chevron-down"} size={16} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="emp-faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            BOTTOM CONVERSION CTA BANNER
            ========================================================================= */}
        <section className="emp-final-cta-section">
          <div className="container">
            <div className="emp-final-cta-card">
              <div className="emp-final-cta-content">
                <span className="emp-eyebrow">READY TO ORGANIZE YOUR WORKFORCE?</span>
                <h2 className="emp-final-cta-title">
                  One Unified Record for Every Employee, Today
                </h2>
                <p className="emp-final-cta-desc">
                  See how Lattium eliminates spreadsheet chaos and connects your entire HR lifecycle from onboarding to payroll.
                </p>
                <div className="emp-final-cta-actions">
                  <button
                    type="button"
                    onClick={() =>
                      openDemoModal({
                        title: "Book an Employee Management Demo",
                        subtitle: "Get a customized 30-minute walkthrough tailored to your headcount and branch structure.",
                      })
                    }
                    className="emp-btn emp-btn-primary"
                  >
                    Request a Demo <Icon name="arrow" size={15} />
                  </button>
                  <Link to="/contact" className="emp-btn emp-btn-secondary">
                    Talk to an Expert
                  </Link>
                </div>
                <div className="emp-final-cta-badges">
                  <span><Icon name="check" size={13} /> Free 30-min walkthrough</span>
                  <span><Icon name="check" size={13} /> Custom migration support</span>
                  <span><Icon name="check" size={13} /> Zero obligation</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default EmployeeManagementPage;
