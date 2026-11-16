import "./EditorialMidCTA.css";

type EditorialMidCTAProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  onPrimaryClick: () => void;
  secondaryLabel: string;
  secondaryHref?: string;
  onSecondaryClick?: () => void;
  imageSrc: string;
  imageAlt: string;
  chatLabel?: string;
  chatInitial?: string;
  onChatClick?: () => void;
  mosaicFill?: string;
  titleId?: string;
};

export default function EditorialMidCTA({
  eyebrow,
  title,
  description,
  primaryLabel,
  onPrimaryClick,
  secondaryLabel,
  secondaryHref,
  onSecondaryClick,
  imageSrc,
  imageAlt,
  chatLabel = "Ask Zentilos",
  chatInitial = "Z",
  onChatClick,
  mosaicFill = "#EFF7F6",
  titleId = "cta-banner-title",
}: EditorialMidCTAProps) {
  return (
    <section className="emc-mid-cta-section" aria-labelledby={titleId}>
      <div className="container">
        <div className="emc-mid-cta-card">
          <div className="emc-mid-cta-content-col">
            <div className="emc-mid-cta-text-wrap">
              <span className="emc-mid-cta-eyebrow">{eyebrow}</span>
              <h2 id={titleId} className="emc-mid-cta-title">
                {title}
              </h2>
              <p className="emc-mid-cta-desc">{description}</p>
              <div className="emc-mid-cta-btn-wrap">
                <button
                  type="button"
                  className="emc-mid-cta-btn emc-mid-cta-btn-primary"
                  onClick={onPrimaryClick}
                >
                  {primaryLabel}
                </button>
                {secondaryHref ? (
                  <a
                    href={secondaryHref}
                    className="emc-mid-cta-btn emc-mid-cta-btn-secondary"
                  >
                    {secondaryLabel}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="emc-mid-cta-btn emc-mid-cta-btn-secondary"
                    onClick={onSecondaryClick}
                  >
                    {secondaryLabel}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="emc-mid-cta-media-col">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="emc-mid-cta-img"
              loading="lazy"
            />

            <svg
              className="emc-mid-cta-mosaic-overlay"
              viewBox="0 0 120 440"
              preserveAspectRatio="none"
              fill={mosaicFill}
              aria-hidden="true"
            >
              <rect x="0" y="0" width="72" height="24" />
              <rect x="0" y="24" width="96" height="24" />
              <rect x="0" y="48" width="48" height="24" />
              <rect x="0" y="72" width="72" height="24" />
              <rect x="0" y="96" width="24" height="24" />
              <rect x="0" y="120" width="48" height="24" />
              <rect x="0" y="144" width="72" height="24" />
              <rect x="0" y="168" width="24" height="24" />
              <rect x="48" y="168" width="24" height="24" />
              <rect x="0" y="192" width="96" height="24" />
              <rect x="0" y="216" width="48" height="24" />
              <rect x="0" y="240" width="72" height="24" />
              <rect x="0" y="264" width="24" height="24" />
              <rect x="0" y="288" width="48" height="24" />
              <rect x="0" y="312" width="72" height="24" />
              <rect x="0" y="336" width="96" height="24" />
              <rect x="0" y="360" width="48" height="24" />
              <rect x="0" y="384" width="72" height="24" />
              <rect x="0" y="408" width="48" height="32" />
            </svg>

            <div className="emc-mid-cta-chat-widget">
              <button
                type="button"
                className="emc-mid-cta-chat-pill"
                onClick={onChatClick ?? onPrimaryClick}
              >
                <span className="emc-mid-cta-chat-avatar">{chatInitial}</span>
                <span>{chatLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
