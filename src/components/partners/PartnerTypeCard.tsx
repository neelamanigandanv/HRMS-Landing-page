import React from "react";
import Icon from "@/components/ui/Icon";
import { PARTNER_TYPES, PartnerType, PartnerCategory } from "@/data/partnersData";

interface PartnerTypeCardProps {
  onJoinTypeClick: (type: PartnerCategory) => void;
}

export const PartnerTypeCard: React.FC<PartnerTypeCardProps> = ({ onJoinTypeClick }) => {
  return (
    <section className="partner-types-section" id="find-the-right-fit" aria-labelledby="types-heading">
      <div className="container">
        <div className="partner-section-header">
          <div className="partner-section-eyebrow">
            <span className="partner-sparkle">✦</span>
            <span>FIND THE RIGHT FIT</span>
            <span className="partner-sparkle">✦</span>
          </div>
          <h2 id="types-heading" className="partner-section-title">
            Tailored Collaboration Pathways for Every <span className="partner-highlight-word">Model</span>
          </h2>
          <p className="partner-section-subtitle">
            Whether you distribute enterprise software, advise high-growth leaders, or build hardware
            integrations, there is a dedicated track designed for your business.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="partner-types-grid">
          {PARTNER_TYPES.map((type: PartnerType) => (
            <div key={type.id} className="partner-type-card">
              {/* Image / Illustration Placeholder */}
              <div className="partner-type-media-wrap">
                <img
                  src={type.imagePlaceholder}
                  alt={type.title}
                  className="partner-type-img"
                  loading="lazy"
                />
                <span className="partner-type-badge">{type.badge}</span>
              </div>

              {/* Card Body */}
              <div className="partner-type-body">
                <span className="partner-type-tagline">{type.tagline}</span>
                <h3 className="partner-type-title">{type.title}</h3>
                <p className="partner-type-desc">{type.description}</p>

                {/* Who Can Join Bullets */}
                <div className="partner-who-box">
                  <span className="partner-who-label">Who can join:</span>
                  <ul className="partner-who-list">
                    {type.whoCanJoin.map((point, idx) => (
                      <li key={idx} className="partner-who-item">
                        <span className="partner-who-bullet">
                          <Icon name="check" size={13} />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Join Button */}
                <button
                  type="button"
                  onClick={() => onJoinTypeClick(type.id)}
                  className="partner-type-btn"
                  aria-label={`Join as ${type.title} - Scrolls to partner enquiry form`}
                >
                  {type.buttonLabel} <Icon name="arrow" size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerTypeCard;

