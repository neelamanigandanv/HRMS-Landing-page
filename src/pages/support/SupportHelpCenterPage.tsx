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

  // If a slug is specified, find that topic
  const currentTopic = slug
    ? SUPPORT_MODULE_TOPICS.find((t) => t.slug === slug)
    : null;

  const displayedArticles = slug
    ? SUPPORT_ARTICLES_DATABASE.filter((a) => a.topicSlug === slug)
    : SUPPORT_ARTICLES_DATABASE;

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
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#004B49] bg-[#F6F8F8] px-3 py-1 rounded-full inline-block mb-3">
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

          {/* Module topic pill switcher if on main help-center */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            <Link
              to="/support/help-center"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                !slug
                  ? "bg-[#004B49] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Topics
            </Link>
            {SUPPORT_MODULE_TOPICS.map((topic) => (
              <Link
                key={topic.slug}
                to={`/support/help-center/${topic.slug}`}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                  slug === topic.slug
                    ? "bg-[#004B49] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {topic.title}
              </Link>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {displayedArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/support/article/${article.slug}`}
                className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#004B49] hover:shadow-lg transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="font-semibold text-[#004B49] uppercase">
                      {article.topicSlug.replace("-", " ")}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#004B49] transition leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>
                <span className="text-sm font-bold text-[#004B49] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide &rarr;
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom Help Callout */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#F6F8F8] to-[#F6F8F8] border border-[#E5EAEA] text-center max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Can&apos;t find what you need?
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Submit a technical ticket or speak with your assigned payroll implementation engineer.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/support#ticket"
                className="px-5 py-2.5 bg-[#004B49] text-white font-bold text-sm rounded-xl hover:bg-[#00201F] transition"
              >
                Raise a Ticket
              </Link>
              <Link
                to="/support"
                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-800 font-bold text-sm rounded-xl hover:border-gray-400 transition"
              >
                Back to Support Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SupportHelpCenterPage;
