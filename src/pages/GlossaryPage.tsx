import { useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Icon from "../components/ui/Icon";
import { glossaryTerms, GlossaryTerm } from "../data/resourcesData";

export function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Payroll & Tax",
    "Attendance & Leave",
    "HR Ops & Compliance",
    "Recruitment & Performance",
  ];

  // Alphabet list
  const alphabet = ["All", ...Array.from(new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()))).sort()];

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((item: GlossaryTerm) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLetter =
        selectedLetter === "All" || item.term[0].toUpperCase() === selectedLetter;
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesLetter && matchesCategory;
    });
  }, [searchTerm, selectedLetter, selectedCategory]);

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "HRMS Glossary" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="HRMS & Payroll Glossary | 50+ Key Terms Defined"
        description="Comprehensive dictionary of HR, Indian statutory payroll, attendance, and compliance terms explained with practical examples."
        canonicalPath="/resources/hrms-glossary"
      />

      <section className="glossary-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="search" size={14} /> HRMS DICTIONARY
            </span>
            <h1>The Essential HRMS & Payroll Glossary</h1>
            <p>
              Clear, practical definitions of labor laws, statutory tax brackets, attendance
              terminology, and modern workforce management frameworks.
            </p>

            {/* Search Input */}
            <div className="blog-search-bar">
              <Icon name="search" size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search terms: Provident Fund, Geofencing, Form 16, LOP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search glossary terms"
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

            {/* Alphabet Filter */}
            <div className="alphabet-bar">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  className={`letter-btn ${selectedLetter === letter ? "active" : ""}`}
                  onClick={() => setSelectedLetter(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Glossary List */}
      <section className="glossary-list-section">
        <div className="container">
          {filteredTerms.length === 0 ? (
            <div className="no-results-box">
              <Icon name="search" size={32} />
              <p>No terms found matching your filter criteria. Try clearing the search or letter filter.</p>
            </div>
          ) : (
            <div className="glossary-grid">
              {filteredTerms.map((item) => (
                <div key={item.term} className="glossary-card">
                  <div className="glossary-card-top">
                    <h3>{item.term}</h3>
                    <span className="glossary-cat-badge">{item.category}</span>
                  </div>
                  <p className="glossary-def">{item.definition}</p>
                  <div className="glossary-example-box">
                    <strong>Practical Example:</strong>
                    <p>{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default GlossaryPage;
