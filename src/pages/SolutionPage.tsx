import { useParams, useLocation } from "react-router-dom";
import SolutionTemplate from "../components/templates/SolutionTemplate";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { solutionsMap } from "../data/solutionsData";

export function SolutionPage() {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();

  // If slug is undefined (e.g. from explicit routes like /solutions/finance-teams), extract from pathname
  const pathParts = location.pathname.split("/").filter(Boolean);
  const pathSlug = pathParts[0] === "solutions" ? pathParts[1] : undefined;
  const rawSlug = slug || pathSlug;

  const normalizedSlug =
    rawSlug === "finance" || rawSlug === "finance-team"
      ? "finance-teams"
      : rawSlug === "hr" || rawSlug === "hr-team"
      ? "hr-teams"
      : rawSlug;

  const solution = normalizedSlug ? solutionsMap[normalizedSlug] : null;

  if (!solution) {
    return (
      <PageLayout>
        <SEO
          title="Solution Not Found"
          description="The requested solution page could not be located."
        />
        <div className="container not-found-wrapper">
          <Icon name="search" size={48} className="not-found-icon" />
          <h1>Solution Page Not Found</h1>
          <p>The solution you are looking for does not exist or may have been relocated.</p>
          <div className="not-found-actions">
            <Button to="/solutions">
              Explore All Solutions <Icon name="arrow" />
            </Button>
            <Button to="/" secondary>
              Return to Home
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return <SolutionTemplate solution={solution} />;
}

export default SolutionPage;
