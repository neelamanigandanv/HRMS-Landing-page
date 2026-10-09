import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Icon from "../components/ui/Icon";

export function SitemapPage() {
  const sitemapSections = [
    {
      category: "Product & Features",
      links: [
        { title: "Product Overview", path: "/product", desc: "All-in-one HRMS platform architecture" },
        { title: "Employee Management", path: "/features/employee-management", desc: "Centralized employee directory and records" },
        { title: "Attendance Management", path: "/features/attendance-management", desc: "Mobile geofencing and biometric integration" },
        { title: "Leave Management", path: "/features/leave-management", desc: "Leave quotas, accruals, and approvals" },
        { title: "Payroll Management", path: "/features/payroll-management", desc: "Statutory PF, ESI, PT, TDS, and bank payout files" },
        { title: "Asset Management", path: "/features/asset-management", desc: "Hardware inventory and digital handover receipts" },
        { title: "Recruitment Pipeline", path: "/features/recruitment", desc: "Candidate stages, interview scorecards, and offers" },
        { title: "Performance Management", path: "/features/performance-management", desc: "Quarterly OKRs, 360° reviews, and rating matrices" },
        { title: "Documents & Compliance", path: "/features/documents-compliance", desc: "Digital document vaults and statutory registers" },
        { title: "Reports & Analytics", path: "/features/reports-analytics", desc: "Real-time workforce intelligence and salary costs" },
        { title: "Roles & Permissions", path: "/features/roles-permissions", desc: "Granular RBAC and branch access governance" },
      ],
    },
    {
      category: "Solutions",
      links: [
        { title: "Solutions Overview", path: "/solutions", desc: "Overview of audience and vertical configurations" },
        { title: "Small Businesses (1–50)", path: "/solutions/small-businesses", desc: "Lean HR automation without enterprise overhead" },
        { title: "Mid-Sized Businesses (50–500)", path: "/solutions/mid-sized-businesses", desc: "Multi-branch policy governance and approvals" },
        { title: "Enterprises (500+)", path: "/solutions/enterprises", desc: "High-volume payroll, RBAC, and dedicated SLAs" },
        { title: "For HR Teams", path: "/solutions/hr-teams", desc: "Eliminate repetitive administrative paperwork" },
        { title: "For Finance Teams", path: "/solutions/finance-teams", desc: "Accurate payroll inputs and statutory compliance" },
        { title: "Multi-Location Businesses", path: "/solutions/multi-location", desc: "Branch-specific rules with central HQ oversight" },
        { title: "Industry Solutions", path: "/solutions/industries", desc: "Vertical workflows for Retail, Tech, and Manufacturing" },
      ],
    },
    {
      category: "Resources & Support",
      links: [
        { title: "Resources Overview", path: "/resources", desc: "Knowledge, guides, and customer support hub" },
        { title: "HR & Compliance Blog", path: "/resources/blog", desc: "Articles on payroll compliance, attendance, and culture" },
        { title: "Indian Statutory Payroll Guide 2025", path: "/resources/blog/indian-payroll-compliance-guide-2025", desc: "In-depth guide on PF, ESI, PT, and TDS" },
        { title: "Geofenced Attendance vs. Biometrics", path: "/resources/blog/geofenced-attendance-vs-biometric-scanners", desc: "Evaluation of mobile GPS vs. hardware scanners" },
        { title: "Cutting Employee Attrition by 18%", path: "/resources/blog/reducing-employee-attrition-with-better-hr-processes", desc: "How smooth HR processes build workplace trust" },
        { title: "HRMS Glossary", path: "/resources/hrms-glossary", desc: "A–Z dictionary of 50+ HRMS and statutory terms" },
        { title: "Frequently Asked Questions", path: "/resources/faqs", desc: "Answers on setup, multi-branch, and security" },
        { title: "Help Center", path: "/help", desc: "Knowledge base documentation and tutorials" },
        { title: "Getting Started Guide", path: "/help/getting-started", desc: "Step-by-step 4-stage implementation blueprint" },
        { title: "Customer Support & SLAs", path: "/support", desc: "Direct support channels, response SLAs, and tickets" },
        { title: "Customer Case Studies", path: "/resources/case-studies", desc: "Real transformation stories from multi-branch clients" },
      ],
    },
    {
      category: "Company & Conversion",
      links: [
        { title: "Home", path: "/", desc: "LattiumHR landing page" },
        { title: "About Us", path: "/about", desc: "Our purpose, story, leadership, and locations" },
        { title: "Contact Us", path: "/contact", desc: "Sales inquiries, phone, and office addresses" },
        { title: "Partner Network", path: "/partners", desc: "Programs for HR consultants and system integrators" },
        { title: "Careers", path: "/careers", desc: "Culture, principles, and open job opportunities" },
        { title: "Trust & Security", path: "/security", desc: "Encryption, access controls, and data protection" },
        { title: "Request a Demo", path: "/request-demo", desc: "Primary conversion page for live product walkthrough" },
        { title: "Thank You Confirmation", path: "/thank-you", desc: "Post-submission next steps timeline" },
      ],
    },
    {
      category: "Legal & Compliance",
      links: [
        { title: "Privacy Policy", path: "/privacy-policy", desc: "Customer and employee personal data protections" },
        { title: "Cookie Policy", path: "/cookie-policy", desc: "Tracking technologies and consent preferences" },
        { title: "Terms of Service", path: "/terms-of-service", desc: "Commercial subscription terms and conditions" },
        { title: "Data Processing Agreement (DPA)", path: "/data-processing-agreement", desc: "Data processing obligations under DPDPA / GDPR" },
        { title: "HTML Sitemap", path: "/sitemap", desc: "Complete directory of all indexable public pages" },
      ],
    },
  ];

  const breadcrumbs = [{ label: "HTML Sitemap" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <SEO
        title="HTML Sitemap | Complete Page Directory"
        description="Comprehensive index of all pages, features, solutions, resources, and legal terms on LattiumHR."
        canonicalPath="/sitemap"
      />

      <section className="sitemap-hero">
        <div className="container">
          <div className="product-hero-center">
            <span className="feature-badge">
              <Icon name="search" size={14} /> SITE DIRECTORY
            </span>
            <h1>HTML Sitemap</h1>
            <p>
              A complete, organized index of every published page, feature deep-dive, solution guide,
              and resource across the LattiumHR website.
            </p>
          </div>
        </div>
      </section>

      <section className="sitemap-content-section">
        <div className="container">
          <div className="sitemap-sections-stack">
            {sitemapSections.map((sec, sIdx) => (
              <div key={sIdx} className="sitemap-category-block">
                <h2>{sec.category}</h2>
                <div className="sitemap-links-grid">
                  {sec.links.map((link, lIdx) => (
                    <div key={lIdx} className="sitemap-link-card">
                      <Link to={link.path} className="sitemap-main-link">
                        <strong>{link.title}</strong>
                        <Icon name="arrow" size={14} />
                      </Link>
                      <p>{link.desc}</p>
                      <code>{link.path}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default SitemapPage;
