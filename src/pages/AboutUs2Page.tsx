import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import ImpactSection from "../components/common/ImpactSection";
import EmployeeStyleHero from "../components/common/EmployeeStyleHero";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import "./AboutUs2Page.css";
import "./EmployeeManagementPage.css";

interface ServiceCard {
  image: string;
  title: string;
  desc: string;
  href: string;
  icon: IconName;
}

interface ValuePrinciple {
  key: string;
  icon: IconName;
  title: string;
  desc: string;
}

const VALUE_BULLETS: string[] = [
  "Simple, intuitive workflows built for everyday employees and HR leads",
  "Audit-ready salary calculations and automated multi-branch compliance",
  "Dedicated onboarding guidance paired with weekly customer-led updates",
];

const CORE_VALUES: ValuePrinciple[] = [
  {
    key: "clarity",
    icon: "zap",
    title: "Simplicity First Approach",
    desc: "Clean everyday workflows designed so managers and employees act in seconds without manuals.",
  },
  {
    key: "accuracy",
    icon: "shield",
    title: "Statutory Payroll Precision",
    desc: "Every calculation, tax rule, and branch ledger verified for audit-ready compliance.",
  },
  {
    key: "ownership",
    icon: "users",
    title: "People-First Ownership",
    desc: "Real human support specialists who stand beside your HR team during critical payday cycles.",
  },
  {
    key: "evolution",
    icon: "globe",
    title: "Connected Global Scale",
    desc: "Built to unify multi-branch teams cleanly as your policies and geographies expand.",
  },
];

interface FuturePillar {
  icon: IconName;
  title: string;
  status: string;
  desc: string;
}

const OUR_SERVICES: ServiceCard[] = [
  {
    image: "/images/branch-payroll.webp",
    title: "Payroll Management",
    desc: "Automated payroll processing to ensure timely statutory compliance and accurate employee compensation.",
    href: "/features/payroll-management",
    icon: "payroll",
  },
  {
    image: "/images/emp-block-onboarding.webp",
    title: "Employee Directory",
    desc: "Centralized digital workforce profiles, org hierarchies, and guided onboarding across every branch office.",
    href: "/features/employee-management",
    icon: "employee",
  },
  {
    image: "/images/att-hero-showcase.webp",
    title: "Attendance & Shifts",
    desc: "Geofenced mobile punches, biometric sync, and automated shift rules built for multi-location accuracy.",
    href: "/features/attendance-management",
    icon: "attendance",
  },
  {
    image: "/images/leave-block-accrual.webp",
    title: "Leave Administration",
    desc: "Comprehensive leave accruals, regional holiday calendars, and 1-tap approval workflows that simplify planning.",
    href: "/features/leave-management",
    icon: "leave",
  },
  {
    image: "/images/perf-block-goals.webp",
    title: "Performance & OKRs",
    desc: "Structured appraisal cycles, peer feedback, and goal tracking aligned to support company-wide growth.",
    href: "/features/performance-management",
    icon: "target",
  },
  {
    image: "/images/reports-block-workforce.webp",
    title: "Workforce Analytics",
    desc: "Decision-ready headcount, attrition, and payroll cost reports to guide real-time executive planning.",
    href: "/features/reports-analytics",
    icon: "reports",
  },
];

const FUTURE_PILLARS: FuturePillar[] = [
  {
    icon: "sparkle",
    title: "Intelligent Workflow Automation",
    status: "Core Priority",
    desc: "Smart anomaly detection for missing punches, automated overtime threshold alerts, and exception-first payroll verification so teams review only what needs attention.",
  },
  {
    icon: "globe",
    title: "Multi-Region Workforce Expansion",
    status: "Expanding",
    desc: "Deeper multi-currency support, localized holiday engines, and regional statutory templates for ambitious companies expanding across cities and borders.",
  },
  {
    icon: "reports",
    title: "Mobile-First Workforce Clarity",
    status: "In Focus",
    desc: "Richer iOS and Android self-service experiences connecting field teams, shift managers, and headquarters in real time with offline-resilient sync.",
  },
];

export function AboutUs2Page() {
  const navigate = useNavigate();
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const syncActiveServiceIndex = useCallback(() => {
    const el = servicesTrackRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".ab2-service-card"));
    if (!cards.length) return;
    const scrollCenter = el.scrollLeft + el.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - scrollCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = index;
      }
    });
    setActiveServiceIndex(closestIndex);
  }, []);

  useEffect(() => {
    syncActiveServiceIndex();
    window.addEventListener("resize", syncActiveServiceIndex);
    return () => window.removeEventListener("resize", syncActiveServiceIndex);
  }, [syncActiveServiceIndex]);

  const scrollToService = (index: number) => {
    const el = servicesTrackRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".ab2-service-card"));
    const targetCard = cards[index];
    if (targetCard) {
      const targetScroll = targetCard.offsetLeft - el.offsetLeft;
      el.scrollTo({ left: targetScroll, behavior: "smooth" });
      setActiveServiceIndex(index);
    }
  };

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageLayout>
      <SEO
        title="About Us 2.0 | Zentilos — Where People and Technology Work Better Together"
        description="Bringing people, processes and technology together to create simpler and more meaningful HR experiences. Founded in 2026."
        canonicalPath="/about-2"
      />

      <div className="ab2-shell">
        {/* ─── 01. HERO: EMPLOYEE MANAGEMENT STYLE SPOTLIGHT HERO ─── */}
        <EmployeeStyleHero
          badgeText="✦ ABOUT ZENTILOS ✦"
          title={
            <>
              Where <span className="emp-glow-text">People</span> and Technology
              <br className="emp-hero-br" />
              Work Better Together.
            </>
          }
          subhead="Bringing people, processes and technology together to create simpler and more meaningful HR experiences for every team we serve."
          primaryLabel="Book a Free Demo"
          onPrimaryClick={() => navigate("/request-demo")}
          secondaryLabel="Our Story & Journey"
          onSecondaryClick={() => scrollToSection("ab2-story")}
          trustPoints={[
            "Founded in 2026",
            "500+ businesses onboard",
            "People-first support",
          ]}
          imageSrc="/images/about-team-hero.webp"
          imageAlt="The Zentilos team collaborating on people-first HR technology in a modern office"
          statusPill="Our Team at Work"
          leftWidgetTitle="Who We Are"
          leftWidgetSub="By Team Function"
          leftWidgetBadge="Unified"
          donutCenterLabel="Founded"
          donutCenterValue="2026"
          donutSegments={[
            { label: "Product", percent: 42, color: "#004B49" },
            { label: "Customer Success", percent: 33, color: "#10b981" },
            { label: "People & Ops", percent: 25, color: "#8b5cf6" },
          ]}
          rightWidgetTitle="Our Journey"
          rightWidgetSub="Since 2026"
          rightWidgetBadge="Growing"
          rightStatValue="+500"
          rightStatLabel="Businesses Served"
          rightStatMeta="Across multi-branch teams"
          barHeights={[30, 48, 42, 66, 88, 62, 95]}
          rightFooterText="People, processes & technology working together"
        />

        {/* ─── 02. OUR STORY: BENTO MOSAIC GRID (STARTED IN 2026) ─── */}
        <section className="ab2-story-section" id="ab2-story">
          <div className="container">
            <div className="ab2-section-head ab2-section-head--center">
              <span className="ab2-eyebrow">OUR STORY</span>
              <h2>Why we started building HRMS</h2>
              <p>
                Launched in 2026 to replace decades-old spreadsheets and rigid tools with clean,
                dependable workforce operations.
              </p>
            </div>

            <div className="ab2-story-mosaic">
              {/* Tile 1: Our Beginning 2026 */}
              <article className="ab2-bento-tile ab2-bento-year">
                <div className="ab2-bento-sketch-icon" aria-hidden="true">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 23V13.5C14 11.8 15.3 10.5 17 10.5C18.7 10.5 20 11.8 20 13.5V22" />
                    <path d="M20 20V11.5C20 9.8 21.3 8.5 23 8.5C24.7 8.5 26 9.8 26 11.5V22" />
                    <path d="M26 21V13C26 11.3 27.3 10 29 10C30.7 10 32 11.3 32 13V26.5C32 33 27.5 37.5 21 37.5C16.2 37.5 12.5 34.4 11 29.8L8.8 23.2C8.3 21.6 9.2 19.9 10.8 19.5C12.2 19.1 13.6 19.9 14 21.3L15.2 25" />
                    <path d="M23 4V5.5M14 6.5L15 8M32 6.5L31 8" />
                  </svg>
                </div>
                <p className="ab2-bento-year-label">Our Beginning</p>
                <div className="ab2-bento-year-num">2026</div>
              </article>

              {/* Tile 2: Clean Team Photo Tile */}
              <div className="ab2-bento-tile ab2-bento-photo">
                <img
                  src="/images/emp-cta-collaboration.webp"
                  alt="Zentilos founding engineers and HR product specialists collaborating"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Tile 3: Soft Mint Why We Started Tile */}
              <article className="ab2-bento-tile ab2-bento-mint">
                <h3>Why We Started</h3>
                <p>
                  Built from scratch in 2026 to end scattered attendance sheets and manual payroll
                  stress.
                </p>
                <a
                  href="#ab2-our-services"
                  className="ab2-bento-underline-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("ab2-our-services");
                  }}
                >
                  EXPLORE SERVICES
                </a>

                <div className="ab2-bento-mint-bg-art" aria-hidden="true">
                  <svg width="210" height="128" viewBox="0 0 210 128" fill="none">
                    <path
                      d="M14 126V66H54V126M70 126V42H122V126M134 126V58H188V126M4 126H204"
                      stroke="#BCE2D7"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M84 42V28C84 22 92 18 96 18C100 18 108 22 108 28V42M96 10V18"
                      stroke="#BCE2D7"
                      strokeWidth="1.2"
                    />
                    <circle cx="158" cy="96" r="14" stroke="#004B49" strokeWidth="1.8" />
                    <circle cx="174" cy="96" r="14" stroke="#10B981" strokeWidth="1.6" />
                    <path
                      d="M161 96L164.5 99.5L171 93"
                      stroke="#004B49"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </article>

              {/* Tile 4: Light Teal CTA Action Tile */}
              <article className="ab2-bento-tile ab2-bento-action">
                <img
                  src="/images/logo-mark.webp"
                  alt="Zentilos Mark"
                  className="ab2-bento-brand-mark"
                  width={38}
                  height={38}
                  loading="lazy"
                  decoding="async"
                />
                <h3>Start Your Modern HR Journey in 2026</h3>
                <Link to="/request-demo" className="ab2-bento-cta-btn">
                  BOOK A DEMO
                </Link>

                <div className="ab2-bento-ribbon-art" aria-hidden="true">
                  <svg width="110" height="84" viewBox="0 0 110 84" fill="none">
                    <path d="M18 84L98 18V36L38 84H18Z" fill="#004B49" fillOpacity="0.88" />
                    <path d="M44 84L104 34V50L62 84H44Z" fill="#0D7A76" fillOpacity="0.72" />
                    <path d="M68 84L110 50V66L86 84H68Z" fill="#10B981" fillOpacity="0.6" />
                  </svg>
                </div>
              </article>

              {/* Tile 5: Wide Pine-Teal Story Banner */}
              <article className="ab2-bento-tile ab2-bento-quote-banner">
                <div className="ab2-bento-quote-copy">
                  <p className="ab2-bento-quote-text">
                    Teams in 2026 shouldn&apos;t lose hours to messy Excel attendance tracking or
                    late-night compliance math. We launched Zentilos to deliver crystal-clear HR
                    control from day one.
                  </p>
                  <span className="ab2-bento-quote-tag">ZENTILOS FOUNDED · 2026</span>
                  <p className="ab2-bento-quote-closing">
                    Built Fresh for Today&apos;s Teams, <span>Ready to Scale!</span>
                  </p>
                </div>

                <div className="ab2-bento-quote-bubble" aria-hidden="true">
                  <svg
                    width="82"
                    height="78"
                    viewBox="0 0 84 78"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 16C12 18 9 25 9 34C9 45 16 54 30 56L26 68L40 57C58 56 72 47 72 32C72 17 58 10 38 11C28 11 22 14 18 16Z" />
                    <path
                      d="M32 25C29 25 27 27 27 30C27 33 29 35 32 35C32 38 30 41 27 42"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M48 25C45 25 43 27 43 30C43 33 45 35 48 35C48 38 46 41 43 42"
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ─── 03. MISSION & VISION: EXACT ABOUT US PAGE DESIGN ─── */}
        <section className="ab2-mv-section" id="ab2-mission-vision">
          <div className="container">
            <SectionHeading
              eyebrow="MISSION & VISION"
              title="What we believe and where we're going"
              body="Two fundamental commitments that shape every product decision we make."
              center
            />

            <div className="purpose-showcase-grid">
              <div className="purpose-card purpose-card--mission">
                <div className="purpose-card-icon" aria-hidden="true">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2.4" />
                    <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2.2" />
                    <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2" />
                    <circle cx="32" cy="32" r="2.5" fill="currentColor" />
                    <path d="M49 15L33 31" stroke="currentColor" strokeWidth="2.6" />
                    <path d="M49 15V24M49 15H40" stroke="currentColor" strokeWidth="2.6" />
                  </svg>
                </div>

                <span className="purpose-card-eyebrow">OUR MISSION</span>
                <h3 className="purpose-card-title">Our Mission</h3>
                <div className="purpose-card-subtitle">
                  What We Believe · Eliminating Administrative Friction
                </div>

                <p className="purpose-card-desc">
                  We engineer dependable, intuitive software that removes statutory anxiety and
                  payroll drudgery—empowering founders, HR leaders, and frontline teams to spend
                  less time on paperwork and more time on people.
                </p>
              </div>

              <div className="purpose-card purpose-card--vision">
                <div className="purpose-card-icon" aria-hidden="true">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.4" />
                    <line x1="12" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="2" />
                    <ellipse cx="32" cy="32" rx="9" ry="20" stroke="currentColor" strokeWidth="2" />
                    <ellipse
                      cx="32"
                      cy="32"
                      rx="28"
                      ry="11"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      transform="rotate(-26 32 32)"
                    />
                    <circle cx="53" cy="22" r="2.5" fill="currentColor" />
                  </svg>
                </div>

                <span className="purpose-card-eyebrow">OUR VISION</span>
                <h3 className="purpose-card-title">Our Vision</h3>
                <div className="purpose-card-subtitle">
                  Where We&apos;re Going · Making World-Class HR Universal
                </div>

                <p className="purpose-card-desc">
                  A connected workplace future where every organization—from a new 2026 startup to a
                  multi-city enterprise—operates with transparent pay, instant leave clarity, and
                  zero administrative roadblocks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04. OUR SERVICES: LIGHT-THEME HORIZONTAL CAROUSEL ─── */}
        <section className="ab2-services-section" id="ab2-our-services">
          <svg
            className="ab2-services-arcs"
            viewBox="0 0 420 420"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="80" cy="80" r="140" stroke="#CFE3E0" strokeWidth="1" />
            <circle cx="80" cy="80" r="195" stroke="#CFE3E0" strokeWidth="1" />
            <circle cx="80" cy="80" r="250" stroke="#D8EAE7" strokeWidth="1" />
            <circle cx="80" cy="80" r="305" stroke="#E2F0EE" strokeWidth="1" />
          </svg>

          <div className="container">
            <div className="ab2-section-head ab2-section-head--center">
              <span className="ab2-eyebrow">OUR SERVICES</span>
              <h2>Services built for modern HR teams</h2>
              <p>
                Streamlined people, time, leave, and payroll services engineered for growing
                multi-branch companies.
              </p>
            </div>

            <div
              ref={servicesTrackRef}
              className="ab2-services-track"
              onScroll={syncActiveServiceIndex}
              role="region"
              aria-label="Zentilos HR Services"
            >
              {OUR_SERVICES.map((service) => (
                <Link to={service.href} className="ab2-service-card" key={service.title}>
                  <div className="ab2-service-media">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="ab2-service-icon-badge" aria-hidden="true">
                      <Icon name={service.icon} size={18} />
                    </div>
                  </div>
                  <div className="ab2-service-body">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="ab2-services-dots" role="tablist" aria-label="Services carousel pagination">
              {OUR_SERVICES.map((service, index) => (
                <button
                  key={service.title}
                  type="button"
                  role="tab"
                  aria-selected={activeServiceIndex === index}
                  aria-label={`Go to slide ${index + 1}: ${service.title}`}
                  className={`ab2-carousel-dot ${activeServiceIndex === index ? "is-active" : ""}`}
                  onClick={() => scrollToService(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── 05. CORE VALUES: DARK PINE-TEAL EDITORIAL SPLIT SHOWCASE ─── */}
        <section className="ab2-values-section" id="ab2-core-values">
          <div className="container">
            <div className="ab2-values-showcase">
              <div>
                <span className="ab2-values-pill">CORE VALUES · FOUR PRINCIPLES</span>
                <h2 className="ab2-values-title">What Guides Zentilos</h2>
                <p className="ab2-values-subtitle">
                  Principles Built for People — Clarity, Accuracy &amp; Trust
                </p>

                <ul className="ab2-values-bullets">
                  {VALUE_BULLETS.map((bullet) => (
                    <li key={bullet}>
                      <span className="ab2-values-star-badge" aria-hidden="true">
                        <Icon name="check" size={12} />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/product" className="ab2-values-cta-link">
                  <span>MORE ABOUT ZENTILOS</span>
                  <Icon name="arrow" size={14} />
                </Link>
              </div>

              <div className="ab2-values-list">
                {CORE_VALUES.map((val) => (
                  <div className="ab2-value-row" key={val.key}>
                    <span className="ab2-value-badge-icon" aria-hidden="true">
                      <Icon name={val.icon} size={22} />
                    </span>
                    <div className="ab2-value-row-text">
                      <strong>{val.title}</strong>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06. OUR IMPACT: EXACT ABOUT US PAGE SECTION ─── */}
        <ImpactSection id="ab2-our-impact" />

        {/* ─── 07. LOOKING AHEAD: OUR FUTURE DIRECTION ─── */}
        <section className="ab2-future-section" id="ab2-looking-ahead">
          <div className="container">
            <div className="ab2-future-grid">
              <div className="ab2-future-intro">
                <div>
                  <span className="ab2-eyebrow">LOOKING AHEAD</span>
                  <h2>
                    Our future direction
                    <span>starts with people.</span>
                  </h2>
                  <p>
                    As work becomes more distributed and connected, we&apos;re shaping HR technology
                    that helps every team move forward with clarity, confidence, and a more human
                    experience.
                  </p>
                </div>

                <div className="ab2-future-actions">
                  <Button to="/request-demo">
                    Schedule a Walkthrough <Icon name="arrow" size={15} />
                  </Button>
                  <Button to="/about" secondary className="ab2-btn-secondary">
                    View About Us 1.0
                  </Button>
                </div>
              </div>

              <div className="ab2-future-cards">
                {FUTURE_PILLARS.map((pillar, index) => (
                  <article className="ab2-future-card" key={pillar.title}>
                    <span className="ab2-future-icon">
                      <Icon name={pillar.icon} size={18} />
                    </span>
                    <div>
                      <span className="ab2-future-step">PILLAR 0{index + 1}</span>
                      <div className="ab2-future-meta">
                        <h3>{pillar.title}</h3>
                        <span className="ab2-future-status">{pillar.status}</span>
                      </div>
                      <p>{pillar.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default AboutUs2Page;
