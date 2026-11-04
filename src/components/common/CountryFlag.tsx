import React from "react";

interface CountryFlagProps {
  countryCode: string;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Renders authentic SVG country flag logos instead of system emoji flags
 * which on Windows render as two-letter codes (e.g. "SA", "US", "IN").
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  className = "",
  width = 20,
  height = 14,
}) => {
  const code = (countryCode || "").toUpperCase();

  const renderFlagContent = () => {
    switch (code) {
      // 1. United States
      case "US":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <g fillRule="evenodd">
              <path fill="#bd3d44" d="M0 0h640v480H0z" />
              <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640" />
              <path fill="#192f5d" d="M0 0h280v258.5H0z" />
              {/* Stars representation */}
              <circle cx="40" cy="35" r="8" fill="#fff" />
              <circle cx="95" cy="35" r="8" fill="#fff" />
              <circle cx="150" cy="35" r="8" fill="#fff" />
              <circle cx="205" cy="35" r="8" fill="#fff" />
              <circle cx="68" cy="75" r="8" fill="#fff" />
              <circle cx="123" cy="75" r="8" fill="#fff" />
              <circle cx="178" cy="75" r="8" fill="#fff" />
              <circle cx="233" cy="75" r="8" fill="#fff" />
              <circle cx="40" cy="115" r="8" fill="#fff" />
              <circle cx="95" cy="115" r="8" fill="#fff" />
              <circle cx="150" cy="115" r="8" fill="#fff" />
              <circle cx="205" cy="115" r="8" fill="#fff" />
              <circle cx="68" cy="155" r="8" fill="#fff" />
              <circle cx="123" cy="155" r="8" fill="#fff" />
              <circle cx="178" cy="155" r="8" fill="#fff" />
              <circle cx="233" cy="155" r="8" fill="#fff" />
              <circle cx="40" cy="195" r="8" fill="#fff" />
              <circle cx="95" cy="195" r="8" fill="#fff" />
              <circle cx="150" cy="195" r="8" fill="#fff" />
              <circle cx="205" cy="195" r="8" fill="#fff" />
              <circle cx="68" cy="230" r="8" fill="#fff" />
              <circle cx="123" cy="230" r="8" fill="#fff" />
              <circle cx="178" cy="230" r="8" fill="#fff" />
            </g>
          </svg>
        );

      // 2. India
      case "IN":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#f93" d="M0 0h640v160H0z" />
            <path fill="#fff" d="M0 160h640v160H0z" />
            <path fill="#128807" d="M0 320h640v160H0z" />
            {/* Ashoka Chakra */}
            <circle cx="320" cy="240" r="54" fill="none" stroke="#008" strokeWidth="6" />
            <circle cx="320" cy="240" r="10" fill="#008" />
            <g stroke="#008" strokeWidth="2.5">
              {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map(
                (deg) => (
                  <line
                    key={deg}
                    x1="320"
                    y1="240"
                    x2={320 + 50 * Math.cos((deg * Math.PI) / 180)}
                    y2={240 + 50 * Math.sin((deg * Math.PI) / 180)}
                  />
                )
              )}
            </g>
          </svg>
        );

      // 3. Saudi Arabia (User explicitly mentioned "SA")
      case "SA":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <rect width="640" height="480" fill="#006c35" />
            {/* White Shahada Arabic script stylized representation */}
            <g fill="#ffffff">
              <path d="M140 190h360c0-10-15-20-30-20h-80c-5-15-20-25-35-25s-30 10-35 25h-80c-15 0-30 10-30 20h-70z" opacity="0.9" />
              <path d="M160 215h320c15 0 25-10 25-20H135c0 10 10 20 25 20z" opacity="0.9" />
              {/* White Sword */}
              <rect x="180" y="270" width="280" height="12" rx="4" />
              <polygon points="460,276 490,270 460,282" />
              <rect x="195" y="258" width="10" height="36" rx="2" />
              <circle cx="175" cy="276" r="8" />
            </g>
          </svg>
        );

      // 4. United Kingdom
      case "GB":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <clipPath id="gb-clip">
              <path d="M0 0h640v480H0z" />
            </clipPath>
            <g clipPath="url(#gb-clip)">
              <path fill="#012169" d="M0 0h640v480H0z" />
              <path stroke="#fff" strokeWidth="80" d="m0 0 640 480M640 0 0 480" />
              <path stroke="#c8102e" strokeWidth="48" d="m0 0 640 480M640 0 0 480" />
              <path stroke="#fff" strokeWidth="120" d="M320 0v480M0 240h640" />
              <path stroke="#c8102e" strokeWidth="72" d="M320 0v480M0 240h640" />
            </g>
          </svg>
        );

      // 5. Canada
      case "CA":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#d52b1e" d="M0 0h640v480H0z" />
            <path fill="#fff" d="M160 0h320v480H160z" />
            {/* Maple Leaf */}
            <path
              fill="#d52b1e"
              d="M320 120l18 48 36-12-14 36 40 8-36 28 8 16-36-8-2 68h-14l-2-68-36 8 8-16-36-28 40-8-14-36 36 12z"
            />
          </svg>
        );

      // 6. United Arab Emirates
      case "AE":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#00732f" d="M0 0h640v160H0z" />
            <path fill="#fff" d="M0 160h640v160H0z" />
            <path fill="#000" d="M0 320h640v160H0z" />
            <path fill="#f00" d="M0 0h160v480H0z" />
          </svg>
        );

      // 7. Australia
      case "AU":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#00008b" d="M0 0h640v480H0z" />
            {/* Canton */}
            <g transform="scale(0.5)">
              <path fill="#012169" d="M0 0h640v480H0z" />
              <path stroke="#fff" strokeWidth="80" d="m0 0 640 480M640 0 0 480" />
              <path stroke="#c8102e" strokeWidth="48" d="m0 0 640 480M640 0 0 480" />
              <path stroke="#fff" strokeWidth="120" d="M320 0v480M0 240h640" />
              <path stroke="#c8102e" strokeWidth="72" d="M320 0v480M0 240h640" />
            </g>
            {/* Southern Cross stars */}
            <circle cx="160" cy="360" r="18" fill="#fff" />
            <circle cx="480" cy="140" r="10" fill="#fff" />
            <circle cx="440" cy="230" r="10" fill="#fff" />
            <circle cx="520" cy="270" r="10" fill="#fff" />
            <circle cx="480" cy="380" r="12" fill="#fff" />
            <circle cx="500" cy="240" r="6" fill="#fff" />
          </svg>
        );

      // 8. Singapore
      case "SG":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#ed2939" d="M0 0h640v240H0z" />
            <path fill="#fff" d="M0 240h640v240H0z" />
            <circle cx="140" cy="120" r="60" fill="#fff" />
            <circle cx="160" cy="120" r="54" fill="#ed2939" />
            <circle cx="170" cy="90" r="8" fill="#fff" />
            <circle cx="195" cy="105" r="8" fill="#fff" />
            <circle cx="190" cy="135" r="8" fill="#fff" />
            <circle cx="160" cy="140" r="8" fill="#fff" />
            <circle cx="150" cy="115" r="8" fill="#fff" />
          </svg>
        );

      // 9. Germany
      case "DE":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#000" d="M0 0h640v160H0z" />
            <path fill="#dd0000" d="M0 160h640v160H0z" />
            <path fill="#ffce00" d="M0 320h640v160H0z" />
          </svg>
        );

      // 10. France
      case "FR":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#002395" d="M0 0h213v480H0z" />
            <path fill="#fff" d="M213 0h214v480H213z" />
            <path fill="#ed2939" d="M427 0h213v480H427z" />
          </svg>
        );

      // 11. Japan
      case "JP":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <rect width="640" height="480" fill="#fff" />
            <circle cx="320" cy="240" r="120" fill="#bc002d" />
          </svg>
        );

      // 12. Philippines
      case "PH":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#0038a8" d="M0 0h640v240H0z" />
            <path fill="#ce1126" d="M0 240h640v240H0z" />
            <polygon points="0,0 280,240 0,480" fill="#fff" />
            <circle cx="95" cy="240" r="28" fill="#fcd116" />
          </svg>
        );

      // 13. South Africa
      case "ZA":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#000" d="M0 0h640v480H0z" />
            <path fill="#de3831" d="M0 0h640v240H0z" />
            <path fill="#002395" d="M0 240h640v240H0z" />
            <path stroke="#fff" strokeWidth="90" d="M0 0 280 240 0 480h80L340 240 80 0z" />
            <path stroke="#007a4d" strokeWidth="60" d="M0 0 280 240 0 480h80L340 240 80 0z" fill="#007a4d" />
            <path fill="#ffb612" d="M0 60 180 240 0 420z" />
            <path fill="#000" d="M0 90 140 240 0 390z" />
          </svg>
        );

      // 14. Netherlands
      case "NL":
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <path fill="#ae1c28" d="M0 0h640v160H0z" />
            <path fill="#fff" d="M0 160h640v160H0z" />
            <path fill="#21468b" d="M0 320h640v160H0z" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 640 480" width={width} height={height} className={className}>
            <rect width="640" height="480" fill="#64748b" />
            <text x="320" y="270" fill="#ffffff" fontSize="160" textAnchor="middle" fontWeight="bold">
              {code.slice(0, 2)}
            </text>
          </svg>
        );
    }
  };

  return (
    <span
      className="inline-flex items-center justify-center overflow-hidden rounded-[2.5px] border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: "inline-flex",
        verticalAlign: "middle",
        lineHeight: 1,
      }}
      title={code}
    >
      {renderFlagContent()}
    </span>
  );
};

export default CountryFlag;

