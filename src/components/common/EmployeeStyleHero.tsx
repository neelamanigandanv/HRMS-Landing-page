import { ReactNode } from "react";
import Icon from "../ui/Icon";

export interface HeroDonutSegment {
  label: string;
  percent: number;
  color: string;
}

interface EmployeeStyleHeroProps {
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

export function EmployeeStyleHero({
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

        <div className="emp-hero-floating-stage">
          <div className="emp-hero-float-card emp-hero-widget-left">
            <div className="emp-float-widget-header">
              <div>
                <h3 className="emp-float-widget-title">{leftWidgetTitle}</h3>
                <span className="emp-float-widget-sub">{leftWidgetSub}</span>
              </div>
              <span className="emp-float-widget-badge">{leftWidgetBadge}</span>
            </div>

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

          <div className="emp-hero-float-card emp-hero-widget-right">
            <div className="emp-float-widget-header">
              <div>
                <h3 className="emp-float-widget-title">{rightWidgetTitle}</h3>
                <span className="emp-float-widget-sub">{rightWidgetSub}</span>
              </div>
              <span className="emp-float-widget-pill-green">{rightWidgetBadge}</span>
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeStyleHero;
