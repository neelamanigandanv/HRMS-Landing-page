import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import {
  getQuestionBySlug,
  glossaryQuestions,
  GlossaryQuestionItem
} from "../data/glossaryData";
import "./GlossaryDetailPage.css";

export function GlossaryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openDemoModal } = useDemoModal();
  const [sidebarEmail, setSidebarEmail] = useState("");

  // Find question item by slug or ID
  const questionItem: GlossaryQuestionItem | undefined = useMemo(() => {
    return getQuestionBySlug(slug || "attendance-management");
  }, [slug]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // 3 Letter Groups for the "More Topics" section below the answer
  const threeLetterGroups = useMemo(() => {
    const currentLetter = questionItem?.letter.toUpperCase() || "A";
    let letters: string[] = [];
    if (currentLetter === "A") {
      letters = ["A", "B", "C"];
    } else if (currentLetter === "B") {
      letters = ["B", "A", "C"];
    } else if (currentLetter === "C") {
      letters = ["C", "A", "B"];
    } else {
      letters = [currentLetter, "A", "B"];
    }

    return letters.map((ltr) => {
      const allMatching = glossaryQuestions.filter(
        (q) => q.letter.toUpperCase() === ltr
      );
      const items = allMatching.slice(0, 4);
      return {
        letter: ltr,
        totalCount: allMatching.length,
        items
      };
    });
  }, [questionItem]);

  const handleSidebarDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openDemoModal({
      title: "Unlock Seamless HR Efficiency",
      subtitle: `See how LattiumHR simplifies ${questionItem?.term || questionItem?.title || "your HR work"}.`
    });
  };

  if (!questionItem) {
    return (
      <PageLayout hideCTA={true}>
        <div className="glossary-simple-detail-page py-24 text-center">
          <div className="glossary-simple-container">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Glossary Term Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find an article matching &ldquo;{slug}&rdquo;. Explore our comprehensive A–Z directory.
            </p>
            <Link
              to="/resources/hrms-glossary"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#7b2958] text-white font-semibold text-sm hover:bg-[#5c1840] transition-all"
            >
              Browse All HRMS Terms &rarr;
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Display term name (e.g. "Payroll Software Defined" or term name)
  const displayTitle = questionItem.term 
    ? (questionItem.term.toLowerCase().endsWith("defined") ? questionItem.term : `${questionItem.term} Defined`)
    : questionItem.title;

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "HR Glossary", to: "/resources/hrms-glossary" },
    { label: questionItem.term || questionItem.title }
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA={true}>
      <SEO
        title={`${displayTitle} | HR Glossary | LattiumHR`}
        description={questionItem.what}
        canonicalPath={`/resources/glossary/${questionItem.slug}`}
      />

      <div className="glossary-simple-detail-page">
        {/* =====================================================================
            1. TWO-COLUMN ARTICLE SECTION
            Right sidebar card is positioned ABOVE, aligned with the title & content
            ===================================================================== */}
        <section className="glossary-article-section-wrap">
          <div className="glossary-simple-container">
            {/* Top Breadcrumb: HR GLOSSARY > TERM DEFINED */}
            <div className="glossary-simple-breadcrumb">
              <Link to="/resources/hrms-glossary" className="glossary-bc-root">
                HR GLOSSARY
              </Link>
              <span className="glossary-bc-separator">&gt;</span>
              <span className="glossary-bc-current">
                {displayTitle.toUpperCase()}
              </span>
              <span className="glossary-breadcrumb-star-wrap" aria-label="Featured HR Term">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  className="glossary-breadcrumb-sparkles"
                  aria-hidden="true"
                >
                  {/* Top main 4-pointed star (outline diamond cutout as in image) */}
                  <path
                    d="M16 1.5 C16 5 18 7 21.5 7 C18 7 16 9 16 12.5 C16 9 14 7 10.5 7 C14 7 16 5 16 1.5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  {/* Bottom-left solid 4-pointed star */}
                  <path
                    d="M6 12.5 C6 15 7.5 16.5 10 16.5 C7.5 16.5 6 18 6 20.5 C6 18 4.5 16.5 2 16.5 C4.5 16.5 6 15 6 12.5Z"
                    fill="currentColor"
                  />
                  {/* Bottom-right solid 4-pointed star */}
                  <path
                    d="M20 14.5 C20 16.3 21.2 17.5 23 17.5 C21.2 17.5 20 18.7 20 20.5 C20 18.7 18.8 17.5 17 17.5 C18.8 17.5 20 16.3 20 14.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>

            {/* Main Headline Placed Full Width to Keep Strictly on ONE Line */}
            <div className="glossary-title-container">
              <h1 className="glossary-simple-title" title={displayTitle}>
                {displayTitle}
              </h1>
            </div>

            <div className="glossary-simple-grid">
              {/* Left Column: Editorial Paragraphs */}
              <div className="glossary-simple-content">
                <p className="glossary-p-lead">{questionItem.what}</p>

                {questionItem.why && (
                  <p className="glossary-p-body">{questionItem.why}</p>
                )}

                {questionItem.conclusion && (
                  <p className="glossary-p-body">{questionItem.conclusion}</p>
                )}
              </div>

              {/* Right Column: CTA Card matching the height of the editorial answer */}
              <aside className="glossary-simple-sidebar">
                <div className="glossary-primary-cta-card">
                  <div className="glossary-sidebar-card-top">
                    <div className="glossary-sidebar-badge">
                      <Icon name="sparkle" size={11} />
                      <span>FREE DEMO</span>
                    </div>

                    <h2 className="glossary-primary-cta-title">
                      Unlock Seamless HR Efficiency
                    </h2>
                    
                    <p className="glossary-primary-cta-desc">
                      See how LattiumHR unifies attendance, payroll automation, biometric sync, and statutory compliance in one modern platform.
                    </p>

                    <form onSubmit={handleSidebarDemoSubmit} className="glossary-primary-cta-form">
                      <div className="glossary-sidebar-input-wrap">
                        <Icon name="mail" size={15} className="glossary-sidebar-input-icon" />
                        <input
                          type="email"
                          placeholder="Your work email"
                          required
                          value={sidebarEmail}
                          onChange={(e) => setSidebarEmail(e.target.value)}
                          className="glossary-primary-cta-input"
                        />
                      </div>
                      <button type="submit" className="glossary-primary-cta-btn">
                        <span>Get a Free Demo</span>
                        <Icon name="arrow" size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              </aside>
            </div>

            {/* =====================================================================
                FULL WIDTH KEY FEATURES & OPERATIONAL STANDARDS CARD (Border Removed for Points)
                ===================================================================== */}
            {questionItem.keyPoints && questionItem.keyPoints.length > 0 && (
              <div className="glossary-fullwidth-features-card">
                <div className="glossary-features-card-header">
                  <span className="glossary-features-badge">
                    <Icon name="sparkle" size={13} /> OPERATIONAL STANDARDS
                  </span>
                  <h3 className="glossary-features-card-title">
                    Key Rules &amp; Operational Standards
                  </h3>
                  <p className="glossary-features-card-sub">
                    Essential compliance principles, calculations, and benchmarks for {questionItem.term || questionItem.title}.
                  </p>
                </div>

                <div className="glossary-features-grid">
                  {questionItem.keyPoints.map((point, idx) => (
                    <div key={idx} className="glossary-feature-point-item">
                      <div className="glossary-feature-point-icon">
                        <Icon name="check" size={12} />
                      </div>
                      <span className="glossary-feature-point-text">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================================
            2. BELOW THE ANSWER: THREE-CARD TOPICS SECTION ("A" TOPICS, "B" TOPICS, ETC.)
            Proper padding, clean gap, refined icons, and aligned badges
            ===================================================================== */}
        <section className="glossary-three-topics-section">
          <div className="glossary-simple-container">
            <div className="glossary-three-topics-header">
              <span className="glossary-three-topics-eyebrow">
                <Icon name="sparkle" size={11} /> A–Z KNOWLEDGE CENTER
              </span>
              <h2 className="glossary-three-topics-title">Explore More HR Topics</h2>
              <p className="glossary-three-topics-desc">
                Browse essential terms, operational definitions, and statutory guides by alphabet.
              </p>
            </div>

            <div className="glossary-three-topics-grid">
              {threeLetterGroups.map(({ letter, totalCount, items }) => (
                <div key={letter} className="glossary-topic-card">
                  <div className="glossary-topic-card-header">
                    <div className="glossary-topic-header-left">
                      <div className="glossary-topic-letter-avatar">
                        <span>{letter}</span>
                      </div>
                      <h3 className="glossary-topic-card-title">Terms Starting with &ldquo;{letter}&rdquo;</h3>
                    </div>
                    <span className="glossary-topic-count-pill">{totalCount} Terms</span>
                  </div>

                  <div className="glossary-topic-card-list">
                    {items.map((termItem) => {
                      const isCurrent = termItem.id === questionItem.id;
                      return (
                        <Link
                          key={termItem.id}
                          to={`/resources/glossary/${termItem.slug}`}
                          className={`glossary-topic-card-link ${isCurrent ? "is-current" : ""}`}
                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                          title={termItem.term || termItem.title}
                        >
                          <div className="glossary-topic-link-left">
                            <span className="glossary-topic-link-icon">
                              <Icon name="document" size={12} />
                            </span>
                            <span className="glossary-topic-link-text">
                              {termItem.term || termItem.title}
                            </span>
                          </div>
                          <Icon name="arrow" size={11} className="glossary-topic-link-arrow" />
                        </Link>
                      );
                    })}
                  </div>

                  <div className="glossary-topic-card-footer">
                    <Link
                      to={`/resources/hrms-glossary?letter=${letter}`}
                      className="glossary-topic-explore-btn"
                    >
                      <span>Browse All &ldquo;{letter}&rdquo; Terms</span>
                      <Icon name="arrow" size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default GlossaryDetailPage;
