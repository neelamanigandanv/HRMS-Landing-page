import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import CookieBanner from "./components/common/CookieBanner";
import { DemoModalProvider } from "./context/DemoModalContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import PageLayout from "./components/layout/PageLayout";
import SEO from "./components/layout/SEO";
import Button from "./components/ui/Button";
import Icon from "./components/ui/Icon";

// Route-level code splitting via React.lazy for instant initial page loads and optimal CWV
const Home = lazy(() => import("./pages/Home"));
const ProductOverview = lazy(() => import("./pages/ProductOverview"));
const FeaturePage = lazy(() => import("./pages/FeaturePage"));
const EmployeeManagementPage = lazy(() => import("./pages/EmployeeManagementPage"));
const AttendanceManagementPage = lazy(() => import("./pages/AttendanceManagementPage"));
const LeaveManagementPage = lazy(() => import("./pages/LeaveManagementPage"));
const PayrollManagementPage = lazy(() => import("./pages/PayrollManagementPage"));
const AssetManagementPage = lazy(() => import("./pages/AssetManagementPage"));
const RecruitmentPage = lazy(() => import("./pages/RecruitmentPage"));
const DocumentsCompliancePage = lazy(() => import("./pages/DocumentsCompliancePage"));
const PerformanceManagementPage = lazy(() => import("./pages/PerformanceManagementPage"));
const RolesPermissionsPage = lazy(() => import("./pages/RolesPermissionsPage"));
const ReportsAnalyticsPage = lazy(() => import("./pages/ReportsAnalyticsPage"));
const SolutionsOverview = lazy(() => import("./pages/SolutionsOverview"));
const SolutionPage = lazy(() => import("./pages/SolutionPage"));
const SmallBusinessPage = lazy(() => import("./pages/SmallBusinessPage"));
const MidSizedBusinessPage = lazy(() => import("./pages/MidSizedBusinessPage"));
const EnterprisePage = lazy(() => import("./pages/EnterprisePage"));
const IndustrySolutionsPage = lazy(() => import("./pages/IndustrySolutionsPage"));
const ResourcesOverview = lazy(() => import("./pages/ResourcesOverview"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const GlossaryPage = lazy(() => import("./pages/GlossaryPage"));
const GlossaryDetailPage = lazy(() => import("./pages/GlossaryDetailPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const GettingStartedPage = lazy(() => import("./pages/GettingStartedPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const SupportSearchPage = lazy(() => import("./pages/support/SupportSearchPage"));
const SupportHelpCenterPage = lazy(() => import("./pages/support/SupportHelpCenterPage"));
const SupportArticlePage = lazy(() => import("./pages/support/SupportArticlePage"));
const SupportTicketConfirmationPage = lazy(() => import("./pages/support/SupportTicketConfirmationPage"));
const SupportTrackPage = lazy(() => import("./pages/support/SupportTrackPage"));
const SupportEmployeeHelpPage = lazy(() => import("./pages/support/SupportEmployeeHelpPage"));
const ContactSalesPage = lazy(() => import("./pages/support/ContactSalesPage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const ApiDocumentationPage = lazy(() => import("./pages/ApiDocumentationPage"));
const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const GuideDetailPage = lazy(() => import("./pages/GuideDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage"));
const SecurityPage = lazy(() => import("./pages/SecurityPage"));
const RequestDemoPage = lazy(() => import("./pages/RequestDemoPage"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));

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
          <Suspense fallback={null}>
          <Routes>
            {/* Core & Homepage */}
            <Route path="/" element={<Home />} />

            {/* Product & Features */}
            <Route path="/product" element={<ProductOverview />} />
            <Route path="/features/employee-management" element={<EmployeeManagementPage />} />
            <Route path="/employee-management" element={<EmployeeManagementPage />} />
            <Route path="/solutions/employee-management" element={<EmployeeManagementPage />} />
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
            <Route path="/solutions/mid-sized-businesses" element={<MidSizedBusinessPage />} />
            <Route path="/solutions/mid-sized-business" element={<MidSizedBusinessPage />} />
            <Route path="/solutions/mid-sized" element={<MidSizedBusinessPage />} />
            <Route path="/solutions/mid-size" element={<MidSizedBusinessPage />} />
            <Route path="/solutions/mid-market" element={<MidSizedBusinessPage />} />
            <Route path="/solutions/enterprises" element={<EnterprisePage />} />
            <Route path="/solutions/enterprise" element={<EnterprisePage />} />
            <Route path="/solutions/large-enterprise" element={<EnterprisePage />} />
            <Route path="/solutions/finance-teams" element={<SolutionPage />} />
            <Route path="/solutions/finance-team" element={<SolutionPage />} />
            <Route path="/solutions/finance" element={<SolutionPage />} />
            <Route path="/solutions/hr-teams" element={<SolutionPage />} />
            <Route path="/solutions/hr-team" element={<SolutionPage />} />
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
            {/* Developer API Documentation */}
            <Route path="/resources/api-documentation" element={<ApiDocumentationPage />} />
            <Route path="/api-documentation" element={<ApiDocumentationPage />} />

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
            <Route path="/careers/:jobId" element={<JobDetailPage />} />
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
          </Suspense>
        </DemoModalProvider>
      </CurrencyProvider>
    </BrowserRouter>
  );
}

export default App;
