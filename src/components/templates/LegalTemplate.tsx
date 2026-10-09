import { useState } from "react";
import PageLayout from "../layout/PageLayout";
import SEO from "../layout/SEO";
import Icon from "../ui/Icon";

export interface LegalSection {
  id: string;
  title: string;
  content: string[];
}

interface LegalTemplateProps {
  title: string;
  badge: string;
  lastUpdated: string;
  summary: string;
  canonicalPath: string;
  sections: LegalSection[];
  placeholderNotice?: string;
}

export function LegalTemplate({
  title,
  badge,
  lastUpdated,
  summary,
  canonicalPath,
  sections,
  placeholderNotice,
}: LegalTemplateProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  const breadcrumbs = [
    { label: "Legal", to: "/privacy-policy" },
    { label: title },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA>
      <SEO
        title={title}
        description={summary}
        canonicalPath={canonicalPath}
      />

      <section className="legal-hero">
        <div className="container">
          <span className="legal-badge">
            <Icon name="shield" size={14} /> {badge}
          </span>
          <h1>{title}</h1>
          <p className="legal-summary">{summary}</p>
          <div className="legal-meta">
            <span>Last Updated: {lastUpdated}</span>
            <span>•</span>
            <span>Version 2.1 (Draft Agreement)</span>
          </div>
        </div>
      </section>

      {placeholderNotice && (
        <div className="container">
          <div className="legal-placeholder-alert">
            <Icon name="shield" size={20} className="alert-icon" />
            <div>
              <strong>Compliance Notice:</strong>
              <p>{placeholderNotice}</p>
            </div>
          </div>
        </div>
      )}

      <section className="legal-body-section">
        <div className="container legal-layout-grid">
          {/* Sticky Table of Contents */}
          <aside className="legal-toc">
            <strong>Table of Contents</strong>
            <nav>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  className={`toc-link ${activeSection === sec.id ? "active" : ""}`}
                  onClick={() => scrollToSection(sec.id)}
                >
                  {sec.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Legal Document Content */}
          <article className="legal-content-prose">
            {sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="legal-section-block">
                <h2>{sec.title}</h2>
                {sec.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            ))}
          </article>
        </div>
      </section>
    </PageLayout>
  );
}

export default LegalTemplate;
