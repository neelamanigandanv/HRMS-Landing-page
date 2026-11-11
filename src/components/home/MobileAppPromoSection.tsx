import { useState } from "react";
import Icon, { IconName } from "../ui/Icon";
import { useDemoModal } from "../../context/DemoModalContext";
import "./MobileAppPromoSection.css";

type MobileFeatureKey = "home" | "clockin" | "attendance" | "payslip";

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
    key: "home",
    icon: "users",
    title: "All-in-One Hub",
    desc: "Today's punches, leaves, payslips & team",
    image: "/images/mobile-app-home.png",
    alt: "Zentilos mobile home dashboard showing Today's Attendance, Leave 12 days, Payslip Oct 2026, and Directory 48 peoples",
  },
  {
    key: "clockin",
    icon: "map-pin",
    title: "Location Clock-In",
    desc: "Geofenced check-in & break timer",
    image: "/images/mobile-app-clockin.png",
    alt: "Zentilos mobile Clock In / Out screen showing Within Headquarters zone (17 m), 11:47 AM check-in, breaks, and slide to check out",
  },
  {
    key: "attendance",
    icon: "calendar",
    title: "Attendance & Shifts",
    desc: "Daily check-ins & overtime tracking",
    image: "/images/mobile-app-attendance.png",
    alt: "Zentilos mobile All attendance screen showing Today/This week/This month filters, quick actions, and weekly attendance calendar",
  },
  {
    key: "payslip",
    icon: "wallet",
    title: "Instant Payslips",
    desc: "Net salary breakdown & tax slips",
    image: "/images/mobile-app-payslip.png",
    alt: "Zentilos mobile Payslip & Tax screen showing ₹84,500 net pay, Download PDF Payslip button, Basic & HRA, Allowances, and PF & TDS Tax",
  },
];

export function MobileAppPromoSection() {
  const { openDemoModal } = useDemoModal();
  const [activeKey, setActiveKey] = useState<MobileFeatureKey>("home");

  const activeItem =
    MOBILE_FEATURES.find((item) => item.key === activeKey) ?? MOBILE_FEATURES[0];

  const handleStoreDemo = (platform: "iOS" | "Android") => {
    openDemoModal({
      title: `Explore Zentilos Mobile App (${platform})`,
      subtitle:
        "See live location-verified attendance, quick regularizations, and instant mobile payslips in a personalized demo.",
      defaultInterest: `Zentilos Mobile App (${platform})`,
    });
  };

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
              ✦ ZENTILOS MOBILE APP · IOS &amp; ANDROID ✦
            </span>

            <h2 id="mobile-app-heading" className="mobile-promo-title">
              Workforce Control, <span>Right in Every Pocket</span>
            </h2>

            <p className="mobile-promo-lead">
              Clock in with location verification, check team shifts in one tap, and download
              itemized payslips anytime on the go.
            </p>

            {/* 4 Interactive Feature Cards synced 1-to-1 with Real Mobile App Screens */}
            <div className="mobile-promo-features" role="tablist" aria-label="Mobile App Features">
              {MOBILE_FEATURES.map((feat) => {
                const isActive = activeKey === feat.key;
                return (
                  <button
                    key={feat.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
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

            {/* App Store + Google Play Badges with Trust Rating */}
            <div className="mobile-promo-cta-wrap">
              <div className="mobile-promo-store-row">
                <button
                  type="button"
                  className="mobile-store-img-btn"
                  onClick={() => handleStoreDemo("iOS")}
                  aria-label="Download Zentilos on the App Store"
                >
                  <img
                    src="/images/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={138}
                    height={42}
                    loading="lazy"
                    decoding="async"
                  />
                </button>

                <button
                  type="button"
                  className="mobile-store-img-btn"
                  onClick={() => handleStoreDemo("Android")}
                  aria-label="Get Zentilos on Google Play"
                >
                  <img
                    src="/images/google-play-badge.svg"
                    alt="Get it on Google Play"
                    width={146}
                    height={42}
                    loading="lazy"
                    decoding="async"
                  />
                </button>

                <div className="mobile-promo-rating-chip" aria-hidden="true">
                  <div className="mp-rating-stars">★★★★★</div>
                  <span className="mp-rating-text">4.9 · iOS &amp; Android</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Real Mobile Showcase */}
          <div className="mobile-promo-stage">
            {/* Background Atmosphere: Geofence Radar Halo & Subtle Concentric Rings */}
            <div className="mp-stage-decor" aria-hidden="true">
              <div className="mp-decor-halo" />
              <div className="mp-decor-ring mp-ring-1" />
              <div className="mp-decor-ring mp-ring-2" />
              <div className="mp-decor-ring mp-ring-3" />
              <span className="mp-decor-sparkle sp-1">✦</span>
              <span className="mp-decor-sparkle sp-2">✦</span>
            </div>

            {/* Floating Context Card Top Left */}
            <div className="mp-float-pill mp-float-top" aria-hidden="true">
              <span className="mp-float-icon">
                <Icon name="map-pin" size={15} />
              </span>
              <div className="mp-float-text">
                <small>Location Verified</small>
                <strong>Mumbai HQ · 09:24 AM</strong>
              </div>
            </div>

            {/* Real Mobile App Screenshot Stage */}
            <div className="mp-phone-showcase">
              <img
                key={activeItem.key}
                src={activeItem.image}
                alt={activeItem.alt}
                className="mp-phone-mock-img"
                width={500}
                height={1024}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Floating Context Card Bottom Right */}
            <div className="mp-float-pill mp-float-bottom" aria-hidden="true">
              <span className="mp-float-icon">
                <Icon name="check" size={15} />
              </span>
              <div className="mp-float-text">
                <small>Leave Approved · 1s</small>
                <strong>Synced Across Payroll</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileAppPromoSection;
