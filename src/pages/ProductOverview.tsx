import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import RequestDemoModal from "../components/common/RequestDemoModal";

interface FlowStep {
  stepNum: string;
  stepLabel: string;
  iconName: IconName;
  title: string;
  subtitle: string;
  value: string;
}

interface CategoryFlowData {
  pillLabel: string;
  statLabel: string;
  statIcon: IconName;
  steps: FlowStep[];
}

interface ProductCardItem {
  id: string;
  title: string;
  href: string;
  iconName?: IconName;
  desc: string;
}

interface CategoryShowcase {
  id: string;
  badge: string;
  badgeIcon: IconName;
  title: string;
  leadText: string;
  highlights: string[];
  flowData: CategoryFlowData;
  products: ProductCardItem[];
}

function ProductIcon({ item }: { item: ProductCardItem }) {
  return <Icon name={item.iconName || "check"} size={20} />;
}

interface ArchitectureHubNode {
  pos: "tl" | "tr" | "bc";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface ArchitectureHubConfig {
  id: string;
  title: string;
  themeColor: string;
  bgTint: string;
  borderColor: string;
  iconBg: string;
  hubGradient: string;
  centerIcon: React.ReactNode;
  nodes: ArchitectureHubNode[];
}

const architectureHubConfigs: Record<string, ArchitectureHubConfig> = {
  "core-hr": {
    id: "core-hr",
    title: "Core HR",
    themeColor: "#004B49",
    bgTint: "#F6F8F8",
    borderColor: "#E5EAEA",
    iconBg: "#F6F8F8",
    hubGradient: "linear-gradient(145deg, #004B49 0%, #003836 100%)",
    centerIcon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="7" r="3.2" />
        <path d="M4.5 19a5.5 5.5 0 0 1 11 0" />
        <path d="M15.5 13l2.2 2.2 4.3-4.3" strokeWidth="2.4" />
      </svg>
    ),
    nodes: [
      {
        pos: "tl",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        ),
        title: "Digital KYC",
        subtitle: "Aadhaar, PAN & vault",
      },
      {
        pos: "tr",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        title: "Org Hierarchy",
        subtitle: "Reporting tier & access",
      },
      {
        pos: "bc",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        ),
        title: "Employee Directory",
        subtitle: "Unified records & ledger",
      },
    ],
  },
  "attendance": {
    id: "attendance",
    title: "Time & Attendance",
    themeColor: "#004B49",
    bgTint: "#F6F8F8",
    borderColor: "#E5EAEA",
    iconBg: "#F6F8F8",
    hubGradient: "linear-gradient(145deg, #004B49 0%, #003836 100%)",
    centerIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    nodes: [
      {
        pos: "tl",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
            <path d="M12 12L2.5 7.5" />
          </svg>
        ),
        title: "Biometric Sync",
        subtitle: "Real-time terminal push",
      },
      {
        pos: "tr",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        ),
        title: "GPS Geofencing",
        subtitle: "Touchless mobile clock-in",
      },
      {
        pos: "bc",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        ),
        title: "Shifts & Leave",
        subtitle: "Auto-balances & overtime",
      },
    ],
  },
  "payroll": {
    id: "payroll",
    title: "Payroll",
    themeColor: "#004B49",
    bgTint: "#F6F8F8",
    borderColor: "#E5EAEA",
    iconBg: "#F6F8F8",
    hubGradient: "linear-gradient(145deg, #004B49 0%, #003836 100%)",
    centerIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <circle cx="12" cy="15" r="2" />
      </svg>
    ),
    nodes: [
      {
        pos: "tl",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
            <circle cx="18" cy="12" r="2" />
          </svg>
        ),
        title: "1-Click Payroll",
        subtitle: "Gross-to-net execution",
      },
      {
        pos: "tr",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        ),
        title: "Statutory Filing",
        subtitle: "PF, ESI, PT & TDS rules",
      },
      {
        pos: "bc",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        ),
        title: "Direct Bank Payouts",
        subtitle: "Batch transfer & payslips",
      },
    ],
  },
  "talent-assets": {
    id: "talent-assets",
    title: "Talent & Operations",
    themeColor: "#004B49",
    bgTint: "#F6F8F8",
    borderColor: "#E5EAEA",
    iconBg: "#F6F8F8",
    hubGradient: "linear-gradient(145deg, #004B49 0%, #003836 100%)",
    centerIcon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="7" r="3.2" />
        <path d="M4.5 19a5.5 5.5 0 0 1 11 0" />
        <path d="M15.5 13l2.2 2.2 4.3-4.3" strokeWidth="2.4" />
      </svg>
    ),
    nodes: [
      {
        pos: "tl",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        ),
        title: "Recruitment",
        subtitle: "Pipeline & e-offers",
      },
      {
        pos: "tr",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        ),
        title: "Performance",
        subtitle: "OKRs & reviews",
      },
      {
        pos: "bc",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        ),
        title: "Assets",
        subtitle: "Custody & exit clearance",
      },
    ],
  },
};

function CategoryShowcaseVisualWidget({ categoryId }: { categoryId: string }) {
  const config = architectureHubConfigs[categoryId] || architectureHubConfigs["core-hr"];

  return (
    <div
      className="po-talent-hub-card"
      style={{
        background: config.bgTint,
        borderColor: config.borderColor,
        // @ts-ignore
        "--hub-stroke": config.themeColor,
      }}
      aria-label={`${config.title} interconnected architecture`}
    >
      {/* SVG Canvas for Background Dot Matrix, Concentric Rings & Connecting Moving Dotted Rays */}
      <svg className="po-talent-hub-svg" viewBox="0 0 460 290" fill="none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id={`poHubDots_${config.id}`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="1.15" fill={config.themeColor} opacity="0.14" />
          </pattern>
          <filter id={`poHubGlow_${config.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill={`url(#poHubDots_${config.id})`} />

        {/* Concentric rings centered at (230, 138) */}
        <circle cx="230" cy="138" r="54" stroke={config.themeColor} strokeWidth="1" strokeOpacity="0.18" />

        {/* Big Circle 1: Solid Full Round Thin Line + Smooth CLOCKWISE Running Arc */}
        <circle cx="230" cy="138" r="92" stroke={config.themeColor} strokeWidth="1.2" strokeOpacity="0.20" fill="none" />
        <circle
          cx="230"
          cy="138"
          r="92"
          stroke={config.themeColor}
          strokeWidth="1.6"
          strokeOpacity="0.75"
          strokeLinecap="round"
          strokeDasharray="130 448"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 230 138"
            to="360 230 138"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Big Circle 2: Solid Full Round Thin Line + Smooth ANTICLOCKWISE Running Arc */}
        <circle cx="230" cy="138" r="132" stroke={config.themeColor} strokeWidth="1.2" strokeOpacity="0.15" fill="none" />
        <circle
          cx="230"
          cy="138"
          r="132"
          stroke={config.themeColor}
          strokeWidth="1.6"
          strokeOpacity="0.65"
          strokeLinecap="round"
          strokeDasharray="180 649"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 230 138"
            to="0 230 138"
            dur="9s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Top vertical axis tick mark */}
        <path d="M 230 138 L 230 45" stroke={config.themeColor} strokeOpacity="0.16" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 9" />
        <path d="M 230 138 L 230 45" stroke={config.themeColor} strokeWidth="2.8" strokeLinecap="round" strokeDasharray="0.1 9" strokeOpacity="0.9" className="po-talent-ray">
          <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1s" repeatCount="indefinite" />
        </path>

        {/* 1. Ray to Top-Left Node (Only animated dotted ray, traveling round circle removed) */}
        <path d="M 230 138 L 140 68" stroke={config.themeColor} strokeOpacity="0.16" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 9" />
        <path d="M 230 138 L 140 68" stroke={config.themeColor} strokeWidth="2.8" strokeLinecap="round" strokeDasharray="0.1 9" strokeOpacity="0.9" className="po-talent-ray po-talent-ray-tl">
          <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1s" repeatCount="indefinite" />
        </path>

        {/* 2. Ray to Top-Right Node (Only animated dotted ray, traveling round circle removed) */}
        <path d="M 230 138 L 320 68" stroke={config.themeColor} strokeOpacity="0.16" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 9" />
        <path d="M 230 138 L 320 68" stroke={config.themeColor} strokeWidth="2.8" strokeLinecap="round" strokeDasharray="0.1 9" strokeOpacity="0.9" className="po-talent-ray po-talent-ray-tr">
          <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1s" repeatCount="indefinite" />
        </path>

        {/* 3. Ray to Bottom-Center Node (Only animated dotted ray, traveling round circle removed) */}
        <path d="M 230 138 L 230 214" stroke={config.themeColor} strokeOpacity="0.16" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 9" />
        <path d="M 230 138 L 230 214" stroke={config.themeColor} strokeWidth="2.8" strokeLinecap="round" strokeDasharray="0.1 9" strokeOpacity="0.9" className="po-talent-ray po-talent-ray-bc">
          <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Floating Center Hub Circle */}
      <div className="po-talent-center-hub">
        <div
          className="po-talent-center-inner"
          style={{
            background: config.hubGradient,
            boxShadow: `0 0 0 8px ${config.themeColor}14, 0 0 0 18px ${config.themeColor}0a, 0 10px 28px ${config.themeColor}40`,
          }}
        >
          {config.centerIcon}
        </div>
      </div>

      {/* 3 Connected Node Cards */}
      {config.nodes.map((node) => (
        <div key={node.pos} className={`po-talent-node-card po-talent-node-${node.pos}`}>
          <div
            className="po-talent-icon-box"
            style={{
              background: config.iconBg,
              color: config.themeColor,
            }}
          >
            {node.icon}
          </div>
          <div className="po-talent-node-text">
            <h4 className="po-talent-node-title">{node.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

const categoryShowcases: CategoryShowcase[] = [
  {
    id: "core-hr",
    badge: "Central Employee Ledger",
    badgeIcon: "employee",
    title: "Core HR",
    leadText: "One unified employee record connecting personal details, KYC paperwork, and reporting structures from onboarding to exit.",
    highlights: [
      "Searchable employee directory",
      "Bulk employee data upload",
      "Guided digital onboarding",
      "Documents & asset records",
    ],
    flowData: {
      pillLabel: "12 Profiles Active",
      statLabel: "100% KYC Synced",
      statIcon: "employee",
      steps: [
        {
          stepNum: "01",
          stepLabel: "Step 1 • Digital Onboarding",
          iconName: "employee",
          title: "Priya Sharma • Sr. Engineer",
          subtitle: "Digital offer accepted & record created",
          value: "Joined Today",
        },
        {
          stepNum: "02",
          stepLabel: "Step 2 • Encrypted Document Vault",
          iconName: "document",
          title: "Aadhaar, PAN & Bank Details",
          subtitle: "Bank validation & KYC stored",
          value: "Verified ✓",
        },
        {
          stepNum: "03",
          stepLabel: "Step 3 • Organization Hierarchy",
          iconName: "role",
          title: "Product Design Department",
          subtitle: "Reporting tier & access provisioned",
          value: "Live in Org Chart",
        },
      ],
    },
    products: [
      {
        id: "employee-mgmt",
        title: "Employee Management",
        href: "/features/employee-management",
        iconName: "employee",
        desc: "A single source of truth for digital KYC, bank accounts, emergency contacts, and multi-branch org charts.",
      },
      {
        id: "documents-compliance",
        title: "Documents & Compliance",
        href: "/features/documents-compliance",
        iconName: "document",
        desc: "Secure digital employee vaults with automated contract expiry alerts and digital signature acknowledgments.",
      },
      {
        id: "roles-permissions",
        title: "Roles & Permissions",
        href: "/features/roles-permissions",
        iconName: "shield",
        desc: "Enforce granular access controls by branch, department, and managerial tier with strict audit accountability.",
      },
    ],
  },
  {
    id: "attendance",
    badge: "Verified Presence & Shifts",
    badgeIcon: "clock",
    title: "Time & Attendance",
    leadText: "Track verified punches across factories, stores, and head offices with touchless GPS geofencing and real-time biometric terminal sync.",
    highlights: [
      "GPS mobile geofencing",
      "Biometric terminal sync",
      "Shift rostering & swaps",
      "Automated overtime tracking",
    ],
    flowData: {
      pillLabel: "228 / 248 Checked In",
      statLabel: "92% On-time",
      statIcon: "attendance",
      steps: [
        {
          stepNum: "01",
          stepLabel: "Step 1 • GPS Geofencing",
          iconName: "attendance",
          title: "Mumbai HQ • 09:14 AM",
          subtitle: "Touchless mobile clock-in verified",
          value: "Within Radius ✓",
        },
        {
          stepNum: "02",
          stepLabel: "Step 2 • Biometric Facial Push",
          iconName: "sparkle",
          title: "Factory Terminal Device #03",
          subtitle: "Anti-proxy match confirmed",
          value: "Verified",
        },
        {
          stepNum: "03",
          stepLabel: "Step 3 • Dynamic Roster Sync",
          iconName: "calendar",
          title: "Production Shift A Schedule",
          subtitle: "Overtime +1.5h auto-routed to manager",
          value: "Roster Linked",
        },
      ],
    },
    products: [
      {
        id: "attendance-mgmt",
        title: "Attendance Management",
        href: "/features/attendance-management",
        iconName: "attendance",
        desc: "Capture verified clock-ins via mobile GPS geofencing and facial-recognition biometric terminal sync in real time.",
      },
      {
        id: "leave-mgmt",
        title: "Leave Management",
        href: "/features/leave-management",
        iconName: "leave",
        desc: "Automate customized leave accruals, compensatory offs, and multi-tier manager approval chains without paperwork.",
      },
      {
        id: "shift-rosters",
        title: "Shift Rostering & Swaps",
        href: "/features/attendance-management",
        iconName: "calendar",
        desc: "Plan rotating, night, and split shifts with mobile shift swap requests and real-time manager alerts.",
      },
    ],
  },
  {
    id: "payroll",
    badge: "Statutory & Disbursements",
    badgeIcon: "payroll",
    title: "Payroll",
    leadText: "Run error-free payroll in minutes with 100% statutory compliance, automated tax calculations, and direct bank disbursements.",
    highlights: [
      "PF, ESI, PT & TDS engine",
      "1-Click direct bank payouts",
      "Instant mobile payslips",
      "Automated arrears runs",
    ],
    flowData: {
      pillLabel: "₹48.2L of ₹48.2L",
      statLabel: "100% Disbursed",
      statIcon: "wallet",
      steps: [
        {
          stepNum: "01",
          stepLabel: "Step 1 • Input Verification",
          iconName: "clock",
          title: "Attendance & Shift Sync",
          subtitle: "Zero formula errors flagged",
          value: "248 / 248 Staff",
        },
        {
          stepNum: "02",
          stepLabel: "Step 2 • Statutory Engine",
          iconName: "shield",
          title: "PF, ESI & TDS Auto-Calculated",
          subtitle: "100% compliance verified",
          value: "₹0 Discrepancy",
        },
        {
          stepNum: "03",
          stepLabel: "Step 3 • Direct Bank Payout",
          iconName: "finance",
          title: "HDFC, ICICI & SBI Batch File",
          subtitle: "Digital payslips auto-dispatched",
          value: "Disbursed ✓",
        },
      ],
    },
    products: [
      {
        id: "statutory-payroll",
        title: "Automated Payroll",
        href: "/features/payroll-management",
        iconName: "payroll",
        desc: "Run payroll in minutes with 100% accurate statutory compliance, automated tax calculations, and error-free execution.",
      },
      {
        id: "multibranch-payroll",
        title: "Multi-Branch Payroll",
        href: "/features/payroll-management",
        iconName: "branch",
        desc: "Pay employees across all branches while complying with localized state tax, PF, ESI, and bonus regulations.",
      },
      {
        id: "bank-disbursement",
        title: "Direct Bank Payouts",
        href: "/features/payroll-management",
        iconName: "wallet",
        desc: "Generate one-click bank upload files compatible with leading corporate banking partners with instant digital payslips.",
      },
    ],
  },
  {
    id: "talent-assets",
    badge: "People & Asset Custody",
    badgeIcon: "role",
    title: "Talent & Operations",
    leadText: "Equip and develop your team by managing candidate pipelines, continuous OKR alignment, and company device custody in one synchronized hub.",
    highlights: [
      "Candidate pipeline & ATS",
      "Continuous OKR tracking",
      "Hardware custody logs",
      "Automated exit clearances",
    ],
    flowData: {
      pillLabel: "38 Devices in Custody",
      statLabel: "Zero Unassigned Gear",
      statIcon: "asset",
      steps: [
        {
          stepNum: "01",
          stepLabel: "Step 1 • Hardware Handover",
          iconName: "asset",
          title: "MacBook Pro M3 Max",
          subtitle: "Serial #LT-9824 allocated & signed",
          value: "Custody Signed ✓",
        },
        {
          stepNum: "02",
          stepLabel: "Step 2 • Continuous OKR Tracking",
          iconName: "setup",
          title: "Q4 Platform Velocity",
          subtitle: "3 milestones aligned to appraisal matrix",
          value: "94% Achieved",
        },
        {
          stepNum: "03",
          stepLabel: "Step 3 • Candidate Pipeline",
          iconName: "role",
          title: "Lead Frontend Engineer",
          subtitle: "Final partner scorecard submitted",
          value: "Offer Released",
        },
      ],
    },
    products: [
      {
        id: "recruitment",
        title: "Recruitment & ATS",
        href: "/features/recruitment",
        iconName: "role",
        desc: "Track candidate pipelines from sourcing to structured scorecards and one-click digital offer releases.",
      },
      {
        id: "performance-mgmt",
        title: "Performance Management",
        href: "/features/performance-management",
        iconName: "setup",
        desc: "Align company targets with quarterly OKRs, structured 360° peer reviews, and transparent appraisal matrices.",
      },
      {
        id: "asset-mgmt",
        title: "Asset Management",
        href: "/features/asset-management",
        iconName: "asset",
        desc: "Track laptops, gear, and tools with digital custody sign-offs, warranty tracking, and offboarding recovery checks.",
      },
    ],
  },
];


const onboardingSteps = [
  {
    step: "01",
    title: "Book a Demo",
    subtitle: "Personalized Architecture Walkthrough",
    desc: "Meet with an HR technology specialist for a 30-minute interactive walkthrough mapped directly to your company size, shift patterns, and branch structure.",
    badge: "Step 1 • 30 mins",
  },
  {
    step: "02",
    title: "Set Up & Import Data",
    subtitle: "White-Glove Migration",
    desc: "Our dedicated onboarding managers bulk-import your employee rosters, historical leaves, salary structures, and biometric devices with zero data loss.",
    badge: "Step 2 • 3–5 Days",
  },
  {
    step: "03",
    title: "Go Live & Scale",
    subtitle: "Effortless Team Adoption",
    desc: "Issue mobile logins to your staff, train managers in under an hour, and execute your first automated attendance and payroll run with live specialist support.",
    badge: "Step 3 • 100% Live",
  },
];

interface InteractiveConnectStep {
  id: number;
  stepNum: string;
  title: string;
  badge: string;
  iconName: IconName;
  desc: string;
}

const interactiveConnectSteps: InteractiveConnectStep[] = [
  {
    id: 0,
    stepNum: "01",
    title: "Hiring",
    badge: "Provisions profile",
    iconName: "role",
    desc: "Employee details flow into one profile.",
  },
  {
    id: 1,
    stepNum: "02",
    title: "Attendance",
    badge: "Real-time punches",
    iconName: "clock",
    desc: "Track shifts, punches and overtime.",
  },
  {
    id: 2,
    stepNum: "03",
    title: "Leave",
    badge: "Balance auto-sync",
    iconName: "calendar",
    desc: "Keep leave balances up to date.",
  },
  {
    id: 3,
    stepNum: "04",
    title: "Payroll",
    badge: "1-Click net pay",
    iconName: "payroll",
    desc: "Calculate pay from attendance and leave.",
  },
  {
    id: 4,
    stepNum: "05",
    title: "Assets",
    badge: "Custody clearance",
    iconName: "asset",
    desc: "Track assigned devices through exit.",
  },
];

const connectBottomPaths = [
  "M 270 116 C 270 162, 55 142, 55 183",
  "M 270 116 C 270 162, 162 152, 162 183",
  "M 270 116 L 270 183",
  "M 270 116 C 270 162, 378 152, 378 183",
  "M 270 116 C 270 162, 485 142, 485 183",
];

const connectNodePositions = [
  { x: 55, y: 205 },
  { x: 162, y: 205 },
  { x: 270, y: 205 },
  { x: 378, y: 205 },
  { x: 485, y: 205 },
];

export function ProductOverview() {
  const breadcrumbs = [{ label: "Product Overview" }];
  const [activeConnectStep, setActiveConnectStep] = useState(0);
  const [isConnectPaused, setIsConnectPaused] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    if (isConnectPaused) return;
    const interval = setInterval(() => {
      setActiveConnectStep((prev) => (prev + 1) % interactiveConnectSteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isConnectPaused]);

  return (
    <PageLayout breadcrumbs={breadcrumbs} onOpenDemo={() => setIsDemoModalOpen(true)}>
      <SEO
        title="Product Overview | All-In-One HRMS Platform | LattiumHR"
        description="One platform for every part of HR. Explore all 10 LattiumHR modules: Core HR, attendance, payroll, assets, recruitment, and performance connected on a single employee record."
        canonicalPath="/product"
      />

      {/* 1. Hero */}
      <section className="po-hero-section">
        <div className="po-hero-grid-pattern" />
        <div className="po-hero-ambient" />
        <div className="container">
          <div className="po-hero-content">
            <span className="po-hero-eyebrow">
              <Icon name="sparkle" size={14} />
              ALL-IN-ONE HRMS ARCHITECTURE
            </span>

            <h1 className="po-hero-title">
              One platform for <span className="po-hero-title-accent">every part of HR</span>
            </h1>

            <p className="po-hero-promise">
              Connect your entire people operations—from candidate sourcing to biometric attendance and statutory payroll—on one single, real-time employee ledger.
            </p>

            <div className="po-hero-actions">
              <Button onClick={() => setIsDemoModalOpen(true)}>
                Book a Demo <Icon name="arrow" size={16} />
              </Button>
              <Button href="#categories" secondary className="po-secondary-action-btn">
                Explore modules
              </Button>
            </div>

            {/* Proof highlights pill row */}
            <div className="po-hero-proof-row">
              <div className="po-hero-proof-item">
                <span className="po-proof-dot">●</span>
                <span>10 Unified Modules</span>
              </div>
              <div className="po-hero-proof-separator">•</div>
              <div className="po-hero-proof-item">
                <span className="po-proof-dot">●</span>
                <span>Multi-Branch Biometrics</span>
              </div>
              <div className="po-hero-proof-separator">•</div>
              <div className="po-hero-proof-item">
                <span className="po-proof-dot">●</span>
                <span>100% Statutory Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Explore by Category */}
      <section id="categories" className="po-categories-section">
        <div className="container">
          <SectionHeading
            eyebrow="EXPLORE BY CATEGORY"
            title="Everything your organization needs to run smooth HR"
            center
          />

          <div className="po-showcase-container">
            {categoryShowcases.map((cat, idx) => {
              const isReversed = idx % 2 === 1;
              const hubConfig = architectureHubConfigs[cat.id] || architectureHubConfigs["core-hr"];
              return (
                <Fragment key={cat.id}>
                  {/* High-Converting Mid-Page CTA Section Above Payroll - Exact Match to Screenshot */}
                  {cat.id === "payroll" && (
                    <div className="po-impact-cta-banner po-connected-banner" id="product-payroll-cta">
                      {/* Atmospheric Glowing Orbs */}
                      <div className="po-impact-ambient-orb po-impact-orb-warm" aria-hidden="true" />
                      <div className="po-impact-ambient-orb po-impact-orb-plum" aria-hidden="true" />

                      <div className="po-impact-cta-grid">
                        {/* Left Column: Eyebrow, Heading, Subtitle, Action Buttons, Trust Points */}
                        <div className="po-impact-left">
                          <div className="po-impact-eyebrow">
                            <span className="po-impact-eyebrow-icon">✦</span>
                            <span>BUILT FOR GROWING TEAMS</span>
                          </div>

                          <h2 className="po-impact-heading">
                            Your people deserve better than busywork.
                          </h2>

                          <p className="po-impact-subtext">
                            Give your HR team hours back every week and create the employee experience your best people expect.
                          </p>

                          <div className="po-impact-btn-row">
                            <button
                              type="button"
                              className="po-impact-btn-primary"
                              onClick={() => setIsDemoModalOpen(true)}
                              style={{ cursor: "pointer", fontFamily: "inherit", border: "none" }}
                            >
                              Book your free demo <span className="po-impact-btn-arrow">→</span>
                            </button>

                            <a href="#how-it-connects" className="po-impact-btn-secondary">
                              <Icon name="sparkle" size={14} />
                              <span>See how it connects</span>
                            </a>
                          </div>

                          <div className="po-impact-trust-list">
                            <span className="po-impact-trust-item">
                              <span className="po-impact-check-circle">✓</span>
                              <span>14-day free trial</span>
                            </span>
                            <span className="po-impact-trust-item">
                              <span className="po-impact-check-circle">✓</span>
                              <span>No credit card required</span>
                            </span>
                            <span className="po-impact-trust-item">
                              <span className="po-impact-check-circle">✓</span>
                              <span>Setup support included</span>
                            </span>
                          </div>
                        </div>

                        {/* Right Column: The White Customer Impact Card */}
                        <div className="po-impact-card-wrapper">
                          <div className="po-impact-card">
                            {/* Card Header */}
                            <div className="po-impact-card-header">
                              <span className="po-impact-card-eyebrow">
                                <span className="po-impact-card-sparkle">✦</span> CUSTOMER IMPACT
                              </span>
                              <span className="po-impact-card-badge">First 90 days</span>
                            </div>

                            {/* Stat Row */}
                            <div className="po-impact-stat-row">
                              <span className="po-impact-stat-big">10+</span>
                              <div className="po-impact-stat-meta">
                                <h3 className="po-impact-stat-title">hours saved</h3>
                                <p className="po-impact-stat-sub">every week for your HR team</p>
                              </div>
                            </div>

                            {/* 6 Impact Vertical Bars */}
                            <div className="po-impact-bars-row">
                              <div className="po-impact-bar-track">
                                <div className="po-impact-bar-fill" style={{ height: "34%" }} />
                              </div>
                              <div className="po-impact-bar-track">
                                <div className="po-impact-bar-fill" style={{ height: "46%" }} />
                              </div>
                              <div className="po-impact-bar-track">
                                <div className="po-impact-bar-fill" style={{ height: "54%" }} />
                              </div>
                              <div className="po-impact-bar-track">
                                <div className="po-impact-bar-fill" style={{ height: "68%" }} />
                              </div>
                              <div className="po-impact-bar-track">
                                <div className="po-impact-bar-fill" style={{ height: "84%" }} />
                              </div>
                              <div className="po-impact-bar-track">
                                <div className="po-impact-bar-fill" style={{ height: "100%" }} />
                              </div>
                            </div>

                            {/* 2 Metric Boxes */}
                            <div className="po-impact-metrics-row">
                              <div className="po-impact-metric-box">
                                <span className="po-impact-metric-val">42%</span>
                                <span className="po-impact-metric-label">faster onboarding</span>
                              </div>
                              <div className="po-impact-metric-box">
                                <span className="po-impact-metric-val">96%</span>
                                <span className="po-impact-metric-label">less manual admin</span>
                              </div>
                            </div>

                            {/* Dark Testimonial Box */}
                            <div className="po-impact-testimonial-box">
                              <div className="po-impact-quote-line">
                                <span className="po-impact-quote-mark">“</span>
                                <p className="po-impact-quote-text">
                                  Peoplely gave our HR team time back to focus on what matters most—our people.
                                </p>
                              </div>
                              <div className="po-impact-author-row">
                                <div className="po-impact-author-avatar">SK</div>
                                <div className="po-impact-author-meta">
                                  <span className="po-impact-author-name">Sarah Kim</span>
                                  <span className="po-impact-author-title">Head of People, Northstar</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    id={`category-${cat.id}`}
                    className={`po-category-showcase po-category-bento-card po-block-${cat.id}`}
                    style={{
                      // @ts-ignore
                      "--cat-theme": hubConfig.themeColor,
                      // @ts-ignore
                      "--cat-icon-bg": hubConfig.iconBg,
                      // @ts-ignore
                      "--cat-border": hubConfig.borderColor,
                    }}
                  >
                    {/* Bento Top Header: Alternating right / left layout */}
                    <div className={`po-category-bento-top ${isReversed ? "po-category-bento-top--reverse" : ""}`}>
                      <div className="po-category-header-info">
                        <span className="eyebrow po-category-eyebrow">
                          <span className="po-category-eyebrow-icon">
                            <Icon name={cat.badgeIcon} size={13} />
                          </span>
                          <span>{cat.badge}</span>
                        </span>
                        <h2 className="po-category-title">{cat.title}</h2>
                        <p className="po-category-lead-text">{cat.leadText}</p>

                        {/* 2-Column Keypoints List matching Home page / screenshot */}
                        <ul className="po-category-keypoints-list">
                          {cat.highlights.map((hl) => (
                            <li key={hl} className="po-category-keypoint-item">
                              <span className="po-keypoint-check">
                                <Icon name="check" size={13} />
                              </span>
                              <span className="po-keypoint-text">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="po-category-header-visual">
                        <CategoryShowcaseVisualWidget categoryId={cat.id} />
                      </div>
                    </div>

                    {/* 3 Product Cards inside the main card at the bottom */}
                    <div className="po-cards-grid-3">
                      {cat.products.map((prod) => (
                        <div key={prod.id} className="rippling-product-card po-bento-subcard">
                          <div className="po-bento-subcard-content">
                            <span className="rippling-card-icon">
                              <ProductIcon item={prod} />
                            </span>
                            <h3 className="rippling-card-title">{prod.title}</h3>
                            <p className="rippling-card-desc">{prod.desc}</p>
                          </div>
                          <Link to={prod.href} className="rippling-card-link">
                            Learn more <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How It All Connects (Interactive Visual Pipeline matching Figma design) */}
      <section id="how-it-connects" className="po-connect-section">
        <div className="container">
          <SectionHeading
            eyebrow="UNIFIED ARCHITECTURE"
            title="How it all connects"
            body="See how a single employee record creates an unbroken data pipeline across the entire workplace lifecycle."
            center
          />

          <div
            className="po-connect-interactive-grid"
            onMouseEnter={() => setIsConnectPaused(true)}
            onMouseLeave={() => setIsConnectPaused(false)}
          >
            {/* Left Column: Visual Diagram Canvas */}
            <div className="po-connect-canvas-box" aria-label="Interactive architecture flow diagram">
              {/* Top 3 Interactive Cards */}
              <div className="po-cc-cards-row">
                {/* Card 1: Priya Sharma Profile */}
                <div
                  className={`po-cc-emp-card ${activeConnectStep === 0 ? "po-cc-card-highlight" : ""}`}
                  onClick={() => setActiveConnectStep(0)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="po-cc-emp-header">
                    <div className="po-cc-emp-avatar">PS</div>
                    <div className="po-cc-emp-header-text">
                      <div className="po-cc-emp-name-row">
                        <span className="po-cc-emp-name">Priya Sharma</span>
                        <span className="po-cc-emp-pill">New joiner</span>
                      </div>
                      <span className="po-cc-emp-role">Sr. Accountant • Bengaluru</span>
                    </div>
                  </div>
                  <div className="po-cc-emp-body">
                    <div className="po-cc-info-row">
                      <span className="po-cc-info-label">Branch</span>
                      <span className="po-cc-info-val">Koramangala</span>
                    </div>
                    <div className="po-cc-info-row">
                      <span className="po-cc-info-label">Manager</span>
                      <span className="po-cc-info-val">Rahul Nair</span>
                    </div>
                    <div className="po-cc-info-row">
                      <span className="po-cc-info-label">KYC</span>
                      <span className="po-cc-info-val po-cc-text-emerald">Verified ✓</span>
                    </div>
                    <div className="po-cc-info-row">
                      <span className="po-cc-info-label">Laptop</span>
                      <span className={`po-cc-info-val ${activeConnectStep === 4 ? "po-cc-text-emerald" : "po-cc-text-muted"}`}>
                        {activeConnectStep === 4 ? "Assigned ✓" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Month-end close • Oct */}
                <div
                  className="po-cc-task-card"
                  onClick={() => setActiveConnectStep(1)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="po-cc-task-title">Month-end close • Oct</div>
                  <div className="po-cc-checklist">
                    {[
                      { label: "Attendance synced", done: activeConnectStep >= 1 },
                      { label: "Leave approved", done: activeConnectStep >= 2 },
                      { label: "Overtime verified", done: activeConnectStep >= 1 },
                      { label: "Run payroll", done: activeConnectStep >= 3 },
                      { label: "Release payslips", done: activeConnectStep >= 3 },
                    ].map((item, i) => (
                      <div key={i} className="po-cc-check-item">
                        <span className={`po-cc-check-circle ${item.done ? "po-cc-check-circle-done" : ""}`}>
                          {item.done ? "✓" : ""}
                        </span>
                        <span className={`po-cc-check-label ${item.done ? "po-cc-check-label-done" : ""}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3: Payroll run */}
                <div
                  className={`po-cc-payroll-card ${activeConnectStep === 3 ? "po-cc-card-highlight" : ""}`}
                  onClick={() => setActiveConnectStep(3)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="po-cc-payroll-header">
                    <div className="po-cc-payroll-avatar">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <div className="po-cc-payroll-header-text">
                      <div className="po-cc-payroll-name-row">
                        <span className="po-cc-payroll-name">Payroll run</span>
                        <span className="po-cc-payroll-pill">Automated</span>
                      </div>
                      <span className="po-cc-payroll-role">Direct deposit • Oct</span>
                    </div>
                  </div>
                  <div className="po-cc-payroll-body">
                    <div className="po-cc-donut-wrap">
                      <svg viewBox="0 0 48 48" className="po-cc-donut-svg">
                        <circle cx="24" cy="24" r="19" fill="none" stroke="#f1f5f9" strokeWidth="3.8" />
                        <circle
                          cx="24"
                          cy="24"
                          r="19"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.8"
                          strokeDasharray="119.38 119.38"
                          strokeDashoffset={activeConnectStep >= 3 ? "0" : "119.38"}
                          strokeLinecap={activeConnectStep >= 3 ? "butt" : "round"}
                          className="po-cc-donut-progress"
                          style={{
                            opacity: activeConnectStep >= 3 ? 1 : 0.35,
                          }}
                        />
                      </svg>
                      <div className="po-cc-donut-inner">
                        <span className="po-cc-donut-pct">{activeConnectStep >= 3 ? "100%" : "0%"}</span>
                        <span className="po-cc-donut-sub">{activeConnectStep >= 3 ? "DONE" : "PENDING"}</span>
                      </div>
                    </div>
                    <div className="po-cc-payroll-meta">
                      <div className="po-cc-meta-row">
                        <span className="po-cc-dot-green">●</span> Processed
                      </div>
                      <div className="po-cc-meta-row">
                        <span className="po-cc-dot-gray">●</span> Remaining
                      </div>
                      <div className="po-cc-payroll-sub">PF • ESI • TDS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center SVG Connection Network */}
              <div className="po-cc-svg-container">
                <svg viewBox="0 0 540 260" className="po-cc-svg-layer" fill="none">
                  <defs>
                    <filter id="poCleanGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="glow" />
                      <feComposite in="SourceGraphic" in2="glow" operator="over" />
                    </filter>
                  </defs>

                  {/* Top 3 feed lines to Center Hub with animated traveling dots */}
                  <path
                    d="M 105 0 C 105 48, 270 38, 270 68"
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle r="3.5" fill="#004B49" opacity="0.95" filter="drop-shadow(0 0 5px rgba(0, 75, 73, 0.85))">
                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M 105 0 C 105 48, 270 38, 270 68" />
                  </circle>

                  <path
                    d="M 270 0 L 270 68"
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle r="3.5" fill="#004B49" opacity="0.95" filter="drop-shadow(0 0 5px rgba(0, 75, 73, 0.85))">
                    <animateMotion dur="2.0s" repeatCount="indefinite" path="M 270 0 L 270 68" />
                  </circle>

                  <path
                    d="M 435 0 C 435 48, 270 38, 270 68"
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle r="3.5" fill="#004B49" opacity="0.95" filter="drop-shadow(0 0 5px rgba(0, 75, 73, 0.85))">
                    <animateMotion dur="2.4s" repeatCount="indefinite" path="M 435 0 C 435 48, 270 38, 270 68" />
                  </circle>

                  {/* 5 Bottom connecting branch paths with animated moving dots along the wave lines */}
                  {connectBottomPaths.map((p, idx) => {
                    const isActive = activeConnectStep === idx;
                    return (
                      <g key={idx}>
                        <path
                          d={p}
                          stroke={isActive ? "rgba(255, 255, 255, 0.55)" : "rgba(255, 255, 255, 0.16)"}
                          strokeWidth={isActive ? "1.8" : "1.2"}
                          strokeDasharray={isActive ? "none" : "3 3"}
                          className="po-cc-branch-path"
                        />
                        {/* Animated moving dot travelling through the wave line */}
                        {isActive ? (
                          <g>
                            <circle r="5.5" fill="rgba(0, 75, 73, 0.35)">
                              <animateMotion dur="1.4s" repeatCount="indefinite" path={p} />
                            </circle>
                            <circle r="3.5" fill="#ffffff" filter="drop-shadow(0 0 6px #004B49)">
                              <animateMotion dur="1.4s" repeatCount="indefinite" path={p} />
                            </circle>
                          </g>
                        ) : (
                          <circle r="2" fill="rgba(255, 255, 255, 0.3)">
                            <animateMotion dur={`${2.2 + idx * 0.35}s`} repeatCount="indefinite" path={p} />
                          </circle>
                        )}
                      </g>
                    );
                  })}

                  {/* Center Hub (Avatar + checkmark) */}
                  <g className="po-cc-center-hub">
                    <circle cx="270" cy="92" r="30" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
                    <circle cx="270" cy="92" r="22" fill="#004B49" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35))" />
                    <foreignObject x="257" y="79" width="26" height="26" className="pointer-events-none">
                      <div className="po-cc-hub-icon-wrap">
                        <Icon name="check" size={16} />
                      </div>
                    </foreignObject>
                  </g>

                  {/* 5 Bottom Interactive Nodes */}
                  {interactiveConnectSteps.map((step, idx) => {
                    const pos = connectNodePositions[idx];
                    const isActive = activeConnectStep === idx;
                    return (
                      <g
                        key={step.id}
                        onClick={() => setActiveConnectStep(idx)}
                        className="po-cc-bottom-node-group"
                        style={{ cursor: "pointer" }}
                      >
                        {isActive && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="25"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.45)"
                            strokeWidth="1.5"
                            className="po-cc-node-pulse"
                          />
                        )}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="20"
                          fill={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.08)"}
                          stroke={isActive ? "#004B49" : "rgba(255, 255, 255, 0.22)"}
                          strokeWidth={isActive ? "2.5" : "1.5"}
                          filter={isActive ? "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3))" : undefined}
                        />
                        <foreignObject x={pos.x - 12} y={pos.y - 12} width="24" height="24" className="pointer-events-none">
                          <div
                            style={{
                              display: "grid",
                              placeItems: "center",
                              width: "100%",
                              height: "100%",
                              color: isActive ? "#004B49" : "#cbd5e1",
                            }}
                          >
                            <Icon name={step.iconName} size={15} />
                          </div>
                        </foreignObject>
                        <text
                          x={pos.x}
                          y={pos.y + 35}
                          textAnchor="middle"
                          fill={isActive ? "#ffffff" : "#cbd5e1"}
                          fontSize="11.5"
                          fontWeight={isActive ? "700" : "450"}
                          fontFamily="Inter, sans-serif"
                        >
                          {step.title}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Right Column: 5 Interactive Steps List matching Screenshot */}
            <div className="po-connect-steps-list">
              {interactiveConnectSteps.map((step, idx) => {
                const isActive = activeConnectStep === idx;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveConnectStep(idx)}
                    className={`po-step-row-item ${isActive ? "po-step-row-item--active" : ""}`}
                  >
                    <div className="po-step-row-icon">
                      <Icon name={step.iconName} size={20} />
                    </div>
                    <div className="po-step-row-content">
                      <div className="po-step-row-header-row">
                        <div className="po-step-row-title-area">
                          <span className="po-step-row-num">{step.stepNum}</span>
                          <h4 className="po-step-row-title">{step.title}</h4>
                        </div>
                        <span className="po-step-row-badge">{step.badge}</span>
                      </div>
                      <p className="po-step-row-desc">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Architecture Guarantees */}
          <div className="po-connect-guarantees">
            <span className="po-guarantee-item">
              <Icon name="check" size={14} /> Zero duplicate spreadsheets
            </span>
            <span className="po-guarantee-separator">•</span>
            <span className="po-guarantee-item">
              <Icon name="check" size={14} /> Instant cross-module sync
            </span>
            <span className="po-guarantee-separator">•</span>
            <span className="po-guarantee-item">
              <Icon name="check" size={14} /> 100% audit-proof compliance
            </span>
          </div>
        </div>
      </section>

      {/* 5. Getting Started (3 steps: Book a demo, Set up and import data, Go live) */}
      <section className="po-steps-section">
        <div className="container">
          <SectionHeading
            eyebrow="IMPLEMENTATION JOURNEY"
            title="Getting started in 3 simple steps"
            body="Our proven deployment playbook gets multi-branch businesses up and running in days, not months."
            center
          />

          <div className="po-cards-grid-3">
            {onboardingSteps.map((stepItem) => (
              <div key={stepItem.step} className="rippling-product-card">
                <div>
                  <span className="rippling-card-icon">{stepItem.step}</span>
                  <h3 className="rippling-card-title">{stepItem.title}</h3>
                  <span className="po-step-badge-inline">{stepItem.badge}</span>
                  <p className="rippling-card-desc" style={{ marginTop: "12px" }}>
                    {stepItem.desc}
                  </p>
                </div>
                <button
                  type="button"
                  className="rippling-card-link"
                  onClick={() => setIsDemoModalOpen(true)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  Get started <span aria-hidden="true">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RequestDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Book Your Free LattiumHR Demo"
        subtitle="Experience our 10 unified HR modules with a live product architect."
        defaultInterest="Full Platform"
      />
    </PageLayout>
  );
}

export default ProductOverview;
