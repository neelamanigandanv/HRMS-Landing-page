import { useState } from "react";
import Icon, { IconName } from "../ui/Icon";
import "./MobileAppPromoSection.css";

type MobileFeatureKey = "clockin" | "attendance" | "timeLogs" | "home";

interface FeatureItem {
  key: MobileFeatureKey;
  icon: IconName;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

const MOBILE_FEATURES: FeatureItem[] = [
  {
    key: "clockin",
    icon: "map-pin",
    title: "Location Clock-In",
    desc: "Geofenced check-in & break timer",
    image: "/images/mobile-app-clockin.webp",
    alt: "Zentilos mobile Clock In / Out screen showing Within Headquarters zone (17 m), 11:47 AM check-in, breaks, and slide to check out",
  },
  {
    key: "attendance",
    icon: "calendar",
    title: "Attendance & Shifts",
    desc: "Daily check-ins & overtime tracking",
    image: "/images/mobile-app-attendance.webp",
    alt: "Zentilos mobile All attendance screen showing Today/This week/This month filters, quick actions, and weekly attendance calendar",
  },
  {
    key: "timeLogs",
    icon: "calendar",
    title: "Time Logs",
    desc: "Daily punches, breaks & work hours",
    image: "/images/mobile-app-time-logs.svg",
    alt: "Zentilos Time Logs phone screen with a weekly date strip, work and break totals, check-in and break events, and a daily hours summary",
  },
  {
    key: "home",
    icon: "users",
    title: "Home Dashboard",
    desc: "Attendance, leave, payslips & team at a glance",
    image: "/images/mobile-app-home.webp",
    alt: "Zentilos mobile home screen showing today's attendance, leave balance, payslip, team directory, and quick access tools",
  },
];

export function MobileAppPromoSection() {
  const [activeKey, setActiveKey] = useState<MobileFeatureKey>("clockin");

  const activeItem =
    MOBILE_FEATURES.find((item) => item.key === activeKey) ?? MOBILE_FEATURES[0];
  const activeIndex = MOBILE_FEATURES.findIndex((item) => item.key === activeItem.key);
  const nextItem = MOBILE_FEATURES[(activeIndex + 1) % MOBILE_FEATURES.length];

  return (
    <section
      className="mobile-promo-section"
      id="mobile-app"
      aria-labelledby="mobile-app-heading"
    >
      <div className="container">
        <div className="mobile-promo-grid">
          {/* Left Column: Headline, 4 Interactive Features & Store CTAs */}
          <div className="mobile-promo-copy">
            <span className="mobile-promo-eyebrow">
              ✦ ZENTILOS MOBILE · IOS AND ANDROID ✦
            </span>

            <h2 id="mobile-app-heading" className="mobile-promo-title">
              Keep your whole team in sync,
              <span>wherever work happens.</span>
            </h2>

            <p className="mobile-promo-lead">
              Attendance, shifts, leave, and payslips come together in one simple app, wherever
              work takes your team.
            </p>

            <div className="mobile-promo-features" role="group" aria-label="Choose an app screen">
              {MOBILE_FEATURES.map((feat) => {
                const isActive = activeKey === feat.key;
                return (
                  <button
                    key={feat.key}
                    type="button"
                    aria-pressed={isActive}
                    className={`mobile-promo-feature-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveKey(feat.key)}
                  >
                    <span className="mobile-promo-feat-icon" aria-hidden="true">
                      <Icon name={feat.icon} size={18} />
                    </span>
                    <div className="mobile-promo-feat-text">
                      <strong>{feat.title}</strong>
                      <span>{feat.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mobile-promo-store-row" aria-label="Find Zentilos in the app stores">
              <a
                className="mobile-store-img-btn"
                href="https://apps.apple.com/us/search?term=Zentilos"
                target="_blank"
                rel="noreferrer"
                aria-label="Search for Zentilos on the App Store"
              >
                <img
                  src="/images/app-store-badge.svg"
                  alt="Search the App Store"
                  width={138}
                  height={42}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                className="mobile-store-img-btn"
                href="https://play.google.com/store/search?q=Zentilos&c=apps"
                target="_blank"
                rel="noreferrer"
                aria-label="Search for Zentilos on Google Play"
              >
                <img
                  src="/images/google-play-badge.svg"
                  alt="Search Google Play"
                  width={146}
                  height={42}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              {/* <a
                className="mobile-promo-app-btn"
                href="https://play.google.com/store/search?q=Zentilos&c=apps"
                target="_blank"
                rel="noreferrer"
                aria-label="Find the Zentilos app on Google Play"
              >
                <span className="mobile-promo-app-icon" aria-hidden="true">
                  <Icon name="star" size={15} />
                </span>
                Zentilos App
              </a> */}
            </div>

          </div>

          <div className="mobile-promo-stage">
            <div className="mobile-promo-floating-badge mobile-promo-floating-badge-location">
              <span aria-hidden="true"><Icon name="map-pin" size={14} /></span>
              <span><strong>Location verified</strong><small>Secure clock-in</small></span>
            </div>
            <div className="mobile-promo-floating-badge mobile-promo-floating-badge-payroll">
              <span aria-hidden="true"><Icon name="check" size={14} /></span>
              <span><strong>Payroll ready</strong><small>Payslips on the go</small></span>
            </div>

            <div className="mp-phone-showcase" aria-live="polite">
              <img
                key={`next-${nextItem.key}`}
                src={nextItem.image}
                alt=""
                aria-hidden="true"
                className="mp-phone-secondary mp-phone-secondary-enter"
                width={500}
                height={1024}
                loading="lazy"
                decoding="async"
              />
              <img
                key={activeItem.key}
                src={activeItem.image}
                alt={activeItem.alt}
                className="mp-phone-mock-img mp-phone-mock-img-enter"
                width={500}
                height={1024}
                loading="eager"
                decoding="async"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileAppPromoSection;
