import { ReactNode } from "react";
import Icon from "../ui/Icon";

export interface HeroDonutSegment {
  label: string;
  percent: number;
  color: string;
}

interface EmployeeStyleHeroProps {
  widgetVariant?: "charts" | "missionValues";
  badgeText: string;
  title: ReactNode;
  subhead: string;
  primaryLabel: string;
  onPrimaryClick: () => void;
  secondaryLabel: string;
  onSecondaryClick: () => void;
  trustPoints: string[];
  imageSrc: string;
  imageAlt: string;
  statusPill: string;
  leftWidgetTitle: string;
  leftWidgetSub: string;
  leftWidgetBadge: string;
  donutCenterLabel: string;
  donutCenterValue: string;
  donutSegments: HeroDonutSegment[];
  rightWidgetTitle: string;
  rightWidgetSub: string;
  rightWidgetBadge: string;
  rightStatValue: string;
  rightStatLabel: string;
  rightStatMeta: string;
  barHeights: number[];
  rightFooterText: string;
}

const BAR_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const DONUT_RADIUS = 68;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

function HeroUserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="3.5" fill="#FFFFFF" />
      <path d="M5 19c0-3.314 3.134-6 7-6s7 2.686 7 6" fill="#FFFFFF" />
    </svg>
  );
}

function HeroPlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path d="M6 2v8M2 6h8" stroke="#A0F4D4" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const TEAM_AVATAR_COLORS = ["#0F7C68", "#12B886", "#8B5CF6", "#18967C", "#6048D6"];
const TEAM_PILLS = [
  { label: "Product", dot: "#12B886" },
  { label: "Engineering", dot: "#8B5CF6" },
  { label: "Design", dot: "#7DECC6" },
  { label: "Customer Success", dot: "#12B886" },
  { label: "People & Ops", dot: "#8B5CF6" },
];
const GETTING_STARTED_STEPS = [
  { num: 1, color: "#0F7C68", title: "Book a Demo", sub: "See it working for your team" },
  { num: 2, color: "#12B886", title: "Tailored Setup", sub: "Configured around your policies" },
  { num: 3, color: "#8B5CF6", title: "Go Live", sub: "Launch smoothly, team by team" },
  { num: 4, color: "#0F7C68", title: "Review & Improve", sub: "Regular check-ins as you grow" },
];

export function EmployeeStyleHero({
  widgetVariant = "charts",
  badgeText,
  title,
  subhead,
  primaryLabel,
  onPrimaryClick,
  secondaryLabel,
  onSecondaryClick,
  trustPoints,
  imageSrc,
  imageAlt,
  statusPill,
  leftWidgetTitle,
  leftWidgetSub,
  leftWidgetBadge,
  donutCenterLabel,
  donutCenterValue,
  donutSegments,
  rightWidgetTitle,
  rightWidgetSub,
  rightWidgetBadge,
  rightStatValue,
  rightStatLabel,
  rightStatMeta,
  barHeights,
  rightFooterText,
}: EmployeeStyleHeroProps) {
  let donutOffset = 0;
  const isAboutCards = widgetVariant === "missionValues";

  return (
    <section className="emp-hero-rich" aria-labelledby="spotlight-hero-title">
      <div className="container">
        <div className="emp-hero-spotlight-tag" aria-label="Zentilos">
          <span>{badgeText}</span>
        </div>

        <h1 id="spotlight-hero-title" className="emp-hero-rich-title">
          {title}
        </h1>
        <p className="emp-hero-rich-subhead">{subhead}</p>

        <div className="emp-hero-rich-actions">
          <button
            type="button"
            className="emp-pill-btn-primary"
            onClick={onPrimaryClick}
          >
            {primaryLabel} <Icon name="arrow" size={15} />
          </button>
          <button
            type="button"
            className="emp-pill-btn-secondary"
            onClick={onSecondaryClick}
          >
            {secondaryLabel}
          </button>
        </div>

        <div className="emp-hero-trust-row">
          {trustPoints.map((point) => (
            <span key={point}>
              <Icon name="check" size={13} /> {point}
            </span>
          ))}
        </div>

        <div className={`emp-hero-floating-stage${isAboutCards ? " ab2-about-hero-stage" : ""}`}>
          <div className={`emp-hero-float-card emp-hero-widget-left${isAboutCards ? " ab2-about-dark-card ab2-about-team-card" : ""}`}>
            {!isAboutCards && (
              <div className="emp-float-widget-header">
                <div>
                  <h3 className="emp-float-widget-title">{leftWidgetTitle}</h3>
                  <span className="emp-float-widget-sub">{leftWidgetSub}</span>
                </div>
                <span className="emp-float-widget-badge">{leftWidgetBadge}</span>
              </div>
            )}

            {isAboutCards ? (
              <section className="ab2-about-card-inner" aria-labelledby="ab2-team-card-title">
                <h3 id="ab2-team-card-title" className="ab2-about-card-title">Meet Our Team</h3>
                <p className="ab2-about-card-subtitle">The people behind Zentilos</p>

                <ul className="ab2-team-avatars" aria-label="Team members">
                  {TEAM_AVATAR_COLORS.map((color, i) => (
                    <li key={i} className="ab2-team-avatar" style={{ backgroundColor: color }}>
                      <HeroUserIcon />
                    </li>
                  ))}
                  <li className="ab2-team-avatar ab2-team-avatar--plus">
                    <HeroPlusIcon />
                  </li>
                </ul>

                <ul className="ab2-team-pills" aria-label="Team roles">
                  {TEAM_PILLS.map((pill) => (
                    <li key={pill.label} className="ab2-team-pill">
                      <span className="ab2-team-pill-dot" style={{ backgroundColor: pill.dot }} aria-hidden="true" />
                      <span>{pill.label}</span>
                    </li>
                  ))}
                </ul>

                <p className="ab2-team-bottom-bar">Many roles, working as one team</p>
              </section>
            ) : (
              <>
                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r={DONUT_RADIUS} stroke="#F6F8F8" strokeWidth="18" fill="none" />
                    {donutSegments.map((segment) => {
                      const arcLength = (segment.percent / 100) * DONUT_CIRCUMFERENCE;
                      const offset = donutOffset;
                      donutOffset += arcLength;

                      return (
                        <circle
                          key={segment.label}
                          cx="90"
                          cy="90"
                          r={DONUT_RADIUS}
                          stroke={segment.color}
                          strokeWidth="18"
                          fill="none"
                          strokeDasharray={`${arcLength} ${DONUT_CIRCUMFERENCE}`}
                          strokeDashoffset={-offset}
                          strokeLinecap="round"
                          transform="rotate(-90 90 90)"
                        />
                      );
                    })}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">
                      {donutCenterLabel}
                    </text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">
                      {donutCenterValue}
                    </text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  {donutSegments.map((segment) => (
                    <div className="emp-legend-item" key={segment.label}>
                      <span className="emp-legend-dot" style={{ backgroundColor: segment.color }} />
                      <span>
                        {segment.label} ({segment.percent}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="emp-hero-center-photo-card">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="emp-hero-center-img"
              loading="eager"
            />

            <div className="emp-photo-status-pill">
              <span className="emp-live-pulse" />
              <span>{statusPill}</span>
            </div>
          </div>

          <div className={`emp-hero-float-card emp-hero-widget-right${isAboutCards ? " ab2-about-dark-card ab2-about-start-card" : ""}`}>
            {!isAboutCards && (
              <div className="emp-float-widget-header">
                <div>
                  <h3 className="emp-float-widget-title">{rightWidgetTitle}</h3>
                  <span className="emp-float-widget-sub">{rightWidgetSub}</span>
                </div>
                <span className="emp-float-widget-pill-green">{rightWidgetBadge}</span>
              </div>
            )}

            {isAboutCards ? (
              <section className="ab2-about-card-inner" aria-labelledby="ab2-start-card-title">
                <h3 id="ab2-start-card-title" className="ab2-about-card-title">Getting Started</h3>
                <p className="ab2-about-card-subtitle">From first demo to full launch</p>

                <ol className="ab2-start-steps">
                  {GETTING_STARTED_STEPS.map((step) => (
                    <li key={step.num} className="ab2-start-step">
                      <span className="ab2-start-step-num" style={{ backgroundColor: step.color }} aria-hidden="true">{step.num}</span>
                      <span className="ab2-start-step-copy">
                        <strong>{step.title}</strong>
                        <span>{step.sub}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            ) : (
              <>
                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">{rightStatValue}</strong>
                  <div className="emp-stat-meta">
                    <span>{rightStatLabel}</span>
                    <small>{rightStatMeta}</small>
                  </div>
                </div>

                <div className="emp-mini-bar-chart">
                  {barHeights.map((height, index) => (
                    <div
                      className={`emp-bar-col${index === 4 ? " is-active" : ""}`}
                      key={`${BAR_LABELS[index]}-${index}`}
                    >
                      <div className="emp-bar-fill" style={{ height: `${height}%` }} />
                      <span className="emp-bar-lbl">{BAR_LABELS[index]}</span>
                    </div>
                  ))}
                </div>

                <div className="emp-widget-footer-pill">
                  <Icon name="check" size={14} />
                  <span>{rightFooterText}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeStyleHero;
