import React from "react";

interface IllustrationProps {
  type: string;
  className?: string;
}

export const PartnerIllustration: React.FC<IllustrationProps> = ({ type, className = "" }) => {
  switch (type) {
    case "item-welcome-kit":
      // Matching Image Card 1: Smartphone with credit card protruding, floating golden coins and cash bills
      return (
        <svg
          viewBox="0 0 180 150"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="phone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id="screen-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fdf2f8" />
            </linearGradient>
            <linearGradient id="card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <linearGradient id="coin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="bill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Background Cash Bills Floating */}
          <g transform="rotate(-18 35 75)" filter="url(#soft-shadow)">
            <rect x="18" y="60" width="46" height="26" rx="4" fill="url(#bill-grad)" />
            <rect x="22" y="64" width="38" height="18" rx="2" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 2" fill="none" />
            <circle cx="41" cy="73" r="5" fill="#16a34a" opacity="0.35" />
          </g>
          <g transform="rotate(22 145 95)" filter="url(#soft-shadow)">
            <rect x="125" y="80" width="44" height="24" rx="4" fill="url(#bill-grad)" />
            <circle cx="147" cy="92" r="4.5" fill="#16a34a" opacity="0.35" />
          </g>

          {/* Main Smartphone Body */}
          <g filter="url(#soft-shadow)">
            <rect x="62" y="22" width="56" height="104" rx="12" fill="url(#phone-grad)" />
            {/* Phone Screen */}
            <rect x="66" y="28" width="48" height="92" rx="8" fill="url(#screen-grad)" />
            {/* Speaker Notch */}
            <rect x="83" y="32" width="14" height="2.5" rx="1.25" fill="#f43f5e" opacity="0.4" />
            {/* Screen Content UI */}
            <rect x="72" y="40" width="36" height="5" rx="2.5" fill="#fbcfe8" />
            <rect x="72" y="49" width="22" height="4" rx="2" fill="#fce7f3" />
            <circle cx="75" cy="112" r="3" fill="#cbd5e1" />
            <circle cx="83" cy="112" r="3" fill="#cbd5e1" />
            <circle cx="91" cy="112" r="3" fill="#a855f7" />
            <circle cx="99" cy="112" r="3" fill="#cbd5e1" />
          </g>

          {/* Credit Card emerging from phone */}
          <g transform="rotate(8 100 55)" filter="url(#soft-shadow)">
            <rect x="75" y="44" width="54" height="34" rx="6" fill="url(#card-grad)" />
            {/* Magnetic strip / chip */}
            <rect x="81" y="52" width="10" height="8" rx="2" fill="#fde047" opacity="0.9" />
            <rect x="81" y="65" width="24" height="3" rx="1.5" fill="#c7d2fe" opacity="0.8" />
            <circle cx="118" cy="67" r="5" fill="#ec4899" opacity="0.75" />
            <circle cx="122" cy="67" r="5" fill="#f59e0b" opacity="0.75" />
          </g>

          {/* Golden 3D Coins floating around */}
          {/* Top-left Coin */}
          <g filter="url(#soft-shadow)">
            <ellipse cx="50" cy="42" rx="10" ry="11" fill="url(#coin-grad)" />
            <ellipse cx="50" cy="42" rx="7.5" ry="8.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <path d="M49 39v6m-2-5h4" stroke="#854d0e" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* Top-right small Coin */}
          <g filter="url(#soft-shadow)">
            <ellipse cx="128" cy="35" rx="8" ry="9" fill="url(#coin-grad)" />
            <ellipse cx="128" cy="35" rx="6" ry="7" fill="#facc15" />
          </g>
          {/* Mid-right Coin */}
          <g filter="url(#soft-shadow)">
            <ellipse cx="140" cy="62" rx="11" ry="12" fill="url(#coin-grad)" />
            <ellipse cx="140" cy="62" rx="8" ry="9" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="140" cy="62" r="4" fill="#eab308" />
          </g>
          {/* Bottom-left Coin */}
          <g filter="url(#soft-shadow)">
            <ellipse cx="52" cy="98" rx="9" ry="10" fill="url(#coin-grad)" />
            <ellipse cx="52" cy="98" rx="6.5" ry="7.5" fill="#fde047" />
          </g>
          {/* Sparkles */}
          <path d="M38 30L40 25L42 30L47 32L42 34L40 39L38 34L33 32Z" fill="#fbbf24" />
          <path d="M148 44L149 40L150 44L154 45L150 46L149 50L148 46L144 45Z" fill="#fbbf24" />
        </svg>
      );

    case "item-training":
      // Matching Image Card 2: Girl sitting on yellow beanbag with laptop working
      return (
        <svg
          viewBox="0 0 180 150"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="beanbag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="sweater-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            <linearGradient id="pants-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <filter id="soft-shadow2" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Yellow Beanbag / Lounger */}
          <g filter="url(#soft-shadow2)">
            {/* Beanbag Main Rounded Bulbous Shape */}
            <path
              d="M56 82C52 64 68 46 88 48C108 50 120 70 118 92C116 112 102 122 84 122C66 122 60 100 56 82Z"
              fill="url(#beanbag-grad)"
            />
            {/* Cushion fold lines */}
            <path
              d="M66 84C72 94 82 98 94 96"
              stroke="#ca8a04"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M68 68C74 74 84 76 96 74"
              stroke="#ca8a04"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
          </g>

          {/* Girl Figure Seated */}
          {/* Ponytail Hair */}
          <path d="M82 28C80 32 76 36 72 38C70 39 71 42 74 41C78 39 82 34 84 30Z" fill="#1e293b" />
          {/* Head & Face */}
          <circle cx="86" cy="27" r="8" fill="#fed7aa" />
          {/* Hair Front */}
          <path d="M80 25C82 20 88 20 92 23C93 24 93 27 91 29C88 29 84 28 82 27Z" fill="#1e293b" />
          {/* Neck */}
          <rect x="85" y="34" width="4" height="4" fill="#fdba74" />

          {/* Upper Body / Sweater */}
          <path
            d="M81 37C78 39 77 47 79 56C81 64 92 65 96 58C98 52 94 40 89 37Z"
            fill="url(#sweater-grad)"
          />

          {/* Arm holding laptop */}
          <path
            d="M87 43C92 46 98 49 104 53"
            stroke="#fed7aa"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Laptop on Lap */}
          <g transform="rotate(-6 102 54)" filter="url(#soft-shadow2)">
            {/* Screen */}
            <rect x="100" y="38" width="18" height="15" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            <rect x="102" y="40" width="14" height="11" rx="1" fill="#38bdf8" />
            {/* Base / Keyboard */}
            <path d="M96 53L118 53L120 56L94 56Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
          </g>

          {/* Lower Body / Legs in Leggings */}
          {/* Leg 1 stretched forward */}
          <path
            d="M84 62C88 68 98 76 114 84C120 87 124 90 128 92"
            stroke="url(#pants-grad)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Shoe / Sneaker (Red/Coral like image) */}
          <ellipse cx="132" cy="94" rx="5" ry="3.5" fill="#f43f5e" transform="rotate(-15 132 94)" />

          {/* Leg 2 slightly bent */}
          <path
            d="M86 64C89 72 96 79 108 85"
            stroke="#1e293b"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Subtle lavender selection ring indicator like Image 2 */}
          <circle cx="138" cy="112" r="5" fill="#ffffff" stroke="#802B5B" strokeWidth="2" />
          <circle cx="138" cy="112" r="2" fill="#802B5B" />
        </svg>
      );

    case "item-lead-support":
      // Matching Image Card 3: Giant checklist clipboard with two team members & big pen
      return (
        <svg
          viewBox="0 0 180 150"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="board-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
            <filter id="soft-shadow3" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Large Clipboard in Center */}
          <g filter="url(#soft-shadow3)">
            {/* Clipboard backing */}
            <rect x="66" y="22" width="58" height="92" rx="7" fill="#f59e0b" />
            {/* Paper sheet */}
            <rect x="70" y="28" width="50" height="82" rx="4" fill="url(#board-grad)" stroke="#e2e8f0" strokeWidth="1" />
            {/* Top Clip */}
            <rect x="83" y="19" width="24" height="10" rx="3" fill="#1e293b" />
            <circle cx="95" cy="24" r="2.5" fill="#ffffff" />

            {/* Checklist Lines & Ticks */}
            {/* Item 1 */}
            <rect x="76" y="38" width="6" height="6" rx="1" fill="#ec4899" />
            <path d="M77.5 41L79 42.5L81 39.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            <rect x="85" y="39.5" width="28" height="3" rx="1.5" fill="#cbd5e1" />

            {/* Item 2 */}
            <rect x="76" y="50" width="6" height="6" rx="1" fill="#3b82f6" />
            <path d="M77.5 53L79 54.5L81 51.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            <rect x="85" y="51.5" width="26" height="3" rx="1.5" fill="#cbd5e1" />

            {/* Item 3 */}
            <rect x="76" y="62" width="6" height="6" rx="1" fill="#10b981" />
            <path d="M77.5 65L79 66.5L81 63.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            <rect x="85" y="63.5" width="30" height="3" rx="1.5" fill="#cbd5e1" />

            {/* Item 4 */}
            <rect x="76" y="74" width="6" height="6" rx="1" fill="#f59e0b" />
            <path d="M77.5 77L79 78.5L81 75.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            <rect x="85" y="75.5" width="22" height="3" rx="1.5" fill="#cbd5e1" />

            {/* Item 5 */}
            <rect x="76" y="86" width="6" height="6" rx="1" fill="#8b5cf6" />
            <path d="M77.5 89L79 90.5L81 87.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            <rect x="85" y="87.5" width="25" height="3" rx="1.5" fill="#cbd5e1" />
          </g>

          {/* Left Person (Woman holding giant stylus/pen) */}
          <g>
            {/* Giant Pen */}
            <path d="M50 48L53 118L47 118Z" fill="#6366f1" />
            <polygon points="50,124 47,118 53,118" fill="#1e293b" />
            <circle cx="50" cy="46" r="3" fill="#cbd5e1" />

            {/* Head */}
            <circle cx="58" cy="54" r="5.5" fill="#fed7aa" />
            <path d="M54 50C56 46 62 46 64 50C64 52 62 54 60 54Z" fill="#1e293b" />
            {/* Torso (Pink) */}
            <path d="M54 61C54 60 62 60 62 61L64 82L52 82Z" fill="#ec4899" />
            {/* Legs (Dark) */}
            <path d="M54 82L53 118" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <path d="M62 82L63 118" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            {/* Arm pointing to board */}
            <path d="M60 66L68 62" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Right Person (Man in shirt/tie pointing to checklist) */}
          <g>
            {/* Head */}
            <circle cx="136" cy="52" r="5.5" fill="#fed7aa" />
            <path d="M132 49C134 46 140 46 141 49Z" fill="#334155" />
            {/* Shirt (White/Blue) */}
            <path d="M131 59L141 59L143 80L129 80Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* Tie (Blue) */}
            <path d="M135.5 60L137.5 60L138 72L136.5 74L135 72Z" fill="#3b82f6" />
            {/* Arm pointing to checklist */}
            <path d="M131 66L116 64" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
            {/* Legs (Blue) */}
            <path d="M132 80L131 118" stroke="#1e3a8a" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M140 80L141 118" stroke="#1e3a8a" strokeWidth="3.2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "item-demo-support":
      // Demo Support: Enterprise Cloud Sandbox Laptop Screen with charts and live gears
      return (
        <svg
          viewBox="0 0 180 150"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="laptop-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <filter id="soft-shadow4" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Cloud Badge above */}
          <g filter="url(#soft-shadow4)">
            <rect x="52" y="20" width="76" height="26" rx="13" fill="url(#cloud-grad)" />
            <path
              d="M72 34a4 4 0 0 1 7.8-1.2 3 3 0 0 1 4.2 2.7h1.5a3.5 3.5 0 0 1 0 7h-13.5a3.5 3.5 0 0 1 0-7h.8a4 4 0 0 1-.8-1.5z"
              fill="#ffffff"
            />
            <text x="92" y="36.5" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="sans-serif">
              SANDBOX
            </text>
          </g>

          {/* Laptop Monitor */}
          <g filter="url(#soft-shadow4)">
            {/* Screen Bezel */}
            <rect x="36" y="44" width="108" height="68" rx="8" fill="url(#laptop-grad)" />
            {/* Glass Screen */}
            <rect x="42" y="49" width="96" height="54" rx="4" fill="#ffffff" />

            {/* Inner Dashboard UI */}
            {/* Top Bar */}
            <rect x="42" y="49" width="96" height="11" rx="4" fill="#f8fafc" />
            <circle cx="48" cy="54.5" r="2" fill="#ef4444" />
            <circle cx="54" cy="54.5" r="2" fill="#f59e0b" />
            <circle cx="60" cy="54.5" r="2" fill="#10b981" />
            <rect x="70" y="52.5" width="46" height="4" rx="2" fill="#e2e8f0" />

            {/* Left Nav in UI */}
            <rect x="45" y="64" width="16" height="34" rx="3" fill="#f1f5f9" />
            <rect x="48" y="68" width="10" height="2" rx="1" fill="#802B5B" />
            <rect x="48" y="73" width="10" height="2" rx="1" fill="#cbd5e1" />
            <rect x="48" y="78" width="10" height="2" rx="1" fill="#cbd5e1" />

            {/* Metric Card 1 */}
            <rect x="66" y="64" width="31" height="18" rx="3" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="0.8" />
            <rect x="70" y="68" width="14" height="2" rx="1" fill="#db2777" />
            <text x="70" y="77" fill="#802B5B" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
              99.9%
            </text>

            {/* Metric Card 2 with Bar Chart */}
            <rect x="101" y="64" width="32" height="18" rx="3" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="0.8" />
            <rect x="105" y="76" width="4" height="4" rx="1" fill="#3b82f6" />
            <rect x="111" y="72" width="4" height="8" rx="1" fill="#2563eb" />
            <rect x="117" y="68" width="4" height="12" rx="1" fill="#1d4ed8" />
            <rect x="123" y="70" width="4" height="10" rx="1" fill="#60a5fa" />

            {/* Bottom Row Activity */}
            <rect x="66" y="86" width="67" height="12" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="70" y="91" width="32" height="2.5" rx="1" fill="#94a3b8" />
            <circle cx="126" cy="92" r="3" fill="#10b981" />
          </g>

          {/* Laptop Base */}
          <path d="M22 112L158 112L148 120L32 120Z" fill="#94a3b8" />
          <rect x="74" y="112" width="32" height="3" rx="1.5" fill="#64748b" />
        </svg>
      );

    case "item-marketing-material":
      // Marketing Material: Dynamic Megaphone, colorful brochures and marketing stars
      return (
        <svg
          viewBox="0 0 180 150"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mega-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="doc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fdf4ff" />
            </linearGradient>
            <filter id="soft-shadow5" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Brochure/Flyer Document behind */}
          <g transform="rotate(-12 75 70)" filter="url(#soft-shadow5)">
            <rect x="42" y="34" width="54" height="74" rx="6" fill="url(#doc-grad)" stroke="#ebdcd5" strokeWidth="1" />
            {/* Header banner on doc */}
            <rect x="46" y="38" width="46" height="14" rx="3" fill="#802B5B" />
            <rect x="50" y="44" width="22" height="3" rx="1.5" fill="#ffffff" />
            {/* Content lines */}
            <rect x="46" y="58" width="38" height="3" rx="1.5" fill="#cbd5e1" />
            <rect x="46" y="65" width="32" height="3" rx="1.5" fill="#cbd5e1" />
            <rect x="46" y="72" width="24" height="3" rx="1.5" fill="#cbd5e1" />
            {/* Chart illustration on brochure */}
            <rect x="46" y="82" width="46" height="20" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <path d="M50 96L58 90L66 93L76 86L86 89" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Vibrant Megaphone */}
          <g filter="url(#soft-shadow5)">
            {/* Handle */}
            <rect x="94" y="92" width="12" height="28" rx="5" fill="#cbd5e1" transform="rotate(-20 94 92)" />
            {/* Main Cone */}
            <path d="M84 76L126 50L134 98L84 84Z" fill="url(#mega-grad)" />
            {/* Back bulb */}
            <path d="M72 73C70 78 70 82 72 87C74 91 80 91 84 84L84 76C80 69 74 69 72 73Z" fill="#1e293b" />
            {/* Front Lip Oval */}
            <ellipse cx="132" cy="74" rx="7" ry="24" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
            <ellipse cx="132" cy="74" rx="3.5" ry="17" fill="#c2410c" />
          </g>

          {/* Sound waves & confetti emitting */}
          <path d="M145 62C150 66 150 82 145 86" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <path d="M154 54C162 62 162 86 154 94" stroke="#802B5B" strokeWidth="3" strokeLinecap="round" />

          {/* Floating confetti shapes */}
          <polygon points="152,42 155,47 160,45 156,50 158,55 153,52 149,56 150,50 146,47 151,46" fill="#facc15" />
          <circle cx="166" cy="74" r="3.5" fill="#3b82f6" />
          <rect x="156" y="86" width="6" height="6" rx="1.5" fill="#10b981" transform="rotate(25 156 86)" />
        </svg>
      );

    case "item-partner-manager":
      // Dedicated Partner Manager: Professional executive advisor with headset, direct telephone beacon & handshake crest
      return (
        <svg
          viewBox="0 0 180 150"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="manager-circle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdf2f8" />
              <stop offset="100%" stopColor="#fce7f3" />
            </linearGradient>
            <linearGradient id="suit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#802B5B" />
              <stop offset="100%" stopColor="#5d1e41" />
            </linearGradient>
            <filter id="soft-shadow6" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Background Portal Circle */}
          <circle cx="90" cy="74" r="54" fill="url(#manager-circle)" stroke="rgba(128,43,91,0.15)" strokeWidth="1.5" />

          {/* Manager Avatar */}
          <g filter="url(#soft-shadow6)">
            {/* Shoulders / Business Suit */}
            <path
              d="M58 118C60 98 72 88 90 88C108 88 120 98 122 118Z"
              fill="url(#suit-grad)"
            />
            {/* Shirt Collar */}
            <polygon points="90,104 80,88 100,88" fill="#ffffff" />
            {/* Tie / Pendant */}
            <polygon points="90,108 88,96 92,96" fill="#f59e0b" />

            {/* Neck */}
            <rect x="85" y="74" width="10" height="16" fill="#fed7aa" />

            {/* Head & Hair */}
            <circle cx="90" cy="62" r="16" fill="#fed7aa" />
            {/* Sleek Hair Style */}
            <path
              d="M74 58C75 45 84 42 96 43C104 44 107 50 106 58C101 54 94 52 86 54C80 55 76 58 74 58Z"
              fill="#1e293b"
            />

            {/* Headset with Mic */}
            <path
              d="M74 62C72 50 82 44 94 44C102 44 107 48 107 58"
              stroke="#64748b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Ear pad */}
            <rect x="71" y="57" width="5" height="12" rx="2.5" fill="#334155" />
            {/* Mic boom */}
            <path d="M74 67L84 74" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            <circle cx="85" cy="74.5" r="2.5" fill="#f43f5e" />
          </g>

          {/* Floating Badge / 24-7 Response Beacon */}
          <g filter="url(#soft-shadow6)">
            <rect x="122" y="36" width="38" height="22" rx="11" fill="#10b981" />
            <circle cx="132" cy="47" r="3" fill="#ffffff" />
            <text x="139" y="50" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
              1:1
            </text>
          </g>

          {/* Star Rating Crest on left */}
          <g filter="url(#soft-shadow6)">
            <circle cx="44" cy="54" r="12" fill="#ffffff" stroke="#fef08a" strokeWidth="1" />
            <polygon
              points="44,46 46.5,51.5 52,52 48,56 49,61.5 44,58.5 39,61.5 40,56 36,52 41.5,51.5"
              fill="#eab308"
            />
          </g>
        </svg>
      );

    default:
      return null;
  }
};

export default PartnerIllustration;

