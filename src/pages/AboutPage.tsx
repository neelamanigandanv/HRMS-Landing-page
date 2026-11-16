import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import FooterCTA from "../components/common/FooterCTA";
import ImpactSection from "../components/common/ImpactSection";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import "./AboutPage.css";

const VALUE_CARDS = [
  {
    icon: "zap",
    title: "Simplicity First",
    desc: "If a workflow needs a user manual, it slows teams down. We design every interaction to be fast and intuitive.",
    points: [
      "Zero-Training Daily Workflows",
      "Clean 1-Tap Manager Approvals",
      "Fast Multi-Branch Onboarding",
    ],
  },
  {
    icon: "lock",
    title: "Data Privacy & Trust",
    desc: "Employee records and payroll figures are sacred. We protect company data with strict access rules and encryption.",
    points: [
      "Role-Based Access Controls",
      "Encrypted Pay & Record Vault",
      "Audit-Ready Compliance Logs",
    ],
  },
  {
    icon: "users",
    title: "Customer at the Center",
    desc: "We never hide behind automated queues. When urgent payday deadlines arrive, our specialists stand beside you.",
    points: [
      "Dedicated Onboarding Specialists",
      "Priority Payday Resolution",
      "Direct HR Policy Guidance",
    ],
  },
  {
    icon: "shield",
    title: "Radical Transparency",
    desc: "Honest communication, clear workforce policies, and straightforward pricing — inside our team and with clients.",
    points: [
      "Clear Itemized Pay Breakdowns",
      "Straightforward Plan Pricing",
      "Open Leave & Policy Rules",
    ],
  },
];

export function AboutPage() {
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
        <img
          src="/images/hero-hr-working-pro.webp"
          alt=""
          aria-hidden="true"
          className="about-hero-bg-img"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="about-hero-ambient" aria-hidden="true" />
        <div className="about-hero-frame" aria-hidden="true" />
        <div className="container">
          <div className="about-hero-center">
            <span className="about-hero-chip">
              <Icon name="star" size={12} />
              About Zentilos
              <Icon name="star" size={12} />
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

            <div className="about-hero-meta" aria-hidden="true">
              <span>Est. 2017</span>
              <span className="about-hero-meta-dot" />
              <span>Bengaluru, India</span>
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
                  src="/images/leader-kavya-sundaram.webp"
                  alt="Kavya Sundaram, Founder & CEO"
                  className="story-founder-img"
                  loading="lazy"
                  decoding="async"
                />
                <span className="story-founder-badge">Est. 2017</span>
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
              <span className="story-narrative-kicker">
                <Icon name="sparkle" size={14} />
                From frustration to focus
              </span>
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

      {/* 3. HOW WE GOT HERE — Full-width split, matches reference exactly */}
      <section className="about-milestones-section" id="milestones" aria-labelledby="milestones-heading">
        <div className="container">
          <div className="ms2-grid">

            {/* ── LEFT HALF: Top Photo + Bottom Row ── */}
            <div className="ms2-left">
              {/* Top Photo */}
              <div className="ms2-photo-card">
                <img
                  src="/images/about-milestone-team.jpg"
                  alt="Team collaboration in modern office"
                  className="ms2-team-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Bottom Row */}
              <div className="ms2-bottom-row">

                {/* Lime Experience Box */}
                <div className="ms2-lime-card">
                  <div className="ms2-ribbon-tag" aria-hidden="true">
                    EXPERIENCE
                  </div>
                  <div className="ms2-stat-20">20<sup>+</sup></div>
                  <p className="ms2-stat-sub">
                    Years of Excellence in IT Solutions Company.
                  </p>
                </div>

                {/* White Founder Card */}
                <div className="ms2-founder-card">
                  <div className="ms2-founder-left">
                    <img
                      src="/images/about-founder-avatar.webp"
                      alt="Burdee Nicolas, Co. Founder"
                      className="ms2-avatar-img"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="ms2-founder-details">
                      <strong>Burdee Nicolas</strong>
                      <span>Co. Founder</span>
                    </div>
                  </div>
                  <div className="ms2-v-divider" aria-hidden="true" />
                  <div className="ms2-sig-wrap">
                    <img
                      src="/images/about-burdee-signature.png"
                      alt="Burdee Nicolas Signature"
                      className="ms2-hand-sig-img"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* ── RIGHT HALF: Large White Content Card ── */}
            <div className="ms2-right-card">
              <span className="ms2-eyebrow">ABOUT ZENTILOS</span>

              <h2 id="milestones-heading" className="ms2-headline">
                Delivering Solution That<br />
                Drive Our Innovation &amp;<br />
                Fast Success.
              </h2>

              <p className="ms2-desc">
                We are a team of passionate tech experts delivering innovative IT solutions
                tailored to help businesses grow, adapt, and thrive in a digital. Stay ahead
                of the competition.
              </p>

              {/* Stats + Circular Brand Stamp */}
              <div className="ms2-metrics-row">
                <div className="ms2-metrics-stats">
                  <div className="ms2-metric-col">
                    <div className="ms2-metric-num">3K<sup>+</sup></div>
                    <div className="ms2-metric-lbl">Successful Projects.</div>
                  </div>
                  <div className="ms2-metric-col">
                    <div className="ms2-metric-num">98<sup>+</sup></div>
                    <div className="ms2-metric-lbl">IT Professionals.</div>
                  </div>
                </div>

                <div className="ms2-badge-cluster">
                  <div className="ms2-logo-stamp" role="img" aria-label="Zentilos — About Us">
                    <svg className="ms2-logo-stamp-ring" viewBox="0 0 120 120" aria-hidden="true">
                      <defs>
                        <path
                          id="ms2BrandRing"
                          d="M 60,60 m -41,0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0"
                        />
                      </defs>
                      <circle cx="60" cy="60" r="58" fill="#004B49" />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="#2E7B76"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                      />
                      <text fill="#D2F535" fontSize="9" fontWeight="800" letterSpacing="0.14em">
                        <textPath href="#ms2BrandRing" startOffset="12%">
                          ZENTILOS · ABOUT US · EST. 2017 ·
                        </textPath>
                      </text>
                    </svg>
                    <span className="ms2-logo-stamp-center">
                      <img
                        src="/images/logo-mark.webp"
                        alt=""
                        className="ms2-logo-stamp-mark"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
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
                  src="/images/leader-kavya-sundaram-profile.webp"
                  alt="Kavya Sundaram, Founder & CEO"
                  className="leader-photo"
                  loading="lazy"
                  decoding="async"
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
                  src="/images/leader-rohan-mehta.webp"
                  alt="Rohan Mehta, Co-Founder & CTO"
                  className="leader-photo"
                  loading="lazy"
                  decoding="async"
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
                  src="/images/leader-ananya-kapoor.webp"
                  alt="Ananya Kapoor, Head of Product & Customer Success"
                  className="leader-photo"
                  loading="lazy"
                  decoding="async"
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
            {VALUE_CARDS.map((item, i) => (
              <div className="setup-card about-value-card" key={item.title}>
                <span className="value-card-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`setup-icon i${i}`}>
                  <Icon name={item.icon as IconName} />
                </span>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
                <div className={`setup-art setup-art-points setup-art-bg-${i}`}>
                  <ul className="setup-points">
                    {item.points.map((pt) => (
                      <li key={pt} className="setup-point-item">
                        <span className="setup-point-check" aria-hidden="true">
                          <Icon name="check" size={11} />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Numbers: Animated Running Counters matching Home Page exact size and teal color */}
      <ImpactSection />

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
                  src="/images/team-careers-card.webp"
                  alt="Zentilos Team and Careers"
                  className="discover-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="discover-card-body">
                <span className="discover-tag">CAREERS</span>
                <h3 className="discover-title">
                  Join us, and build the future of modern work
                </h3>
                <Link to="/careers" className="discover-btn" aria-label="Learn more about careers at Zentilos">
                  Learn more <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>

            {/* Card 2: Security & Compliance */}
            <div className="discover-card">
              <div className="discover-image-box">
                <img
                  src="/images/doc-block-compliance.webp"
                  alt="Enterprise Security and Compliance Standards"
                  className="discover-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="discover-card-body">
                <span className="discover-tag">SECURITY &amp; COMPLIANCE</span>
                <h3 className="discover-title">
                  Enterprise-grade encryption, data privacy, and statutory compliance
                </h3>
                <Link to="/security" className="discover-btn" aria-label="Learn more about enterprise security at Zentilos">
                  Learn more <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>

            {/* Card 3: Partner Ecosystem */}
            <div className="discover-card">
              <div className="discover-image-box">
                <img
                  src="/images/work-process-team.webp"
                  alt="Zentilos Partner Network and Certified Consultants"
                  className="discover-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="discover-card-body">
                <span className="discover-tag">PARTNER ECOSYSTEM</span>
                <h3 className="discover-title">
                  Grow with our ecosystem of consultants, accountants &amp; ERP leaders
                </h3>
                <Link to="/partners" className="discover-btn" aria-label="Learn more about the Zentilos partner program">
                  Learn more <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL FOOTER CTA (Matching Home Page Flagship Banner)
          ========================================================================= */}
      <FooterCTA
        eyebrowBadgeText="Built by HR Tech Specialists in Bengaluru"
        headlineLine1="Ready to Build a Better"
        headlineLine2="Workforce Future with Zentilos?"
        subheadlineLine1="Discover how simple, connected, and compliant people operations transform multi-branch team productivity."
        primaryButtonText="Book a Live Tour"
        secondaryButtonText="Explore Careers"
        secondaryButtonLink="/careers"
      />
    </PageLayout>
  );
}

export default AboutPage;



