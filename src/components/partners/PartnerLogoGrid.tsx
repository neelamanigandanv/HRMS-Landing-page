import React, { useRef } from "react";
import Icon from "@/components/ui/Icon";
import { PARTNER_LOGOS, PartnerLogo } from "@/data/partnersData";

export const PartnerLogoGrid: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("partner-enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="partner-proof-section" id="our-partners" aria-labelledby="partners-proof-heading">
      <div className="container">
        {/* Top Centered Header */}
        <div className="partner-section-header">
          <div className="partner-section-eyebrow">
            <span className="partner-sparkle">✦</span>
            <span>OUR PARTNERS</span>
            <span className="partner-sparkle">✦</span>
          </div>

          <h2 id="partners-proof-heading" className="partner-section-title">
            Trusted by Leading System Integrators & HR Consultancies
          </h2>

          <div className="partner-carousel-link-wrap">
            <a
              href="#partner-enquiry-form"
              onClick={scrollToForm}
              className="partner-carousel-cta-link"
            >
              Become our partner <Icon name="arrow" size={15} />
            </a>
          </div>
        </div>

        {/* Carousel Logo Row with Left/Right Arrow Navigation (Matching Image 3) */}
        <div className="partner-carousel-wrapper">
          <button
            type="button"
            className="partner-carousel-arrow-btn prev"
            onClick={() => handleScroll("left")}
            aria-label="Previous partners"
          >
            <Icon name="chevron" size={16} className="rotate-180" />
          </button>

          <div className="partner-carousel-track" ref={scrollContainerRef}>
            {PARTNER_LOGOS.map((partner: PartnerLogo) => (
              <div key={partner.id} className="partner-monochrome-card">
                <div className="partner-monochrome-logo-box">
                  <span className="partner-monochrome-initials">{partner.initials}</span>
                </div>
                <span className="partner-monochrome-name">{partner.name}</span>
                <span className="partner-monochrome-cat">{partner.categoryLabel}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="partner-carousel-arrow-btn next"
            onClick={() => handleScroll("right")}
            aria-label="Next partners"
          >
            <Icon name="chevron" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogoGrid;
