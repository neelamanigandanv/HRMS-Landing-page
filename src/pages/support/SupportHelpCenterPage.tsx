import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import SEO from "../../components/layout/SEO";
import Icon from "../../components/ui/Icon";
import {
  SUPPORT_MODULE_TOPICS,
  SUPPORT_ARTICLES_DATABASE,
} from "../../data/supportData";

export function SupportHelpCenterPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  // If a slug is specified, find that topic
  const currentTopic = slug
    ? SUPPORT_MODULE_TOPICS.find((t) => t.slug === slug)
    : null;

  const baseArticles = slug
    ? SUPPORT_ARTICLES_DATABASE.filter((a) => a.topicSlug === slug)
    : SUPPORT_ARTICLES_DATABASE;

  const displayedArticles = useMemo(() => {
    if (!searchQuery.trim()) return baseArticles;
    const q = searchQuery.toLowerCase().trim();
    return baseArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.topicSlug.toLowerCase().includes(q) ||
        (a.steps || []).some((s) => s.toLowerCase().includes(q))
    );
  }, [baseArticles, searchQuery]);

  const breadcrumbs = [
    { label: "Support", to: "/support" },
    { label: currentTopic ? currentTopic.title : "Help Center" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title={`${currentTopic ? currentTopic.title : "Help Center Knowledge Base"} | LattiumHR`}
        description={
          currentTopic
            ? currentTopic.desc
            : "Browse step-by-step guides, payroll formulas, biometric configurations, and statutory compliance playbooks."
        }
      />

      <div className="support-subpage-wrap py-12">
        <div className="container" style={{ maxWidth: "1080px" }}>
          {/* Header */}
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b2958] bg-[#faedf4] px-3 py-1 rounded-full inline-block mb-3">
              KNOWLEDGE BASE & GUIDES
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              {currentTopic ? currentTopic.title : "Browse Help Center by Module"}
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              {currentTopic
                ? currentTopic.desc
                : "Explore actionable guides, statutory tax formulas, shift rosters, and API specifications."}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative flex items-center bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 shadow-sm focus-within:border-[#7b2958] transition">
              <Icon name="search" size={18} className="text-[#7b2958] mr-3 flex-shrink-0" />
              <input
                type="text"
                className="w-full text-sm outline-none text-gray-900 placeholder-gray-400"
                placeholder="Search articles by keyword (e.g. payroll, biometric, leave, tax)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-700 ml-2"
                  aria-label="Clear search"
                >
                  <Icon name="x" size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Module topic pill switcher if on main help-center */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            <Link
              to="/support/help-center"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                !slug
                  ? "bg-[#7b2958] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Topics ({SUPPORT_ARTICLES_DATABASE.length})
            </Link>
            {SUPPORT_MODULE_TOPICS.map((topic) => {
              const count = SUPPORT_ARTICLES_DATABASE.filter((a) => a.topicSlug === topic.slug).length;
              return (
                <Link
                  key={topic.slug}
                  to={`/support/help-center/${topic.slug}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                    slug === topic.slug
                      ? "bg-[#7b2958] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {topic.title} ({count})
                </Link>
              );
            })}
          </div>

          {/* Articles Count & Status */}
          {searchQuery && (
            <div className="flex items-center justify-between text-sm text-gray-600 mb-6 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200">
              <span>
                Found <strong>{displayedArticles.length}</strong> {displayedArticles.length === 1 ? "article" : "articles"} matching &ldquo;{searchQuery}&rdquo;
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-[#7b2958] hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Articles Grid */}
          {displayedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
              {displayedArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/support/article/${article.slug}`}
                  className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#7b2958] hover:shadow-lg transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="font-semibold text-[#7b2958] uppercase">
                        {article.topicSlug.replace("-", " ")}
                      </span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7b2958] transition leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {article.summary}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[#7b2958] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide &rarr;
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 mb-14 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#faedf4] text-[#7b2958] flex items-center justify-center mx-auto mb-3">
                <Icon name="search" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No articles found</h3>
              <p className="text-sm text-gray-600 mb-4">
                We couldn&apos;t find any guides matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 rounded-lg bg-[#7b2958] text-white text-xs font-bold hover:bg-[#5d1e41] transition"
              >
                Clear Search & View All
              </button>
            </div>
          )}

          {/* Bottom Help Callout */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#fdf6fa] to-[#fcf0f7] border border-[#f2d0e3] text-center max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Can&apos;t find what you need?
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Submit a support request or speak with our product assistance team.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/support"
                className="px-5 py-2.5 rounded-xl bg-[#7b2958] text-white font-bold text-sm shadow hover:bg-[#5d1e41] transition"
              >
                Contact Support
              </Link>
              <Link
                to="/faq"
                className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-800 hover:bg-gray-50 transition"
              >
                Browse FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SupportHelpCenterPage;
