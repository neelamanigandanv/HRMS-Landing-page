import FooterCTA from "../components/common/FooterCTA";
import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import { useDemoModal } from "../context/DemoModalContext";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useCurrency } from "../context/CurrencyContext";
import { GUIDE_DETAILS_MAP, GuideDetailModel } from "../data/guidesData";
import "./Blog.css";
import "./GuideDetailPage.css";

export function GuideDetailPage() {
  const { openDemoModal } = useDemoModal();
  const { slug } = useParams<{ slug?: string }>();
  const { currency, currencySymbol } = useCurrency();

  const isIndia = currency === "INR";
  const formatAmount = (val: number) => `${currencySymbol}${val.toLocaleString()}`;

  // Resolve guide from data map, handling aliases
  const currentSlug = slug === "informative-expense-management-guide" ? "expense-management-guide" : slug || "payroll-management-guide";
  const currentGuide: GuideDetailModel = GUIDE_DETAILS_MAP[currentSlug] || GUIDE_DETAILS_MAP["payroll-management-guide"];

  // 3 Prominent Related Guides (Never includes current page)
  const relatedHandbooks = useMemo(() => {
    const allGuides = Object.values(GUIDE_DETAILS_MAP);
    return allGuides
      .filter((g) => g.slug !== currentGuide.slug)
      .slice(0, 3);
  }, [currentGuide.slug]);

  // Double color title
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
  const [activeToc, setActiveToc] = useState<string>(currentGuide.toc[0]?.id || "");
  const isClickScrollingRef = useRef<boolean>(false);

  // Active tab per section (for sections with tabs)
  const [activeTabs, setActiveTabs] = useState<Record<string, number>>({});

  // Active FAQ accordion index
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // --------------------------------------------------------------------------
  // INTERACTIVE CHECKLIST STATE
  // --------------------------------------------------------------------------
  const [checklist, setChecklist] = useState(currentGuide.auditChecklist);

  useEffect(() => {
    setChecklist(currentGuide.auditChecklist);
    setActiveToc(currentGuide.toc[0]?.id || "");
    setOpenFaqIdx(0);
    setActiveTabs({});
  }, [currentGuide]);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const completedCount = checklist.filter((item) => item.done).length;
  const progressPercent = Math.round((completedCount / (checklist.length || 1)) * 100);

  const resetChecklist = () => {
    setChecklist((prev) => prev.map((item) => ({ ...item, done: false })));
  };

  // --------------------------------------------------------------------------
  // PAYROLL SIMULATOR STATE (for payroll guide)
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

  // --------------------------------------------------------------------------
  // LEAVE SIMULATOR STATE (for leave guide)
  // --------------------------------------------------------------------------
  const [monthlyAccrualRate, setMonthlyAccrualRate] = useState<number>(1.5);
  const [monthsWorked, setMonthsWorked] = useState<number>(10);
  const [openingBalance, setOpeningBalance] = useState<number>(12);
  const [leavesConsumed, setLeavesConsumed] = useState<number>(7);
  const [leaveBasicSalary, setLeaveBasicSalary] = useState<number>(isIndia ? 40000 : 4000);

  const totalLeaveAccrued = openingBalance + Math.round(monthlyAccrualRate * monthsWorked);
  const availableLeaveBalance = Math.max(0, totalLeaveAccrued - leavesConsumed);
  const encashableDays = Math.min(availableLeaveBalance, 30);
  const encashmentValue = Math.round((leaveBasicSalary / 30) * encashableDays);

  // --------------------------------------------------------------------------
  // HASH SCROLLING & FAQ DEEP-LINKING
  // --------------------------------------------------------------------------
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      const faqIndex = currentGuide.faqs?.findIndex((f) => f.id === targetId);
      if (faqIndex !== -1 && faqIndex !== undefined) {
        setOpenFaqIdx(faqIndex);
      }
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("guide-faq-highlight");
          setTimeout(() => el.classList.remove("guide-faq-highlight"), 3000);
        }
      }, 350);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [slug, currentGuide.slug]);

  // Scroll spy for TOC
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const navOffset = 180;
      const tocIds = currentGuide.toc.map((t) => t.id);
      if (tocIds.length === 0) return;

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;

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

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "Guides & Playbooks", to: "/guides" },
    { label: currentGuide.title },
  ];

  return (
    <PageLayout hideCTA={true} breadcrumbs={breadcrumbs}>
      <SEO
        title={`${currentGuide.title} | LattiumHR Practical Handbook`}
        description={currentGuide.subtitle}
        canonicalPath={`/guides/${currentGuide.slug}`}
      />

      <div className="guide-detail-page">
        {/* ==========================================================================
            1. HERO HEADER SECTION
            ========================================================================== */}
        <section className="guide-detail-hero" aria-labelledby="guide-title">
          <div className="guide-detail-container">
            <div className="guide-hero-centered-content">
              <div className="guide-hero-eyebrow">
                <Icon name="sparkle" size={13} />
                <span>✦ {currentGuide.category.toUpperCase()} MASTERCLASS ✦</span>
              </div>

              <h1 id="guide-title" className="guide-hero-title">
                {renderDoubleColorTitle(currentGuide.title)}
              </h1>

              <p className="guide-hero-subtitle">{currentGuide.subtitle}</p>

              {/* Author & Verification Meta Row */}
              <div className="guide-hero-meta-row">
                <div className="guide-meta-author-box">
                  <div className="author-avatar-circle">{currentGuide.author.avatar}</div>
                  <div className="author-info">
                    <span className="author-name">{currentGuide.author.name}</span>
                    <span className="author-role">{currentGuide.author.role}</span>
                  </div>
                </div>

                <div className="guide-meta-divider" />

                <div className="guide-meta-badges">
                  <span className="guide-meta-pill">
                    <Icon name="clock" size={13} /> {currentGuide.readTime}
                  </span>
                  <span className="guide-meta-pill">
                    <Icon name="check" size={13} /> {currentGuide.updatedDate}
                  </span>
                  <span className="guide-meta-pill highlight">
                    <Icon name="shield" size={13} /> {currentGuide.badge}
                  </span>
                </div>
              </div>

              {/* Action Buttons in Hero */}
              <div className="guide-hero-actions">
                <button
                  type="button"
                  className="guide-hero-btn-primary"
                  onClick={() => openDemoModal()}
                >
                  <span>Request Platform Demo</span>
                  <Icon name="arrow" size={15} />
                </button>
                <button
                  type="button"
                  className="guide-hero-btn-secondary"
                  onClick={handleDownloadGuide}
                >
                  <Icon name="download" size={15} />
                  <span>Save / Print PDF</span>
                </button>
              </div>

              {/* 3 Process Flow Cards Header */}
              <div className="guide-hero-flow-stage">
                <div className="guide-hero-flow-grid">
                  {currentGuide.heroFlow.map((step, sIdx, arr) => (
                    <div key={step.step} className="guide-flow-card-wrapper">
                      <div className="guide-flow-card">
                        <div className="guide-flow-badge-row">
                          <span className="guide-flow-step-badge">{step.step}</span>
                        </div>
                        <strong className="guide-flow-title">{step.title}</strong>
                        <p className="guide-flow-desc">{step.desc}</p>
                      </div>
                      {sIdx < arr.length - 1 && (
                        <div className="guide-flow-connector" aria-hidden="true">
                          <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
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
            2. BODY CONTENT (2-COLUMN: LEFT SIDEBAR TOC + RIGHT ARTICLES)
            ========================================================================== */}
        <div className="guide-detail-container">
          <div className="guide-layout-grid">
            {/* LEFT SIDEBAR: TOPICS CARD + ACTION CTA CARD */}
            <aside className="guide-sidebar-sticky">
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

              {/* ACTION CTA CARD */}
              <div className="guide-sidebar-cta-card">
                <span className="sidebar-cta-badge">
                  <Icon name="sparkle" size={12} /> Interactive HRMS
                </span>
                <h4>{currentGuide.sidebarCTA.title}</h4>
                <p>{currentGuide.sidebarCTA.desc}</p>
                <button
                  type="button"
                  className="sidebar-cta-btn"
                  onClick={handleDownloadGuide}
                >
                  <Icon name="download" size={14} /> Download Guide PDF
                </button>
                <div className="sidebar-cta-guarantee">
                  <Icon name="check" size={12} /> Free Practical Guide • Instant Access
                </div>
              </div>
            </aside>

            {/* RIGHT COLUMN: MAIN ARTICLE SECTIONS */}
            <main className="guide-main-article-content">
              {currentGuide.sections.map((sec) => (
                <section id={sec.id} key={sec.id} className="guide-prose-section">
                  <h2>{sec.title}</h2>

                  {/* Paragraphs */}
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}

                  {/* Bullet points if present */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul>
                      {sec.bullets.map((b, bIdx) => {
                        const parts = b.split(":");
                        if (parts.length > 1) {
                          return (
                            <li key={bIdx}>
                              <strong>{parts[0]}:</strong> {parts.slice(1).join(":")}
                            </li>
                          );
                        }
                        return <li key={bIdx}>{b}</li>;
                      })}
                    </ul>
                  )}

                  {/* Interactive Tabs if present */}
                  {sec.tabs && sec.tabs.length > 0 && (
                    <div className="salary-components-interactive">
                      <div className="salary-tabs-header">
                        {sec.tabs.map((tab, tIdx) => {
                          const currentTabIdx = activeTabs[sec.id] || 0;
                          return (
                            <button
                              key={tab.name}
                              type="button"
                              className={`salary-tab-btn ${currentTabIdx === tIdx ? "active" : ""}`}
                              onClick={() =>
                                setActiveTabs((prev) => ({ ...prev, [sec.id]: tIdx }))
                              }
                            >
                              {tab.name}
                            </button>
                          );
                        })}
                      </div>

                      {(() => {
                        const currentTabIdx = activeTabs[sec.id] || 0;
                        const activeTabObj = sec.tabs[currentTabIdx] || sec.tabs[0];
                        return (
                          <div className="salary-tab-content-panel">
                            <p className="tab-panel-desc">{activeTabObj.description}</p>
                            <div className="components-breakdown-grid">
                              {activeTabObj.items.map((item) => (
                                <div key={item.name} className="component-item-card">
                                  <div className="comp-card-top">
                                    <strong className="comp-name">{item.name}</strong>
                                    <span className="comp-share-badge">{item.tag}</span>
                                  </div>
                                  <p className="comp-desc">{item.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Tables if present */}
                  {sec.table && (
                    <div className="pt-state-table-wrap">
                      <table className="pt-state-table">
                        <thead>
                          <tr>
                            {sec.table.headers.map((h) => (
                              <th key={h}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              <td>
                                <strong>{row.col1}</strong>
                              </td>
                              <td>{row.col2}</td>
                              <td>{row.col3}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* GROSS-TO-NET SIMULATOR FOR PAYROLL GUIDE */}
                  {sec.id === "salary-components" && currentGuide.slug === "payroll-management-guide" && (
                    <div className="interactive-calc-card" style={{ marginTop: "24px" }}>
                      <div className="calc-card-header">
                        <h3>
                          <Icon name="finance" size={20} /> Gross-to-Net Compensation Simulator
                        </h3>
                        <span className="calc-currency-badge">
                          Currency: {currency} ({currencySymbol})
                        </span>
                      </div>

                      <div className="calc-body-grid">
                        <div className="calc-inputs-col">
                          <label className="calc-input-group">
                            <span>Basic Salary ({currencySymbol}):</span>
                            <input
                              type="number"
                              value={basicSalary}
                              onChange={(e) => setBasicSalary(Number(e.target.value) || 0)}
                              className="calc-input"
                            />
                          </label>

                          <label className="calc-input-group">
                            <span>House Rent Allowance (HRA):</span>
                            <input
                              type="number"
                              value={hra}
                              onChange={(e) => setHra(Number(e.target.value) || 0)}
                              className="calc-input"
                            />
                          </label>

                          <label className="calc-input-group">
                            <span>Special / Other Allowances:</span>
                            <input
                              type="number"
                              value={specialAllowance}
                              onChange={(e) => setSpecialAllowance(Number(e.target.value) || 0)}
                              className="calc-input"
                            />
                          </label>

                          <div className="calc-toggles-row">
                            <label className="calc-checkbox-label">
                              <input
                                type="checkbox"
                                checked={deductPf}
                                onChange={(e) => setDeductPf(e.target.checked)}
                              />
                              <span>EPF (12% of Basic)</span>
                            </label>
                            <label className="calc-checkbox-label">
                              <input
                                type="checkbox"
                                checked={deductPt}
                                onChange={(e) => setDeductPt(e.target.checked)}
                              />
                              <span>Professional Tax (₹200)</span>
                            </label>
                            <label className="calc-checkbox-label">
                              <input
                                type="checkbox"
                                checked={deductEsic}
                                onChange={(e) => setDeductEsic(e.target.checked)}
                              />
                              <span>ESIC (0.75%)</span>
                            </label>
                          </div>
                        </div>

                        <div className="calc-results-col">
                          <div className="calc-result-summary-box">
                            <span className="calc-result-label">Estimated Monthly In-Hand</span>
                            <div className="calc-result-amount">{formatAmount(netInHand)}</div>
                            <span className="calc-result-sub">
                              Total Deductions: {formatAmount(totalDeductions)}
                            </span>
                          </div>

                          <div className="calc-breakdown-table">
                            <div className="calc-table-row">
                              <span>Gross Monthly CTC:</span>
                              <strong>{formatAmount(grossSalary)}</strong>
                            </div>
                            <div className="calc-table-row">
                              <span>Provident Fund (EPF):</span>
                              <span>– {formatAmount(pfDeduction)}</span>
                            </div>
                            <div className="calc-table-row">
                              <span>Professional Tax (PT):</span>
                              <span>– {formatAmount(ptDeduction)}</span>
                            </div>
                            <div className="calc-table-row">
                              <span>Estimated Income Tax (TDS):</span>
                              <span>– {formatAmount(estimatedTds)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LEAVE SIMULATOR FOR LEAVE GUIDE */}
                  {sec.id === "policy-rules" && currentGuide.slug === "leave-management-guide" && (
                    <div className="interactive-calc-card" style={{ marginTop: "24px" }}>
                      <div className="calc-card-header">
                        <h3>
                          <Icon name="calendar" size={20} /> Leave Accrual & Encashment Simulator
                        </h3>
                        <span className="calc-currency-badge">Interactive Calculator</span>
                      </div>

                      <div className="calc-body-grid">
                        <div className="calc-inputs-col">
                          <label className="calc-input-group">
                            <span>Monthly Accrual Rate (Days / Month):</span>
                            <input
                              type="number"
                              step="0.25"
                              value={monthlyAccrualRate}
                              onChange={(e) => setMonthlyAccrualRate(Number(e.target.value) || 0)}
                              className="calc-input"
                            />
                          </label>

                          <label className="calc-input-group">
                            <span>Completed Continuous Months:</span>
                            <input
                              type="number"
                              value={monthsWorked}
                              onChange={(e) => setMonthsWorked(Number(e.target.value) || 0)}
                              className="calc-input"
                            />
                          </label>

                          <label className="calc-input-group">
                            <span>Opening Earned Leave Balance:</span>
                            <input
                              type="number"
                              value={openingBalance}
                              onChange={(e) => setOpeningBalance(Number(e.target.value) || 0)}
                              className="calc-input"
                            />
                          </label>

                          <label className="calc-input-group">
                            <span>Leaves Availed This Period:</span>
                            <input
                              type="number"
                              value={leavesConsumed}
                              onChange={(e) => setLeavesConsumed(Number(e.target.value) || 0)}
                              className="calc-input"
                            />
                          </label>
                        </div>

                        <div className="calc-results-col">
                          <div className="calc-result-summary-box">
                            <span className="calc-result-label">Available Leave Balance</span>
                            <div className="calc-result-amount">{availableLeaveBalance} Days</div>
                            <span className="calc-result-sub">
                              Estimated Encashment Value: {formatAmount(encashmentValue)}
                            </span>
                          </div>

                          <div className="calc-breakdown-table">
                            <div className="calc-table-row">
                              <span>Total Accrued to Date:</span>
                              <strong>{totalLeaveAccrued} Days</strong>
                            </div>
                            <div className="calc-table-row">
                              <span>Leaves Availed:</span>
                              <span>– {leavesConsumed} Days</span>
                            </div>
                            <div className="calc-table-row">
                              <span>Statutory Encashable Cap:</span>
                              <span>Max 30 Days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* INTERACTIVE CHECKLIST COMPONENT */}
                  {sec.id === "interactive-checklist" && (
                    <div className="interactive-checklist-box">
                      <div className="checklist-header">
                        <h3>
                          <Icon name="check" size={20} /> Verification Progress
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
                          Tip: Automated with continuous verification inside LattiumHR.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* FREQUENTLY ASKED QUESTIONS SECTION (SECTION 9) */}
                  {sec.id === "faqs" && (
                    <div className="guide-faqs-container">
                      {currentGuide.faqs.map((faq, idx) => {
                        const isOpen = openFaqIdx === idx;
                        return (
                          <div
                            id={faq.id}
                            key={faq.id}
                            className={`guide-faq-card ${isOpen ? "open" : ""}`}
                            onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          >
                            <div className="guide-faq-header">
                              <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
                                <span className="guide-faq-num-badge">Q{idx + 1}</span>
                                <h3 className="guide-faq-question">{faq.q}</h3>
                              </div>
                              <div className="guide-faq-toggle-icon">
                                <Icon name="chevron-down" size={16} />
                              </div>
                            </div>
                            {isOpen && (
                              <div className="guide-faq-answer-block">
                                <p className="guide-faq-answer">{faq.a}</p>
                                <div className="guide-faq-share-row">
                                  <button
                                    type="button"
                                    className="guide-faq-share-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const url = `${window.location.origin}/guides/${currentGuide.slug}#${faq.id}`;
                                      if (navigator.clipboard) {
                                        navigator.clipboard.writeText(url);
                                        alert("Direct link to question copied to clipboard!");
                                      }
                                    }}
                                  >
                                    <Icon name="link" size={13} /> Copy Question Link
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Key Takeaway Callout */}
                  <div className="guide-callout-box">
                    <div className="guide-callout-title">
                      <Icon name="sparkle" size={16} /> {sec.callout.title}
                    </div>
                    <p>{sec.callout.text}</p>
                  </div>
                </section>
              ))}
            </main>
          </div>
        </div>

        {/* ==========================================================================
            3. BELOW THE ARTICLE: RELATED ACTIONABLE PLAYBOOKS
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
            4. FINAL CONVERSION CTA (FULL WIDTH)
            ========================================================================== */}
        <FooterCTA />
      </div>
    </PageLayout>
  );
}

export default GuideDetailPage;
