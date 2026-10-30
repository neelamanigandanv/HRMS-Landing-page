import { useLocation } from "react-router-dom";
import LegalTemplate, { LegalSection } from "../components/templates/LegalTemplate";

export function LegalPage() {
  const { pathname } = useLocation();

  /* ==========================================================================
     1. COOKIE POLICY (/cookie-policy)
     ========================================================================== */
  if (pathname === "/cookie-policy") {
    const cookieSections: LegalSection[] = [
      {
        id: "what-are-cookies",
        title: "1. What Are Cookies and Web Storage Technologies?",
        badge: "TECHNICAL DEFINITION",
        content: [
          "Cookies are compact text files stored on your computer, tablet, or mobile device by your web browser when visiting our public website (lattiumhr.com) or accessing the authenticated LattiumHR web application.",
          "Cookies and related local storage technologies (including HTML5 sessionStorage, localStorage, and secure HTTP-only session tokens) enable our servers to recognize your authenticated identity, maintain active sessions securely, remember your user preferences across tabs, and protect against automated tampering.",
          "LattiumHR operates strictly on a privacy-by-design architecture. We deploy cookies only where strictly necessary for operational security or to evaluate aggregated, anonymized performance metrics. We never deploy cross-site behavioral tracking cookies or sell visitor engagement data to third-party ad networks.",
        ],
        callout: {
          title: "Zero Cross-Site Ad-Network Tracking",
          text: "LattiumHR maintains a strict policy prohibiting third-party behavioral advertising pixels, social media remarketing beacons, or data broker cookies across all public and customer-facing domains.",
          icon: "shield",
        },
      },
      {
        id: "cookie-categories",
        title: "2. Categories of Cookies Deployed by LattiumHR",
        badge: "TAXONOMY & PURPOSE",
        content: [
          "To provide transparent governance over our web tracking footprint, we classify all cookies deployed across LattiumHR domains into three clear operational tiers:",
        ],
        bulletPoints: [
          "Strictly Necessary Cookies: Essential for the core security, authentication, and routing of our web services. These cookies maintain encrypted session tokens, enforce CSRF (Cross-Site Request Forgery) protection, and remember your cookie consent preferences. They cannot be deactivated without disabling core website functionality.",
          "Functional & Preference Cookies: Enable our platform to remember your localized settings, such as selected company workforce sizing on price calculators, collapsible navigation states, and dark/light UI density preferences.",
          "Privacy-Preserving Performance Analytics: Aggregated, de-identified telemetry that helps our engineering team measure page response latency, identify broken navigation paths, and optimize database queries without identifying individual natural persons.",
        ],
      },
      {
        id: "cookie-inventory",
        title: "3. Active Technical Cookie Inventory & Lifespans",
        badge: "AUDITED INVENTORY",
        content: [
          "The following table reflects our active production cookie manifest, audited and verified by our information security engineering team:",
        ],
        table: {
          caption: "Table 1: Verified Cookie Inventory & Technical Retention Periods",
          headers: ["Cookie Identifier", "Origin Scope", "Classification", "Technical Purpose", "Retention Lifespan"],
          rows: [
            ["lattium_session_id", "First-Party (lattiumhr.com)", "Strictly Necessary", "Encrypted user authentication session token", "Browser Session (Closes on exit)"],
            ["lattium_csrf_token", "First-Party (lattiumhr.com)", "Strictly Necessary", "Cross-Site Request Forgery security verification", "Browser Session (Closes on exit)"],
            ["lattium_consent_state", "First-Party (lattiumhr.com)", "Strictly Necessary", "Records user cookie category consent selection", "365 Calendar Days"],
            ["lattium_org_tenant", "First-Party (app.lattiumhr.com)", "Strictly Necessary", "Directs requests to client isolated database schema", "30 Calendar Days"],
            ["lattium_ui_density", "First-Party (lattiumhr.com)", "Functional", "Saves user table spacing and UI layout preference", "180 Calendar Days"],
            ["_lat_telemetry_anon", "First-Party (lattiumhr.com)", "Analytics (De-identified)", "Measures page render latency and navigation speed", "90 Calendar Days"],
          ],
        },
      },
      {
        id: "managing-preferences",
        title: "4. Managing and Disabling Cookies Across Web Browsers",
        badge: "USER CONTROL",
        content: [
          "You have the sovereign right to accept, configure, or reject cookies at any time. When you first visit LattiumHR, an explicit consent banner presents clear options to adjust your preferences.",
          "Furthermore, modern desktop and mobile browsers provide controls to inspect, block, or delete cookies at the device level:",
        ],
        bulletPoints: [
          "Google Chrome: Settings → Privacy and Security → Third-party cookies → Block or clear cookies.",
          "Mozilla Firefox: Settings → Privacy & Security → Enhanced Tracking Protection & Cookies and Site Data.",
          "Apple Safari: Settings / Preferences → Privacy → Prevent cross-site tracking and Block all cookies.",
          "Microsoft Edge: Settings → Cookies and Site Permissions → Manage and delete cookies and site data.",
        ],
        callout: {
          title: "Impact of Deactivating Strictly Necessary Cookies",
          text: "Please note that if you disable strictly necessary session cookies in your browser settings, critical web application functions—including secure portal login, two-factor authentication, and payroll demo requests—will become non-functional.",
          icon: "sparkle",
        },
      },
      {
        id: "third-party-tags",
        title: "5. Third-Party Infrastructure Services & Edge Gateways",
        badge: "GATEWAYS & HOSTING",
        content: [
          "LattiumHR utilizes trusted infrastructure providers to safeguard high-availability routing and defend against cyber attacks:",
          "Cloudflare Enterprise Edge: Operates global edge routing, volumetric DDoS mitigation, and Web Application Firewall (WAF) screening. Cloudflare may set strict operational tokens (such as '__cf_bm') solely to identify automated malicious bot traffic.",
          "No commercial marketing or ad-broker third parties are authorized to drop tracking beacons, pixel tags, or canvas fingerprinters on LattiumHR domains.",
        ],
      },
      {
        id: "updates-contact",
        title: "6. Annual Audits, Policy Revisions & Data Protection Contact",
        badge: "GOVERNANCE & AUDIT",
        content: [
          "Our security and engineering teams conduct bi-annual technical cookie audits to detect any unmapped scripts or tags. When modifications occur, this Cookie Policy is updated with a revised calendar date and version badge.",
          "For technical queries or cookie preference support, reach our data privacy desk directly at privacy@lattiumhr.com or write to our Data Protection Officer at LattiumHR Technologies Pvt. Ltd., Level 8, Cyber City Tech Hub, Mumbai, Maharashtra 400051, India.",
        ],
      },
    ];

    return (
      <LegalTemplate
        title="Cookie"
        highlightedTitle="Policy"
        badge="TRANSPARENCY & TRACKING DIRECTIVE"
        lastUpdated="October 2026"
        version="Version 2.3 (Audited Directive)"
        summary="How LattiumHR utilizes strictly necessary tokens and privacy-first storage technologies to deliver secure, performant HRMS operations without third-party ad tracking."
        canonicalPath="/cookie-policy"
        badges={[
          { icon: "shield", text: "Zero Ad-Network Tracking" },
          { icon: "lock", text: "SameSite=Strict & Secure HTTPS" },
          { icon: "check", text: "Granular User Preference Control" },
          { icon: "clock", text: "365-Day Max Consent Expiry" },
          { icon: "sparkle", text: "Privacy-Preserving Telemetry" },
        ]}
        sections={cookieSections}
        ctaCard={{
          badge: "COOKIE PREFERENCES",
          title: "Have Questions About Website Storage?",
          desc: "Our privacy engineering team can clarify exact cookie scopes, encryption keys, and third-party firewall tokens upon request.",
          buttonText: "Inquire About Cookies",
          leadEmail: "privacy@lattiumhr.com",
        }}
      />
    );
  }

  /* ==========================================================================
     2. TERMS OF SERVICE (/terms-of-service)
     ========================================================================== */
  if (pathname === "/terms-of-service") {
    const termsSections: LegalSection[] = [
      {
        id: "commercial-acceptance",
        title: "1. Acceptance of Terms & Corporate Legal Authority",
        badge: "LEGAL BINDING",
        content: [
          "By accessing our website (lattiumhr.com), requesting a product demonstration, provisioning a staging trial, or executing an enterprise commercial Order Form, your organization enters into a legally binding contract with LattiumHR Technologies Pvt. Ltd. ('Company', 'LattiumHR', 'we', 'us').",
          "If you are executing these Terms on behalf of an enterprise entity, corporation, or partnership, you represent and warrant that you hold the requisite statutory corporate authority to bind that legal entity to this Agreement.",
          "These Terms, together with any executed Order Forms, Data Processing Agreements (DPA), and Service Level Agreements (SLA), constitute the complete understanding between the parties, superseding all prior oral or written discussions.",
        ],
      },
      {
        id: "subscription-licensing",
        title: "2. SaaS Subscription Licensing & User Seat Quotas",
        badge: "LICENSE & USAGE",
        content: [
          "Subject to timely payment of applicable subscription fees and continuous compliance with this Agreement, LattiumHR grants your organization a non-exclusive, non-transferable, revocable right to access and utilize our cloud-hosted human resource management platform during the contracted Subscription Term.",
          "Access is granted for the specific employee seat volume and functional modules specified in your active Order Form. Administrative accounts are personal and cannot be shared across multiple individuals.",
          "Customer is solely responsible for maintaining the confidentiality of administrative credentials, enforcing mandatory Multi-Factor Authentication (MFA), and governing role-based access permissions among internal employees.",
        ],
      },
      {
        id: "customer-data-ownership",
        title: "3. Customer Data Ownership & Non-Exploitation Covenant",
        badge: "IP & ASSETS",
        content: [
          "As between the parties, Customer retains sole, exclusive, and unencumbered ownership of all data, employee personnel files, bank account records, Aadhaar/PAN identifiers, attendance logs, and internal communications ingested into the LattiumHR platform ('Customer Data').",
          "LattiumHR acquires zero proprietary claim, copyright, or commercial rights to Customer Data. We access Customer Data exclusively to execute contracted automated software workflows, compute monthly statutory payroll calculations, provide technical support upon request, or fulfill binding judicial orders.",
        ],
        callout: {
          title: "Absolute Non-Exploitation Guarantee",
          text: "LattiumHR shall never sell, rent, monetize, mine, or license Customer Data or employee personnel records to any third party, advertising network, or external data aggregator under any circumstances.",
          icon: "shield",
        },
      },
      {
        id: "service-availability-sla",
        title: "4. Service Availability, 99.99% Uptime SLA & Maintenance",
        badge: "AVAILABILITY SLA",
        content: [
          "LattiumHR provides enterprise clients with a commercially backed 99.99% Scheduled Monthly Uptime Commitment for production cloud application environments.",
          "Scheduled maintenance is conducted exclusively during off-peak weekend maintenance windows (Saturdays 02:00 AM – 04:00 AM IST) and is communicated via dashboard alerts at least 48 hours in advance.",
          "In the event of an unplanned service degradation that fails to meet the 99.99% SLA threshold, enterprise customers are entitled to prorated commercial service credits applied to subsequent billing cycles in accordance with their enterprise tier.",
        ],
      },
      {
        id: "acceptable-use-governance",
        title: "5. Acceptable Use, Security Policies & Prohibited Activities",
        badge: "GOVERNANCE & POLICIES",
        content: [
          "Customer agrees to utilize LattiumHR services in strict conformity with applicable statutory employment, tax, and cyber regulations. Customer shall not:",
        ],
        bulletPoints: [
          "Reverse engineer, decompile, disassemble, or derive the underlying source code, algorithms, or database schemas of the platform.",
          "Attempt unauthorized penetration testing, vulnerability scanning, or security bypass without prior written authorization from the LattiumHR InfoSec team.",
          "Transmit malicious code, worms, automated scrapers, or excessive programmatic API calls designed to degrade platform infrastructure.",
          "Ingest classified national security materials or non-statutory sensitive personal data beyond legitimate employment and workforce management records.",
        ],
      },
      {
        id: "billing-invoicing-taxes",
        title: "6. Commercial Invoicing, Payment Terms & GST Compliance",
        badge: "FINANCIAL TERMS",
        content: [
          "Subscription fees are billed in advance on an annual or monthly cadence as agreed in the applicable Order Form. Invoices are dispatched digitally and are payable within 15 calendar days from the invoice date.",
          "All statutory commercial taxes, including Goods and Services Tax (GST) at statutory rates, are itemized clearly on all invoices. Tax invoices include verified LattiumHR GSTIN registration numbers to ensure customers can claim eligible input tax credits.",
          "Unpaid balances exceeding 30 calendar days of overdue status may result in conditional account suspension following formal written notice, without waiving accrued payment liabilities.",
        ],
      },
      {
        id: "confidentiality-trade-secrets",
        title: "7. Mutual Non-Disclosure & Confidentiality Obligations",
        badge: "MUTUAL NDA",
        content: [
          "Each party ('Receiving Party') agrees to safeguard all non-public technical, commercial, pricing, and operational information disclosed by the other party ('Disclosing Party') with the same degree of care it exercises for its own confidential assets (and in no case less than reasonable care).",
          "Confidential Information shall not be disclosed to any third party except to authorized employees, certified sub-processors, or legal counsel under binding confidentiality duties. These obligations survive termination of this Agreement for five (5) consecutive years.",
        ],
      },
      {
        id: "liability-governing-law",
        title: "8. Limitation of Liability, Indemnification & Dispute Arbitration",
        badge: "LEGAL JURISDICTION",
        content: [
          "To the maximum extent permitted by applicable law, neither party shall be liable for indirect, punitive, special, or consequential damages (including loss of profits or business interruption) arising under or related to this Agreement.",
          "Each party's aggregate monetary liability under this Agreement shall not exceed the total subscription fees actually paid by Customer to LattiumHR in the twelve (12) months preceding the incident giving rise to liability.",
          "Governing Law & Arbitration: This Agreement is governed by and construed under the laws of India. Any controversy, dispute, or claim arising hereunder shall be resolved through binding arbitration seated in Mumbai, Maharashtra, under the Arbitration and Conciliation Act, 1996, before a sole mutually appointed arbitrator.",
        ],
        callout: {
          title: "Enterprise Commercial Certainty",
          text: "Our contracts are designed for institutional stability, providing clear mutual indemnity caps, transparent SLA remedies, and predictable multi-year enterprise partnership terms.",
          icon: "award",
        },
      },
    ];

    return (
      <LegalTemplate
        title="Terms of"
        highlightedTitle="Service"
        badge="COMMERCIAL TERMS & MASTER SAAS AGREEMENT"
        lastUpdated="October 2026"
        version="Version 3.1 (Commercial Directive)"
        summary="The complete legal and operational terms governing enterprise access, employee licensing, 99.99% uptime SLAs, customer data ownership, and cloud software subscriptions."
        canonicalPath="/terms-of-service"
        badges={[
          { icon: "award", text: "99.99% Guaranteed Uptime SLA" },
          { icon: "shield", text: "100% Customer Data Ownership" },
          { icon: "check", text: "Clear Transparent Commercials" },
          { icon: "lock", text: "SOC 2 & ISO 27001 Aligned" },
          { icon: "document", text: "Indian Jurisdiction & Arbitration" },
        ]}
        sections={termsSections}
        ctaCard={{
          badge: "COMMERCIAL COUNSEL",
          title: "Custom Enterprise Master Agreements?",
          desc: "Our alliance and commercial legal team works closely with enterprise procurement departments to execute custom redlines, DPAs, and bespoke vendor agreements.",
          buttonText: "Contact Alliance Legal",
          leadEmail: "legal@lattiumhr.com",
        }}
      />
    );
  }

  /* ==========================================================================
     3. DATA PROCESSING AGREEMENT (/data-processing-agreement)
     ========================================================================== */
  if (pathname === "/data-processing-agreement") {
    const dpaSections: LegalSection[] = [
      {
        id: "scope-and-roles",
        title: "1. Scope & Legal Roles Under DPDP Act 2023 & GDPR",
        badge: "LEGAL CLASSIFICATION",
        content: [
          "This Data Processing Agreement ('DPA') governs the processing of personal data by LattiumHR Technologies Pvt. Ltd. on behalf of Customer in connection with delivering cloud-based human resource management, biometric attendance, and automated payroll services.",
          "For the purposes of the Digital Personal Data Protection Act, 2023 (DPDP Act) and international data protection regulations (such as GDPR where applicable):",
        ],
        bulletPoints: [
          "Customer operates as the Data Fiduciary / Data Controller, determining the statutory purpose, categories of employee records, and lawful basis for personnel data collection.",
          "LattiumHR operates as the Data Processor, processing employee personal data strictly on documented contractual instructions from Customer and in full conformity with this DPA.",
        ],
      },
      {
        id: "processing-obligations",
        title: "2. Documented Processing Instructions & Employee Confidentiality",
        badge: "FIDUCIARY DUTY",
        content: [
          "LattiumHR shall process personal data solely in accordance with Customer's documented instructions, except where otherwise mandated by applicable statutory labor, tax, or employment enactments.",
          "LattiumHR ensures that all personnel (software engineers, support specialists, implementation consultants) authorized to process Customer data are subject to strict, legally enforceable non-disclosure agreements and complete annual mandatory InfoSec compliance training.",
        ],
      },
      {
        id: "technical-safeguards",
        title: "3. Technical & Organizational Measures (TOMs) & Sub-Processors",
        badge: "TECHNICAL CONTROLS",
        content: [
          "LattiumHR maintains industry-certified technical and organizational security controls to protect Customer personal data against accidental loss, unauthorized access, or unlawful alteration:",
        ],
        bulletPoints: [
          "Cryptographic Protection: AES-256 encryption at rest for all database volumes, relational backups, and document attachments; mandatory TLS 1.3 encryption for all data in transit.",
          "Domestic Data Residency: 100% of production databases and archival backups are hosted within Tier-III ISO 27001 cloud data centers in India.",
          "Sub-Processor Vetting: Sub-processors (including AWS India cloud hosting infrastructure and Cloudflare edge networks) are vetted annually under SOC 2 standards and bound to data protection duties no less stringent than this DPA.",
        ],
      },
      {
        id: "principal-rights-audit",
        title: "4. Data Principal Rights & 72-Hour Security Incident SLA",
        badge: "PRINCIPAL RIGHTS",
        content: [
          "Taking into account the nature of the processing, LattiumHR implements self-service tools and technical capabilities to assist Customer in fulfilling employee data requests (access, correction, or rectification of personnel records).",
          "Security Incident SLA: In the verified event of an unauthorized security compromise affecting Customer personal data, LattiumHR commits to notifying Customer designated administrators within seventy-two (72) hours of incident confirmation, providing detailed forensics and mitigation steps.",
        ],
      },
      {
        id: "termination-purge",
        title: "5. Post-Termination Data Portability & Irreversible 60-Day Purge",
        badge: "DATA OFFBOARDING",
        content: [
          "Upon termination of the underlying software subscription, Customer is granted a 30-day self-service export window to retrieve all historical employee master records, salary registers, attendance logs, and tax filings in structured formats (CSV, JSON, and tamper-proof PDF).",
          "Following this export window, LattiumHR shall irreversibly purge all Customer personal data from production systems within sixty (60) calendar days, certifying completion upon Customer's written request.",
        ],
        callout: {
          title: "Complete Data Portability Commitment",
          text: "We believe in zero vendor lock-in. Your organizational data belongs entirely to you, and we provide clean, machine-readable export schemas at zero additional surcharge.",
          icon: "check",
        },
      },
    ];

    return (
      <LegalTemplate
        title="Data Processing"
        highlightedTitle="Agreement"
        badge="DPDP ACT 2023 & FIDUCIARY SAFEGUARDS"
        lastUpdated="October 2026"
        version="Version 2.2 (Data Protection Directive)"
        summary="Technical and organizational measures, sub-processor governance, and statutory data processor commitments protecting employee records under the India DPDP Act 2023."
        canonicalPath="/data-processing-agreement"
        badges={[
          { icon: "document", text: "DPDP Act 2023 Compliant" },
          { icon: "shield", text: "Documented Instructions Only" },
          { icon: "lock", text: "AES-256 & TLS 1.3 Cryptography" },
          { icon: "clock", text: "72-Hour Breach Notification SLA" },
          { icon: "check", text: "Automated 60-Day Purge SLA" },
        ]}
        sections={dpaSections}
        ctaCard={{
          badge: "DPA EXECUTION",
          title: "Need a Countersigned DPA?",
          desc: "Our legal and InfoSec team can furnish a bilateral, countersigned Data Processing Agreement customized for your internal corporate audit files within 24 hours.",
          buttonText: "Request Countersigned DPA",
          leadEmail: "privacy@lattiumhr.com",
        }}
      />
    );
  }

  /* ==========================================================================
     4. PRIVACY POLICY (/privacy-policy - DEFAULT)
     ========================================================================== */
  const privacySections: LegalSection[] = [
    {
      id: "information-we-collect",
      title: "1. Comprehensive Categories of Information We Collect",
      badge: "DATA COLLECTION",
      content: [
        "LattiumHR Technologies Pvt. Ltd. ('LattiumHR', 'we', 'us') is committed to the highest standards of data governance, confidentiality, and transparency. In operating our cloud-native Human Resource Management System (HRMS), automated payroll engines, and corporate websites, we collect and process information across three distinct operational categories:",
      ],
      bulletPoints: [
        "Direct Inquiries & Commercial Contacts: When you visit lattiumhr.com, request an enterprise demonstration, calculate pricing, or correspond with our alliance leads, we collect your full name, corporate email address, contact telephone number, organization name, current workforce headcount, and operational implementation notes.",
        "Customer Personnel & Payroll Records (Platform Ingestion): When your organization provisions a LattiumHR cloud tenant, we process employee master records strictly on your company's behalf. This includes employee names, corporate email addresses, job designations, banking details, statutory identifiers (PAN, EPF UAN, ESIC IP numbers), biometric attendance timestamps, geo-fenced GPS clock-in logs, and expense reimbursement claims.",
        "Technical Telemetry & Security Diagnostics: When accessing our web portal or mobile applications, our edge infrastructure automatically logs IP addresses, user agent signatures, browser versions, operating system metadata, login authentication timestamps, and session security audit events to defend against unauthorized intrusion.",
      ],
      callout: {
        title: "Zero Commercial Data Exploitation",
        text: "LattiumHR operates strictly as an institutional B2B enterprise SaaS vendor. We do not sell, rent, license, trade, or monetize personal employee records or commercial client lists to any third-party advertising networks, data brokers, or marketing syndicates under any circumstances.",
        icon: "shield",
      },
    },
    {
      id: "legal-grounds",
      title: "2. Legal Grounds & Fiduciary Framework for Data Processing",
      badge: "LEGAL BASIS",
      content: [
        "We process personal data only when backed by lawful grounds under the Digital Personal Data Protection Act, 2023 (DPDP Act), applicable Indian labor enactments, and recognized global privacy standards:",
      ],
      bulletPoints: [
        "Contractual Necessity: Processing is required to perform the commercial SaaS subscription agreement, compute accurate monthly salary disbursements, generate payslip PDFs, and deliver workforce automation services to your organization.",
        "Statutory Compliance Obligations: Processing is mandated by Indian labor and tax legislation, including maintaining statutory registers for the Employees' Provident Fund (EPF), Employees' State Insurance (ESIC), State Professional Tax (PT), and Tax Deducted at Source (TDS withholding).",
        "Legitimate Security Governance: Safeguarding our cloud infrastructure, detecting fraud, blocking brute-force authentication attacks, and maintaining SOC 2 compliance audit logs.",
        "Explicit Consent: For marketing updates or voluntary website inquiry submissions, processed in accordance with the consent provided by the natural person.",
      ],
    },
    {
      id: "zero-data-selling",
      title: "3. Zero Commercial Monetization & Third-Party Disclosure Standards",
      badge: "DISCLOSURE BOUNDARIES",
      content: [
        "We treat your workforce records with institutional confidentiality. We disclose personal data only under strictly regulated, documented operational boundaries:",
      ],
      bulletPoints: [
        "Authorized Sub-Processors: Vetted infrastructure providers who deliver hosting, database storage, and email delivery under binding confidentiality terms (including AWS India cloud data centers, Cloudflare Enterprise edge security, and NPCI-authorized banking integration partners).",
        "Authorized Employer Administrators: Data is accessible to designated corporate HR managers and payroll administrators based on granular Role-Based Access Control (RBAC) tiers established by your organization.",
        "Statutory & Judicial Mandates: If compelled by a valid court order, government agency warrant, or regulatory decree under Indian law, we disclose only the minimum data legally required after validating judicial authenticity.",
      ],
    },
    {
      id: "domestic-residency",
      title: "4. Tier-III Domestic Data Residency & Cryptographic Protections",
      badge: "SOVEREIGN STORAGE",
      content: [
        "All customer databases, relational indexes, biometric hash arrays, and document storage vaults are hosted 100% domestically within ISO 27001-certified Tier-III cloud data centers located in Mumbai and Hyderabad, India.",
        "Our architecture ensures complete data sovereignty, strictly complying with the domestic residency guidelines established by the Reserve Bank of India (RBI) and the Digital Personal Data Protection Act.",
        "Multi-Layered Cryptography: All data at rest is encrypted using military-grade AES-256 block ciphers with automated annual key rotation managed via FIPS 140-2 Level 3 Hardware Security Modules (AWS KMS). All network transmissions utilize mandatory TLS 1.3 with Perfect Forward Secrecy.",
      ],
      callout: {
        title: "100% Indian Sovereign Data Residency",
        text: "Your sensitive payroll calculations, employee bank accounts, and biometric attendance records never leave Indian territorial borders, ensuring absolute compliance with Indian national data sovereignty standards.",
        icon: "globe",
      },
    },
    {
      id: "retention-deletion",
      title: "5. Data Retention Lifecycle & Automated 60-Day Purge SLA",
      badge: "RETENTION & PURGE",
      content: [
        "LattiumHR retains Customer Data solely for the active duration of your organization's software subscription, or as required by Indian statutory labor laws that mandate statutory wage register retention periods (e.g. 3 to 8 years for tax and PF records).",
        "Contractual Offboarding & Purge Protocol: Upon contract termination or service cancellation, Customer is provided 30 days of complimentary access to export all workforce records, payslips, and compliance filings in structured machine-readable formats.",
        "Following the export window, all customer relational data, file attachments, and write-ahead logs are permanently and irreversibly purged from our production environments within sixty (60) calendar days.",
      ],
    },
    {
      id: "data-principal-rights",
      title: "6. Employee & Data Principal Rights Under DPDP Act 2023",
      badge: "DATA PRINCIPAL RIGHTS",
      content: [
        "Natural persons whose personal data is processed within the LattiumHR platform enjoy comprehensive statutory rights under the DPDP Act 2023:",
      ],
      bulletPoints: [
        "Right to Access: Review an itemized summary of personal data processed, including attendance logs, leave balances, and salary pay-slips via our self-service mobile app and web portal.",
        "Right to Correction & Updating: Request rectification of outdated or inaccurate personal details, bank accounts, or statutory registrations.",
        "Right to Grievance Redressal: Access an expeditious statutory mechanism to address concerns regarding personal data processing.",
        "Right to Nominate: Designate an authorized representative to exercise data rights in the event of death or incapacity.",
      ],
      callout: {
        title: "Employer as Data Fiduciary",
        text: "Because your employing organization acts as the primary Data Fiduciary under statutory law, individual employees should initiate record modification requests through their internal company HR department. LattiumHR provides the administrative software tools to execute verified requests instantly.",
        icon: "check",
      },
    },
    {
      id: "security-incident-governance",
      title: "7. Continuous Threat Monitoring & Incident Response Protocol",
      badge: "INCIDENT RESPONSE",
      content: [
        "Our dedicated Information Security (InfoSec) team operates 24/7/365 security operations center (SOC) monitoring, automated intrusion detection, and continuous DevSecOps static/dynamic code analysis.",
        "In the verified event of an unauthorized security compromise impacting customer personal data, LattiumHR adheres to a strict protocol: notifying designated customer enterprise contacts within seventy-two (72) hours alongside certified forensic details and remedial measures.",
      ],
    },
    {
      id: "grievance-officer",
      title: "8. Statutory Grievance Redressal Officer & InfoSec Contacts",
      badge: "STATUTORY CONTACT",
      content: [
        "In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, the contact credentials for our designated Grievance Redressal Officer are published below:",
        "Designation: Chief Information Security Officer (CISO) & Data Protection Officer",
        "Corporate Entity: LattiumHR Technologies Pvt. Ltd.",
        "Direct Privacy Email: privacy@lattiumhr.com | security@lattiumhr.com",
        "Postal Headquarters: Level 8, Cyber City Tech Hub, Bandra-Kurla Complex, Mumbai, Maharashtra 400051, India.",
        "Telephone Contact: +91 (080) 4122-8900 (Mon–Fri, 9:30 AM – 6:30 PM IST).",
      ],
    },
  ];

  return (
    <LegalTemplate
      title="Privacy"
      highlightedTitle="Policy"
      badge="PRIVACY DIRECTIVE & DPDP ACT 2023 COMMITMENT"
      lastUpdated="October 2026"
      version="Version 4.2 (Enterprise Directive)"
      summary="How LattiumHR protects confidential workforce identity, biometric records, and banking data with domestic Tier-III storage, zero data selling, and layered cryptographic controls."
      canonicalPath="/privacy-policy"
      badges={[
        { icon: "shield", text: "Zero Data Monetization or Selling" },
        { icon: "lock", text: "AES-256 & TLS 1.3 Cryptography" },
        { icon: "globe", text: "100% Domestic India Data Residency" },
        { icon: "document", text: "DPDP Act 2023 & GDPR Aligned" },
        { icon: "check", text: "72-Hour Security Incident SLA" },
      ]}
      sections={privacySections}
      ctaCard={{
        badge: "PRIVACY DESK",
        title: "Questions on Data Governance?",
        desc: "Our InfoSec and Data Protection Office provides direct answers regarding compliance frameworks, DPDP Act obligations, and tenant isolation within 24 hours.",
        buttonText: "Contact Privacy Desk",
        leadEmail: "privacy@lattiumhr.com",
      }}
    />
  );
}

export default LegalPage;
