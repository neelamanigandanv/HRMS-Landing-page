import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useDemoModal } from "../context/DemoModalContext";
import "./IndustrySolutionsPage.css";

interface FAQItem {
  q: string;
  a: string;
}

interface ChallengeItem {
  title: string;
  desc: string;
}

interface IndustryBlock {
  id: string;
  chipLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  iconType: "chart" | "health" | "factory" | "hospitality" | "tech" | "education" | "agency";
  challenges: ChallengeItem[];
  whyChooseTitle: string;
  solutions: string[];
  ctaText: string;
  bgImage: string;
  bgAlt: string;
  fgImage: string;
  fgAlt: string;
}

export function IndustrySolutionsPage() {
  const { openDemoModal } = useDemoModal();
  const [activeChip, setActiveChip] = useState<string>("technology");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [turnedCardIdx, setTurnedCardIdx] = useState<number | null>(null);

  // 7 Industry Showcase Blocks in requested order:
  // 1. Technology, 2. Agency, 3. Manufacturing, 4. Healthcare, 5. Hospitality, 6. Education, 7. Retail
  const industries: IndustryBlock[] = [
    {
      id: "technology",
      chipLabel: "Technology",
      eyebrow: "Information Technology & Software Engineering",
      title: "Sprint Cycles, Flexible Bands, and Global Engineering Teams.",
      description:
        "Modern IT and software organizations need agile operations that balance engineer autonomy with transparent time accounting. LattiumHR supports sprint cycles, global developer workbands, and automated comp-offs with zero friction.",
      iconType: "tech",
      challenges: [
        {
          title: "Distributed Hybrid Bands.",
          desc: "Global developer teams working across flexible bands and timezones.",
        },
        {
          title: "On-Call Roster Fatigue.",
          desc: "Balancing weekend production incident rotations and compensatory rest.",
        },
      ],
      whyChooseTitle: "How LattiumHR Helps Technology Teams",
      solutions: [
        "Trust-based web and mobile timer with optional IP-bound rules",
        "Automated on-call allowances, night shift differentials, and comp-offs",
        "Granular sabbatical tracking, leave encashments, and equity vesting data",
      ],
      ctaText: "Configure for Technology",
      bgImage: "/images/skyline-hq.jpg",
      bgAlt: "Contemporary tech agency headquarters and glass corporate high-rise",
      fgImage: "/images/industry-tech.jpg",
      fgAlt: "Tech software engineering team collaborating on sprint goals and system architecture",
    },
    {
      id: "agency",
      chipLabel: "Agency",
      eyebrow: "Creative, Marketing & Digital Client Agencies",
      title: "Client Retainers, Billable Time, and Dynamic Project Staffing.",
      description:
        "Digital agencies juggle fast-moving client campaigns, multi-account retainers, and cross-functional teams of designers, strategists, and freelance specialists. LattiumHR connects project hours to payroll seamlessly.",
      iconType: "agency",
      challenges: [
        {
          title: "Billable vs Retainer Gaps.",
          desc: "Discrepancies between logged client hours and actual monthly retainer limits.",
        },
        {
          title: "Freelancer & Contractor Ingestion.",
          desc: "Scattered variable day-rates, manual invoice collation, and onboarding lag.",
        },
      ],
      whyChooseTitle: "How LattiumHR Helps Agencies",
      solutions: [
        "Project-tagged attendance providing real-time client billability visibility",
        "Automated contractor day-rate payouts and rapid digital NDA onboarding",
        "Department resource forecasting to prevent campaign crunch and burnout",
      ],
      ctaText: "Configure for Agencies",
      bgImage: "/images/work-process-team.jpg",
      bgAlt: "Modern creative studio workspace with collaborating designers and account leads",
      fgImage: "/images/hero-employee-directory-team.jpg",
      fgAlt: "Digital agency creative team reviewing campaign milestones and resource allocation on tablet",
    },
    {
      id: "manufacturing",
      chipLabel: "Manufacturing",
      eyebrow: "Industrial Manufacturing & Machine Bays",
      title: "Shopfloor Shifts, Biometric Gates, and Overtime Precision.",
      description:
        "Manufacturing plants run on multi-tier shifts, contractor labor pools, and strict statutory overtime rules. LattiumHR links biometric turnstiles directly to master payroll rolls without monthly collation delays.",
      iconType: "factory",
      challenges: [
        {
          title: "Multi-Tier Plant Shifts.",
          desc: "Managing shifts A, B, C, and general shifts across machine bays.",
        },
        {
          title: "Overtime Discrepancies.",
          desc: "Manual punch reconciliation causing disputes and payroll lag.",
        },
      ],
      whyChooseTitle: "How LattiumHR Helps Manufacturing",
      solutions: [
        "Real-time biometric face and RFID sync directly from gates",
        "Automated overtime calculation with rule-based OT rates",
        "Daily contractor headcounts and ready-to-file factory registers",
      ],
      ctaText: "Configure for Manufacturing",
      bgImage: "/images/multibranch-global.jpg",
      bgAlt: "State-of-the-art manufacturing plant and industrial facility",
      fgImage: "/images/industry-manufacturing.jpg",
      fgAlt: "Factory plant supervisor managing shift rosters on shop floor",
    },
    {
      id: "healthcare",
      chipLabel: "Healthcare",
      eyebrow: "24/7 Healthcare, Clinics & Emergency Wards",
      title: "Rotational Shifts, Ward Coverage, and Zero Compliance Gaps.",
      description:
        "Healthcare demands round-the-clock staffing where a single scheduling gap compromises patient care. LattiumHR protects critical ward ratios with automated conflict alerts, mandatory rest locks, and instant vacancy broadcasting.",
      iconType: "health",
      challenges: [
        {
          title: "Complex 24/7 Rotations.",
          desc: "Rotating night and on-call nurse rosters prone to burnouts.",
        },
        {
          title: "Critical Ward Coverage.",
          desc: "Patient-to-nurse ratio risks when emergency absences strike.",
        },
      ],
      whyChooseTitle: "How LattiumHR Helps Healthcare",
      solutions: [
        "Smart clinical ward rota with automated conflict alerts",
        "Emergency vacancy broadcast to fill empty shifts in minutes",
        "Statutory resting interval locks and fair overtime calculations",
      ],
      ctaText: "Configure for Healthcare",
      bgImage: "/images/solution-enterprise.jpg",
      bgAlt: "Modern glass hospital clinical building and medical center",
      fgImage: "/images/industry-healthcare.jpg",
      fgAlt: "Clinical charge nurse reviewing rotational night rota on tablet",
    },
    {
      id: "hospitality",
      chipLabel: "Hospitality",
      eyebrow: "Hotels, Banquet Venues & Restaurants",
      title: "Split Shifts, Banquet Spikes, and Frontline Crew Coordination.",
      description:
        "Hospitality operations navigate split lunch and dinner rosters, variable banquet spikes, and tip point distributions. LattiumHR coordinates dining rooms, kitchens, and seasonal banquet crews with zero confusion.",
      iconType: "hospitality",
      challenges: [
        {
          title: "Split-Shift Complexity.",
          desc: "Scheduling separate lunch and dinner service periods.",
        },
        {
          title: "Variable Tips & Points.",
          desc: "Managing service charge pools and hourly pay on spreadsheets.",
        },
      ],
      whyChooseTitle: "How LattiumHR Helps Hospitality",
      solutions: [
        "Native split-shift management with dual-punch clock-in tracking",
        "Flexible payroll components for tip pools and late kitchen pay",
        "Crew mobile self-service for 1-tap peer shift swaps and sign-offs",
      ],
      ctaText: "Configure for Hospitality",
      bgImage: "/images/work-process-team.jpg",
      bgAlt: "Upscale hospitality restaurant dining room and hotel venue",
      fgImage: "/images/industry-hospitality.jpg",
      fgAlt: "Restaurant and banquet manager managing split shifts on tablet",
    },
    {
      id: "education",
      chipLabel: "Education",
      eyebrow: "Universities, Colleges & Academic Institutes",
      title: "Academic Terms, Faculty Hours, and Multi-Staff Rules.",
      description:
        "Educational institutions operate on semester cycles, lecture timetables, and distinct employment terms for teaching professors versus administrative staff. LattiumHR unifies academic operations seamlessly.",
      iconType: "education",
      challenges: [
        {
          title: "Dual Policy Structures.",
          desc: "Different leave and vacation rules for faculty vs admin staff.",
        },
        {
          title: "Visiting Faculty Honorariums.",
          desc: "Calculating hourly lecture payouts across departments manually.",
        },
      ],
      whyChooseTitle: "How LattiumHR Helps Education",
      solutions: [
        "Semester-aligned academic calendars with custom break lists",
        "Differentiated leave accruals for vacation faculty vs admin staff",
        "Automated lecture and exam duty honorarium calculation sheets",
      ],
      ctaText: "Configure for Education",
      bgImage: "/images/about-team-hero.jpg",
      bgAlt: "Prestigious academic university campus library and lecture quad",
      fgImage: "/images/industry-education.jpg",
      fgAlt: "University dean and academic administrator scheduling faculty timetables",
    },
    {
      id: "retail",
      chipLabel: "Retail",
      eyebrow: "Multi-Store Retail & Hourly Workforces",
      title: "Peak Hours, Store Rosters, and Seasonal Staff Made Effortless.",
      description:
        "Retail store chains operate on dynamic footfall peaks, weekend rushes, and rapid employee turnover. LattiumHR unifies multi-outlet scheduling, smartphone check-ins, and automated payroll readiness under one platform.",
      iconType: "chart",
      challenges: [
        {
          title: "Weekend Demand Spikes.",
          desc: "Sudden footfall fluctuations across mall and high-street outlets.",
        },
        {
          title: "High Seasonal Turnover.",
          desc: "Repetitive onboarding paperwork and rapid exit clearances.",
        },
      ],
      whyChooseTitle: "How LattiumHR Helps Retail",
      solutions: [
        "Visual shift planner with drag-and-drop rosters & peer swaps",
        "10-minute digital smartphone onboarding for store staff",
        "Centralized geofenced attendance tracking across all outlets",
      ],
      ctaText: "Configure for Retail",
      bgImage: "/images/branch-regional.jpg",
      bgAlt: "Modern retail store glass facade and shopping high-street",
      fgImage: "/images/industry-retail.jpg",
      fgAlt: "Retail store manager scheduling store staff roster on digital tablet",
    },
  ];

  // Helper to render line-art SVGs for the challenge sub-column
  const renderIndustryIcon = (type: string) => {
    switch (type) {
      case "chart":
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
            <path d="M4 14l6-6 4 4 6-6" />
          </svg>
        );
      case "agency":
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        );
      case "health":
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        );
      case "factory":
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20M6 20V8l6 4V8l6 4V4h4v16" />
          </svg>
        );
      case "hospitality":
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
          </svg>
        );
      case "tech":
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        );
      case "education":
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Common Core Features (One Platform, Every Industry — 6 Pillars matching reference image)
  const coreFeatures = [
    {
      icon: "attendance",
      title: "Attendance",
      summary: "Biometric, Geofence & Flexible Punch",
      desc: "Face scanners, RFID plant gates, GPS mobile boundaries, and web timers feed one real-time attendance ledger.",
      iconColor: "#802B5B",
    },
    {
      icon: "leave",
      title: "Leave",
      summary: "Custom Quotas & Comp-Off Rules",
      desc: "Configure vacation periods, earned leave accruals, casual days, and multi-tier approval flows without paperwork.",
      iconColor: "#0284c7",
    },
    {
      icon: "payroll",
      title: "Payroll",
      summary: "Flexible Formula & Multi-Wage Engine",
      desc: "Run accurate monthly payrolls for hourly staff, salaried workers, split shifts, and overtime in 3 simple steps.",
      iconColor: "#0d9488",
    },
    {
      icon: "shield",
      title: "Compliance",
      summary: "Statutory Rules, PF/ESI & Audit Trails",
      desc: "Pre-configured calculations for PF, ESI, TDS, and Professional Tax, with downloadable government filing sheets.",
      iconColor: "#2563eb",
    },
    {
      icon: "reports",
      title: "Reports",
      summary: "Headcount, Shift Variance & Cost Exports",
      desc: "Decision-grade operational dashboards detailing shift attendance, department OT costs, and workforce trends.",
      iconColor: "#7c3aed",
    },
    {
      icon: "users",
      title: "Self-Service",
      summary: "Mobile Swaps, Approvals & Payslips",
      desc: "Empower frontline and desk workers to apply for leaves, swap shifts with peers, and download digital payslips with one tap on mobile.",
      iconColor: "#0891b2",
    },
  ];

  // Flexible by Design 4 Pillars matching Reference Image
  const flexibilityPillars = [
    {
      icon: "clock",
      title: "Custom Shifts & Rosters",
      chipLabel: "Shift Engine",
      image: "/images/att-block-overtime.jpg",
      tagline: "Shifts that match your operational rhythm",
      points: [
        "24/7 continuous rotations & graveyard shifts",
        "Split shifts with custom inter-shift break windows",
        "Grace periods, late deductions & half-day locks",
        "Mandatory resting intervals between consecutive shifts",
      ],
    },
    {
      icon: "calendar",
      title: "Custom Leave Types",
      chipLabel: "Leave Policies",
      image: "/images/leave-block-approval.jpg",
      tagline: "Policies tailored to every employment tier",
      points: [
        "Vacation vs non-vacation staff leave differentiation",
        "Automated comp-off granting for weekend overtime",
        "Custom rollover caps, encashments & probations",
        "Branch-specific and regional festival holiday lists",
      ],
    },
    {
      icon: "finance",
      title: "Custom Pay Structures",
      chipLabel: "Payroll Engine",
      image: "/images/reports-block-payroll.jpg",
      tagline: "Every wage, allowance, and bonus configured",
      points: [
        "Hourly wages, daily rates & fixed salaried salaries",
        "Night shift differentials & hazardous work allowances",
        "Tip pooling, service charges & festive bonuses",
        "Contractor billing sheets & vendor headcounts",
      ],
    },
    {
      icon: "role",
      title: "Role-Based Access",
      chipLabel: "Security Matrix",
      image: "/images/roles-block-admin.jpg",
      tagline: "Granular controls for every managerial level",
      points: [
        "Store managers view only their local branch roster",
        "Plant supervisors approve overtime for their bay only",
        "Department heads approve leaves with 1 tap on mobile",
        "HR & finance hold encrypted master payroll controls",
      ],
    },
  ];

  // Testimonials across varied industries
  const testimonials = [
    {
      quote:
        "Managing 18 retail outlets used to mean 18 different WhatsApp groups and endless roster disputes every Friday. LattiumHR unified our store shifts, digital onboarding, and geofenced punches in under two weeks.",
      author: "Priya Raman",
      role: "Operations Head",
      company: "Vesta Apparel & Retail",
      industry: "Retail • 18 Outlets • 140 Staff",
    },
    {
      quote:
        "In a 24-bed critical care hospital, nursing shift gaps aren't just inconvenient — they affect patient care. The rotational rota, auto conflict alerts, and statutory rest-hour locks give our clinical team total peace of mind.",
      author: "Dr. Arun Sundaram",
      role: "Medical Director",
      company: "MedCare Multi-Specialty Clinics",
      industry: "Healthcare • 3 Centers • 90 Staff",
    },
    {
      quote:
        "Direct biometric sync from our factory gates into payroll saved us 4 days of manual overtime calculation every single month. We have zero OT disputes now and passed our factory labor audit without a single flag.",
      author: "Rajeshwaran M.",
      role: "Plant General Manager",
      company: "Apex Precision Forgings",
      industry: "Manufacturing • 320 Factory Workers",
    },
  ];

  // FAQs
  const faqs: FAQItem[] = [
    {
      q: "Can I set up custom shifts?",
      a: "Yes, absolutely. LattiumHR supports virtually any shift configuration imaginable. You can create 24/7 rotating night and day rosters, split shifts (such as separate lunch and dinner service shifts in restaurants), flexi-hours with mandatory core hours, and define custom grace periods, break intervals, and minimum rest hours between consecutive shifts.",
    },
    {
      q: "My industry isn’t listed, will it work?",
      a: "Yes! While we highlight six common sectors on this page, LattiumHR is built on a highly modular engine. Organizations in logistics, construction, facility management, security services, non-profits, and consulting run daily on LattiumHR. If your team tracks hours, takes leaves, receives payroll, and requires role-based access, LattiumHR can be configured to fit your exact workflow.",
    },
    {
      q: "Can I manage multiple locations?",
      a: "Yes. LattiumHR is architected specifically for multi-location businesses. You can manage multiple retail stores, clinic branches, manufacturing plants, or regional offices under a single unified company account. Each branch can have its own local geofencing radius, shift schedules, holiday lists, and branch managers, while headquarters retains instant aggregate visibility.",
    },
    {
      q: "Can we connect our existing biometric or RFID plant machines?",
      a: "Yes. LattiumHR integrates smoothly with standard biometric fingerprint readers, facial recognition terminals, and RFID turnstile barriers. Punches sync directly to the cloud in real-time, eliminating manual pen-and-paper registers and the headache of downloading CSV files at month-end.",
    },
    {
      q: "How long does industry-specific setup take?",
      a: "Most organizations launch their customized industry configuration within 5 to 10 business days. Our dedicated onboarding specialists help import your employee directory, configure your specific shift rotas, and verify your payroll components before your team goes live.",
    },
  ];

  // Scroll to industry section on chip click
  const scrollToIndustry = (id: string) => {
    setActiveChip(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140; // account for navbar + sticky chips bar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Scroll to sticky bar on hero CTA
  const scrollToChips = () => {
    const element = document.getElementById("industry-tabs-bar");
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Auto-update active chip as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = industries.length - 1; i >= 0; i--) {
        const block = document.getElementById(industries[i].id);
        if (block && block.offsetTop <= scrollPos) {
          setActiveChip(industries[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [industries]);

  return (
    <div className="industry-solutions-page">
      <SEO
        title="Industry HRMS Solutions | Tailored Workforce Operations | LattiumHR"
        description="Shifts, rotations, seasonal teams, or office hours — LattiumHR adapts to how your industry works. Explore tailored workflows for Retail, Healthcare, Manufacturing, Hospitality, IT, and Education."
      />
      <Navbar />

      {/* ======================================================================
          01 · HERO SECTION
          ====================================================================== */}
      <section className="ind-hero-section">
        <div className="container">
          <div className="ind-hero-eyebrow">
            <span className="ind-hero-sparkle">✦</span>
            <span>TAILORED WORKFORCE OPERATIONS</span>
            <span className="ind-hero-sparkle">✦</span>
          </div>

          <h1 className="ind-hero-title">
            HR That Fits <span className="ind-glow-text">Every Industry.</span>
          </h1>

          <p className="ind-hero-subline">
            Shifts, rotations, seasonal teams, or office hours, LattiumHR adapts to how your industry works.
          </p>

          <div className="ind-hero-ctas">
            <button
              onClick={() => openDemoModal()}
              className="ind-btn-primary"
              id="hero-request-demo-btn"
            >
              <span>Request a Demo</span>
              <Icon name="arrow" />
            </button>
            <button
              onClick={scrollToChips}
              className="ind-btn-secondary"
              id="hero-explore-industries-btn"
            >
              <span>Explore Industries ↓</span>
            </button>
          </div>

          {/* Quick Stats / Highlights Strip */}
          <div className="ind-hero-stats-strip">
            <div className="ind-stat-card">
              <span className="ind-stat-val">6+</span>
              <span className="ind-stat-lbl">Industry Presets</span>
            </div>
            <div className="ind-stat-divider"></div>
            <div className="ind-stat-card">
              <span className="ind-stat-val">100%</span>
              <span className="ind-stat-lbl">Configurable Shifts</span>
            </div>
            <div className="ind-stat-divider"></div>
            <div className="ind-stat-card">
              <span className="ind-stat-val">Multi-Site</span>
              <span className="ind-stat-lbl">Central Control</span>
            </div>
            <div className="ind-stat-divider"></div>
            <div className="ind-stat-card">
              <span className="ind-stat-val">&lt; 14 Days</span>
              <span className="ind-stat-lbl">Rapid Deployment</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          02 · 6 INDUSTRY SHOWCASE BLOCKS
          Matching the User Reference Image:
          - Dark navy canvas
          - Warm golden eyebrow
          - Bold white heading + thin horizontal line
          - Context description
          - 2-Column split: Challenges (Icon + 2 items) & Why LattiumHR (3 checkmarks) with vertical line
          - Vibrant solid button
          - Right-side dual overlapping image composition (Background architecture + Foreground people)
          - Alternates Left/Right layout
          ====================================================================== */}
      <section className="ind-blocks-wrapper" id="industry-blocks-section">
        <div className="container">
          {/* Section 02 Heading: Eyebrow, Title */}
          <div className="ind-section-intro text-center ind-blocks-section-intro">
            <div className="ind-eyebrow-chip">✦ TAILORED WORKFORCE OPERATIONS ✦</div>
            <h2 className="ind-section-title">Engineered for the Realities of Your Sector.</h2>
          </div>

          {/* Industry Filter Tabs Bar (Full Width, Centered, Visible on One Line) */}
          <div className="ind-jump-tabs-bar" id="industry-tabs-bar" aria-label="Industry Solutions Filter">
            <div className="ind-chips-scroll-container">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => scrollToIndustry(ind.id)}
                  className={`ind-chip-btn ${activeChip === ind.id ? "active" : ""}`}
                  id={`chip-${ind.id}`}
                  aria-current={activeChip === ind.id ? "true" : undefined}
                >
                  <span className="ind-chip-indicator"></span>
                  <span className="ind-chip-text">{ind.chipLabel}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ind-blocks-list">
            {industries.map((ind, index) => {
              const isEven = index % 2 === 0;
              return (
                <article
                  key={ind.id}
                  id={ind.id}
                  className={`ind-dark-showcase-card ${isEven ? "layout-content-left" : "layout-content-right"}`}
                >
                  {/* Content Column */}
                  <div className="ind-dark-content-col">
                    <div className="ind-dark-eyebrow">{ind.eyebrow}</div>
                    <h2 className="ind-dark-title">{ind.title}</h2>
                    <div className="ind-dark-divider"></div>
                    <p className="ind-dark-description">{ind.description}</p>

                    {/* 2-Column Split: Challenges (Left) vs Why LattiumHR (Right) */}
                    <div className="ind-dark-split-grid">
                      {/* Sub-column 1: Common Challenges (Left) */}
                      <div className="ind-dark-subcol ind-challenges-subcol">
                        <div className="ind-challenges-main">
                          <div className="ind-challenge-col-head">
                            <div className="ind-subcol-icon-box">
                              {renderIndustryIcon(ind.iconType)}
                            </div>
                            <h3 className="ind-challenge-heading">Key Industry Challenges</h3>
                          </div>
                          <div className="ind-subcol-items">
                            {ind.challenges.map((c, cIdx) => (
                              <div key={cIdx} className="ind-challenge-point">
                                <h4 className="ind-challenge-title">{c.title}</h4>
                                <p className="ind-challenge-desc">{c.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button placed in left sub-column, horizontally straight to the 3rd LattiumHR help point */}
                        <div className="ind-dark-actions">
                          <button
                            onClick={() =>
                              openDemoModal({
                                title: `Request a Demo for ${ind.chipLabel}`,
                                defaultInterest: ind.chipLabel,
                              })
                            }
                            className="ind-dark-cta-btn"
                            id={`btn-demo-${ind.id}`}
                          >
                            <span>{ind.ctaText}</span>
                          </button>
                        </div>
                      </div>

                      {/* Sub-column 2: Why Choose LattiumHR (with vertical divider line) */}
                      <div className="ind-dark-subcol ind-why-subcol">
                        <h3 className="ind-why-heading">{ind.whyChooseTitle}</h3>
                        <ul className="ind-why-list">
                          {ind.solutions.map((s, sIdx) => (
                            <li key={sIdx} className="ind-why-item">
                              <span className="ind-why-check">✓</span>
                              <span className="ind-why-text">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Overlapping Dual-Visual Column */}
                  <div className="ind-dark-visual-col">
                    <div className="ind-dual-visual-stage">
                      {/* Background architectural/environment photo */}
                      <div className="ind-visual-bg-frame">
                        <img
                          src={ind.bgImage}
                          alt={ind.bgAlt}
                          className="ind-visual-bg-img"
                          loading="lazy"
                        />
                      </div>
                      {/* Foreground overlapping photo of team/manager with technology */}
                      <div className="ind-visual-fg-frame">
                        <img
                          src={ind.fgImage}
                          alt={ind.fgAlt}
                          className="ind-visual-fg-img"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
          04 · ONE PLATFORM, EVERY INDUSTRY (Core Features Strip)
          "thani product illa, same strong platform"
          ====================================================================== */}
      <section className="ind-core-platform-section">
        <div className="container">
          <div className="ind-section-intro text-center">
            <div className="ind-eyebrow-chip">✦ UNIFIED FOUNDATION ✦</div>
            <h2 className="ind-section-title">One Platform, Every Industry.</h2>
            <p className="ind-section-subtitle">
              Not a patchwork of separate, disconnected products. LattiumHR gives you one rock-solid core
              platform with flexible rules that match your industry’s day-to-day operations.
            </p>
          </div>

          <div className="ind-core-strip-grid">
            {coreFeatures.map((feat, fIdx) => (
              <div key={fIdx} className="ind-core-feature-card">
                <div className="ind-core-icon-ring-wrap">
                  <div className="ind-core-icon-ring">
                    <Icon name={feat.icon as any} size={35} />
                  </div>
                  <span className="ind-core-ring-dot" aria-hidden="true" />
                </div>
                <h3 className="ind-core-card-title">{feat.title}</h3>
                <p className="ind-core-card-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          05 · CTA BOX (Mid-Page Tailored Consultation)
          ====================================================================== */}
      <section className="ind-mid-cta-section">
        <div className="container">
          <div className="ind-mid-cta-card">
            <div className="ind-mid-cta-content">
              <span className="ind-mid-tag">INTERACTIVE CONSULTATION</span>
              <h2 className="ind-mid-title">
                Wondering how your specific shift or roster rules will work?
              </h2>
              <p className="ind-mid-desc">
                Schedule a 20-minute tailored walkthrough. Our workforce specialists will show you exactly
                how LattiumHR configures for your industry’s shifts, attendance hardware, and pay structures.
              </p>
              <div className="ind-mid-actions">
                <button onClick={() => openDemoModal()} className="ind-btn-primary" id="mid-cta-demo-btn">
                  <span>Request a Tailored Demo</span>
                  <Icon name="arrow" />
                </button>
                <Link to="/contact-sales" className="ind-btn-secondary-white">
                  <span>Speak with a Specialist</span>
                </Link>
              </div>
            </div>
            <div className="ind-mid-cta-badge-col">
              <div className="ind-mid-feature-item">
                <Icon name="check" size={16} />
                <span>Live screen walkthrough of your shifts</span>
              </div>
              <div className="ind-mid-feature-item">
                <Icon name="check" size={16} />
                <span>Zero obligation & custom policy review</span>
              </div>
              <div className="ind-mid-feature-item">
                <Icon name="check" size={16} />
                <span>Dedicated deployment timeline estimate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          06 · ZERO-CODE CUSTOMIZATION (Interactive 3D Turn Cards)
          Matching Reference Image:
          - Front Face: Sunset peach-to-plum gradient with 3D illustration, category badge, bold title
          - Back Face: Dark navy/plum turn card with detailed keypoints, cream dot, purple CTA button
          - Flips / turns on hover (and tap on mobile)
          ====================================================================== */}
      <section className="ind-flexibility-section" id="customization">
        <div className="container">
          <div className="ind-section-intro text-center">
            <div className="ind-eyebrow-chip">✦ ZERO-CODE CUSTOMIZATION ✦</div>
            <h2 className="ind-section-title">Flexible by Design: Configured to How You Work.</h2>
            <p className="ind-section-subtitle">
              You shouldn't force your operations into rigid software templates. Configure custom shifts,
              leave types, pay structures, and role permissions with zero code.
            </p>
          </div>

          <div className="ind-turn-cards-grid">
            {flexibilityPillars.map((pil, pIdx) => {
              const isTurned = turnedCardIdx === pIdx;
              return (
                <div
                  key={pIdx}
                  className={`ind-turn-card-wrapper ${isTurned ? "is-turned" : ""}`}
                  onClick={() => setTurnedCardIdx(isTurned ? null : pIdx)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${pil.title} - click to toggle details`}
                >
                  <div className="ind-turn-card-inner">
                    {/* Front Face: Clean Light Card with 3D Illustration */}
                    <div className="ind-turn-card-front">
                      <div className="ind-turn-front-media">
                        <img
                          src={pil.image}
                          alt={pil.title}
                          className="ind-turn-front-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="ind-turn-front-content">
                        <span className="ind-turn-pill-badge">{pil.chipLabel}</span>
                        <h3 className="ind-turn-title">{pil.title}</h3>
                        <span className="ind-turn-flip-hint">Hover or tap to view rules ↻</span>
                      </div>
                    </div>

                    {/* Back Face (Turned): Sleek Light Back with Detailed Keypoints */}
                    <div className="ind-turn-card-back">
                      <div className="ind-turn-back-top">
                        <span className="ind-turn-back-badge">{pil.chipLabel}</span>
                        <h4 className="ind-turn-back-title">{pil.title}</h4>
                        <p className="ind-turn-tagline">{pil.tagline}</p>
                        <ul className="ind-turn-keypoints">
                          {pil.points.map((pt, ptIdx) => (
                            <li key={ptIdx} className="ind-turn-keypoint-item">
                              <span className="ind-turn-check">✓</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
          07 · CUSTOMER TESTIMONIALS (Matching Home Page Structure)
          ====================================================================== */}
      <section className="proof-section" id="customers">
        <div className="container">
          <SectionHeading
            eyebrow="CUSTOMER STORIES"
            title="Trusted Across Retail, Healthcare & Plants"
            center
          />
          <div className="testimonials">
            {testimonials.map((t, tIdx) => (
              <article key={tIdx}>
                <div className="quote-mark">“</div>
                <p>{t.quote}</p>
                <div>
                  <span className={`customer-avatar ca${(tIdx % 3) + 1}`}>
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <strong>{t.author}</strong>
                    <small>{t.role}, {t.company}</small>
                  </div>
                  <em>★★★★★</em>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          08 · FAQ SECTION (Matching Home Page 2-Column Structure)
          ====================================================================== */}
      <section className="faq-section" id="faqs">
        <div className="container faq-grid">
          <div>
            <SectionHeading
              eyebrow="QUESTIONS, ANSWERED"
              title="Industry Solutions FAQs"
              body="Clear answers to common questions about configuring shifts, multi-site setups, and custom industry rules."
            />
            <Link className="text-link" to="/faq">
              View all FAQs <Icon name="arrow" size={17} />
            </Link>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className={`faq-item ${openFaqIndex === i ? "open" : ""}`} key={faq.q}>
                <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}>
                  <span>{faq.q}</span>
                  <i>{openFaqIndex === i ? "−" : "+"}</i>
                </button>
                {openFaqIndex === i && <p>{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          09 · FINAL CTA (Matching Home Page Final CTA Layout)
          ====================================================================== */}
      <section className="final-cta">
        <div className="container final-grid">
          <div>
            <span className="eyebrow">READY TO CONFIGURE FOR YOUR INDUSTRY?</span>
            <h2>HR Built for the Way Your Industry Really Works.</h2>
            <p>
              Shifts, rotations, seasonal spikes, and multi-location branch rosters — experience how simple
              workforce operations feel when the software adapts to you.
            </p>
            <div className="final-actions">
              <Button onClick={() => openDemoModal({ title: "Industry Solutions Demo" })}>
                Book a Free Demo <Icon name="arrow" />
              </Button>
              <Button to="/contact-sales" secondary>
                Speak with a Specialist
              </Button>
            </div>
            <div className="final-points">
              <span>
                <Icon name="check" />
                14-day guided onboarding
              </span>
              <span>
                <Icon name="check" />
                Free employee data migration
              </span>
              <span>
                <Icon name="check" />
                Dedicated shift setup support
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default IndustrySolutionsPage;
