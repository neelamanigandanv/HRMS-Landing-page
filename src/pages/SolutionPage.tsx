import { useParams } from "react-router-dom";
import SolutionTemplate from "../components/templates/SolutionTemplate";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { solutionsMap } from "../data/solutionsData";

export function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? solutionsMap[slug] : null;

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
