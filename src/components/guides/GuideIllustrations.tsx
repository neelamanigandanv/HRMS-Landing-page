import React from "react";

interface IllustrationProps {
  isHovered?: boolean;
}

// 1. PAYROLL ILLUSTRATION (Dark plum studio canvas, payslip monitor, chart monitor, coin & chips)
export function PayrollIllustration({}: IllustrationProps) {
  return (
    <div className="guide-illustration-svg-wrap illust-payroll">
      <svg viewBox="0 0 320 160" className="illust-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-transparent Studio Floor */}
        <rect x="0" y="115" width="320" height="45" fill="rgba(0, 0, 0, 0.32)" />

        {/* Left Monitor / Payslip Card */}
        <g transform="translate(30, 22)">
          <circle cx="50" cy="14" r="12" fill="#004B49" />
          <rect x="0" y="36" width="100" height="72" rx="8" fill="#00201F" stroke="#003836" strokeWidth="1.5" />
          <rect x="14" y="52" width="72" height="6" rx="3" fill="#F6F8F8" />
          <rect x="14" y="66" width="50" height="5" rx="2.5" fill="#004B49" opacity="0.85" />
          <line x1="14" y1="80" x2="86" y2="80" stroke="#003836" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="14" y="88" width="35" height="5" rx="2.5" fill="#9e9198" />
          <rect x="58" y="88" width="28" height="5" rx="2.5" fill="#34d399" />
        </g>

        {/* Right Monitor / Bar Chart Card */}
        <g transform="translate(160, 22)">
          <circle cx="50" cy="14" r="12" fill="#004B49" />
          <rect x="0" y="36" width="100" height="72" rx="8" fill="#00201F" stroke="#003836" strokeWidth="1.5" />
          <rect x="18" y="72" width="9" height="24" rx="2" fill="#004B49" />
          <rect x="33" y="58" width="9" height="38" rx="2" fill="#34d399" />
          <rect x="48" y="48" width="9" height="48" rx="2" fill="#004B49" />
          <rect x="63" y="66" width="9" height="30" rx="2" fill="#38bdf8" />
        </g>

        {/* Little plant sprout at bottom */}
        <g transform="translate(275, 96)">
          <line x1="10" y1="35" x2="10" y2="18" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M10 22C6 18 6 12 10 10C14 12 14 18 10 22Z" fill="#34d399" />
          <circle cx="10" cy="35" r="3" fill="#004B49" />
        </g>

        {/* Champagne-Gold Rupee Coin (Bouncing on hover) */}
        <g className="illust-coin-bounce" transform="translate(136, 68)">
          <circle cx="14" cy="14" r="14" fill="url(#goldGrad)" filter="drop-shadow(0 4px 10px rgba(245, 158, 11, 0.5))" />
          <circle cx="14" cy="14" r="11" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
          <text x="10.5" y="18.5" fill="#00201F" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11">
            ₹
          </text>
        </g>

        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" />
            <stop offset="0.5" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#b45309" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// 2. LEAVE ILLUSTRATION (Dark plum studio canvas, calendar grid, pulsating day & approved badge)
export function LeaveIllustration({}: IllustrationProps) {
  return (
    <div className="guide-illustration-svg-wrap illust-leave">
      <svg viewBox="0 0 320 160" className="illust-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-transparent Studio Floor */}
        <rect x="0" y="115" width="320" height="45" fill="rgba(0, 0, 0, 0.32)" />

        {/* Calendar Body */}
        <g transform="translate(85, 20)">
          <rect x="0" y="0" width="150" height="110" rx="12" fill="#00201F" stroke="#003836" strokeWidth="1.5" />
          
          {/* Header Bar */}
          <path d="M0 12C0 5.37 5.37 0 12 0H138C144.63 0 150 5.37 150 12V26H0V12Z" fill="#004B49" />
          <circle cx="30" cy="-3" r="3" fill="#004B49" />
          <circle cx="120" cy="-3" r="3" fill="#004B49" />
          <text x="75" y="17" fill="#ffffff" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="9" textAnchor="middle" letterSpacing="0.08em">
            OCTOBER
          </text>

          {/* Grid of days */}
          <g fill="#7C8886">
            <circle cx="28" cy="42" r="4" />
            <circle cx="52" cy="42" r="4" />
            <circle cx="76" cy="42" r="4" />
            <circle cx="100" cy="42" r="4" />
            <circle cx="124" cy="42" r="4" />

            <circle cx="28" cy="62" r="4" />
            <circle cx="52" cy="62" r="4" />
            <circle cx="100" cy="62" r="4" />
            <circle cx="124" cy="62" r="4" />

            <circle cx="28" cy="82" r="4" />
            <circle cx="52" cy="82" r="4" />
            <circle cx="76" cy="82" r="4" />
            <circle cx="100" cy="82" r="4" />
          </g>

          {/* Active Highlight Day */}
          <rect x="65" y="51" width="22" height="22" rx="6" fill="#004B49" className="calendar-active-day" filter="drop-shadow(0 0 8px #004B49)" />
          <text x="76" y="65.5" fill="#00201F" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="9.5" textAnchor="middle">
            24
          </text>

          {/* Approved Tag Pill */}
          <g className="approved-tag-bounce" transform="translate(85, 74)">
            <rect x="0" y="0" width="74" height="22" rx="11" fill="#34d399" filter="drop-shadow(0 4px 10px rgba(52, 211, 153, 0.45))" />
            <path d="M12 11l3 3 7-7" stroke="#00201F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="26" y="14.5" fill="#00201F" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="8.5">
              Approved
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// 3. RECRUITMENT ILLUSTRATION (Dark plum studio canvas, 3 pipeline columns, sliding card)
export function RecruitmentIllustration({}: IllustrationProps) {
  return (
    <div className="guide-illustration-svg-wrap illust-recruitment">
      <svg viewBox="0 0 320 160" className="illust-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-transparent Studio Floor */}
        <rect x="0" y="115" width="320" height="45" fill="rgba(0, 0, 0, 0.32)" />

        {/* 3 Pipeline Columns */}
        <g transform="translate(42, 24)">
          <rect x="0" y="0" width="70" height="106" rx="8" fill="#00201F" stroke="#003836" strokeWidth="1.2" />
          <rect x="82" y="0" width="70" height="106" rx="8" fill="#00201F" stroke="#003836" strokeWidth="1.2" />
          <rect x="164" y="0" width="70" height="106" rx="8" fill="#00201F" stroke="#003836" strokeWidth="1.2" />

          {/* Column Header Titles */}
          <rect x="12" y="12" width="36" height="5" rx="2.5" fill="#004B49" />
          <rect x="94" y="12" width="40" height="5" rx="2.5" fill="#004B49" />
          <rect x="176" y="12" width="32" height="5" rx="2.5" fill="#34d399" />

          {/* Col 1 Cards */}
          <rect x="8" y="26" width="54" height="28" rx="6" fill="#00201F" stroke="#003836" strokeWidth="1" />
          <circle cx="20" cy="40" r="5" fill="#004B49" />
          <rect x="30" y="38" width="24" height="4" rx="2" fill="#E5EAEA" />

          <rect x="8" y="60" width="54" height="28" rx="6" fill="#00201F" stroke="#003836" strokeWidth="1" />
          <circle cx="20" cy="74" r="5" fill="#004B49" />
          <rect x="30" y="72" width="22" height="4" rx="2" fill="#E5EAEA" />

          {/* Sliding Candidate Card */}
          <g className="pipeline-candidate-card" transform="translate(90, 32)">
            <rect x="0" y="0" width="54" height="38" rx="6" fill="#004B49" filter="drop-shadow(0 4px 12px rgba(244, 114, 182, 0.45))" />
            <circle cx="16" cy="18" r="6" fill="#00201F" />
            <rect x="26" y="15" width="20" height="4" rx="2" fill="#00201F" />
            <rect x="10" y="27" width="34" height="4" rx="2" fill="#34d399" />
          </g>

          {/* Col 3 Hired Item */}
          <rect x="172" y="62" width="54" height="30" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="1.2" />
          <path d="M188 77l4 4 10-10" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// 4. EXPENSE ILLUSTRATION (Dark plum studio canvas, receipt with laser scan and gold coin)
export function ExpenseIllustration({}: IllustrationProps) {
  return (
    <div className="guide-illustration-svg-wrap illust-expense">
      <svg viewBox="0 0 320 160" className="illust-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-transparent Studio Floor */}
        <rect x="0" y="115" width="320" height="45" fill="rgba(0, 0, 0, 0.32)" />

        {/* Receipt Page with Jagged Bottom */}
        <g transform="translate(100, 18)">
          <path
            d="M0 0 H120 V110 L112 105 L104 110 L96 105 L88 110 L80 105 L72 110 L64 105 L56 110 L48 105 L40 110 L32 105 L24 110 L16 105 L8 110 L0 105 Z"
            fill="#00201F"
            stroke="#003836"
            strokeWidth="1.5"
            filter="drop-shadow(0 6px 16px rgba(0, 0, 0, 0.4))"
          />

          {/* Receipt Header */}
          <circle cx="20" cy="18" r="6" fill="#004B49" />
          <rect x="32" y="15" width="60" height="6" rx="3" fill="#F6F8F8" />
          <line x1="12" y1="30" x2="108" y2="30" stroke="#003836" strokeWidth="1" strokeDasharray="3 3" />

          {/* Line Items */}
          <rect x="12" y="40" width="46" height="5" rx="2.5" fill="#E5EAEA" />
          <rect x="84" y="40" width="24" height="5" rx="2.5" fill="#38bdf8" />
          <rect x="12" y="52" width="56" height="5" rx="2.5" fill="#E5EAEA" />
          <rect x="80" y="52" width="28" height="5" rx="2.5" fill="#38bdf8" />
          <line x1="12" y1="65" x2="108" y2="65" stroke="#003836" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="12" y="74" width="38" height="6" rx="3" fill="#004B49" />
          <rect x="74" y="74" width="34" height="6" rx="3" fill="#34d399" />

          {/* Animated Laser Scanning Line */}
          <g className="receipt-scan-line">
            <line x1="-8" y1="50" x2="128" y2="50" stroke="#004B49" strokeWidth="2.5" strokeLinecap="round" filter="drop-shadow(0 0 8px #004B49)" />
            <circle cx="-6" cy="50" r="3.5" fill="#004B49" />
            <circle cx="126" cy="50" r="3.5" fill="#004B49" />
          </g>

          {/* Gold Coin at Bottom Corner */}
          <g className="illust-coin-bounce" transform="translate(100, 80)">
            <circle cx="14" cy="14" r="14" fill="#f59e0b" filter="drop-shadow(0 4px 10px rgba(245, 158, 11, 0.6))" />
            <circle cx="14" cy="14" r="11" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
            <text x="10.5" y="18.5" fill="#00201F" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11">
              ₹
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// 5. ATTENDANCE ILLUSTRATION (Dark plum studio canvas, clock face with spinning hand & biometric chip)
export function AttendanceIllustration({}: IllustrationProps) {
  return (
    <div className="guide-illustration-svg-wrap illust-attendance">
      <svg viewBox="0 0 320 160" className="illust-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-transparent Studio Floor */}
        <rect x="0" y="115" width="320" height="45" fill="rgba(0, 0, 0, 0.32)" />

        {/* Clock Frame */}
        <g transform="translate(90, 24)">
          <circle cx="56" cy="56" r="48" fill="#00201F" stroke="#003836" strokeWidth="2.5" filter="drop-shadow(0 6px 18px rgba(0, 0, 0, 0.4))" />
          <circle cx="56" cy="56" r="42" fill="#00201F" />

          {/* Hour Markers */}
          <line x1="56" y1="20" x2="56" y2="26" stroke="#004B49" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="92" y1="56" x2="86" y2="56" stroke="#004B49" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="56" y1="92" x2="56" y2="86" stroke="#004B49" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="56" x2="26" y2="56" stroke="#004B49" strokeWidth="2.5" strokeLinecap="round" />

          {/* Pivot */}
          <circle cx="56" cy="56" r="5" fill="#004B49" />

          {/* Fixed Hour Hand */}
          <line x1="56" y1="56" x2="38" y2="50" stroke="#F6F8F8" strokeWidth="3" strokeLinecap="round" />

          {/* Spinning Minute Hand */}
          <g className="clock-minute-hand">
            <line x1="56" y1="56" x2="56" y2="28" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Biometric Chip "09:28 AM" */}
          <g transform="translate(86, 28)">
            <rect x="0" y="0" width="88" height="26" rx="13" fill="#00201F" stroke="#004B49" strokeWidth="1.5" filter="drop-shadow(0 4px 12px rgba(244, 114, 182, 0.35))" />
            <circle cx="14" cy="13" r="4" fill="#34d399" className="live-pulse-dot" filter="drop-shadow(0 0 6px #34d399)" />
            <text x="24" y="17" fill="#ffffff" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="10" letterSpacing="0.04em">
              09:28 AM
            </text>
          </g>

          {/* Subpill: On Time */}
          <g transform="translate(94, 62)">
            <rect x="0" y="0" width="72" height="20" rx="10" fill="#34d399" />
            <text x="36" y="13.5" fill="#00201F" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="8" textAnchor="middle">
              On Time · GPS
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// 6. COMPLIANCE ILLUSTRATION (Dark plum studio canvas, shield with redrawing check & statutory date tags)
export function ComplianceIllustration({}: IllustrationProps) {
  return (
    <div className="guide-illustration-svg-wrap illust-compliance">
      <svg viewBox="0 0 320 160" className="illust-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-transparent Studio Floor */}
        <rect x="0" y="115" width="320" height="45" fill="rgba(0, 0, 0, 0.32)" />

        {/* Shield */}
        <g transform="translate(110, 18)">
          <path
            d="M50 0 C82 0 100 12 100 36 C100 75 64 100 50 110 C36 100 0 75 0 36 C0 12 18 0 50 0 Z"
            fill="#00201F"
            stroke="#004B49"
            strokeWidth="2.5"
            filter="drop-shadow(0 6px 18px rgba(244, 114, 182, 0.3))"
          />
          <path
            d="M50 8 C76 8 92 18 92 38 C92 70 60 92 50 100 C40 92 8 70 8 38 C8 18 24 8 50 8 Z"
            fill="#00201F"
          />

          {/* Redrawing Animated Checkmark */}
          <path
            d="M34 50 L46 62 L68 36"
            stroke="#34d399"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="compliance-check-anim"
            filter="drop-shadow(0 0 8px #34d399)"
          />

          {/* Floating Tag 1: "7th TDS" */}
          <g transform="translate(-56, 26)">
            <rect x="0" y="0" width="62" height="24" rx="12" fill="#004B49" filter="drop-shadow(0 4px 10px rgba(0, 75, 73, 0.4))" />
            <text x="31" y="15.5" fill="#ffffff" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="8.5" textAnchor="middle">
              7th TDS
            </text>
          </g>

          {/* Floating Tag 2: "15th PF" */}
          <g transform="translate(94, 52)">
            <rect x="0" y="0" width="60" height="24" rx="12" fill="#34d399" filter="drop-shadow(0 4px 10px rgba(52, 211, 153, 0.45))" />
            <text x="30" y="15.5" fill="#00201F" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="8.5" textAnchor="middle">
              15th PF
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// 7. ONBOARDING ILLUSTRATION (Dark plum studio canvas, avatar circle & checklist box)
export function OnboardingIllustration({}: IllustrationProps) {
  return (
    <div className="guide-illustration-svg-wrap illust-onboarding">
      <svg viewBox="0 0 320 160" className="illust-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-transparent Studio Floor */}
        <rect x="0" y="115" width="320" height="45" fill="rgba(0, 0, 0, 0.32)" />

        {/* Avatar Circle with Badge */}
        <g transform="translate(60, 36)">
          <circle cx="32" cy="32" r="30" fill="#00201F" stroke="#004B49" strokeWidth="2.5" filter="drop-shadow(0 6px 16px rgba(244, 114, 182, 0.3))" />
          <circle cx="32" cy="24" r="10" fill="#F6F8F8" />
          <path d="M14 46c0-7 8-11 18-11s18 4 18 11" fill="#004B49" />
          <circle cx="50" cy="14" r="7" fill="#34d399" />
          <path d="M47 14l2 2 4-4" stroke="#00201F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Onboarding Checklist Box */}
        <g transform="translate(150, 24)">
          <rect x="0" y="0" width="115" height="96" rx="10" fill="#00201F" stroke="#003836" strokeWidth="1.5" />
          
          {/* Item 1 */}
          <rect x="12" y="14" width="14" height="14" rx="4" fill="#34d399" />
          <path d="M15 21l3 3 5-5" stroke="#00201F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="34" y="18" width="65" height="5" rx="2.5" fill="#E5EAEA" />

          {/* Item 2 */}
          <rect x="12" y="38" width="14" height="14" rx="4" fill="#34d399" />
          <path d="M15 45l3 3 5-5" stroke="#00201F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="34" y="42" width="55" height="5" rx="2.5" fill="#E5EAEA" />

          {/* Item 3 - Ticks on Hover */}
          <rect x="12" y="62" width="14" height="14" rx="4" fill="#00201F" stroke="#004B49" strokeWidth="1.5" className="onboard-box-last" />
          <path d="M15 69l3 3 5-5" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="onboard-check-last" />
          <rect x="34" y="66" width="60" height="5" rx="2.5" fill="#004B49" />
        </g>
      </svg>
    </div>
  );
}

// 8. PERFORMANCE ILLUSTRATION (Dark plum studio canvas, rising bars, goal line & glowing star)
export function PerformanceIllustration({}: IllustrationProps) {
  return (
    <div className="guide-illustration-svg-wrap illust-performance">
      <svg viewBox="0 0 320 160" className="illust-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-transparent Studio Floor */}
        <rect x="0" y="115" width="320" height="45" fill="rgba(0, 0, 0, 0.32)" />

        {/* Chart Frame */}
        <g transform="translate(70, 20)">
          <rect x="0" y="0" width="180" height="106" rx="10" fill="#00201F" stroke="#003836" strokeWidth="1.5" />

          {/* Target Goal Line */}
          <line x1="12" y1="28" x2="168" y2="28" stroke="#004B49" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="164" y="23" fill="#004B49" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="7.5" textAnchor="end">
            TARGET Q4
          </text>

          {/* Bars */}
          <rect x="28" y="64" width="24" height="34" rx="5" fill="#004B49" />
          <rect x="68" y="48" width="24" height="50" rx="5" fill="#38bdf8" />
          <rect x="108" y="38" width="24" height="60" rx="5" fill="#34d399" />
          
          {/* Active Growth Bar */}
          <rect x="148" y="28" width="24" height="70" rx="5" fill="#004B49" className="performance-growth-bar" filter="drop-shadow(0 0 10px #004B49)" />

          {/* Shining Star at the Peak */}
          <g className="performance-star-glow" transform="translate(160, 16)">
            <circle cx="0" cy="0" r="12" fill="rgba(254, 240, 138, 0.2)" />
            <path
              d="M0 -8 L2 -2 L8 -1 L4 3 L5 9 L0 6 L-5 9 L-4 3 L-8 -1 L-2 -2 Z"
              fill="#f59e0b"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

// 9. MULTI-BRANCH ILLUSTRATION (Dark plum studio canvas, central HQ joined to four branches)
export function MultiBranchIllustration({}: IllustrationProps) {
  return (
    <div className="guide-illustration-svg-wrap illust-multibranch">
      <svg viewBox="0 0 320 160" className="illust-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-transparent Studio Floor */}
        <rect x="0" y="115" width="320" height="45" fill="rgba(0, 0, 0, 0.32)" />

        {/* Connecting Lines */}
        <line x1="160" y1="80" x2="80" y2="46" stroke="#004B49" strokeWidth="2" strokeDasharray="3 3" className="branch-line line-1" />
        <line x1="160" y1="80" x2="240" y2="46" stroke="#004B49" strokeWidth="2" strokeDasharray="3 3" className="branch-line line-2" />
        <line x1="160" y1="80" x2="80" y2="114" stroke="#004B49" strokeWidth="2" strokeDasharray="3 3" className="branch-line line-3" />
        <line x1="160" y1="80" x2="240" y2="114" stroke="#004B49" strokeWidth="2" strokeDasharray="3 3" className="branch-line line-4" />

        {/* 4 Outer Branch Nodes */}
        <g transform="translate(80, 46)">
          <circle cx="0" cy="0" r="16" fill="#00201F" stroke="#38bdf8" strokeWidth="2" />
          <rect x="-6" y="-6" width="12" height="12" rx="3" fill="#38bdf8" />
        </g>
        <g transform="translate(240, 46)">
          <circle cx="0" cy="0" r="16" fill="#00201F" stroke="#34d399" strokeWidth="2" />
          <rect x="-6" y="-6" width="12" height="12" rx="3" fill="#34d399" />
        </g>
        <g transform="translate(80, 114)">
          <circle cx="0" cy="0" r="16" fill="#00201F" stroke="#004B49" strokeWidth="2" />
          <rect x="-6" y="-6" width="12" height="12" rx="3" fill="#004B49" />
        </g>
        <g transform="translate(240, 114)">
          <circle cx="0" cy="0" r="16" fill="#00201F" stroke="#004B49" strokeWidth="2" />
          <rect x="-6" y="-6" width="12" height="12" rx="3" fill="#004B49" />
        </g>

        {/* Central HQ Hub */}
        <g transform="translate(160, 80)">
          <circle cx="0" cy="0" r="28" fill="#00201F" stroke="#004B49" strokeWidth="2.5" filter="drop-shadow(0 6px 18px rgba(244, 114, 182, 0.45))" />
          <circle cx="0" cy="0" r="20" fill="#004B49" />
          <path d="M-6 6V-4L0 -9L6 -4V6H-6Z" fill="#00201F" />
        </g>
      </svg>
    </div>
  );
}
