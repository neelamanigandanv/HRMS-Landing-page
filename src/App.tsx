import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import ProductOverview from "./pages/ProductOverview";
import FeaturePage from "./pages/FeaturePage";
import SolutionsOverview from "./pages/SolutionsOverview";
import SolutionPage from "./pages/SolutionPage";
import ResourcesOverview from "./pages/ResourcesOverview";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import GlossaryPage from "./pages/GlossaryPage";
import FAQPage from "./pages/FAQPage";
import HelpCenter from "./pages/HelpCenter";
import GettingStartedPage from "./pages/GettingStartedPage";
import SupportPage from "./pages/SupportPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PartnersPage from "./pages/PartnersPage";
import CareersPage from "./pages/CareersPage";
import SecurityPage from "./pages/SecurityPage";
import RequestDemoPage from "./pages/RequestDemoPage";
import ThankYouPage from "./pages/ThankYouPage";
import LegalPage from "./pages/LegalPage";
import SitemapPage from "./pages/SitemapPage";
import PageLayout from "./components/layout/PageLayout";
import SEO from "./components/layout/SEO";
import Button from "./components/ui/Button";
import Icon from "./components/ui/Icon";

function NotFoundPage() {
  return (
    <PageLayout>
      <SEO title="Page Not Found" description="The page you are looking for could not be found." />
      <div className="container not-found-wrapper">
        <Icon name="search" size={48} className="not-found-icon" />
        <h1>404 — Page Not Found</h1>
        <p>The page you requested does not exist or may have been relocated.</p>
        <div className="not-found-actions">
          <Button to="/">
            Return to Homepage <Icon name="arrow" />
          </Button>
          <Button to="/sitemap" secondary>
            View HTML Sitemap
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Core & Homepage */}
        <Route path="/" element={<Home />} />

        {/* Product & Features */}
        <Route path="/product" element={<ProductOverview />} />
        <Route path="/features/:slug" element={<FeaturePage />} />

        {/* Solutions */}
        <Route path="/solutions" element={<SolutionsOverview />} />
        <Route path="/solutions/:slug" element={<SolutionPage />} />

        {/* Resources & Support */}
        <Route path="/resources" element={<ResourcesOverview />} />
        <Route path="/resources/blog" element={<BlogList />} />
        <Route path="/resources/blog/:slug" element={<BlogPost />} />
        <Route path="/resources/hrms-glossary" element={<GlossaryPage />} />
        <Route path="/resources/faqs" element={<FAQPage />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/help/getting-started" element={<GettingStartedPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/resources/case-studies" element={<CaseStudiesPage />} />

        {/* Company */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/security" element={<SecurityPage />} />

        {/* Conversion */}
        <Route path="/request-demo" element={<RequestDemoPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        {/* Legal */}
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/cookie-policy" element={<LegalPage />} />
        <Route path="/terms-of-service" element={<LegalPage />} />
        <Route path="/data-processing-agreement" element={<LegalPage />} />

        {/* Discovery & Sitemaps */}
        <Route path="/sitemap" element={<SitemapPage />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
