import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import { useDemoModal } from "../context/DemoModalContext";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useCurrency } from "../context/CurrencyContext";
import { payrollGuideDetailData, leaveGuideDetailData, allGuidesList } from "../data/guidesData";
import "./Blog.css";
import "./GuideDetailPage.css";

export function GuideDetailPage() {
  const { openDemoModal } = useDemoModal();
  const { slug } = useParams<{ slug?: string }>();
  const { currency, currencySymbol } = useCurrency();

  const isIndia = currency === "INR";
  const formatAmount = (val: number) => `${currencySymbol}${val.toLocaleString()}`;

  const isLeaveGuide = slug === "leave-management-guide";

  const guideItem = allGuidesList.find((g) => g.slug === slug);
  const currentGuide = isLeaveGuide
    ? leaveGuideDetailData
    : guideItem
    ? {
        ...payrollGuideDetailData,
        title: guideItem.title,
        subtitle: guideItem.excerpt,
        readTime: guideItem.readTime,
      }
    : payrollGuideDetailData;

  // 3 Prominent Handbook Cards for "Keep reading" section
  // 3 Prominent Related Guides (Never includes the current page)
  const currentSlug = slug || "payroll-management-guide";
  const relatedHandbooks = useMemo(() => {
    const allCompanionHandbooks = [
      {
        slug: "payroll-management-guide",
        title: "Payroll Management Guide",
        subtitle: "Gross-to-net salary formulas, TDS deductions, EPF & ESIC filing timelines, and zero-penalty audit workflows.",
        category: "Payroll & Tax",
        readTime: "15 min read",
        stat: "Zero-Penalty Audits",
      },
      {
        slug: "leave-management-guide",
        title: "Leave Management Guide",
        subtitle: "Resolving sandwich leave disputes, biometric sync, encashment liabilities, and eliminating 3.8% monthly payroll leakages.",
        category: "Workforce & Leave",
        readTime: "12 min read",
        stat: "Auto Biometric Sync",
      },
      {
        slug: "recruitment-management-guide",
        title: "Recruitment Management Guide",
        subtitle: "Boosting offer-to-joining ratios, automated background checks, multi-state document vaults, and day-1 onboarding.",
        category: "Hiring & Culture",
        readTime: "11 min read",
        stat: "94% Joining Ratio",
      },
      {
        slug: "statutory-compliance-guide",
        title: "Statutory Compliance & Labor Laws Guide",
        subtitle: "EPF Act, ESIC regulations, Payment of Bonus Act, Gratuity calculations, and state-wise Professional Tax slabs.",
        category: "Operations & Compliance",
        readTime: "14 min read",
        stat: "Compliant Exits",
      },
    ];

    return allCompanionHandbooks
      .filter((h) => h.slug !== currentSlug)
      .slice(0, 3);
  }, [currentSlug]);

  // Split title into double color (primary charcoal + brand violet highlight)
  const renderDoubleColorTitle = (title: string) => {
    const words = title.trim().split(" ");
    if (words.length <= 1) return title;
    const splitIndex = words.length > 2 ? words.length - 1 : 1;
    const firstPart = words.slice(0, splitIndex).join(" ");
    const secondPart = words.slice(splitIndex).join(" ");

    return (
      <>
        {firstPart} <span className="guide-hero-title-highlight">{secondPart}</span>
      </>
    );
  };

  // Active TOC section
  const [activeToc, setActiveToc] = useState<string>(
    currentGuide.toc?.[0]?.id || (isLeaveGuide ? "what-is-leave" : "what-is-payroll")
  );

  const isClickScrollingRef = useRef<boolean>(false);

  // Sync activeToc when slug changes
  useEffect(() => {
    if (currentGuide.toc && currentGuide.toc.length > 0) {
      setActiveToc(currentGuide.toc[0].id);
    }
  }, [slug, currentGuide.toc]);

  // Scroll spy: highlight currently active question/section when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const navOffset = 180;
      const tocIds = currentGuide.toc.map((t) => t.id);
      if (tocIds.length === 0) return;

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page: activate last item
      if (windowHeight + scrollY >= documentHeight - 120) {
        setActiveToc(tocIds[tocIds.length - 1]);
        return;
      }

      let currentActiveId = tocIds[0];

      for (const id of tocIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navOffset) {
            currentActiveId = id;
          }
        }
      }

      if (currentActiveId) {
        setActiveToc(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentGuide.toc]);

  // Keep active topic item visible in sidebar if sidebar is scrollable
  useEffect(() => {
    if (!activeToc) return;
    const activeBtn = document.querySelector(`.guide-topic-nav-item.active`) as HTMLElement | null;
    const sidebar = document.querySelector(`.guide-sidebar-sticky`) as HTMLElement | null;
    if (activeBtn && sidebar) {
      const btnRect = activeBtn.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      if (btnRect.bottom > sidebarRect.bottom || btnRect.top < sidebarRect.top) {
        activeBtn.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [activeToc]);

  // --------------------------------------------------------------------------
  // PAYROLL CALCULATOR STATE
  // --------------------------------------------------------------------------
  const [basicSalary, setBasicSalary] = useState<number>(isIndia ? 45000 : 4500);
  const [hra, setHra] = useState<number>(isIndia ? 20000 : 1500);
  const [specialAllowance, setSpecialAllowance] = useState<number>(isIndia ? 15000 : 1000);
  const [deductPf, setDeductPf] = useState<boolean>(true);
  const [deductPt, setDeductPt] = useState<boolean>(true);
  const [deductEsic, setDeductEsic] = useState<boolean>(false);

  const grossSalary = basicSalary + hra + specialAllowance;
  const pfDeduction = deductPf ? (isIndia ? Math.round(Math.min(basicSalary, 15000) * 0.12) : Math.round(basicSalary * 0.06)) : 0;
  const ptDeduction = deductPt ? (isIndia ? 200 : 85) : 0;
  const esicDeduction = deductEsic ? Math.round(grossSalary * (isIndia ? 0.0075 : 0.0145)) : 0;
  const estimatedTds = Math.round(grossSalary * (isIndia ? 0.08 : 0.12));
  const totalDeductions = pfDeduction + ptDeduction + esicDeduction + estimatedTds;
  const netInHand = Math.max(0, grossSalary - totalDeductions);

  const [salaryTab, setSalaryTab] = useState<number>(0);
  const [statutoryTab, setStatutoryTab] = useState<"epf" | "esic" | "pt">("epf");

  // --------------------------------------------------------------------------
  // LEAVE CALCULATOR STATE
  // --------------------------------------------------------------------------
  const [monthlyAccrualRate, setMonthlyAccrualRate] = useState<number>(1.5);
  const [monthsWorked, setMonthsWorked] = useState<number>(10);
  const [openingBalance, setOpeningBalance] = useState<number>(12);
  const [leavesConsumed, setLeavesConsumed] = useState<number>(7);
  const [leaveBasicSalary, setLeaveBasicSalary] = useState<number>(isIndia ? 40000 : 4000);
  const [leaveTab, setLeaveTab] = useState<number>(0);

  const totalLeaveAccrued = openingBalance + Math.round(monthlyAccrualRate * monthsWorked);
  const availableLeaveBalance = Math.max(0, totalLeaveAccrued - leavesConsumed);
  // Encashment formula: (Basic / 30) * encashable days (capped at 30 days)
  const encashableDays = Math.min(availableLeaveBalance, 30);
  const encashmentValue = Math.round((leaveBasicSalary / 30) * encashableDays);

  // --------------------------------------------------------------------------
  // AUDIT CHECKLIST STATE
  // --------------------------------------------------------------------------
  const [checklist, setChecklist] = useState(currentGuide.auditChecklist);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const completedCount = checklist.filter((item) => item.done).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const resetChecklist = () => {
    setChecklist((prev) => prev.map((item) => ({ ...item, done: false })));
  };

  const scrollToSection = (id: string) => {
    setActiveToc(id);
    const element = document.getElementById(id);
    if (element) {
      isClickScrollingRef.current = true;
      const navOffset = 95;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 700);
    }
  };

  const handleDownloadGuide = () => {
    window.print();
  };

  return (
    <PageLayout hideCTA={true}>
      <SEO
        title={`${currentGuide.title} | LattiumHR Complete Guide`}
        description={currentGuide.subtitle}
        canonicalPath={`/guides/${slug || "payroll-management-guide"}`}
      />

      <div className="guide-detail-page">
        {/* ==========================================================================
            1. HERO / BANNER (CENTERED, CLEAN, PROPER - NO CARD, NO BREADCRUMBS)
            ========================================================================== */}
        <section className="guide-detail-hero">
          <div className="guide-detail-container">
            <div className="guide-hero-centered-content">
              <span className="guide-hero-eyebrow">
                <Icon name="sparkle" size={13} /> {currentGuide.updatedDate}
              </span>

              <h1 className="guide-hero-title">{renderDoubleColorTitle(currentGuide.title)}</h1>

              <p className="guide-hero-subtitle">{currentGuide.subtitle}</p>

              {/* Progressive 4-Step Playbook Execution Flow (Replaces buttons and metadata pills) */}
              <div className="guide-hero-flow-stage">
                <div className="guide-hero-flow-header">
                  <span className="guide-flow-eyebrow">
                    <Icon name="sparkle" size={13} /> {isLeaveGuide ? "LEAVE GOVERNANCE EXECUTION FLOW" : "PAYROLL PROCESSING EXECUTION FLOW"}
                  </span>
                  <span className="guide-flow-readtime">
                    <Icon name="clock" size={13} /> {currentGuide.readTime} · 100% Statutory Vetted
                  </span>
                </div>

                <div className="guide-hero-flow-grid">
                  {(isLeaveGuide ? [
                    { num: "01", icon: "document", title: "Policy Formulation", desc: "Statutory quotas, carry-forward caps & sandwich leave rules" },
                    { num: "02", icon: "attendance", title: "Biometric Clocking", desc: "Turnstiles, geo-fenced mobile check-ins & roster sync" },
                    { num: "03", icon: "users", title: "Tiered Approvals", desc: "Instant ESS workflow routing & manager balance validation" },
                    { num: "04", icon: "wallet", title: "Zero-Leakage Payroll", desc: "Direct LOP deduction sync & statutory audit verification" },
                  ] : [
                    { num: "01", icon: "finance", title: "Gross Earnings", desc: "Basic salary, HRA, special allowances & attendance days" },
                    { num: "02", icon: "shield", title: "Statutory Deductions", desc: "Automated EPF, ESIC, state PT slabs & TDS withholding" },
                    { num: "03", icon: "chart", title: "Variance Reconciliation", desc: "Zero-error cross-check with biometric shifts & loss of pay" },
                    { num: "04", icon: "wallet", title: "Bank Payouts", desc: "1-click salary dispatch, digital payslips & Form 16 logs" },
                  ]).map((step, sIdx, arr) => (
                    <div key={step.num} className="guide-flow-col">
                      <div className="guide-flow-card">
                        <div className="guide-flow-card-top">
                          <div className="guide-flow-badge-group">
                            <span className="guide-flow-num">{step.num}</span>
                            <span className="guide-flow-pill">Step {sIdx + 1}</span>
                          </div>
                          <span className="guide-flow-icon-circle">
                            <Icon name={step.icon as any} size={14} />
                          </span>
                        </div>
                        <strong className="guide-flow-title">{step.title}</strong>
                        <p className="guide-flow-desc">{step.desc}</p>
                      </div>
                      {sIdx < arr.length - 1 && (
                        <div className="guide-flow-connector" aria-hidden="true">
                          <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            2. BODY CONTENT (2-COLUMN LAYOUT: LEFT TOPICS & CTA, RIGHT 8-POINT GUIDE)
            ========================================================================== */}
        <div className="guide-detail-container">
          <div className="guide-layout-grid">
            {/* LEFT SIDEBAR: TOPICS CARD + SMALL ACTION CTA CARD */}
            <aside className="guide-sidebar-sticky">
              {/* 1. TOPICS CARD */}
              <div className="guide-topics-card">
                <div className="guide-topics-header">
                  <Icon name="file-text" size={16} />
                  <span>Guide Topics</span>
                </div>
                <nav className="guide-topics-nav">
                  {currentGuide.toc.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`guide-topic-nav-item ${activeToc === item.id ? "active" : ""}`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <span className="topic-num">{idx + 1}</span>
                      <span className="topic-text">{item.label.replace(/^\d+\.\s*/, "")}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* 2. SMALL ACTION CTA CARD BELOW TOPICS */}
              <div className="guide-sidebar-cta-card">
                <span className="sidebar-cta-badge">
                  <Icon name="sparkle" size={12} /> Interactive HRMS
                </span>
                <h4>{isLeaveGuide ? "Automate Leave & Shifts" : "Automate Your Payroll"}</h4>
                <p>
                  {isLeaveGuide
                    ? "Eliminate unrecorded absences with biometric clock-in, mobile requests, and automated sandwich rules."
                    : "Zero-penalty statutory compliance, automated tax deductions, and 2-click salary disbursements."}
                </p>
                <button
                  type="button"
                  className="sidebar-cta-btn"
                  onClick={handleDownloadGuide}
                >
                  <Icon name="download" size={14} /> Download Now
                </button>
                <div className="sidebar-cta-guarantee">
                  <Icon name="check" size={12} /> Free PDF guide • Instant access
                </div>
              </div>
            </aside>

            {/* RIGHT COLUMN: MAIN ARTICLE (8 POINTS) */}
            <main className="guide-main-article-content">
            {/* ====================================================================
                LEAVE MANAGEMENT GUIDE VIEW (/guides/leave-management-guide)
                ==================================================================== */}
            {isLeaveGuide ? (
                <>
                  {/* 1. What is Modern Leave Management? */}
                  <section id="what-is-leave" className="guide-prose-section">
                    <h2>1. What is Modern Leave Management?</h2>
                    <p>
                      At its core, <strong>leave management</strong> is the formal process of managing employee time-off requests, statutory leave entitlements, absences, and holiday schedules in alignment with state labor statutes and internal organizational guidelines.
                    </p>
                    <p>
                      While traditional businesses relied on ad-hoc emails and paper forms, modern leave management centralizes employee self-service (ESS), automated multi-tier approval routing, statutory balance accruals, and direct real-time synchronization with biometric clocks and monthly payroll.
                    </p>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Unrecorded absenteeism and manual spreadsheet leave tracking cause an average of <strong>3.8% in payroll leakage</strong> each month through uncollected Loss of Pay (LOP) days and untracked encashment liabilities.
                      </p>
                    </div>
                  </section>

                  {/* 2. Why Transparent Leave Policies Matter */}
                  <section id="why-it-matters" className="guide-prose-section">
                    <h2>2. Why Transparent Leave Policies Matter for Growing Organizations</h2>
                    <p>
                      A clear, predictable leave framework directly shapes company culture, operational resilience, and legal standing:
                    </p>
                    <ul>
                      <li>
                        <strong>Statutory Compliance & Legal Safety:</strong> Under the Factories Act 1948 and State Shops and Commercial Establishments Acts, companies are legally obligated to maintain transparent records of earned, casual, and sick leaves.
                      </li>
                      <li>
                        <strong>Burnout Prevention & Psychological Safety:</strong> Transparent policies empower staff to rest without guilt or fear of reprisal, increasing long-term retention and reducing unplanned absenteeism.
                      </li>
                      <li>
                        <strong>Workforce Continuity & Shift Planning:</strong> Automated overlap warnings alert team leads when too many team members request leave on identical dates.
                      </li>
                      <li>
                        <strong>Zero Favoritism in Approvals:</strong> Clear rules eliminate subjective manager bias by enforcing consistent notice periods and documented approval trees.
                      </li>
                    </ul>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Transparent, self-service leave policies reduce unplanned employee turnover by <strong>24%</strong> and eliminate manager friction by replacing subjective discretion with documented eligibility rules and automated coverage planning.
                      </p>
                    </div>
                  </section>

                  {/* 3. Statutory Leave Types & Slabs */}
                  <section id="statutory-leave-types" className="guide-prose-section">
                    <h2>3. Core Statutory Leave Types & Policy Slabs</h2>
                    <p>
                      Explore the statutory leave categories recognized under Indian and global labor conventions:
                    </p>

                    <div className="salary-components-interactive">
                      <div className="salary-tabs-header">
                        {leaveGuideDetailData.leaveTypes.map((cat, idx) => (
                          <button
                            key={cat.category}
                            type="button"
                            className={`salary-tab-btn ${leaveTab === idx ? "active" : ""}`}
                            onClick={() => setLeaveTab(idx)}
                          >
                            {cat.category}
                          </button>
                        ))}
                      </div>

                      <div className="salary-tab-content">
                        <div className="component-card-grid">
                          {leaveGuideDetailData.leaveTypes[leaveTab].items.map((item) => (
                            <div key={item.name} className="component-item-card">
                              <h4 className="component-item-title">{item.name}</h4>
                              <span className="component-item-share">{item.quota}</span>
                              <p className="component-item-desc">{item.desc}</p>
                              <span className="component-item-taxable">{item.rules}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Statutory Earned Leave balances carry mandatory legal liabilities; failing to enforce annual accrual caps and clear encashment provisions creates unhedged financial risk during fiscal year-end audits and employee exits.
                      </p>
                    </div>
                  </section>

                  {/* 4. Interactive Leave Accrual & Balance Calculator */}
                  <section id="leave-calculator" className="guide-prose-section">
                    <h2>4. Interactive Leave Accrual & Encashment Calculator</h2>
                    <p>
                      Simulate annual leave balances, monthly accruals, and statutory encashment payouts based on your company's policy rules:
                    </p>

                    <div className="guide-calculator-card">
                      <div className="calc-header">
                        <h3>
                          <Icon name="calendar" size={22} /> Leave Balance & Encashment Simulator
                        </h3>
                        <span className="calc-currency-badge">
                          Currency: {currency} ({currencySymbol})
                        </span>
                      </div>

                      <div className="calc-grid">
                        <div className="calc-controls">
                          {/* Monthly Accrual Rate */}
                          <div className="calc-input-group">
                            <div className="calc-label-row">
                              <span>Monthly Accrual Rate</span>
                              <strong>{monthlyAccrualRate} days / mo</strong>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="2.5"
                              step="0.25"
                              value={monthlyAccrualRate}
                              onChange={(e) => setMonthlyAccrualRate(parseFloat(e.target.value))}
                              className="calc-range-slider"
                            />
                          </div>

                          {/* Months Worked in Year */}
                          <div className="calc-input-group">
                            <div className="calc-label-row">
                              <span>Active Months Worked (Year-to-date)</span>
                              <strong>{monthsWorked} Months</strong>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="12"
                              step="1"
                              value={monthsWorked}
                              onChange={(e) => setMonthsWorked(parseInt(e.target.value))}
                              className="calc-range-slider"
                            />
                          </div>

                          {/* Opening Carried Forward Balance */}
                          <div className="calc-input-group">
                            <div className="calc-label-row">
                              <span>Opening Balance (Carried Forward)</span>
                              <strong>{openingBalance} Days</strong>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="45"
                              step="1"
                              value={openingBalance}
                              onChange={(e) => setOpeningBalance(parseInt(e.target.value))}
                              className="calc-range-slider"
                            />
                          </div>

                          {/* Leaves Consumed */}
                          <div className="calc-input-group">
                            <div className="calc-label-row">
                              <span>Leaves Already Consumed / Approved</span>
                              <strong>{leavesConsumed} Days</strong>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="35"
                              step="1"
                              value={leavesConsumed}
                              onChange={(e) => setLeavesConsumed(parseInt(e.target.value))}
                              className="calc-range-slider"
                            />
                          </div>

                          {/* Monthly Basic Pay for Encashment */}
                          <div className="calc-input-group">
                            <div className="calc-label-row">
                              <span>Monthly Basic Salary (for Encashment)</span>
                              <strong>{formatAmount(leaveBasicSalary)}</strong>
                            </div>
                            <input
                              type="range"
                              min={isIndia ? 15000 : 1500}
                              max={isIndia ? 150000 : 15000}
                              step={isIndia ? 2500 : 250}
                              value={leaveBasicSalary}
                              onChange={(e) => setLeaveBasicSalary(parseInt(e.target.value))}
                              className="calc-range-slider"
                            />
                          </div>
                        </div>

                        {/* Output Breakdown */}
                        <div className="calc-output-box">
                          <div className="calc-inhand-hero">
                            <span className="calc-inhand-label">Available Leave Balance</span>
                            <div className="calc-inhand-amount" style={{ color: "#7b2958" }}>
                              {availableLeaveBalance} <span style={{ fontSize: "20px" }}>Days</span>
                            </div>
                            <span className="calc-inhand-note">
                              Net balance available for planned time off
                            </span>
                          </div>

                          <div className="calc-breakdown-table">
                            <div className="calc-table-row">
                              <span>Opening Balance:</span>
                              <strong>{openingBalance} days</strong>
                            </div>
                            <div className="calc-table-row">
                              <span>New Accrual ({monthlyAccrualRate} × {monthsWorked} mo):</span>
                              <strong>+{Math.round(monthlyAccrualRate * monthsWorked)} days</strong>
                            </div>
                            <div className="calc-table-row">
                              <span>Total Accrued:</span>
                              <strong>{totalLeaveAccrued} days</strong>
                            </div>
                            <div className="calc-table-row">
                              <span>Leaves Consumed / Approved:</span>
                              <strong style={{ color: "#dc2626" }}>-{leavesConsumed} days</strong>
                            </div>
                            <div className="calc-table-row total">
                              <span>Estimated Encashment Value (max 30 days):</span>
                              <strong style={{ color: "#10b981", fontSize: "15px" }}>
                                {formatAmount(encashmentValue)}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Real-time leave balance previews and automatic encashment forecasting reduce payroll cut-off dispute tickets by <strong>76%</strong> while providing finance teams with exact, audit-ready balance sheet accruals.
                      </p>
                    </div>
                  </section>

                  {/* 5. Policy Rules: Sandwich Rule & Carry-Forward */}
                  <section id="policy-rules" className="guide-prose-section">
                    <h2>5. Critical Policy Rules: Sandwich Rule & Carry-Forward Limits</h2>
                    <p>
                      How your organization configures edge cases determines employee trust and payroll precision:
                    </p>

                    <div className="pt-state-table-wrap">
                      <table className="pt-state-table">
                        <thead>
                          <tr>
                            <th>Policy Rule</th>
                            <th>Traditional Approach</th>
                            <th>Modern HRMS Recommendation</th>
                            <th>Impact on Payroll</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaveGuideDetailData.rulesComparison.map((rule) => (
                            <tr key={rule.rule}>
                              <td>
                                <strong>{rule.rule}</strong>
                              </td>
                              <td>{rule.standard}</td>
                              <td>
                                <span style={{ color: "#7b2958", fontWeight: 600 }}>
                                  {rule.recommendation}
                                </span>
                              </td>
                              <td style={{ color: "#475569" }}>{rule.impact}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        The Sandwich Rule is <strong>not mandatory by statutory law</strong>. Modern HR platforms allow granular policy toggles to exempt weekly offs and gazetted holidays from leave counts, preserving employee morale without compromising operational coverage.
                      </p>
                    </div>
                  </section>

                  {/* 6. Multi-Tier Approval Workflows */}
                  <section id="approval-workflow" className="guide-prose-section">
                    <h2>6. Multi-Tier Approval Routing & Escalation Chains</h2>
                    <p>
                      Automating approval workflows eliminates delays and ensures cross-functional transparency:
                    </p>
                    <ul>
                      <li>
                        <strong>Tier 1 — Employee Mobile Self-Service:</strong> Real-time balance inspection, team holiday calendar preview, and colleague peer coverage assignment.
                      </li>
                      <li>
                        <strong>Tier 2 — Immediate Manager Action:</strong> One-tap approval via mobile push notification, WhatsApp notification, or Slack integration.
                      </li>
                      <li>
                        <strong>Tier 3 — Department Head / HR Admin:</strong> Auto-escalation triggered only for extended sabbaticals (&gt;5 consecutive days) or during critical month-end operational windows.
                      </li>
                      <li>
                        <strong>Tier 4 — Automated Roster Lock:</strong> Approved leaves instantly adjust biometric attendance logs, ensuring accurate monthly payroll calculation with zero manual data entry.
                      </li>
                    </ul>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Mobile-first, multi-tier approval chains resolve <strong>91% of leave applications within 4 hours</strong>, completely eliminating the 3-day approval bottleneck typical of manual email chains and paper forms.
                      </p>
                    </div>
                  </section>

                  {/* 7. Interactive Annual Leave Audit Checklist */}
                  <section id="interactive-checklist" className="guide-prose-section">
                    <h2>7. Interactive Annual Leave & Policy Audit Checklist</h2>
                    <p>
                      Track and verify your organization’s leave policy compliance before rolling out annual balances:
                    </p>

                    <div className="interactive-checklist-box">
                      <div className="checklist-header">
                        <h3>
                          <Icon name="check" size={20} /> Annual Leave Audit Progress
                        </h3>
                        <span style={{ fontWeight: 700, color: "#7b2958", fontSize: "14px" }}>
                          {completedCount} of {checklist.length} Completed ({progressPercent}%)
                        </span>
                      </div>

                      <div className="checklist-progress-bar-wrap">
                        <div
                          className="checklist-progress-fill"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <div className="checklist-items-list">
                        {checklist.map((item) => (
                          <div
                            key={item.id}
                            className={`checklist-item-row ${item.done ? "done" : ""}`}
                            onClick={() => toggleChecklistItem(item.id)}
                          >
                            <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => {}}
                              className="checklist-checkbox"
                            />
                            <div>
                              <span className="checklist-stage-pill">{item.stage}</span>
                              <div className="checklist-task-text">{item.task}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="checklist-footer-actions">
                        <button
                          type="button"
                          className="checklist-reset-btn"
                          onClick={resetChecklist}
                        >
                          Reset Checklist
                        </button>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>
                          Tip: Automated in LattiumHR with one-click annual roll-over.
                        </span>
                      </div>
                    </div>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Bi-annual leave audits verify statutory compliance against state Shops & Establishments rules, preventing unapproved negative leave balances from silently skewing month-end payroll disbursements.
                      </p>
                    </div>
                  </section>

                  {/* 8. Biometric & Payroll Sync vs Spreadsheets */}
                  <section id="attendance-sync" className="guide-prose-section">
                    <h2>8. Real-time Biometric & Payroll Sync vs Manual Spreadsheets</h2>
                    <p>
                      Why modern HR leaders replace manual attendance spreadsheets with integrated platforms:
                    </p>
                    <ul>
                      <li>
                        <strong>Eliminate Ghost Absenteeism:</strong> Integrated facial recognition and geo-fenced mobile check-ins prevent buddy-punching and unapproved time off.
                      </li>
                      <li>
                        <strong>Instant LOP Reconciliation:</strong> Unapproved leave days automatically compute Loss of Pay deductions on payroll cutoff, preventing overpayments.
                      </li>
                      <li>
                        <strong>Zero Spreadsheet Errors:</strong> Cloud-synced balances protect employees from formula errors and missing carry-forward credits.
                      </li>
                      <li>
                        <strong>LattiumHR Advantage:</strong> A unified engine that links leave, shifts, attendance, and payroll in real time with zero duplicate data entry.
                      </li>
                    </ul>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Direct API synchronization between biometric gate hardware and cloud leave management prevents buddy-punching and automatically calculates Loss of Pay (LOP) deductions on payroll cut-off with zero manual reconciliation.
                      </p>
                    </div>
                  </section>
                </>
              ) : (
                /* ====================================================================
                    PAYROLL MANAGEMENT GUIDE VIEW (/guides/payroll-management-guide)
                    ==================================================================== */
                <>
                  {/* 1. What is Payroll? */}
                  <section id="what-is-payroll" className="guide-prose-section">
                    <h2>1. What is Payroll Management?</h2>
                    <p>
                      At its most fundamental level, <strong>payroll</strong> refers to the total compensation a business must disburse to its employees for a specific period (typically monthly or bi-weekly). However, modern payroll management encompasses significantly more than writing salary checks.
                    </p>
                    <p>
                      A robust payroll framework manages the entire lifecycle of an employee’s earnings: tracking attendance, accounting for unpaid leave days, calculating statutory tax withholdings (such as Provident Fund, ESIC, and Professional Tax), issuing tamper-proof salary slips, and maintaining legal audit readiness.
                    </p>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Payroll is often the single largest operational expenditure for businesses, typically accounting for <strong>40% to 65% of overall company expenses</strong>. Processing it with 100% precision is crucial for organizational trust and legal health.
                      </p>
                    </div>
                  </section>

                  {/* 2. Why is Payroll Management Important? */}
                  <section id="importance" className="guide-prose-section">
                    <h2>2. Why is Payroll Management Crucial for Growing Organizations?</h2>
                    <p>
                      Many founders and growing HR teams make the mistake of treating payroll as a back-office administrative task. In reality, modern payroll directly impacts company survival in four key dimensions:
                    </p>
                    <ul>
                      <li>
                        <strong>Employee Trust & Retention:</strong> Compensation is an unspoken psychological contract. A single payroll delay or calculation error shakes employee confidence and spikes early attrition.
                      </li>
                      <li>
                        <strong>Strict Statutory Compliance:</strong> Failure to remit mandatory employee withholdings (EPF, ESI, PT, and TDS) by the monthly deadlines triggers severe non-compliance penalties, interest charges, and director liability.
                      </li>
                      <li>
                        <strong>Multi-Branch Governance:</strong> Organizations operating multiple regional branches encounter conflicting state tax laws (e.g. Maharashtra vs. Karnataka Professional Tax slabs). Centralized payroll eliminates localized errors.
                      </li>
                      <li>
                        <strong>Accurate Financial Forecasting:</strong> Transparent compensation breakdowns feed directly into general ledger ERP systems, providing leadership with real-time labor cost intelligence.
                      </li>
                    </ul>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Over <strong>49% of employees</strong> start actively job hunting after experiencing just two payroll errors or disbursement delays, proving that consistent, accurate payroll is fundamental to employee retention.
                      </p>
                    </div>
                  </section>

                  {/* 3. The 3 Stages of Payroll Processing */}
                  <section id="three-stages" className="guide-prose-section">
                    <h2>3. The 3 Core Stages of Payroll Processing</h2>
                    <p>
                      To achieve error-free salary disbursement, organizations structure their payroll operations into three distinct chronological phases:
                    </p>
                    <ul>
                      <li>
                        <strong>Stage 1 — Pre-Payroll Operations:</strong> Defining payroll policy, collecting employee tax declarations (under Old/New regimes), gathering attendance data, and reconciling variable pay components (incentives, bonuses, overtime, loan advances).
                      </li>
                      <li>
                        <strong>Stage 2 — Actual Payroll Processing:</strong> Ingesting validated attendance logs into the payroll engine, calculating gross earnings, computing statutory withholdings (PF, ESI, PT, TDS), and executing maker-checker dual authorization.
                      </li>
                      <li>
                        <strong>Stage 3 — Post-Payroll Governance:</strong> Generating bank transfer files (NEFT/RTGS), distributing password-protected digital payslips via ESS mobile apps, filing monthly statutory challans (EPFO ECR, ESIC returns), and posting general ledger entries to accounting ERPs.
                      </li>
                    </ul>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Pre-payroll input consolidation accounts for <strong>70% of total payroll processing cycle time</strong>; automating attendance and expense ingestion compresses the monthly payroll run from 5 days to under 2 hours.
                      </p>
                    </div>
                  </section>

                  {/* 4. Interactive Gross-to-Net Calculator */}
                  <section id="calculator" className="guide-prose-section">
                    <h2>4. Interactive Gross-to-Net Salary Calculator</h2>
                    <p>
                      Use this interactive tool to visualize how basic earnings, allowances, and statutory contributions translate into take-home pay:
                    </p>

                    <div className="guide-calculator-card">
                      <div className="calc-header">
                        <h3>
                          <Icon name="finance" size={22} /> Gross-to-Net Compensation Simulator
                        </h3>
                        <span className="calc-currency-badge">
                          Currency: {currency} ({currencySymbol})
                        </span>
                      </div>

                      <div className="calc-grid">
                        <div className="calc-controls">
                          {/* Basic Salary Slider */}
                          <div className="calc-input-group">
                            <div className="calc-label-row">
                              <span>Basic Monthly Pay</span>
                              <strong>{formatAmount(basicSalary)}</strong>
                            </div>
                            <input
                              type="range"
                              min={isIndia ? 15000 : 1500}
                              max={isIndia ? 150000 : 15000}
                              step={isIndia ? 2500 : 250}
                              value={basicSalary}
                              onChange={(e) => setBasicSalary(parseInt(e.target.value))}
                              className="calc-range-slider"
                            />
                          </div>

                          {/* HRA Slider */}
                          <div className="calc-input-group">
                            <div className="calc-label-row">
                              <span>House Rent Allowance (HRA)</span>
                              <strong>{formatAmount(hra)}</strong>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={isIndia ? 60000 : 6000}
                              step={isIndia ? 1000 : 100}
                              value={hra}
                              onChange={(e) => setHra(parseInt(e.target.value))}
                              className="calc-range-slider"
                            />
                          </div>

                          {/* Special Allowance */}
                          <div className="calc-input-group">
                            <div className="calc-label-row">
                              <span>Special / Flexi Allowance</span>
                              <strong>{formatAmount(specialAllowance)}</strong>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={isIndia ? 50000 : 5000}
                              step={isIndia ? 1000 : 100}
                              value={specialAllowance}
                              onChange={(e) => setSpecialAllowance(parseInt(e.target.value))}
                              className="calc-range-slider"
                            />
                          </div>

                          {/* Statutory Toggles */}
                          <div className="calc-toggles-row">
                            <div className="calc-toggle-item">
                              <span>Deduct Employee PF (12% of Basic, capped at ₹1,800/mo)</span>
                              <input
                                type="checkbox"
                                checked={deductPf}
                                onChange={(e) => setDeductPf(e.target.checked)}
                                className="calc-toggle-checkbox"
                              />
                            </div>
                            <div className="calc-toggle-item">
                              <span>Deduct Professional Tax (₹200/mo standard slab)</span>
                              <input
                                type="checkbox"
                                checked={deductPt}
                                onChange={(e) => setDeductPt(e.target.checked)}
                                className="calc-toggle-checkbox"
                              />
                            </div>
                            <div className="calc-toggle-item">
                              <span>Deduct ESIC (0.75% for gross ≤ ₹21,000)</span>
                              <input
                                type="checkbox"
                                checked={deductEsic}
                                onChange={(e) => setDeductEsic(e.target.checked)}
                                className="calc-toggle-checkbox"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Output Box */}
                        <div className="calc-output-box">
                          <div className="calc-inhand-hero">
                            <span className="calc-inhand-label">Estimated Monthly In-Hand Pay</span>
                            <div className="calc-inhand-amount" style={{ color: "#7b2958" }}>
                              {formatAmount(netInHand)}
                            </div>
                            <span className="calc-inhand-note">
                              Net salary directly deposited into employee bank account
                            </span>
                          </div>

                          <div className="calc-breakdown-table">
                            <div className="calc-table-row">
                              <span>Gross Compensation:</span>
                              <strong>{formatAmount(grossSalary)}</strong>
                            </div>
                            <div className="calc-table-row">
                              <span>Employee PF (EPFO):</span>
                              <strong style={{ color: "#dc2626" }}>-{formatAmount(pfDeduction)}</strong>
                            </div>
                            <div className="calc-table-row">
                              <span>Professional Tax (PT):</span>
                              <strong style={{ color: "#dc2626" }}>-{formatAmount(ptDeduction)}</strong>
                            </div>
                            {deductEsic && (
                              <div className="calc-table-row">
                                <span>ESIC Contribution:</span>
                                <strong style={{ color: "#dc2626" }}>-{formatAmount(esicDeduction)}</strong>
                              </div>
                            )}
                            <div className="calc-table-row">
                              <span>Estimated Income Tax (TDS):</span>
                              <strong style={{ color: "#dc2626" }}>-{formatAmount(estimatedTds)}</strong>
                            </div>
                            <div className="calc-table-row total">
                              <span>Total Monthly Deductions:</span>
                              <strong style={{ color: "#dc2626" }}>-{formatAmount(totalDeductions)}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Transparent salary simulators eliminate compensation ambiguity, deflecting up to <strong>82% of routine HR query tickets</strong> regarding TDS deductions, HRA tax exemptions, and take-home pay computations.
                      </p>
                    </div>
                  </section>

                  {/* 5. Salary Structure & Components */}
                  <section id="salary-components" className="guide-prose-section">
                    <h2>5. Complete Salary Structure & Component Anatomy</h2>
                    <p>
                      A compliant salary structure consists of three balanced buckets: Earnings, Employee Deductions, and Employer Contributions:
                    </p>

                    <div className="salary-components-interactive">
                      <div className="salary-tabs-header">
                        {payrollGuideDetailData.salaryBreakdownComponents.map((cat, idx) => (
                          <button
                            key={cat.category}
                            type="button"
                            className={`salary-tab-btn ${salaryTab === idx ? "active" : ""}`}
                            onClick={() => setSalaryTab(idx)}
                          >
                            {cat.category}
                          </button>
                        ))}
                      </div>

                      <div className="salary-tab-content">
                        <div className="component-card-grid">
                          {payrollGuideDetailData.salaryBreakdownComponents[salaryTab].items.map(
                            (item) => (
                              <div key={item.name} className="component-item-card">
                                <h4 className="component-item-title">{item.name}</h4>
                                <span className="component-item-share">{item.share}</span>
                                <p className="component-item-desc">{item.desc}</p>
                                <span className="component-item-taxable">{item.taxable}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Maintaining Basic Salary between <strong>40% and 50% of total CTC</strong> ensures compliance with the Code on Wages 50% minimum threshold while optimizing employee take-home pay and managing future gratuity liabilities.
                      </p>
                    </div>
                  </section>

                  {/* 6. Statutory Compliance & Slabs (PF, ESI, PT) */}
                  <section id="statutory-rules" className="guide-prose-section">
                    <h2>6. Statutory Compliance & Monthly Slabs (PF, ESIC, PT)</h2>
                    <p>
                      Review the official statutory criteria, ceilings, and contribution formulas:
                    </p>

                    <div className="statutory-interactive-widget">
                      <div className="statutory-tabs-pills">
                        <button
                          type="button"
                          className={`statutory-pill-btn ${statutoryTab === "epf" ? "active" : ""}`}
                          onClick={() => setStatutoryTab("epf")}
                        >
                          Employees' Provident Fund (EPF)
                        </button>
                        <button
                          type="button"
                          className={`statutory-pill-btn ${statutoryTab === "esic" ? "active" : ""}`}
                          onClick={() => setStatutoryTab("esic")}
                        >
                          State Insurance (ESIC)
                        </button>
                        <button
                          type="button"
                          className={`statutory-pill-btn ${statutoryTab === "pt" ? "active" : ""}`}
                          onClick={() => setStatutoryTab("pt")}
                        >
                          State-wise Professional Tax (PT)
                        </button>
                      </div>

                      {statutoryTab === "epf" && (
                        <div className="statutory-detail-box">
                          <h4>{payrollGuideDetailData.statutorySlabs.epf.title}</h4>
                          <div className="statutory-kv-grid">
                            <div className="statutory-kv-item">
                              <label>Applicability Threshold</label>
                              <span>{payrollGuideDetailData.statutorySlabs.epf.eligibility}</span>
                            </div>
                            <div className="statutory-kv-item">
                              <label>Statutory Wage Cap</label>
                              <span>{payrollGuideDetailData.statutorySlabs.epf.statutoryCap}</span>
                            </div>
                            <div className="statutory-kv-item">
                              <label>Employee Deduction</label>
                              <span>{payrollGuideDetailData.statutorySlabs.epf.employeeShare}</span>
                            </div>
                            <div className="statutory-kv-item">
                              <label>Employer Contribution</label>
                              <span>{payrollGuideDetailData.statutorySlabs.epf.employerShare}</span>
                            </div>
                          </div>
                          <div className="guide-callout-box" style={{ margin: "14px 0 0 0" }}>
                            <div className="guide-callout-title">
                              <Icon name="calendar" size={15} /> Monthly Filing Deadline
                            </div>
                            <p>{payrollGuideDetailData.statutorySlabs.epf.filingDeadline}</p>
                          </div>
                        </div>
                      )}

                      {statutoryTab === "esic" && (
                        <div className="statutory-detail-box">
                          <h4>{payrollGuideDetailData.statutorySlabs.esic.title}</h4>
                          <div className="statutory-kv-grid">
                            <div className="statutory-kv-item">
                              <label>Applicability Threshold</label>
                              <span>{payrollGuideDetailData.statutorySlabs.esic.eligibility}</span>
                            </div>
                            <div className="statutory-kv-item">
                              <label>Wage Threshold</label>
                              <span>{payrollGuideDetailData.statutorySlabs.esic.wageThreshold}</span>
                            </div>
                            <div className="statutory-kv-item">
                              <label>Employee Deduction</label>
                              <span>{payrollGuideDetailData.statutorySlabs.esic.employeeShare}</span>
                            </div>
                            <div className="statutory-kv-item">
                              <label>Employer Contribution</label>
                              <span>{payrollGuideDetailData.statutorySlabs.esic.employerShare}</span>
                            </div>
                          </div>
                          <div className="guide-callout-box" style={{ margin: "14px 0 0 0" }}>
                            <div className="guide-callout-title">
                              <Icon name="calendar" size={15} /> Monthly Filing Deadline
                            </div>
                            <p>{payrollGuideDetailData.statutorySlabs.esic.filingDeadline}</p>
                          </div>
                        </div>
                      )}

                      {statutoryTab === "pt" && (
                        <div className="statutory-detail-box">
                          <h4>State-wise Professional Tax Slabs</h4>
                          <p style={{ fontSize: "13.5px", color: "#64748b" }}>
                            Professional Tax is determined by individual state government legislation:
                          </p>
                          <div className="pt-state-table-wrap">
                            <table className="pt-state-table">
                              <thead>
                                <tr>
                                  <th>State</th>
                                  <th>Monthly Tax Slab</th>
                                  <th>Filing Deadline</th>
                                </tr>
                              </thead>
                              <tbody>
                                {payrollGuideDetailData.statutorySlabs.pt.map((row) => (
                                  <tr key={row.state}>
                                    <td>
                                      <strong>{row.state}</strong>
                                    </td>
                                    <td>{row.slab}</td>
                                    <td>{row.filingDeadline}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Missing monthly statutory remittance deadlines (the 15th for EPFO & ESIC) triggers compounding damages from <strong>5% to 25% per annum</strong> plus mandatory penal interest under Section 7Q and personal liability for company directors.
                      </p>
                    </div>
                  </section>

                  {/* 7. Interactive 5-Stage Payroll Audit Checklist */}
                  <section id="interactive-checklist" className="guide-prose-section">
                    <h2>7. Interactive 5-Stage Payroll Audit Checklist</h2>
                    <p>
                      Use this interactive checklist during every month-end run to track verification progress:
                    </p>

                    <div className="interactive-checklist-box">
                      <div className="checklist-header">
                        <h3>
                          <Icon name="check" size={20} /> Monthly Run Progress
                        </h3>
                        <span style={{ fontWeight: 700, color: "#7b2958", fontSize: "14px" }}>
                          {completedCount} of {checklist.length} Completed ({progressPercent}%)
                        </span>
                      </div>

                      <div className="checklist-progress-bar-wrap">
                        <div
                          className="checklist-progress-fill"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <div className="checklist-items-list">
                        {checklist.map((item) => (
                          <div
                            key={item.id}
                            className={`checklist-item-row ${item.done ? "done" : ""}`}
                            onClick={() => toggleChecklistItem(item.id)}
                          >
                            <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => {}}
                              className="checklist-checkbox"
                            />
                            <div>
                              <span className="checklist-stage-pill">{item.stage}</span>
                              <div className="checklist-task-text">{item.task}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="checklist-footer-actions">
                        <button
                          type="button"
                          className="checklist-reset-btn"
                          onClick={resetChecklist}
                        >
                          Reset Checklist
                        </button>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>
                          Tip: Automated in LattiumHR with one-click dual signoff.
                        </span>
                      </div>
                    </div>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Enforcing structured, dual-authorization (maker-checker) approval checklists before initiating bank disbursements guarantees a <strong>99.4% zero-penalty statutory audit rate</strong> and prevents erroneous salary overpayments.
                      </p>
                    </div>
                  </section>

                  {/* 8. Common Pitfalls & Modern HRMS */}
                  <section id="common-pitfalls" className="guide-prose-section">
                    <h2>8. Pitfalls of Spreadsheets vs Modern HRMS Automation</h2>
                    <p>
                      Over 68% of small-to-medium businesses still process salaries on static Excel spreadsheets. Here is why high-growth companies transition to automated platforms like LattiumHR:
                    </p>
                    <ul>
                      <li>
                        <strong>Formula Ingestion Errors:</strong> A single broken VLOOKUP or misplaced row causes severe under-deductions that trigger audit fines.
                      </li>
                      <li>
                        <strong>Biometric Disconnection:</strong> Manually copying punch card data from physical gate scanners into spreadsheets takes 3–5 operational days every month.
                      </li>
                      <li>
                        <strong>Data Security Risks:</strong> Emailing salary spreadsheets with unencrypted employee PAN and bank account credentials violates modern Data Protection regulations.
                      </li>
                      <li>
                        <strong>LattiumHR Advantage:</strong> Attendance, leaves, expenses, and statutory withholdings sync in real time into one unified payroll engine with two-click bank disbursement.
                      </li>
                    </ul>

                    <div className="guide-callout-box">
                      <div className="guide-callout-title">
                        <Icon name="sparkle" size={16} /> Key Takeaway
                      </div>
                      <p>
                        Migrating from unencrypted Excel spreadsheets to an integrated cloud HRMS eliminates formula corruption risks, protects sensitive PAN and bank data under DPDP guidelines, and saves up to <strong>32 hours of manual admin work</strong> each month.
                      </p>
                    </div>
                  </section>
                </>
              )}
            </main>
          </div>
        </div>

        {/* ==========================================================================
            BELOW THE ARTICLE: RELATED GUIDES (3 PROMINENT CLEAN CARDS - NO IMAGES)
            ========================================================================== */}
        <section className="article-related-section">
          <div className="guide-detail-container">
            <div className="article-related-header">
              <span className="article-related-eyebrow">
                <Icon name="sparkle" size={12} /> ACTIONABLE PLAYBOOKS
              </span>
              <h2 className="article-related-title">Explore Related Guides</h2>
              <p className="article-related-sub">
                Deep-dive into our other operational playbooks and statutory compliance guides.
              </p>
            </div>

            <div className="keep-reading-handbooks-grid">
              {relatedHandbooks.map((handbook) => (
                <Link
                  key={handbook.slug}
                  to={`/guides/${handbook.slug}`}
                  className="handbook-card"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <div className="playbook-card-header">
                    <span className="playbook-category-tag">{handbook.category}</span>
                  </div>

                  <div className="playbook-content">
                    <h3 className="playbook-card-title">{handbook.title}</h3>
                    <p className="playbook-card-desc">{handbook.subtitle}</p>
                  </div>

                  <div className="playbook-card-footer">
                    <span className="playbook-read-time">
                      <Icon name="clock" size={13} /> {handbook.readTime}
                    </span>
                    <span className="playbook-open-btn">
                      Read Guide <Icon name="arrow" size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            EXACT HOME PAGE FOOTER CTA SECTION (FULL WIDTH, PROPER CONTAINER)
            ========================================================================== */}
        <section className="final-cta">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">READY TO SIMPLIFY HR?</span>
              <h2>Your people deserve better than spreadsheets.</h2>
              <p>
                Join 500+ growing businesses worldwide running HR, attendance, and payroll on
                LattiumHR.
              </p>
              <div className="final-actions">
                <Button onClick={() => openDemoModal()}>
                  Book a Free Demo <Icon name="arrow" />
                </Button>
                <Button to="/contact" secondary>
                  Talk to a Specialist
                </Button>
              </div>
              <div className="final-points">
                <span>
                  <Icon name="check" /> Free personalised demo
                </span>
                <span>
                  <Icon name="check" /> No credit card required
                </span>
                <span>
                  <Icon name="check" /> Go live in 2–4 weeks
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default GuideDetailPage;
