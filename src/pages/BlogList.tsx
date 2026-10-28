import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import { blogArticles, BlogPostData } from "../data/blogData";
import "./Blog.css";

const CATEGORIES = ["Attendance", "Payroll", "HR Software", "Engagement", "Performance"] as const;

export function BlogList() {
  const { openDemoModal } = useDemoModal();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Filtered Articles based on category selection
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article: BlogPostData) => {
      return selectedCategory === "All" || article.category === selectedCategory;
    });
  }, [selectedCategory]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(6); // reset pagination on filter change
  };

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Resources", to: "/resources" },
    { label: "Blog" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} onOpenDemo={() => openDemoModal()}>
      <SEO
        title="Blog & Playbooks — HRMS, Attendance & Statutory Payroll Guides | LattiumHR"
        description="Actionable guides, statutory compliance playbooks, and workforce management best practices for growing multi-branch teams."
        canonicalPath="/blog"
      />

      <div className="blog-page">
        {/* 1. HERO SECTION (Elevated Brand Aesthetic) */}
        <section className="blog-hero-section">
          <div className="blog-hero-ambient" />
          <div className="container">
            <div className="blog-hero-centered">
              <span className="blog-eyebrow-chip">
                <Icon name="sparkle" size={13} />
                HR &amp; WORKFORCE PLAYBOOKS
              </span>
              <h1 className="blog-main-title">
                Practical HR Guides for <br className="blog-title-br" />
                <span className="blog-title-accent">Growing Organizations</span>
              </h1>
              <p className="blog-main-subtitle">
                Actionable playbooks, statutory compliance breakdowns, and operational best practices to help you build and scale a high-trust workplace.
              </p>

              {/* 2. CATEGORY PILLS FILTER BAR (Centered, Clean, No Dropdown / Search) */}
              <div className="blog-filter-bar">
                <div className="blog-category-pills" role="tablist" aria-label="Filter by category">
                  <button
                    type="button"
                    className={`blog-cat-btn ${selectedCategory === "All" ? "is-active" : ""}`}
                    onClick={() => handleCategorySelect("All")}
                  >
                    All Articles
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`blog-cat-btn ${selectedCategory === cat ? "is-active" : ""}`}
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BLOG CARDS GRID SECTION */}
        <section className="blog-grid-section">
          <div className="container">
            {filteredArticles.length === 0 ? (
              <div className="blog-empty-state">
                <Icon name="book-open" size={40} className="blog-empty-icon" />
                <h3>No articles found in this category</h3>
                <p>Check back soon or explore articles across other HR topics.</p>
                <button
                  type="button"
                  className="blog-cat-btn is-active"
                  style={{ marginTop: "16px" }}
                  onClick={() => setSelectedCategory("All")}
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <>
                <div className="blog-cards-grid">
                  {displayedArticles.map((article: BlogPostData) => (
                    <Link
                      key={article.slug}
                      to={`/blog/${article.slug}`}
                      className="blog-card"
                      aria-label={`Read article: ${article.title}`}
                    >
                      {/* Cover Image on top */}
                      <div className="blog-card-img-wrap">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="blog-card-img"
                          loading="lazy"
                        />
                      </div>

                      {/* Card Content Body */}
                      <div className="blog-card-body">
                        {/* Small Chips: "Blog" and the category */}
                        <div className="blog-card-chips">
                          <span className="blog-chip-brand">Blog</span>
                          <span className="blog-chip-category">{article.category}</span>
                        </div>

                        {/* Title (max 2 lines) */}
                        <h2 className="blog-card-title">{article.title}</h2>

                        {/* Short Excerpt (max 2 lines) */}
                        <p className="blog-card-excerpt">{article.excerpt}</p>

                        {/* Meta Line: Views, Read time, Date */}
                        <div className="blog-card-meta-line">
                          <span className="blog-card-meta-item">
                            <Icon name="users" size={13} /> {article.views}
                          </span>
                          <span>•</span>
                          <span className="blog-card-meta-item">
                            <Icon name="clock" size={13} /> {article.readTime}
                          </span>
                          <span>•</span>
                          <span className="blog-card-meta-item">
                            <Icon name="calendar" size={13} /> {article.date}
                          </span>
                        </div>

                        {/* Author Avatar and Name */}
                        <div className="blog-card-author-row">
                          <div className="blog-card-author-avatar">{article.author.avatar}</div>
                          <span className="blog-card-author-name">{article.author.name}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination / Load More Button */}
                {hasMore && (
                  <div className="blog-load-more-wrap">
                    <button
                      type="button"
                      className="blog-load-more-btn"
                      onClick={() => setVisibleCount((prev) => prev + 3)}
                    >
                      Load More Articles <Icon name="arrow" size={14} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default BlogList;
