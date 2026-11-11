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

      {/* 3. Milestones on our Journey: Focused Narrative & Impact */}
      <section className="about-milestones-section" id="milestones">
        <div className="container">
          <SectionHeading
            eyebrow="✦ HOW WE GOT HERE ✦"
            title="Milestones on our journey"
            body="From our founding spark in Bengaluru to powering tens of thousands of workforce operations daily."
            center
          />

          {/* 2-Column Showcase Layout: Left Team Image, Right Story & 2 Stat Cards */}
          <div className="milestone-showcase-stage">
            <div className="milestone-img-wrapper">
              <img
                src="/images/about-milestone-journey.webp"
                alt="Zentilos founding team collaborating in our Bengaluru workspace"
                className="milestone-journey-img"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="milestone-info-wrapper">
              <h3 className="milestone-headline">
                Built for modern multi-branch teams — unifying attendance, workflows, and payroll in
                one calm system.
              </h3>

              <p className="milestone-paragraph">
                Zentilos unifies every layer of workforce operations. From streamlined employee
                onboarding and automated document verification to geofenced branch attendance and
                100% compliant statutory payroll, we empower growing organizations to scale with
                zero administrative friction.
              </p>

              {/* Bottom 2 Pastel Stat Cards */}
              <div className="milestone-stat-cards">
                <div className="milestone-stat-card milestone-stat-card--purple">
                  <div className="milestone-card-icon" aria-hidden="true">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="#18181b"
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
                      <path d="M36 9L43 12L36 15Z" fill="none" />
                    </svg>
                  </div>
                  <span className="milestone-card-num">40k+</span>
                  <span className="milestone-card-label">Employees on Platform</span>
                </div>

                <div className="milestone-stat-card milestone-stat-card--mint">
                  <div className="milestone-card-icon" aria-hidden="true">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="#18181b"
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
                  <span className="milestone-card-num">98%</span>
                  <span className="milestone-card-label">On-Time Payroll Rate</span>
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
                  src="/images/leader-kavya-sundaram.webp"
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
              <div className="setup-card" key={item.title}>
                <span className={`setup-icon i${i}`}>
                  <Icon name={item.icon as IconName} />
                </span>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
                <div className={`setup-art setup-art-points setup-art-bg-${i}`}>
                  <ul className="setup-points">
                    {item.points.map((pt) => (
                      <li key={pt} className="setup-point-item">
                        <svg
                          className="setup-point-arrow"
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="3.5" y1="3.5" x2="12.5" y2="12.5" />
                          <polyline points="12.5 5.5 12.5 12.5 5.5 12.5" />
                        </svg>
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



