import Icon from "../ui/Icon";
import { useDemoModal } from "../../context/DemoModalContext";
import "./MobileFeaturesBanner.css";

const FEATURES = [
  {
    icon: "map-pin" as const,
    title: "Clock in with verified location",
    desc: "Every check-in is geo-fenced to your registered office zones. Employees clock in and out in one tap — the app confirms they're within range instantly.",
  },
  {
    icon: "calendar" as const,
    title: "Attendance & leave at a glance",
    desc: "View today's status, weekly summaries, and upcoming leaves from a single dashboard. Apply for leave, track approvals, and check balances without switching tabs.",
  },
  {
    icon: "wallet" as const,
    title: "Payslips always in your pocket",
    desc: "Download PDF payslips, view itemized salary breakdowns, and track PF & TDS deductions — all accessible anytime, anywhere from the mobile app.",
  },
];

export function MobileFeaturesBanner() {
  const { openDemoModal } = useDemoModal();

  return (
    <section className="mfb-section" aria-labelledby="mfb-heading">
      <div className="container">
        <div className="mfb-inner">

          {/* ── LEFT: Copy + Feature List ── */}
          <div className="mfb-copy">
            <span className="mfb-eyebrow">
              <span className="mfb-eyebrow-dot" aria-hidden="true" />
              Mobile First
            </span>

            <h2 id="mfb-heading" className="mfb-title">
              Built for the team{" "}
              <span>in the field</span>
            </h2>

            <p className="mfb-lead">
              Your employees don't sit at desks all day — Zentilos Mobile keeps every
              attendance action, approval, and payslip one tap away, wherever work happens.
            </p>

            <div className="mfb-features" role="list">
              {FEATURES.map((feat) => (
                <div className="mfb-feat" role="listitem" key={feat.title}>
                  <span className="mfb-feat-icon" aria-hidden="true">
                    <Icon name={feat.icon} size={20} />
                  </span>
                  <div className="mfb-feat-body">
                    <strong className="mfb-feat-title">{feat.title}</strong>
                    <p className="mfb-feat-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mfb-cta-row">
              <button
                type="button"
                className="mfb-btn-primary"
                onClick={() =>
                  openDemoModal({
                    title: "See Zentilos Mobile in Action",
                    subtitle:
                      "Get a live walkthrough of geofenced clock-in, mobile leave management, and instant payslips.",
                    defaultInterest: "Zentilos Mobile App",
                  })
                }
              >
                <Icon name="sparkle" size={15} />
                See it live
              </button>
              <a href="/features/attendance-management" className="mfb-btn-ghost">
                Explore features
                <Icon name="arrow" size={15} />
              </a>
            </div>
          </div>

          {/* ── RIGHT: Phone + Watch Stage ── */}
          <div className="mfb-stage" aria-hidden="true">
            {/* Large radial glow orb */}
            <div className="mfb-stage-orb" />
            {/* Dashed orbit ring */}
            <div className="mfb-orbit-ring" />

            {/* Primary Phone */}
            <div className="mfb-phone-wrap">
              <img
                src="/images/mobile-app-clockin.webp"
                alt="Zentilos mobile clock-in screen"
                className="mfb-phone-img"
                width={480}
                height={960}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Smartwatch mockup — inline HTML */}
            <div className="mfb-watch-wrap">
              <div className="mfb-watch">
                {/* Watch body */}
                <div className="mfb-watch-screen">
                  <div className="mfb-watch-time">09:24</div>
                  <div className="mfb-watch-label">Checked In</div>
                  <div className="mfb-watch-status">
                    <span className="mfb-watch-dot" />
                    HQ Zone
                  </div>
                  <div className="mfb-watch-divider" />
                  <div className="mfb-watch-row">
                    <span className="mfb-watch-stat-label">Worked</span>
                    <span className="mfb-watch-stat-val">4h 12m</span>
                  </div>
                  <div className="mfb-watch-row">
                    <span className="mfb-watch-stat-label">Leave</span>
                    <span className="mfb-watch-stat-val">12 days</span>
                  </div>
                </div>
                {/* Watch band top */}
                <div className="mfb-watch-band mfb-band-top" />
                {/* Watch band bottom */}
                <div className="mfb-watch-band mfb-band-bottom" />
                {/* Crown button */}
                <div className="mfb-watch-crown" />
              </div>
            </div>

            {/* Top floating notification chip */}
            <div className="mfb-chip-top">
              <span className="mfb-live-dot" />
              <div className="mfb-chip-text">
                <small>Live status</small>
                <strong>Within HQ Zone · 17 m</strong>
              </div>
            </div>

            {/* Bottom floating chip */}
            <div className="mfb-chip-bottom">
              <span className="mfb-chip-icon">
                <Icon name="check" size={14} />
              </span>
              <div className="mfb-chip-text">
                <small>Leave approved</small>
                <strong>Synced to Payroll</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default MobileFeaturesBanner;
