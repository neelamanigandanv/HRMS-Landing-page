import { useParams, Link } from "react-router-dom";
import FeatureTemplate from "../components/templates/FeatureTemplate";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { featuresMap } from "../data/featuresData";

export function FeaturePage() {
  const { slug } = useParams<{ slug: string }>();
  const feature = slug ? featuresMap[slug] : null;

  if (!feature) {
    return (
      <PageLayout>
        <SEO
          title="Feature Not Found"
          description="The requested feature page could not be located."
        />
        <div className="container not-found-wrapper">
          <Icon name="search" size={48} className="not-found-icon" />
          <h1>Feature Page Not Found</h1>
          <p>The feature you are looking for does not exist or may have been relocated.</p>
          <div className="not-found-actions">
            <Button to="/product">
              Explore All Features <Icon name="arrow" />
            </Button>
            <Button to="/" secondary>
              Return to Home
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return <FeatureTemplate feature={feature} />;
}

export default FeaturePage;
