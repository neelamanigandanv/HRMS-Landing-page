import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";

const faqList = [
  {
    question: "How long does setup take?",
    answer:
      "Most teams go live in 2–4 weeks. Your dedicated implementation specialist handles configuration, data import, and team training.",
  },
  {
    question: "Can LattiumHR handle multiple branches?",
    answer:
      "Yes. Create branch-specific policies, holiday calendars, roles, and dashboards while keeping a unified company-wide view.",
  },
  {
    question: "Is payroll compliant with statutory regulations?",
    answer:
      "Yes. Payroll supports PF, ESI, PT, TDS, and other statutory requirements with ready-to-use reports.",
  },
  {
    question: "Can employees use it on mobile?",
    answer:
      "Absolutely. Employees can mark attendance, apply for leave, download payslips, and submit expenses from any device.",
  },
  {
    question: "What support do we get after launch?",
    answer:
      "Every plan includes guided onboarding and ongoing customer support. Professional and Enterprise plans include priority support.",
  },
];

const branchPillars = [
  {
    id: "centralized",
    icon: "building" as const,
    title: "Centralized Workforce Management",
    desc: "Keep employee records and workforce information organized across all your branches.",
    image: "/images/branch-hq.jpg",
    alt: "Centralized workforce management operations monitoring distributed branches",
  },
  {
    id: "branch-control",
    icon: "setup" as const,
    title: "Branch-Level Control",
    desc: "Let branch managers handle day-to-day HR activities with permissions suited to their roles.",
    image: "/images/branch-regional.jpg",
    alt: "Branch managers handling local team activities with role-based permissions",
  },
  {
    id: "consistent-ops",
    icon: "attendance" as const,
    title: "Consistent HR Operations",
    desc: "Maintain consistent attendance, leave and workforce processes across every location.",
    image: "/images/branch-biometric.jpg",
    alt: "Consistent attendance and leave synchronization across all locations",
  },
  {
    id: "visibility",
    icon: "chart" as const,
    title: "Real-Time Workforce Visibility",
    desc: "Get a clearer view of employee activity and HR operations across your organization.",
    image: "/images/branch-payroll.jpg",
    alt: "Executive dashboard showing real-time workforce visibility across the organization",
  },
];

export function SolutionsOverview() {
  const breadcrumbs = [{ label: "Solutions" }];
  const { openDemoModal } = useDemoModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeBranchIndex, setActiveBranchIndex] = useState(0);
  const [isBranchAutoPaused, setIsBranchAutoPaused] = useState(false);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  useEffect(() => {
    if (isBranchAutoPaused) return;
    const interval = setInterval(() => {
      setActiveBranchIndex((prev) => (prev + 1) % branchPillars.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [isBranchAutoPaused]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section");
    sections.forEach((section) => section.classList.add("reveal-section"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout breadcrumbs={breadcrumbs} onOpenDemo={() => openDemoModal()}>
      <SEO
        title="Solutions Overview | Tailored HRMS for Your Business Stage & Role | LattiumHR"
        description="Software that adapts to your organization—not the other way around. Explore LattiumHR solutions for small businesses, mid-sized teams, enterprises, HR managers, and multi-location footprints."
        canonicalPath="/solutions"
      />

      <div className="solutions-overview-page">
        {/* =================================================================
            1. HERO SECTION (CENTERED)
            ================================================================= */}
        <section className="so-hero-section">
          <div className="so-hero-ambient-glow" />
          <div className="container so-hero-centered-wrap">
            <div className="so-hero-copy">
              <span className="so-eyebrow-badge">
                <i>
                  <Icon name="sparkle" size={14} />
                </i>
                TAILORED WORKFLOWS
              </span>
              <h1 className="so-hero-title">
                Software That <em>Adapts to Your Organization</em> — Not the Other Way Around
              </h1>
              <p className="so-hero-lead">
                From fast-growing teams to distributed multi-branch enterprises,
                explore how LattiumHR unifies workforce operations, attendance, and payroll.
              </p>
              <div className="so-hero-actions">
                <Button onClick={() => openDemoModal()}>
                  Book a Free Demo <Icon name="arrow" size={16} />
                </Button>
                <Button href="#stages" secondary className="so-hero-btn-secondary">
                  Explore Solutions
                </Button>
              </div>

              {/* Trust & Proof Bar */}
              <div className="so-hero-proof-bar">
                <div className="so-proof-item">
                  <span className="so-proof-num">500+</span>
                  <span className="so-proof-label">Growing businesses</span>
                </div>
                <div className="so-proof-sep" />
                <div className="so-proof-item">
                  <span className="so-proof-num">99.8%</span>
                  <span className="so-proof-label">Statutory compliance</span>
                </div>
                <div className="so-proof-sep" />
                <div className="so-proof-item">
                  <span className="so-proof-num">2 Weeks</span>
                  <span className="so-proof-label">Average deployment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. SOLUTIONS BY COMPANY STAGE
            ================================================================= */}
        <section className="so-section so-section--alt" id="stages">
          <div className="container">
            <SectionHeading
              eyebrow="SOLUTIONS BY BUSINESS SIZE"
              title="Built to Scale Across Every Growth Milestone"
              center
            />

            <div className="so-stages-grid">
              {/* Card 1: Small Business */}
              <div
                className="so-stage-card"
                onMouseEnter={() => setHoveredStage(0)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <div className="so-stage-card-top">
                  <div className="so-card-icon-wrap">
                    <Icon name="zap" size={20} />
                  </div>
                  <span className="so-stage-emp-pill">Small Business</span>
                </div>

                <h3 className="so-card-title">Simplify HR. Focus on Growth.</h3>

                <p className="so-card-desc">
                  Manage employee records, attendance, leave and payroll in one place without the burden of manual HR processes.
                </p>

                <ul className="so-checklist">
                  <li className="so-checklist-item">
                    <span className="so-check-ico">✓</span>
                    <span>Organize employee information</span>
                  </li>
                  <li className="so-checklist-item">
                    <span className="so-check-ico">✓</span>
                    <span>Simplify everyday HR tasks</span>
                  </li>
                  <li className="so-checklist-item">
                    <span className="so-check-ico">✓</span>
                    <span>Keep attendance and leave records in sync</span>
                  </li>
                </ul>

                <Link to="/solutions/small-businesses" className="so-card-link-btn">
                  Explore Solutions →
                </Link>
              </div>

              {/* Card 2: Mid-Sized Business */}
              <div
                className={`so-stage-card ${hoveredStage === null || hoveredStage === 1 ? "so-stage-card--featured" : ""}`}
                onMouseEnter={() => setHoveredStage(1)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <div className="so-stage-card-top">
                  <div className="so-card-icon-wrap">
                    <Icon name="chart" size={20} />
                  </div>
                  <span className="so-stage-emp-pill">Mid-Sized Business</span>
                </div>

                <h3 className="so-card-title">Automate Work. Empower Teams.</h3>

                <p className="so-card-desc">
                  Connect HR workflows, reduce repetitive tasks and give managers better visibility into employee operations as your workforce grows.
                </p>

                <ul className="so-checklist">
                  <li className="so-checklist-item">
                    <span className="so-check-ico">✓</span>
                    <span>Automate routine HR workflows</span>
                  </li>
                  <li className="so-checklist-item">
                    <span className="so-check-ico">✓</span>
                    <span>Coordinate teams and departments</span>
                  </li>
                  <li className="so-checklist-item">
                    <span className="so-check-ico">✓</span>
                    <span>Improve workforce visibility</span>
                  </li>
                </ul>

                <Link to="/solutions/mid-sized-businesses" className="so-card-link-btn">
                  Explore Solutions →
                </Link>
              </div>

              {/* Card 3: Enterprise */}
              <div
                className="so-stage-card"
                onMouseEnter={() => setHoveredStage(2)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <div className="so-stage-card-top">
                  <div className="so-card-icon-wrap">
                    <Icon name="building" size={20} />
                  </div>
                  <span className="so-stage-emp-pill">Enterprise</span>
                </div>

                <h3 className="so-card-title">Control Complexity. Scale with Confidence.</h3>

                <p className="so-card-desc">
                  Manage complex organizational structures, multiple entities, locations and role-based access through a connected HRMS platform.
                </p>

                <ul className="so-checklist">
                  <li className="so-checklist-item">
                    <span className="so-check-ico">✓</span>
                    <span>Manage multiple entities and locations</span>
                  </li>
                  <li className="so-checklist-item">
                    <span className="so-check-ico">✓</span>
                    <span>Control access with role-based permissions</span>
                  </li>
                  <li className="so-checklist-item">
                    <span className="so-check-ico">✓</span>
                    <span>Centralize workforce information</span>
                  </li>
                </ul>

                <Link to="/solutions/enterprises" className="so-card-link-btn">
                  Explore Solutions →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. FUNCTIONAL LEADERSHIP SOLUTIONS (EXACT REFERENCE PARITY WITH PRIMARY THEME)
            ================================================================= */}
        <section className="so-fl-section" id="roles">
          <div className="container">
            <SectionHeading
              eyebrow="FUNCTIONAL LEADERSHIP SOLUTIONS"
              title="Tailored Solutions for Functional Leaders"
              center
            />

            <div className="so-fl-cards-stack">
              {/* Card 1: HR Teams */}
              <div className="so-fl-card so-fl-card--hr">
                <div className="so-fl-card-grid">
                  {/* Left Column: HR Copy */}
                  <div className="so-fl-copy-col">
                    <div className="so-fl-role-badge">
                      <span className="so-fl-badge-icon">
                        <Icon name="employee" size={13} />
                      </span>
                      <span>HR TEAMS</span>
                    </div>

                    <h3 className="so-fl-card-title">Simplify People Operations</h3>

                    <p className="so-fl-card-desc">
                      Manage your employees, attendance, leave, and documents — all in one place. Spend less time on manual work and more time building a better employee experience.
                    </p>

                    <div className="so-fl-checklist-2col">
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Employee lifecycle management</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Documents &amp; compliance</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Attendance &amp; leave tracking</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Self-service portal</span>
                      </div>
                    </div>

                    <Link to="/solutions/hr-teams" className="so-card-link-btn">
                      Explore HR Solutions →
                    </Link>
                  </div>

                  {/* Right Column: HR Mockup Console */}
                  <div className="so-fl-mockup-wrapper">
                    <div className="so-fl-mockup-window">
                      {/* Mini Sidebar */}
                      <div className="so-fl-sidebar">
                        <div className="so-fl-logo">
                          <span className="so-fl-logo-diamond">◆</span>
                          <span className="so-fl-logo-text">LattiumHR</span>
                        </div>
                        <div className="so-fl-nav">
                          <div className="so-fl-nav-item active">
                            <Icon name="chart" size={11} />
                            <span>Dashboard</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="users" size={11} />
                            <span>Employees</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="attendance" size={11} />
                            <span>Attendance</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="leave" size={11} />
                            <span>Leave</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="document" size={11} />
                            <span>Documents</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="reports" size={11} />
                            <span>Reports</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Console Content */}
                      <div className="so-fl-main-body">
                        {/* Header bar */}
                        <div className="so-fl-console-topbar">
                          <div>
                            <div className="so-fl-greeting">Good morning, Kavya 👋</div>
                            <div className="so-fl-greeting-sub">Here’s what’s happening today</div>
                          </div>
                          <div className="so-fl-topbar-right">
                            <div className="so-fl-search-box">
                              <Icon name="search" size={10} />
                              <span>Search employees...</span>
                            </div>
                            <span className="so-fl-user-avatar">KS</span>
                          </div>
                        </div>

                        {/* 3 Metric Stat Cards */}
                        <div className="so-fl-stats-row">
                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-ico so-fl-stat-ico--green">
                                <Icon name="users" size={11} />
                              </span>
                              <span className="so-fl-stat-name">Total Employees</span>
                            </div>
                            <div className="so-fl-stat-val">248</div>
                            <div className="so-fl-stat-badge so-fl-stat-badge--green">↑ 12 this month</div>
                          </div>

                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-ico so-fl-stat-ico--plum">
                                <Icon name="attendance" size={11} />
                              </span>
                              <span className="so-fl-stat-name">Present Today</span>
                            </div>
                            <div className="so-fl-stat-val">221</div>
                            <div className="so-fl-stat-sub">88% attendance</div>
                          </div>

                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-ico so-fl-stat-ico--amber">
                                <Icon name="leave" size={11} />
                              </span>
                              <span className="so-fl-stat-name">On Leave</span>
                            </div>
                            <div className="so-fl-stat-val">08</div>
                            <div className="so-fl-stat-badge so-fl-stat-badge--amber">3 pending</div>
                          </div>
                        </div>

                        {/* Recent Employees Table */}
                        <div className="so-fl-table-card">
                          <div className="so-fl-table-header-row">
                            <span className="so-fl-table-title">Recent Employees</span>
                            <span className="so-fl-table-viewall">View all →</span>
                          </div>
                          <div className="so-fl-table-head-cols">
                            <span>Name</span>
                            <span>Department</span>
                            <span>Status</span>
                            <span>Join Date</span>
                          </div>
                          <div className="so-fl-table-rows">
                            <div className="so-fl-table-row">
                              <div className="so-fl-emp-info">
                                <span className="so-fl-emp-pic so-fl-emp-pic--1">PS</span>
                                <div>
                                  <div className="so-fl-emp-name">Priya Sharma</div>
                                  <div className="so-fl-emp-role">Product Designer</div>
                                </div>
                              </div>
                              <span className="so-fl-dept-name">Product Design</span>
                              <span><span className="so-fl-status-pill present">Present</span></span>
                              <span className="so-fl-date">Apr 12, 2025</span>
                            </div>

                            <div className="so-fl-table-row">
                              <div className="so-fl-emp-info">
                                <span className="so-fl-emp-pic so-fl-emp-pic--2">RM</span>
                                <div>
                                  <div className="so-fl-emp-name">Rohan Mehta</div>
                                  <div className="so-fl-emp-role">Sales Executive</div>
                                </div>
                              </div>
                              <span className="so-fl-dept-name">Sales</span>
                              <span><span className="so-fl-status-pill present">Present</span></span>
                              <span className="so-fl-date">Apr 06, 2025</span>
                            </div>

                            <div className="so-fl-table-row">
                              <div className="so-fl-emp-info">
                                <span className="so-fl-emp-pic so-fl-emp-pic--3">SI</span>
                                <div>
                                  <div className="so-fl-emp-name">Sneha Iyer</div>
                                  <div className="so-fl-emp-role">HR Executive</div>
                                </div>
                              </div>
                              <span className="so-fl-dept-name">HR</span>
                              <span><span className="so-fl-status-pill leave">On leave</span></span>
                              <span className="so-fl-date">Apr 02, 2025</span>
                            </div>

                            <div className="so-fl-table-row">
                              <div className="so-fl-emp-info">
                                <span className="so-fl-emp-pic so-fl-emp-pic--4">VN</span>
                                <div>
                                  <div className="so-fl-emp-name">Vikram Nair</div>
                                  <div className="so-fl-emp-role">Software Engineer</div>
                                </div>
                              </div>
                              <span className="so-fl-dept-name">Engineering</span>
                              <span><span className="so-fl-status-pill present">Present</span></span>
                              <span className="so-fl-date">Mar 28, 2025</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating badge on right with curved noodle connector */}
                    <div className="so-fl-floating-tag so-fl-floating-tag--hr">
                      <span className="so-fl-tag-ico">
                        <Icon name="check" size={11} />
                      </span>
                      <span>Faster approvals →</span>
                    </div>
                    <svg className="so-fl-noodle-line" viewBox="0 0 65 95" fill="none">
                      <path d="M 2 15 C 30 10, 52 35, 48 58 C 44 78, 12 80, 24 55 C 32 38, 52 42, 62 25" stroke="#7b2958" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Line Divider Between Cards */}
              <div className="so-fl-card-divider" />

              {/* Card 2: Finance Teams (Image Left, Text Right) */}
              <div className="so-fl-card so-fl-card--finance so-fl-card--reverse">
                <div className="so-fl-card-grid">
                  {/* Left Column: Finance Mockup Console */}
                  <div className="so-fl-mockup-wrapper">
                    <div className="so-fl-mockup-window">
                      {/* Mini Sidebar */}
                      <div className="so-fl-sidebar">
                        <div className="so-fl-logo">
                          <span className="so-fl-logo-diamond">◆</span>
                          <span className="so-fl-logo-text">LattiumHR</span>
                        </div>
                        <div className="so-fl-nav">
                          <div className="so-fl-nav-item">
                            <Icon name="chart" size={11} />
                            <span>Dashboard</span>
                          </div>
                          <div className="so-fl-nav-item active">
                            <Icon name="payroll" size={11} />
                            <span>Payroll</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="reports" size={11} />
                            <span>Reports</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="finance" size={11} />
                            <span>Finance</span>
                          </div>
                          <div className="so-fl-nav-item">
                            <Icon name="setup" size={11} />
                            <span>Settings</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Console Content */}
                      <div className="so-fl-main-body">
                        {/* Header bar */}
                        <div className="so-fl-console-topbar">
                          <div className="so-fl-payroll-heading">Payroll Overview</div>
                          <div className="so-fl-month-dropdown">
                            <Icon name="calendar" size={10} />
                            <span>Apr 2025</span>
                            <span className="so-fl-dropdown-arrow">∨</span>
                          </div>
                        </div>

                        {/* 3 Metric Stat Cards */}
                        <div className="so-fl-stats-row">
                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-name">Total Payroll</span>
                            </div>
                            <div className="so-fl-stat-val">₹ 48,75,000</div>
                            <div className="so-fl-stat-badge so-fl-stat-badge--green">↑ 2.5% vs last month</div>
                          </div>

                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-name">Processed</span>
                            </div>
                            <div className="so-fl-stat-val">248</div>
                            <div className="so-fl-stat-sub">employees</div>
                          </div>

                          <div className="so-fl-stat-box">
                            <div className="so-fl-stat-head">
                              <span className="so-fl-stat-name">Pending Approvals</span>
                            </div>
                            <div className="so-fl-stat-val so-fl-stat-val--amber">2</div>
                            <div className="so-fl-stat-badge so-fl-stat-badge--amber">items</div>
                          </div>
                        </div>

                        {/* Lower Dual Grid: Donut Chart Breakdown + Quick Actions */}
                        <div className="so-fl-fin-lower-grid">
                          {/* Payroll Breakdown Donut Chart */}
                          <div className="so-fl-donut-panel">
                            <div className="so-fl-panel-title">Payroll Breakdown</div>
                            <div className="so-fl-donut-content">
                              <div className="so-fl-donut-svg-wrap">
                                <svg viewBox="0 0 100 100" className="so-fl-donut-svg">
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="13" />
                                  {/* Basic: 62% */}
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#7b2958" strokeWidth="13"
                                    strokeDasharray="148 238.76" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                                  {/* Allowances: 18% */}
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#a83b74" strokeWidth="13"
                                    strokeDasharray="43 238.76" strokeDashoffset="-148" transform="rotate(-90 50 50)" />
                                  {/* Deductions: 12% */}
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#ba8ec5" strokeWidth="13"
                                    strokeDasharray="28.6 238.76" strokeDashoffset="-191" transform="rotate(-90 50 50)" />
                                  {/* Other: 8% */}
                                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="13"
                                    strokeDasharray="19.1 238.76" strokeDashoffset="-219.6" transform="rotate(-90 50 50)" />
                                </svg>
                                <div className="so-fl-donut-center-text">
                                  <span className="amount">₹48.75L</span>
                                  <span className="lbl">Total</span>
                                </div>
                              </div>

                              <div className="so-fl-donut-legend">
                                <div className="so-fl-legend-item">
                                  <span className="dot" style={{ background: "#7b2958" }} />
                                  <span className="name">Basic Salary</span>
                                  <span className="pct">62%</span>
                                </div>
                                <div className="so-fl-legend-item">
                                  <span className="dot" style={{ background: "#a83b74" }} />
                                  <span className="name">Allowances</span>
                                  <span className="pct">18%</span>
                                </div>
                                <div className="so-fl-legend-item">
                                  <span className="dot" style={{ background: "#ba8ec5" }} />
                                  <span className="name">Deductions</span>
                                  <span className="pct">12%</span>
                                </div>
                                <div className="so-fl-legend-item">
                                  <span className="dot" style={{ background: "#f59e0b" }} />
                                  <span className="name">Other</span>
                                  <span className="pct">8%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions Panel */}
                          <div className="so-fl-actions-panel">
                            <div className="so-fl-panel-title">Quick Actions</div>
                            <div className="so-fl-action-items">
                              <div className="so-fl-action-btn">
                                <span className="so-fl-action-icon so-fl-action-icon--pink">
                                  <Icon name="zap" size={11} />
                                </span>
                                <span className="so-fl-action-label">Run Payroll</span>
                                <span className="so-fl-action-arrow">→</span>
                              </div>
                              <div className="so-fl-action-btn">
                                <span className="so-fl-action-icon so-fl-action-icon--purple">
                                  <Icon name="document" size={11} />
                                </span>
                                <span className="so-fl-action-label">Generate Reports</span>
                                <span className="so-fl-action-arrow">→</span>
                              </div>
                              <div className="so-fl-action-btn">
                                <span className="so-fl-action-icon so-fl-action-icon--purple">
                                  <Icon name="finance" size={11} />
                                </span>
                                <span className="so-fl-action-label">View Payslips</span>
                                <span className="so-fl-action-arrow">→</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating badge on right */}
                    <div className="so-fl-floating-tag so-fl-floating-tag--fin">
                      <span className="so-fl-tag-ico so-fl-tag-ico--fin">
                        <Icon name="chart" size={11} />
                      </span>
                      <span>Better visibility →</span>
                    </div>
                  </div>

                  {/* Right Column: Finance Copy */}
                  <div className="so-fl-copy-col">
                    <div className="so-fl-role-badge so-fl-role-badge--fin">
                      <span className="so-fl-badge-icon">
                        <Icon name="wallet" size={13} />
                      </span>
                      <span>FINANCE TEAMS</span>
                    </div>

                    <h3 className="so-fl-card-title">Gain Financial Clarity</h3>

                    <p className="so-fl-card-desc">
                      Streamline payroll processing, improve cost visibility, and simplify reporting — so your finance team can focus on what matters most.
                    </p>

                    <div className="so-fl-checklist-2col">
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Payroll processing</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Reports &amp; audit trails</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Cost &amp; budget visibility</span>
                      </div>
                      <div className="so-fl-check-item">
                        <span className="so-fl-check-dot">✓</span>
                        <span>Statutory compliance</span>
                      </div>
                    </div>

                    <Link to="/solutions/finance-teams" className="so-card-link-btn">
                      Explore Finance Solutions →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            4. MIDDLE CTA SECTION (Above Distributed Branch Architecture)
            ================================================================= */}
        <section className="so-middle-cta-section">
          <div className="container">
            <div className="so-middle-cta-banner">
              <div className="so-middle-cta-grid">
                {/* Left Side: Multi-Entity Global Network Architecture Image */}
                <div className="so-middle-cta-img-wrap">
                  <img
                    src="/images/middle-cta-network.jpg"
                    alt="Multi-Entity Management global data network hub"
                    className="so-middle-cta-img"
                    loading="lazy"
                  />
                </div>

                {/* Right Side: Text Content and Button */}
                <div className="so-middle-cta-content">
                  <span className="so-cta-eyebrow">
                    <Icon name="globe" size={13} /> MULTI-ENTITY HRMS
                  </span>
                  <h2 className="so-middle-cta-title">
                    One HRMS for Every <br />
                    Branch <span className="so-cta-title-accent">&amp; Country</span>
                  </h2>
                  <p className="so-middle-cta-desc">
                    Run payroll, attendance and compliance for all your locations from one dashboard. See how it fits your team in a free walkthrough.
                  </p>

                  <div className="so-middle-cta-actions">
                    <button
                      type="button"
                      onClick={() =>
                        openDemoModal({
                          title: "Get Free HRMS Plan",
                          subtitle: "Run payroll, attendance and compliance for all your locations from one dashboard in a 30-min walkthrough",
                        })
                      }
                      className="so-middle-cta-btn"
                    >
                      Get Free HRMS Plan <Icon name="arrow" size={15} />
                    </button>
                  </div>

                  <div className="so-cta-points-row">
                    <span className="so-cta-point">
                      <Icon name="check" size={13} /> 30-min walkthrough
                    </span>
                    <span className="so-cta-point">
                      <Icon name="check" size={13} /> Custom migration plan
                    </span>
                    <span className="so-cta-point">
                      <Icon name="check" size={13} /> Zero obligation
                    </span>
                  </div>
                </div>
              </div>

              {/* Ambient bottom-right sparkle */}
              <div className="so-cta-sparkle" aria-hidden="true">
                <Icon name="sparkle" size={20} />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            5. STANDALONE MULTI-BRANCH NETWORK ARCHITECTURE SECTION
            ================================================================= */}
        <section className="so-section so-multibranch-section" id="multi-branch">
          <div className="container">
            <SectionHeading
              eyebrow="DISTRIBUTED BRANCH ARCHITECTURE"
              title="Every Branch Connected. Every Team in Sync."
              body="Manage employees, attendance and HR operations across multiple locations from one centralized platform—while giving each branch the access and visibility it needs."
              center
            />

            <div
              className="so-branch-showcase"
              onMouseEnter={() => setIsBranchAutoPaused(true)}
              onMouseLeave={() => setIsBranchAutoPaused(false)}
            >
              <div className="so-branch-quad-grid">
                {/* Left Side: Top-Left & Bottom-Left */}
                <div className="so-branch-side-col so-branch-side--left">
                  {/* Top-Left Corner */}
                  <div
                    className={`so-branch-corner-card ${activeBranchIndex === 0 ? "is-active" : ""}`}
                    onClick={() => setActiveBranchIndex(0)}
                    onMouseEnter={() => setActiveBranchIndex(0)}
                    role="button"
                    tabIndex={0}
                    aria-label={branchPillars[0].title}
                  >
                    <div className="so-branch-icon-bubble">
                      <Icon name={branchPillars[0].icon} size={18} />
                    </div>
                    <h3 className="so-branch-corner-title">{branchPillars[0].title}</h3>
                    <p className="so-branch-corner-desc">{branchPillars[0].desc}</p>
                    <div className="so-branch-card-action">
                      <Link to="/solutions/multi-location" className="so-branch-card-btn">
                        Explore Multi-Branch Solutions <Icon name="arrow" size={13} />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom-Left Corner */}
                  <div
                    className={`so-branch-corner-card ${activeBranchIndex === 2 ? "is-active" : ""}`}
                    onClick={() => setActiveBranchIndex(2)}
                    onMouseEnter={() => setActiveBranchIndex(2)}
                    role="button"
                    tabIndex={0}
                    aria-label={branchPillars[2].title}
                  >
                    <div className="so-branch-icon-bubble">
                      <Icon name={branchPillars[2].icon} size={18} />
                    </div>
                    <h3 className="so-branch-corner-title">{branchPillars[2].title}</h3>
                    <p className="so-branch-corner-desc">{branchPillars[2].desc}</p>
                    <div className="so-branch-card-action">
                      <Link to="/solutions/multi-location" className="so-branch-card-btn">
                        Explore Multi-Branch Solutions <Icon name="arrow" size={13} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Center Column: Modern Rounded Display Frame */}
                <div className="so-branch-center-col">
                  <div className="so-branch-display-frame">
                    <div className="so-branch-display-ambient" />
                    <div className="so-branch-display-window">
                      {branchPillars.map((pillar, idx) => (
                        <img
                          key={pillar.id}
                          src={pillar.image}
                          alt={pillar.alt}
                          className={`so-branch-display-img ${idx === activeBranchIndex ? "is-active" : ""}`}
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Indicator Dots for Slides */}
                  <div className="so-branch-dots" role="tablist" aria-label="Branch Architecture Slides">
                    {branchPillars.map((pillar, idx) => (
                      <button
                        key={pillar.id}
                        type="button"
                        role="tab"
                        aria-selected={idx === activeBranchIndex}
                        className={`so-branch-dot ${idx === activeBranchIndex ? "is-active" : ""}`}
                        onClick={() => setActiveBranchIndex(idx)}
                        aria-label={`View ${pillar.title}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Side: Top-Right & Bottom-Right */}
                <div className="so-branch-side-col so-branch-side--right">
                  {/* Top-Right Corner */}
                  <div
                    className={`so-branch-corner-card ${activeBranchIndex === 1 ? "is-active" : ""}`}
                    onClick={() => setActiveBranchIndex(1)}
                    onMouseEnter={() => setActiveBranchIndex(1)}
                    role="button"
                    tabIndex={0}
                    aria-label={branchPillars[1].title}
                  >
                    <div className="so-branch-icon-bubble">
                      <Icon name={branchPillars[1].icon} size={18} />
                    </div>
                    <h3 className="so-branch-corner-title">{branchPillars[1].title}</h3>
                    <p className="so-branch-corner-desc">{branchPillars[1].desc}</p>
                    <div className="so-branch-card-action">
                      <Link to="/solutions/multi-location" className="so-branch-card-btn">
                        Explore Multi-Branch Solutions <Icon name="arrow" size={13} />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom-Right Corner */}
                  <div
                    className={`so-branch-corner-card ${activeBranchIndex === 3 ? "is-active" : ""}`}
                    onClick={() => setActiveBranchIndex(3)}
                    onMouseEnter={() => setActiveBranchIndex(3)}
                    role="button"
                    tabIndex={0}
                    aria-label={branchPillars[3].title}
                  >
                    <div className="so-branch-icon-bubble">
                      <Icon name={branchPillars[3].icon} size={18} />
                    </div>
                    <h3 className="so-branch-corner-title">{branchPillars[3].title}</h3>
                    <p className="so-branch-corner-desc">{branchPillars[3].desc}</p>
                    <div className="so-branch-card-action">
                      <Link to="/solutions/multi-location" className="so-branch-card-btn">
                        Explore Multi-Branch Solutions <Icon name="arrow" size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Bottom CTA */}
            <div className="so-branch-bottom-action">
              <Link to="/solutions/multi-location" className="so-branch-cta-btn">
                Explore Multi-Branch Solutions <Icon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* =================================================================
            6. STANDALONE INDUSTRY SOLUTIONS SECTION (4 CARDS WITH CLEAR HD IMAGES)
            ================================================================= */}
        <section className="so-section so-industry-section" id="industries">
          <div className="container">
            <SectionHeading
              eyebrow="VERTICAL WORKFLOW SOLUTIONS"
              title="Pre-Engineered Solutions for Your Industry's Operating Realities"
              center
            />

            <div className="so-industry-grid-4">
              {/* Card 1: Tech & Startups */}
              <div className="so-industry-card">
                <div className="so-industry-img-box">
                  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="so-industry-vector">
                    <defs>
                      <linearGradient id="tech-bg" x1="0" y1="0" x2="320" y2="180" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#351848" />
                        <stop offset="100%" stopColor="#5a2470" />
                      </linearGradient>
                    </defs>
                    <rect width="320" height="180" fill="url(#tech-bg)" />
                    <path d="M 0 115 Q 160 85 320 115 L 320 180 L 0 180 Z" fill="#441a54" opacity="0.6" />
                    <path d="M 0 138 L 320 138 L 320 180 L 0 180 Z" fill="#240f32" />
                    <line x1="0" y1="138" x2="320" y2="138" stroke="#1c0a27" strokeWidth="2" />

                    {/* Person 1 (behind left monitor) */}
                    <circle cx="95" cy="65" r="13" fill="#fbcfe8" />
                    <path d="M 72 88 C 72 75 118 75 118 88" fill="#831843" />

                    {/* Monitor 1 (Left) */}
                    <rect x="91" y="116" width="8" height="22" fill="#1b1226" />
                    <rect x="76" y="136" width="38" height="3" rx="1.5" fill="#1b1226" />
                    <rect x="52" y="72" width="86" height="52" rx="6" fill="#150d20" stroke="#4a2260" strokeWidth="2" />
                    <rect x="62" y="84" width="45" height="3.5" rx="1.5" fill="#f472b6" />
                    <rect x="62" y="93" width="65" height="3.5" rx="1.5" fill="#e2e8f0" opacity="0.8" />
                    <rect x="62" y="102" width="32" height="3.5" rx="1.5" fill="#c084fc" />

                    {/* Person 2 (behind right monitor) */}
                    <circle cx="215" cy="65" r="13" fill="#fbcfe8" />
                    <path d="M 192 88 C 192 75 238 75 238 88" fill="#831843" />

                    {/* Monitor 2 (Right) */}
                    <rect x="211" y="116" width="8" height="22" fill="#1b1226" />
                    <rect x="196" y="136" width="38" height="3" rx="1.5" fill="#1b1226" />
                    <rect x="172" y="72" width="86" height="52" rx="6" fill="#150d20" stroke="#4a2260" strokeWidth="2" />
                    <rect x="184" y="98" width="7" height="18" rx="1.5" fill="#a855f7" />
                    <rect x="196" y="86" width="7" height="30" rx="1.5" fill="#c084fc" />
                    <rect x="208" y="92" width="7" height="24" rx="1.5" fill="#f472b6" />
                    <rect x="220" y="82" width="7" height="34" rx="1.5" fill="#e2e8f0" />
                    <rect x="232" y="102" width="7" height="14" rx="1.5" fill="#a855f7" />

                    {/* Green Desk Plant on Right */}
                    <path d="M 282 138 Q 284 122 280 112" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 280 112 C 272 102 288 98 284 110 Z" fill="#4ade80" />
                    <path d="M 282 125 C 290 118 292 128 283 129 Z" fill="#22c55e" />
                  </svg>
                </div>
                <div className="so-industry-body">
                  <h4 className="so-industry-title">Tech &amp; Startups</h4>
                  <p className="so-industry-snippet">
                    Hybrid geo-punching, sprint-aligned leaves and confidential ESOP workflows.
                  </p>
                  <ul className="so-industry-highlights">
                    <li>
                      <span className="ico">✓</span>
                      <span>Hybrid &amp; remote geo-punching</span>
                    </li>
                    <li>
                      <span className="ico">✓</span>
                      <span>Sprint-aligned leave rules</span>
                    </li>
                    <li>
                      <span className="ico">✓</span>
                      <span>Confidential salary bands &amp; ESOP</span>
                    </li>
                  </ul>
                  <Link to="/solutions/industries" className="so-industry-cta-link">
                    Explore solution →
                  </Link>
                </div>
              </div>

              {/* Card 2: Healthcare & Retail */}
              <div className="so-industry-card">
                <div className="so-industry-img-box">
                  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="so-industry-vector">
                    <defs>
                      <linearGradient id="health-bg" x1="0" y1="0" x2="320" y2="180" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#2c174f" />
                        <stop offset="100%" stopColor="#4f2580" />
                      </linearGradient>
                    </defs>
                    <rect width="320" height="180" fill="url(#health-bg)" />
                    <rect x="0" y="146" width="320" height="34" fill="#210f3c" />

                    {/* Shelves on left */}
                    <rect x="30" y="42" width="138" height="96" rx="4" fill="#1d0d35" stroke="#482270" strokeWidth="2" />
                    <line x1="30" y1="74" x2="168" y2="74" stroke="#482270" strokeWidth="2" />
                    <line x1="30" y1="106" x2="168" y2="106" stroke="#482270" strokeWidth="2" />

                    {/* Top shelf items */}
                    <rect x="40" y="52" width="10" height="18" rx="2" fill="#ffffff" />
                    <rect x="58" y="49" width="10" height="21" rx="2" fill="#f472b6" />
                    <rect x="76" y="54" width="10" height="16" rx="2" fill="#38bdf8" />
                    <rect x="94" y="50" width="10" height="20" rx="2" fill="#ffffff" />
                    <rect x="112" y="52" width="10" height="18" rx="2" fill="#4ade80" />
                    <rect x="130" y="49" width="10" height="21" rx="2" fill="#c084fc" />
                    <rect x="148" y="53" width="10" height="17" rx="2" fill="#ffffff" />

                    {/* Middle shelf items */}
                    <rect x="40" y="83" width="14" height="19" rx="2" fill="#f472b6" />
                    <rect x="62" y="80" width="12" height="22" rx="2" fill="#4ade80" />
                    <rect x="82" y="85" width="16" height="17" rx="2" fill="#ffffff" />
                    <rect x="106" y="81" width="14" height="21" rx="2" fill="#38bdf8" />
                    <rect x="128" y="83" width="12" height="19" rx="2" fill="#ffffff" />
                    <rect x="148" y="80" width="12" height="22" rx="2" fill="#c084fc" />

                    {/* Bottom shelf items */}
                    <rect x="40" y="115" width="12" height="19" rx="2" fill="#ffffff" />
                    <rect x="60" y="118" width="14" height="16" rx="2" fill="#38bdf8" />
                    <rect x="82" y="113" width="12" height="21" rx="2" fill="#f472b6" />
                    <rect x="102" y="115" width="15" height="19" rx="2" fill="#4ade80" />
                    <rect x="125" y="113" width="14" height="21" rx="2" fill="#ffffff" />
                    <rect x="147" y="117" width="13" height="17" rx="2" fill="#c084fc" />

                    {/* Person on right */}
                    <circle cx="235" cy="74" r="18" fill="#fed7aa" />
                    <path d="M 215 70 Q 235 50 255 70 Z" fill="#381928" />
                    <path d="M 200 180 C 200 126 270 126 270 180 Z" fill="#ffffff" />
                    <rect x="231" y="132" width="8" height="18" rx="1.5" fill="#7c3aed" />
                    <rect x="226" y="137" width="18" height="8" rx="1.5" fill="#7c3aed" />
                  </svg>
                </div>
                <div className="so-industry-body">
                  <h4 className="so-industry-title">Healthcare &amp; Retail</h4>
                  <p className="so-industry-snippet">
                    24/7 rotating rosters, shift swaps and store overtime approvals.
                  </p>
                  <ul className="so-industry-highlights">
                    <li>
                      <span className="ico">✓</span>
                      <span>24/7 roster &amp; shift swaps</span>
                    </li>
                    <li>
                      <span className="ico">✓</span>
                      <span>Supervisor overtime validation</span>
                    </li>
                    <li>
                      <span className="ico">✓</span>
                      <span>Split-shift &amp; Sunday premiums</span>
                    </li>
                  </ul>
                  <Link to="/solutions/industries" className="so-industry-cta-link">
                    Explore solution →
                  </Link>
                </div>
              </div>

              {/* Card 3: Manufacturing */}
              <div className="so-industry-card">
                <div className="so-industry-img-box">
                  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="so-industry-vector">
                    <defs>
                      <linearGradient id="manuf-bg" x1="0" y1="0" x2="320" y2="180" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#44173d" />
                        <stop offset="100%" stopColor="#6e2055" />
                      </linearGradient>
                    </defs>
                    <rect width="320" height="180" fill="url(#manuf-bg)" />

                    {/* Sawtooth Factory Roof Silhouette */}
                    <path d="M 0 95 L 45 70 L 45 95 L 100 68 L 100 95 L 155 68 L 155 95 L 210 68 L 210 95 L 320 58 L 320 180 L 0 180 Z" fill="#2d0e28" opacity="0.5" />

                    {/* Sun Gear / Cogwheel on top right */}
                    <g transform="translate(262, 48)">
                      <circle cx="0" cy="0" r="16" fill="none" stroke="#fbcfe8" strokeWidth="4.5" strokeDasharray="3.5 3.5" />
                      <circle cx="0" cy="0" r="8" fill="#fbcfe8" />
                    </g>

                    {/* Conveyor Belt System */}
                    <rect x="30" y="130" width="260" height="12" rx="6" fill="#1b0818" />
                    <line x1="40" y1="136" x2="280" y2="136" stroke="#9d3278" strokeWidth="2.5" strokeDasharray="7 5" />
                    <rect x="55" y="142" width="9" height="30" fill="#1b0818" />
                    <rect x="155" y="142" width="9" height="30" fill="#1b0818" />
                    <rect x="255" y="142" width="9" height="30" fill="#1b0818" />

                    {/* Manufactured parts on conveyor */}
                    <rect x="75" y="120" width="16" height="10" rx="3" fill="#ffffff" />
                    <rect x="180" y="108" width="18" height="11" rx="3" fill="#ffffff" />
                    <rect x="180" y="119" width="18" height="11" rx="3" fill="#fbcfe8" />
                    <rect x="235" y="118" width="18" height="12" rx="3" fill="#ffffff" />
                    <rect x="260" y="122" width="16" height="8" rx="2" fill="#fbcfe8" />

                    {/* Robotic Arm */}
                    <rect x="120" y="124" width="24" height="8" rx="2" fill="#160814" />
                    <circle cx="132" cy="116" r="8" fill="#160814" />
                    <line x1="132" y1="116" x2="148" y2="58" stroke="#facc15" strokeWidth="9" strokeLinecap="round" />
                    <circle cx="148" cy="58" r="8" fill="#160814" />
                    <line x1="148" y1="58" x2="189" y2="84" stroke="#facc15" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="189" cy="84" r="6" fill="#160814" />
                    <rect x="186" y="84" width="6" height="24" rx="1.5" fill="#160814" />
                  </svg>
                </div>
                <div className="so-industry-body">
                  <h4 className="so-industry-title">Manufacturing</h4>
                  <p className="so-industry-snippet">
                    Contractor compliance, Form B registers and turnstile biometric gates.
                  </p>
                  <ul className="so-industry-highlights">
                    <li>
                      <span className="ico">✓</span>
                      <span>Contract labour billing &amp; CLRA</span>
                    </li>
                    <li>
                      <span className="ico">✓</span>
                      <span>Overtime cap &amp; fatigue alerts</span>
                    </li>
                    <li>
                      <span className="ico">✓</span>
                      <span>Biometric hardware sync</span>
                    </li>
                  </ul>
                  <Link to="/solutions/industries" className="so-industry-cta-link">
                    Explore solution →
                  </Link>
                </div>
              </div>

              {/* Card 4: Financial Services */}
              <div className="so-industry-card">
                <div className="so-industry-img-box">
                  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="so-industry-vector">
                    <defs>
                      <linearGradient id="fin-bg" x1="0" y1="0" x2="320" y2="180" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#17183d" />
                        <stop offset="100%" stopColor="#2c225e" />
                      </linearGradient>
                    </defs>
                    <rect width="320" height="180" fill="url(#fin-bg)" />

                    {/* City Skyline Silhouettes */}
                    <rect x="25" y="98" width="22" height="82" fill="#13142e" />
                    <rect x="42" y="78" width="26" height="102" fill="#191a38" />
                    <rect x="76" y="105" width="20" height="75" fill="#13142e" />
                    <rect x="105" y="65" width="32" height="115" fill="#201f46" />
                    <rect x="145" y="92" width="28" height="88" fill="#171836" />
                    <rect x="185" y="58" width="36" height="122" fill="#22214c" />
                    <rect x="230" y="82" width="26" height="98" fill="#191a3c" />
                    <rect x="268" y="104" width="32" height="76" fill="#13142e" />

                    {/* Window lights */}
                    <circle cx="55" cy="90" r="1.5" fill="#ffffff" opacity="0.6" />
                    <circle cx="55" cy="105" r="1.5" fill="#ffffff" opacity="0.6" />
                    <circle cx="120" cy="78" r="1.5" fill="#ffffff" opacity="0.7" />
                    <circle cx="120" cy="92" r="1.5" fill="#ffffff" opacity="0.7" />
                    <circle cx="202" cy="72" r="1.5" fill="#ffffff" opacity="0.8" />
                    <circle cx="202" cy="86" r="1.5" fill="#ffffff" opacity="0.8" />
                    <circle cx="242" cy="95" r="1.5" fill="#ffffff" opacity="0.6" />

                    {/* Rising Trend Line Graph */}
                    <polyline
                      points="35,142 80,118 125,130 170,96 215,106 268,54"
                      fill="none"
                      stroke="#f472b6"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="35" cy="142" r="4" fill="#ffffff" stroke="#f472b6" strokeWidth="2.5" />
                    <circle cx="80" cy="118" r="4" fill="#ffffff" stroke="#f472b6" strokeWidth="2.5" />
                    <circle cx="125" cy="130" r="4" fill="#ffffff" stroke="#f472b6" strokeWidth="2.5" />
                    <circle cx="170" cy="96" r="4" fill="#ffffff" stroke="#f472b6" strokeWidth="2.5" />
                    <circle cx="215" cy="106" r="4" fill="#ffffff" stroke="#f472b6" strokeWidth="2.5" />
                    <circle cx="268" cy="54" r="4" fill="#ffffff" stroke="#f472b6" strokeWidth="2.5" />

                    {/* Gold Rupee Coin at Peak */}
                    <circle cx="288" cy="40" r="11" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
                    <circle cx="288" cy="40" r="8.5" fill="none" stroke="#d97706" strokeWidth="1" />
                    <text x="288" y="44" fontSize="10.5" fontWeight="900" fill="#78350f" textAnchor="middle" fontFamily="system-ui">
                      ₹
                    </text>
                  </svg>
                </div>
                <div className="so-industry-body">
                  <h4 className="so-industry-title">Financial Services</h4>
                  <p className="so-industry-snippet">
                    Billable timesheets synced to payroll with multi-entity runs and audit trails.
                  </p>
                  <ul className="so-industry-highlights">
                    <li>
                      <span className="ico">✓</span>
                      <span>Timesheet-to-payroll sync</span>
                    </li>
                    <li>
                      <span className="ico">✓</span>
                      <span>Multi-currency salary runs</span>
                    </li>
                    <li>
                      <span className="ico">✓</span>
                      <span>Role-based financial audit trails</span>
                    </li>
                  </ul>
                  <Link to="/solutions/industries" className="so-industry-cta-link">
                    Explore solution →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            7. FAQ SECTION (EXACT REFERENCE PARITY)
            ================================================================= */}
        <section className="faq-section" id="faq">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title="Everything you need to know"
                body="Can’t find what you’re looking for? Our team is happy to help."
              />
              <Link className="text-link" to="/resources/faqs">
                View all FAQs <Icon name="arrow" size={17} />
              </Link>
            </div>

            <div className="faq-list">
              {faqList.map((f, i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.question}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{f.question}</span>
                    <i>{openFaq === i ? "−" : "+"}</i>
                  </button>
                  {openFaq === i && <p>{f.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default SolutionsOverview;
