import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import RequestDemoModal from "../components/common/RequestDemoModal";
import "./EmployeeManagementPage.css";

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

interface MetricBar {
  label: string;
  count: number | string;
  widthPercent: number;
}

interface DonutSegment {
  percent: number;
  color: string;
}

interface LegendItem {
  label: string;
  color: string;
}

interface CategoryWidgetData {
  id: string;
  mainCard: {
    title: string;
    subtitle: string;
    status: string;
    metricLabel: string;
    metricValue: string;
    metricSub: string;
    bars: MetricBar[];
    footerLabel: string;
    buttonText: string;
  };
  sidePill: {
    text: string;
  };
  donutCard: {
    title: string;
    segments: DonutSegment[];
    legend: LegendItem[];
  };
  detailCard: {
    title: string;
    badgeText: string;
    badgeClass: string;
    row1Label: string;
    row1Val: string;
    row2Label: string;
    row2Val: string;
    netLabel: string;
    netVal: string;
  };
}

const CATEGORY_WIDGET_CONFIGS: Record<string, CategoryWidgetData> = {
  "core-hr": {
    id: "core-hr",
    mainCard: {
      title: "Workforce Directory • Live",
      subtitle: "All entities • 248 staff",
      status: "Active",
      metricLabel: "Total Headcount",
      metricValue: "248 Staff",
      metricSub: "▲ 100% KYC verified",
      bars: [
        { label: "Engineering", count: 112, widthPercent: 88 },
        { label: "Operations", count: 84, widthPercent: 66 },
        { label: "Corporate", count: 52, widthPercent: 41 },
      ],
      footerLabel: "Sync: 2m ago",
      buttonText: "Manage directory →",
    },
    sidePill: {
      text: "Aadhaar & PAN Vault",
    },
    donutCard: {
      title: "DOCUMENTS",
      segments: [
        { percent: 64, color: "#802B5B" },
        { percent: 24, color: "#b34d85" },
        { percent: 12, color: "#e29bc1" },
      ],
      legend: [
        { label: "Verified", color: "#802B5B" },
        { label: "In Review", color: "#b34d85" },
        { label: "Archived", color: "#e29bc1" },
      ],
    },
    detailCard: {
      title: "Employee File",
      badgeText: "KYC",
      badgeClass: "po-ui-badge-tag--green",
      row1Label: "Rahul Sharma",
      row1Val: "Sr. Eng",
      row2Label: "Department",
      row2Val: "Platform",
      netLabel: "Status",
      netVal: "Joined • 100%",
    },
  },
  "attendance": {
    id: "attendance",
    mainCard: {
      title: "Daily Attendance • Real-Time",
      subtitle: "3 shifts • 236 present",
      status: "On Track",
      metricLabel: "Present Today",
      metricValue: "96.4% Present",
      metricSub: "▲ 0 proxy alerts",
      bars: [
        { label: "Mobile GPS", count: 142, widthPercent: 86 },
        { label: "Biometric", count: 68, widthPercent: 52 },
        { label: "Field Punch", count: 26, widthPercent: 28 },
      ],
      footerLabel: "Roster: Shift A",
      buttonText: "View shift roster →",
    },
    sidePill: {
      text: "Shift Roster Linked",
    },
    donutCard: {
      title: "PUNCH MODES",
      segments: [
        { percent: 58, color: "#802B5B" },
        { percent: 28, color: "#b34d85" },
        { percent: 14, color: "#e29bc1" },
      ],
      legend: [
        { label: "GPS Mobile", color: "#802B5B" },
        { label: "Biometric", color: "#b34d85" },
        { label: "Web Portal", color: "#e29bc1" },
      ],
    },
    detailCard: {
      title: "Clock-In Event",
      badgeText: "LIVE",
      badgeClass: "po-ui-badge-tag--plum",
      row1Label: "Priya Verma",
      row1Val: "09:02 AM",
      row2Label: "Verification",
      row2Val: "Geofence OK",
      netLabel: "Status",
      netVal: "On-Time Punch",
    },
  },
  "payroll": {
    id: "payroll",
    mainCard: {
      title: "Payroll run • October",
      subtitle: "4 branches • 128 employees",
      status: "Ready",
      metricLabel: "Net payout",
      metricValue: "₹ 38,42,610",
      metricSub: "▲ 0 errors",
      bars: [
        { label: "Bengaluru", count: 48, widthPercent: 82 },
        { label: "Mumbai", count: 36, widthPercent: 62 },
        { label: "Delhi NCR", count: 29, widthPercent: 50 },
      ],
      footerLabel: "Sample data",
      buttonText: "Disburse to bank →",
    },
    sidePill: {
      text: "Bank file ready",
    },
    donutCard: {
      title: "STATUTORY",
      segments: [
        { percent: 52, color: "#802B5B" },
        { percent: 28, color: "#b34d85" },
        { percent: 20, color: "#e29bc1" },
      ],
      legend: [
        { label: "PF", color: "#802B5B" },
        { label: "ESI", color: "#b34d85" },
        { label: "PT • TDS", color: "#e29bc1" },
      ],
    },
    detailCard: {
      title: "Payslip",
      badgeText: "PDF",
      badgeClass: "po-ui-badge-tag--red",
      row1Label: "Earnings",
      row1Val: "₹ 46,000",
      row2Label: "Deductions",
      row2Val: "₹ 5,500",
      netLabel: "Net pay",
      netVal: "₹ 40,500",
    },
  },
  "talent-assets": {
    id: "talent-assets",
    mainCard: {
      title: "Talent & Operations • Q4",
      subtitle: "Hiring, OKRs & Devices",
      status: "Synced",
      metricLabel: "Hiring & Asset Health",
      metricValue: "94.2% Health",
      metricSub: "▲ 18 e-offers signed",
      bars: [
        { label: "Open Roles", count: 14, widthPercent: 45 },
        { label: "OKRs Tracked", count: 42, widthPercent: 78 },
        { label: "Laptops Active", count: 186, widthPercent: 92 },
      ],
      footerLabel: "Cycle: Active",
      buttonText: "Review pipeline →",
    },
    sidePill: {
      text: "100% Asset Clearance",
    },
    donutCard: {
      title: "PERFORMANCE",
      segments: [
        { percent: 55, color: "#802B5B" },
        { percent: 32, color: "#b34d85" },
        { percent: 13, color: "#e29bc1" },
      ],
      legend: [
        { label: "Exceeding", color: "#802B5B" },
        { label: "On Target", color: "#b34d85" },
        { label: "In Review", color: "#e29bc1" },
      ],
    },
    detailCard: {
      title: "Asset Custody",
      badgeText: "HW",
      badgeClass: "po-ui-badge-tag--plum",
      row1Label: "MacBook Pro M3",
      row1Val: "ZNT-LT-0482",
      row2Label: "Custody",
      row2Val: "Rahul S. • OK",
      netLabel: "Coverage",
      netVal: "Active Custody",
    },
  },
};

const DONUT_CIRCUMFERENCE = 75.398;

function DonutChart({ segments }: { segments: DonutSegment[] }) {
  let accumulatedPercent = 0;
  return (
    <svg className="po-ui-donut" width="36" height="36" viewBox="0 0 34 34" aria-hidden="true">
      {segments.map((seg, i) => {
        const strokeLength = (seg.percent / 100) * DONUT_CIRCUMFERENCE;
        const gapLength = DONUT_CIRCUMFERENCE - strokeLength;
        const offset = -(accumulatedPercent / 100) * DONUT_CIRCUMFERENCE;
        accumulatedPercent += seg.percent;
        return (
          <circle
            key={i}
            cx="17"
            cy="17"
            r="12"
            fill="none"
            stroke={seg.color}
            strokeWidth="5"
            strokeDasharray={`${strokeLength.toFixed(1)} ${gapLength.toFixed(1)}`}
            strokeDashoffset={offset.toFixed(1)}
            transform="rotate(-90 17 17)"
          />
        );
      })}
    </svg>
  );
}

function CategoryShowcaseVisualWidget({
  categoryId,
  onAction,
}: {
  categoryId: string;
  onAction?: () => void;
}) {
  const data = CATEGORY_WIDGET_CONFIGS[categoryId] || CATEGORY_WIDGET_CONFIGS["payroll"];

  return (
    <div className="po-ui-dashboard-container" aria-label={`${data.mainCard.title} preview dashboard`}>
      {/* Left Main Card */}
      <div className="po-ui-main-card">
        <div>
          {/* Header */}
          <div className="po-ui-card-header">
            <div>
              <h4 className="po-ui-main-title">{data.mainCard.title}</h4>
              <p className="po-ui-main-sub">{data.mainCard.subtitle}</p>
            </div>
            <span className="po-ui-status-badge">
              <span
                style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#059669",
                  marginRight: 4,
                  verticalAlign: "middle",
                }}
              />
              {data.mainCard.status}
            </span>
          </div>

          {/* Metric */}
          <div className="po-ui-metric-section">
            <p className="po-ui-metric-label">{data.mainCard.metricLabel}</p>
            <div className="po-ui-metric-row">
              <h3 className="po-ui-metric-value">{data.mainCard.metricValue}</h3>
              <span className="po-ui-metric-sub">{data.mainCard.metricSub}</span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="po-ui-bars-list">
            {data.mainCard.bars.map((bar, i) => (
              <div key={i} className="po-ui-bar-row">
                <span className="po-ui-bar-label" title={bar.label}>
                  {bar.label}
                </span>
                <div className="po-ui-bar-track">
                  <div className="po-ui-bar-fill" style={{ width: `${bar.widthPercent}%` }} />
                </div>
                <span className="po-ui-bar-count">{bar.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="po-ui-card-footer">
          <span className="po-ui-footer-label">{data.mainCard.footerLabel}</span>
          <button
            type="button"
            className="po-ui-btn-action"
            onClick={onAction}
            aria-label={`${data.mainCard.buttonText} for ${data.mainCard.title}`}
          >
            {data.mainCard.buttonText}
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div className="po-ui-side-col">
        {/* Top Pill */}
        <div className="po-ui-side-pill">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#15803d"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{data.sidePill.text}</span>
        </div>

        {/* Middle Donut Card */}
        <div className="po-ui-side-card">
          <div className="po-ui-side-card-title">{data.donutCard.title}</div>
          <div className="po-ui-donut-wrap">
            <DonutChart segments={data.donutCard.segments} />
            <div className="po-ui-legend-list">
              {data.donutCard.legend.map((item, i) => (
                <div key={i} className="po-ui-legend-item">
                  <span className="po-ui-legend-dot" style={{ backgroundColor: item.color }} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Detail Card */}
        <div className="po-ui-side-card">
          <div className="po-ui-detail-card-head">
            <span className="po-ui-detail-title">{data.detailCard.title}</span>
            <span className={`po-ui-badge-tag ${data.detailCard.badgeClass}`}>{data.detailCard.badgeText}</span>
          </div>
          <div className="po-ui-detail-row">
            <span>{data.detailCard.row1Label}</span>
            <span style={{ fontWeight: 600, color: "#111827" }}>{data.detailCard.row1Val}</span>
          </div>
          <div className="po-ui-detail-row">
            <span>{data.detailCard.row2Label}</span>
            <span style={{ fontWeight: 500 }}>{data.detailCard.row2Val}</span>
          </div>
          <div className="po-ui-detail-divider" />
          <div className="po-ui-detail-net">
            <span>{data.detailCard.netLabel}</span>
            <span>{data.detailCard.netVal}</span>
          </div>
        </div>
      </div>
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
        title="Product Overview | All-In-One HRMS Platform | Zentilos"
        description="One platform for every part of HR. Explore all 10 Zentilos modules: Core HR, attendance, payroll, assets, recruitment, and performance connected on a single employee record."
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
              const themeColor = "#802B5B";
              const iconBg = "#f7ebf3";
              const borderColor = "#ede4ec";
              return (
                <Fragment key={cat.id}>
                  {/* High-Converting Mid-Page CTA Section Above Payroll - Matches Employee Management Page Mid-CTA */}
                  {cat.id === "payroll" && (
                    <div className="emp-center-cta-card po-mid-center-cta-card" style={{ marginBottom: "48px", marginTop: "16px" }}>
                      {/* Primary Color Accent Block */}
                      <div className="emp-cta-primary-bar" />

                      {/* Overlapping Product Platform Dashboard Image */}
                      <div className="emp-cta-img-wrap">
                        <img
                          src="/images/product-hero-dashboard.webp"
                          alt="Zentilos all-in-one unified HRMS platform dashboard"
                          className="emp-cta-img"
                          loading="lazy"
                        />
                      </div>

                      {/* Right Content Area */}
                      <div className="emp-cta-content">
                        <span className="emp-cta-badge">✦ ALL-IN-ONE HRMS PLATFORM ✦</span>
                        <h2 id="cta-banner-title" className="emp-cta-title">
                          Ready to Unify Your Entire Workforce Operations?
                        </h2>
                        <p className="emp-cta-desc">
                          Connect employee records, biometric &amp; mobile attendance, statutory payroll, leave approvals, and branch compliance in one platform. Eliminate tool fragmentation and run every team with complete clarity.
                        </p>
                        <div className="emp-cta-btn-group">
                          <button
                            type="button"
                            className="emp-cta-btn"
                            onClick={() => setIsDemoModalOpen(true)}
                          >
                            Book a Demo
                          </button>
                          <button
                            type="button"
                            className="emp-cta-btn-secondary"
                            onClick={() => setIsDemoModalOpen(true)}
                          >
                            Talk to an HR Expert <Icon name="arrow" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    id={`category-${cat.id}`}
                    className={`po-category-showcase po-category-bento-card po-block-${cat.id}`}
                    style={{
                      // @ts-ignore
                      "--cat-theme": themeColor,
                      // @ts-ignore
                      "--cat-icon-bg": iconBg,
                      // @ts-ignore
                      "--cat-border": borderColor,
                    }}
                  >
                    {/* Bento Top Header: Consistently Left Info + Top-Right Flow Visual (Matching Screenshot) */}
                    <div className="po-category-bento-top">
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
                        <CategoryShowcaseVisualWidget categoryId={cat.id} onAction={() => setIsDemoModalOpen(true)} />
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
                          <Link to={prod.href} className="rippling-card-link" aria-label={`Learn more about ${prod.title}`}>

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
                  <circle r="3.5" fill="#f472b6" opacity="0.95" filter="drop-shadow(0 0 5px rgba(244, 114, 182, 0.85))">
                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M 105 0 C 105 48, 270 38, 270 68" />
                  </circle>

                  <path
                    d="M 270 0 L 270 68"
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle r="3.5" fill="#ec4899" opacity="0.95" filter="drop-shadow(0 0 5px rgba(236, 72, 153, 0.85))">
                    <animateMotion dur="2.0s" repeatCount="indefinite" path="M 270 0 L 270 68" />
                  </circle>

                  <path
                    d="M 435 0 C 435 48, 270 38, 270 68"
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle r="3.5" fill="#f472b6" opacity="0.95" filter="drop-shadow(0 0 5px rgba(244, 114, 182, 0.85))">
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
                            <circle r="5.5" fill="rgba(244, 114, 182, 0.35)">
                              <animateMotion dur="1.4s" repeatCount="indefinite" path={p} />
                            </circle>
                            <circle r="3.5" fill="#ffffff" filter="drop-shadow(0 0 6px #ec4899)">
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
                    <circle cx="270" cy="92" r="22" fill="#852952" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35))" />
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
                          stroke={isActive ? "#852952" : "rgba(255, 255, 255, 0.22)"}
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
                              color: isActive ? "#852952" : "#cbd5e1",
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
        title="Book Your Free Zentilos Demo"
        subtitle="Experience our 10 unified HR modules with a live product architect."
        defaultInterest="Full Platform"
      />
    </PageLayout>
  );
}

export default ProductOverview;
