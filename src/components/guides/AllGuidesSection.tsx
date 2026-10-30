import { useState, useMemo, useEffect, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../ui/Icon";
import {
  PayrollIllustration,
  LeaveIllustration,
  RecruitmentIllustration,
  ExpenseIllustration,
  AttendanceIllustration,
  ComplianceIllustration,
  OnboardingIllustration,
  PerformanceIllustration,
  MultiBranchIllustration,
} from "./GuideIllustrations";
import "./AllGuidesSection.css";

export type TopicCategory =
  | "All"
  | "Payroll & Tax"
  | "Workforce & Leave"
  | "Hiring & Culture"
  | "Operations & Compliance"
  | "Saved";

export interface GuideCardItem {
  id: string;
  slug: string;
  title: string;
  category: "Payroll & Tax" | "Workforce & Leave" | "Hiring & Culture" | "Operations & Compliance";
  readTime: string;
  description: string;
  highlights: string[];
  illustration: string;
}

export const ALL_GUIDES: GuideCardItem[] = [
  {
    id: "payroll-management-guide",
    slug: "payroll-management-guide",
    title: "Payroll Management",
    category: "Payroll & Tax",
    readTime: "15 min read",
    description: "Complete gross-to-net salary processing, automated tax withholdings, and zero-penalty audit workflows.",
    highlights: [
      "Gross-to-net salary & attendance sync",
      "Statutory EPF, ESIC & Professional Tax",
      "Automated payslip dispatch & audit logs",
    ],
    illustration: "payroll",
  },
  {
    id: "leave-management-guide",
    slug: "leave-management-guide",
    title: "Leave Management",
    category: "Workforce & Leave",
    readTime: "10 min read",
    description: "Eliminate attendance leakages, configure sandwich rules, and automate multi-tier approval chains.",
    highlights: [
      "Statutory leave accruals & holiday lists",
      "Sandwich rules & LOP leakage control",
      "Encashment liabilities & policy blueprints",
    ],
    illustration: "leave",
  },
  {
    id: "recruitment-management-guide",
    slug: "recruitment-management-guide",
    title: "Recruitment & Hiring",
    category: "Hiring & Culture",
    readTime: "11 min read",
    description: "End-to-end talent acquisition from candidate pipelines to multi-state offer letter rollouts.",
    highlights: [
      "Structured scorecard evaluations",
      "Multi-channel applicant pipeline tracking",
      "94%+ offer-to-joining conversion ratio",
    ],
    illustration: "recruitment",
  },
  {
    id: "expense-management-guide",
    slug: "expense-management-guide",
    title: "Expense Management",
    category: "Operations & Compliance",
    readTime: "9 min read",
    description: "Corporate expense governance with OCR receipt capture, per-diem rules, and payroll reimbursement sync.",
    highlights: [
      "Mobile receipt OCR optical scanning",
      "Branch mileage & per-diem rule engine",
      "1-click reimbursement payout with payroll",
    ],
    illustration: "expense",
  },
  {
    id: "attendance-shift-guide",
    slug: "attendance-management-guide",
    title: "Attendance & Shifts",
    category: "Workforce & Leave",
    readTime: "10 min read",
    description: "Synchronize biometric hardware, manage 24/7 rotational shift rosters, and auto-calculate overtime.",
    highlights: [
      "Biometric turnstile & face-clock sync",
      "24/7 rotational shifts & night premiums",
      "Geofenced mobile check-ins with selfie",
    ],
    illustration: "attendance",
  },
  {
    id: "statutory-compliance-calendar",
    slug: "statutory-compliance-guide",
    title: "Statutory Compliance",
    category: "Payroll & Tax",
    readTime: "13 min read",
    description: "Master roadmap of all federal and state statutory labor regulations, tax deadlines, and audit prep.",
    highlights: [
      "Form 16, 24Q TDS & EPF monthly dates",
      "State Shops & Establishments rules",
      "Zero-penalty statutory audit checklist",
    ],
    illustration: "compliance",
  },
  {
    id: "employee-onboarding-guide",
    slug: "employee-onboarding-guide",
    title: "Employee Onboarding",
    category: "Hiring & Culture",
    readTime: "12 min read",
    description: "Create an exceptional first 90 days with digital self-onboarding, asset provisioning, and buddy allocation.",
    highlights: [
      "Digital self-service document vault",
      "IT asset tracking & credential issuance",
      "30-60-90 day ramp-up milestones",
    ],
    illustration: "onboarding",
  },
  {
    id: "performance-engagement-guide",
    slug: "performance-appraisal-guide",
    title: "Performance & Goals",
    category: "Hiring & Culture",
    readTime: "12 min read",
    description: "Continuous 360-degree feedback, quarterly OKRs, calibration reviews, and merit compensation linking.",
    highlights: [
      "Quarterly OKRs & objective alignment",
      "360-degree peer & manager reviews",
      "Merit pay matrix & promotion cycles",
    ],
    illustration: "performance",
  },
  {
    id: "multibranch-hr-setup-guide",
    slug: "multibranch-hr-setup-guide",
    title: "Multi-branch Operations",
    category: "Operations & Compliance",
    readTime: "14 min read",
    description: "Centralize HR, shift policies, and payroll for 10+ branch locations without losing local control.",
    highlights: [
      "Multi-entity company structure setup",
      "State-wise PT slabs & minimum wages",
      "Unified dashboard with role permissions",
    ],
    illustration: "multibranch",
  },
];

const TOPIC_CHIPS: TopicCategory[] = [
  "All",
  "Payroll & Tax",
  "Workforce & Leave",
  "Hiring & Culture",
  "Operations & Compliance",
];

export function AllGuidesSection({ heroSearch = "" }: { heroSearch?: string }) {
  const navigate = useNavigate();

  // States
  const [topicFilter, setTopicFilter] = useState<TopicCategory>("All");

  // Filtered Items (Combines Topic + Hero Search)
  const filteredItems = useMemo(() => {
    return ALL_GUIDES.filter((item) => {
      // 1. Topic filter
      if (topicFilter !== "All") {
        if (item.category !== topicFilter) return false;
      }

      // 2. Search query from hero
      if (heroSearch.trim()) {
        const q = heroSearch.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchHighlights = item.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCat && !matchHighlights) {
          return false;
        }
      }

      return true;
    });
  }, [topicFilter, heroSearch]);

  // Handle card click
  const handleItemClick = (item: GuideCardItem) => {
    if (item.slug) {
      navigate(`/guides/${item.slug}`);
    }
  };

  // 3D Card Hover & Mouse Tilt
  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.setProperty("--tilt-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-y", `${rotateY}deg`);
  };

  const handleCardMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
  };

  // Render appropriate illustration component
  const renderIllustration = (name: string) => {
    switch (name) {
      case "payroll":
        return <PayrollIllustration />;
      case "leave":
        return <LeaveIllustration />;
      case "recruitment":
        return <RecruitmentIllustration />;
      case "expense":
        return <ExpenseIllustration />;
      case "attendance":
        return <AttendanceIllustration />;
      case "compliance":
        return <ComplianceIllustration />;
      case "onboarding":
        return <OnboardingIllustration />;
      case "performance":
        return <PerformanceIllustration />;
      case "multibranch":
        return <MultiBranchIllustration />;
      default:
        return <PayrollIllustration />;
    }
  };

  return (
    <section className="all-guides-library-section" id="all-guides-library">
      {/* Top Soft Pink Ambient Glow */}
      <div className="guides-library-ambient-glow" aria-hidden="true" />

      <div className="guides-library-container">
        {/* ==========================================================================
            1. SECTION HEADER (Curated, Satisfying Headlines)
            ========================================================================== */}
        <div className="guides-library-header">
          <span className="library-eyebrow">
            <Icon name="sparkle" size={12} /> ACTIONABLE RESOURCE LIBRARY
          </span>
          <h2 className="library-title">Operational Guides & Execution Playbooks</h2>
          <p className="library-subtitle">
            In-depth, step-by-step blueprints covering salary math, leave governance, biometric shifts, and labor compliance.
          </p>
        </div>

        {/* ==========================================================================
            2. CONTROLS (Centered Topic Tabs, Violet Active Color, No Numbers)
            ========================================================================== */}
        <div className="guides-library-controls">
          <div className="library-topic-chips-centered" role="tablist" aria-label="Filter by topic">
            {TOPIC_CHIPS.map((topic) => {
              const isActive = topicFilter === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`library-topic-chip ${isActive ? "active" : ""}`}
                  onClick={() => setTopicFilter(topic)}
                >
                  <span className="chip-label">{topic}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==========================================================================
            3. RESOURCE GRID (Cards with Home Page Shine Effect, Read Time & Action)
            ========================================================================== */}
        {filteredItems.length > 0 ? (
          <div className="guides-library-grid">
            {filteredItems.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="guide-card-tile"
                  style={{ animationDelay: `${index * 0.04}s` }}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => handleItemClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleItemClick(item);
                    }
                  }}
                  aria-label={item.title}
                >
                  {/* Home Page Shine Beam Effect (Sweeps across card on hover) */}
                  <div className="card-shine-beam" aria-hidden="true" />

                  {/* Top Illustration Banner with unique background per card */}
                  <div className={`card-illust-banner banner-theme-${item.illustration}`}>
                    {/* Custom SVG Illustration Canvas */}
                    <div className="card-illust-wrapper">
                      {renderIllustration(item.illustration)}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="card-body-content">
                    {/* Title */}
                    <h3 className="card-item-title">{item.title}</h3>

                    {/* Description */}
                    <p className="card-item-description">{item.description}</p>

                    {/* 3 Checkmark Feature Items */}
                    <ul className="card-checklist">
                      {item.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="card-checklist-item">
                          <span className="card-check-icon">✓</span>
                          <span className="card-check-text">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Card Footer: Below Left = 10 min read, Below Right = Read guide → */}
                    <div className="card-footer-action-row">
                      <span className="card-footer-readtime">
                        <Icon name="clock" size={13} /> {item.readTime}
                      </span>
                      <span className="card-action-link">
                        Read guide <span className="arrow-sym">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="guides-library-empty-state">
            <div className="empty-state-icon-box">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#7b2958" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" strokeDasharray="2 2" />
              </svg>
            </div>
            <h3 className="empty-state-title">No guides found</h3>
            <p className="empty-state-desc">
              No operational guides match your current search or topic filter.
            </p>
            <button
              type="button"
              className="empty-state-clear-btn"
              onClick={() => {
                setTopicFilter("All");
              }}
            >
              Reset to All Guides
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default AllGuidesSection;
