import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";

function CountUpNumber({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        const startedAt = performance.now();
        const duration = 1600;
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(target * eased);
          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          }
        };
        frame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString("en-US");

  return (
    <span ref={elementRef} className="stat-number-run">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

interface MilestoneItem {
  id: string;
  year: string;
  tag: string;
  title: string;
  desc: string;
  icon: IconName;
  badge: string;
  stats: { label: string; val: string }[];
}

const milestonesData: MilestoneItem[] = [
  {
    id: "m2017",
    year: "2017",
    tag: "THE INCEPTION",
    title: "The Starting Spark in Bengaluru to Eliminate Attendance Chaos",
    desc: "Zentilos was founded in Bengaluru after experiencing the everyday friction of running multi-branch frontline teams on paper logs and broken spreadsheets. We built our v1 foundation solely to eliminate manual attendance chaos.",
    icon: "zap",
    badge: "Founded 2017",
    stats: [
      { label: "Founded City", val: "Bengaluru" },
      { label: "Admin Chasing Saved", val: "-85%" },
    ],
  },
  {
    id: "m2020",
    year: "2020",
    tag: "EARLY ADOPTERS",
    title: "First 25 Enterprise Pilot Partners & Real-Time Mobile Sync",
    desc: "Rolled out our private beta with 25 fast-moving retail chains and tech teams. We perfected geofenced mobile verification, automated shift-swap workflows, and instant leave approvals on shop floors.",
    icon: "users",
    badge: "25+ Pilot Teams",
    stats: [
      { label: "Pilot Enterprises", val: "25+" },
      { label: "GPS Punch Accuracy", val: "99.8%" },
    ],
  },
  {
    id: "m2022",
    year: "2022",
    tag: "COMPLIANCE ENGINE",
    title: "100% Automated Statutory Payroll with 3-Minute Processing",
    desc: "Engineered a native payroll engine fully compliant with statutory regulations (PF, ESI, TDS, PT, and Bonus Act). Monthly payroll processing dropped from 4 stressful days to 3 error-free minutes with automated salary slips.",
    icon: "finance",
    badge: "100% Compliant",
    stats: [
      { label: "Payroll Run Time", val: "3 Min" },
      { label: "Statutory Accuracy", val: "100%" },
    ],
  },
  {
    id: "m2024",
    year: "2024",
    tag: "ENTERPRISE SCALE",
    title: "Centralized Multi-Branch Governance Across 12+ States",
    desc: "Unveiled centralized multi-location governance. Regional factories, warehouses, and branch showrooms enforce localized state compliance while executive headquarters maintains unified real-time workforce visibility.",
    icon: "building",
    badge: "12+ Regions",
    stats: [
      { label: "Active Regions", val: "12+ States" },
      { label: "Audit Readiness", val: "100%" },
    ],
  },
  {
    id: "today",
    year: "Today",
    tag: "TRUSTED AT SCALE",
    title: "Powering 45,000+ Workers Every Single Day Across India",
    desc: "Now trusted across 500+ active enterprise clients and over 45,000 daily workforce members. We continue to engineer software that removes administrative bureaucracy, guarantees zero compliance penalties, and puts human potential first.",
    icon: "sparkle",
    badge: "45,000+ Staff",
    stats: [
      { label: "Daily Active Workers", val: "45k+" },
      { label: "Client Retention", val: "99.2%" },
    ],
  },
];

export function AboutPage() {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("today");
  const activeMilestone =
    milestonesData.find((m) => m.id === activeMilestoneId) || milestonesData[0];

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "About Us" },
  ];

  return (
    <PageLayout hideCTA breadcrumbs={breadcrumbs}>
      <SEO
        title="About Us | Zentilos — The People Behind Modern HR"
        description="Learn about Zentilos. Founded in 2017 in Bengaluru, India, we build simple, dependable workforce management software so leaders can spend less time on paperwork and more time on people."
        canonicalPath="/about"
      />

      {/* 1. Hero: Purpose & Story with Elevated Colored Stage (Centered & Brand Colored) */}
      <section className="about-hero-section">
        <div className="about-hero-ambient" />
        <div className="container">
          <div className="about-hero-center">
            <span className="about-hero-chip">
              <Icon name="sparkle" size={13} />
              ✦ ABOUT ZENTILOS ✦
            </span>

            <h1 className="about-hero-heading">
              Less Paperwork. <span className="about-hero-accent">More Time for People.</span>
            </h1>

            <p className="about-hero-lead">
              We are a dedicated team of HR practitioners, engineers, and customer advocates who experienced the
              chaos of physical registers and broken spreadsheets. We built Zentilos to give leaders
              effortless workforce control and their personal time back.
            </p>

            {/* Hero Action Buttons */}
            <div className="about-hero-actions">
              <Button to="/request-demo" className="about-hero-btn-primary">
                Book a Free Demo <Icon name="arrow" size={15} />
              </Button>
              <Button
                onClick={() => {
                  const el = document.getElementById("story");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                secondary
                className="about-hero-btn-secondary"
              >
                Our Story &amp; Journey <Icon name="arrow" size={15} />
              </Button>
            </div>

            {/* Authentic Hero Showcase Media Stage with Floating Verified Badges */}
            <div className="about-hero-media-wrapper">
              <div className="about-hero-media-card">
                <img
                  src="/images/about-team-hero.jpg"
                  alt="Zentilos leadership and product engineering team collaborating"
                  className="about-hero-media-img"
                  loading="eager"
                />
                <div className="about-hero-media-overlay" />

                {/* Floating Metric Badges over the team photo */}
                <div className="about-floating-badge badge-top-left">
                  <span className="badge-icon-bubble">
                    <Icon name="building" size={14} />
                  </span>
                  <div className="badge-text-group">
                    <strong>Bengaluru, India</strong>
                    <span>Founded &amp; Engineered</span>
                  </div>
                </div>

                <div className="about-floating-badge badge-top-right">
                  <span className="badge-icon-bubble">
                    <Icon name="users" size={14} />
                  </span>
                  <div className="badge-text-group">
                    <strong>500+ Organizations</strong>
                    <span>Multi-Branch Workforces</span>
                  </div>
                </div>

                <div className="about-floating-badge badge-bottom-left">
                  <span className="badge-icon-bubble">
                    <Icon name="check" size={14} />
                  </span>
                  <div className="badge-text-group">
                    <strong>45,000+ Daily Punches</strong>
                    <span>Verified Real-Time Shifts</span>
                  </div>
                </div>

                <div className="about-floating-badge badge-bottom-right">
                  <span className="badge-icon-bubble">
                    <Icon name="shield" size={14} />
                  </span>
                  <div className="badge-text-group">
                    <strong>100% Statutory Compliant</strong>
                    <span>PF, ESI, TDS, State PT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story: Personal and Human Narrative */}
      <section id="story" className="about-story-section">
        <div className="container">
          <SectionHeading
            eyebrow="OUR BEGINNING"
            title="Built from real workplace frustration"
            body="How a personal struggle with fragmented tools and chaotic spreadsheets sparked the creation of Zentilos."
            center
          />

          <div className="about-story-showcase">
            {/* Left Column: Founder Card */}
            <div className="story-founder-card">
              <div className="story-founder-photo-box">
                <img
                  src="/images/leader-kavya-sundaram.jpg"
                  alt="Kavya Sundaram, Founder & CEO"
                  className="story-founder-img"
                  loading="lazy"
                />
              </div>
              <div className="story-founder-details">
                <h3 className="story-founder-name">Kavya Sundaram</h3>
                <p className="story-founder-role">Founder & CEO, Zentilos</p>
                <div className="story-founder-pill">
                  Founded 2017 · Bengaluru, India
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Typography */}
            <div className="story-narrative-col">
              <p className="story-lead-statement">
                In <span className="story-year-accent">2017</span>, our founder{" "}
                <strong>Kavya Sundaram</strong> was spending hours every week chasing
                attendance sheets, untangling spreadsheet formulas and reconciling payroll
                across branch offices.
              </p>
              <p className="story-body-statement">
                The tools on the market were either bloated legacy systems built for old-school
                corporations, or basic apps that broke the moment a business opened a second
                branch. Neither served real-world managers who just wanted things to work
                cleanly, reliably and accurately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Milestones on our Journey: Interactive Showcase (Matches Uploaded Reference Design) */}
      <section className="about-milestones-section" id="story">
        <div className="container">
          <SectionHeading
            eyebrow="✦ HOW WE GOT HERE ✦"
            title="Milestones on our journey"
            body="From our founding spark in Bengaluru to powering tens of thousands of workforce operations daily."
            center
          />

          {/* Centered Pill Year Tabs */}
          <div className="milestones-tabs-wrapper">
            <div className="milestones-pill-nav" role="tablist" aria-label="Journey Milestones Timeline">
              {milestonesData.map((m) => {
                const isActive = m.id === activeMilestoneId;
                return (
                  <button
                    key={m.id}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    className={`milestone-pill-tab ${isActive ? "active" : ""}`}
                    onClick={() => setActiveMilestoneId(m.id)}
                  >
                    {m.year === "Today" && <span className="live-dot" />}
                    <span>{m.year}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Showcase Layout matching Reference: Left Photo, Right Story & 2 Stat Cards */}
          <div className="milestone-showcase-stage">
            {/* Left Column: Portrait Team Photo */}
            <div className="milestone-img-wrapper">
              <img
                src="/images/about-milestone-journey.jpg"
                alt="Zentilos founders and leadership team collaborating on workforce growth"
                className="milestone-journey-img"
                loading="lazy"
              />
            </div>

            {/* Right Column: Narrative Story & 2 Stat Cards */}
            <div className="milestone-info-wrapper">
              <h3 className="milestone-headline">{activeMilestone.title}</h3>

              <p className="milestone-paragraph">{activeMilestone.desc}</p>

              <Link to="/request-demo" className="milestone-cta-btn">
                <span>Discover Zentilos</span>
                <span className="milestone-btn-arrow" aria-hidden="true">↘</span>
              </Link>

              {/* Bottom 2 Pastel Stat Cards */}
              <div className="milestone-stat-cards">
                {/* Card 1: Lavender/Plum Pastel with Climber on Steps Flag Icon */}
                <div className="milestone-stat-card milestone-stat-card--purple">
                  <div className="milestone-card-icon" aria-hidden="true">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="#802B5B"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 38H16V32H26V26H36V38" />
                      <line x1="4" y1="38" x2="38" y2="38" />
                      <circle cx="31" cy="12" r="3.5" />
                      <path d="M31 16V24" />
                      <path d="M31 24L26 26" />
                      <path d="M31 24L34 26" />
                      <path d="M31 18L26 20" />
                      <path d="M31 18L36 15" />
                      <line x1="36" y1="9" x2="36" y2="26" />
                      <path d="M36 9L43 12L36 15Z" fill="rgba(128, 43, 91, 0.18)" />
                    </svg>
                  </div>
                  <span className="milestone-card-num">{activeMilestone.stats[0]?.val}</span>
                  <span className="milestone-card-label">{activeMilestone.stats[0]?.label}</span>
                </div>

                {/* Card 2: Mint/Sage Pastel with Presentation Growth Chart Board Icon */}
                <div className="milestone-stat-card milestone-stat-card--mint">
                  <div className="milestone-card-icon" aria-hidden="true">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="#15803d"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="8" y="8" width="32" height="22" rx="2" />
                      <path d="M13 24L21 17L28 21L35 14" />
                      <path d="M30 14H35V19" />
                      <line x1="16" y1="30" x2="11" y2="40" />
                      <line x1="32" y1="30" x2="37" y2="40" />
                      <line x1="24" y1="30" x2="24" y2="40" />
                      <line x1="14" y1="35" x2="34" y2="35" />
                    </svg>
                  </div>
                  <span className="milestone-card-num">{activeMilestone.stats[1]?.val}</span>
                  <span className="milestone-card-label">{activeMilestone.stats[1]?.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership Team with Authentic Photos & Zoom Effect */}
      <section className="about-leadership-section">
        <div className="container">
          <SectionHeading
            eyebrow="OUR LEADERSHIP"
            title="The people behind the platform"
            body="Experienced leaders combining deep domain knowledge in human resources and cloud technology."
            center
          />

          <div className="leadership-grid">
            <div className="leader-card">
              <div className="leader-avatar-box">
                <img
                  src="/images/leader-kavya-sundaram.jpg"
                  alt="Kavya Sundaram, Founder & CEO"
                  className="leader-photo"
                  loading="lazy"
                />
              </div>
              <div className="leader-info">
                <h3>Kavya Sundaram</h3>
                <span className="leader-role">Founder & Chief Executive Officer (CEO)</span>
                <p>
                  Kavya brings over a decade of operational leadership across high-growth startups and branch
                  networks, dedicated to building software that removes friction for working professionals.
                </p>
              </div>
            </div>

            <div className="leader-card">
              <div className="leader-avatar-box">
                <img
                  src="/images/leader-rohan-mehta.jpg"
                  alt="Rohan Mehta, Co-Founder & CTO"
                  className="leader-photo"
                  loading="lazy"
                />
              </div>
              <div className="leader-info">
                <h3>Rohan Mehta</h3>
                <span className="leader-role">Co-Founder & Chief Technology Officer (CTO)</span>
                <p>
                  Obsessed with system reliability and data security, Rohan oversees our cloud architecture and
                  ensures seamless daily performance across distributed teams.
                </p>
              </div>
            </div>

            <div className="leader-card">
              <div className="leader-avatar-box">
                <img
                  src="/images/leader-ananya-kapoor.jpg"
                  alt="Ananya Kapoor, Head of Product & Customer Success"
                  className="leader-photo"
                  loading="lazy"
                />
              </div>
              <div className="leader-info">
                <h3>Ananya Kapoor</h3>
                <span className="leader-role">Head of Product & Customer Success</span>
                <p>
                  A former HR practitioner, Ananya works directly with our customer community to turn real user
                  feedback into thoughtful, high-impact product improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mission & Vision: Two Core Anchors - Expanded Communicative Showcase */}
      <section className="about-mv-section">
        <div className="container">
          <SectionHeading
            eyebrow="✦ OUR PURPOSE ✦"
            title="What drives us every day"
            body="Two fundamental commitments that shape every decision we make."
            center
          />

          <div className="purpose-showcase-grid">
            {/* Card 1: Mission */}
            <div className="purpose-card purpose-card--mission">
              <div className="purpose-card-icon" aria-hidden="true">
                {/* Purposeful Mission Icon: Precision Target & Focused Arrow */}
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
              <div className="purpose-card-subtitle">Eliminating Administrative Friction</div>

              <p className="purpose-card-desc">
                We engineer dependable, intuitive software that removes statutory anxiety and payroll drudgery—empowering founders, HR leaders, and frontline teams to spend less time on paperwork and more time on people.
              </p>

              <a href="#story" className="purpose-card-btn">
                Learn more...
              </a>
            </div>

            {/* Card 2: Vision */}
            <div className="purpose-card purpose-card--vision">
              <div className="purpose-card-icon" aria-hidden="true">
                {/* Purposeful Vision Icon: Universal Global Network & Forward Horizon */}
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
              <div className="purpose-card-subtitle">Making World-Class HR Universal</div>

              <p className="purpose-card-desc">
                A connected workplace future where every organization—from a 10-person startup to a multi-city enterprise—operates with transparent pay, instant leave clarity, and zero administrative roadblocks.
              </p>

              <a href="#values" className="purpose-card-btn">
                Learn more...
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Values: Exactly matching Home page 'BUILT AROUND YOUR BUSINESS' setup cards */}
      <section className="about-values-section">
        <div className="container">
          <SectionHeading
            eyebrow="WHAT GUIDES US"
            title="Our Values"
            body="The four foundational principles behind how we build our company and treat our customers."
            center
          />

          <div className="setup-grid" style={{ marginTop: "40px" }}>
            {[
              ["zap", "Simplicity First", "If a workflow needs a 50-page user manual, it is broken. We design every interaction to be intuitive, clean, and fast."],
              ["lock", "Data Privacy & Trust", "Employee records and payroll figures are sacred. We protect your company data with strict access rules, encryption, and zero compromises."],
              ["users", "Customer at the Center", "We do not hide behind automated ticket queues. When you have an urgent payroll deadline, our dedicated team is right beside you."],
              ["shield", "Radical Transparency", "We believe in honest communication, clear policies, and straightforward pricing—both within our own team and with our clients."],
            ].map((x, i) => (
              <div className="setup-card" key={x[1]}>
                <span className={`setup-icon i${i}`}>
                  <Icon name={x[0] as IconName} />
                </span>
                <strong>{x[1]}</strong>
                <p>{x[2]}</p>
                <div className={`setup-art art${i}`}>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Numbers: Animated Running Counters matching Home Page exact size and indigo color */}
      <section className="about-numbers-section">
        <div className="container">
          <SectionHeading
            eyebrow="OUR IMPACT"
            title="Numbers we stand behind"
            body="Concrete milestones that demonstrate the reliability, scale, and trust placed in our platform."
            center
          />

          {/* Hidden SVG defs for reusable glowing arc gradient matching home page indigo */}
          <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
            <defs>
              <linearGradient id="statIndigoArc" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#5146d8" stopOpacity="1" />
                <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          <div className="impact-stats-container">
            <div className="impact-stats-bar">
              <div className="impact-stat-item">
                <div className="stat-number-group">
                  <CountUpNumber target={500} suffix="+" />
                  <svg className="stat-glow-arc" viewBox="0 0 54 8" fill="none">
                    <path
                      d="M 3 2.5 C 16 7.5 38 7.5 51 2.5"
                      stroke="url(#statIndigoArc)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="stat-label-text">Businesses trust Zentilos</div>
              </div>

              <div className="impact-stat-divider" />

              <div className="impact-stat-item">
                <div className="stat-number-group">
                  <CountUpNumber target={98} suffix="%" />
                  <svg className="stat-glow-arc" viewBox="0 0 54 8" fill="none">
                    <path
                      d="M 3 2.5 C 16 7.5 38 7.5 51 2.5"
                      stroke="url(#statIndigoArc)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="stat-label-text">On-time payroll rate</div>
              </div>

              <div className="impact-stat-divider" />

              <div className="impact-stat-item">
                <div className="stat-number-group">
                  <CountUpNumber target={2.4} decimals={1} suffix="M+" />
                  <svg className="stat-glow-arc" viewBox="0 0 54 8" fill="none">
                    <path
                      d="M 3 2.5 C 16 7.5 38 7.5 51 2.5"
                      stroke="url(#statIndigoArc)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="stat-label-text">Attendance logs monthly</div>
              </div>

              <div className="impact-stat-divider" />

              <div className="impact-stat-item">
                <div className="stat-number-group">
                  <CountUpNumber target={4.8} decimals={1} suffix="/5" />
                  <svg className="stat-glow-arc" viewBox="0 0 54 8" fill="none">
                    <path
                      d="M 3 2.5 C 16 7.5 38 7.5 51 2.5"
                      stroke="url(#statIndigoArc)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="stat-label-text">Average customer rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Find Out More: Discover Zentilos & Our Team (Careers, Case Studies, Resource Hub) */}
      <section className="about-discover-section">
        <div className="container">
          <SectionHeading
            eyebrow="EXPLORE ZENTILOS"
            title="Find out more about Zentilos and our team"
            center
          />

          <div className="about-discover-grid">
            {/* Card 1: Careers */}
            <div className="discover-card">
              <div className="discover-image-box">
                <img
                  src="/images/team-careers-card.jpg"
                  alt="Zentilos Team and Careers"
                  className="discover-img"
                  loading="lazy"
                />
              </div>
              <div className="discover-card-body">
                <span className="discover-tag">CAREERS</span>
                <h3 className="discover-title">
                  Join us, and build the future of modern work
                </h3>
                <Link to="/careers" className="discover-btn">
                  Learn more <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>

            {/* Card 2: Case Studies */}
            <div className="discover-card">
              <div className="discover-image-box">
                <img
                  src="/images/case-studies-card.jpg"
                  alt="Customer Success and Case Studies"
                  className="discover-img"
                  loading="lazy"
                />
              </div>
              <div className="discover-card-body">
                <span className="discover-tag">CASE STUDIES</span>
                <h3 className="discover-title">
                  Real impact, proven ROI, and customer stories
                </h3>
                <Link to="/resources/case-studies" className="discover-btn">
                  Learn more <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>

            {/* Card 3: Resource Hub */}
            <div className="discover-card">
              <div className="discover-image-box">
                <img
                  src="/images/resource-hub-card.jpg"
                  alt="Resource Hub and Guides"
                  className="discover-img"
                  loading="lazy"
                />
              </div>
              <div className="discover-card-body">
                <span className="discover-tag">RESOURCE HUB</span>
                <h3 className="discover-title">
                  Helpful articles, guides, templates, tools and more
                </h3>
                <Link to="/resources" className="discover-btn">
                  Learn more <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}

export default AboutPage;



