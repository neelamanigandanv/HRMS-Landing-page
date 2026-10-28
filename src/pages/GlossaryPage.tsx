import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import {
  glossaryQuestions,
  glossaryAlphabet,
  GlossaryQuestionItem
} from "../data/glossaryData";
import "./GlossaryPage.css";

export function GlossaryPage() {
  const { openDemoModal } = useDemoModal();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-driven letter & search state
  const initialLetter = searchParams.get("letter") || "All";
  const initialQuery = searchParams.get("q") || "";

  const [selectedLetter, setSelectedLetter] = useState<string>(initialLetter);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input on "/" keypress (matching FAQ page)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync state to URL without reloading
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedLetter && selectedLetter !== "All") params.letter = selectedLetter;
    if (searchQuery.trim()) params.q = searchQuery.trim();
    setSearchParams(params, { replace: true });
  }, [selectedLetter, searchQuery, setSearchParams]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    let list = glossaryQuestions;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.shortName.toLowerCase().includes(q) ||
          item.what.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Letter filter
    if (selectedLetter !== "All") {
      list = list.filter((item) => item.letter.toUpperCase() === selectedLetter.toUpperCase());
    }

    return list;
  }, [searchQuery, selectedLetter]);

  // Group questions by letter for the directory view
  const groupedQuestions = useMemo(() => {
    const map = new Map<string, GlossaryQuestionItem[]>();

    const lettersOrder = glossaryAlphabet.filter((l) => l !== "All");

    lettersOrder.forEach((letter) => {
      const questionsForLetter = filteredQuestions.filter(
        (q) => q.letter.toUpperCase() === letter.toUpperCase()
      );
      if (questionsForLetter.length > 0) {
        map.set(letter, questionsForLetter);
      } else if (selectedLetter === letter) {
        // Explicitly selected letter with 0 questions (e.g. Z)
        map.set(letter, []);
      }
    });

    return Array.from(map.entries());
  }, [filteredQuestions, selectedLetter]);

  // Distribute grouped letters across 3 columns on desktop (like the reference layout)
  const columns = useMemo(() => {
    if (groupedQuestions.length === 0) return [[], [], []];

    // If a single letter is selected
    if (selectedLetter !== "All" && groupedQuestions.length === 1) {
      return [groupedQuestions, [], []];
    }

    // Balance items across 3 columns
    const col1: [string, GlossaryQuestionItem[]][] = [];
    const col2: [string, GlossaryQuestionItem[]][] = [];
    const col3: [string, GlossaryQuestionItem[]][] = [];

    const totalGroups = groupedQuestions.length;
    const split1 = Math.ceil(totalGroups / 3);
    const split2 = Math.ceil((totalGroups * 2) / 3);

    groupedQuestions.forEach((group, index) => {
      if (index < split1) {
        col1.push(group);
      } else if (index < split2) {
        col2.push(group);
      } else {
        col3.push(group);
      }
    });

    return [col1, col2, col3];
  }, [groupedQuestions, selectedLetter]);

  const handleSelectLetter = (letter: string) => {
    setSelectedLetter(letter);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedLetter("All");
  };

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "HRMS Glossary" }
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="HRMS & Payroll Glossary | Complete A–Z Knowledge Center | LattiumHR"
        description="Explore 150+ essential questions and answers across HR, employee lifecycle, biometric attendance, payroll automation, statutory compliance, and workforce analytics."
        canonicalPath="/resources/hrms-glossary"
      />

      <div className="glossary-hub-page">
        {/* ==========================================================================
            1. HERO SECTION (Perfect alignment, centered, generous spacing)
            ========================================================================== */}
        <section className="glossary-hero-section">
          <div className="glossary-container">
            <div className="glossary-hero-content">
              <div className="glossary-eyebrow">
                <span className="glossary-eyebrow-dot" />
                <span>LATTIUMHR KNOWLEDGE CENTER</span>
              </div>
              <h1 className="glossary-hero-title">
                HR &amp; Payroll Terms, <span className="glossary-hero-title-accent">Made Simple.</span>
              </h1>
              <p className="glossary-hero-desc">
                Understand the essential terms behind employee management, payroll,
                attendance, and modern workforce operations.
              </p>

              {/* Elevated Search Box (Exact FAQ Page Design) */}
              <div className="faq-search-box-wrap glossary-search-box-wrap">
                <div className="faq-search-box">
                  <Icon name="search" size={20} className="faq-search-icon" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="faq-search-input"
                    placeholder="Search HR terms, payroll, attendance, compliance..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search HRMS glossary terms"
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

              {/* Hero Action Buttons */}
              <div className="glossary-hero-actions">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("glossary-directory")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="glossary-hero-btn glossary-hero-btn--secondary"
                >
                  Explore Glossary <Icon name="arrow" size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => openDemoModal()}
                  className="glossary-hero-btn glossary-hero-btn--primary"
                >
                  Book a Demo
                </button>
              </div>

              {/* Trust & Metric Points Below Buttons */}
              <div className="glossary-hero-points">
                <span className="glossary-hero-point-item">
                  <Icon name="check" size={13} className="glossary-point-check" />
                  <span><strong>182+</strong> Questions &amp; HR Terms</span>
                </span>
                <span className="glossary-hero-point-item">
                  <Icon name="check" size={13} className="glossary-point-check" />
                  <span><strong>26</strong> A–Z Alphabetical Indices</span>
                </span>
                <span className="glossary-hero-point-item">
                  <Icon name="check" size={13} className="glossary-point-check" />
                  <span><strong>100%</strong> Free Knowledge Base</span>
                </span>
              </div>

              {searchQuery.trim() && (
                <div className="glossary-search-meta">
                  <span className="glossary-meta-badge">
                    Found <strong>{filteredQuestions.length}</strong> term{filteredQuestions.length !== 1 ? "s" : ""} matching &ldquo;{searchQuery}&rdquo;
                    <button
                      type="button"
                      className="glossary-meta-clear-link"
                      onClick={() => setSearchQuery("")}
                    >
                      Reset search
                    </button>
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            2. HORIZONTAL A-Z ALPHABET STRIP (One single row on desktop, circular pills)
            (NO category filter tab underneath per user request)
            ========================================================================== */}
        <div className="glossary-alphabet-bar-wrapper" id="glossary-directory">
          <div className="glossary-container">
            <div className="glossary-alphabet-scroll-container" ref={scrollContainerRef}>
              <div className="glossary-alphabet-strip">
                {glossaryAlphabet.map((letter) => {
                  const isActive = selectedLetter === letter;
                  return (
                    <button
                      key={letter}
                      type="button"
                      className={`glossary-letter-pill ${isActive ? "active" : ""} ${letter === "All" ? "all-pill" : ""}`}
                      onClick={() => handleSelectLetter(letter)}
                      aria-label={`Filter by letter ${letter}`}
                      aria-pressed={isActive}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================================
            3. EDITORIAL QUESTION DIRECTORY (3 columns matching user's layout)
            ========================================================================== */}
        <section className="glossary-directory-section">
          <div className="glossary-container">
            {groupedQuestions.length === 0 ? (
              <div className="glossary-empty-state">
                <div className="glossary-empty-icon">
                  <Icon name="search" size={24} />
                </div>
                <h2 className="glossary-empty-title">No matching questions found</h2>
                <p className="glossary-empty-desc">
                  We couldn&apos;t find any questions matching &ldquo;{searchQuery || selectedLetter}&rdquo;. Try searching for core topics like Payroll, Attendance, CTC, or Geofencing.
                </p>
                <button
                  type="button"
                  className="glossary-reset-btn"
                  onClick={handleClearFilters}
                >
                  <Icon name="x" size={14} /> Reset Directory Filters
                </button>
              </div>
            ) : selectedLetter !== "All" && groupedQuestions.length === 1 && groupedQuestions[0][1].length === 0 ? (
              <div className="glossary-empty-state">
                <div className="glossary-empty-icon">
                  <Icon name="document" size={24} />
                </div>
                <h2 className="glossary-empty-title">Letter &ldquo;{selectedLetter}&rdquo; Knowledge Base</h2>
                <p className="glossary-empty-desc">
                  No published terms currently under {selectedLetter}. Explore related HRMS &amp; Payroll topics above.
                </p>
                <button
                  type="button"
                  className="glossary-reset-btn"
                  onClick={() => setSelectedLetter("All")}
                >
                  Browse All Letters
                </button>
              </div>
            ) : (
              <div className="glossary-directory-grid">
                {columns.map((columnGroups, colIndex) => (
                  <div key={colIndex} className="glossary-directory-column">
                    {columnGroups.map(([letter, questions]) => (
                      <div
                        key={letter}
                        className={`glossary-letter-group ${selectedLetter === letter ? "is-highlighted" : ""}`}
                        id={`letter-section-${letter}`}
                      >
                        <div className="glossary-letter-header">
                          <span className="glossary-letter-char">{letter}</span>
                          <div className="glossary-letter-divider" />
                        </div>
                        <div className="glossary-questions-list">
                          {questions.map((item) => (
                            <Link
                              key={item.id}
                              to={`/resources/glossary/${item.slug}`}
                              className="glossary-question-item-link"
                            >
                              <span className="glossary-question-title">{item.term || item.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default GlossaryPage;
