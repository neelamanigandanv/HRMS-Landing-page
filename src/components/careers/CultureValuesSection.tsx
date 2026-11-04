import React, { useState } from "react";
import Icon, { IconName } from "../ui/Icon";
import { CULTURE_VALUES, CANDIDATE_FAQS, CultureValue, CandidateFaq } from "../../data/careersData";

interface CultureValuesSectionProps {
  onContactTalent: () => void;
}

export default function CultureValuesSection({ onContactTalent }: CultureValuesSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="careers-culture-values-section" id="culture-values" aria-labelledby="culture-values-heading">
      <div className="container">
        {/* Top Header */}
        <div className="careers-section-header">
          <div className="careers-section-eyebrow">
            <span className="careers-sparkle">✦</span>
            <span>OUR OPERATING PRINCIPLES</span>
            <span className="careers-sparkle">✦</span>
          </div>
          <h2 id="culture-values-heading" className="careers-section-title">
            How We Think, Build &amp; <span className="careers-highlight-word">Collaborate</span>
          </h2>
          <p className="careers-section-subtitle">
            The shared standards and operating values that guide every architecture review,
            product feature, and customer interaction at LattiumHR.
          </p>
        </div>

        {/* 4 Values Grid */}
        <div className="careers-values-grid">
          {CULTURE_VALUES.map((val: CultureValue) => (
            <div key={val.id} className="careers-value-card">
              <div className="careers-value-icon-box">
                <Icon name={(val.icon as IconName) || "sparkle"} size={26} />
              </div>
              <h3 className="careers-value-title">{val.title}</h3>
              <span className="careers-value-tagline">{val.tagline}</span>
              <p className="careers-value-desc">{val.description}</p>
            </div>
          ))}
        </div>

        {/* Candidate FAQ Accordion Box */}
        <div className="careers-faq-container">
          <div className="careers-faq-header">
            <h3 className="careers-faq-main-title">Candidate FAQs &amp; Hiring Insights</h3>
            <p className="careers-faq-sub">
              Clear answers to common questions about our working model, interview expectations, and benefits.
            </p>
          </div>

          <div className="careers-faq-accordion">
            {CANDIDATE_FAQS.map((faq: CandidateFaq, index: number) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`careers-faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="careers-faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="careers-faq-toggle-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="careers-faq-answer-panel">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Talent Advisory Banner */}
          <div className="careers-talent-advisory-card">
            <div className="careers-talent-advisory-text">
              <h4>Still have questions before applying?</h4>
              <p>Our talent partners are always glad to connect, provide clarity on our roadmap, or discuss tailored opportunities.</p>
            </div>
            <button
              type="button"
              onClick={onContactTalent}
              className="careers-talent-advisory-btn"
            >
              Talk to Our Talent Team <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

