import { Fragment, useEffect, useRef, useState } from "react";
import SectionHeading from "../ui/SectionHeading";

interface CountUpNumberProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CountUpNumber({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpNumberProps) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        const startedAt = performance.now();
        const duration = 1600;
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(target * eased);
          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          }
        };
        frame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString("en-US");

  return (
    <span ref={elementRef} className="stat-number-run">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

interface ImpactStatItem {
  target: number;
  suffix: string;
  decimals?: number;
  label: string;
}

const IMPACT_STATS: ImpactStatItem[] = [
  { target: 500, suffix: "+", label: "Businesses trust Zentilos" },
  { target: 98, suffix: "%", label: "On-time payroll rate" },
  { target: 2.4, decimals: 1, suffix: "M+", label: "Attendance logs monthly" },
  { target: 4.8, decimals: 1, suffix: "/5", label: "Average customer rating" },
];

export function ImpactSection({ id }: { id?: string }) {
  return (
    <section className="about-numbers-section" id={id}>
      <div className="container">
        <SectionHeading
          eyebrow="OUR IMPACT"
          title="Numbers we stand behind"
          body="Concrete milestones that demonstrate the reliability, scale, and trust placed in our platform."
          center
        />

        {/* Hidden SVG defs for reusable glowing arc gradient in brand teal */}
        <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <linearGradient id="statIndigoArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6ED3CE" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#004B49" stopOpacity="1" />
              <stop offset="100%" stopColor="#6ED3CE" stopOpacity="0.35" />
            </linearGradient>
          </defs>
        </svg>

        <div className="impact-stats-container">
          <div className="impact-stats-bar">
            {IMPACT_STATS.map((stat, idx) => (
              <Fragment key={stat.label}>
                {idx > 0 && <div className="impact-stat-divider" />}
                <div className="impact-stat-item">
                  <div className="stat-number-group">
                    <CountUpNumber
                      target={stat.target}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                    <svg className="stat-glow-arc" viewBox="0 0 54 8" fill="none">
                      <path
                        d="M 3 2.5 C 16 7.5 38 7.5 51 2.5"
                        stroke="url(#statIndigoArc)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="stat-label-text">{stat.label}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpactSection;
