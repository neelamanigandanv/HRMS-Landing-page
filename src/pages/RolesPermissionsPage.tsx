import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FooterCTA from "../components/common/FooterCTA";
import SEO from "../components/layout/SEO";
import Icon, { IconName } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { useDemoModal } from "../context/DemoModalContext";
import "./RolesPermissionsPage.css";

export function RolesPermissionsPage() {
  const { openDemoModal } = useDemoModal();

  // Interactive States
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeWorkflowCard, setActiveWorkflowCard] = useState<number>(0);
  const [activeConnectedCard, setActiveConnectedCard] = useState<number | null>(null);

  const handleOpenDemo = () => {
    openDemoModal({
      title: "Request a Roles & Permissions Demo",
      subtitle:
        "See how LattiumHR provides granular role-based access control to protect sensitive workforce records.",
      defaultInterest: "Roles & Permissions",
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 1. Access Management Challenges
  const challenges = [
    {
      id: "excess-access",
      title: "Employees Accessing Information Beyond Their Scope",
      desc: "When permissions lack granular boundaries, team members can view confidential compensation bands, executive notes, and personal records of colleagues.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      ),
    },
    {
      id: "manager-leakage",
      title: "Managers Needing Team Info Without Full HR Access",
      desc: "Team leads need to approve leave, review presence, and guide direct reports without having unrestricted access to company-wide profiles or global settings.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "hr-finance-split",
      title: "HR and Finance Requiring Distinct Permissions",
      desc: "HR oversees personnel onboarding and documents, while finance manages sensitive bank accounts and payroll runs. Blurring these permissions creates audit vulnerabilities.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      id: "permission-creep",
      title: "Uncontrolled Permission Creep Across Branches",
      desc: "As employees transition across roles and multi-branch locations, obsolete administrative rights linger unrevoked, leaving security gaps that fail statutory compliance audits.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ];

  // 2. Three Flagship Capability Blocks
  const capabilityBlocks = [
    {
      id: "admin-governance",
      badge: "01 Platform & Company Admin",
      eyebrow: "✦ 01. PLATFORM & COMPANY ADMIN ✦",
      image: "/images/roles-block-admin.jpg",
      imageAlt: "IT security administrator configuring global tenant policies, user role hierarchies, and system security privileges",
      title: "Global Tenant Configuration & Enterprise Governance",
      description:
        "Equip system administrators and leadership with centralized control over organization-wide settings, multi-branch hierarchies, statutory entities, and tenant security policies.",
      bullets: [
        "Platform Admin: Multi-tenant configuration and global environment control",
        "Company Admin: Organization-level settings and company-wide workforce administration",
        "Branch-scoped entity setup across headquarters, satellite hubs, and remote teams",
        "IP whitelisting, two-factor authentication (2FA), and session timeout rules",
        "Comprehensive role provisioning with customizable permission templates",
        "Real-time administrative audit logs tracking every configuration change",
      ],
      callout: {
        role: "Head of IT & Security",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Tenant Isolation" },
        { value: "2FA", label: "Security Enforced" },
        { value: "Real-Time", label: "Audit Logging" },
        { value: "Zero", label: "Security Backdoors" },
      ],
    },
    {
      id: "hr-manager-scoping",
      badge: "02 HR & Manager Scoping",
      eyebrow: "✦ 02. HR & MANAGER SCOPING ✦",
      image: "/images/roles-block-manager.jpg",
      imageAlt: "HR lead and department manager reviewing team attendance, leave approval requests, and employee records with scoped access",
      title: "Scoped Workforce Operations & Team Approvals",
      description:
        "Provide HR specialists and team managers with precisely tailored access to employee records, attendance rosters, and leave approvals without exposing confidential financial data.",
      bullets: [
        "HR Role: Full workforce profile management, onboarding, and lifecycle operations",
        "Manager Role: Scoped visibility strictly limited to direct and indirect reports",
        "1-click approvals for leave, shift changes, and attendance regularizations",
        "Field-level masking preventing managers from viewing unshared salary details",
        "Multi-level approver chains configured by department, project, or level",
        "Instant revocation and role reassignment when managers transfer teams",
      ],
      callout: {
        role: "People Operations Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Team-Scoped" },
        { value: "Field-Level", label: "Data Masking" },
        { value: "1-Click", label: "Manager Approvals" },
        { value: "Zero", label: "Accidental Leaks" },
      ],
    },
    {
      id: "finance-self-service",
      badge: "03 Finance & Self-Service",
      eyebrow: "✦ 03. FINANCE & SELF-SERVICE ✦",
      image: "/images/roles-block-finance.jpg",
      imageAlt: "Finance controller and payroll specialist reviewing confidential salary registers and financial disbursement permissions",
      title: "Confidential Payroll Disbursals & Employee Self-Service",
      description:
        "Protect sensitive financial records with dedicated payroll access while empowering employees to manage their personal documents and everyday requests securely.",
      bullets: [
        "Finance Role: Strict access to salary registers, bank export files, and tax records",
        "Complete separation of payroll data from non-financial HR operations",
        "Employee Role: Self-service access strictly limited to own profile and records",
        "Personal document vault encrypted with bank-grade AES-256 cloud security",
        "Tamper-proof digital salary slips accessible only by the verified employee",
        "Strict maker-checker segregation for salary processing and payouts",
      ],
      callout: {
        role: "Finance & Compliance Controller",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "AES-256", label: "Cloud Encrypted" },
        { value: "Strict", label: "Data Segregation" },
        { value: "100%", label: "Self-Service Security" },
        { value: "Zero", label: "Payroll Leakage" },
      ],
    },
  ];

  // 3. Six Role Examples Matrix (Requested by user)
  const roleExamples = [
    {
      role: "Platform Admin",
      desc: "Platform configuration and tenant administration across global environments.",
      scope: "System & Tenant Configuration",
      icon: <Icon name="setup" size={24} />,
    },
    {
      role: "Company Admin",
      desc: "Organization-level settings, branch entities, and workforce administration.",
      scope: "Organization-Wide Governance",
      icon: <Icon name="shield" size={24} />,
    },
    {
      role: "HR",
      desc: "Employee records, digital onboarding, lifecycle tracking, and HR operations.",
      scope: "Workforce Operations & Records",
      icon: <Icon name="employee" size={24} />,
    },
    {
      role: "Manager",
      desc: "Relevant team information, shift coordination, and time-off approvals.",
      scope: "Direct Reports & Team Approvals",
      icon: <Icon name="role" size={24} />,
    },
    {
      role: "Employee",
      desc: "Personal information, attendance check-ins, leave requests, and self-service.",
      scope: "Individual Self-Service",
      icon: <Icon name="check" size={24} />,
    },
    {
      role: "Finance",
      desc: "Relevant payroll registers, tax deductions, and financial disbursement records.",
      scope: "Confidential Payroll & Accounting",
      icon: <Icon name="payroll" size={24} />,
    },
  ];

  // 4. How Access Control Works (4 Steps required by user)
  const workflowSteps = [
    {
      number: "01",
      title: "Assign a Role to the User",
      description: "Select from standard role templates (Admin, HR, Manager, Finance, Employee) upon onboarding or branch assignment.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Configure Role Permissions",
      description: "Define view, edit, approve, and export privileges across modules with granular field-level masking.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Grant Access to Modules & Actions",
      description: "Users immediately access authorized sections—such as Attendance, Leave, or Payroll—with strict boundaries.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Review & Update Permissions",
      description: "Instantly update, reassign, or revoke access when reporting structures change, maintaining audit-ready security.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      ),
    },
  ];

  // Permission Matrix Data (Visual required by user)
  const permissionMatrix = [
    {
      role: "Platform Admin",
      employee: "Full Access",
      attendance: "Full Access",
      leave: "Full Access",
      payroll: "Full Access",
      settings: "Full Config",
    },
    {
      role: "Company Admin",
      employee: "Full Access",
      attendance: "Full Access",
      leave: "Full Access",
      payroll: "Full Access",
      settings: "Org Settings",
    },
    {
      role: "HR Operations",
      employee: "Manage",
      attendance: "Manage",
      leave: "Manage",
      payroll: "View Only",
      settings: "None",
    },
    {
      role: "Department Manager",
      employee: "Team Only",
      attendance: "Team Approve",
      leave: "Team Approve",
      payroll: "None",
      settings: "None",
    },
    {
      role: "Finance & Payroll",
      employee: "View Only",
      attendance: "Verified LOP",
      leave: "View Approved",
      payroll: "Full Manage",
      settings: "None",
    },
    {
      role: "Employee",
      employee: "Self Only",
      attendance: "Self Clock-In",
      leave: "Self Apply",
      payroll: "Self Payslips",
      settings: "None",
    },
  ];

  // 5. Connected System Modules (How It Works Together)
  const connectedModules = [
    {
      number: "01",
      role: "Core Platform",
      title: "Employee Management",
      icon: <Icon name="employee" size={28} />,
      description:
        "Personal records, emergency contacts, and statutory KYC are safeguarded with strict role-based visibility and field-level masking.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      role: "Time Tracking",
      title: "Attendance Management",
      icon: <Icon name="attendance" size={28} />,
      description:
        "Managers verify team punches and overtime, while employees log shifts securely via geofenced web and mobile check-ins.",
      link: "/features/attendance-management",
    },
    {
      number: "03",
      role: "Leave Workflow",
      title: "Leave Management",
      icon: <Icon name="leave" size={28} />,
      description:
        "Time-off applications and balance entitlements route automatically through designated manager approval hierarchies.",
      link: "/features/leave-management",
    },
    {
      number: "04",
      role: "Financial Security",
      title: "Payroll Management",
      icon: <Icon name="payroll" size={28} />,
      description:
        "Highly confidential salary registers, LOP deductions, and bank payout files remain strictly restricted to authorized finance personnel.",
      link: "/features/payroll-management",
    },
  ];

  // 6. FAQs (Required questions)
  const faqs = [
    {
      q: "What are roles and permissions in an HRMS?",
      a: "Roles and permissions in an HRMS define what each user can see and do within the software. A role (such as HR, Manager, or Employee) bundles specific privileges (such as viewing records, approving leave, or processing payroll), ensuring users only access information required for their duties.",
    },
    {
      q: "How does role-based access control (RBAC) work?",
      a: "Role-Based Access Control assigns permissions to specific organizational roles rather than individual users. When an employee is assigned a role, they automatically inherit the exact view, edit, approve, and export rights configured for that position across all modules.",
    },
    {
      q: "Can different users have different access levels?",
      a: "Yes. LattiumHR supports granular multi-tier permissions. For example, a company admin has full organizational oversight, a manager has scoped access limited to their direct reports, finance handles payroll calculations, and employees only access their own self-service profile.",
    },
    {
      q: "How do permissions help protect employee information?",
      a: "Permissions enforce data privacy by shielding sensitive personal bio-data, statutory KYC, and compensation details from unauthorized staff. With field-level masking and detailed audit logs, your organization maintains compliance with data protection laws and prevents accidental leaks.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper roles-page-wrapper">
      <SEO
        title="Roles & Permissions Software — Granular Access Control | LattiumHR"
        description="Control Access. Protect Every HR Operation. Give every user the right level of access with role-based permissions designed to keep your workforce data organized and protected."
        canonicalPath="/features/roles-permissions"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Control Access. Protect Every HR Operation.)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="roles-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Roles & Permissions">
              <span>✦ ACCESS CONTROL & SECURITY ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="roles-hero-title" className="emp-hero-rich-title">
              Control Access. <br className="emp-hero-br" />
              Protect Every <span className="emp-glow-text">HR Operation.</span>
            </h1>
            <p className="emp-hero-rich-subhead">
              Give every user the right level of access with role-based permissions designed to keep your workforce data organized and protected.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-pill-btn-primary"
                onClick={handleOpenDemo}
              >
                Request a Demo <Icon name="arrow" size={15} />
              </button>
              <button
                type="button"
                className="emp-pill-btn-secondary"
                onClick={() => {
                  const el = document.getElementById("challenges");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Explore Permissions
              </button>
            </div>

            {/* Trust Points */}
            <div className="emp-hero-trust-row">
              <span><Icon name="check" size={13} /> Granular Role-Based Access (RBAC)</span>
              <span><Icon name="check" size={13} /> Branch & Department Scoping</span>
              <span><Icon name="check" size={13} /> Complete Audit Log History</span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE (Matching Employee Management hero stage) */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Access Tier Distribution Donut Chart */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Access Distribution</h3>
                    <span className="emp-float-widget-sub">By Active Roles</span>
                  </div>
                  <span className="emp-float-widget-badge">Enforced</span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#f4edf3" strokeWidth="18" fill="none" />
                    {/* Employee Self-Service 65% (Plum #802B5B) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#802B5B" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="149"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Managers 20% (Violet #5146d8) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#5146d8" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="341"
                      strokeLinecap="round"
                      transform="rotate(144 90 90)"
                    />
                    {/* HR & Finance 12% (Emerald #10b981) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#10b981" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="375"
                      strokeLinecap="round"
                      transform="rotate(216 90 90)"
                    />
                    {/* Center Info */}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">Users</text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">1,450</text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-plum" />
                    <span>Employees (65%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-violet" />
                    <span>Managers (20%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-mint" />
                    <span>HR & Finance (12%)</span>
                  </div>
                </div>
              </div>

              {/* Center Main Card: Real Security Administrator Dashboard */}
              <div className="emp-hero-center-photo-card roles-hero-showcase-frame">
                <img
                  src="/images/roles-hero-showcase.jpg"
                  alt="Security administrator and HR manager reviewing role-based access control and permission matrix in modern office"
                  className="emp-hero-center-img roles-hero-mockup-img"
                  loading="eager"
                />

                {/* Top-Left Floating Live Status Pill */}
                <div className="emp-photo-status-pill">
                  <span className="roles-live-pulse-dot" />
                  <span>RBAC Security Policy Active</span>
                </div>
              </div>

              {/* Right Widget: Security Policy Governance & Daily Audit */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Access Governance</h3>
                    <span className="emp-float-widget-sub">Daily Verification</span>
                  </div>
                  <span className="emp-float-widget-pill-green">100% Policy Match</span>
                </div>

                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">0</strong>
                  <div className="emp-stat-meta">
                    <span>Unauthorized Access</span>
                    <small>Zero privilege creep detected</small>
                  </div>
                </div>

                {/* Mini Bar Authorization Chart */}
                <div className="emp-mini-bar-chart">
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "55%" }} />
                    <span className="emp-bar-lbl">M</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "70%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "65%" }} />
                    <span className="emp-bar-lbl">W</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "82%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col is-active">
                    <div className="emp-bar-fill" style={{ height: "98%" }} />
                    <span className="emp-bar-lbl">F</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "60%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "75%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                </div>

                <div className="emp-widget-footer-pill">
                  <Icon name="check" size={14} />
                  <span>Role Scoping & 2FA Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. ACCESS MANAGEMENT CHALLENGES
            ========================================================================= */}
        <section className="emp-section emp-problem-section" id="challenges">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ ACCESS MANAGEMENT CHALLENGES ✦</span>
              <h2 className="emp-section-title">
                Not Everyone Needs Access to Everything.
              </h2>
              <p className="emp-section-subhead">
                When permissions are poorly defined or all-or-nothing, sensitive payroll data leaks, compliance audits become stressful, and managers are overwhelmed with irrelevant data.
              </p>
            </div>

            <div className="emp-problem-grid roles-problem-grid">
              {challenges.map((c) => (
                <div key={c.id} className="emp-problem-card">
                  <div className="emp-problem-icon-wrap" aria-hidden="true">
                    {c.icon}
                  </div>
                  <h3 className="emp-problem-title">{c.title}</h3>
                  <p className="emp-problem-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section Divider Line */}
          <div className="emp-section-divider-line" aria-hidden="true" />
        </section>

        {/* =========================================================================
            3. ROLES & PERMISSIONS CAPABILITIES (3 Flagship Detailed Blocks)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="capabilities">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ ROLES & PERMISSIONS CAPABILITIES ✦</span>
              <h2 className="emp-section-title">
                Set the Right Access for Every Role.
              </h2>
              <p className="emp-section-subhead">
                From high-level tenant administration to secure employee self-service, tailor access privileges with precision across all 6 organizational roles.
              </p>
            </div>
          </div>

          {/* 3 Core Capability Blocks */}
          <div className="emp-capability-blocks-list">
            {capabilityBlocks.map((blk, idx) => (
              <div key={blk.id} className={`emp-cap-block-wrapper emp-cap-bg-${idx}`}>
                <div className="container">
                  <article id={`cap-block-${blk.id}`} className="emp-reference-block-card">
                    {/* Top Deck: 2 Columns (Left Image + Right Content) */}
                    <div className="emp-block-top-deck">
                      {/* Left Column: Vertical Image */}
                      <div className="emp-block-img-col">
                        <img
                          src={blk.image}
                          alt={blk.imageAlt}
                          className="emp-block-hero-img"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </div>

                      {/* Right Column: Eyebrow, Title, Subtitle, 2-Col Checklist, Callout */}
                      <div className="emp-block-content-col">
                        <span className="emp-block-eyebrow">{blk.eyebrow}</span>
                        <h3 className="emp-block-title">{blk.title}</h3>
                        <p className="emp-block-desc">{blk.description}</p>

                        {/* 2-Column Checklist (6 Items) */}
                        <div className="emp-block-checklist-grid">
                          {blk.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="emp-block-check-item">
                              <span className="emp-block-check-badge" aria-hidden="true">
                                ✓
                              </span>
                              <span className="emp-block-check-text">{bullet}</span>
                            </div>
                          ))}
                        </div>

                        <div className="emp-block-action-row">
                          <button
                            type="button"
                            className="emp-block-callout-btn"
                            onClick={handleOpenDemo}
                          >
                            Book a Demo <Icon name="arrow" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Deck: 4 Compact Stats Cards */}
                    <div className="emp-block-bottom-deck">
                      <div className="emp-block-stats-grid">
                        {blk.stats.map((st, sIdx) => (
                          <div key={sIdx} className="emp-block-stat-box">
                            <strong className="emp-block-stat-val">{st.value}</strong>
                            <span className="emp-block-stat-lbl">{st.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </section>

        

        {/* =========================================================================
            4. HOW ACCESS CONTROL WORKS (From User Assignment to Controlled Access)
            ========================================================================= */}
        <section className="emp-process-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="container">
            <div className="emp-process-header">
              <span className="emp-process-eyebrow">✦ ACCESS CONTROL WORKFLOW ✦</span>
              <h2 id="workflow-heading" className="emp-process-title">
                From User Assignment to Controlled Access.
              </h2>
              <p className="emp-process-subhead">
                A simple 4-step framework to provision, customize, enforce, and audit permissions across all team members.
              </p>
            </div>

            {/* 4-Step Process Grid */}
            <div className="roles-process-grid-4">
              {workflowSteps.map((step, idx) => {
                const isActive = activeWorkflowCard === idx;
                return (
                  <div
                    key={step.number}
                    className={`emp-process-card roles-process-card ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveWorkflowCard(idx)}
                    onClick={() => setActiveWorkflowCard(idx)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                  >
                    <div className="emp-process-notch">
                      <span className="emp-process-notch-num">{step.number}</span>
                    </div>

                    <div className="emp-process-icon-box">{step.icon}</div>

                    <h3 className="emp-process-card-title">{step.title}</h3>
                    <p className="emp-process-card-desc">{step.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Permission Matrix Visual Table (Requested by user) */}
            <div className="roles-matrix-wrapper">
              <div className="roles-matrix-header-box">
                <div className="roles-matrix-title-group">
                  <h3>Interactive Permission Matrix</h3>
                  <p>Standard role capabilities across core workforce modules</p>
                </div>
                <div className="roles-matrix-legend">
                  <span className="roles-legend-chip">
                    <span className="roles-chip-indicator full" /> Full Access
                  </span>
                  <span className="roles-legend-chip">
                    <span className="roles-chip-indicator scoped" /> Scoped / Manage
                  </span>
                  <span className="roles-legend-chip">
                    <span className="roles-chip-indicator self" /> Self-Service
                  </span>
                  <span className="roles-legend-chip">
                    <span className="roles-chip-indicator none" /> No Access
                  </span>
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table className="roles-table" aria-label="Role Permission Matrix">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Employee Records</th>
                      <th>Attendance</th>
                      <th>Leave Approvals</th>
                      <th>Payroll & Salary</th>
                      <th>System Settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissionMatrix.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td>
                          <div className="roles-role-badge">
                            <span className="roles-badge-icon">
                              <Icon name="shield" size={14} />
                            </span>
                            <span>{row.role}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`roles-access-pill ${row.employee.includes("Full") ? "full" : row.employee.includes("Manage") || row.employee.includes("Team") ? "scoped" : row.employee.includes("Self") ? "self" : "none"}`}>
                            {row.employee}
                          </span>
                        </td>
                        <td>
                          <span className={`roles-access-pill ${row.attendance.includes("Full") ? "full" : row.attendance.includes("Manage") || row.attendance.includes("Team") || row.attendance.includes("Verified") ? "scoped" : row.attendance.includes("Self") ? "self" : "none"}`}>
                            {row.attendance}
                          </span>
                        </td>
                        <td>
                          <span className={`roles-access-pill ${row.leave.includes("Full") ? "full" : row.leave.includes("Manage") || row.leave.includes("Team") || row.leave.includes("View") ? "scoped" : row.leave.includes("Self") ? "self" : "none"}`}>
                            {row.leave}
                          </span>
                        </td>
                        <td>
                          <span className={`roles-access-pill ${row.payroll.includes("Full") ? "full" : row.payroll.includes("Manage") || row.payroll.includes("View") ? "scoped" : row.payroll.includes("Self") ? "self" : "none"}`}>
                            {row.payroll}
                          </span>
                        </td>
                        <td>
                          <span className={`roles-access-pill ${row.settings.includes("Full") ? "full" : row.settings.includes("Org") ? "scoped" : "none"}`}>
                            {row.settings}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WHY LATTIUMHR FOR ROLES & PERMISSIONS
            ========================================================================= */}
        <section className="emp-section emp-why-choose-section" id="why-choose">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY LATTIUMHR ✦</span>
              <h2 id="why-choose-title" className="emp-section-title">
                Keep Workforce Access Clear and Controlled.
              </h2>
              <p className="emp-section-subhead">
                LattiumHR ensures every team member accesses only what their role demands, protecting confidential employee records and keeping administrative duties clearly separated.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: Big Card */}
              <div className="emp-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">
                      ✦ GRANULAR ACCESS GOVERNANCE ✦
                    </span>
                  </div>

                  {/* Floating Metric 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="shield" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Role-Based Enforcement</small>
                        <strong>100% Policy Match</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Privilege Creep</span>
                  </div>

                  {/* Floating Metric 2 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Data Segregation Index</small>
                        <strong>Strict HR & Finance Separation</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Audit-Ready</span>
                  </div>
                </div>

                <p className="emp-big-card-bottom-text">
                  Keep workforce access clear, controlled, and audit-ready across all branches. LattiumHR ensures every team member accesses only what their role demands, protecting confidential employee records and keeping administrative duties clearly separated.
                </p>
              </div>

              {/* Right Column: 4 Small Cards */}
              <div className="emp-why-small-grid">
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="shield" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Role-Based Access Aligned With Responsibilities</h3>
                  <p className="emp-why-card-desc">
                    Map granular permissions directly to job functions, avoiding all-or-nothing admin rights and preventing accidental exposure.
                  </p>
                </div>

                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="role" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Better Separation of HR, Manager & Finance</h3>
                  <p className="emp-why-card-desc">
                    Strict separation of personnel management, team approvals, and confidential salary processing keeps duties cleanly segregated.
                  </p>
                </div>

                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="setup" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">More Organized Access Administration</h3>
                  <p className="emp-why-card-desc">
                    Easily assign predefined role templates or customize module access by branch, department, or individual level in seconds.
                  </p>
                </div>

                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="document" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Greater Control Over Workforce Information</h3>
                  <p className="emp-why-card-desc">
                    Real-time administrative audit logs track who viewed, edited, or approved records across every workforce operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. MIDDLE CTA SECTION (Give Every Role the Right Level of Access)
            ========================================================================= */}
        <section className="emp-center-cta-section" aria-labelledby="middle-cta-title">
          <div className="container">
            <div className="emp-center-cta-card">
              <div className="emp-cta-primary-bar" />

              <div className="emp-cta-img-wrap">
                <img
                  src="/images/emp-cta-collaboration.jpg"
                  alt="Enterprise security team reviewing roles and permissions policies"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ ENTERPRISE DATA PROTECTION ✦</span>
                <h2 id="middle-cta-title" className="emp-cta-title">
                  Give Every Role the Right Level of Access.
                </h2>
                <p className="emp-cta-desc">
                  Protect confidential workforce data and empower your team with clear, role-scoped permissions across all branches.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={handleOpenDemo}
                  >
                    Request a Demo
                  </button>
                  <button
                    type="button"
                    className="emp-cta-btn-secondary"
                    onClick={handleOpenDemo}
                  >
                    Talk to a Security Specialist <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. HOW IT WORKS TOGETHER (Access Control Across Your HRMS)
            ========================================================================= */}
        <section className="emp-section emp-connected-section" id="connected-modules">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ ACCESS CONTROL ACROSS YOUR HRMS ✦</span>
              <h2 className="emp-section-title">
                Access Control Across Your HRMS.
              </h2>
              <p className="emp-section-subhead">
                Permissions work seamlessly alongside Employee Management, Attendance, Leave, Payroll, and other modules to provide appropriate access across workforce operations.
              </p>
            </div>

            {/* 4 Connected Module Cards */}
            <div
              className="emp-process-grid emp-connected-grid"
              onMouseLeave={() => setActiveConnectedCard(null)}
            >
              {connectedModules.map((mod, idx) => {
                const isActive = activeConnectedCard === idx;
                return (
                  <Link
                    to={mod.link}
                    key={mod.number}
                    className={`emp-process-card emp-connected-card ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveConnectedCard(idx)}
                    onClick={() => setActiveConnectedCard(idx)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                  >
                    <div className="emp-process-notch" aria-label={`Module ${mod.number}`}>
                      <span className="emp-process-notch-num">{mod.number}</span>
                    </div>

                    <div className="emp-process-icon-box" aria-hidden="true">
                      {mod.icon}
                    </div>

                    <span className="roles-example-scope-tag" style={{ margin: "0 auto 10px" }}>{mod.role}</span>
                    <h3 className="emp-process-card-title">{mod.title}</h3>
                    <p className="emp-process-card-desc">{mod.description}</p>
                    <span className="emp-connected-explore-pill">
                      Explore Capability <Icon name="arrow" size={13} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FAQ SECTION (Roles & Permissions FAQs)
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs" aria-labelledby="faq-heading">
          <div className="container faq-grid">
            <div>
              <div className="section-heading">
                <span className="eyebrow">QUESTIONS, ANSWERED</span>
                <h2 id="faq-heading">Roles & Permissions FAQs</h2>
                <p>
                  Common questions about role-based access control, data segregation, manager scoping, and employee privacy.
                </p>
              </div>
              <Link className="text-link" to="/faq">
                View all FAQs <Icon name="arrow" size={17} />
              </Link>
            </div>

            <div className="faq-list">
              {faqs.map((f, i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{f.q}</span>
                    <i aria-hidden="true">{openFaq === i ? "−" : "+"}</i>
                  </button>
                  {openFaq === i && <p>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. FINAL CTA SECTION
            ========================================================================= */}
        <FooterCTA />
      </main>

      <Footer />
    </div>
  );
}

export default RolesPermissionsPage;
