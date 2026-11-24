import { useDemoModal } from "../../context/DemoModalContext";
import "./PanoramicMidCTA.css";

interface PanoramicMidCTAProps {
  eyebrow: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  demoTitle: string;
  demoSubtitle: string;
  defaultInterest?: string;
  secondaryLabel?: string;
  secondaryTargetSelector?: string;
}

export function PanoramicMidCTA({
  eyebrow,
  title,
  imageSrc,
  imageAlt,
  demoTitle,
  demoSubtitle,
  defaultInterest,
  secondaryLabel = "What We Offer",
  secondaryTargetSelector = ".emp-connected-section",
}: PanoramicMidCTAProps) {
  const { openDemoModal } = useDemoModal();
  const primaryLabel = "Book a Demo";
  const stackActions = Math.max(primaryLabel.length, secondaryLabel.length) > 18 || primaryLabel.length + secondaryLabel.length > 36;

  const handleSecondaryClick = () => {
    const target = document.querySelector(secondaryTargetSelector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      return;
    }

    openDemoModal({
      title: demoTitle,
      subtitle: demoSubtitle,
      defaultInterest,
    });
  };

  return (
    <section className="emp-panoramic-cta-section" aria-labelledby="cta-banner-title">
      <div className="container">
        <div className="emp-panoramic-cta-card">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="emp-panoramic-bg-img"
            loading="lazy"
          />

          <div className="emp-panoramic-gradient-overlay" aria-hidden="true" />

          <div className="emp-panoramic-content">
            <span className="emp-panoramic-eyebrow">{eyebrow}</span>
            <h2 id="cta-banner-title" className="emp-panoramic-title">
              {title}
            </h2>

            <div className={`emp-panoramic-btn-group${stackActions ? " emp-panoramic-btn-group--stack" : ""}`}>
              <button
                type="button"
                className="emp-panoramic-btn-primary"
                onClick={() =>
                  openDemoModal({
                    title: demoTitle,
                    subtitle: demoSubtitle,
                    defaultInterest,
                  })
                }
              >
                <span>{primaryLabel}</span>
                <svg className="emp-panoramic-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="7" x2="17" y2="17" />
                  <polyline points="17 7 17 17 7 17" />
                </svg>
              </button>
              <button
                type="button"
                className="emp-panoramic-btn-secondary"
                onClick={handleSecondaryClick}
              >
                <span>{secondaryLabel}</span>
                <svg className="emp-panoramic-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="7" x2="17" y2="17" />
                  <polyline points="17 7 17 17 7 17" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PanoramicMidCTA;
