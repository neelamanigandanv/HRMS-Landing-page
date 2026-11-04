import React, { useState } from "react";
import Icon from "@/components/ui/Icon";
import { PARTNER_FAQS, PartnerFaqItem } from "@/data/partnersData";

export const FaqAccordion: React.FC = () => {
  // First item open by default
  const [openId, setOpenId] = useState<string | null>(PARTNER_FAQS[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="partner-faq-section" id="partner-faqs" aria-labelledby="faq-heading">
      <div className="container">
        <div className="partner-section-header">
          <div className="partner-section-eyebrow">
            <span className="partner-sparkle">✦</span>
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <span className="partner-sparkle">✦</span>
          </div>
          <h2 id="faq-heading" className="partner-section-title">
            Answers to Common Partnership <span className="partner-highlight-word">Questions</span>
          </h2>
          <p className="partner-section-subtitle">
            Everything you need to know about joining, commission structures, training tracks,
            and ongoing partner enablement.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="partner-faq-list" role="region" aria-label="Partner FAQs">
          {PARTNER_FAQS.map((faq: PartnerFaqItem) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`partner-faq-card ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="partner-faq-question-btn"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                >
                  <span className="partner-faq-q-text">{faq.question}</span>
                  <span className={`partner-faq-chevron ${isOpen ? "open" : ""}`}>
                    <Icon name="chevron-down" size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="partner-faq-answer"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;

