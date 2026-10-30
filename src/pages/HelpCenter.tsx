  import { useState, useMemo, useRef, FormEvent } from "react";
import { Link } from "react-router-dom";
im    port PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import { SUPPORT_ARTICLES_DATABASE } from "../data/supportData";
import { HelpTopicIllustration } from "../components/help/HelpTopicIllustration";
import { HelpWorkflowIsometric } from "../components/help/HelpWorkflowIsometric";
import "./HelpCenter.css";

interface HelpCategoryItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  link: string;
  articlesCount: number;
}

interface StepGuideItem {
  number: string;
  title: string;
  desc: string;
  link: string;
  tag: string;
}

interface HelpFAQ {
  q: string;
  a: string;
}

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [activeFilterTab, setActiveFilterTab] = useState<"all" | "articles" | "guides" | "faqs">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openSearchFaq, setOpenSearchFaq] = useState<number | null>(0);
  const resultsRef = useRef<HTMLElement | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleSearchFaq = (index: number) => {
    setOpenSearchFaq(openSearchFaq === index ? null : index);
  };

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "Help Center" },
  ];

  // Suggested searches requested by user
  const suggestedSearches = [
    "Payroll",
    "Attendance",
    "Leave",
    "Employee Records",
    "Biometric",
  ];

  const scrollToResults = () => {
    setTimeout(() => {
      const el = document.getElementById("help-results");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleChipClick = (term: string) => {
    if (selectedChip === term) {
      setSelectedChip(null);
      setSearchQuery("");
    } else {
      setSelectedChip(term);
      setSearchQuery(term);
      scrollToResults();
    }
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      scrollToResults();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedChip(null);
    setActiveFilterTab("all");
  };

  // Section 2: 8 HRMS-related categories
  const categories: HelpCategoryItem[] = [
    {
      id: "employee-management",
      title: "Employee Management",
      desc: "Directory, digital profiles, onboarding paperwork, organizational charts, and asset custody tracking.",
      icon: "users",
      link: "/features/employee-management",
      articlesCount: 16,
    },
    {
      id: "attendance-shifts",
      title: "Attendance & Shifts",
      desc: "Biometric clock-in sync, GPS geofencing, multi-shift rotational rosters, and overtime calculations.",
      icon: "clock",
      link: "/features/attendance-management",
      articlesCount: 22,
    },
    {
      id: "leave-management",
      title: "Leave Management",
      desc: "Leave policies, automated monthly accruals, sandwich rule logic, holiday calendars, and approval chains.",
      icon: "calendar",
      link: "/features/leave-management",
      articlesCount: 18,
    },
    {
      id: "payroll-management",
      title: "Payroll Management",
      desc: "Salary structures, statutory PF, ESI, state PT slabs, TDS deductions, direct bank files, and payslips.",
      icon: "credit-card",
      link: "/features/payroll-management",
      articlesCount: 28,
    },
    {
      id: "recruitment-onboarding",
      title: "Recruitment & Onboarding",
      desc: "Hiring pipelines, candidate scorecards, digital offer letters, pre-boarding checklists, and KYC vaults.",
      icon: "briefcase",
      link: "/features/recruitment",
      articlesCount: 14,
    },
    {
      id: "documents-compliance",
      title: "Documents & Compliance",
      desc: "Encrypted document vaults, e-signatures, audit log trails, policy acknowledgments, and statutory filing readiness.",
      icon: "shield",
      link: "/features/documents-compliance",
      articlesCount: 15,
    },
    {
      id: "reports-analytics",
      title: "Reports & Analytics",
      desc: "Visual workforce intelligence, headcount growth, attrition forecasting, and scheduled compliance exports.",
      icon: "chart",
      link: "/features/reports-analytics",
      articlesCount: 19,
    },
    {
      id: "roles-permissions",
      title: "Roles & Permissions",
      desc: "Granular Role-Based Access Control (RBAC), branch administrative delegation, and data privacy governance.",
      icon: "lock",
      link: "/features/roles-permissions",
      articlesCount: 11,
    },
  ];

  // Section 3: Popular Help Articles explicitly requested
  const popularArticles = [
    {
      slug: "how-do-i-add-a-new-employee",
      title: "How do I add a new employee?",
      topic: "Employee Management",
      readTime: "3 min read",
      summary:
        "Complete walkthrough to create an employee profile, assign reporting managers, configure salary structures, and send self-service portal invites.",
    },
    {
      slug: "how-can-i-configure-attendance-shifts",
      title: "How can I configure attendance shifts?",
      topic: "Attendance & Shifts",
      readTime: "4 min read",
      summary:
        "Step-by-step instructions to create rotational shift schedules, grace periods, biometric machine sync, and overtime calculation rules.",
    },
    {
      slug: "how-do-i-set-up-leave-policies",
      title: "How do I set up leave policies?",
      topic: "Leave Management",
      readTime: "3 min read",
      summary:
        "Learn how to define annual leave quotas, monthly accrual formulas, sandwich rules, carry-over limits, and manager approval chains.",
    },
    {
      slug: "how-can-i-manage-employee-permissions",
      title: "How can I manage employee permissions?",
      topic: "Roles & Permissions",
      readTime: "4 min read",
      summary:
        "Configure granular Role-Based Access Control (RBAC), data visibility restrictions, and branch-level administrative privileges.",
    },
    {
      slug: "how-do-i-generate-payroll-reports",
      title: "How do I generate payroll reports?",
      topic: "Payroll Management",
      readTime: "3 min read",
      summary:
        "A practical guide to generating salary registers, bank NEFT transfer files, PF/ESI challans, and tax compliance summaries in one click.",
    },
  ];

  // Section 4: Step-by-Step Guides for New Customer Setup (Matching Reference Architecture)
  const stepGuides = [
    {
      number: "1",
      title: "Quick Organization Setup",
      desc: "Configure company legal entities, branch locations, departments, corporate branding, and fiscal calendars.",
      link: "/guides/employee-onboarding-guide",
      tag: "Foundations",
      icon: "users",
    },
    {
      number: "2",
      title: "Employee Directory Ingestion",
      desc: "Bulk import your complete workforce directory via automated spreadsheet mapping with zero data corruption.",
      link: "/guides/employee-onboarding-guide",
      tag: "Directory",
      icon: "file-text",
    },
    {
      number: "3",
      title: "Biometric & Shift Alignment",
      desc: "Connect biometric scanners, assign rotational shift rosters, and define GPS geofences for branch mobile clock-ins.",
      link: "/guides/attendance-management-guide",
      tag: "Time & Shifts",
      icon: "clock",
    },
    {
      number: "4",
      title: "Payroll Engine & Statutory Rules",
      desc: "Assign CTC wage structures, configure PF/ESI/PT statutory deductions, and run a pre-payroll validation dry run.",
      link: "/guides/payroll-management-guide",
      tag: "Pay Runs",
      icon: "credit-card",
    },
    {
      number: "5",
      title: "Go Live & Zero-Defect Payouts",
      desc: "Generate encrypted bank NEFT transfer files, disburse one-click digital payslips, and download compliance challans.",
      link: "/guides/statutory-compliance-guide",
      tag: "Launch",
      icon: "check",
    },
  ];

  // Section 5: Frequently Asked Questions requested by user
  const faqs: HelpFAQ[] = [
    {
      q: "What is LattiumHR?",
      a: "LattiumHR is a unified cloud Human Resource Management System (HRMS) built for small teams, mid-sized companies, and multi-entity enterprises. It centralizes employee records, attendance tracking, shift scheduling, configurable leave workflows, multi-state payroll, performance reviews, and audit-ready compliance in one intuitive platform.",
    },
    {
      q: "Which HRMS modules are available?",
      a: "LattiumHR delivers a comprehensive suite of 8 core modules: Employee Directory & Profiles, Attendance & Shift Management, Leave Tracking, Automated Payroll & Statutory Compliance, Recruitment & Applicant Tracking, Digital Documents & Vaults, Reports & BI Analytics, and Role-Based Access Control (RBAC). You can start with what you need and enable more as you scale.",
    },
    {
      q: "Can I manage multiple branches?",
      a: "Yes. LattiumHR supports multi-entity and multi-branch architectures natively. You can manage multiple subsidiaries, regional offices, and factories under a single master organization. Each location can maintain its own holiday calendar, biometric terminals, and state-specific tax rules while central leadership retains consolidated visibility.",
    },
    {
      q: "Can different users have different permissions?",
      a: "Yes. LattiumHR provides granular Role-Based Access Control (RBAC). You can configure tailored roles with customized view, edit, or approval permissions for Department Heads, Branch HR Managers, Payroll Specialists, and Line Managers. Confidential compensation figures and sensitive audit trails are strictly segregated.",
    },
    {
      q: "How can I request a product demo?",
      a: "You can schedule a customized 1-on-1 walkthrough anytime by clicking 'Request a Demo' at the top of any page or visiting our Request Demo page. Our solution architects will demonstrate live workflows tailored to your team size, attendance hardware, and payroll structure.",
    },
  ];

  // Clean words array from query
  const searchTerms = useMemo(() => {
    return searchQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((t) => t.length > 0);
  }, [searchQuery]);

  // Comprehensive multi-word matching across articles
  const matchedArticles = useMemo(() => {
    if (searchTerms.length === 0) return [];
    return SUPPORT_ARTICLES_DATABASE.filter((art) => {
      const fullText = `${art.title} ${art.summary} ${art.topicSlug} ${(art.steps || []).join(" ")}`.toLowerCase();
      return searchTerms.some((term) => fullText.includes(term));
    });
  }, [searchTerms]);

  // Matching categories
  const matchedCategories = useMemo(() => {
    if (searchTerms.length === 0) return [];
    return categories.filter((cat) => {
      const fullText = `${cat.title} ${cat.desc}`.toLowerCase();
      return searchTerms.some((term) => fullText.includes(term));
    });
  }, [searchTerms, categories]);

  // Matching guides
  const matchedGuides = useMemo(() => {
    if (searchTerms.length === 0) return [];
    return stepGuides.filter((guide) => {
      const fullText = `${guide.title} ${guide.desc} ${guide.tag}`.toLowerCase();
      return searchTerms.some((term) => fullText.includes(term));
    });
  }, [searchTerms, stepGuides]);

  // Matching FAQs
  const matchedFaqs = useMemo(() => {
    if (searchTerms.length === 0) return [];
    return faqs.filter((faq) => {
      const fullText = `${faq.q} ${faq.a}`.toLowerCase();
      return searchTerms.some((term) => fullText.includes(term));
    });
  }, [searchTerms, faqs]);

  // Top 5 for instant autocomplete preview in hero
  const instantPreviewArticles = useMemo(() => {
    return matchedArticles.slice(0, 5);
  }, [matchedArticles]);

  const totalResultsCount =
    matchedArticles.length +
    matchedCategories.length +
    matchedGuides.length +
    matchedFaqs.length;

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Help Center & Knowledge Base | LattiumHR"
        description="Find quick answers, step-by-step instructions, and helpful resources to get the most out of LattiumHR."
        canonicalPath="/help"
      />

      <div className="help-center-page">
        {/* =========================================================================
            1. HERO — Find the Answers You Need
            ========================================================================= */}
        <section className="help-hero-section" aria-labelledby="help-hero-title">
          <div className="help-hero-container">
            <span className="help-hero-eyebrow">✦ 24/7 CUSTOMER SUPPORT &amp; KNOWLEDGE BASE ✦</span>
            <h1 id="help-hero-title" className="help-hero-heading">
              How Can We <span className="help-hero-highlight">Help You Today?</span>
            </h1>
            <p className="help-hero-subheading">
              Explore step-by-step setup walkthroughs, comprehensive module documentation, and instant answers to manage your workforce with confidence.
            </p>

            {/* Large Search Bar */}
            <div className="help-search-wrapper">
              <form onSubmit={handleSearchSubmit} className="help-search-input-box">
                <Icon name="search" size={20} className="help-search-icon" />
                <input
                  type="text"
                  className="help-search-input"
                  placeholder="Search by keyword, module, or question (e.g. Payroll, Attendance, Leave, Salary)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (selectedChip && e.target.value !== selectedChip) {
                      setSelectedChip(null);
                    }
                  }}
                  aria-label="Search help center"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="help-search-clear-btn"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    <Icon name="x" size={14} />
                  </button>
                )}
                <button type="submit" className="help-search-submit-btn">
                  Search
                </button>
              </form>

              {/* Instant Search Results Dropdown */}
              {isSearchActive && (
                <div className="help-instant-results" role="region" aria-label="Search preview">
                  {instantPreviewArticles.length > 0 ? (
                    <>
                      {instantPreviewArticles.map((art) => (
                        <Link
                          key={art.slug}
                          to={`/support/article/${art.slug}`}
                          className="help-instant-result-item"
                        >
                          <div className="help-instant-item-left">
                            <span className="help-instant-item-title">{art.title}</span>
                            <span className="help-instant-item-desc">{art.summary}</span>
                          </div>
                          <span className="help-instant-item-tag">{art.readTime}</span>
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={scrollToResults}
                        className="help-instant-footer-btn"
                      >
                        View all {totalResultsCount} matching results below ↓
                      </button>
                    </>
                  ) : (
                    <div style={{ padding: "16px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
                      No direct articles matched &ldquo;{searchQuery}&rdquo;. Try browsing topics below or{" "}
                      <Link to="/support" style={{ color: "#802B5B", fontWeight: 700 }}>
                        contact support
                      </Link>
                      .
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Suggested searches requested by user */}
            <div className="help-suggested-searches">
              <span className="help-suggested-label">Suggested searches:</span>
              {suggestedSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  className={`help-suggested-chip ${selectedChip === term ? "active" : ""}`}
                  onClick={() => handleChipClick(term)}
                >
                  <Icon name="search" size={12} />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            ACTIVE SEARCH RESULTS SECTION (Shown when user searches)
            ========================================================================= */}
        {isSearchActive && (
          <section
            ref={resultsRef}
            id="help-results"
            className="help-search-results-section"
            aria-labelledby="search-results-title"
          >
            <div className="container">
              {/* Results Header */}
              <div className="help-search-results-header">
                <div className="help-search-stats">
                  <span className="help-search-count-badge">
                    <Icon name="search" size={12} /> SEARCH RESULTS
                  </span>
                  <h2 id="search-results-title" className="help-search-results-title">
                    Results for &ldquo;{searchQuery}&rdquo;
                  </h2>
                  <p className="help-search-results-subtitle">
                    Found <strong>{totalResultsCount}</strong> matching guides, topics, and answers
                  </p>
                </div>

                <button
                  type="button"
                  className="help-search-clear-action-btn"
                  onClick={handleClearSearch}
                >
                  <Icon name="x" size={14} /> Clear Search & View All Topics
                </button>
              </div>

              {totalResultsCount > 0 ? (
                <>
                  {/* Category Filter Pills */}
                  <div className="help-search-filter-pills">
                    <button
                      type="button"
                      className={`help-search-filter-pill ${activeFilterTab === "all" ? "active" : ""}`}
                      onClick={() => setActiveFilterTab("all")}
                    >
                      All Results ({totalResultsCount})
                    </button>
                    {matchedArticles.length > 0 && (
                      <button
                        type="button"
                        className={`help-search-filter-pill ${activeFilterTab === "articles" ? "active" : ""}`}
                        onClick={() => setActiveFilterTab("articles")}
                      >
                        Help Articles ({matchedArticles.length})
                      </button>
                    )}
                    {(matchedCategories.length > 0 || matchedGuides.length > 0) && (
                      <button
                        type="button"
                        className={`help-search-filter-pill ${activeFilterTab === "guides" ? "active" : ""}`}
                        onClick={() => setActiveFilterTab("guides")}
                      >
                        Modules & Guides ({matchedCategories.length + matchedGuides.length})
                      </button>
                    )}
                    {matchedFaqs.length > 0 && (
                      <button
                        type="button"
                        className={`help-search-filter-pill ${activeFilterTab === "faqs" ? "active" : ""}`}
                        onClick={() => setActiveFilterTab("faqs")}
                      >
                        FAQs ({matchedFaqs.length})
                      </button>
                    )}
                  </div>

                  {/* Matching Articles Grid */}
                  {(activeFilterTab === "all" || activeFilterTab === "articles") && matchedArticles.length > 0 && (
                    <div>
                      <div className="help-search-cards-grid">
                        {matchedArticles.map((art) => (
                          <Link
                            key={art.slug}
                            to={`/support/article/${art.slug}`}
                            className="help-search-card"
                          >
                            <div>
                              <div className="help-search-card-meta">
                                <span className="help-search-card-badge">
                                  {art.topicSlug.replace("-", " ")}
                                </span>
                                <span className="help-search-card-time">⏱️ {art.readTime}</span>
                              </div>
                              <h3 className="help-search-card-title">{art.title}</h3>
                              <p className="help-search-card-desc">{art.summary}</p>
                            </div>
                            <span className="help-search-card-action">
                              Read Step-by-Step Guide <Icon name="arrow" size={14} />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Modules & Guides */}
                  {(activeFilterTab === "all" || activeFilterTab === "guides") &&
                    (matchedCategories.length > 0 || matchedGuides.length > 0) && (
                      <div style={{ marginBottom: "48px" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#191735", marginBottom: "16px" }}>
                          Matching Modules & Walkthroughs
                        </h3>
                        <div className="help-categories-grid" style={{ marginBottom: "24px" }}>
                          {matchedCategories.map((cat) => (
                            <Link key={cat.id} to={cat.link} className="help-category-card">
                              <div className="help-cat-icon-wrap" aria-hidden="true">
                                <Icon name={cat.icon} size={22} />
                              </div>
                              <h4 className="help-cat-name">{cat.title}</h4>
                              <p className="help-cat-desc">{cat.desc}</p>
                              <span className="help-cat-link-row">
                                Explore Module <Icon name="arrow" size={14} />
                              </span>
                            </Link>
                          ))}
                        </div>

                        {matchedGuides.length > 0 && (
                          <div className="help-guides-grid">
                            {matchedGuides.map((guide) => (
                              <Link key={guide.number} to={guide.link} className="help-guide-card">
                                <span className="help-guide-num">{guide.number}</span>
                                <h4 className="help-guide-title">{guide.title}</h4>
                                <p className="help-guide-desc">{guide.desc}</p>
                                <span className="help-guide-action">
                                  Start Walkthrough <Icon name="arrow" size={14} />
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                  {/* Matching FAQs */}
                  {(activeFilterTab === "all" || activeFilterTab === "faqs") && matchedFaqs.length > 0 && (
                    <div className="help-search-faqs-block">
                      <h3 className="help-search-faqs-title">
                        <Icon name="help-circle" size={22} color="#802B5B" /> Matching Questions & Answers
                      </h3>
                      <div className="faq-list">
                        {matchedFaqs.map((f, i) => (
                          <div
                            className={`faq-item ${openSearchFaq === i ? "open" : ""}`}
                            key={f.q}
                          >
                            <button
                              type="button"
                              onClick={() => toggleSearchFaq(i)}
                              aria-expanded={openSearchFaq === i}
                            >
                              <span>{f.q}</span>
                              <i aria-hidden="true">{openSearchFaq === i ? "−" : "+"}</i>
                            </button>
                            {openSearchFaq === i && <p>{f.a}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Empty Search State */
                <div className="help-search-empty-box">
                  <div className="help-search-empty-icon">
                    <Icon name="search" size={30} />
                  </div>
                  <h3 className="help-search-empty-title">
                    No Direct Results for &ldquo;{searchQuery}&rdquo;
                  </h3>
                  <p className="help-search-empty-desc">
                    We couldn't find exact matches. Try searching with common HRMS terms or explore suggested topics below:
                  </p>
                  <div className="help-search-empty-suggestions">
                    {["Payroll", "Attendance", "Leave", "Salary", "Biometric", "Permissions", "Tax"].map((term) => (
                      <button
                        key={term}
                        type="button"
                        className="help-search-empty-chip"
                        onClick={() => {
                          setSearchQuery(term);
                          setSelectedChip(term);
                          scrollToResults();
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="help-btn-primary"
                    style={{ margin: "0 auto", display: "inline-flex" }}
                    onClick={handleClearSearch}
                  >
                    View All Help Topics & Guides
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =========================================================================
            2. BROWSE BY CATEGORY — Explore Help Topics (Shown when not searching)
            ========================================================================= */}
        {!isSearchActive && (
          <>
            <section className="help-topics-section" id="topics" aria-labelledby="topics-title">
              <div className="container">
                <div className="help-section-header">
                  <span className="help-section-eyebrow">✦ BROWSE BY CATEGORY ✦</span>
                  <h2 id="topics-title" className="help-section-title">
                    Explore Help Topics
                  </h2>
                  <p className="help-section-desc">
                    Explore comprehensive documentation, feature guides, and best practices across all core HRMS modules.
                  </p>
                </div>

                {/* 6 Illustration-Centric Cards Grid (2 rows of 3) matching "WHAT YOU GET" layout */}
                <div className="help-categories-nft-grid">
                  {categories.slice(0, 6).map((cat, index) => (
                    <Link
                      key={cat.id}
                      to={cat.link}
                      className={`help-topic-nft-card ${index === 1 ? "is-featured" : ""}`}
                    >
                      {/* Visual Vector Illustration at top center */}
                      <div className="help-topic-illustration-wrap">
                        <HelpTopicIllustration
                          topic={cat.id}
                          className="help-topic-illustration-svg"
                        />
                      </div>

                      {/* Card Title & Desc */}
                      <h3 className="help-topic-nft-title">{cat.title}</h3>
                      <p className="help-topic-nft-desc">{cat.desc}</p>

                      <span className="help-topic-nft-action">
                        Explore Guides <Icon name="arrow" size={14} />
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Direct button to /guides as requested */}
                <div className="help-view-all-guides-wrap">
                  <Link to="/guides" className="help-view-all-guides-btn">
                    <span>View All Help Guides &amp; Handbooks</span>
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
            </section>

            {/* =========================================================================
                3. POPULAR HELP ARTICLES — Answers to Common HRMS Questions
                ========================================================================= */}
            <section className="help-articles-section" id="popular-articles" aria-labelledby="articles-title">
              <div className="container">
                <div className="help-section-header">
                  <span className="help-section-eyebrow">✦ POPULAR HELP ARTICLES ✦</span>
                  <h2 id="articles-title" className="help-section-title">
                    Answers to Common HRMS Questions
                  </h2>
                  <p className="help-section-desc">
                    Quickly resolve everyday administrative questions with our most frequently referenced support walkthroughs.
                  </p>
                </div>

                <div className="help-articles-list">
                  {popularArticles.map((art) => (
                    <Link
                      key={art.slug}
                      to={`/support/article/${art.slug}`}
                      className="help-article-card"
                    >
                      <div className="help-article-card-main">
                        <div className="help-article-badges">
                          <span className="help-article-topic-badge">{art.topic}</span>
                          <span className="help-article-read-time">⏱️ {art.readTime}</span>
                        </div>
                        <h3 className="help-article-card-title">{art.title}</h3>
                        <p className="help-article-card-summary">{art.summary}</p>
                      </div>
                      <div className="help-article-card-arrow" aria-hidden="true">
                        <Icon name="arrow" size={16} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* =========================================================================
                4. STEP-BY-STEP GUIDES — Learn How to Get Things Done
                   (Matching Reference Layout in Clean Light Theme)
                ========================================================================= */}
            <section className="help-guides-section" id="setup-guides" aria-labelledby="guides-title">
              <div className="container">
                <div className="help-workflow-card-container">
                  <div className="help-workflow-grid">
                    {/* Left Column: Heading, Subtitle & 3D Isometric Illustration */}
                    <div className="help-workflow-left-col">
                      <span className="help-workflow-eyebrow">✦ STEP-BY-STEP GUIDES ✦</span>
                      <h2 id="guides-title" className="help-workflow-title">
                        How It Works: From Setup to Live Operations
                      </h2>
                      <p className="help-workflow-subtitle">
                        Follow our structured 5-step onboarding path designed to configure company policies,
                        integrate biometric attendance, and run zero-defect payroll.
                      </p>

                      <div className="help-workflow-isometric-box">
                        <HelpWorkflowIsometric className="help-workflow-isometric-svg" />
                      </div>
                    </div>

                    {/* Right Column: 5 Numbered Steps matching uploaded layout */}
                    <div className="help-workflow-right-col">
                      <div className="help-workflow-steps-list">
                        {stepGuides.map((guide) => (
                          <Link
                            key={guide.number}
                            to={guide.link}
                            className="help-workflow-step-card"
                          >
                            <div className="help-workflow-step-icon-bubble">
                              <Icon name={guide.icon} size={18} />
                            </div>
                            <div className="help-workflow-step-text">
                              <h3 className="help-workflow-step-title">
                                {guide.number}. {guide.title}
                              </h3>
                              <p className="help-workflow-step-desc">{guide.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================================
                5. FREQUENTLY ASKED QUESTIONS — Quick Answers to Your Questions
                ========================================================================= */}
            <section className="faq-section help-faq-section" id="faqs" aria-labelledby="faq-heading">
              <div className="container faq-grid">
                <div>
                  <div className="section-heading">
                    <span className="eyebrow">✦ QUICK ANSWERS ✦</span>
                    <h2 id="faq-heading">Quick Answers to Your Questions</h2>
                    <p>
                      Clear answers to common questions about getting started, system flexibility, module access, and demo walkthroughs.
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
          </>
        )}
      </div>
    </PageLayout>
  );
}

export default HelpCenter;
