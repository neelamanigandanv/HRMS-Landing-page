import React from "react";
import Icon from "@/components/ui/Icon";
import { PARTNER_BENEFITS, PartnerBenefit } from "@/data/partnersData";

export const BenefitGrid: React.FC = () => {
  return (
    <section className="partner-benefits-section" id="why-partner-with-us" aria-labelledby="benefits-heading">
      <div className="container">
        <div className="partner-why-split-layout">
          {/* Left Column: Heading, Subhead & 6 Benefits 2-Col List */}
          <div className="partner-why-content-col">
            <div className="partner-section-eyebrow" style={{ marginBottom: "1rem" }}>
              <span className="partner-sparkle">✦</span>
              <span>WHY PARTNER WITH US</span>
              <span className="partner-sparkle">✦</span>
            </div>

            <h2 id="benefits-heading" className="partner-why-title">
              Built to Scale Your Consulting <span className="partner-highlight-word">Practice</span>
            </h2>

            <p className="partner-why-desc">
              Partnering with LattiumHR unlocks high-retention enterprise client relationships,
              dependable revenue streams, and dedicated go-to-market enablement.
            </p>

            {/* 2-Column Benefits List (like Image 1) */}
            <div className="partner-why-icon-grid">
              {PARTNER_BENEFITS.map((item: PartnerBenefit) => (
                <div key={item.id} className="partner-why-icon-item">
                  <div className="partner-why-round-icon">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <div className="partner-why-item-text">
                    <h3 className="partner-why-item-title">{item.title}</h3>
                    <p className="partner-why-item-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 5-Photo Mosaic / Collage (like Image 1) */}
          <div className="partner-why-collage-col" aria-hidden="true">
            <div className="partner-photo-mosaic">
              {/* Photo 1: Big top/middle office team */}
              <div className="partner-mosaic-item mosaic-1">
                <img
                  src="/images/skyline-hq.jpg"
                  alt="LattiumHR Corporate Campus"
                  loading="lazy"
                />
              </div>

              {/* Photo 2: Executive portrait */}
              <div className="partner-mosaic-item mosaic-2">
                <img
                  src="/images/hero-hr-working-pro.jpg"
                  alt="HR Strategy Consultant"
                  loading="lazy"
                />
              </div>

              {/* Photo 3: Modern branch */}
              <div className="partner-mosaic-item mosaic-3">
                <img
                  src="/images/branch-hq.jpg"
                  alt="Enterprise Regional Hub"
                  loading="lazy"
                />
              </div>

              {/* Photo 4: Hands & laptop strategy table (like Image 1's map & coffee tile) */}
              <div className="partner-mosaic-item mosaic-4">
                <img
                  src="/images/work-process-team.jpg"
                  alt="Consulting Alliance Strategy"
                  loading="lazy"
                />
              </div>

              {/* Photo 5: Modern bridge/cityscape */}
              <div className="partner-mosaic-item mosaic-5">
                <img
                  src="/images/solutions-consultation-cta.jpg"
                  alt="Strategic Client Advisory"
                  loading="lazy"
                />
              </div>

              {/* Photo 6: Enterprise collaboration */}
              <div className="partner-mosaic-item mosaic-6">
                <img
                  src="/images/solution-enterprise.jpg"
                  alt="Enterprise Collaboration"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitGrid;
