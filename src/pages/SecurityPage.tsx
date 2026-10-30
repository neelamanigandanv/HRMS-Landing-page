import React, { useState, useEffect, useRef } from "react";
import PageLayout from "../components/layout/PageLayout";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import Icon, { IconName } from "../components/ui/Icon";
import { useDemoModal } from "../context/DemoModalContext";
import "./Blog.css";
import "./GuideDetailPage.css";
import "./SecurityPage.css";

// 8 Security Sections TOC matching GuideDetailPage style
const SECURITY_TOC = [
  { id: "architecture", number: "01", title: "1. Multi-Tier Security Architecture & Isolation" },
  { id: "hosting-residency", number: "02", title: "2. Tier-III Domestic Data Hosting & Residency" },
  { id: "encryption", number: "03", title: "3. Cryptographic Controls: At Rest & In Transit" },
  { id: "identity-rbac", number: "04", title: "4. Identity Governance, SAML SSO & RBAC" },
  { id: "application-security", number: "05", title: "5. Application Security & DevSecOps SDLC" },
  { id: "backup-bcp", number: "06", title: "6. Automated Backups & Disaster Recovery SLAs" },
  { id: "compliance-checklist", number: "07", title: "7. Enterprise Infosec Verification Checklist" },
  { id: "incident-response", number: "08", title: "8. Incident Management & Responsible Disclosure" },
];

// Interactive Cryptographic Tabs (matching the Salary Slabs / Leave Types tabs in GuideDetailPage)
const CRYPTO_TABS = [
  {
    category: "Data at Rest (AES-256)",
    items: [
      {
        name: "PostgreSQL Database Volumes",
        quota: "AES-256 Block Cipher",
        desc: "All relational customer databases, indexes, write-ahead logs, and temporary tablespaces are encrypted using XTS-AES-256 encryption.",
        rules: "Encrypted at the physical storage controller level with zero throughput penalty.",
      },
      {
        name: "Document Vault & S3 Buckets",
        quota: "Unique KMS Envelope Keys",
        desc: "Employee tax filings, payslip PDFs, statutory proofs, and contract scans are encrypted with isolated per-object envelope keys.",
        rules: "Keys are generated and secured by FIPS 140-2 Level 3 Hardware Security Modules.",
      },
      {
        name: "Biometric & Credential Hashes",
        quota: "Argon2id & SHA-256",
        desc: "Authentication passwords and biometric facial/fingerprint match vectors are salted and hashed using memory-hard Argon2id.",
        rules: "Irreversible one-way cryptographic hashing; plaintext biometric logs are never recorded.",
      },
      {
        name: "Backup Snapshots & Cold Storage",
        quota: "WORM-Protected Vaults",
        desc: "Daily automated database snapshots and transaction journals are encrypted prior to cross-region replication.",
        rules: "Immutable write-once-read-many (WORM) retention preventing unauthorized deletion.",
      },
    ],
  },
  {
    category: "Data in Transit (TLS 1.3)",
    items: [
      {
        name: "Web & Mobile Endpoints",
        quota: "TLS 1.3 Mandatory",
        desc: "All browser and native iOS/Android communication is strictly routed through TLS 1.3 with Perfect Forward Secrecy (PFS).",
        rules: "Deprecated cipher suites (TLS 1.0, 1.1, and SSL v3) are permanently blocked at the edge.",
      },
      {
        name: "Biometric Hardware Gateways",
        quota: "Mutual TLS (mTLS)",
        desc: "Biometric attendance turnstiles and geo-clock devices communicate via encrypted WebSocket channels using x509 client certificates.",
        rules: "Prevents hardware spoofing, machine-in-the-middle, and local network packet inspection.",
      },
      {
        name: "Cloudflare Enterprise Edge",
        quota: "DDoS & WAF Shielding",
        desc: "Cloudflare Enterprise filters malicious traffic, automated scrapers, and volumetric DDoS attacks before reaching origin servers.",
        rules: "Sub-10ms latency across Indian Tier-1 peering networks with 100% edge SLA.",
      },
      {
        name: "REST API & Webhooks",
        quota: "HMAC-SHA256 Signatures",
        desc: "Outbound and inbound webhook integration payloads are cryptographically signed with shared secrets for non-repudiation.",
        rules: "Enforces strict timestamp headers to eliminate replay attack vectors.",
      },
    ],
  },
  {
    category: "Key Management (AWS KMS)",
    items: [
      {
        name: "Automated Annual Key Rotation",
        quota: "Zero-Downtime Re-key",
        desc: "Customer Master Keys (CMKs) rotate automatically every 365 days without requiring bulk database re-encryption.",
        rules: "Legacy keys are safely archived to permit seamless decryption of historical audits.",
      },
      {
        name: "Hardware Security Modules",
        quota: "FIPS 140-2 Level 3",
        desc: "Cryptographic operations and key generation occur strictly inside certified physical tamper-evident hardware modules.",
        rules: "Plaintext master keys can never be exported or read by human operators.",
      },
      {
        name: "Strict IAM Role Separation",
        quota: "Dual-Control Auth",
        desc: "Key administration privileges are strictly isolated from application database access, enforcing four-eyes approval principles.",
        rules: "Prevents internal operator privilege escalation or unapproved key usage.",
      },
      {
        name: "Immutable Access Audit Logs",
        quota: "100% Cryptographic Audit",
        desc: "Every single key access or decryption request generates a signed, non-repudiable CloudTrail event.",
        rules: "Directly reviewed and validated during annual SOC 2 and ISO 27001 assessments.",
      },
    ],
  },
];

// Interactive Audit Checklist (matching GuideDetailPage audit checklist)
const INITIAL_SECURITY_CHECKLIST = [
  { id: "chk-1", text: "ISO/IEC 27001:2022 Information Security Management System (ISMS) certified", done: true },
  { id: "chk-2", text: "SOC 2 Type II external audit report covering Security, Confidentiality & Availability", done: true },
  { id: "chk-3", text: "100% Domestic Data Residency within ISO-certified Tier-III Indian cloud data centers", done: true },
  { id: "chk-4", text: "Complete compliance with India Digital Personal Data Protection Act (DPDP Act 2023)", done: true },
  { id: "chk-5", text: "AES-256 encryption at rest for all database volumes, document vaults & backup snapshots", done: true },
  { id: "chk-6", text: "Mandatory TLS 1.3 encryption in transit with Perfect Forward Secrecy for all endpoints", done: true },
  { id: "chk-7", text: "Enterprise Single Sign-On (SAML 2.0 / OIDC) supporting Okta, Azure AD & Google Workspace", done: true },
  { id: "chk-8", text: "Mandatory Multi-Factor Authentication (MFA) & granular Role-Based Access Control (RBAC)", done: true },
  { id: "chk-9", text: "Automated Continuous WAL Backups with Point-in-Time Recovery (RPO < 15 min, RTO < 1 hour)", done: true },
  { id: "chk-10", text: "Bi-annual independent third-party penetration testing and 24/7 SOC incident response SLA", done: true },
];

export function SecurityPage() {
  const { openDemoModal } = useDemoModal();
  const [activeToc, setActiveToc] = useState<string>("architecture");
  const [cryptoTab, setCryptoTab] = useState<number>(0);
  const [checklist, setChecklist] = useState(INITIAL_SECURITY_CHECKLIST);
  const isClickScrollingRef = useRef<boolean>(false);

  const completedCount = checklist.filter((item) => item.done).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const resetChecklist = () => {
    setChecklist((prev) => prev.map((item) => ({ ...item, done: false })));
  };

  // Scroll spy to highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const navOffset = 180;
      const tocIds = SECURITY_TOC.map((t) => t.id);
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page: activate last item
      if (windowHeight + scrollY >= documentHeight - 120) {
        setActiveToc(tocIds[tocIds.length - 1]);
        return;
      }

      let currentActiveId = tocIds[0];

      for (const id of tocIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navOffset) {
            currentActiveId = id;
          }
        }
      }

      if (currentActiveId) {
        setActiveToc(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section when TOC link clicked
  const scrollToSection = (id: string) => {
    setActiveToc(id);
    const element = document.getElementById(id);
    if (element) {
      isClickScrollingRef.current = true;
      const navOffset = 95;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 700);
    }
  };

  const handlePrintBrief = () => {
    window.print();
  };

  const breadcrumbs = [
    { label: "Company", to: "/about" },
    { label: "Security & Trust" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA={true}>
      <SEO
        title="Enterprise Security & Continuous Compliance | LattiumHR"
        description="Learn how LattiumHR protects confidential employee identity, payroll records, and biometric data with layered technical and organizational safeguards."
        canonicalPath="/security"
      />

      <div className="guide-detail-page">
        {/* ==========================================================================
            1. HERO / BANNER (CENTERED, CLEAN, NO FLOW CARD - MATCHING USER DIRECTIVE)
            ========================================================================== */}
        <section className="guide-detail-hero" aria-labelledby="security-page-title">
          <div className="guide-detail-container">
            <div className="guide-hero-centered-content">
              <span className="guide-hero-eyebrow">
                <Icon name="shield" size={13} /> UPDATED OCTOBER 2026 • ENTERPRISE SECURITY DIRECTIVE
              </span>

              <h1 id="security-page-title" className="guide-hero-title">
                Enterprise Security &amp;{" "}
                <span className="guide-hero-title-highlight">Continuous Compliance</span>
              </h1>

              <p className="guide-hero-subtitle">
                How LattiumHR protects sensitive workforce identity, financial disbursements, and
                biometric records with multi-tenant isolation, cryptographic safeguards, and strict regulatory adherence.
              </p>

              {/* Authoritative Security Badges Row (Replaces Playbook Flow Cards on Hero) */}
              <div className="security-hero-badges-row">
                <span className="security-hero-badge-pill">
                  <Icon name="shield" size={14} /> ISO 27001:2022 Certified
                </span>
                <span className="security-hero-badge-pill">
                  <Icon name="check" size={14} /> SOC 2 Type II Audited
                </span>
                <span className="security-hero-badge-pill">
                  <Icon name="lock" size={14} /> AES-256 &amp; TLS 1.3
                </span>
                <span className="security-hero-badge-pill">
                  <Icon name="globe" size={14} /> 100% Domestic India Residency
                </span>
                <span className="security-hero-badge-pill">
                  <Icon name="clock" size={14} /> 99.99% Uptime SLA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            2. TWO-COLUMN LAYOUT: STICKY TOC SIDEBAR (LEFT) + RICH PROSE & CONTROLS (RIGHT)
            ========================================================================== */}
        <div className="guide-detail-container">
          <div className="guide-layout-grid">
            {/* Left Column: Sticky Topics, Action Card, and Download Button */}
            <aside className="guide-sidebar-col" aria-label="Security Navigation">
              <div className="guide-sidebar-sticky">
                {/* 1. Topics Directory Card */}
                <div className="guide-topics-card">
                  <div className="guide-topics-header">
                    <Icon name="shield" size={16} /> SECURITY DIRECTORY
                  </div>

                  <nav className="guide-topics-nav" aria-label="Security Sections">
                    {SECURITY_TOC.map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        className={`guide-topic-nav-item ${activeToc === sec.id ? "active" : ""}`}
                        onClick={() => scrollToSection(sec.id)}
                        aria-current={activeToc === sec.id ? "true" : undefined}
                      >
                        <span className="topic-num">{sec.number}</span>
                        <span className="topic-text">{sec.title.replace(/^\d+\.\s*/, "")}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* 2. Security Attestation CTA Card */}
                <div className="guide-sidebar-cta-card">
                  <span className="sidebar-cta-badge">
                    <Icon name="award" size={12} /> COMPLIANCE PACKAGE
                  </span>
                  <h4>Need SOC 2 Type II or ISO 27001 Reports?</h4>
                  <p>
                    Our infosec team provides full audit reports, external penetration test summaries,
                    and completed vendor risk assessment questionnaires within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      openDemoModal({
                        title: "Request Enterprise Security Package",
                        subtitle:
                          "Our security team will share our complete SOC 2 Type II audit report, ISO 27001 certificate, and architecture whitepaper.",
                        defaultInterest: "Enterprise Security & Compliance",
                      })
                    }
                    className="sidebar-cta-btn"
                  >
                    Request Security Package <Icon name="arrow" size={14} />
                  </button>
                  <div className="sidebar-cta-guarantee">
                    <Icon name="check" size={13} /> Strict Bilateral NDA Observed
                  </div>
                </div>

                {/* 3. Print / Save Security Brief */}
                <div className="security-download-card">
                  <button
                    type="button"
                    onClick={handlePrintBrief}
                    className="security-download-btn"
                    title="Print or Save PDF of Security Directive"
                  >
                    <Icon name="download" size={14} /> Print / Save Security PDF
                  </button>
                  <div className="security-direct-lead">
                    <Icon name="shield" size={12} /> Direct SLA: security@lattiumhr.com
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: 8 Comprehensive Security Sections */}
            <main className="guide-main-article-content">
              {/* Section 1: Architecture & Tenant Isolation */}
              <section id="architecture" className="guide-prose-section">
                <h2>1. Multi-Tier Security Architecture &amp; Tenant Isolation</h2>
                <p>
                  At LattiumHR, data security is central to everything we design, develop, and operate.
                  Human resources, workforce management, and automated payroll platforms process an organization&apos;s
                  most confidential employee identity and financial records. We treat this responsibility with
                  defense-in-depth engineering principles.
                </p>
                <p>
                  Our architecture enforces <strong>strict logical and cryptographic multi-tenant separation</strong>.
                  Each customer&apos;s data is isolated at the database schema level with independent relational boundaries.
                  Cross-tenant data queries are structurally blocked by our application ORM layers and verified
                  by automated database policy checks on every transactional request.
                </p>

                <div className="guide-callout-box">
                  <div className="guide-callout-title">
                    <Icon name="sparkle" size={16} /> Enterprise Security Standard
                  </div>
                  <p>
                    <strong>Zero Cross-Tenant Leakage Guarantee:</strong> Application workloads access tenant databases
                    using scoped, ephemeral connection pools. Even in the theoretical case of an application-layer anomaly,
                    database-level row security (RLS) ensures one tenant can never access or inspect another organization&apos;s records.
                  </p>
                </div>
              </section>

              {/* Section 2: Data Hosting & Domestic Residency */}
              <section id="hosting-residency" className="guide-prose-section">
                <h2>2. Tier-III Domestic Data Hosting &amp; Residency</h2>
                <p>
                  All customer databases, transaction logs, and LattiumHR cloud application workloads are hosted
                  exclusively in <strong>ISO 27001-certified Tier-III cloud data centers located geographically within India</strong>{" "}
                  (AWS Mumbai and Hyderabad dual-region availability zones).
                </p>
                <p>
                  Hosting all primary databases, standby replicas, and backup facilities within domestic infrastructure
                  ensures strict adherence to national data sovereignty mandates:
                </p>
                <ul>
                  <li>
                    <strong>Digital Personal Data Protection Act (DPDP Act 2023):</strong> Guaranteed domestic storage and processing of employee Aadhaar, PAN, and compensation metrics.
                  </li>
                  <li>
                    <strong>Physical &amp; Environmental Security:</strong> Tier-III biometric turnstiles, mantrap security corridors, 24/7 armed monitoring, and N+1 redundant power and cooling.
                  </li>
                  <li>
                    <strong>Dual-Region High Availability:</strong> Active-passive database clusters span geographically separated fault domains to ensure instantaneous failover.
                  </li>
                  <li>
                    <strong>Biometric Hardware Isolation:</strong> Biometric facial recognition and fingerprint reader data streams terminate directly in domestic microservices without international relays.
                  </li>
                </ul>

                <div className="guide-callout-box">
                  <div className="guide-callout-title">
                    <Icon name="sparkle" size={16} /> Domestic Sovereign Guarantee
                  </div>
                  <p>
                    LattiumHR maintains zero offshore cloud storage dependencies for primary client data.
                    All employee records, monthly payroll registers, and biometric event journals remain permanently within Indian territory.
                  </p>
                </div>
              </section>

              {/* Section 3: Cryptographic Controls (Interactive Tabbed View) */}
              <section id="encryption" className="guide-prose-section">
                <h2>3. Cryptographic Controls: Data at Rest &amp; in Transit</h2>
                <p>
                  We apply defense-grade cryptographic safeguards across the entire data lifecycle.
                  Explore our technical encryption policies, cipher suites, and key management frameworks:
                </p>

                {/* Interactive Cryptographic Tabs */}
                <div className="salary-components-interactive">
                  <div className="salary-tabs-header">
                    {CRYPTO_TABS.map((cat, idx) => (
                      <button
                        key={cat.category}
                        type="button"
                        className={`salary-tab-btn ${cryptoTab === idx ? "active" : ""}`}
                        onClick={() => setCryptoTab(idx)}
                      >
                        {cat.category}
                      </button>
                    ))}
                  </div>

                  <div className="salary-tab-content">
                    <div className="component-card-grid">
                      {CRYPTO_TABS[cryptoTab].items.map((item) => (
                        <div key={item.name} className="component-item-card">
                          <h4 className="component-item-title">{item.name}</h4>
                          <span className="component-item-share">{item.quota}</span>
                          <p className="component-item-desc">{item.desc}</p>
                          <span className="component-item-taxable">{item.rules}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="guide-callout-box">
                  <div className="guide-callout-title">
                    <Icon name="sparkle" size={16} /> Cryptographic Takeaway
                  </div>
                  <p>
                    All customer records, database snapshots, and document vaults are encrypted with <strong>AES-256</strong>.
                    Data in transit is strictly encrypted over <strong>TLS 1.3</strong> with Perfect Forward Secrecy.
                    Master keys are safeguarded inside FIPS 140-2 Level 3 Hardware Security Modules.
                  </p>
                </div>
              </section>

              {/* Section 4: Identity & RBAC */}
              <section id="identity-rbac" className="guide-prose-section">
                <h2>4. Identity Governance, SAML SSO &amp; Granular RBAC</h2>
                <p>
                  Managing workforce operations requires protecting executive salary data, performance appraisals,
                  and sensitive disciplinary files from unauthorized internal visibility:
                </p>
                <ul>
                  <li>
                    <strong>Enterprise Single Sign-On (SSO):</strong> Turnkey SAML 2.0 and OIDC integrations with Google Workspace, Microsoft Azure Entra ID, and Okta, enabling centralized onboarding and instant deprovisioning.
                  </li>
                  <li>
                    <strong>Mandatory Multi-Factor Authentication (MFA):</strong> Enforced for all HR administrators, payroll managers, and executive leadership using authenticator apps (TOTP) and hardware security keys (FIDO2/WebAuthn).
                  </li>
                  <li>
                    <strong>Field-Level Salary Masking:</strong> Department managers can approve shift plans and leave requests without being exposed to underlying CTC figures or bank credentials.
                  </li>
                  <li>
                    <strong>IP &amp; Geo-Fencing Policies:</strong> Restrict biometric check-ins and payroll finalizations to designated corporate IP subnets and verified office GPS perimeters.
                  </li>
                </ul>

                <div className="guide-callout-box">
                  <div className="guide-callout-title">
                    <Icon name="sparkle" size={16} /> Principle of Least Privilege
                  </div>
                  <p>
                    Administrative access to production clusters requires time-limited, audited privilege escalation
                    routed exclusively through encrypted bastion jump hosts with full session video recording.
                  </p>
                </div>
              </section>

              {/* Section 5: Application Security & DevSecOps */}
              <section id="application-security" className="guide-prose-section">
                <h2>5. Application Security &amp; DevSecOps SDLC</h2>
                <p>
                  Security is integrated into every stage of the software development lifecycle rather than treated
                  as an afterthought:
                </p>
                <ul>
                  <li>
                    <strong>Automated Static &amp; Dynamic Analysis (SAST/DAST):</strong> Every code commit and pull request is scanned for OWASP Top 10 vulnerabilities, credential leaks, and outdated dependencies before build approval.
                  </li>
                  <li>
                    <strong>Mandatory Dual Peer Review:</strong> No engineer can push code directly to production. All merged code requires review and sign-off from two senior engineers including a designated security champion.
                  </li>
                  <li>
                    <strong>Annual Independent Penetration Testing:</strong> External, CERT-In accredited cyber firms conduct comprehensive grey-box penetration tests across web portals, REST APIs, and mobile app packages.
                  </li>
                  <li>
                    <strong>Continuous Vulnerability Remediation:</strong> Critical security patches are tested in staging environments and deployed to production clusters within a 72-hour SLA.
                  </li>
                </ul>

                <div className="guide-callout-box">
                  <div className="guide-callout-title">
                    <Icon name="sparkle" size={16} /> DevSecOps Standard
                  </div>
                  <p>
                    LattiumHR maintains a zero-known-critical-vulnerability policy. All software releases pass
                    rigorous automated vulnerability checks and regression suites before staging rollout.
                  </p>
                </div>
              </section>

              {/* Section 6: Backup & Disaster Recovery SLAs */}
              <section id="backup-bcp" className="guide-prose-section">
                <h2>6. Automated Backups &amp; Disaster Recovery SLAs</h2>
                <p>
                  To eliminate the risk of hardware failures, natural catastrophes, or operational corruption,
                  we operate an automated business continuity and disaster recovery framework:
                </p>
                <ul>
                  <li>
                    <strong>Continuous Write-Ahead Log (WAL) Archiving:</strong> Real-time replication enables Point-in-Time Recovery (PITR) to any single second within the past 35 days.
                  </li>
                  <li>
                    <strong>Recovery Point Objective (RPO) &lt; 15 Minutes:</strong> In the worst-case disaster scenario, potential data loss is mathematically bounded to less than 15 minutes.
                  </li>
                  <li>
                    <strong>Recovery Time Objective (RTO) &lt; 1 Hour:</strong> Full application restoration and database promotion completes within 60 minutes.
                  </li>
                  <li>
                    <strong>Semi-Annual Live Recovery Simulations:</strong> Engineering leads execute scheduled failover exercises to validate cold restore integrity without customer impact.
                  </li>
                </ul>

                <div className="guide-callout-box">
                  <div className="guide-callout-title">
                    <Icon name="sparkle" size={16} /> High Availability Commitment
                  </div>
                  <p>
                    Backed by multi-AZ redundant nodes and automated load rebalancing, LattiumHR commits to a
                    <strong>99.99% operational uptime SLA</strong> with financial service credit guarantees for enterprise customers.
                  </p>
                </div>
              </section>

              {/* Section 7: Interactive Enterprise Security Checklist */}
              <section id="compliance-checklist" className="guide-prose-section">
                <h2>7. Enterprise Security Verification Checklist</h2>
                <p>
                  Use this interactive verification checklist to evaluate LattiumHR against your organization&apos;s
                  internal Information Security (InfoSec) and procurement standards:
                </p>

                <div className="guide-audit-checklist-card">
                  <div className="audit-checklist-header">
                    <div className="audit-progress-meta">
                      <span className="audit-score-badge">
                        {completedCount} / {checklist.length} Controls Verified
                      </span>
                      <span className="audit-percent-text">{progressPercent}% Enterprise Ready</span>
                    </div>

                    <div className="audit-progress-track" aria-hidden="true">
                      <div
                        className="audit-progress-fill"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="audit-checklist-items">
                    {checklist.map((item) => (
                      <label
                        key={item.id}
                        className={`audit-check-row ${item.done ? "is-checked" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleChecklistItem(item.id)}
                          className="audit-checkbox"
                        />
                        <span className="audit-item-label">{item.text}</span>
                        {item.done && (
                          <span className="audit-verified-badge">
                            <Icon name="check" size={12} /> Verified
                          </span>
                        )}
                      </label>
                    ))}
                  </div>

                  <div className="audit-checklist-footer">
                    <button
                      type="button"
                      onClick={resetChecklist}
                      className="audit-reset-btn"
                    >
                      Reset Checklist
                    </button>
                    <span className="audit-footer-note">
                      All 10 controls are fully certified and ready for vendor risk evaluation.
                    </span>
                  </div>
                </div>

                <div className="guide-callout-box">
                  <div className="guide-callout-title">
                    <Icon name="sparkle" size={16} /> Vendor Due Diligence
                  </div>
                  <p>
                    Need a tailored vendor security assessment (VSA), SIG questionnaire, or CAIQ completed?
                    Our dedicated compliance officers provide completed assessments within 24–48 hours.
                  </p>
                </div>
              </section>

              {/* Section 8: Incident Response & Responsible Disclosure */}
              <section id="incident-response" className="guide-prose-section">
                <h2>8. Incident Management &amp; Responsible Disclosure</h2>
                <p>
                  In the unlikely event of a suspected or confirmed security event impacting platform availability
                  or customer records, our incident command team follows an audited response framework:
                </p>
                <ul>
                  <li>
                    <strong>Immediate Containment &amp; Isolation:</strong> 24/7 Security Operations Center (SOC) telemetry flags suspicious anomalies, automatically throttling compromised endpoints.
                  </li>
                  <li>
                    <strong>Contractual 72-Hour Notification SLA:</strong> Affected customer administrators are notified via primary technical contacts within 72 hours of verified security confirmation.
                  </li>
                  <li>
                    <strong>Forensic Post-Mortem Transparency:</strong> Complete root-cause analysis (RCA) and mitigation reports are published to affected customers following incident resolution.
                  </li>
                  <li>
                    <strong>Responsible Vulnerability Disclosure Program:</strong> We welcome ethical reports from security researchers. Disclosures to <code>security@lattiumhr.com</code> receive review within 1 business day under safe-harbor terms.
                  </li>
                </ul>

                <div className="guide-callout-box">
                  <div className="guide-callout-title">
                    <Icon name="sparkle" size={16} /> Contact InfoSec Team
                  </div>
                  <p>
                    For urgent vulnerability disclosures or to exchange PGP encrypted keys, email our security leads
                    directly at <a href="mailto:security@lattiumhr.com" style={{ color: "#7b2958", fontWeight: 700 }}>security@lattiumhr.com</a>.
                  </p>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SecurityPage;
