import { useState, useMemo, useEffect, useRef, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import { faqCategories, FAQItem } from "../data/faqData";
import "./FAQPage.css";

// Helper function to safely highlight search matches
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query || !query.trim()) {
    return <>{text}</>;
  }

  const trimmedQuery = query.trim();
  const escaped = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === trimmedQuery.toLowerCase() ? (
          <mark key={i} className="faq-search-mark">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

// 3 High-Impact, Useful Resource Cards for Explore Further
const helpfulResources = [
  {
    tag: "ONBOARDING ROADMAP",
    title: "Getting Started & Launch Guide",
    desc: "Step-by-step 4-stage implementation playbook for employee data migration, biometric sync, and 14-day go-live.",
    action: "View Setup Roadmap",
    href: "/help/getting-started",
    icon: "setup",
  },
  {
    tag: "DOCUMENTATION",
    title: "Help Center & Knowledge Base",
    desc: "Searchable administrator docs, biometric gate troubleshooting, shift rostering guides, and video tutorials.",
    action: "Explore Help Center",
    href: "/help",
    icon: "help-circle",
  },
  {
    tag: "STATUTORY COMPLIANCE",
    title: "Payroll & Labor Law Guides",
    desc: "In-depth calculation breakdowns for Indian PF, ESI, TDS Form 16, and labor act updates.",
    action: "Read Compliance Guides",
    href: "/blog",
    icon: "file-text",
  },
];

export function FAQPage() {
  const { openDemoModal } = useDemoModal();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "what-is-lattiumhr": true,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const isUserScrollingRef = useRef(false);

  // Keyboard shortcut: '/' focuses the search box
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement !== searchInputRef.current &&
        !["INPUT", "TEXTAREA"].includes((document.activeElement as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle Hash deep-linking on mount or hash change
  useEffect(() => {
    const rawHash = location.hash.replace("#", "").trim();
    if (!rawHash) return;

    // Check if hash matches a question id
    const matchedItem = faqCategories
      .flatMap((c) => c.items)
      .find((item) => item.id.toLowerCase() === rawHash.toLowerCase());

    if (matchedItem) {
      setOpenItems((prev) => ({ ...prev, [matchedItem.id]: true }));
      setTimeout(() => {
        const el = document.getElementById(matchedItem.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
      return;
    }

    // Check if hash matches a category id
    const matchedCat = faqCategories.find(
      (c) => c.id.toLowerCase() === rawHash.toLowerCase() || `cat-${c.id.toLowerCase()}` === rawHash.toLowerCase()
    );

    if (matchedCat) {
      setActiveCategory(matchedCat.id);
      setTimeout(() => {
        const el = document.getElementById(`cat-${matchedCat.id}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, [location.hash]);

  // ScrollSpy to update active category in left sidebar when scrolling
  useEffect(() => {
    if (searchQuery.trim()) return;

    const handleScroll = () => {
      if (isUserScrollingRef.current) return;

      const categoryElements = faqCategories.map((cat) => ({
        id: cat.id,
        el: document.getElementById(`cat-${cat.id}`),
      }));

      const scrollPosition = window.scrollY + 180;

      for (let i = categoryElements.length - 1; i >= 0; i--) {
        const item = categoryElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveCategory(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchQuery]);

  // Filter questions based on search query
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return faqCategories;
    }

    return faqCategories
      .map((cat) => {
        const matchingItems = cat.items.filter((item) => {
          const matchQ = item.question.toLowerCase().includes(q);
          const matchA = item.answer.toLowerCase().includes(q);
          const matchBullets = item.bullets?.some((b) => b.toLowerCase().includes(q));
          return matchQ || matchA || matchBullets;
        });

        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const totalMatchingQuestions = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  // Toggle single question accordion
  const toggleQuestion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Scroll to category smoothly
  const scrollToCategory = (catId: string) => {
    isUserScrollingRef.current = true;
    setActiveCategory(catId);
    setSearchQuery("");

    const targetEl = document.getElementById(`cat-${catId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 800);
  };

  // Copy direct anchor link
  const copyQuestionLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    });
  };

  const breadcrumbs = [{ label: "FAQ" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Frequently Asked Questions (FAQ) | LattiumHR"
        description="Find verified answers to common questions about LattiumHR pricing, statutory payroll compliance (PF, ESI, TDS), biometric attendance, setup timelines, and data security."
        canonicalPath="/faq"
      />

      <div className="faq-page-wrapper">
        {/* =================================================================
            1. HERO SECTION (PROPER TWO-TONE ACCENT & BALANCED POSITIONING)
            ================================================================= */}
        <section className="faq-hero-section">
          <div className="container faq-hero-container">
            <span className="faq-eyebrow">
              <Icon name="sparkle" size={13} /> FREQUENTLY ASKED QUESTIONS
            </span>
            <h1 className="faq-hero-title">
              Frequently Asked <span className="faq-hero-title-accent">Questions</span>
            </h1>
            <p className="faq-hero-subtitle">
              Instant, verified answers on attendance, statutory payroll compliance, multi-branch scaling, and data security.
            </p>

            {/* Elevated Search Box */}
            <div className="faq-search-box-wrap">
              <div className="faq-search-box">
                <Icon name="search" size={20} className="faq-search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="faq-search-input"
                  placeholder="Search questions by keyword: PF, biometric, payroll, shifts, pricing..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search frequently asked questions"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    className="faq-search-clear-btn"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search query"
                  >
                    <Icon name="x" size={14} />
                  </button>
                ) : (
                  <span className="faq-search-shortcut-hint">
                    Press <kbd>/</kbd> to search
                  </span>
                )}
              </div>
            </div>

            {/* Hero Quick Action Buttons */}
            <div className="faq-hero-actions">
              <Button onClick={() => openDemoModal()} className="faq-hero-btn faq-hero-btn--primary">
                Book a Live Demo <Icon name="arrow" size={14} />
              </Button>
              <Button to="/contact" secondary className="faq-hero-btn faq-hero-btn--secondary">
                Talk to Sales Support
              </Button>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. MAIN 2-COLUMN SECTION (STICKY CATEGORY LIST + LINE-ONLY ACCORDION)
            ================================================================= */}
        <section className="faq-main-section">
          <div className="container">
            {/* Mobile Category Chips (Horizontally Scrollable) */}
            <div className="faq-mobile-chips-bar" role="tablist" aria-label="FAQ Categories">
              {faqCategories.map((cat) => {
                const isActive = activeCategory === cat.id && !searchQuery.trim();
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`faq-mobile-chip ${isActive ? "is-active" : ""}`}
                    onClick={() => scrollToCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            <div className="faq-layout-grid">
              {/* --- Left Column: Sticky Category Navigation --- */}
              <aside className="faq-sidebar-sticky" aria-label="FAQ Category Navigation">
                <div className="faq-sidebar-card">
                  <div className="faq-sidebar-header">
                    <Icon name="sparkle" size={13} />
                    <span>BROWSE BY TOPIC</span>
                  </div>
                  <ul className="faq-category-nav-list">
                    {faqCategories.map((cat) => {
                      const isActive = activeCategory === cat.id && !searchQuery.trim();
                      return (
                        <li key={cat.id}>
                          <button
                            type="button"
                            className={`faq-category-nav-btn ${isActive ? "is-active" : ""}`}
                            onClick={() => scrollToCategory(cat.id)}
                          >
                            <div className="faq-category-nav-left">
                              <span className="faq-category-nav-icon">
                                <Icon name={cat.icon as IconName} size={16} />
                              </span>
                              <span className="faq-category-nav-name">{cat.name}</span>
                            </div>
                            <span className="faq-category-nav-arrow" aria-hidden="true">
                              <Icon name="arrow" size={13} />
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Under BROWSE BY TOPIC: Help Card matching user's image */}
                <div className="faq-sidebar-help-card">
                  <h3 className="faq-sidebar-help-title">Need help choosing?</h3>
                  <p className="faq-sidebar-help-desc">
                    Talk to a specialist about your payroll and attendance setup.
                  </p>
                  <div className="faq-sidebar-help-actions">
                    <Link to="/request-demo" className="faq-sidebar-help-btn-primary">
                      Talk to Sales
                    </Link>
                    <Link to="/contact" className="faq-sidebar-help-btn-secondary">
                      Chat with Support
                    </Link>
                  </div>
                </div>
              </aside>

              {/* --- Right Column: Question Groups or Search Results --- */}
              <div className="faq-main-content">
                {/* Active Search Results Banner */}
                {searchQuery.trim() && (
                  <div className="faq-search-results-banner">
                    <span className="faq-search-results-text">
                      Showing <strong>{totalMatchingQuestions}</strong> {totalMatchingQuestions === 1 ? "question" : "questions"} matching &ldquo;{searchQuery}&rdquo;
                    </span>
                    <button
                      type="button"
                      className="faq-search-results-clear"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear search
                    </button>
                  </div>
                )}

                {/* Empty State when no results found */}
                {filteredCategories.length === 0 ? (
                  <div className="faq-no-results">
                    <div className="faq-no-results-icon">
                      <Icon name="search" size={26} />
                    </div>
                    <h3>No questions found for &ldquo;{searchQuery}&rdquo;</h3>
                    <p>
                      Can&rsquo;t find what you&rsquo;re looking for? Our HR specialists and support engineers are ready to answer your questions directly.
                    </p>
                    <div className="faq-no-results-actions">
                      <Link to="/contact" className="faq-empty-btn faq-empty-btn--primary">
                        Talk to Our Sales Team <Icon name="arrow" size={14} />
                      </Link>
                      <button
                        type="button"
                        className="faq-empty-btn faq-empty-btn--secondary"
                        onClick={() => setSearchQuery("")}
                      >
                        View All Questions
                      </button>
                    </div>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      id={`cat-${category.id}`}
                      className="faq-category-group"
                    >
                      {/* Category Section Header with Right-Side Widget */}
                      <div className="faq-category-header">
                        <div className="faq-category-header-main">
                          <div className="faq-category-eyebrow-row">
                            <span className="faq-category-eyebrow">
                              {category.eyebrow || "TOPIC GUIDE"}
                              <Icon name="sparkle" size={13} className="faq-eyebrow-star-icon" />
                            </span>
                          </div>
                          <h2 className="faq-category-title">{category.name}</h2>
                          <p className="faq-category-desc">{category.desc}</p>
                        </div>

                        {/* Right-Side Button without border or background */}
                        <Link to="/contact" className="faq-category-header-btn">
                          Ask a Question <Icon name="arrow" size={13} />
                        </Link>
                      </div>

                      {/* Line-Only Accordion List for this Category */}
                      <div className="faq-accordion-stack">
                        {category.items.map((item: FAQItem) => {
                          const isOpen = Boolean(openItems[item.id]);
                          const isCopied = copiedId === item.id;

                          return (
                            <div
                              key={item.id}
                              id={item.id}
                              className={`faq-accordion-card ${isOpen ? "is-open" : ""}`}
                            >
                              <button
                                type="button"
                                className="faq-question-btn"
                                onClick={() => toggleQuestion(item.id)}
                                aria-expanded={isOpen}
                                aria-controls={`answer-${item.id}`}
                              >
                                <span className="faq-question-text">
                                  <HighlightedText text={item.question} query={searchQuery} />
                                </span>

                                <div className="faq-question-actions">
                                  {/* Accordion Toggle Indicator */}
                                  <span className="faq-toggle-pill" aria-hidden="true">
                                    {isOpen ? "−" : "+"}
                                  </span>
                                </div>
                              </button>

                              {/* Answer Pane (Clean: Feedback row removed) */}
                              {isOpen && (
                                <div id={`answer-${item.id}`} className="faq-answer-pane">
                                  <p className="faq-answer-text">
                                    <HighlightedText text={item.answer} query={searchQuery} />
                                  </p>

                                  {/* Optional Bullets */}
                                  {item.bullets && item.bullets.length > 0 && (
                                    <ul className="faq-bullets-list">
                                      {item.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} className="faq-bullet-item">
                                          <span className="faq-bullet-check">✓</span>
                                          <span>
                                            <HighlightedText text={bullet} query={searchQuery} />
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                  {/* Optional Learn More Link */}
                                  {item.learnMore && (
                                    <div>
                                      <Link to={item.learnMore.href} className="faq-learn-more-link">
                                        {item.learnMore.label} <Icon name="arrow" size={13} />
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. HELPFUL RESOURCES SECTION (3 HIGH-IMPACT CARDS WITH HOVER EFFECT)
            ================================================================= */}
        <section className="faq-helpful-links-section">
          <div className="container">
            <div className="faq-helpful-header">
              <span className="faq-helpful-eyebrow">EXPLORE FURTHER</span>
              <h2 className="faq-helpful-title">Related Resources &amp; Guides</h2>
              <p className="faq-helpful-subtitle">
                Explore in-depth solution blueprints, statutory payroll guides, and system documentation.
              </p>
            </div>

            <div className="faq-helpful-cards-grid">
              {helpfulResources.map((res) => (
                <Link key={res.title} to={res.href} className="faq-helpful-card">
                  <div className="faq-helpful-card-top">
                    <div className="faq-helpful-card-icon">
                      <Icon name={res.icon as IconName} size={22} />
                    </div>
                    <span className="faq-helpful-card-tag">{res.tag}</span>
                  </div>
                  <h3 className="faq-helpful-card-title">{res.title}</h3>
                  <p className="faq-helpful-card-desc">{res.desc}</p>
                  <span className="faq-helpful-card-action">
                    {res.action} <Icon name="arrow" size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default FAQPage;
