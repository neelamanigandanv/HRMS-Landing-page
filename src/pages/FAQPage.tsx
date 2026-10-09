import { useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { faqList, FAQItem } from "../data/resourcesData";

export function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "0": true });

  const categories = [
    "All",
    "Implementation & Setup",
    "Multi-Branch & Locations",
    "Payroll & Statutory Compliance",
    "Mobile & Employee Access",
    "Security & Data Protection",
  ];

  const filteredFaqs = useMemo(() => {
    return faqList.filter((item: FAQItem) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "FAQs" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="Frequently Asked Questions (FAQs) | LattiumHR"
        description="Get clear answers to common questions about setup timelines, multi-branch attendance, statutory payroll, mobile app access, and data security."
        canonicalPath="/resources/faqs"
      />

      <section className="faq-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="help-circle" size={14} /> QUESTIONS & ANSWERS
            </span>
            <h1>Frequently Asked Questions</h1>
            <p>
              Everything you need to know about implementing, configuring, and scaling with LattiumHR.
            </p>

            {/* Search Input */}
            <div className="blog-search-bar">
              <Icon name="search" size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search questions: implementation, statutory, branches, mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search FAQs"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                >
                  <Icon name="x" size={14} />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="category-filter-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="faq-content-section">
        <div className="container" style={{ maxWidth: "860px" }}>
          {filteredFaqs.length === 0 ? (
            <div className="no-results-box">
              <Icon name="search" size={32} />
              <p>No questions found matching your search. Please reach out to our team directly.</p>
            </div>
          ) : (
            <div className="faq-accordion-group">
              {filteredFaqs.map((faq, idx) => {
                const itemId = String(idx);
                const isOpen = Boolean(openItems[itemId]);

                return (
                  <div key={idx} className={`faq-card-item ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleItem(itemId)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-text">{faq.question}</span>
                      <span className="faq-toggle-icon">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-pane">
                        <p>{faq.answer}</p>
                        <span className="faq-item-cat-tag">{faq.category}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Have More Questions Box */}
          <div className="more-questions-box">
            <div>
              <h3>Still have questions?</h3>
              <p>Our product specialists are ready to discuss your specific workflow requirements.</p>
            </div>
            <Button to="/contact">
              Talk to Our Team <Icon name="arrow" size={16} />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default FAQPage;
