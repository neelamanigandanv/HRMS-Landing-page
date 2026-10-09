import { useParams, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { blogPosts } from "../data/resourcesData";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PageLayout>
        <SEO title="Article Not Found" description="The requested article could not be located." />
        <div className="container not-found-wrapper">
          <Icon name="search" size={48} className="not-found-icon" />
          <h1>Article Not Found</h1>
          <p>The blog article you are looking for does not exist or may have been updated.</p>
          <div className="not-found-actions">
            <Button to="/resources/blog">
              Return to Blog <Icon name="arrow" />
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "Blog", to: "/resources/blog" },
    { label: post.title },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/resources/blog/${post.slug}`}
        ogType="article"
      />

      {/* Article Header */}
      <section className="article-header-section">
        <div className="container article-container">
          <div className="article-meta-row">
            <span className="blog-cat-badge">{post.category}</span>
            <span>•</span>
            <span className="article-date">{post.date}</span>
            <span>•</span>
            <span className="article-read-time">{post.readTime}</span>
          </div>

          <h1>{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>

          <div className="article-author-card">
            <span className="author-avatar large">{post.author.avatar}</span>
            <div>
              <strong>{post.author.name}</strong>
              <small>{post.author.role}</small>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="article-takeaways-section">
        <div className="container article-container">
          <div className="takeaways-box">
            <div className="takeaways-header">
              <Icon name="sparkle" size={18} />
              <strong>Key Operational Takeaways</strong>
            </div>
            <ul>
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx}>
                  <Icon name="check" size={14} className="check-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="article-body-section">
        <div className="container article-container">
          <div className="article-prose">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="article-footer-nav">
            <Link to="/resources/blog" className="back-to-blog-link">
              <Icon name="arrow" size={16} className="rotate-180" /> Back to All Articles
            </Link>
            <Button to="/request-demo" className="btn-sm">
              See LattiumHR in Action <Icon name="arrow" size={14} />
            </Button>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}

export default BlogPost;
