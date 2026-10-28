import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import { useCurrency } from "../context/CurrencyContext";
import { blogArticles, BlogPostData } from "../data/blogData";
import "./Blog.css";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { openDemoModal } = useDemoModal();
  const { formatText } = useCurrency();
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Find current article from blogArticles
  const post = useMemo(() => {
    return blogArticles.find((p) => p.slug === slug);
  }, [slug]);

  // Compute 3 related blogs: same category first, excluding current article
  const relatedArticles = useMemo(() => {
    if (!post) return [];
    const sameCat = blogArticles.filter((a) => a.category === post.category && a.slug !== post.slug);
    const otherCat = blogArticles.filter((a) => a.category !== post.category && a.slug !== post.slug);
    return [...sameCat, ...otherCat].slice(0, 3);
  }, [post]);

  // Trending articles for the right sidebar
  const trendingArticles = useMemo(() => {
    if (!post) return [];
    return blogArticles.filter((a) => a.slug !== post.slug).slice(0, 3);
  }, [post]);

  // ScrollSpy observer to highlight current heading in left TOC while scrolling
  useEffect(() => {
    if (!post) return;

    const headingIds = post.toc.map((item) => item.id);
    const elements = headingIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Fallback: default to first section
    if (elements[0] && !activeSectionId) {
      setActiveSectionId(elements[0].id);
    }

    return () => observer.disconnect();
  }, [post]);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSectionId(id);
    }
  };

  // Copy article link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Download PDF / Print handler
  const handleDownloadPdf = () => {
    window.print();
  };

  // 404 Fallback
  if (!post) {
    return (
      <PageLayout onOpenDemo={() => openDemoModal()}>
        <SEO title="Article Not Found | LattiumHR" description="The requested blog article could not be located." />
        <div className="container not-found-wrapper" style={{ padding: "80px 20px", textAlign: "center" }}>
          <Icon name="search" size={48} className="not-found-icon" />
          <h1>Article Not Found</h1>
          <p>The blog article you are looking for does not exist or may have been relocated.</p>
          <div className="not-found-actions" style={{ marginTop: "24px" }}>
            <Button to="/blog">
              Return to All Blogs <Icon name="arrow" />
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const [readingProgress, setReadingProgress] = useState(0);

  // Track scroll progress for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max((currentScroll / totalScroll) * 100, 0), 100);
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post?.slug]);

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Resources", to: "/resources" },
    { label: "Blog", to: "/blog" },
    { label: post.title },
  ];

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <PageLayout breadcrumbs={breadcrumbs} onOpenDemo={() => openDemoModal()}>
      <SEO
        title={`${post.title} | LattiumHR Blog`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
      />

      <div className="article-page">
        {/* Reading Progress Bar (Fixed at top of screen) */}
        <div className="article-reading-progress-track" aria-hidden="true">
          <div
            className="article-reading-progress-bar"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Top Breadcrumb row */}
        <div className="article-breadcrumb-bar">
          <div className="container">
            <nav className="article-breadcrumb-inner" aria-label="Breadcrumb navigation">
              <Link to="/" className="article-breadcrumb-link">
                Home
              </Link>
              <span className="article-breadcrumb-sep">/</span>
              <Link to="/blog" className="article-breadcrumb-link">
                Blog
              </Link>
              <span className="article-breadcrumb-sep">/</span>
              <span className="article-breadcrumb-current" aria-current="page">
                {post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* =================================================================
            3-COLUMN MAIN ARTICLE CONTAINER
            Left: Sticky TOC
            Center: Full Article
            Right: Sticky CTA & Trust Cards
            ================================================================= */}
        <main className="article-3col-wrapper">
          <div className="container">
            <div className="article-3col-grid">
              {/* --- 1. LEFT COLUMN (Sticky Table of Contents) --- */}
              <aside className="article-left-col" aria-label="Table of contents">
                <div className="article-toc-box">
                  <div className="article-toc-title">
                    <Icon name="file-text" size={13} /> IN THIS ARTICLE
                  </div>
                  <nav className="article-toc-nav">
                    {post.toc.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`article-toc-item ${activeSectionId === item.id ? "is-active" : ""}`}
                        onClick={() => scrollToSection(item.id)}
                      >
                        {item.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* --- 2. CENTER COLUMN (The Article) --- */}
              <article className="article-center-col">
                {/* Mobile "Jump to section" Dropdown */}
                <div className="article-mobile-toc-wrap">
                  <label htmlFor="mobile-toc-select" style={{ fontSize: "12px", fontWeight: 700, color: "#004B49", display: "block", marginBottom: "6px" }}>
                    JUMP TO SECTION:
                  </label>
                  <select
                    id="mobile-toc-select"
                    className="article-mobile-toc-select"
                    value={activeSectionId}
                    onChange={(e) => scrollToSection(e.target.value)}
                  >
                    {post.toc.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Small Label "BLOG" */}
                <span className="article-tag-label">BLOG</span>

                {/* Big Article Title */}
                <h1 className="article-h1-title">{post.title}</h1>

                {/* Meta Bar */}
                <div className="article-meta-bar">
                  <div className="article-meta-left">
                    <div className="article-meta-author-wrap">
                      <div className="article-meta-avatar">{post.author.avatar}</div>
                      <span className="article-meta-author-name">Written by {post.author.name}</span>
                    </div>
                    <span className="article-meta-divider">•</span>
                    <span className="article-meta-text">Last updated {post.lastUpdated}</span>
                    <span className="article-meta-divider">•</span>
                    <span className="article-meta-text">Skim in {post.skimTime} mins</span>
                  </div>

                  {/* Right: Download PDF Button */}
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="article-download-pdf-btn"
                    title="Download / Print article as PDF"
                  >
                    <Icon name="download" size={14} /> Download PDF
                  </button>
                </div>

                {/* Hero Banner Image */}
                <div className="article-hero-banner">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="article-hero-img"
                  />
                </div>

                {/* Key Takeaway Callout Box */}
                {post.keyTakeaway && (
                  <div className="article-takeaway-box" role="region" aria-label="Key takeaways">
                    <div className="article-takeaway-header">
                      <Icon name="sparkle" size={17} />
                      <span>{post.keyTakeaway.title}</span>
                    </div>
                    <ul className="article-takeaway-list">
                      {post.keyTakeaway.points.map((pt, idx) => (
                        <li key={idx}>
                          <span className="article-takeaway-check">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Main Article Content Sections */}
                <div className="article-body-prose">
                  {post.contentSections.map((sec) => (
                    <section key={sec.id} id={sec.id} className="article-section-block">
                      <h2 className="article-h2-title">{sec.heading}</h2>
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{formatText(p)}</p>
                      ))}
                      {sec.bullets && sec.bullets.length > 0 && (
                        <ul className="article-bullet-list">
                          {sec.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{formatText(b)}</li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}

                  {/* Comparison Table */}
                  {post.comparisonTable && (
                    <div id="comparison" className="article-table-container">
                      <div className="article-table-caption">{post.comparisonTable.title}</div>
                      <div style={{ overflowX: "auto" }}>
                        <table className="article-custom-table">
                          <thead>
                            <tr>
                              {post.comparisonTable.headers.map((h, i) => (
                                <th key={i}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {post.comparisonTable.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} style={cIdx === 0 ? { fontWeight: 650, color: "#0f172a" } : {}}>
                                    {formatText(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Data Table (if present) */}
                  {post.dataTable && (
                    <div className="article-table-container">
                      <div className="article-table-caption">{post.dataTable.title}</div>
                      <div style={{ overflowX: "auto" }}>
                        <table className="article-custom-table">
                          <thead>
                            <tr>
                              {post.dataTable.headers.map((h, i) => (
                                <th key={i}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {post.dataTable.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx}>{formatText(cell)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* FAQ Accordion Section */}
                  {post.faqs && post.faqs.length > 0 && (
                    <section id="faqs" className="article-faq-section">
                      <h2 className="article-h2-title">Frequently Asked Questions</h2>
                      <div className="article-faq-list">
                        {post.faqs.map((faq, fIdx) => {
                          const isOpen = openFaqIndex === fIdx;
                          return (
                            <div key={fIdx} className={`article-faq-item ${isOpen ? "is-open" : ""}`}>
                              <button
                                type="button"
                                className="article-faq-trigger"
                                onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                                aria-expanded={isOpen}
                              >
                                <span>{formatText(faq.question)}</span>
                                <Icon
                                  name="chevron-down"
                                  size={16}
                                  className={isOpen ? "rotate-180" : ""}
                                />
                              </button>
                              {isOpen && <div className="article-faq-body">{formatText(faq.answer)}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Final Recommendation Box */}
                  {post.finalRecommendation && (
                    <section id="recommendation" className="article-recommendation-box">
                      <span className="article-rec-eyebrow">
                        <Icon name="award" size={13} /> EXPERT VERDICT
                      </span>
                      <h3 className="article-rec-title">{post.finalRecommendation.title}</h3>
                      <p className="article-rec-text">{post.finalRecommendation.text}</p>
                    </section>
                  )}
                </div>

                {/* Author Box */}
                <div className="article-author-bio-card">
                  <div className="article-author-big-avatar">{post.author.avatar}</div>
                  <div className="article-author-bio-content">
                    <h4>{post.author.name}</h4>
                    <div className="article-author-bio-role">{post.author.role}</div>
                    <p className="article-author-bio-p">{post.author.bio}</p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="article-share-bar">
                  <span className="article-share-label">Share this article</span>
                  <div className="article-share-buttons">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="article-share-btn"
                      title="Copy link to clipboard"
                    >
                      <Icon name="document" size={13} />
                      <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                    </button>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-share-btn"
                      title="Share on LinkedIn"
                    >
                      <Icon name="linkedin" size={13} />
                      <span>LinkedIn</span>
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-share-btn"
                      title="Share on X"
                    >
                      <Icon name="twitter" size={13} />
                      <span>X</span>
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-share-btn"
                      title="Share on WhatsApp"
                    >
                      <Icon name="whatsapp" size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>

              {/* --- 3. RIGHT COLUMN (Sticky Editorial Companion) --- */}
              <aside className="article-right-col" aria-label="Author and trending reads">
                {/* Author Profile Card */}
                <div className="article-sidebar-author-card">
                  <div className="article-sidebar-author-header">
                    <div className="article-sidebar-author-avatar">{post.author.avatar}</div>
                    <div className="article-sidebar-author-info">
                      <span className="article-sidebar-author-eyebrow">ABOUT THE AUTHOR</span>
                      <h4 className="article-sidebar-author-name">{post.author.name}</h4>
                      <span className="article-sidebar-author-role">{post.author.role}</span>
                    </div>
                  </div>
                  <p className="article-sidebar-author-bio">{post.author.bio}</p>
                  <div className="article-sidebar-author-badge">
                    <Icon name="award" size={14} />
                    <span>Verified HR &amp; Compliance Specialist</span>
                  </div>
                </div>

                {/* Trending Articles Card */}
                <div className="article-sidebar-trending-card">
                  <div className="article-sidebar-trending-title">
                    <Icon name="sparkle" size={14} />
                    <span>TRENDING ARTICLES</span>
                  </div>
                  <div className="article-sidebar-trending-list">
                    {trendingArticles.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/blog/${item.slug}`}
                        className="article-sidebar-trending-item"
                      >
                        <span className="article-sidebar-trending-cat">{item.category}</span>
                        <h5 className="article-sidebar-trending-headline">{item.title}</h5>
                        <div className="article-sidebar-trending-meta">
                          <span>
                            <Icon name="clock" size={12} /> {item.readTime}
                          </span>
                          <span>•</span>
                          <span>{item.views}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Trust Card */}
                <div className="article-trust-card">
                  <h4 className="article-trust-headline">Enterprise confidence. Proven in public.</h4>
                  <div className="article-trust-stars">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="star" size={15} />
                    ))}
                  </div>
                  <div className="article-trust-stat-item">
                    <Icon name="check" size={14} className="article-trust-icon" />
                    <span>Trusted by <strong>2,500+ businesses</strong> nationwide</span>
                  </div>
                  <div className="article-trust-stat-item">
                    <Icon name="check" size={14} className="article-trust-icon" />
                    <span><strong>2,834+ public ratings</strong> across G2 and Capterra</span>
                  </div>
                  <div className="article-trust-stat-item">
                    <Icon name="check" size={14} className="article-trust-icon" />
                    <span><strong>99.8% statutory accuracy</strong> guaranteed</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* =================================================================
            BELOW THE ARTICLE:
            1. Related Blogs ("Keep reading" with 3 cards)
            2. Footer CTA Band ("Book a Demo" + "Start Free Trial")
            ================================================================= */}

        {/* 1. Related Blogs */}
        {relatedArticles.length > 0 && (
          <section className="article-related-section">
            <div className="container">
              <div className="article-related-header">
                <h2 className="article-related-title">Keep reading</h2>
                <p className="article-related-sub">
                  More expert guides on workforce operations, compliance, and culture.
                </p>
              </div>

              <div className="blog-cards-grid">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/blog/${rel.slug}`}
                    className="blog-card"
                    aria-label={`Read related article: ${rel.title}`}
                  >
                    <div className="blog-card-img-wrap">
                      <img src={rel.coverImage} alt={rel.title} className="blog-card-img" loading="lazy" />
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-card-chips">
                        <span className="blog-chip-brand">Blog</span>
                        <span className="blog-chip-category">{rel.category}</span>
                      </div>
                      <h3 className="blog-card-title">{rel.title}</h3>
                      <p className="blog-card-excerpt">{rel.excerpt}</p>
                      <div className="blog-card-meta-line">
                        <span className="blog-card-meta-item">
                          <Icon name="users" size={13} /> {rel.views}
                        </span>
                        <span>•</span>
                        <span className="blog-card-meta-item">
                          <Icon name="clock" size={13} /> {rel.readTime}
                        </span>
                        <span>•</span>
                        <span className="blog-card-meta-item">
                          <Icon name="calendar" size={13} /> {rel.date}
                        </span>
                      </div>
                      <div className="blog-card-author-row">
                        <div className="blog-card-author-avatar">{rel.author.avatar}</div>
                        <span className="blog-card-author-name">{rel.author.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}

export default BlogPost;
