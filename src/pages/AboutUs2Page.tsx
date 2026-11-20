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
        title="About Us | Zentilos — Where People and Technology Work Better Together"
        description="Bringing people, processes and technology together to create simpler and more meaningful HR experiences."
        canonicalPath="/about"
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
            // "Simple, connected HR",
            // "500+ businesses onboard",
            // "People-first support",
          ]}
          imageSrc="/images/about-team-hero.webp"
          imageAlt="The Zentilos team collaborating on people-first HR technology in a modern office"
          statusPill="Our Team at Work"
          widgetVariant="missionValues"
          leftWidgetTitle=""
          leftWidgetSub=""
          leftWidgetBadge=""
          donutCenterLabel=""
          donutCenterValue=""
          donutSegments={[]}
          rightWidgetTitle=""
          rightWidgetSub=""
          rightWidgetBadge=""
          rightStatValue=""
          rightStatLabel=""
          rightStatMeta=""
          barHeights={[]}
          rightFooterText=""
        />

        {/* ─── 02. OUR STORY: BENTO MOSAIC GRID ─── */}
        <section className="ab2-story-section" id="ab2-story">
          <div className="container">
            <div className="ab2-section-head ab2-section-head--center">
              <span className="ab2-eyebrow">A BETTER WAY TO MANAGE PEOPLE</span>
              <h2>Built Around the Way Teams Work</h2>
              <p>
                Managing people shouldn&apos;t mean managing endless spreadsheets, disconnected systems, and complicated processes. We built Zentilos to bring everything together in one simple, connected workspace.
              </p>
            </div>

            <div className="ab2-story-mosaic">
              {/* Tile 1: Our Philosophy */}
              <article className="ab2-bento-tile ab2-bento-year">
                <div className="ab2-bento-sketch-icon" aria-hidden="true">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="ab2-bento-year-label">People First</h3>
                <p className="ab2-bento-year-desc">
                  Technology should make work easier, not more complicated.
                </p>
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

              {/* Tile 3: Our Approach */}
              <article className="ab2-bento-tile ab2-bento-mint">
                <div className="ab2-bento-mint-icon" aria-hidden="true">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#004B49"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.4 1.4" />
                    <path d="m18 10 1-1a2 2 0 0 0 0-2.8l-2.2-2.2a2 2 0 0 0-2.8 0l-5.6 5.6a2 2 0 0 0 0 2.8l2.2 2.2a2 2 0 0 0 2.8 0l1.4-1.4" />
                    <path d="m2 14 6 6" />
                    <path d="m5 11-4 4" />
                    <path d="m14 14 4-4" />
                  </svg>
                </div>
                <h3>One Connected Team</h3>
                <p>Bringing HR, payroll and attendance together in one place.</p>
                <Link to="/solutions" className="ab2-bento-underline-link">
                  EXPLORE OUR SOLUTIONS
                </Link>

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

              {/* Tile 4: CTA Card */}
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
                <h3>Ready for a Better HR Experience?</h3>
                <p className="ab2-bento-action-desc">
                  Discover a simpler way to manage your workforce.
                </p>
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

              {/* Tile 5: Wide Content Card */}
              <article className="ab2-bento-tile ab2-bento-quote-banner">
                <div className="ab2-bento-quote-copy">
                  <span className="ab2-bento-quote-tag">ZENTILOS · PEOPLE. PROCESS. PROGRESS.</span>
                  <h3 className="ab2-bento-quote-heading">Less Manual Work. More Meaningful Work.</h3>
                  <p className="ab2-bento-quote-text">
                    We believe great workforce management starts with clarity, connection and simplicity. Zentilos brings essential HR operations together so teams can focus on what matters most.
                  </p>
                </div>

                <div className="ab2-bento-quote-bubble" aria-hidden="true">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5EEAD4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
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
                  A connected workplace future where every organization—from an ambitious startup to a
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
        {/* <ImpactSection id="ab2-our-impact" /> */}

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
