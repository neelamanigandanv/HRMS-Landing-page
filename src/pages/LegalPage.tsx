import { useLocation } from "react-router-dom";
import LegalTemplate, { LegalSection } from "../components/templates/LegalTemplate";

export function LegalPage() {
  const { pathname } = useLocation();

  if (pathname === "/cookie-policy") {
    const sections: LegalSection[] = [
      {
        id: "what-are-cookies",
        title: "1. What Are Cookies and Tracking Technologies?",
        content: [
          "Cookies are small text files placed on your computer or mobile device when you visit our website (lattiumhr.com). Cookies enable web applications to respond to you as an individual, remembering your preferences and session state across pages.",
          "We use both first-party cookies (set directly by LattiumHR) and third-party services (such as privacy-compliant analytics) to optimize website performance and ensure platform security.",
        ],
      },
      {
        id: "categories-of-cookies",
        title: "2. Categories of Cookies We Use",
        content: [
          "A. Strictly Necessary Cookies: Essential for the core operation of the website, including routing, form submissions, security authentication, and remembering your cookie consent choices. These cookies cannot be switched off in our systems.",
          "B. Performance & Analytics Cookies: Help us measure visitor counts and traffic sources so we can gauge and improve site responsiveness. These cookies collect aggregated, anonymous metrics without identifying individual users.",
          "C. Functional Cookies: Enable the website to provide enhanced personalization, such as remembering your selected company team size during price estimation or keeping dropdown preferences active.",
        ],
      },
      {
        id: "managing-preferences",
        title: "3. How You Can Control Cookies",
        content: [
          "You can manage and modify your cookie preferences at any time by clicking the 'Cookie Preferences' link in the website footer or adjusting your browser settings to refuse or delete cookies.",
          "Please note that blocking strictly necessary cookies may prevent certain critical website features, such as demo form submissions or session authentication, from functioning properly.",
        ],
      },
      {
        id: "cookie-inventory",
        title: "4. Detailed Cookie Inventory",
        content: [
          "[Placeholder: Insert verified inventory of active cookie names, domain scopes, expiration periods, and third-party vendors following annual website technical audit].",
          "Current strictly necessary tokens include: 'lattium_cookie_preferences' (stores user consent selection, expires in 365 days).",
        ],
      },
    ];

    return (
      <LegalTemplate
        title="Cookie Policy"
        badge="TRANSPARENCY"
        lastUpdated="March 2025"
        summary="This Cookie Policy explains how LattiumHR Technologies Pvt. Ltd. uses cookies and similar tracking technologies to recognize you when you visit our public website."
        canonicalPath="/cookie-policy"
        sections={sections}
        placeholderNotice="Editable draft document. Specific cookie lifetimes and vendor classifications should be updated periodically to reflect active production tags."
      />
    );
  }

  if (pathname === "/terms-of-service") {
    const sections: LegalSection[] = [
      {
        id: "acceptance-of-terms",
        title: "1. Acceptance of Commercial Terms",
        content: [
          "By accessing our website (lattiumhr.com), requesting a product demonstration, or subscribing to LattiumHR services, you enter into a legally binding agreement with LattiumHR Technologies Pvt. Ltd. ('Company', 'we', 'us').",
          "If you are entering into this Agreement on behalf of a corporate entity, you represent and warrant that you possess the legal authority to bind that entity to these Terms.",
        ],
      },
      {
        id: "subscription-services",
        title: "2. Cloud Subscription & Access Rights",
        content: [
          "Subject to payment of applicable subscription fees, LattiumHR grants your organization a non-exclusive, non-transferable, revocable license to access our cloud-based HRMS platform for the authorized number of employee user seats specified in your Order Form.",
          "You are responsible for maintaining the confidentiality of all administrative user credentials and for all activities that occur under your company account.",
        ],
      },
      {
        id: "customer-data-ownership",
        title: "3. Customer Data & Intellectual Property",
        content: [
          "As between the parties, you retain sole and exclusive ownership of all employee personal data, payroll figures, biometric timestamps, and internal documents uploaded to the LattiumHR platform ('Customer Data').",
          "LattiumHR shall not access, modify, or disclose Customer Data except to provide the software services, prevent technical errors, or comply with applicable legal mandates.",
        ],
      },
      {
        id: "service-availability-sla",
        title: "4. Service Availability & Support Commitments",
        content: [
          "LattiumHR provides a 99.9% scheduled monthly uptime target for cloud application availability, excluding scheduled maintenance windows notified at least 48 hours in advance.",
          "Support services, implementation milestones, and incident response times are delivered in accordance with your designated plan tier (Standard, Professional, or Enterprise).",
        ],
      },
      {
        id: "limitation-of-liability",
        title: "5. Limitation of Liability & Governing Law",
        content: [
          "To the maximum extent permitted by applicable law, neither party shall be liable for indirect, punitive, or consequential damages arising out of this Agreement.",
          "These Terms are governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.",
          "[Placeholder: Insert specific corporate registration number (CIN), GSTIN, and registered office address upon formal commercial contract finalization].",
        ],
      },
    ];

    return (
      <LegalTemplate
        title="Terms of Service"
        badge="COMMERCIAL TERMS"
        lastUpdated="March 2025"
        summary="These Terms of Service govern your use of the LattiumHR website, product demonstration environments, and cloud HRMS software subscriptions."
        canonicalPath="/terms-of-service"
        sections={sections}
        placeholderNotice="Editable draft agreement. Legal counsel should verify commercial liability limits, arbitration clauses, and corporate registration details prior to formal execution."
      />
    );
  }

  if (pathname === "/data-processing-agreement") {
    const sections: LegalSection[] = [
      {
        id: "scope-and-roles",
        title: "1. Scope & Roles of the Parties",
        content: [
          "This Data Processing Agreement ('DPA') applies to the processing of personal data by LattiumHR on behalf of Customer in connection with providing the HRMS services.",
          "For the purposes of applicable data protection legislation (including the Digital Personal Data Protection Act, 2023, and GDPR where applicable), Customer acts as the Data Fiduciary / Data Controller, and LattiumHR acts as the Data Processor.",
        ],
      },
      {
        id: "processing-obligations",
        title: "2. Processing Obligations & Instructions",
        content: [
          "LattiumHR shall process personal data solely on documented instructions from Customer, including regarding transfers of personal data, unless required to do so by applicable statutory law.",
          "LattiumHR ensures that personnel authorized to process Customer personal data have committed themselves to strict confidentiality obligations and undergo annual data protection training.",
        ],
      },
      {
        id: "security-measures",
        title: "3. Technical & Organizational Measures (TOMs)",
        content: [
          "LattiumHR implements appropriate technical and organizational safeguards to ensure a level of security appropriate to the risk, including AES-256 data encryption at rest, TLS 1.3 encryption in transit, role-based access control, vulnerability assessments, and multi-zone backups.",
          "Sub-processors engaged by LattiumHR (such as certified cloud hosting infrastructure providers) are bound by data protection obligations no less restrictive than those set forth in this DPA.",
        ],
      },
      {
        id: "data-subject-rights",
        title: "4. Assistance with Data Subject Rights & Deletion",
        content: [
          "Taking into account the nature of processing, LattiumHR assists Customer by appropriate technical measures to enable Customer to respond to requests from data principals exercising their rights of access, correction, and deletion.",
          "Upon termination of the software subscription, LattiumHR shall, at the choice of Customer, securely return or delete all personal data within 60 days, unless statutory law mandates retention.",
          "[Placeholder: Insert specific Data Protection Officer (DPO) contact email and formal notification address upon executive legal review].",
        ],
      },
    ];

    return (
      <LegalTemplate
        title="Data Processing Agreement (DPA)"
        badge="DATA PROTECTION"
        lastUpdated="March 2025"
        summary="This Data Processing Agreement establishes our technical and organizational commitments when processing employee personal data on behalf of your organization."
        canonicalPath="/data-processing-agreement"
        sections={sections}
        placeholderNotice="Draft DPA aligned with the Digital Personal Data Protection Act (DPDPA), 2023. Specific data retention periods and DPO contact details should be formally approved by legal counsel."
      />
    );
  }

  // Default: Privacy Policy (/privacy-policy)
  const privacySections: LegalSection[] = [
    {
      id: "information-we-collect",
      title: "1. Information We Collect",
      content: [
        "A. Information You Voluntarily Provide: When you request a product demo, contact our sales desk, or communicate with us, we collect your full name, work email address, telephone number, company name, team size, and any operational notes you provide.",
        "B. Product Usage & Customer Data: When your organization subscribes to LattiumHR, we process employee personnel details (names, designations, bank accounts, Aadhaar/PAN details, biometric and GPS clock-in logs) strictly on your company’s behalf as a data processor.",
        "C. Automatically Collected Technical Data: When you browse our website, our servers automatically collect browser type, operating system, IP address, referring URL, and session timestamps to maintain site security and measure performance.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "2. How We Use Collected Information",
      content: [
        "We use your information exclusively to: (i) deliver, maintain, and optimize the LattiumHR platform; (ii) schedule and conduct product demonstration sessions; (iii) process monthly salary calculations and statutory reports; (iv) communicate security alerts and system updates; and (v) fulfill our contractual and statutory legal obligations.",
        "We do not sell, rent, or trade your personal data or employee personnel records to any third-party advertisers or data brokers under any circumstances.",
      ],
    },
    {
      id: "data-storage-security",
      title: "3. Data Storage & Security Measures",
      content: [
        "All customer records are encrypted at rest using AES-256 and during network transit using TLS 1.3. Our databases are hosted in ISO 27001-certified Tier-III cloud data centers located within India.",
        "Access to production environments is strictly restricted to authorized engineers on a principle-of-least-privilege basis using multi-factor authentication and encrypted bastion hosts.",
      ],
    },
    {
      id: "data-retention-rights",
      title: "4. Data Retention & Your Legal Rights",
      content: [
        "We retain personal data only for as long as necessary to fulfill the purposes outlined in this Policy or as mandated by statutory employment, tax, and labor retention laws.",
        "You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, please contact our data privacy desk at privacy@lattiumhr.com.",
        "[Placeholder: Insert company CIN, official grievance officer contact details, and postal address following corporate compliance audit].",
      ],
    },
  ];

  return (
    <LegalTemplate
      title="Privacy Policy"
      badge="PRIVACY & TRUST"
      lastUpdated="March 2025"
      summary="LattiumHR Technologies Pvt. Ltd. is committed to protecting your personal data and ensuring the highest standards of confidentiality for all customer and employee information."
      canonicalPath="/privacy-policy"
      sections={privacySections}
      placeholderNotice="Editable draft document. Corporate CIN, Grievance Officer details, and postal addresses should be confirmed prior to public production deployment."
    />
  );
}

export default LegalPage;
