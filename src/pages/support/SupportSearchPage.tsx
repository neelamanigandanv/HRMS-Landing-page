import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import SEO from "../../components/layout/SEO";
import Icon from "../../components/ui/Icon";
import {
  SUPPORT_ARTICLES_DATABASE,
  SUPPORT_MODULE_TOPICS,
  trackSupportEvent,
} from "../../data/supportData";

export function SupportSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [inputValue, setInputValue] = useState(query);

  const filteredArticles = useMemo(() => {
    let list = SUPPORT_ARTICLES_DATABASE;
    if (selectedTopic !== "all") {
      list = list.filter((a) => a.topicSlug === selectedTopic);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.steps.some((s) => s.toLowerCase().includes(q))
      );
    }
    return list;
  }, [query, selectedTopic]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(inputValue.trim() ? { q: inputValue.trim() } : {});
    if (inputValue.trim()) {
      trackSupportEvent("search_performed", { query: inputValue.trim() });
    }
  };

  const breadcrumbs = [
    { label: "Support", to: "/support" },
    { label: `Search: "${query || "All articles"}"` },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title={`Search Results: ${query || "Help Center"} | LattiumHR Support`}
        description="Search results for LattiumHR help guides, payroll troubleshooting, and attendance configurations."
      />

      <div className="support-subpage-wrap py-12">
        <div className="container" style={{ maxWidth: "960px" }}>
          {/* Top Search bar */}
          <div className="support-search-header mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b2958]">
              HELP CENTER SEARCH
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2 mb-4">
              {query ? `Results for "${query}"` : "Search Help Center"}
            </h1>

            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-2xl">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search troubleshooting guides, payroll, biometric..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7b2958] outline-none text-base shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#7b2958] text-white font-bold rounded-xl hover:bg-[#5c1840] transition"
              >
                Search
              </button>
            </form>
          </div>

          {/* Topic Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <button
              type="button"
              onClick={() => setSelectedTopic("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition ${
                selectedTopic === "all"
                  ? "bg-[#7b2958] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Topics ({SUPPORT_ARTICLES_DATABASE.length})
            </button>
            {SUPPORT_MODULE_TOPICS.map((topic) => (
              <button
                key={topic.slug}
                type="button"
                onClick={() => setSelectedTopic(topic.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition whitespace-nowrap ${
                  selectedTopic === topic.slug
                    ? "bg-[#7b2958] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>

          {/* Results List */}
          {filteredArticles.length > 0 ? (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/support/article/${article.slug}`}
                  className="block p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#7b2958] hover:shadow-md transition group"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7b2958] bg-[#faedf4] px-2.5 py-0.5 rounded-full">
                      {article.topicSlug.replace("-", " ")}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7b2958] transition">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {article.summary}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-[#fcf9f8] rounded-2xl border border-dashed border-gray-300">
              <Icon name="search" size={32} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                We couldn&apos;t find that.
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
                No matching articles found for &ldquo;{query}&rdquo;. You can connect with our live support engineers or submit a ticket.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/support#ticket"
                  className="px-5 py-2.5 bg-[#7b2958] text-white font-bold text-sm rounded-xl hover:bg-[#5c1840] transition"
                >
                  Raise a Ticket
                </Link>
                <a
                  href="mailto:support@lattiumhr.com"
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-800 font-bold text-sm rounded-xl hover:border-gray-400 transition"
                >
                  Email Support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default SupportSearchPage;
