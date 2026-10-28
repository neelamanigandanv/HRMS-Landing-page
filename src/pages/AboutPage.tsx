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
  screenTitle: string;
  screenCategory: string;
  stats: { label: string; val: string }[];
  backdropGradient: string;
}

const milestonesData: MilestoneItem[] = [
  {
    id: "m2017",
    year: "2017",
    tag: "THE INCEPTION",
    title: "The Starting Spark in Bengaluru",
    desc: "LattiumHR was founded in Bengaluru after experiencing the everyday friction of running multi-branch frontline teams on paper logs and broken spreadsheets. We built our v1 foundation solely to eliminate manual attendance chaos.",
    icon: "zap",
    badge: "Founded 2017",
    screenTitle: "Branch 01 — Shift Rosters & Real-Time Punch",
    screenCategory: "Operational Foundation",
    stats: [
      { label: "Headquarters", val: "Bengaluru, India" },
      { label: "Admin Friction", val: "-85% Chasing" },
      { label: "Core Focus", val: "Attendance & Rosters" },
    ],
    backdropGradient: "linear-gradient(135deg, #fef08a 0%, #fde047 35%, #f59e0b 80%, #d97706 100%)",
  },
  {
    id: "m2020",
    year: "2020",
    tag: "EARLY ADOPTERS",
    title: "First 25 Enterprise Pilot Partners",
    desc: "Rolled out our private beta with 25 fast-moving retail chains and tech teams. We perfected geofenced mobile verification, automated shift swap workflows, and instant leave approvals on shop floors.",
    icon: "users",
    badge: "25+ Pilot Teams",
    screenTitle: "Geofenced Mobile Verification & Shift Swaps",
    screenCategory: "Field & Retail Operations",
    stats: [
      { label: "Pilot Teams", val: "25 Companies" },
      { label: "Punch Accuracy", val: "99.8% GPS" },
      { label: "Shift Approvals", val: "Instant / Real-time" },
    ],
    backdropGradient: "linear-gradient(135deg, #fed7aa 0%, #fb923c 45%, #ea580c 100%)",
  },
  {
    id: "m2022",
    year: "2022",
    tag: "COMPLIANCE ENGINE",
    title: "100% Automated Statutory Payroll",
    desc: "Engineered a native payroll engine fully compliant with statutory regulations (PF, ESI, TDS, PT, and Bonus Act). Monthly payroll processing dropped from 4 stressful days to 3 error-free minutes with automated salary slips.",
    icon: "finance",
    badge: "100% Compliant",
    screenTitle: "One-Click Salary Disbursement & Statutory Returns",
    screenCategory: "Payroll & Compliance Engine",
    stats: [
      { label: "Payroll Run Time", val: "3 Minutes" },
      { label: "Discrepancies", val: "Zero Formula Errors" },
      { label: "Statutory Filing", val: "Automated E-Returns" },
    ],
    backdropGradient: "linear-gradient(135deg, #fef08a 0%, #fde047 35%, #f59e0b 80%, #d97706 100%)",
  },
  {
    id: "m2024",
    year: "2024",
    tag: "ENTERPRISE SCALE",
    title: "Centralized Multi-Branch Governance",
    desc: "Unveiled centralized multi-location governance. Regional factories, warehouses, and branch showrooms enforce localized state compliance while executive headquarters maintains unified real-time workforce visibility.",
    icon: "building",
    badge: "12+ Regions",
    screenTitle: "HQ Regional Command Center & Role Hierarchy",
    screenCategory: "Enterprise Multi-Branch Hub",
    stats: [
      { label: "Active Regions", val: "12+ States" },
      { label: "Branch Oversight", val: "Single HQ View" },
      { label: "Audit Readiness", val: "100% Traceable" },
    ],
    backdropGradient: "linear-gradient(135deg, #bfdbfe 0%, #60a5fa 45%, #2563eb 90%, #1d4ed8 100%)",
  },
  {
    id: "today",
    year: "Today",
    tag: "TRUSTED AT SCALE",
    title: "Powering 45,000+ Workers Every Day",
    desc: "Now trusted across 500+ active enterprise clients and 45,000+ employees daily. We continue to engineer software that removes administrative bureaucracy and puts human potential first.",
    icon: "sparkle",
    badge: "45,000+ Staff",
    screenTitle: "Workforce Intelligence & Executive Overview",
    screenCategory: "Unified HRMS Ecosystem",
    stats: [
      { label: "Daily Active Staff", val: "45,000+ People" },
      { label: "Client Retention", val: "99.2% Long-Term" },
      { label: "Platform Uptime", val: "99.98% High-Availability" },
    ],
    backdropGradient: "linear-gradient(135deg, #fef08a 0%, #fde047 35%, #f59e0b 80%, #d97706 100%)",
  },
];

export function AboutPage() {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("m2017");
  const activeMilestone =
    milestonesData.find((m) => m.id === activeMilestoneId) || milestonesData[0];

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "About Us" },
  ];

  return (
    <PageLayout hideCTA breadcrumbs={breadcrumbs}>
      <SEO
        title="About Us | LattiumHR — The People Behind Modern HR"
        description="Learn about LattiumHR. Founded in 2017 in Bengaluru, India, we build simple, dependable workforce management software so leaders can spend less time on paperwork and more time on people."
        canonicalPath="/about"
      />

      {/* 1. Hero: Purpose & Story with Elevated Colored Stage (Centered & Brand Colored) */}
      <section className="about-hero-section">
        <div className="hero-glow" />
        <div className="container">
          <div className="about-hero-center">
            <span className="hero-badge">
              <i>
                <Icon name="sparkle" size={14} />
              </i>
              ABOUT LATTIUMHR
            </span>

            <h1 className="about-hero-heading">
              Less paperwork. <em>More time</em> for people.
            </h1>

            <p className="about-hero-lead">
              We are a team of HR practitioners, technologists, and problem solvers who lived through the
              headaches of manual registers and disjointed spreadsheets. We built LattiumHR to give managers
              complete operational visibility and their personal time back.
            </p>

            {/* Credibility & Trust Highlight Pills */}
            <div className="about-hero-trust-strip">
              <div className="about-hero-trust-pill">
                <span className="pill-icon">
                  <Icon name="building" size={13} />
                </span>
                <span>Founded in Bengaluru, India</span>
              </div>
              <div className="about-hero-trust-pill">
                <span className="pill-icon">
                  <Icon name="users" size={13} />
                </span>
                <span>500+ Multi-Branch Organizations</span>
              </div>
              <div className="about-hero-trust-pill">
                <span className="pill-icon">
                  <Icon name="check" size={13} />
                </span>
                <span>45,000+ Active Workers Daily</span>
              </div>
              <div className="about-hero-trust-pill">
                <span className="pill-icon">
                  <Icon name="sparkle" size={13} />
                </span>
                <span>100% Pan-India Statutory Compliance</span>
              </div>
            </div>

            <div className="about-hero-mission-pill">
              <span className="trust-dot" />
              <span>Built for leaders who care deeply about their workforce</span>
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
            body="How a personal struggle with fragmented tools and chaotic spreadsheets sparked the creation of LattiumHR."
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
                <p className="story-founder-role">Founder & CEO, LattiumHR</p>
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

      {/* 3. Milestones on our Journey: Tabbed Interactive Showcase */}
      <section className="about-milestones-section">
        <div className="container">
          <SectionHeading
            eyebrow="HOW WE GOT HERE"
            title="Milestones on our journey"
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

          {/* Interactive 2-Column Milestone Stage (Text on Left, Image/Mockup on Right) */}
          <div className="milestone-showcase-stage">
            {/* Left Column: Text Content */}
            <div className="milestone-content-col">
              <div className="milestone-tag-row">
                <span className="milestone-stage-tag">
                  <Icon name={activeMilestone.icon} size={15} />
                  {activeMilestone.tag}
                </span>
                <span className="milestone-year-chip">{activeMilestone.year}</span>
              </div>

              <h3 className="milestone-content-title">{activeMilestone.title}</h3>
              <p className="milestone-content-desc">{activeMilestone.desc}</p>

              {/* Key Highlights / Metrics */}
              <div className="milestone-metrics-grid">
                {activeMilestone.stats.map((stat, i) => (
                  <div key={i} className="milestone-metric-item">
                    <span className="metric-val">{stat.val}</span>
                    <span className="metric-lbl">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="milestone-footer-row">
                <span className="milestone-badge-pill">
                  <Icon name="check" size={14} />
                  {activeMilestone.badge}
                </span>
              </div>
            </div>

            {/* Right Column: Visual Stage with Laptop Mockup */}
            <div className="milestone-visual-col">
              <div
                className="milestone-visual-card"
                style={{ background: activeMilestone.backdropGradient }}
              >
                {/* Ambient glow accent */}
                <div className="visual-stage-glow" />

                {/* Laptop Mockup Device */}
                <div className="milestone-laptop-mockup">
                  <div className="laptop-lid">
                    <div className="laptop-screen-bezel">
                      <div className="laptop-camera-dot" />
                      <div className="laptop-display-panel">
                        {/* Chrome/Browser Header */}
                        <div className="laptop-browser-chrome">
                          <div className="browser-dots">
                            <span className="b-dot red" />
                            <span className="b-dot yellow" />
                            <span className="b-dot green" />
                          </div>
                          <div className="browser-address-bar">
                            app.lattiumhr.com/milestone/{activeMilestone.year.toLowerCase()}
                          </div>
                        </div>

                        {/* Screen Content: Dashboard Screenshot */}
                        <div className="laptop-screen-viewport">
                          <img
                            src="/images/product-hero-dashboard.jpg"
                            alt={activeMilestone.screenTitle}
                            className="laptop-screen-image"
                          />

                          {/* Floating Screen Info Badge HUD */}
                          <div className="laptop-screen-hud">
                            <div className="hud-header">
                              <span className="hud-dot" />
                              <span className="hud-category">{activeMilestone.screenCategory}</span>
                            </div>
                            <div className="hud-title">{activeMilestone.screenTitle}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Laptop Base / Deck */}
                  <div className="laptop-base-deck">
                    <div className="laptop-deck-notch" />
                  </div>
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
            eyebrow="OUR PURPOSE"
            title="What drives us every day"
            body="Two fundamental commitments that shape every decision we make."
            center
          />

          <div className="purpose-showcase-grid">
            {/* Card 1: Mission */}
            <div className="purpose-card purpose-card--mission">
              <div className="purpose-ambient-glow" />
              <div className="purpose-card-header">
                <div className="purpose-icon-pill">
                  <Icon name="zap" size={20} />
                  <span>OUR MISSION</span>
                </div>
                <span className="purpose-badge">What drives us today</span>
              </div>

              <h3 className="purpose-title">
                Eliminating administrative friction so modern teams can thrive
              </h3>

              <p className="purpose-lead">
                We build software that removes the fear from statutory compliance and the drudgery from monthly payroll cycles—giving founders, HR managers, and employees hours back every single week.
              </p>

              <div className="purpose-divider" />

              <div className="purpose-pillars">
                <div className="purpose-pillar-item">
                  <span className="purpose-check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <div>
                    <strong>Zero Compliance Anxiety</strong>
                    <p>Automate 100% of statutory PF, ESI, PT, and TDS calculations without manual math.</p>
                  </div>
                </div>

                <div className="purpose-pillar-item">
                  <span className="purpose-check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <div>
                    <strong>Frictionless Multi-Branch Operations</strong>
                    <p>Unified shifts, biometric sync, and branch transfers tailored for distributed workforces.</p>
                  </div>
                </div>

                <div className="purpose-pillar-item">
                  <span className="purpose-check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <div>
                    <strong>Dedicated Human-First Support</strong>
                    <p>Real payroll specialists ready on phone and WhatsApp when your deadline is at stake.</p>
                  </div>
                </div>
              </div>

              <div className="purpose-footer">
                <span className="purpose-footer-tag">Our Promise</span>
                <span className="purpose-footer-text">Built with conviction for modern high-growth workplaces</span>
              </div>
            </div>

            {/* Card 2: Vision */}
            <div className="purpose-card purpose-card--vision">
              <div className="purpose-ambient-glow" />
              <div className="purpose-card-header">
                <div className="purpose-icon-pill">
                  <Icon name="globe" size={20} />
                  <span>OUR VISION</span>
                </div>
                <span className="purpose-badge">Where we are heading</span>
              </div>

              <h3 className="purpose-title">
                Making world-class, effortless HR universal for every organization
              </h3>

              <p className="purpose-lead">
                A workplace future where no modern business—from a 10-person startup to a multi-city enterprise—struggles with disjointed spreadsheets or opaque salary deductions.
              </p>

              <div className="purpose-divider" />

              <div className="purpose-pillars">
                <div className="purpose-pillar-item">
                  <span className="purpose-check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <div>
                    <strong>Enterprise Power, Consumer Simplicity</strong>
                    <p>Clean, consumer-grade UX that requires zero user manuals or expensive consultants.</p>
                  </div>
                </div>

                <div className="purpose-pillar-item">
                  <span className="purpose-check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <div>
                    <strong>Transparent Pay for Every Worker</strong>
                    <p>Clear payslips, instant leave visibility, and trust delivered right into employees' hands.</p>
                  </div>
                </div>

                <div className="purpose-pillar-item">
                  <span className="purpose-check-icon">
                    <Icon name="check" size={13} />
                  </span>
                  <div>
                    <strong>Resilient Infrastructure for Growth</strong>
                    <p>A high-speed cloud platform designed to scale smoothly from 10 to 10,000+ members.</p>
                  </div>
                </div>
              </div>

              <div className="purpose-footer">
                <span className="purpose-footer-tag">Our Horizon</span>
                <span className="purpose-footer-text">Empowering India's next generation of enterprises</span>
              </div>
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
                <stop offset="50%" stopColor="#004B49" stopOpacity="1" />
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
                <div className="stat-label-text">Businesses trust LattiumHR</div>
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

      {/* 8. Find Out More: Discover Lattium & Our Team (Careers, Case Studies, Resource Hub) */}
      <section className="about-discover-section">
        <div className="container">
          <SectionHeading
            eyebrow="EXPLORE LATTIUM"
            title="Find out more about Lattium and our team"
            center
          />

          <div className="about-discover-grid">
            {/* Card 1: Careers */}
            <div className="discover-card">
              <div className="discover-image-box">
                <img
                  src="/images/team-careers-card.jpg"
                  alt="LattiumHR Team and Careers"
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



