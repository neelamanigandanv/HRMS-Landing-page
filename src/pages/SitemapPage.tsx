import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Icon, { IconName } from "../components/ui/Icon";
import "./SitemapPage.css";

interface SitemapLink {
  title: string;
  path: string;
  desc: string;
  badge?: string;
}

interface SitemapCategory {
  id: string;
  category: string;
  icon: IconName;
  description: string;
  links: SitemapLink[];
}

export function SitemapPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const sitemapSections: SitemapCategory[] = [
    {
      id: "product",
      category: "Product & Core Modules",
      icon: "setup",
      description: "Modular HRMS architecture, unified workforce databases, and automated administration.",
      links: [
        { title: "Product Overview", path: "/product", desc: "All-in-one HRMS platform architecture and unified feature index", badge: "PLATFORM" },
        { title: "Employee Management", path: "/features/employee-management", desc: "Centralized employee profiles, digital onboarding, and lifecycle records", badge: "CORE" },
        { title: "Attendance Management", path: "/features/attendance-management", desc: "Mobile geofencing, facial check-in, and biometric turnstile integration", badge: "CORE" },
        { title: "Leave Management", path: "/features/leave-management", desc: "Custom leave types, accrual formulas, and multi-level approval workflows", badge: "CORE" },
        { title: "Payroll Engine & Tax", path: "/features/payroll-management", desc: "Statutory PF, ESI, PT, TDS deductions, and automated bank payout dispatches", badge: "CORE" },
        { title: "Asset Management", path: "/features/asset-management", desc: "Company hardware inventory, digital handover acknowledgments, and recovery", badge: "FEATURE" },
        { title: "Recruitment Pipeline", path: "/features/recruitment", desc: "Job postings, candidate tracking stages, interview scorecards, and offer letters", badge: "FEATURE" },
        { title: "Documents & Compliance", path: "/features/documents-compliance", desc: "Encrypted document vaults, digital signatures, and statutory audit registers", badge: "FEATURE" },
        { title: "Performance Management", path: "/features/performance-management", desc: "Quarterly OKRs, 360° appraisals, self-evaluations, and 9-box matrices", badge: "FEATURE" },
        { title: "Roles & Permissions", path: "/features/roles-permissions", desc: "Granular Role-Based Access Control (RBAC) and branch isolation policies", badge: "SECURITY" },
        { title: "Reports & Analytics", path: "/features/reports-analytics", desc: "Real-time workforce intelligence, headcount turnover, and payroll cost metrics", badge: "ANALYTICS" },
      ],
    },
    {
      id: "solutions",
      category: "Enterprise Solutions & Scales",
      icon: "briefcase",
      description: "Configured workforce solutions engineered for different organizational sizes and industry verticals.",
      links: [
        { title: "Solutions Overview", path: "/solutions", desc: "Comprehensive index of tailored organizational and audience workflows", badge: "SOLUTIONS" },
        { title: "Small Businesses (1–50)", path: "/solutions/small-businesses", desc: "Lean, automated HR and zero-defect payroll without institutional complexity", badge: "SCALE" },
        { title: "Mid-Sized Businesses (50–500)", path: "/solutions/mid-sized-businesses", desc: "Multi-branch policy governance, manager approvals, and scalable payroll", badge: "SCALE" },
        { title: "Enterprises (500+)", path: "/solutions/enterprises", desc: "High-volume payroll dispatches, tenant isolation, and guaranteed 99.99% SLAs", badge: "SCALE" },
        { title: "Industry Vertical Solutions", path: "/solutions/industries", desc: "Specialized workflows for Technology, Manufacturing, Retail, and Healthcare", badge: "VERTICALS" },
        { title: "For HR Operations Teams", path: "/solutions/hr-teams", desc: "Eliminate repetitive paperwork and automate employee lifecycle milestones", badge: "AUDIENCE" },
        { title: "For Finance & Payroll Teams", path: "/solutions/finance-teams", desc: "Zero-leakage payroll computations and instant statutory audit filing packages", badge: "AUDIENCE" },
        { title: "Multi-Location Businesses", path: "/solutions/multi-location", desc: "Branch-specific holiday calendars, shift rules, and central HQ intelligence", badge: "AUDIENCE" },
      ],
    },
    {
      id: "resources",
      category: "Resources, Guides & Handbooks",
      icon: "book-open",
      description: "Authoritative compliance playbooks, statutory handbooks, glossaries, and customer case studies.",
      links: [
        { title: "Statutory Compliance Handbook", path: "/guides/statutory-compliance-guide", desc: "Complete reference for Indian labor laws, EPF, ESIC, State PT, and Gratuity", badge: "HANDBOOK" },
        { title: "Payroll Management Handbook", path: "/guides/payroll-management-guide", desc: "Gross-to-net salary formulas, TDS withholding rules, and zero-defect bank SLAs", badge: "HANDBOOK" },
        { title: "Leave Policy Blueprint", path: "/guides/leave-management-guide", desc: "Enterprise leave categorization, carry-forward rules, and sandwich policies", badge: "HANDBOOK" },
        { title: "HR & Compliance Blog", path: "/resources/blog", desc: "Expert articles on labor regulations, biometric hardware, and retention strategies", badge: "INSIGHTS" },
        { title: "HRMS Terminology Glossary", path: "/resources/hrms-glossary", desc: "Comprehensive dictionary of 50+ statutory labor, payroll, and HRMS concepts", badge: "DICTIONARY" },
        { title: "Customer Case Studies", path: "/resources/case-studies", desc: "Real-world transformation stories from fast-scaling Indian enterprise clients", badge: "STORIES" },
        { title: "Frequently Asked Questions", path: "/faq", desc: "Answers regarding security, migration from legacy HRMS, and biometric devices", badge: "FAQ" },
        { title: "Help Center & Knowledge Base", path: "/help", desc: "Comprehensive tutorials, workflow walkthroughs, and technical articles", badge: "SUPPORT" },
        { title: "Getting Started Guide", path: "/help/getting-started", desc: "Step-by-step 4-stage implementation blueprint for swift onboarding", badge: "PLAYBOOK" },
      ],
    },
    {
      id: "company",
      category: "Company & Alliances",
      icon: "building",
      description: "Our organizational mission, leadership, careers, partner consulting tracks, and contact desks.",
      links: [
        { title: "Home Page", path: "/", desc: "LattiumHR homepage, core value propositions, and live software preview", badge: "HOME" },
        { title: "About Us & Vision", path: "/about", desc: "Our founding story, leadership principles, architecture standards, and values", badge: "COMPANY" },
        { title: "Partner Network & VARs", path: "/partners", desc: "Programs for HR consulting firms, system integrators, and software distributors", badge: "ALLIANCES" },
        { title: "Careers & Culture", path: "/careers", desc: "Operating principles, team perks, high autonomy, and current job milestones", badge: "CAREERS" },
        { title: "Contact Sales Desk", path: "/contact", desc: "Direct sales phone lines, Mumbai headquarters address, and consultation desk", badge: "CONTACT" },
        { title: "Customer Support & SLAs", path: "/support", desc: "Guaranteed support response SLAs, escalation matrices, and ticket submission", badge: "SUPPORT" },
        { title: "Request a Live Demo", path: "/request-demo", desc: "Book an interactive, tailored walkthrough with our senior solution architects", badge: "DEMO" },
        { title: "Submission Confirmation", path: "/thank-you", desc: "Next-steps timeline and verification details following inquiry submission", badge: "PORTAL" },
      ],
    },
    {
      id: "legal",
      category: "Trust, Security & Legal Directives",
      icon: "shield",
      description: "Data privacy commitments, domestic data residency, ISO 27001 security, and commercial agreements.",
      links: [
        { title: "Trust & Enterprise Security", path: "/security", desc: "Tier-III domestic data hosting, AES-256 encryption, and InfoSec verification", badge: "SECURITY" },
        { title: "Privacy Policy", path: "/privacy-policy", desc: "Zero data selling commitments, DPDP Act 2023 adherence, and data rights", badge: "LEGAL" },
        { title: "Terms of Service", path: "/terms-of-service", desc: "Commercial SaaS master terms, 99.99% uptime SLA, and customer data ownership", badge: "LEGAL" },
        { title: "Cookie Policy", path: "/cookie-policy", desc: "Verified technical cookie manifest, browser controls, and zero ad-tracking", badge: "LEGAL" },
        { title: "Data Processing Agreement (DPA)", path: "/data-processing-agreement", desc: "Contractual technical safeguards and sub-processor governance under DPDP Act", badge: "LEGAL" },
        { title: "HTML Sitemap", path: "/sitemap", desc: "Complete public directory of all indexable pages across the platform", badge: "DIRECTORY" },
      ],
    },
  ];

  const totalLinksCount = useMemo(() => {
    return sitemapSections.reduce((acc, sec) => acc + sec.links.length, 0);
  }, [sitemapSections]);

  // Filter links based on search query and category tab
  const filteredSections = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return sitemapSections
      .filter((sec) => selectedCategory === "all" || sec.id === selectedCategory)
      .map((sec) => {
        if (!query) return sec;

        const matchingLinks = sec.links.filter(
          (link) =>
            link.title.toLowerCase().includes(query) ||
            link.desc.toLowerCase().includes(query) ||
            link.path.toLowerCase().includes(query) ||
            (link.badge && link.badge.toLowerCase().includes(query))
        );

        return {
          ...sec,
          links: matchingLinks,
        };
      })
      .filter((sec) => sec.links.length > 0);
  }, [sitemapSections, searchTerm, selectedCategory]);

  const matchingCount = useMemo(() => {
    return filteredSections.reduce((acc, sec) => acc + sec.links.length, 0);
  }, [filteredSections]);

  const breadcrumbs = [{ label: "HTML Sitemap" }];

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA={true}>
      <SEO
        title="HTML Sitemap & Complete Page Directory | LattiumHR"
        description="Navigate every published page, feature deep-dive, industry solution, statutory compliance handbook, and legal policy on LattiumHR."
        canonicalPath="/sitemap"
      />

      <div className="sitemap-page">
        {/* ==================================================================
            1. HERO SECTION (Centered Radial Gradient, Search & Quick Filters)
            ================================================================== */}
        <section className="sitemap-hero" aria-labelledby="sitemap-title">
          <div className="sitemap-container">
            <div className="sitemap-hero-center">
              <span className="sitemap-hero-eyebrow">
                <Icon name="search" size={13} /> COMPLETE WEB DIRECTORY • UPDATED OCTOBER 2026
              </span>

              <h1 id="sitemap-title" className="sitemap-hero-title">
                HTML <span className="sitemap-hero-title-highlight">Sitemap &amp; Directory</span>
              </h1>

              <p className="sitemap-hero-subtitle">
                A structured, indexable guide to every public feature module, enterprise solution,
                statutory compliance handbook, customer resource, and legal policy across the LattiumHR ecosystem.
              </p>

              {/* Interactive Search Bar */}
              <div className="sitemap-search-wrapper">
                <div className="sitemap-search-input-box">
                  <Icon name="search" size={18} className="sitemap-search-icon" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search 40+ pages by title, keyword, feature, or route path..."
                    className="sitemap-search-input"
                    aria-label="Search sitemap pages"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="sitemap-search-clear"
                      title="Clear search query"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Category Quick Filter Pills */}
              <div className="sitemap-pills-row" role="tablist" aria-label="Sitemap Category Filter">
                <button
                  type="button"
                  className={`sitemap-category-pill ${selectedCategory === "all" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("all")}
                >
                  All Categories ({totalLinksCount})
                </button>
                {sitemapSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    className={`sitemap-category-pill ${selectedCategory === sec.id ? "active" : ""}`}
                    onClick={() => setSelectedCategory(sec.id)}
                  >
                    <Icon name={sec.icon} size={13} /> {sec.category.split(" ")[0]} ({sec.links.length})
                  </button>
                ))}
              </div>

              {/* Verification & Architecture Stats */}
              <div className="sitemap-stats-row">
                <span className="sitemap-stat-item">
                  <Icon name="check" size={13} /> {matchingCount} Indexable URLs
                </span>
                <span className="sitemap-stat-item">
                  <Icon name="check" size={13} /> 5 Platform Categories
                </span>
                <span className="sitemap-stat-item">
                  <Icon name="check" size={13} /> 100% Canonical Verified
                </span>
                <span className="sitemap-stat-item">
                  <Icon name="check" size={13} /> Domestic Tier-III Hosted
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. BELOW SECTIONS & PREMIUM CARDS
            ================================================================== */}
        <section className="sitemap-content-section" aria-label="Sitemap Links Directory">
          <div className="sitemap-container">
            {filteredSections.length === 0 ? (
              <div className="sitemap-empty-search">
                <div className="sitemap-empty-icon">
                  <Icon name="search" size={26} />
                </div>
                <h3 className="sitemap-empty-title">No Matching Pages Found</h3>
                <p className="sitemap-empty-text">
                  We couldn&apos;t find any page matching &ldquo;{searchTerm}&rdquo;. Try another keyword or reset the filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="sitemap-reset-search-btn"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="sitemap-category-stack">
                {filteredSections.map((sec) => (
                  <div key={sec.id} id={sec.id} className="sitemap-category-block">
                    <div className="sitemap-category-header">
                      <div className="sitemap-category-header-left">
                        <div className="sitemap-category-icon-circle">
                          <Icon name={sec.icon} size={22} />
                        </div>
                        <div className="sitemap-category-title-wrap">
                          <h2>{sec.category}</h2>
                          <p className="sitemap-category-desc">{sec.description}</p>
                        </div>
                      </div>
                      <span className="sitemap-category-count-badge">
                        {sec.links.length} {sec.links.length === 1 ? "Page" : "Pages"}
                      </span>
                    </div>

                    <div className="sitemap-links-grid">
                      {sec.links.map((link, lIdx) => (
                        <Link
                          key={lIdx}
                          to={link.path}
                          className="sitemap-premium-card"
                          title={`Navigate to ${link.title}`}
                        >
                          <div>
                            <div className="sitemap-card-top">
                              <h3 className="sitemap-card-title">{link.title}</h3>
                              <span className="sitemap-card-arrow">
                                <Icon name="arrow" size={13} />
                              </span>
                            </div>

                            <p className="sitemap-card-desc">{link.desc}</p>
                          </div>

                          <div className="sitemap-card-footer">
                            <code className="sitemap-card-path">{link.path}</code>
                            <span className="sitemap-card-visit-hint">
                              Open <Icon name="arrow" size={11} />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default SitemapPage;
