import React from "react";

interface HelpTopicIllustrationProps {
  topic: string;
  className?: string;
}

export const HelpTopicIllustration: React.FC<HelpTopicIllustrationProps> = ({
  topic,
  className = "",
}) => {
  switch (topic) {
    case "employee-management":
      // Illustrated Digital Employee Profile Card with avatar, badge, and verified shield
      return (
        <svg
          viewBox="0 0 180 140"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="emp-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#802B5B" />
              <stop offset="100%" stopColor="#4a1534" />
            </linearGradient>
            <linearGradient id="card-grad-emp" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fdf6f9" />
            </linearGradient>
            <filter id="emp-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Background decorative soft shapes */}
          <circle cx="90" cy="70" r="54" fill="#faedf4" />
          <circle cx="140" cy="35" r="14" fill="#fce7f3" />
          <circle cx="40" cy="105" r="10" fill="#f3e8ee" />

          {/* Main ID Profile Card */}
          <g filter="url(#emp-shadow)">
            <rect x="36" y="22" width="108" height="96" rx="14" fill="url(#card-grad-emp)" stroke="#ebdcd5" strokeWidth="1.5" />
            {/* Top header strip */}
            <rect x="36" y="22" width="108" height="26" rx="14" fill="url(#emp-bg-grad)" />
            <rect x="36" y="38" width="108" height="10" fill="url(#emp-bg-grad)" />
            <circle cx="50" cy="35" r="3" fill="#ffffff" opacity="0.6" />
            <circle cx="58" cy="35" r="3" fill="#ffffff" opacity="0.6" />
            <rect x="100" y="32" width="34" height="6" rx="3" fill="#ffffff" opacity="0.4" />

            {/* Avatar Circle */}
            <circle cx="90" cy="48" r="18" fill="#ffffff" stroke="#ebdcd5" strokeWidth="2" />
            <circle cx="90" cy="45" r="8" fill="#802B5B" />
            <path d="M78 61 C78 54 83 52 90 52 C97 52 102 54 102 61" fill="#802B5B" />

            {/* Verified Badge */}
            <circle cx="102" cy="58" r="6" fill="#10b981" />
            <path d="M99.5 58 L101.5 60 L104.5 56" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Name and Detail placeholders */}
            <rect x="62" y="72" width="56" height="6" rx="3" fill="#191735" />
            <rect x="70" y="82" width="40" height="4" rx="2" fill="#802B5B" opacity="0.7" />
            <rect x="52" y="93" width="76" height="15" rx="5" fill="#f4ecf0" />
            <rect x="58" y="98" width="30" height="5" rx="2.5" fill="#802B5B" />
            <rect x="96" y="98" width="26" height="5" rx="2.5" fill="#10b981" />
          </g>
        </svg>
      );

    case "attendance-shifts":
      // Biometric fingerprint clock with live time punch indicators & radar pulses
      return (
        <svg
          viewBox="0 0 180 140"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="clock-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#802B5B" />
              <stop offset="100%" stopColor="#3b0f27" />
            </linearGradient>
            <filter id="clock-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Pulse waves */}
          <circle cx="90" cy="70" r="58" fill="#fdf2f8" opacity="0.7" />
          <circle cx="90" cy="70" r="48" fill="#fce7f3" opacity="0.6" />

          {/* Device Terminal Body */}
          <g filter="url(#clock-shadow)">
            <rect x="42" y="24" width="96" height="92" rx="16" fill="#ffffff" stroke="#ebdcd5" strokeWidth="1.5" />
            {/* Terminal Screen Header */}
            <rect x="48" y="30" width="84" height="28" rx="8" fill="url(#clock-grad)" />
            {/* Digital Clock Display */}
            <text x="90" y="49" fill="#ffffff" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="monospace">
              09:00:00
            </text>
            <circle cx="58" cy="44" r="3" fill="#10b981" />

            {/* Fingerprint Scanner Pad */}
            <rect x="65" y="66" width="50" height="42" rx="10" fill="#fdf2f8" stroke="#802B5B" strokeWidth="1.5" strokeDasharray="3 2" />
            
            {/* Fingerprint Swirl Rings */}
            <path d="M90 73 C84 73 80 77 80 82 C80 89 84 94 90 94 C96 94 100 89 100 82" stroke="#802B5B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M85 82 C85 79 87 77 90 77 C93 77 95 79 95 82 C95 87 92 90 90 90" stroke="#802B5B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="90" cy="82" r="1.5" fill="#802B5B" />

            {/* Success check bubble */}
            <circle cx="120" cy="66" r="9" fill="#10b981" />
            <path d="M116.5 66 L119 68.5 L123.5 64" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );

    case "leave-management":
      // Calendar desk pad with approved vacation leaves, sun/airplane and balance pill
      return (
        <svg
          viewBox="0 0 180 140"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cal-hdr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#802B5B" />
              <stop offset="100%" stopColor="#57173b" />
            </linearGradient>
            <filter id="cal-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Background glow */}
          <circle cx="90" cy="70" r="54" fill="#faf5f8" />
          <circle cx="138" cy="38" r="14" fill="#fef3c7" opacity="0.7" />

          {/* Calendar pad */}
          <g filter="url(#cal-shadow)">
            <rect x="40" y="24" width="100" height="92" rx="14" fill="#ffffff" stroke="#ebdcd5" strokeWidth="1.5" />
            {/* Calendar Rings */}
            <rect x="58" y="18" width="6" height="12" rx="3" fill="#802B5B" />
            <rect x="87" y="18" width="6" height="12" rx="3" fill="#802B5B" />
            <rect x="116" y="18" width="6" height="12" rx="3" fill="#802B5B" />

            {/* Top Month Header */}
            <rect x="40" y="24" width="100" height="26" rx="14" fill="url(#cal-hdr-grad)" />
            <rect x="40" y="40" width="100" height="10" fill="url(#cal-hdr-grad)" />
            <text x="90" y="41" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="1">
              OCTOBER
            </text>

            {/* Calendar Grid Cells */}
            <circle cx="56" cy="62" r="6" fill="#f4ecf0" />
            <circle cx="73" cy="62" r="6" fill="#f4ecf0" />
            <circle cx="90" cy="62" r="6" fill="#802B5B" />
            <circle cx="107" cy="62" r="6" fill="#802B5B" />
            <circle cx="124" cy="62" r="6" fill="#802B5B" />

            <circle cx="56" cy="78" r="6" fill="#f4ecf0" />
            <circle cx="73" cy="78" r="6" fill="#10b981" />
            <circle cx="90" cy="78" r="6" fill="#10b981" />
            <circle cx="107" cy="78" r="6" fill="#f4ecf0" />
            <circle cx="124" cy="78" r="6" fill="#f4ecf0" />

            {/* Approved Leave Badge at bottom */}
            <rect x="48" y="94" width="84" height="14" rx="7" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <text x="90" y="104" fill="#047857" fontSize="8" fontWeight="800" textAnchor="middle">
              ✓ LEAVE APPROVED (3 DAYS)
            </text>
          </g>
        </svg>
      );

    case "payroll-management":
      // Payslip register with tax calculation graph, currency coin stack, and direct transfer
      return (
        <svg
          viewBox="0 0 180 140"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="coin-grad-help" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="pay-hdr" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#802B5B" />
              <stop offset="100%" stopColor="#4c1434" />
            </linearGradient>
            <filter id="pay-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Background glow */}
          <circle cx="90" cy="70" r="54" fill="#fcf6f9" />

          {/* Main Payslip Card */}
          <g filter="url(#pay-shadow)">
            <rect x="40" y="22" width="100" height="96" rx="14" fill="#ffffff" stroke="#ebdcd5" strokeWidth="1.5" />
            {/* Header */}
            <rect x="40" y="22" width="100" height="26" rx="14" fill="url(#pay-hdr)" />
            <rect x="40" y="38" width="100" height="10" fill="url(#pay-hdr)" />
            <text x="90" y="39" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle" letterSpacing="1">
              PAYROLL DISPATCH
            </text>

            {/* Salary Breakdown Lines */}
            <rect x="52" y="56" width="46" height="5" rx="2.5" fill="#191735" />
            <rect x="110" y="56" width="18" height="5" rx="2.5" fill="#802B5B" />

            <rect x="52" y="66" width="38" height="4" rx="2" fill="#94a3b8" />
            <rect x="112" y="66" width="16" height="4" rx="2" fill="#10b981" />

            <rect x="52" y="74" width="42" height="4" rx="2" fill="#94a3b8" />
            <rect x="114" y="74" width="14" height="4" rx="2" fill="#ef4444" />

            {/* Total Net Pay Pill */}
            <rect x="48" y="86" width="84" height="22" rx="7" fill="#fdf2f8" stroke="#802B5B" strokeWidth="1" />
            <text x="90" y="99" fill="#802B5B" fontSize="9" fontWeight="800" textAnchor="middle">
              NET DISPATCH: 100% OK
            </text>
          </g>

          {/* Floating Gold Coin Stacks */}
          <g transform="translate(132, 85)">
            <ellipse cx="10" cy="18" rx="12" ry="5" fill="#ca8a04" />
            <ellipse cx="10" cy="14" rx="12" ry="5" fill="url(#coin-grad-help)" />
            <ellipse cx="10" cy="10" rx="12" ry="5" fill="#ca8a04" />
            <ellipse cx="10" cy="6" rx="12" ry="5" fill="url(#coin-grad-help)" />
            <text x="10" y="8" fill="#854d0e" fontSize="7" fontWeight="900" textAnchor="middle">₹</text>
          </g>
        </svg>
      );

    case "recruitment-onboarding":
      // Candidate pipeline clipboard with completed checklist and digital offer letter
      return (
        <svg
          viewBox="0 0 180 140"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="rec-hdr" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#802B5B" />
              <stop offset="100%" stopColor="#4f1737" />
            </linearGradient>
            <filter id="rec-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Background soft glow */}
          <circle cx="90" cy="70" r="54" fill="#fbf5f8" />

          {/* Clipboard Board */}
          <rect x="42" y="24" width="96" height="96" rx="12" fill="#ebdcd5" />
          
          {/* Clipboard Sheet */}
          <g filter="url(#rec-shadow)">
            <rect x="46" y="28" width="88" height="90" rx="10" fill="#ffffff" />
            
            {/* Top Clip Hardware */}
            <rect x="74" y="20" width="32" height="12" rx="4" fill="#802B5B" />
            <circle cx="90" cy="26" r="3" fill="#ffffff" />

            {/* Candidate Title */}
            <rect x="56" y="42" width="48" height="6" rx="3" fill="#191735" />
            <rect x="56" y="52" width="68" height="3" rx="1.5" fill="#cbd5e1" />

            {/* Checklist items with checkmarks */}
            <circle cx="62" cy="64" r="5" fill="#10b981" />
            <path d="M59.5 64 L61.5 66 L64.5 62" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="72" y="62" width="46" height="4" rx="2" fill="#475569" />

            <circle cx="62" cy="77" r="5" fill="#10b981" />
            <path d="M59.5 77 L61.5 79 L64.5 75" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="72" y="75" width="50" height="4" rx="2" fill="#475569" />

            <circle cx="62" cy="90" r="5" fill="#10b981" />
            <path d="M59.5 90 L61.5 92 L64.5 88" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="72" y="88" width="42" height="4" rx="2" fill="#475569" />

            {/* Offer Letter Badge */}
            <rect x="54" y="101" width="72" height="12" rx="6" fill="#fdf2f8" stroke="#802B5B" strokeWidth="1" />
            <text x="90" y="110" fill="#802B5B" fontSize="7.5" fontWeight="800" textAnchor="middle">
              OFFER RELEASED ✓
            </text>
          </g>
        </svg>
      );

    case "roles-permissions":
    default:
      // Enterprise security shield, biometric padlock, key and RBAC permission toggles
      return (
        <svg
          viewBox="0 0 180 140"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="shield-grad-help" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#802B5B" />
              <stop offset="100%" stopColor="#450d2c" />
            </linearGradient>
            <filter id="role-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Background circle */}
          <circle cx="90" cy="70" r="54" fill="#faf2f7" />

          {/* Central Shield */}
          <g filter="url(#role-shadow)">
            <path
              d="M90 24 C112 24 130 30 130 52 C130 82 108 106 90 114 C72 106 50 82 50 52 C50 30 68 24 90 24 Z"
              fill="url(#shield-grad-help)"
            />
            <path
              d="M90 28 C108 28 124 33 124 53 C124 79 104 100 90 108 C76 100 56 79 56 53 C56 33 72 28 90 28 Z"
              fill="#ffffff"
            />

            {/* Inner Security Lock */}
            {/* Shackle */}
            <path
              d="M80 62 V54 C80 48.5 84.5 44 90 44 C95.5 44 100 48.5 100 54 V62"
              stroke="#802B5B"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Lock Body */}
            <rect x="74" y="60" width="32" height="26" rx="6" fill="#802B5B" />
            {/* Keyhole */}
            <circle cx="90" cy="71" r="3" fill="#ffffff" />
            <path d="M89 72 L88 78 H92 L91 72 Z" fill="#ffffff" />

            {/* Granular Permission Toggle Badges */}
            <rect x="68" y="92" width="44" height="10" rx="5" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <circle cx="74" cy="97" r="2.5" fill="#10b981" />
            <text x="91" y="100" fill="#065f46" fontSize="7" fontWeight="800" textAnchor="middle">
              RBAC ACTIVE
            </text>
          </g>
        </svg>
      );
  }
};

export default HelpTopicIllustration;

