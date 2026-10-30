import React from "react";
import Icon from "@/components/ui/Icon";

interface CtaBandProps {
  onTalkToUsClick: () => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({ onTalkToUsClick }) => {
  return (
    <section className="partner-cta-band-section" aria-labelledby="cta-band-title">
      <div className="container">
        <div className="partner-cta-band-card">
          <div className="partner-cta-band-content">
            <span className="partner-cta-band-badge">JOIN THE ALLIANCE</span>
            <h2 id="cta-band-title" className="partner-cta-band-heading">
              Want to Know More About Our Partner Programme?
            </h2>
            <p className="partner-cta-band-text">
              Speak directly with our partner ecosystem directors to discuss tailored commissions,
              territorial distribution, and complimentary sandbox environments.
            </p>
          </div>
          <div className="partner-cta-band-action">
            <button
              type="button"
              onClick={onTalkToUsClick}
              className="partner-cta-band-btn"
              aria-label="Talk to Us - Scrolls to partner enquiry form"
            >
              Talk to Us <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBand;

