export interface SecuritySection {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  paragraphs: string[];
  bullets?: string[];
  link?: {
    text: string;
    href: string;
  };
}

export const SECURITY_PAGE_HEADER = {
  badge: "SECURITY & TRUST",
  title: "Security",
  subtitle:
    "We protect employee and payroll data with layered technical and organizational safeguards across all our HRMS cloud infrastructure.",
  lastUpdated: "[CONFIRM date]",
};

export const SECURITY_SECTIONS: SecuritySection[] = [
  {
    id: "our-security-approach",
    number: 1,
    title: "1. Our Security Approach",
    shortTitle: "1. Security Approach",
    paragraphs: [
      "At LattiumHR, data security is central to everything we design, develop, and operate. Human resources and workforce management platforms process an organization’s most confidential information. We treat this responsibility with rigorous safeguards across our entire architecture.",
      "Our security program is built to protect sensitive HR and workforce data against unauthorized access, loss, tampering, and service disruption. This includes:",
    ],
    bullets: [
      "Employee personal identity data, including legal names, addresses, and family details",
      "Statutory identity documents, including PAN and Aadhaar records",
      "Confidential compensation data, salary bandings, deductions, and bank account numbers",
      "Workforce attendance records, biometric sync feeds, shift logs, and GPS clock-in coordinates",
    ],
  },
  {
    id: "data-hosting-infrastructure",
    number: 2,
    title: "2. Data Hosting & Infrastructure",
    shortTitle: "2. Data Hosting & Infra",
    paragraphs: [
      "All customer databases and LattiumHR cloud application workloads are hosted exclusively in ISO 27001-certified Tier-III cloud data centers located geographically within India.",
      "Hosting our primary databases and backup facilities within domestic Tier-III cloud infrastructure ensures strict compliance with national data residency regulations and provides resilient physical security, dual-powered equipment, and redundant network uplinks.",
    ],
  },
  {
    id: "encryption",
    number: 3,
    title: "3. Encryption",
    shortTitle: "3. Encryption",
    paragraphs: [
      "We apply end-to-end cryptographic safeguards across the data lifecycle to ensure that customer data remains confidential and unreadable to unauthorized entities.",
    ],
    bullets: [
      "Data at Rest: All customer records, database volumes, document vaults, and backup snapshots are encrypted at rest using industry-standard AES-256 encryption.",
      "Data in Transit: All communications between web browsers, mobile applications, API clients, and our server infrastructure are strictly encrypted in transit using TLS 1.3 over HTTPS.",
    ],
  },
  {
    id: "access-control",
    number: 4,
    title: "4. Access Control",
    shortTitle: "4. Access Control",
    paragraphs: [
      "Access to production environments and internal systems is governed strictly by the principle of least privilege, ensuring personnel only have access to resources strictly necessary for their verified operational duties.",
    ],
    bullets: [
      "Production Infrastructure Access: Administrative access to production clusters requires multi-factor authentication (MFA) and is routed exclusively through encrypted bastion hosts with session auditing.",
      "Product-Level Access Governance: Inside the LattiumHR application, customer administrators configure granular role-based access control (RBAC) to restrict employee, manager, and HR executive permissions [CONFIRM details: e.g., field-level salary masking, IP address whitelisting, session timeout policies].",
    ],
  },
  {
    id: "application-security",
    number: 5,
    title: "5. Application Security",
    shortTitle: "5. Application Security",
    paragraphs: [
      "We integrate defensive security principles into every stage of the software development lifecycle (SDLC) to detect and resolve vulnerabilities before code reaches production.",
    ],
    bullets: [
      "Secure Development Practices: Engineering teams follow secure coding standards aligned with industry frameworks [CONFIRM: specify frameworks or development guidelines].",
      "Peer Code Reviews: All code modifications require mandatory peer reviews and automated static code analysis prior to merging [CONFIRM: code review workflow and tooling].",
      "Vulnerability Testing: Regular vulnerability scanning and security testing are performed across application endpoints [CONFIRM: frequency and scope of vulnerability assessments / penetration testing].",
    ],
  },
  {
    id: "backup-business-continuity",
    number: 6,
    title: "6. Backup & Business Continuity",
    shortTitle: "6. Backup & Continuity",
    paragraphs: [
      "To safeguard business operations and protect against unexpected hardware failures or operational anomalies, we maintain structured data redundancy and continuity measures.",
    ],
    bullets: [
      "Backup Frequency: Automated database backups and snapshots are captured on a regular schedule [CONFIRM: e.g., daily encrypted snapshots, point-in-time recovery frequency].",
      "Recovery & Redundancy Approach: Backups are stored in geographically separated, secure storage within India with tested disaster recovery protocols [CONFIRM: Recovery Time Objective (RTO) and Recovery Point Objective (RPO) targets].",
    ],
  },
  {
    id: "privacy-data-ownership",
    number: 7,
    title: "7. Privacy & Data Ownership",
    shortTitle: "7. Privacy & Ownership",
    paragraphs: [
      "Our business model is based on software subscriptions, not data monetization. We firmly believe that your company’s workforce data belongs exclusively to you.",
    ],
    bullets: [
      "Customer Ownership: Customers retain complete, exclusive ownership of all employee personal data, payroll records, and internal files processed through our platform.",
      "Data Processor Role: LattiumHR acts solely as a data processor, handling records exclusively in accordance with your documented operational instructions and service agreements.",
      "Zero Data Selling: We never sell, rent, or disclose your corporate or employee personal data to third-party advertisers, data aggregators, or brokers under any circumstances.",
    ],
    link: {
      text: "Read our full Privacy Policy for detailed commitments on data collection, use, and statutory rights →",
      href: "/privacy-policy",
    },
  },
  {
    id: "incident-response",
    number: 8,
    title: "8. Incident Response",
    shortTitle: "8. Incident Response",
    paragraphs: [
      "In the unlikely event of a suspected or confirmed security event impacting customer data, our operational team follows a defined incident response procedure.",
    ],
    bullets: [
      "Containment & Investigation: Security personnel promptly isolate affected systems, assess the scope of the incident, and initiate forensic investigation [CONFIRM: internal incident response steps].",
      "Customer Notification: Affected customers are notified in accordance with contractual commitments and applicable statutory timelines [CONFIRM: customer notification channels and SLA timeline, e.g., within 72 hours of verification].",
    ],
  },
  {
    id: "report-vulnerability",
    number: 9,
    title: "9. Report a Vulnerability",
    shortTitle: "9. Report Vulnerability",
    paragraphs: [
      "We value the contributions of the independent security research community and encourage responsible disclosure of potential vulnerabilities.",
      "If you believe you have discovered a security flaw, vulnerability, or exposure within any LattiumHR service or endpoint, please contact our security team at:",
    ],
    bullets: [
      "Security Contact: [CONFIRM security email, e.g., security@lattiumhr.com]",
      "Responsible Disclosure: Please provide detailed reproduction steps, avoid degrading service availability, and allow us reasonable time to investigate and remediate the issue prior to public disclosure.",
    ],
  },
];

export const SECURITY_CTA = {
  heading: "Have a security question or need our security overview?",
  buttonText: "Contact Us",
  buttonLink: "/contact",
};

