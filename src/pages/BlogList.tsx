import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Icon from "../components/ui/Icon";
import { blogPosts, BlogPost } from "../data/resourcesData";

export function BlogList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Payroll & Compliance", "Attendance & Operations", "Retention & Culture"];

  const filteredPosts = blogPosts.filter((post: BlogPost) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "Blog" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="HR & Payroll Insights Blog | LattiumHR"
        description="Actionable insights, regulatory compliance updates, and workforce management best practices for growing businesses."
        canonicalPath="/resources/blog"
      />

      <section className="blog-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="file-text" size={14} /> HR & PAYROLL INSIGHTS
            </span>
            <h1>Knowledge for modern workforce leaders</h1>
            <p>
              Actionable guides on Indian labor compliance, attendance geofencing, multi-branch
              governance, and retention strategies.
            </p>

            {/* Search Input */}
            <div className="blog-search-bar">
              <Icon name="search" size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search articles on payroll, attendance, compliance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search articles"
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

            {/* Category Pills */}
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

      {/* Blog Cards Grid */}
      <section className="blog-grid-section">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="no-results-box">
              <Icon name="search" size={32} />
              <p>No articles found matching your query. Try a different search term.</p>
            </div>
          ) : (
            <div className="blog-posts-grid">
              {filteredPosts.map((post) => (
                <article key={post.slug} className="blog-post-card">
                  <div className="blog-card-meta">
                    <span className="blog-cat-badge">{post.category}</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                  <h3>
                    <Link to={`/resources/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>

                  <div className="blog-card-footer">
                    <div className="author-box">
                      <span className="author-avatar">{post.author.avatar}</span>
                      <div>
                        <strong>{post.author.name}</strong>
                        <small>{post.date}</small>
                      </div>
                    </div>
                    <Link to={`/resources/blog/${post.slug}`} className="read-more-link">
                      Read <Icon name="arrow" size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default BlogList;
