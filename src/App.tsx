import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import CookieBanner from "./components/common/CookieBanner";
import { DemoModalProvider } from "./context/DemoModalContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import Home from "./pages/Home";
import ProductOverview from "./pages/ProductOverview";
import FeaturePage from "./pages/FeaturePage";
import EmployeeManagementPage from "./pages/EmployeeManagementPage";
import AttendanceManagementPage from "./pages/AttendanceManagementPage";
import LeaveManagementPage from "./pages/LeaveManagementPage";
import PayrollManagementPage from "./pages/PayrollManagementPage";
import AssetManagementPage from "./pages/AssetManagementPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import DocumentsCompliancePage from "./pages/DocumentsCompliancePage";
import PerformanceManagementPage from "./pages/PerformanceManagementPage";
import RolesPermissionsPage from "./pages/RolesPermissionsPage";
import ReportsAnalyticsPage from "./pages/ReportsAnalyticsPage";
import SolutionsOverview from "./pages/SolutionsOverview";
import SolutionPage from "./pages/SolutionPage";
import SmallBusinessPage from "./pages/SmallBusinessPage";
import IndustrySolutionsPage from "./pages/IndustrySolutionsPage";
import ResourcesOverview from "./pages/ResourcesOverview";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import GlossaryPage from "./pages/GlossaryPage";
import GlossaryDetailPage from "./pages/GlossaryDetailPage";
import FAQPage from "./pages/FAQPage";
import HelpCenter from "./pages/HelpCenter";
import GettingStartedPage from "./pages/GettingStartedPage";
import SupportPage from "./pages/SupportPage";
import SupportSearchPage from "./pages/support/SupportSearchPage";
import SupportHelpCenterPage from "./pages/support/SupportHelpCenterPage";
import SupportArticlePage from "./pages/support/SupportArticlePage";
import SupportTicketConfirmationPage from "./pages/support/SupportTicketConfirmationPage";
import SupportTrackPage from "./pages/support/SupportTrackPage";
import SupportEmployeeHelpPage from "./pages/support/SupportEmployeeHelpPage";
import ContactSalesPage from "./pages/support/ContactSalesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import GuidesPage from "./pages/GuidesPage";
import GuideDetailPage from "./pages/GuideDetailPage";
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
            Return to page <Icon name="arrow" />
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
      <CookieBanner />
      <CurrencyProvider>
        <DemoModalProvider>
          <Routes>
            {/* Core & Homepage */}
            <Route path="/" element={<Home />} />

            {/* Product & Features */}
            <Route path="/product" element={<ProductOverview />} />
            <Route path="/features/employee-management" element={<EmployeeManagementPage />} />
            <Route path="/features/attendance-management" element={<AttendanceManagementPage />} />
            <Route path="/features/leave-management" element={<LeaveManagementPage />} />
            <Route path="/features/payroll-management" element={<PayrollManagementPage />} />
            <Route path="/features/asset-management" element={<AssetManagementPage />} />
            <Route path="/features/recruitment" element={<RecruitmentPage />} />
            <Route path="/features/recruitment-pipeline" element={<RecruitmentPage />} />
            <Route path="/features/documents-compliance" element={<DocumentsCompliancePage />} />
            <Route path="/features/document-management" element={<DocumentsCompliancePage />} />
            <Route path="/features/performance-management" element={<PerformanceManagementPage />} />
            <Route path="/features/performance" element={<PerformanceManagementPage />} />
            <Route path="/features/roles-permissions" element={<RolesPermissionsPage />} />
            <Route path="/features/roles" element={<RolesPermissionsPage />} />
            <Route path="/features/reports-analytics" element={<ReportsAnalyticsPage />} />
            <Route path="/features/reports" element={<ReportsAnalyticsPage />} />
            <Route path="/features/:slug" element={<FeaturePage />} />

            {/* Solutions */}
            <Route path="/solutions" element={<SolutionsOverview />} />
            <Route path="/solutions/industries" element={<IndustrySolutionsPage />} />
            <Route path="/solutions/industry" element={<IndustrySolutionsPage />} />
            <Route path="/industries" element={<IndustrySolutionsPage />} />
            <Route path="/solutions/small-businesses" element={<SmallBusinessPage />} />
            <Route path="/solutions/small-business" element={<SmallBusinessPage />} />
            <Route path="/solutions/:slug" element={<SolutionPage />} />

            {/* Blog & Resources */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/resources" element={<ResourcesOverview />} />
            <Route path="/resources/blog" element={<BlogList />} />
            <Route path="/resources/blog/:slug" element={<BlogPost />} />
            {/* HRMS Glossary & Term Knowledge Center */}
            <Route path="/resources/hrms-glossary" element={<GlossaryPage />} />
            <Route path="/resources/hrms-glossary/:slug" element={<GlossaryDetailPage />} />
            <Route path="/resources/glossary" element={<GlossaryPage />} />
            <Route path="/resources/glossary/:slug" element={<GlossaryDetailPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/glossary/:slug" element={<GlossaryDetailPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/resources/faqs" element={<FAQPage />} />
            <Route path="/help" element={<HelpCenter />} />
            {/* Customer Support Hub & Sub-routes */}
            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/search" element={<SupportSearchPage />} />
            <Route path="/support/help-center" element={<SupportHelpCenterPage />} />
            <Route path="/support/help-center/:slug" element={<SupportHelpCenterPage />} />
            <Route path="/support/article/:slug" element={<SupportArticlePage />} />
            <Route path="/support/ticket/confirmation" element={<SupportTicketConfirmationPage />} />
            <Route path="/support/track" element={<SupportTrackPage />} />
            <Route path="/support/employee-help" element={<SupportEmployeeHelpPage />} />
            <Route path="/contact-sales" element={<ContactSalesPage />} />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/resources/case-studies" element={<CaseStudiesPage />} />

            {/* Guides & Handbooks */}
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/:slug" element={<GuideDetailPage />} />
            <Route path="/resources/guides" element={<GuidesPage />} />
            <Route path="/resources/guides/:slug" element={<GuideDetailPage />} />
            <Route path="/help/getting-started" element={<GuidesPage />} />

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
        </DemoModalProvider>
      </CurrencyProvider>
    </BrowserRouter>
  );
}

export default App;
